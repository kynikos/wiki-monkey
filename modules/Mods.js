/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Mods = new function () {
    "use strict";

    var disableEditSummarySubmitOnEnter = function () {
        $('#wpSummary').keydown(function(event) {
            // 'keyCode' is deprecated, but not all browsers support 'key' yet
            if (event.key == 'Enter' || (typeof event.key === 'undefined' &&
                                                        event.keyCode == 13)) {
                event.preventDefault();
                return false;
            }
        });
    };

    var hideRollbackLinks = function () {
        Alib.CSS.addStyleElement("span.mw-rollback-link {display:none;}");
    };

    var scrollToFirstHeading = function () {
        window.scrollTo(0, $('#firstHeading').offset().top);
    };

    this.applyGeneralMods = function() {
        var conf = WM.Cfg._getGeneralMods();
    };

    this.applyEditorMods = function() {
        var conf = WM.Cfg._getEditorMods();
        if (conf['disable_edit_summary_submit_on_enter']) {
            disableEditSummarySubmitOnEnter();
        }
        if (conf['scroll_to_first_heading']) {
            scrollToFirstHeading();
        }
    };

    this.applyRecentChangesMods = function() {
        var conf = WM.Cfg._getRecentChangesMods();
        if (conf['hide_rollback_links']) {
            hideRollbackLinks();
        }
    };

    this.applyContributionsMods = function() {
        var conf = WM.Cfg._getContributionsMods();
        if (conf['hide_rollback_links']) {
            hideRollbackLinks();
        }
    };
};
