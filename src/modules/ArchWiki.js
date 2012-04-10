/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2012 Dario Giovannetti <dev@dariogiovannetti.net>
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
        names: {
            "Български": {subtag: "bg", english: "Bulgarian"},
            "Česky": {subtag: "cs", english: "Czech"},
            "Dansk": {subtag: "da", english: "Danish"},
            "Deutsch": {subtag: "de", english: "German"},
            "Ελληνικά": {subtag: "el", english: "Greek"},
            "English": {subtag: "en", english: "English"},
            "Español": {subtag: "es", english: "Spanish"},
            "Suomi": {subtag: "fi", english: "Finnish"},
            "Français": {subtag: "fr", english: "French"},
            "עברית": {subtag: "he", english: "Hebrew"},
            "Hrvatski": {subtag: "hr", english: "Croatian"},
            "Magyar": {subtag: "hu", english: "Hungarian"},
            "Indonesia": {subtag: "id", english: "Indonesian"},
            "Italiano": {subtag: "it", english: "Italian"},
            "日本語": {subtag: "ja", english: "Japanese"},
            "Қазақша": {subtag: "kk", english: "Kazakh"},
            "한국어": {subtag: "ko", english: "Korean"},
            "Lietuviškai": {subtag: "lt", english: "Lithuanian"},
            "Македонски": {subtag: "mk", english: "Macedonian"},
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
            "简体中文": {subtag: "zh-CN", english: "Chinese (Simplified)"},
            "正體中文": {subtag: "zh-TW", english: "Chinese (Traditional)"}
        },
        categories: [
            "Български",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Español",
            "Suomi",
            "Français",
            "עברית",
            "Hrvatski",
            "Magyar",
            "Indonesia",
            "Italiano",
            "日本語",
            "Қазақша",
            "한국어",
            "Lietuviškai",
            "Македонски",
            "Nederlands",
            "Polski",
            "Português",
            "Română",
            "Русский",
            "Slovenský",
            "Српски",
            "Svenska",
            "ไทย",
            "Türkçe",
            "Українська",
            "简体中文",
            "正體中文"
        ],
        i18n: [
            "Български",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Español",
            "Suomi",
            "Français",
            "עברית",
            "Magyar",
            "Indonesia",
            "Italiano",
            "日本語",
            "한국어",
            "Lietuviškai",
            "Nederlands",
            "Polski",
            "Português",
            "Русский",
            "Slovenský",
            "Српски",
            "Svenska",
            "ไทย",
            "Türkçe",
            "Українська",
            "简体中文",
            "正體中文"
        ],
        interwiki: {
            all: ["de", "en", "es", "fr", "pl", "ro", "sv", "uk"],
            alive: ["de", "fr", "ro"],
            unused: ["en"],
            dead: ["es", "pl", "sv", "uk"]
        }
    };
    
    this.getCategoryLanguages = function () {
        return languages.categories;
    };
    
    this.isCategoryLanguage = function (lang) {
        return languages.categories.indexOf(lang) > -1;
    };
    
    this.getI18nLanguages = function () {
        return languages.i18n;
    };
    
    this.isI18nLanguage = function (lang) {
        return languages.i18n.indexOf(lang) > -1;
    };
    
    this.getInterwikiLanguages = function () {
        return languages.interwiki.all;
    };
    
    this.isInterwikiLanguage = function (lang) {
        return languages.interwiki.all.indexOf(lang) > -1;
    };
    
    this.getAliveInterwikiLanguages = function () {
        return languages.interwiki.alive;
    };
    
    this.isAliveInterwikiLanguage = function (lang) {
        return languages.interwiki.alive.indexOf(lang) > -1;
    };
    
    this.getUnusedInterwikiLanguages = function () {
        return languages.interwiki.unused;
    };
    
    this.isUnusedInterwikiLanguage = function (lang) {
        return languages.interwiki.unused.indexOf(lang) > -1;
    };
    
    this.getDeadInterwikiLanguages = function () {
        return languages.interwiki.dead;
    };
    
    this.isDeadInterwikiLanguage = function (lang) {
        return languages.interwiki.dead.indexOf(lang) > -1;
    };
};
