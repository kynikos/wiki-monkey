/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.ArchWikiFixLinks = new function () {
    var doReplace = function (txt) {
        // archlinux.org HTTP -> HTTPS

        var re = /http:\/\/([a-z]+\.)?archlinux\.org(?!\.[a-z])/ig;
        txt = txt.replace(re, 'https://$1archlinux.org');

        // wiki.archlinux.org -> Internal link

        re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/Category:([^\]]+?) (.+?)\]/ig;
        txt = txt.replace(re, '[[:Category:$1|$2]]');

        re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/Category:(.+?)\]/ig;
        txt = txt.replace(re, '[[:Category:$1]]');

        re = /https?:\/\/wiki\.archlinux\.org\/index\.php\/Category:([^\s]+)/ig;
        txt = txt.replace(re, '[[:Category:$1]]');

        re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/([^\]]+?) (.+?)\]/ig;
        txt = txt.replace(re, '[[$1|$2]]');

        re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/(.+?)\]/ig;
        txt = txt.replace(re, '[[$1]]');

        re = /https?:\/\/wiki\.archlinux\.org\/index\.php\/([^\s]+)/ig;
        txt = txt.replace(re, '[[$1]]');

        re = /https?:\/\/wiki\.archlinux\.org(?!\.)/ig;

        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to wiki.archlinux.org");
        }

        // Wikipedia -> wikipedia: interlink

        re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/([^\]]+?) (.+?)\]/ig;
        txt = txt.replace(re, '[[wikipedia:$1|$2]]');

        re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/(.+?)\]/ig;
        txt = txt.replace(re, '[[wikipedia:$1]]');

        re = /https?:\/\/en\.wikipedia\.org\/wiki\/([^\s]+)/ig;
        txt = txt.replace(re, '[[wikipedia:$1]]');

        re = /https?:\/\/([a-z]+?)\.wikipedia\.org(?!\.)/ig;

        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to Wikipedia");
        }

        // Official package links -> Pkg template

        re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/? +(.+?)?\]/ig;
        var groups = re.exec(txt);
        if (groups && groups[1] == groups[2]) {
            txt = txt.replace(re, '{{Pkg|$1}}');
        }

        re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/?\]/ig;
        txt = txt.replace(re, '{{Pkg|$1}}');

        re = /(?:[^\[])https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s\/]+)\/?/ig;
        txt = txt.replace(re, '{{Pkg|$1}}');

        re = /https?:\/\/(?:www\.)?archlinux\.org\/packages(?!\/?\s)/ig;

        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to archlinux.org/packages");
        }

        // AUR package links -> AUR template

        re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/? +(.+?)?\]/ig;
        var groups = re.exec(txt);
        if (groups && groups[1] == groups[2]) {
            txt = txt.replace(re, '{{AUR|$1}}');
        }

        re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/?\]/ig;
        txt = txt.replace(re, '{{AUR|$1}}');

        re = /(?:[^\[])https?:\/\/aur\.archlinux\.org\/packages\/([^\s\/]+)\/?/ig;
        txt = txt.replace(re, '{{AUR|$1}}');

        re = /https?:\/\/aur\.archlinux\.org(?!(?:\.|(?:\/?packages)?\/?\s))/ig;

        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to aur.archlinux.org (try the \"Fix old AUR links\" function, if installed)");
        }

        // Bug links -> Bug template

        re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/? +(.+?)?\]/ig;
        var groups = re.exec(txt);
        if (groups && groups[1] == groups[2]) {
            txt = txt.replace(re, '{{Bug|$1}}');
        }

        re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/?\]/ig;
        txt = txt.replace(re, '{{Bug|$1}}');

        re = /(?:[^\[])https?:\/\/bugs\.archlinux\.org\/task\/([^\s\/]+)\/?/ig;
        txt = txt.replace(re, '{{Bug|$1}}');

        re = /https?:\/\/bugs\.archlinux\.org\/task/ig;

        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to bugs.archlinux.org/task");
        }

        return txt;
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = doReplace(source);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed links");
        }
        else {
            WM.Log.logInfo("No fixable links found");
        }

        if (callNext) {
            callNext();
        }
    };

    /*
     * Note that it's too dangerous to use this plugin with the bot, in fact
     * some full URLs are correctly used in code blocks (e.g. wget lines)
     */
};
