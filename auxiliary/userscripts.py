import os.path

from . import configurations

LICENSE = """/*
 * Wiki Monkey - MediaWiki bot and editor-assistant user script
 * Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 * This file is part of Wiki Monkey.
 *
 * Wiki Monkey is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wiki Monkey is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */
"""

SRCDIR = "./build/"
DISTDIR = './dist/'
AUXDIR = './auxiliary/'
DISTFILE = "{distdir}WikiMonkey-{fname}{suffix}.{preext}.js"
COFFEE = "./node_modules/.bin/coffee --compile --bare --output {build} {src}"
# TODO: The following recompiles only the scripts inside /dist, i.e. those
#       inside /build are not recompiled (requires coffeeify). For this
#       reason it doesn't support all the various subversions
# "browserify --transform coffeeify --extension='.coffee'"
# TODO: The following command wouldn't require coffeeify, but:
#       * it doesn't work if some required files are already JS files
#         (for example the lib.js.generic scripts)
#       * it adds a redundant function wrap to required scripts
#       * it's much slower
# "browserify --command 'coffee --stdio --compile' --extension='.coffee'"
BROWSERIFY = "./node_modules/.bin/browserify {args} {srcpath} -o {distfile}"
BABEL = './node_modules/.bin/babel {} --out-file {}'

# This should be kept compatible with both JavaScript and CoffeeScript
# require syntax
GLOBAL_MODULES = ('jquery', )
# Escaping sed's quotes isn't very easy, this is relying on the shell's
# concatenation of adjacent strings
SEDRE1 = (r"(\S+)\s*\=\s*require\s*\(\s*['\''\"]({})['\''\"]\s*\)"
          "".format('|'.join(GLOBAL_MODULES)))
SEDRE2 = r"\1 = window.\1"
SED = "--command \"sed -r -e 's/{}/{}/'\"".format(SEDRE1, SEDRE2)

CONFIG = {
    '_local': {
        # TODO: For the moment only the first matchlist_re is used, see below
        'matchlist_re': ("/^http:\/\/[a-z]+\.wikipedia\.org/i",
                         "/^https:\/\/wiki\.archlinux\.org/i")
    },
    'ArchWiki': {
        'matchlist_re': ("/^https:\/\/wiki\.archlinux\.org/i", )
    },
    'Wikipedia': {
        'matchlist_re': ("/^http:\/\/[a-z]+\.wikipedia\.org/i", )
    },
}


STANDALONE_START = "if (location.href.match({})) {{\n"
STANDALONE_END = "}\n"


def compile(run, version):
    # It's important to recompile the configuration *before* the scripts
    configurations.compile()

    run(COFFEE.format(build="./build/", src="./src/"))

    for srcfile in os.listdir(SRCDIR):
        srcpath = os.path.join(SRCDIR, srcfile)

        if os.path.isfile(srcpath):
            fname = os.path.splitext(srcfile)[0]

            if srcfile.startswith('_'):
                compile_webext(run, AUXDIR, fname[1:], fname, srcpath,
                               version or 'dev', '', '')
            elif version:
                compile_webext(run, DISTDIR, fname, fname, srcpath, version,
                               '', '')
                # The user script is loaded *before* MediaWiki loads jQuery,
                # so it doesn't make sense to build a lite version of the
                # webextension version
                # compile_webext(run, DISTDIR, fname, fname, srcpath, version,
                #                'lite', SED)
                compile_mediawiki(run, fname, srcpath, version)


def compile_webext(run, distdir, fname, cfname, srcpath, version, suffix,
                   args):
    distfile = DISTFILE.format(distdir=distdir, fname=fname,
                               suffix=('-' + suffix) if suffix else '',
                               preext='user')

    run(BROWSERIFY.format(args=args, srcpath=srcpath, distfile=distfile))
    run(BABEL.format(distfile, distfile))

    with open(distfile, 'r') as df:
        script = df.read()

    with open(distfile, 'w') as df:
        df.write('\n'.join((LICENSE, script)))


def compile_mediawiki(run, fname, srcpath, version):
    with open(srcpath, 'r') as sf:
        srcscript = sf.read()

    distfile_mw_temp = DISTFILE.format(distdir=SRCDIR, fname=fname,
                                       suffix='-mw', preext='temp')

    with open(distfile_mw_temp, 'w') as df:
        df.write(srcscript)

    distfile_mw = DISTFILE.format(distdir=DISTDIR, fname=fname,
                                  suffix='-mw-temp', preext='user')
    distfile_mw_lite = DISTFILE.format(distdir=DISTDIR, fname=fname,
                                       suffix='-mw', preext='user')

    run(BROWSERIFY.format(args='', srcpath=distfile_mw_temp,
                          distfile=distfile_mw))
    run(BABEL.format(distfile_mw, distfile_mw))
    run(BROWSERIFY.format(args=SED, srcpath=distfile_mw_temp,
                          distfile=distfile_mw_lite))
    run(BABEL.format(distfile_mw_lite, distfile_mw_lite))

    os.remove(distfile_mw_temp)

    with open(distfile_mw, 'r') as sf:
        script_mw = sf.read()

    os.remove(distfile_mw)

    with open(distfile_mw_lite, 'r') as sf:
        script_mw_lite = sf.read()

    # The MediaWiki version doesn't require a non-lite script, since MediaWiki
    # always ships with jQuery
    with open(distfile_mw_lite, 'w') as df:
        df.write('\n'.join((LICENSE, script_mw_lite)))

    distfile_sa = DISTFILE.format(distdir=DISTDIR, fname=fname,
                                  suffix='-sa', preext='user')
    distfile_sa_lite = DISTFILE.format(distdir=DISTDIR, fname=fname,
                                       suffix='-sa-lite', preext='user')

    for distfile, script in ((distfile_sa, script_mw),
                             (distfile_sa_lite, script_mw_lite)):
        with open(distfile, 'w') as df:
            # TODO: For the moment this is only using the first of the
            #       CONFIG[fname]['matchlist_re'] expressions; when there are
            #       more than one, join them all with ||
            df.write('\n'.join((LICENSE,
                                STANDALONE_START.format(
                                            CONFIG[fname]['matchlist_re'][0]),
                                script,
                                STANDALONE_END)))
