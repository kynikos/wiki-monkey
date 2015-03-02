/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
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
    "use strict";

    var languages = {
        local: "English",
        names: {
            "العربية": {subtag: "ar", english: "Arabic"},
            "Български": {subtag: "bg", english: "Bulgarian"},
            "Català": {subtag: "ca", english: "Catalan"},
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
            "Català",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Esperanto",
            "Español",
            "Suomi",
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
            external: ["de", "fa", "fi", "fr", "ja", "ro", "sv", "tr"],
            internal: ["ar", "bg", "cs", "da", "el", "en", "es", "he", "hr",
                       "hu", "id", "it", "ko", "lt", "nl", "pl", "pt",
                       "ru", "sk", "sr", "th", "uk", "zh-cn", "zh-tw"],
        }
    };

    var tablesOfContents = {
        "ar": {
            "page": "Table of Contents (العربية)",
            "root": "Category:العربية",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(العربية\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": true
        },
        "bg": {
            "page": "Table of Contents (Български)",
            "root": "Category:Български",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Български\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "cs": {
            "page": "Table of Contents (Česky)",
            "root": "Category:Česky",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Česky\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "da": {
            "page": "Table of Contents (Dansk)",
            "root": "Category:Dansk",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Dansk\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "el": {
            "page": "Table of Contents (Ελληνικά)",
            "root": "Category:Ελληνικά",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Ελληνικά\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "en": {
            "page": "Table of contents",
            "root": "Category:English",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": null,
            "keepAltName": false,
            "showIndices": true,
            "rightToLeft": false
        },
        "es": {
            "page": "Table of contents (Español)",
            "root": "Category:Español",
            "alsoIn": "también en",
            "indentType": ":",
            "replace": ["[ _]\\(Español\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "he": {
            "page": "Table of Contents (עברית)",
            "root": "Category:עברית",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(עברית\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": true
        },
        "hr": {
            "page": "Table of Contents (Hrvatski)",
            "root": "Category:Hrvatski",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Hrvatski\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "hu": {
            "page": "Table of Contents (Magyar)",
            "root": "Category:Magyar",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Magyar\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "id": {
            "page": "Table of Contents (Indonesia)",
            "root": "Category:Indonesia",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Indonesia\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "it": {
            "page": "Table of Contents (Italiano)",
            "root": "Category:Italiano",
            "alsoIn": "anche in",
            "indentType": ":",
            "replace": ["[ _]\\(Italiano\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "ko": {
            "page": "Table of Contents (한국어)",
            "root": "Category:한국어",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(한국어\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "lt": {
            "page": "Table of Contents (Lietuviškai)",
            "root": "Category:Lietuviškai",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Lietuviškai\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "nl": {
            "page": "Table of Contents (Nederlands)",
            "root": "Category:Nederlands",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Nederlands\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "pl": {
            "page": "Table of Contents (Polski)",
            "root": "Category:Polski",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Polski\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "pt": {
            "page": "Table of Contents (Português)",
            "root": "Category:Português",
            "alsoIn": "também em",
            "indentType": ":",
            "replace": ["[ _]\\(Português\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "ru": {
            "page": "Table of contents (Русский)",
            "root": "Category:Русский",
            "alsoIn": "Также в",
            "indentType": ":",
            "replace": ["[ _]\\(Русский\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "sk": {
            "page": "Table of Contents (Slovenský)",
            "root": "Category:Slovenský",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Slovenský\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "sr": {
            "page": "Table of Contents (Српски)",
            "root": "Category:Српски",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Српски\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "th": {
            "page": "Table of Contents (ไทย)",
            "root": "Category:ไทย",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(ไทย\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "uk": {
            "page": "Table of Contents (Українська)",
            "root": "Category:Українська",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(Українська\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "zh-cn": {
            "page": "Table of Contents (简体中文)",
            "root": "Category:简体中文",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(简体中文\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
        },
        "zh-tw": {
            "page": "Table of Contents (正體中文)",
            "root": "Category:正體中文",
            "alsoIn": "also in",
            "indentType": ":",
            "replace": ["[ _]\\(正體中文\\)", "", ""],
            "keepAltName": true,
            "showIndices": true,
            "rightToLeft": false
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
        return languages.interlanguage.external.concat(
                                            languages.interlanguage.internal);
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
        var matches = title.match(/^(.+?)(?:[ _]\(([^\(]+)\))?$/);
        var pureTitle = matches[1];
        var detectedLanguage = matches[2];

        if (!detectedLanguage || !WM.ArchWiki.isCategoryLanguage(
                                                        detectedLanguage)) {
            // Language categories are exceptions
            // Don't just use /^[ _]*(.+?)[ _]*$/ but require the whole
            //   namespace+title to be passed as the argument (i.e. including
            //   "Category:")
            var testLangCat = matches[1].match(
                                    /^[ _]*[Cc]ategory[ _]*:[ _]*(.+?)[ _]*$/);
            if (testLangCat && WM.ArchWiki.isCategoryLanguage(
                                                            testLangCat[1])) {
                detectedLanguage = testLangCat[1];
                var pureTitle = matches[1];
            }
            else {
                detectedLanguage = this.getLocalLanguage();
                var pureTitle = matches[0];
            }
        }

        return [pureTitle, detectedLanguage];
    };

    this.findAllInterlanguageLinks = function (source) {
        // See also WM.Parser.findInterlanguageLinks!!!
        return WM.Parser.findSpecialLinks(source,
                                    this.getInterwikiLanguages().join("|"));
    };

    this.findInternalInterlanguageLinks = function (source) {
        // See also WM.Parser.findInterlanguageLinks!!!
        return WM.Parser.findSpecialLinks(source,
                            this.getInternalInterwikiLanguages().join("|"));
    };

    this.getTableOfContents = function (tag) {
        return tablesOfContents[tag];
    };
};
