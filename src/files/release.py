#!/usr/bin/python3

import sys
import os
import re

# Usage:
# ./release.py DEVELOP_VERSION
# ./release.py VERSION ALIB_VERSION

development = re.search("(^|[^a-z])dev", sys.argv[1], re.I)

CONFIG = {
    "VERSION": sys.argv[1],
    "REPO_VERSION": "develop" if development else sys.argv[1],
    "UPDATE": "develop" if development else "master",
    "PATH": "../configurations",
    "ALIB_VERSION": "master" if development else sys.argv[2],
    "ALIB_PATH": "../../../lib.js.generic/src",
}


def process_line(line):
    replaces = (
        (
            '// @(require|icon(?:64)?) https://raw\.github\.com/kynikos/'
            'wiki-monkey/[^/]+(/.+\.(?:js|png))',
            "// @{g0} https://raw.github.com/kynikos/wiki-monkey/"
            "{REPO_VERSION}{g1}\n",
        ),
        (
            '// @require https://raw\.github\.com/kynikos/lib\.js\.generic/'
            '[^/]+(/.+\.js)',
            "// @require https://raw.github.com/kynikos/lib.js.generic/"
            "{ALIB_VERSION}{g0}\n",
        ),
        (
            '// @version .+-([a-z]+)',
            "// @version {VERSION}-{g0}\n",
        ),
        (
            '// @(update|download)URL https://raw\.github\.com/kynikos/'
            'wiki-monkey/[^/]+(/.+\.(?:meta|user)\.js)',
            "// @{g0}URL https://raw.github.com/kynikos/wiki-monkey/"
            "{UPDATE}{g1}\n",
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
