import sys
import os.path
import shutil
import re
import subprocess


def run(*args, **kwargs):
    return subprocess.run(*args, shell=True, **kwargs)


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

SRCDIR = "./src/"
BUILDDIR = "./build/"
DISTDIR = './dist/'
AUXDIR = './auxiliary/'
VERSIONFILE = './VERSION'
INITFILE = os.path.join(SRCDIR, 'modules/_Init.coffee')
DISTFILE = "{distdir}WikiMonkey-{wiki}{suffix}.js"

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
BROWSERIFY = ("./node_modules/.bin/browserify --exclude jquery {srcpath} "
              "--outfile {distfile}")
BABEL = './node_modules/.bin/babel {} --out-file {}'


def compile_(version):
    if version:
        run('npm --allow-same-version --no-git-tag-version version {}'.format(
                                                                    version))

        with open(INITFILE, 'r') as sf:
            initfile = sf.read()

        initfile = re.sub(r'VERSION *= *[\'"][0-9.]+[\'"]',
                          "VERSION = '{}'".format(version),
                          initfile)

        with open(INITFILE, 'w') as df:
            df.write(initfile)

        with open(VERSIONFILE, 'w') as df:
            df.write(version)

    run(COFFEE.format(build=BUILDDIR, src=SRCDIR))

    for srcfile in os.listdir(BUILDDIR):
        srcpath = os.path.join(BUILDDIR, srcfile)

        if os.path.isfile(srcpath):
            fname = os.path.splitext(srcfile)[0]

            if srcfile.startswith('_'):
                compile_script(AUXDIR, fname[1:], srcpath)

            elif version:
                distfile = compile_script(DISTDIR, fname, srcpath)

                # Previous versions were using this file name
                # TODO: Deprecate in a future version
                distfile_bwcompat = DISTFILE.format(distdir=DISTDIR,
                                                    wiki=fname,
                                                    suffix="-mw.user")
                shutil.copy(distfile, distfile_bwcompat)


def compile_script(distdir, fname, srcpath):
    distfile = DISTFILE.format(distdir=distdir, wiki=fname, suffix='')

    run(BROWSERIFY.format(srcpath=srcpath, distfile=distfile))
    run(BABEL.format(distfile, distfile))

    with open(distfile, 'r') as sf:
        script = sf.read()

    with open(distfile, 'w') as df:
        df.write('\n'.join((LICENSE, script)))

    return distfile


if __name__ == '__main__':
    compile_(sys.argv[1] if len(sys.argv) == 2 else False)
