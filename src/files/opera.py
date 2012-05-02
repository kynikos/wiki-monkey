#!/usr/bin/python3

import os
import re

SRC_PATH = ".."
CFG_PATH = os.path.join(SRC_PATH, "configurations")
OPERA_PATH = os.path.join(CFG_PATH, "opera")
MAIN_SCRIPT = os.path.join(SRC_PATH, "WikiMonkey.js")


def read_script(s):
    code = s.read()
    match = re.match('.*?/\*.+?\*/.*?\n(.+)', code, re.DOTALL)
    if match:
        code = match.group(1)
    return code


def get_licence():
    with open(MAIN_SCRIPT, 'r') as s:
        match = re.match('.*?(/\*.+?\*/)', s.read(), re.DOTALL)
        return "\n" + match.group(1) + "\n"


def write_opera_configuration(f, g):
    functions = ""
    header = True
    for line in f:
        matches = re.match('// @require .+/src/(.+\.js)', line)
        if matches:
            source = os.path.join(SRC_PATH, matches.group(1))
            with open(source, 'r') as s:
                functions += read_script(s)
        elif line[:18] == "// ==/UserScript==":
            header = False
            g.write(line + get_licence() + functions)
        else:
            g.write(line)


def main():
    files = os.listdir(CFG_PATH)
    for name in files:
        ext = name[-8:]
        if ext == ".user.js":
            file = os.path.join(CFG_PATH, name)
            opera_file = os.path.join(OPERA_PATH, name[:-8] + "-opera" + name[-8:])
            # Reset opera_file
            with open(opera_file, 'w'):
                pass
            with open(file, 'r') as f, open(opera_file, 'a') as g:
                write_opera_configuration(f, g)

if __name__ == '__main__':
    main()
