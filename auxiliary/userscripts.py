import os.path

from . import configurations

LICENCE = """/*
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

GM_HEADER = """// ==UserScript==
// @id wiki-monkey-{id}{dashlite}
// @name Wiki Monkey ({name}{spacelite})
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version {version}-{id}{dashlite}
// @description MediaWiki-compatible bot and editor assistant that runs in the browser ({name}{spacelite} version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/scripts/WikiMonkey-{name}{dashlite}.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/scripts/WikiMonkey-{name}{dashlite}.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/v{version}/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/v{version}/auxiliary/wiki-monkey-64.png
{matches}
// @grant GM_info
// @grant GM_xmlhttpRequest
// ==/UserScript==
"""

GM_META_HEADER = """// ==UserScript==
// @version {version}-{id}{dashlite}
// ==/UserScript==
"""

CONFIG = {
    '_local': {
        'id': 'local',
        'name': 'local',
        'matchlist': ("http://*.wikipedia.org/*",
                      "https://wiki.archlinux.org/*"),
        # TODO: For the moment only the first matchlist_re is used, see below
        'matchlist_re': ("/^http:\/\/[a-z]+\.wikipedia\.org/i",
                         "/^https:\/\/wiki\.archlinux\.org/i")
    },
    'ArchWiki': {
        'id': 'archwiki',
        'name': 'ArchWiki',
        'matchlist': ("https://wiki.archlinux.org/*", ),
        'matchlist_re': ("/^https:\/\/wiki\.archlinux\.org/i", )
    },
    'Wikipedia': {
        'id': 'wikipedia',
        'name': 'Wikipedia',
        'matchlist': ("http://*.wikipedia.org/*", ),
        'matchlist_re': ("/^http:\/\/[a-z]+\.wikipedia\.org/i", )
    },
}

GM_EMULATION = """
if (typeof GM_info === "undefined" || GM_info === null) {{
    window.GM_info = {{
        script: {{
            version: "{version}",
        }},
    }};

    window.GM_emulation = true;
}};

require('../lib.js.generic/dist/GMAPIEmulation');
"""

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
            matches = '\n'.join('// @match {}'.format(match)
                                for match
                                in CONFIG[fname]['matchlist'])

            if srcfile.startswith('_'):
                compile_gm(run, AUXDIR, fname[1:], fname, srcpath, matches,
                           version or 'dev', '', '', False)
            elif version:
                compile_gm(run, DISTDIR, fname, fname, srcpath, matches,
                           version, '', '', True)
                # The user script is loaded *before* MediaWiki loads jQuery,
                # so it doesn't make sense to build a lite version of the
                # GreaseMonkey version
                # compile_gm(run, DISTDIR, fname, fname, srcpath, matches,
                #            version, 'lite', SED, True)
                compile_mw_sa(run, fname, srcpath, version)


def compile_gm(run, distdir, fname, cfname, srcpath, matches, version, suffix,
               args, meta):
    distfile = DISTFILE.format(distdir=distdir, fname=fname,
                               suffix=('-' + suffix) if suffix else '',
                               preext='user')

    run(BROWSERIFY.format(args=args, srcpath=srcpath, distfile=distfile))
    run(BABEL.format(distfile, distfile))

    with open(distfile, 'r') as df:
        script = df.read()

    header = GM_HEADER.format(**CONFIG[cfname],
                              matches=matches,
                              version=version,
                              dashlite=(('-' + suffix)
                                        if suffix else ''),
                              spacelite=((' ' + suffix)
                                         if suffix else ''))

    with open(distfile, 'w') as df:
        df.write('\n'.join((header, script)))

    if not meta:
        return None

    distfile_meta = DISTFILE.format(distdir=DISTDIR, fname=fname,
                                    suffix=('-' + suffix) if suffix else '',
                                    preext='meta')

    header_meta = GM_META_HEADER.format(**CONFIG[fname],
                                        version=version,
                                        dashlite=(('-' + suffix)
                                                  if suffix else ''))

    with open(distfile_meta, 'w') as dmf:
        dmf.write(header_meta)


def compile_mw_sa(run, fname, srcpath, version):
    with open(srcpath, 'r') as sf:
        srcscript = sf.read()

    distfile_mw_temp = DISTFILE.format(distdir=SRCDIR, fname=fname,
                                       suffix='-mw', preext='temp')

    with open(distfile_mw_temp, 'w') as df:
        df.write('\n'.join((GM_EMULATION.format(version=version), srcscript)))

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
        df.write('\n'.join((LICENCE, script_mw_lite)))

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
            df.write('\n'.join((LICENCE,
                                STANDALONE_START.format(
                                            CONFIG[fname]['matchlist_re'][0]),
                                script,
                                STANDALONE_END)))
