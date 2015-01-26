#!/bin/bash

# Creates symlinks in the greasemonkey profile path pointing into WM git tree
#
# Warning: it is not possible to detect if some file was added/renamed/deleted in the WM git
# tree, in such cases it will be necessary to reinstall WM and re-run this script.
#
# usage: gm-dynamic-local-cache.sh <greasemonkey_profile> <WM_git_path> <Alib_git_path>
#   <greasemonkey_profile> is usually ~/.mozilla/firefox/<profile_dir>/gm_scripts/Wiki_Monkey
#   paths must not have a final slash

function link_from_path() {
    local path="$1"

    for f in "$path"/*.js; do
        f=$(basename "$f")
        if [[ -f "$gm_profile/$f" ]]; then
            ln -sf "$path/$f" "$gm_profile/$f"
        else
            echo "skipping $path/$f"
        fi
    done
}

function link_into_git() {
    # Wiki Monkey
    link_from_path "$git_root/modules"
    link_from_path "$git_root/plugins"

    # Alib
    link_from_path "$alib_root/src"

    # print files that remained non-link
    echo "There are some files that were not re-linked:"
    find "$gm_profile" -type f -name "*.js" -exec basename "{}" \;
}


# check passed paths
gm_profile="$1"
git_root="$2"
alib_root="$3"

if [[ ! -f "$gm_profile/WikiMonkey-local.user.js" ]]; then
    echo "$gm_profile/WikiMonkey-local.user.js does not exist, is '$gm_profile' greasemonkey profile path correct?"
    exit 1
fi

if [[ ! -f "$git_root/modules/_Init.js" ]]; then
    echo "$git_root/modules/_Init.js does not exist, is '$git_root' as WM git root correct?"
    exit 1
fi

if [[ ! -d "$alib_root" ]]; then
    echo "$alib_root does not exist, is '$alib_root' as Alib git root correct?"
    exit 1
fi

link_into_git "$gm_profile" "$git_root" "$alib_root"
