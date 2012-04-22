#!/usr/bin/python3

import sys
import os
import re

VERSION = sys.argv[1]
PATH = "../configurations"


def process_line(line):
    matches = re.match('// @require (.+/)development(/.+\.js)', line)
    if matches:
        line = ("// @require " + matches.group(1) + VERSION +
                matches.group(2) + "\n")
    else:
        matches = re.match('// @id wiki-monkey-dev-([a-z]+)', line)
        if matches:
            line = "// @id wiki-monkey-" + matches.group(1) + "\n"
        else:
            matches = re.match('// @version [0-9]+dev-([a-z]+)', line)
            if matches:
                line = "// @version " + VERSION + "-" + matches.group(1) + "\n"
            else:
                matches = re.match('// @updateURL (.+/)development'
                                   '(/.+\.meta\.js)', line)
                if matches:
                    line = ("// @updateURL " + matches.group(1) + "master" +
                            matches.group(2) + "\n")
                else:
                    matches = re.match('// @downloadURL (.+/)development'
                                       '(/.+\.user\.js)', line)
                    if matches:
                        line = ("// @downloadURL " + matches.group(1) +
                                "master" + matches.group(2) + "\n")
    return line


def main():
    files = os.listdir(PATH)
    for name in files:
        ext = name[-8:]
        file = os.path.join(PATH, name)
        if ext in (".user.js", ".meta.js"):
            new = ""
            with open(file, 'r') as f:
                for line in f:
                    new += process_line(line)
            with open(file, 'w') as f:
                f.write(new)

if __name__ == '__main__':
    main()
