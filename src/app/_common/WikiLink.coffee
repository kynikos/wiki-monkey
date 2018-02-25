
# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

WM = require('../../modules')


module.exports.linkToWikiPage = (title, anchor) ->
    # Must return a string, not a DOM element
    # Use an absolute (full) URL so it will be usable in the downloadable
    #   version of the log
    # Do *not* use encodeURIComponent(title) because the passed title may
    #   have a fragment or a query string that would then be encoded
    #   MediaWiki should be able to correctly resolve the title anyway
    wikiUrls = WM.MW.getWikiUrls()
    return "<a href=\"#{wikiUrls.short}#{title}\">#{anchor}</a>"
