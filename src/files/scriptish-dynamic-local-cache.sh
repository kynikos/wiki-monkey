#!/bin/bash

# Creates symlinks in the scriptish profile path pointing into WM git tree
# Note: 'extensions.scriptish.cache.enabled' needs to be 'false' for this to work,
# see https://github.com/scriptish/scriptish/wiki/Manual%3A-Preferences#wiki-boolean-extensionsscriptishcacheenabled--new-in-scriptish
#
# usage: scriptish-local-hack.sh <scriptish_profile> <WM_git_path> <Alib_git_path>
#   <scriptish_profile> is usually ~/.mozilla/firefox/<profile_dir>/scriptish_scripts/wiki-monkey-local

function link_from_path() {
    local path="$1"

    for f in "$path"/*.js; do
        f=$(basename "$f")
        lf=${f,,} # lowercase
        if [[ -f "$sc_profile/$lf" ]]; then
            ln -sf "$path/$f" "$sc_profile/$lf"
        else
            echo "skipping $path/$f"
        fi
    done
}

function link_into_git() {
    # Wiki Monkey
    link_from_path "$git_root/src"
    link_from_path "$git_root/src/modules"
    link_from_path "$git_root/src/plugins"

    # Alib
    link_from_path "$alib_root/src"

    # print files that remained non-link
    echo "There are some files that were not re-linked:"
    find "$sc_profile" -type f -name "*.js" -exec basename "{}" \;
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
