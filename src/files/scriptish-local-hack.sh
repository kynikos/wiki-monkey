#!/bin/bash

# Creates symlinks in the scriptish profile path pointing into WM git tree
# Note: 'extensions.scriptish.cache.enabled' needs to be 'false' for this to work,
# see https://github.com/scriptish/scriptish/wiki/Manual%3A-Preferences#wiki-boolean-extensionsscriptishcacheenabled--new-in-scriptish
#
# usage: scriptish-local-hack.sh <scriptish_profile> <WM_git_path> <Alib_git_path>
#   <scriptish_profile> is usually ~/.mozilla/firefox/<profile_dir>/scriptish_scripts/wiki-monkey-local

function safe_ln() {
    local target="$1"
    local dest="$2"

    if [[ -e "$target" ]]; then
        ln -sf "$target" "$dest"
    else
        echo "error: symlink target '$target' does not exist"
        exit 1
    fi
}

function link_into_git() {
    # Wiki Monkey modules
    safe_ln "$git_root/src/modules/ArchPackages.js" "$sc_profile/archpackages.js"
    safe_ln "$git_root/src/modules/ArchWiki.js" "$sc_profile/archwiki.js"
    safe_ln "$git_root/src/modules/Bot.js" "$sc_profile/bot.js"
    safe_ln "$git_root/src/modules/Cat.js" "$sc_profile/cat.js"
    safe_ln "$git_root/src/modules/Diff.js" "$sc_profile/diff.js"
    safe_ln "$git_root/src/modules/Editor.js" "$sc_profile/editor.js"
    safe_ln "$git_root/src/modules/Interlanguage.js" "$sc_profile/interlanguage.js"
    safe_ln "$git_root/src/modules/Log.js" "$sc_profile/log.js"
    safe_ln "$git_root/src/modules/MW.js" "$sc_profile/mw.js"
    safe_ln "$git_root/src/modules/Parser.js" "$sc_profile/parser.js"
    safe_ln "$git_root/src/modules/RecentChanges.js" "$sc_profile/recentchanges.js"
    safe_ln "$git_root/src/modules/Tables.js" "$sc_profile/tables.js"
    safe_ln "$git_root/src/modules/UI.js" "$sc_profile/ui.js"
    safe_ln "$git_root/src/modules/WhatLinksHere.js" "$sc_profile/whatlinkshere.js"

    # Wiki Monkey plugins
    safe_ln "$git_root/src/plugins/ArchWikiFixHeader.js" "$sc_profile/archwikifixheader.js"
    safe_ln "$git_root/src/plugins/ArchWikiFixHeadings.js" "$sc_profile/archwikifixheadings.js"
    safe_ln "$git_root/src/plugins/ArchWikiFixLinks.js" "$sc_profile/archwikifixlinks.js"
    safe_ln "$git_root/src/plugins/ArchWikiNewTemplates.js" "$sc_profile/archwikinewtemplates.js"
    safe_ln "$git_root/src/plugins/ArchWikiOldAURLinks.js" "$sc_profile/archwikioldaurlinks.js"
    safe_ln "$git_root/src/plugins/ArchWikiQuickReport.js" "$sc_profile/archwikiquickreport.js"
    safe_ln "$git_root/src/plugins/ArchWikiRCFilter.js" "$sc_profile/archwikircfilter.js"
    safe_ln "$git_root/src/plugins/ArchWikiSaveTalk.js" "$sc_profile/archwikisavetalk.js"
    safe_ln "$git_root/src/plugins/ArchWikiSummaryToRelated.js" "$sc_profile/archwikisummarytorelated.js"
    safe_ln "$git_root/src/plugins/ArchWikiUpdatePackageTemplates.js" "$sc_profile/archwikiupdatepackagetemplates.js"
    safe_ln "$git_root/src/plugins/ArchWikiWantedCategories.js" "$sc_profile/archwikiwantedcategories.js"
    safe_ln "$git_root/src/plugins/ExpandContractions.js" "$sc_profile/expandcontractions.js"
    safe_ln "$git_root/src/plugins/FixBacklinkFragments.js" "$sc_profile/fixbacklinkfragments.js"
    safe_ln "$git_root/src/plugins/FixDoubleRedirects.js" "$sc_profile/fixdoubleredirects.js"
    safe_ln "$git_root/src/plugins/FixFragments.js" "$sc_profile/fixfragments.js"
    safe_ln "$git_root/src/plugins/FixLinkFragments.js" "$sc_profile/fixlinkfragments.js"
    safe_ln "$git_root/src/plugins/MultipleLineBreaks.js" "$sc_profile/multiplelinebreaks.js"
    safe_ln "$git_root/src/plugins/SimpleReplace.js" "$sc_profile/simplereplace.js"
    safe_ln "$git_root/src/plugins/SynchronizeInterlanguageLinks.js" "$sc_profile/synchronizeinterlanguagelinks.js"
    safe_ln "$git_root/src/plugins/UpdateCategoryTree.js" "$sc_profile/updatecategorytree.js"

    # Wiki Monkey
    safe_ln "$git_root/src/WikiMonkey.js" "$sc_profile/wikimonkey.js"

    # Alib
    safe_ln "$alib_root/src/Async.js" "$sc_profile/async.js"
    safe_ln "$alib_root/src/Compatibility.js" "$sc_profile/compatibility.js"
    safe_ln "$alib_root/src/DOM.js" "$sc_profile/dom.js"
    safe_ln "$alib_root/src/HTTP.js" "$sc_profile/http.js"
    safe_ln "$alib_root/src/Obj.js" "$sc_profile/obj.js"
    safe_ln "$alib_root/src/RegEx.js" "$sc_profile/regex.js"
    safe_ln "$alib_root/src/Str.js" "$sc_profile/str.js"

#    safe_ln "$alib_root/src/" "jquery-172min.js"
#    safe_ln "$alib_root/src/" "wiki-monkey-local.user.js"
}


# check passed paths
sc_profile="$1"
git_root="$2"
alib_root="$3"

if [[ ! -f "$sc_profile/wiki-monkey-local.user.js" ]]; then
    echo "$sc_profile/wiki-monkey-local.user.js does not exist, is '$sc_profile' scriptish profile path correct?"
    exit 1
fi

if [[ ! -f "$git_root/src/WikiMonkey.js" ]]; then
    echo "$git_root/src/WikiMonkey.js does not exist, is '$git_root' as WM git root correct?"
    exit 1
fi

if [[ ! -d "$alib_root" ]]; then
    echo "$alib_root does not exist, is '$alib_root' as Alib git root correct?"
    exit 1
fi

link_into_git "$sc_profile" "$git_root" "$alib_root"
