#!/usr/bin/python3

import os
import re

CONFIG = {
    "VERSION": "1.10.3",
    "PATH": "../configurations",
    "ALIB_VERSION": "1.0",
    "ALIB_PATH": "../../../js-aux-lib/src",
}


def process_line(line):
    replaces = (
        (
            '// @require https://raw\.github\.com/kynikos/wiki-monkey/'
            'development(/.+\.js)',
            "// @require https://raw.github.com/kynikos/wiki-monkey/"
            "{VERSION}{g0}\n",
        ),
        (
            '// @require https://raw\.github\.com/kynikos/js-aux-lib/'
            'master(/.+\.js)',
            "// @require https://raw.github.com/kynikos/js-aux-lib/"
            "{ALIB_VERSION}{g0}\n",
        ),
        (
            '// @id wiki-monkey-dev-([a-z]+)',
            "// @id wiki-monkey-{g0}\n",
        ),
        (
            '// @version [0-9]+dev-([a-z]+)',
            "// @version {VERSION}-{g0}\n",
        ),
        (
            '// @updateURL (.+/)development(/.+\.meta\.js)',
            "// @updateURL {g0}master{g1}\n",
        ),
        (
            '// @downloadURL (.+/)development(/.+\.user\.js)',
            "// @downloadURL {g0}master{g1}\n",
        ),
    )
    for replace in replaces:
        PARAMS = CONFIG.copy()
        matches = re.match(replace[0], line)
        if matches:
            for id, group in enumerate(matches.groups()):
                PARAMS["g" + str(id)] = group
            line = replace[1].format(**PARAMS)
            break
    return line


def main():
    files = os.listdir(CONFIG["PATH"])
    for name in files:
        ext = name[-8:]
        if ext in (".user.js", ".meta.js"):
            file = os.path.join(CONFIG["PATH"], name)
            new = ""
            with open(file, 'r') as f:
                for line in f:
                    new += process_line(line)
            with open(file, 'w') as f:
                f.write(new)

if __name__ == '__main__':
    main()
