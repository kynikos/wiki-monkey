#!/usr/bin/python3

import os
import re

ROOT_PATH = ".."
ALIB_PATH = "../../../lib.js.generic/src"
MAIN_SCRIPT = os.path.join(ROOT_PATH, "WikiMonkey.js")
CFG_PATH = os.path.join(ROOT_PATH, "configurations")
CHROMIUM_PATH = os.path.join(CFG_PATH, "chromium")
OPERA_PATH = os.path.join(CFG_PATH, "opera")
STALONE_PATH = os.path.join(CFG_PATH, "standalone")
EXTENSIONS = ((CHROMIUM_PATH, "chromium"),
              (OPERA_PATH, "opera"),
              (STALONE_PATH, "standalone"))
GM_API_EMULATION = os.path.join(ALIB_PATH, "GMAPIEmulation.js")
STANDALONE = {
    "start": "\nif ({}) {{\n",
    "match": "location.href.match({})",
    "join": " ||\n    ",
    "conditions": {
        "http://*.wikipedia.org/*": "/^http:\/\/[a-z]+\.wikipedia\.org/i",
        "https://wiki.archlinux.org/*": "/^https:\/\/wiki\.archlinux\.org/i",
    },
    "end": "\n}\n",
}

cversion = ""


def get_script(s):
    code = s.read()
    match = re.match('^\s*?/\*.+?\*/.*?\n(.+?)\n*$', code, re.DOTALL)
    if match:
        code = match.group(1)
    return code + "\n"


def get_licence():
    with open(MAIN_SCRIPT, 'r') as s:
        match = re.match('\s*?(/\*.+?\*/)', s.read(), re.DOTALL)
        return match.group(1) + "\n"


def get_GM_API_emulation():
    GM_info = """
if (!GM_info) {{
    var GM_info = {{
        script: {{
            version: "{}",
        }},
    }};
}};

var GM_emulation = true;
""".format(cversion)

    with open(GM_API_EMULATION, 'r') as s:
        return  GM_info + get_script(s)


def store_version(version, m1):
    # This is a very ugly hack, but the whole script should be rewritten
    # much better anyway...
    global cversion
    cversion = version.group(1) + "-" + m1


def process_header_line(m, g, functions, match_urls, header, line):
    id = re.match('^// @id ([^ \n]+)', line)
    version = re.match('^// @version ([^ \n]+)', line)
    update_url = re.match('^// @updateURL (.+/configurations)(/.+)'
                          '(\.(meta|user)\.js)$', line)
    download_url = re.match('^// @downloadURL (.+/configurations)(/.+)'
                            '(\.(meta|user)\.js)$', line)
    matches = re.match('^// @match (.+)$', line)
    alib_requires = re.match('^// @require https://raw\.github\.com/kynikos/'
                             'lib\.js\.generic/[^/]+/src/(.+\.js)', line)
    requires = re.match('^// @require https://raw\.github\.com/kynikos/'
                        'wiki-monkey/[^/]+/(.+\.js)', line)

    if alib_requires:
        source = os.path.join(ALIB_PATH, alib_requires.group(1))
        with open(source, 'r') as s:
            functions += get_script(s)
    elif requires:
        source = os.path.join(ROOT_PATH, requires.group(1))
        with open(source, 'r') as s:
            functions += get_script(s)
    elif m[1] in ("chromium", "opera"):
        header = process_line_aux(m[1], g, functions, header, line, id,
                                    version, update_url, download_url, matches)
    elif m[1] == "standalone":
        header = process_line_standalone(m, g, functions, match_urls, header,
                                                        version, line, matches)

    return functions, header


def process_line_aux(m1, g, functions, header, line, id, version, update_url,
                                                        download_url, matches):
    if id:
        g.write("// @id " + id.group(1) + "-" + m1 + "\n")
    elif version:
        store_version(version, m1)
        g.write("// @version " + cversion + "\n")
    elif update_url:
        g.write("// @updateURL " + update_url.group(1) + "/" + m1 +
                   update_url.group(2) + "-" + m1 + update_url.group(3) + "\n")
    elif download_url:
        g.write("// @downloadURL " + download_url.group(1) + "/" + m1 +
               download_url.group(2) + "-" + m1 + download_url.group(3) + "\n")
    elif matches:
        if m1 == "chromium":
            g.write(line)
        elif m1 == "opera":
            g.write("// @include " + matches.group(1) + "\n")
    elif line[:18] == "// ==/UserScript==":
        header = False
        # If functions is empty it means it's a meta file
        if functions == "":
            pass
        else:
            line += "\n" + get_licence() + get_GM_API_emulation() + functions
        g.write(line)
    elif header:
        g.write(line)

    return header


def process_line_standalone(m, g, functions, match_urls, header, version, line,
                                                                      matches):
    if version:
        store_version(version, m[1])
    elif matches:
        match_urls.append(STANDALONE["conditions"][matches.group(1)])
    elif line[:18] == "// ==/UserScript==":
        header = False
        # If functions is empty it means it's a meta file
        if functions == "":
            pass
        else:
            # Not +=
            line = (get_licence() + STANDALONE["start"].format(
                                                       STANDALONE["join"].join(
                           [STANDALONE["match"].format(m) for m in match_urls])
                                        ) + get_GM_API_emulation() + functions)
        g.write(line)

    return header


def adapt_configuration(f):
    code = f.read()
    match = re.match("// ==/UserScript==\s*(.+)", code, re.DOTALL)

    if match:
        code = match.group(1)

    # ArchWikiOldAURLinks and ArchWikiUpdatePackageTemplates would require
    # cross-origin HTTP requests
    for plugin in ("ArchWikiOldAURLinks", "ArchWikiUpdatePackageTemplates"):
        while True:
            cmatch = re.search("(,)?\s*\[[\"']" + plugin + "[\"'].*?\](,)?\n",
                                                        code, flags=re.DOTALL)

            if cmatch is not None:
                if cmatch.group(1) == cmatch.group(2) == ",":
                    replace = ",\n"
                else:
                    replace = "\n"

                code = code[:cmatch.start()] + replace + code[cmatch.end():]
            else:
                break

        try:
            code.index(plugin)
        except ValueError:
            pass
        else:
            raise UserWarning("An instance of " + plugin + " has not been "
                                                                    "removed")

    # SynchronizeInterlanguageLinks would require cross-origin HTTP requests,
    # use WM.ArchWiki.getInternalInterwikiLanguages() as a white list
    code = re.sub("(\[[\"']SynchronizeInterlanguageLinks[\"'].*?"
                            "WM\.ArchWiki\.getInterwikiLanguages\(\),\s*)"
                            "WM\.ArchWiki\.getInterwikiLanguages\(\)",
                            "\g<1>WM.ArchWiki.getInternalInterwikiLanguages()",
                            code, flags=re.DOTALL)
    if re.search("WM\.ArchWiki\.getInterwikiLanguages\(\),\s*"
                "WM\.ArchWiki\.getInterwikiLanguages\(\)", code) is not None:
        raise UserWarning("An instance of WM.ArchWiki.getInterwikiLanguages "
                                    "as a white list has not been replaced")

    return code


def main():
    files = os.listdir(CFG_PATH)
    for name in files:
        file = os.path.join(CFG_PATH, name)
        ext = name[-8:]
        for m in EXTENSIONS:
            if ext == ".user.js" or (ext == ".meta.js" and m[1] != "standalone"
                                                                             ):
                with open(file, 'r') as f:
                    cfile = os.path.join(m[0], name[:-8] + "-" + m[1] +
                                   name[-3 if (m[1] == "standalone") else -8:])
                    with open(cfile, 'w'):
                        pass
                    with open(cfile, 'a') as g:
                        functions = ""
                        match_urls = []
                        header = True
                        for line in f:
                            functions, header = process_header_line(m, g,
                                           functions, match_urls, header, line)

                            if not header:
                                break

                        g.write(adapt_configuration(f))

                        if m[1] == "standalone":
                            g.write(STANDALONE["end"])

if __name__ == '__main__':
    main()
