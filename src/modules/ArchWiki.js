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

WM.ArchWiki = new function () {
    var languages = {
        local: "English",
        names: {
            "العربية": {subtag: "ar", english: "Arabic"},
            "Български": {subtag: "bg", english: "Bulgarian"},
            "Česky": {subtag: "cs", english: "Czech"},
            "Dansk": {subtag: "da", english: "Danish"},
            "Deutsch": {subtag: "de", english: "German"},
            "Ελληνικά": {subtag: "el", english: "Greek"},
            "English": {subtag: "en", english: "English"},
            "Esperanto": {subtag: "eo", english: "Esperanto"},
            "Español": {subtag: "es", english: "Spanish"},
            "فارسی": {subtag: "fa", english: "Persian"},
            "Suomi": {subtag: "fi", english: "Finnish"},
            "Français": {subtag: "fr", english: "French"},
            "עברית": {subtag: "he", english: "Hebrew"},
            "Hrvatski": {subtag: "hr", english: "Croatian"},
            "Magyar": {subtag: "hu", english: "Hungarian"},
            "Indonesia": {subtag: "id", english: "Indonesian"},
            "Italiano": {subtag: "it", english: "Italian"},
            "日本語": {subtag: "ja", english: "Japanese"},
            "한국어": {subtag: "ko", english: "Korean"},
            "Lietuviškai": {subtag: "lt", english: "Lithuanian"},
            "Norsk Bokmål": {subtag: "nb", english: "Norwegian (Bokmål)"},
            "Nederlands": {subtag: "nl", english: "Dutch"},
            "Polski": {subtag: "pl", english: "Polish"},
            "Português": {subtag: "pt", english: "Portuguese"},
            "Română": {subtag: "ro", english: "Romanian"},
            "Русский": {subtag: "ru", english: "Russian"},
            "Slovenský": {subtag: "sk", english: "Slovak"},
            "Српски": {subtag: "sr", english: "Serbian"},
            "Svenska": {subtag: "sv", english: "Swedish"},
            "ไทย": {subtag: "th", english: "Thai"},
            "Türkçe": {subtag: "tr", english: "Turkish"},
            "Українська": {subtag: "uk", english: "Ukrainian"},
            "Tiếng Việt": {subtag: "vi", english: "Vietnamese"},
            "简体中文": {subtag: "zh-CN", english: "Chinese (Simplified)"},
            "正體中文": {subtag: "zh-TW", english: "Chinese (Traditional)"}
        },
        categories: [
            "العربية",
            "Български",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Esperanto",
            "Español",
            "Suomi",
            "Français",
            "עברית",
            "Hrvatski",
            "Magyar",
            "Indonesia",
            "Italiano",
            "日本語",
            "한국어",
            "Lietuviškai",
            "Norsk Bokmål",
            "Nederlands",
            "Polski",
            "Português",
            "Русский",
            "Slovenský",
            "Српски",
            "ไทย",
            "Українська",
            "简体中文",
            "正體中文"
        ],
        interlanguage: {
            external: ["de", "fa", "fi", "fr", "ro", "sv", "tr"],
            internal: ["bg", "cs", "da", "el", "en", "es", "he", "hr", "hu",
                       "id", "it", "ja", "ko", "lt", "nl", "pl", "pt", "ru",
                       "sk", "sr", "th", "uk", "zh-cn", "zh-tw"],
        }
    };

    this.getLocalLanguage = function () {
        return languages.local;
    };

    this.getCategoryLanguages = function () {
        return languages.categories;
    };

    this.isCategoryLanguage = function (lang) {
        return languages.categories.indexOf(lang) > -1;
    };

    this.getInterwikiLanguages = function () {
        return languages.interlanguage.external.concat(languages.interlanguage.internal);
    };

    this.isInterwikiLanguage = function (lang) {
        return this.getInterwikiLanguages().indexOf(lang) > -1;
    };

    this.getInternalInterwikiLanguages = function () {
        return languages.interlanguage.internal;
    };

    this.isInternalInterwikiLanguage = function (lang) {
        return languages.interlanguage.internal.indexOf(lang) > -1;
    };

    this.getInterlanguageTag = function (language) {
        return languages.names[language].subtag;
    };

    this.detectLanguage = function (title) {
        var matches = title.match(/^(.+?)([ _]\(([^\(]+)\))?$/);
        var detectedLanguage = matches[3];
        var pureTitle;
        if (!detectedLanguage || !WM.ArchWiki.isCategoryLanguage(detectedLanguage)) {
            // Language categories are exceptions
            var testLangCat = matches[1].match(/^ *[Cc]ategory *: *(.+?) *$/);
            if (testLangCat && WM.ArchWiki.isCategoryLanguage(testLangCat[1])) {
                detectedLanguage = testLangCat[1];
                pureTitle = matches[1];
            }
            else {
                detectedLanguage = this.getLocalLanguage();
                pureTitle = matches[0];
            }
        }
        else {
            pureTitle = matches[1];
        }
        return [pureTitle, detectedLanguage];
    };

    this.findAllInterlanguageLinks = function (source) {
        // See also WM.Parser.findInterlanguageLinks!!!
        return WM.Parser.findSpecialLinks(source, this.getInterwikiLanguages().join("|"));
    };

    this.findInternalInterlanguageLinks = function (source) {
        // See also WM.Parser.findInterlanguageLinks!!!
        return WM.Parser.findSpecialLinks(source, this.getInternalInterwikiLanguages().join("|"));
    };
};
