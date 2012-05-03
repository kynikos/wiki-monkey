#!/usr/bin/python3

import os
import re

SRC_PATH = ".."
MAIN_SCRIPT = os.path.join(SRC_PATH, "WikiMonkey.js")
CFG_PATH = os.path.join(SRC_PATH, "configurations")
CHROMIUM_PATH = os.path.join(CFG_PATH, "chromium")
OPERA_PATH = os.path.join(CFG_PATH, "opera")
STALONE_PATH = os.path.join(CFG_PATH, "standalone")
EXTENSIONS = ((CHROMIUM_PATH, "chromium"),
              (OPERA_PATH, "opera"),
              (STALONE_PATH, "standalone"))
GM_API_EMULATION = "GmApiEmulation.js"
STANDALONE_CONDITION = """
if (location.href.match(/^http:\/\/[a-z]+\.wikipedia\.org\//i) ||
    location.href.match(/^https:\/\/wiki\.archlinux\.org\//i)) {
"""


def get_script(s):
    code = s.read()
    match = re.match('^.*?/\*.+?\*/.*?\n(.+?)\n*$', code, re.DOTALL)
    if match:
        code = match.group(1)
    return code + "\n"


def get_licence():
    with open(MAIN_SCRIPT, 'r') as s:
        match = re.match('.*?(/\*.+?\*/)', s.read(), re.DOTALL)
        return match.group(1) + "\n"


def get_GM_API_emulation():
    with open(GM_API_EMULATION, 'r') as s:
        return "\n" + s.read()


def process_line(m, g, functions, header, line):
    id = re.match('^// @id ([^ \n]+)', line)
    version = re.match('^// @version ([^ \n]+)', line)
    update_url = re.match('^// @updateURL (.+/configurations)(/.+)'
                          '(\.(meta|user)\.js)$', line)
    download_url = re.match('^// @downloadURL (.+/configurations)(/.+)'
                            '(\.(meta|user)\.js)$', line)
    matches = re.match('^// @match (.+)$', line)
    requires = re.match('^// @require .+/src/(.+\.js)', line)
    
    if requires:
        source = os.path.join(SRC_PATH, requires.group(1))
        with open(source, 'r') as s:
            functions += get_script(s)
    elif m[1] != "standalone" and id:
        g.write("// @id " + id.group(1) + "-" + m[1] + "\n")
    elif m[1] != "standalone" and version:
        g.write("// @version " + version.group(1) + "-" + m[1] + "\n")
    elif m[1] != "standalone" and update_url:
        g.write("// @updateURL " + update_url.group(1) + "/" + m[1] +
                update_url.group(2) + "-" + m[1] + update_url.group(3) + "\n")
    elif m[1] != "standalone" and download_url:
        g.write("// @downloadURL " + download_url.group(1) + "/" + m[1] +
                download_url.group(2) + "-" + m[1] + download_url.group(3) +
                "\n")
    elif m[1] == "opera" and matches:
        g.write("// @include " + matches.group(1) + "\n")
    elif line[:18] == "// ==/UserScript==":
        header = False
        # If functions is empty it means it's a meta file
        if functions == "":
            pass
        elif m[1] == "chromium":
            line += "\n" + get_licence() + functions
        elif m[1] == "opera":
            line += "\n" + get_licence() + get_GM_API_emulation() + functions
        elif m[1] == "standalone":
            # Not +=
            line = (get_licence() + STANDALONE_CONDITION +
                    get_GM_API_emulation() + functions)
        g.write(line)
    elif m[1] != "standalone" or not header:
        g.write(line)
    
    return functions, header


def main():
    files = os.listdir(CFG_PATH)
    for name in files:
        file = os.path.join(CFG_PATH, name)
        ext = name[-8:]
        for m in EXTENSIONS:
            if ext == ".user.js" or (ext == ".meta.js" and
                                     m[1] != "standalone"):
                with open(file, 'r') as f:
                    cfile = os.path.join(m[0], name[:-8] + "-" + m[1] +
                                         name[-8:])
                    with open(cfile, 'w'):
                        pass
                    with open(cfile, 'a') as g:
                        functions = ""
                        header = True
                        for line in f:
                            functions, header = process_line(m, g, functions,
                                                             header, line)
                        else:
                            if m[1] == "standalone":
                                g.write("\n}\n")

if __name__ == '__main__':
    main()
