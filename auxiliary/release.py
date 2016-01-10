#!/usr/bin/python3

import sys
import os
import re
import json
import os
import urllib.request

# Usage:
# ./release.py DEVELOP_VERSION

# If I'll need to control the versions of each plugin's configuration, I can
# use something like:
#    "Editor": {
#        "ID": {
#            "1": (
#                "Plugin",
#                ("Label"),
#                None,
#            ),

CONFIG_COMMON_PLUGINS = {
    "Editor": {
        "040SL": (
            "FixFragments",
            ("Text plugins", "Fix section links"),
            None,
        ),
        "060EC": (
            "ExpandContractions",
            ("Text plugins", "Expand contractions"),
            None,
        ),
        "070ML": (
            "MultipleLineBreaks",
            ("Text plugins", "Squash multiple line breaks"),
            None,
        ),
        "110SR": (
            "SimpleReplace",
            ("RegExp substitution", ),
            None,
        ),
        "210ES": (
            "FixLinkFragments",
            ("Query plugins", "Fix external section links"),
            None,
        ),
    },
    "Diff": {},
    "Special": {
        "020DR": (
            "FixDoubleRedirects",
            ("Fix double redirects", ),
            "fix double redirect"
        ),
    },
    "RecentChanges": {},
    "NewPages": {},
    "Bot": {
        "010SR": (
            "SimpleReplace",
            ("RegExp substitution", ),
            None,
        ),
        "020BL": (
            "FixBacklinkFragments",
            ("Fix links to specific sections of a target page", ),
            "fix links to specific sections"
        ),
    },
}

CONFIG_PLUGINS = {
    "local": {
        "Diff": {
            "020AST": (
                "ArchWikiSaveTalk",
                ("Save discussion", ),
                (
                    "User:Kynikos/Tasks",
                    "add discussion"
                )
            ),
        },
        "Special": {
            "030ASC": (
                "ArchWikiSortContacts",
                ("Sort contacts", "Sort Administrators"),
                (
                    "ArchWiki:Administrators",
                    30,
                    30,
                    "The following Administrators are currently inactive "
                    "(less than 30 edits in the last 30 days):",
                    "automatically sort list according to recent activity"
                )
            ),
            "040ASCM": (
                "ArchWikiSortContacts",
                ("Sort contacts", "Sort Maintainers"),
                (
                    "ArchWiki:Maintainers",
                    30,
                    30,
                    "The following Maintainers are currently inactive "
                    "(less than 30 edits in the last 30 days):",
                    "automatically sort list according to recent activity"
                )
            ),
        },
        "Bot": {
            "060AWC": (
                "ArchWikiWantedCategories",
                ("Create wanted categories", ),
                None,
            ),
            "070DP": (
                "DeletePages",
                ("Delete pages", ),
                "delete page"
            ),
        },
    },
    "ArchWiki": {
        "Editor": {
            "010AHE": (
                "ArchWikiFixHeader",
                ("Text plugins", "Fix header"),
                None,
            ),
            "020ASE": (
                "ArchWikiFixHeadings",
                ("Text plugins", "Fix headings"),
                None,
            ),
            "030AEL": (
                "ArchWikiFixLinks",
                ("Text plugins", "Fix external links"),
                None,
            ),
            "050ACT": (
                "ArchWikiNewTemplates",
                ("Text plugins", "Use code templates"),
                None,
            ),
            "080ASR": (
                "ArchWikiSummaryToRelated",
                ("Text plugins", "Convert summary to related"),
                None,
            ),
            "220AIL": (
                "SynchronizeInterlanguageLinks",
                ("Query plugins", "Sync interlanguage links"),
                (
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    None,
                )
            ),
            "230AAL": (
                "ArchWikiOldAURLinks",
                ("Query plugins", "Fix old AUR links"),
                None,
            ),
            "240APT": (
                "ArchWikiUpdatePackageTemplates",
                ("Query plugins", "Update package templates"),
                None,
            ),
        },
        "Diff": {
            "010AQR": (
                "ArchWikiQuickReport",
                ("Quick report", ),
                (
                    "ArchWiki:Reports",
                    "add report for %t"
                )
            ),
        },
        "RecentChanges": {
            "010ARC": (
                "ArchWikiRCFilter",
                ("Default filter", ),
                {
                    "language": "English"
                }
            ),
        },
        "NewPages": {
            "010ANP": (
                "ArchWikiNPFilter",
                ("Default filter", ),
                {
                    "language": "English"
                }
            ),
        },
        "Special": {
            "010CTar": (
                "UpdateCategoryTree",
                ("Update category trees", "Arabic"),
                (
                    (
                        "ArchWiki",
                        "ar"
                    ),
                    "automatic update"
                )
            ),
            "010CTbg": (
                "UpdateCategoryTree",
                ("Update category trees", "Bulgarian"),
                (
                    (
                        "ArchWiki",
                        "bg"
                    ),
                    "automatic update"
                )
            ),
            "010CTcs": (
                "UpdateCategoryTree",
                ("Update category trees", "Czech"),
                (
                    (
                        "ArchWiki",
                        "cs"
                    ),
                    "automatic update"
                )
            ),
            "010CTda": (
                "UpdateCategoryTree",
                ("Update category trees", "Danish"),
                (
                    (
                        "ArchWiki",
                        "da"
                    ),
                    "automatic update"
                )
            ),
            "010CTel": (
                "UpdateCategoryTree",
                ("Update category trees", "Greek"),
                (
                    (
                        "ArchWiki",
                        "el"
                    ),
                    "automatic update"
                )
            ),
            "010CTen": (
                "UpdateCategoryTree",
                ("Update category trees", "English"),
                (
                    (
                        "ArchWiki",
                        "en"
                    ),
                    "automatic update"
                )
            ),
            "010CTes": (
                "UpdateCategoryTree",
                ("Update category trees", "Spanish"),
                (
                    (
                        "ArchWiki",
                        "es"
                    ),
                    "automatic update"
                )
            ),
            "010CThe": (
                "UpdateCategoryTree",
                ("Update category trees", "Hebrew"),
                (
                    (
                        "ArchWiki",
                        "he"
                    ),
                    "automatic update"
                )
            ),
            "010CThr": (
                "UpdateCategoryTree",
                ("Update category trees", "Croatian"),
                (
                    (
                        "ArchWiki",
                        "hr"
                    ),
                    "automatic update"
                )
            ),
            "010CThu": (
                "UpdateCategoryTree",
                ("Update category trees", "Hungarian"),
                (
                    (
                        "ArchWiki",
                        "hu"
                    ),
                    "automatic update"
                )
            ),
            "010CTid": (
                "UpdateCategoryTree",
                ("Update category trees", "Indonesian"),
                (
                    (
                        "ArchWiki",
                        "id"
                    ),
                    "automatic update"
                )
            ),
            "010CTit": (
                "UpdateCategoryTree",
                ("Update category trees", "Italian"),
                (
                    (
                        "ArchWiki",
                        "it"
                    ),
                    "automatic update"
                )
            ),
            "010CTko": (
                "UpdateCategoryTree",
                ("Update category trees", "Korean"),
                (
                    (
                        "ArchWiki",
                        "ko"
                    ),
                    "automatic update"
                )
            ),
            "010CTlt": (
                "UpdateCategoryTree",
                ("Update category trees", "Lithuanian"),
                (
                    (
                        "ArchWiki",
                        "lt"
                    ),
                    "automatic update"
                )
            ),
            "010CTnl": (
                "UpdateCategoryTree",
                ("Update category trees", "Dutch"),
                (
                    (
                        "ArchWiki",
                        "nl"
                    ),
                    "automatic update"
                )
            ),
            "010CTpl": (
                "UpdateCategoryTree",
                ("Update category trees", "Polish"),
                (
                    (
                        "ArchWiki",
                        "pl"
                    ),
                    "automatic update"
                )
            ),
            "010CTpt": (
                "UpdateCategoryTree",
                ("Update category trees", "Portuguese"),
                (
                    (
                        "ArchWiki",
                        "pt"
                    ),
                    "automatic update"
                )
            ),
            "010CTru": (
                "UpdateCategoryTree",
                ("Update category trees", "Russian"),
                (
                    (
                        "ArchWiki",
                        "ru"
                    ),
                    "automatic update"
                )
            ),
            "010CTsk": (
                "UpdateCategoryTree",
                ("Update category trees", "Slovak"),
                (
                    (
                        "ArchWiki",
                        "sk"
                    ),
                    "automatic update"
                )
            ),
            "010CTsr": (
                "UpdateCategoryTree",
                ("Update category trees", "Serbian"),
                (
                    (
                        "ArchWiki",
                        "sr"
                    ),
                    "automatic update"
                )
            ),
            "010CTth": (
                "UpdateCategoryTree",
                ("Update category trees", "Thai"),
                (
                    (
                        "ArchWiki",
                        "th"
                    ),
                    "automatic update"
                )
            ),
            "010CTuk": (
                "UpdateCategoryTree",
                ("Update category trees", "Ukrainian"),
                (
                    (
                        "ArchWiki",
                        "uk"
                    ),
                    "automatic update"
                )
            ),
            "010CTzhcn": (
                "UpdateCategoryTree",
                ("Update category trees", "Chinese (Simplified)"),
                (
                    (
                        "ArchWiki",
                        "zh-cn"
                    ),
                    "automatic update"
                )
            ),
            "010CTzhtw": (
                "UpdateCategoryTree",
                ("Update category trees", "Chinese (Traditional)"),
                (
                    (
                        "ArchWiki",
                        "zh-tw"
                    ),
                    "automatic update"
                )
            ),
            "040ASCC": (
                "ArchWikiSortContacts",
                # Always disabled by default, but leave available for e.g.
                # Translation Teams
                None,
                None,
            ),
        },
        "Bot": {
            "030IL": (
                "SynchronizeInterlanguageLinks",
                ("Synchronize interlanguage links", ),
                (
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    "synchronized interlanguage links with the other wikis"
                )
            ),
            "040APT": (
                "ArchWikiUpdatePackageTemplates",
                ("Check packages linked with Pkg/AUR templates and " +
                                                    "possibly update them", ),
                "update Pkg/AUR templates to reflect new package status"
            ),
            "050AAL": (
                "ArchWikiOldAURLinks",
                ("Replace old-style direct AUR package links with " +
                                                            "Template:AUR", ),
                "replace old-style direct package links with Pkg/AUR templates"
            ),
        },
    },
    "Wikipedia": {},
}

CONFIG_MODS = {
    "General": {
        'heading_number_style': False,
    },
    "Editor": {
        'disable_edit_summary_submit_on_enter': True,
        'scroll_to_first_heading': False,
    },
    "RecentChanges": {
        'hide_rollback_links': True,
    },
    "Contributions": {
        'hide_rollback_links': True,
    },
}

DISABLE_EDITOR = {
    "Editor": ("040SL", "060EC", "070ML", "110SR", "210ES"),
}

DISABLE_AW_EDITOR = {
    "Editor": ("010AHE", "020ASE", "030AEL", "050ACT", "080ASR", "220AIL"),
}

DISABLE_AW_EDITOR_X = {
    "Editor": ("230AAL", "240APT"),
}

DISABLE_AW_PATROL = {
    "Diff": ("010AQR", ),
    "RecentChanges": ("010ARC", ),
    "NewPages": ("010ANP", ),
}

DISABLE_BOT = {
    "Special": ("020DR", ),
    "Bot": ("010SR", "020BL"),
}

DISABLE_AW_BOT = {
    "Special": ("010CTar", "010CTbg", "010CTcs", "010CTda", "010CTel",
                "010CTen", "010CTes", "010CThe", "010CThr", "010CThu",
                "010CTid", "010CTit", "010CTko", "010CTlt",
                "010CTnl", "010CTpl", "010CTpt", "010CTru", "010CTsk",
                "010CTsr", "010CTth", "010CTuk", "010CTzhcn", "010CTzhtw"),
    "Bot": ("030IL", ),
}

DISABLE_AW_BOT_X = {
    "Bot": ("040APT", "050AAL"),
}

DISABLE_LOCAL = {
    "Diff": ("020AST", ),
    "Special": ("030ASC", "040ASCM"),
    "Bot": ("060AWC", "070DP"),
}

AUX_PATH = "../auxiliary"
SCRIPTS_PATH = "../scripts"
OLD_SCRIPTS_PATH = "../src/configurations"
OLD_SCRIPTS_PATH_CHROMIUM = "../src/configurations/chromium"
OLD_SCRIPTS_PATH_OPERA = "../src/configurations/opera"
OLD_SCRIPTS_PATH_STANDALONE = "../src/configurations/standalone"

SCRIPTS = {
    "local": {
        "GM": {
            "local": (AUX_PATH, None, False, ()),
        },
    },
    "ArchWiki": {
        "GM": {
            "ArchWiki": (SCRIPTS_PATH, "ArchWiki-bot", False, ()),
            "archwikibot": (OLD_SCRIPTS_PATH, None, True, ()),
            "archwikipatrol": (OLD_SCRIPTS_PATH, "ArchWiki-patrol", True,
                            (DISABLE_BOT, DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
            "archwikipatrollite": (OLD_SCRIPTS_PATH, "ArchWiki-patrol-lite",
                            True,
                            (DISABLE_EDITOR, DISABLE_AW_EDITOR,
                            DISABLE_AW_EDITOR_X, DISABLE_BOT, DISABLE_AW_BOT,
                            DISABLE_AW_BOT_X)),
            "archwikieditor": (OLD_SCRIPTS_PATH, "ArchWiki-editor", True,
                            (DISABLE_AW_PATROL, DISABLE_BOT, DISABLE_AW_BOT,
                            DISABLE_AW_BOT_X)),
        },
        "chromium": {
            "archwikibot-chromium": (OLD_SCRIPTS_PATH_CHROMIUM, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_AW_BOT_X)),
            "archwikipatrol-chromium": (OLD_SCRIPTS_PATH_CHROMIUM, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_BOT,
                            DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
            "archwikipatrollite-chromium": (OLD_SCRIPTS_PATH_CHROMIUM, None,
                            True,
                            (DISABLE_EDITOR, DISABLE_AW_EDITOR,
                            DISABLE_AW_EDITOR_X, DISABLE_BOT, DISABLE_AW_BOT,
                            DISABLE_AW_BOT_X)),
            "archwikieditor-chromium": (OLD_SCRIPTS_PATH_CHROMIUM, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_AW_PATROL,
                            DISABLE_BOT, DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
        },
        "opera": {
            "archwikibot-opera": (OLD_SCRIPTS_PATH_OPERA, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_AW_BOT_X)),
            "archwikipatrol-opera": (OLD_SCRIPTS_PATH_OPERA, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_BOT,
                            DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
            "archwikipatrollite-opera": (OLD_SCRIPTS_PATH_OPERA, None, True,
                            (DISABLE_EDITOR, DISABLE_AW_EDITOR,
                            DISABLE_AW_EDITOR_X, DISABLE_BOT, DISABLE_AW_BOT,
                            DISABLE_AW_BOT_X)),
            "archwikieditor-opera": (OLD_SCRIPTS_PATH_OPERA, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_AW_PATROL,
                            DISABLE_BOT, DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
        },
        "standalone": {
            "ArchWiki-standalone": (SCRIPTS_PATH, "ArchWiki-standalone-bot",
                            False,
                            (DISABLE_AW_EDITOR_X, DISABLE_AW_BOT_X)),
            "archwikibot-standalone": (OLD_SCRIPTS_PATH_STANDALONE, None, True,
                            (DISABLE_AW_EDITOR_X, DISABLE_AW_BOT_X)),
            "archwikipatrol-standalone": (OLD_SCRIPTS_PATH_STANDALONE,
                            "ArchWiki-standalone-patrol", True,
                            (DISABLE_AW_EDITOR_X, DISABLE_BOT,
                            DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
            "archwikipatrollite-standalone": (OLD_SCRIPTS_PATH_STANDALONE,
                            "ArchWiki-standalone-patrol-lite", True,
                            (DISABLE_EDITOR,
                            DISABLE_AW_EDITOR, DISABLE_AW_EDITOR_X,
                            DISABLE_BOT, DISABLE_AW_BOT, DISABLE_AW_BOT_X)),
            "archwikieditor-standalone": (OLD_SCRIPTS_PATH_STANDALONE,
                            "ArchWiki-standalone-editor", True,
                            (DISABLE_AW_EDITOR_X,
                            DISABLE_AW_PATROL, DISABLE_BOT, DISABLE_AW_BOT,
                            DISABLE_AW_BOT_X)),
        },
    },
    "Wikipedia": {
        "GM": {
            "Wikipedia": (SCRIPTS_PATH, "Wikipedia-bot", False, ()),
            "bot": (OLD_SCRIPTS_PATH, None, True, ()),
            "editor": (OLD_SCRIPTS_PATH, "Wikipedia-editor", True,
                            (DISABLE_BOT, )),
        },
        "chromium": {
            "bot-chromium": (OLD_SCRIPTS_PATH_CHROMIUM, None, True, ()),
            "editor-chromium": (OLD_SCRIPTS_PATH_CHROMIUM, None, True,
                            (DISABLE_BOT, )),
        },
        "opera": {
            "bot-opera": (OLD_SCRIPTS_PATH_OPERA, None, True, ()),
            "editor-opera": (OLD_SCRIPTS_PATH_OPERA, None, True,
                            (DISABLE_BOT, )),
        },
        "standalone": {
            "Wikipedia-standalone": (SCRIPTS_PATH, "Wikipedia-standalone-bot",
                            False, ()),
            "bot-standalone": (OLD_SCRIPTS_PATH_STANDALONE, None, True, ()),
            "editor-standalone": (OLD_SCRIPTS_PATH_STANDALONE,
                            "Wikipedia-standalone-editor", True,
                            (DISABLE_BOT, )),
        },
    },
}

ALIB = (
    "GMAPIEmulation",
    "Async",
    "Compatibility",
    "CSS",
    "DOM",
    "HTTP",
    "Obj",
    "RegEx",
    "Str"
)

MODULES_COMMON = (
    "_Init",
    "Bot",
    "Cat",
    "Cfg",
    "Diff",
    "Editor",
    "Filters",
    "Interlanguage",
    "Log",
    "Menu",
    "Mods",
    "MW",
    "Parser",
    "Tables",
    "UI",
    "WhatLinksHere",
)

MODULES = {
    "local": (
        "ArchPackages",
        "ArchWiki",
    ),
    "ArchWiki": (
        "ArchPackages",
        "ArchWiki",
    ),
    "Wikipedia": (),
}

PLUGINS_COMMON = (
    "ExpandContractions",
    "FixBacklinkFragments",
    "FixDoubleRedirects",
    "FixFragments",
    "FixLinkFragments",
    "MultipleLineBreaks",
    "SimpleReplace",
    "SynchronizeInterlanguageLinks",
    "UpdateCategoryTree",
)

PLUGINS = {
    "local": (
        "ArchWikiFixHeader",
        "ArchWikiFixHeadings",
        "ArchWikiFixLinks",
        "ArchWikiNewTemplates",
        "ArchWikiNPFilter",
        "ArchWikiOldAURLinks",
        "ArchWikiQuickReport",
        "ArchWikiRCFilter",
        "ArchWikiSaveTalk",
        "ArchWikiSortContacts",
        "ArchWikiSummaryToRelated",
        "ArchWikiUpdatePackageTemplates",
        "ArchWikiWantedCategories",
        "DeletePages",
    ),
    "ArchWiki": (
        "ArchWikiFixHeader",
        "ArchWikiFixHeadings",
        "ArchWikiFixLinks",
        "ArchWikiNewTemplates",
        "ArchWikiNPFilter",
        "ArchWikiOldAURLinks",
        "ArchWikiQuickReport",
        "ArchWikiRCFilter",
        "ArchWikiSortContacts",
        "ArchWikiSummaryToRelated",
        "ArchWikiUpdatePackageTemplates",
    ),
    "Wikipedia": (),
}

DEVELOPMENT = re.search("(^|[^a-z])dev", sys.argv[1], re.I)
VERSION = sys.argv[1]
GIT_REF = "develop" if DEVELOPMENT else sys.argv[1]
UPDATE = "develop" if DEVELOPMENT else "master"
MODULES_PATH = "../modules"
PLUGINS_PATH = "../plugins"
CONF_PATH = "../configurations"
LOCAL_PATH = "file:///mnt/archive/Development"
GIT_PATH = "https://raw.github.com/kynikos/wiki-monkey"
ALIB_PATH = "../../lib.js.generic/src"
MATCHES = {
    "ArchWiki": "// @{} https://wiki.archlinux.org/*",
    "Wikipedia": "// @{} http://*.wikipedia.org/*",
}
JQUERY_URL = "https://code.jquery.com/jquery-2.1.3.min.js"
JQUERY = urllib.request.urlopen(JQUERY_URL).read().decode('utf-8')
META_HEADER = """// ==UserScript==
// @version {}
// ==/UserScript==
"""
# In order for two versions of WM for different wikis to be installed together,
# they must have a different @name
USER_HEADER = """// ==UserScript==
// @id wiki-monkey-{ID}
// @name Wiki Monkey{NAME}
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version {VERSION}
// @description MediaWiki-compatible bot and editor assistant that runs in the browser ({WIKI} version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL {UPDPATH}
// @downloadURL {DLPATH}
// @icon {PATH}/{GITREF}auxiliary/wiki-monkey.png
// @icon64 {PATH}/{GITREF}auxiliary/wiki-monkey-64.png
{MATCHES}
// @grant GM_info
// @grant GM_xmlhttpRequest
{REQUIRES}// ==/UserScript==

"""
STANDALONE = {
    "start": "\nif (location.href.match({})) {{\n",
    "matches": {
        "Wikipedia": "/^http:\/\/[a-z]+\.wikipedia\.org/i",
        "ArchWiki": "/^https:\/\/wiki\.archlinux\.org/i",
    },
    "end": "\n}\n",
}


def get_licence():
    with open(MODULES_PATH + "/" + MODULES_COMMON[0] + ".js", 'r') as s:
        match = re.match('\s*?(/\*.+?\*/)', s.read(), re.DOTALL)
        return match.group(1) + "\n"


def get_script(path):
    with open(path, 'r') as s:
        code = s.read()
        match = re.match('^\s*?/\*.+?\*/.*?\n(.+?)\n*$', code, re.DOTALL)

        if match:
            code = match.group(1)

        return code + "\n"


def compose_include(licence, wiki, iname, version):
    text = """
if (!GM_info) {{
    var GM_info = {{
        script: {{
            version: "{}",
        }},
    }};

    var GM_emulation = true;
}};
""".format(version)

    for module in ALIB:
        text += get_script(ALIB_PATH + "/" + module + ".js")

    for module in MODULES_COMMON:
        text += get_script(MODULES_PATH + "/" + module + ".js")

    for module in MODULES[wiki]:
        text += get_script(MODULES_PATH + "/" + module + ".js")

    for plugin in PLUGINS_COMMON:
        text += get_script(PLUGINS_PATH + "/" + plugin + ".js")

    for plugin in PLUGINS[wiki]:
        text += get_script(PLUGINS_PATH + "/" + plugin + ".js")

    if wiki != "local":
        with open(os.path.join(SCRIPTS_PATH, iname), 'w') as f:
            f.write(licence + text)

    return text


def merge_conf_plugins(*dicts):
    mdict = {}

    for dict_ in dicts:
        for type_ in dict_:
            try:
                mdictt = mdict[type_]
            except KeyError:
                # No need for a deep copy because the inner values aren't
                # supposed to be modified dynamically
                mdict[type_] = dict_[type_].copy()
            else:
                for id_ in dict_[type_]:
                    if id_ in mdictt:
                        # This prevents from adding two different plugins with
                        # the same ID
                        raise KeyError("Duplicated id {}".format(id_))

                mdictt.update(dict_[type_])

    return mdict


def compose_config(wiki, browser, conf_name, disables):
    if wiki != "local":
        conf_plugins = merge_conf_plugins(CONFIG_COMMON_PLUGINS,
                                          CONFIG_PLUGINS[wiki])
    else:
        conf_plugins = merge_conf_plugins(CONFIG_COMMON_PLUGINS,
                                          *CONFIG_PLUGINS.values())

    for disable in disables:
        for type_ in disable:
            for id_ in disable[type_]:
                tmplist = list(conf_plugins[type_][id_])
                tmplist[1] = None
                conf_plugins[type_][id_] = tuple(tmplist)

    conf = {
        "Plugins": conf_plugins,
        "Mods": CONFIG_MODS,
    }
    cfg = json.dumps(conf, indent=4, sort_keys=True)

    if conf_name is not None:
        with open(os.path.join(CONF_PATH, conf_name + ".json"), 'w') as f:
            f.write(cfg)

    return cfg


def compose_update_path(wiki, fname, path, inst_path):
    if wiki == "local":
        return "".join((path, inst_path[2:], "/WikiMonkey-local.user.js"))
    else:
        return "".join((path, "/", UPDATE, inst_path[2:], "/", fname,
                                                                ".meta.js"))


def compose_download_path(wiki, fname, path, inst_path):
    if wiki == "local":
        return "".join((path, inst_path[2:], "/WikiMonkey-local.user.js"))
    else:
        return "".join((path, "/", UPDATE, inst_path[2:], "/", fname,
                                                                ".user.js"))


def compose_matches(wiki, browser):
    match = "match" if browser != "opera" else "include"

    try:
        return MATCHES[wiki].format(match)
    except KeyError:
        matches = list(MATCHES.values())
        # Explicitly sort the values, otherwise the order seems to change
        # randomly
        matches.sort()
        return "\n".join((value.format(match) for value in matches))


def compose_requires(wiki, browser, iname):
    text = ""

    if browser == "GM":
        text += "// @require {}\n".format(JQUERY_URL)

        if wiki == "local":
            for module in ALIB:
                text += "// @require {}/lib.js.generic/src/{}.js\n".format(
                                                        LOCAL_PATH, module)

            for module in MODULES_COMMON:
                text += "// @require {}/wiki-monkey/modules/{}.js\n".format(
                                                            LOCAL_PATH, module)

            for module in MODULES[wiki]:
                text += "// @require {}/wiki-monkey/modules/{}.js\n".format(
                                                            LOCAL_PATH, module)

            for module in PLUGINS_COMMON:
                text += "// @require {}/wiki-monkey/plugins/{}.js\n".format(
                                                            LOCAL_PATH, module)

            for module in PLUGINS[wiki]:
                text += "// @require {}/wiki-monkey/plugins/{}.js\n".format(
                                                            LOCAL_PATH, module)

        else:
            text += "// @require {}/{}/scripts/{}\n".format(GIT_PATH, GIT_REF,
                                                                        iname)

    return text


def compose_meta(wiki, browser, fname, version, inst_path):
    if wiki != "local" and browser != "standalone":
        with open(os.path.join(inst_path, fname + ".meta.js"), 'w') as f:
            f.write(META_HEADER.format(version))


def compose_script(licence, wiki, iname, browser, name, fname, version,
                                            include, conf, inst_path, old_id):
    path = LOCAL_PATH + "/wiki-monkey" if wiki == "local" else GIT_PATH
    git_ref = "" if wiki == "local" else GIT_REF + "/"

    text = ""

    if browser != "standalone":
        text += USER_HEADER.format(**{
            "ID": name if old_id else wiki.lower(),
            "NAME": "" if old_id else " ({})".format(wiki),
            "WIKI": wiki,
            "VERSION": version,
            "UPDPATH": compose_update_path(wiki, fname, path, inst_path),
            "DLPATH": compose_download_path(wiki, fname, path, inst_path),
            "PATH": path,
            "GITREF": git_ref,
            "MATCHES": compose_matches(wiki, browser),
            "REQUIRES": compose_requires(wiki, browser, iname),
        })

    if browser != "GM":
        text += JQUERY + "\n" + licence

    if browser == "standalone":
        text += STANDALONE["start"].format(STANDALONE["matches"][wiki])

    if browser != "GM":
        text += include + "\n"

    text += "WM.main({});\n".format(conf)

    if browser == "standalone":
        text += STANDALONE["end"]

    ext = ".js" if old_id and browser == "standalone" else ".user.js"

    with open(os.path.join(inst_path, fname + ext), 'w') as f:
        f.write(text)


def main():
    # These paths may have been removed when checking out old commits
    # The src/* folders should be old enough not to require being re-created
    for path in (CONF_PATH, SCRIPTS_PATH):
        try:
            os.mkdir(path, mode=0o755)
        except FileExistsError:
            pass

    licence = get_licence()

    for wiki in SCRIPTS:
        iname = "WikiMonkey-" + wiki + ".include.js"
        version = "-".join((VERSION, wiki.lower()))
        include = compose_include(licence, wiki, iname, version)

        for browser in SCRIPTS[wiki]:
            for name in SCRIPTS[wiki][browser]:
                fname = "WikiMonkey-" + name
                inst_path, conf_name, old_id, disables = SCRIPTS[wiki][browser
                                                                        ][name]
                conf = compose_config(wiki, browser, conf_name, disables)
                compose_meta(wiki, browser, fname, version, inst_path)
                compose_script(licence, wiki, iname, browser, name, fname,
                                    version, include, conf, inst_path, old_id)

if __name__ == '__main__':
    main()
