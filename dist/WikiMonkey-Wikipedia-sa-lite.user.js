/*
 * Wiki Monkey - MediaWiki bot and editor-assistant user script
 * Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 * This file is part of Wiki Monkey.
 *
 * Wiki Monkey is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wiki Monkey is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

if (location.href.match(/^http:\/\/[a-z]+\.wikipedia\.org/i)) {

"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var WM, WM_;

    WM_ = require('./modules/_Init').WM;

    WM = new WM_(['ExpandContractions', require("./plugins/ExpandContractions").ExpandContractions], ['FixBacklinkFragments', require("./plugins/FixBacklinkFragments").FixBacklinkFragments], ['FixDoubleRedirects', require("./plugins/FixDoubleRedirects").FixDoubleRedirects], ['FixFragments', require("./plugins/FixFragments").FixFragments], ['FixLinkFragments', require("./plugins/FixLinkFragments").FixLinkFragments], ['MultipleLineBreaks', require("./plugins/MultipleLineBreaks").MultipleLineBreaks], ['SimpleReplace', require("./plugins/SimpleReplace").SimpleReplace], ['SynchronizeInterlanguageLinks', require("./plugins/SynchronizeInterlanguageLinks").SynchronizeInterlanguageLinks], ['UpdateCategoryTree', require("./plugins/UpdateCategoryTree").UpdateCategoryTree]);

    WM.main(require("../build/configurations/Wikipedia-bot"));
  }, { "../build/configurations/Wikipedia-bot": 2, "./modules/_Init": 20, "./plugins/ExpandContractions": 21, "./plugins/FixBacklinkFragments": 22, "./plugins/FixDoubleRedirects": 23, "./plugins/FixFragments": 24, "./plugins/FixLinkFragments": 25, "./plugins/MultipleLineBreaks": 26, "./plugins/SimpleReplace": 27, "./plugins/SynchronizeInterlanguageLinks": 28, "./plugins/UpdateCategoryTree": 29 }], 2: [function (require, module, exports) {
    module.exports = {
      "Mods": {
        "Contributions": {
          "hide_rollback_links": true
        },
        "Editor": {
          "disable_edit_summary_submit_on_enter": true,
          "scroll_to_first_heading": false
        },
        "General": {
          "heading_number_style": false
        },
        "RecentChanges": {
          "hide_rollback_links": true
        }
      },
      "Plugins": {
        "Bot": {
          "010SR": ["SimpleReplace", ["RegExp substitution"], null],
          "020BL": ["FixBacklinkFragments", ["Fix links to specific sections of a target page"], "fix links to specific sections"],
          "030IL": ["SynchronizeInterlanguageLinks", null, null]
        },
        "Diff": {},
        "Editor": {
          "040SL": ["FixFragments", ["Text plugins", "Fix section links"], null],
          "060EC": ["ExpandContractions", ["Text plugins", "Expand contractions"], null],
          "070ML": ["MultipleLineBreaks", ["Text plugins", "Squash multiple line breaks"], null],
          "110SR": ["SimpleReplace", ["RegExp substitution"], null],
          "210ES": ["FixLinkFragments", ["Query plugins", "Fix external section links"], null],
          "220IL": ["SynchronizeInterlanguageLinks", null, null]
        },
        "NewPages": {},
        "RecentChanges": {},
        "Special": {
          "020DR": ["FixDoubleRedirects", ["Fix double redirects"], "fix double redirect"],
          "030CT": ["UpdateCategoryTree", null, null]
        }
      }
    };
  }, {}], 3: [function (require, module, exports) {
    var $, Obj, RegEx;

    $ = window.$;

    Obj = require('../../lib.js.generic/dist/Obj');

    RegEx = require('../../lib.js.generic/dist/RegEx');

    module.exports.ArchPackages = function () {
      var isPackageGroup;

      var ArchPackages = function () {
        function ArchPackages(WM) {
          _classCallCheck(this, ArchPackages);

          this.WM = WM;
          null;
        }

        _createClass(ArchPackages, [{
          key: "searchOfficialPackagesByExactName",
          value: function searchOfficialPackagesByExactName(name, call, callArgs) {
            var url;
            url = "https://www.archlinux.org/packages/search/json/";
            return $.get({
              url: url,
              data: {
                name: name
              }
            }).done(function (data, textStatus, jqXHR) {
              if (!data instanceof Object) {
                this.WM.Log.logError("The Official Repositories web interface returned an unexpected object");
              }
              if (data) {
                return call(data, callArgs);
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              return this.WM.Log.logError(this.WM.MW.failedQueryError(url));
            });
          }
        }, {
          key: "isOfficialPackage",
          value: function isOfficialPackage(pkg, call, callArgs) {
            var call2;
            call2 = function call2(res, args) {
              if (res.results.length) {
                return call(true, args);
              } else {
                return call(false, args);
              }
            };
            return this.WM.ArchPackages.searchOfficialPackagesByExactName(pkg, call2, callArgs);
          }
        }, {
          key: "getAURInfo",
          value: function getAURInfo(arg, call, callArgs) {
            var _this2 = this;

            var url;

            url = "https://aur.archlinux.org/rpc.php";
            return $.get({
              url: url,
              data: {
                type: "info",
                arg: arg
              }
            }).done(function (data, textStatus, jqXHR) {
              if (!data instanceof Object) {
                _this2.WM.Log.logError("The AUR's RPC interface returned an unexpected object");
              }
              if (data) {
                return call(data, callArgs);
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              return _this2.WM.Log.logError(_this2.WM.MW.failedQueryError(url));
            });
          }
        }, {
          key: "isAURPackage",
          value: function isAURPackage(pkg, call, callArgs) {
            var call2;
            call2 = function call2(res, args) {
              if (res.type === "error") {
                return this.WM.Log.logError("The AUR's RPC interface returned an error: " + res.results);
              } else {
                if (res.resultcount > 0) {
                  return call(true, args);
                } else {
                  return call(false, args);
                }
              }
            };
            return this.WM.ArchPackages.getAURInfo(pkg, call2, callArgs);
          }
        }, {
          key: "isPackageGroup64",
          value: function isPackageGroup64(grp, call, callArgs) {
            return isPackageGroup('x86_64', grp, call, callArgs);
          }
        }, {
          key: "isPackageGroup32",
          value: function isPackageGroup32(grp, call, callArgs) {
            return isPackageGroup('i686', grp, call, callArgs);
          }
        }]);

        return ArchPackages;
      }();

      ;

      isPackageGroup = function isPackageGroup(arch, grp, call, callArgs) {
        var _this3 = this;

        var url;
        url = "https://www.archlinux.org/groups/" + encodeURIComponent(arch) + "/" + encodeURIComponent(grp);
        return $.get({
          url: url
        }).done(function (data, textStatus, jqXHR) {
          var escarch, escgrp, regExp;

          escgrp = RegEx.escapePattern(grp);
          escarch = RegEx.escapePattern(arch);
          regExp = new RegExp("<h2>\\s*Group Details -\\s*" + escgrp + "\\s*\\(" + escarch + "\\)\\s*</h2>", "");
          if (data.search(regExp) > -1) {
            return call(true, callArgs);
          } else {
            return call(false, callArgs);
          }
        }).fail(function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 404) {
            return call(false, callArgs);
          } else {
            return _this3.WM.Log.logError(_this3.WM.MW.failedQueryError(url));
          }
        });
      };

      return ArchPackages;
    }();
  }, { "../../lib.js.generic/dist/Obj": 35, "../../lib.js.generic/dist/RegEx": 36 }], 4: [function (require, module, exports) {
    module.exports.ArchWiki = function () {
      var languages, tablesOfContents;

      var ArchWiki = function () {
        function ArchWiki(WM) {
          _classCallCheck(this, ArchWiki);

          this.WM = WM;
          null;
        }

        _createClass(ArchWiki, [{
          key: "getLocalLanguage",
          value: function getLocalLanguage() {
            return languages.local;
          }
        }, {
          key: "getCategoryLanguages",
          value: function getCategoryLanguages() {
            return languages.categories;
          }
        }, {
          key: "isCategoryLanguage",
          value: function isCategoryLanguage(lang) {
            return languages.categories.indexOf(lang) > -1;
          }
        }, {
          key: "getInterwikiLanguages",
          value: function getInterwikiLanguages() {
            return languages.interlanguage.external.concat(languages.interlanguage.internal);
          }
        }, {
          key: "isInterwikiLanguage",
          value: function isInterwikiLanguage(lang) {
            return this.getInterwikiLanguages().indexOf(lang) > -1;
          }
        }, {
          key: "getInternalInterwikiLanguages",
          value: function getInternalInterwikiLanguages() {
            return languages.interlanguage.internal;
          }
        }, {
          key: "isInternalInterwikiLanguage",
          value: function isInternalInterwikiLanguage(lang) {
            return languages.interlanguage.internal.indexOf(lang) > -1;
          }
        }, {
          key: "getInterlanguageTag",
          value: function getInterlanguageTag(language) {
            return languages.names[language].subtag;
          }
        }, {
          key: "detectLanguage",
          value: function detectLanguage(title) {
            var detectedLanguage, matches, pureTitle, testLangCat;
            matches = title.match(/^(.+?)(?:[ _]\(([^\(]+)\))?$/);
            pureTitle = matches[1];
            detectedLanguage = matches[2];
            if (!detectedLanguage || !this.isCategoryLanguage(detectedLanguage)) {
              testLangCat = matches[1].match(/^[ _]*[Cc]ategory[ _]*:[ _]*(.+?)[ _]*$/);
              if (testLangCat && this.isCategoryLanguage(testLangCat[1])) {
                detectedLanguage = testLangCat[1];
                pureTitle = matches[1];
              } else {
                detectedLanguage = this.getLocalLanguage();
                pureTitle = matches[0];
              }
            }
            return [pureTitle, detectedLanguage];
          }
        }, {
          key: "findAllInterlanguageLinks",
          value: function findAllInterlanguageLinks(source) {
            return this.WM.Parser.findSpecialLinks(source, this.getInterwikiLanguages().join("|"));
          }
        }, {
          key: "findInternalInterlanguageLinks",
          value: function findInternalInterlanguageLinks(source) {
            return this.WM.Parser.findSpecialLinks(source, this.getInternalInterwikiLanguages().join("|"));
          }
        }, {
          key: "getTableOfContents",
          value: function getTableOfContents(tag) {
            return tablesOfContents[tag];
          }
        }]);

        return ArchWiki;
      }();

      ;

      languages = {
        local: "English",
        names: {
          "العربية": {
            subtag: "ar",
            english: "Arabic"
          },
          "Български": {
            subtag: "bg",
            english: "Bulgarian"
          },
          "Català": {
            subtag: "ca",
            english: "Catalan"
          },
          "Česky": {
            subtag: "cs",
            english: "Czech"
          },
          "Dansk": {
            subtag: "da",
            english: "Danish"
          },
          "Deutsch": {
            subtag: "de",
            english: "German"
          },
          "Ελληνικά": {
            subtag: "el",
            english: "Greek"
          },
          "English": {
            subtag: "en",
            english: "English"
          },
          "Esperanto": {
            subtag: "eo",
            english: "Esperanto"
          },
          "Español": {
            subtag: "es",
            english: "Spanish"
          },
          "فارسی": {
            subtag: "fa",
            english: "Persian"
          },
          "Suomi": {
            subtag: "fi",
            english: "Finnish"
          },
          "Français": {
            subtag: "fr",
            english: "French"
          },
          "עברית": {
            subtag: "he",
            english: "Hebrew"
          },
          "Hrvatski": {
            subtag: "hr",
            english: "Croatian"
          },
          "Magyar": {
            subtag: "hu",
            english: "Hungarian"
          },
          "Indonesia": {
            subtag: "id",
            english: "Indonesian"
          },
          "Italiano": {
            subtag: "it",
            english: "Italian"
          },
          "日本語": {
            subtag: "ja",
            english: "Japanese"
          },
          "한국어": {
            subtag: "ko",
            english: "Korean"
          },
          "Lietuviškai": {
            subtag: "lt",
            english: "Lithuanian"
          },
          "Norsk Bokmål": {
            subtag: "nb",
            english: "Norwegian (Bokmål)"
          },
          "Nederlands": {
            subtag: "nl",
            english: "Dutch"
          },
          "Polski": {
            subtag: "pl",
            english: "Polish"
          },
          "Português": {
            subtag: "pt",
            english: "Portuguese"
          },
          "Română": {
            subtag: "ro",
            english: "Romanian"
          },
          "Русский": {
            subtag: "ru",
            english: "Russian"
          },
          "Slovenský": {
            subtag: "sk",
            english: "Slovak"
          },
          "Српски": {
            subtag: "sr",
            english: "Serbian"
          },
          "Svenska": {
            subtag: "sv",
            english: "Swedish"
          },
          "ไทย": {
            subtag: "th",
            english: "Thai"
          },
          "Türkçe": {
            subtag: "tr",
            english: "Turkish"
          },
          "Українська": {
            subtag: "uk",
            english: "Ukrainian"
          },
          "Tiếng Việt": {
            subtag: "vi",
            english: "Vietnamese"
          },
          "简体中文": {
            subtag: "zh-hans",
            english: "Chinese (Simplified)"
          },
          "正體中文": {
            subtag: "zh-hant",
            english: "Chinese (Traditional)"
          }
        },
        categories: ["العربية", "Български", "Català", "Česky", "Dansk", "Ελληνικά", "English", "Esperanto", "Español", "Suomi", "עברית", "Hrvatski", "Magyar", "Indonesia", "Italiano", "日本語", "한국어", "Lietuviškai", "Norsk Bokmål", "Nederlands", "Polski", "Português", "Русский", "Slovenský", "Српски", "ไทย", "Türkçe", "Українська", "简体中文", "正體中文"],
        interlanguage: {
          external: ["de", "fa", "fr", "ja", "ro"],
          internal: ["ar", "bg", "cs", "da", "el", "en", "es", "fi", "he", "hr", "hu", "id", "it", "ko", "lt", "nl", "pl", "pt", "ru", "sk", "sr", "sv", "th", "tr", "uk", "zh-hans", "zh-hant"]
        }
      };

      tablesOfContents = {
        "ar": {
          "page": "Table of contents (العربية)",
          "root": "Category:العربية",
          "alsoIn": "also in",
          "indentType": ":",
          "replace": ["[ _]\\(العربية\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": true
        },
        "bg": {
          "page": "Table of contents (Български)",
          "root": "Category:Български",
          "alsoIn": "също в",
          "indentType": ":",
          "replace": ["[ _]\\(Български\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "cs": {
          "page": "Table of contents (Česky)",
          "root": "Category:Česky",
          "alsoIn": "také v",
          "indentType": ":",
          "replace": ["[ _]\\(Česky\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "da": {
          "page": "Table of contents (Dansk)",
          "root": "Category:Dansk",
          "alsoIn": "også i",
          "indentType": ":",
          "replace": ["[ _]\\(Dansk\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "el": {
          "page": "Table of contents (Ελληνικά)",
          "root": "Category:Ελληνικά",
          "alsoIn": "επίσης σε",
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
          "page": "Table of contents (עברית)",
          "root": "Category:עברית",
          "alsoIn": "also in",
          "indentType": ":",
          "replace": ["[ _]\\(עברית\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": true
        },
        "hr": {
          "page": "Table of contents (Hrvatski)",
          "root": "Category:Hrvatski",
          "alsoIn": "također u",
          "indentType": ":",
          "replace": ["[ _]\\(Hrvatski\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "hu": {
          "page": "Table of contents (Magyar)",
          "root": "Category:Magyar",
          "alsoIn": "is",
          "indentType": ":",
          "replace": ["[ _]\\(Magyar\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "id": {
          "page": "Table of contents (Indonesia)",
          "root": "Category:Indonesia",
          "alsoIn": "juga di",
          "indentType": ":",
          "replace": ["[ _]\\(Indonesia\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "it": {
          "page": "Table of contents (Italiano)",
          "root": "Category:Italiano",
          "alsoIn": "anche in",
          "indentType": ":",
          "replace": ["[ _]\\(Italiano\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "ko": {
          "page": "Table of contents (한국어)",
          "root": "Category:한국어",
          "alsoIn": "또한 에",
          "indentType": ":",
          "replace": ["[ _]\\(한국어\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "lt": {
          "page": "Table of contents (Lietuviškai)",
          "root": "Category:Lietuviškai",
          "alsoIn": "taip pat ir",
          "indentType": ":",
          "replace": ["[ _]\\(Lietuviškai\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "nl": {
          "page": "Table of contents (Nederlands)",
          "root": "Category:Nederlands",
          "alsoIn": "ook in",
          "indentType": ":",
          "replace": ["[ _]\\(Nederlands\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "pl": {
          "page": "Table of contents (Polski)",
          "root": "Category:Polski",
          "alsoIn": "również w",
          "indentType": ":",
          "replace": ["[ _]\\(Polski\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "pt": {
          "page": "Table of contents (Português)",
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
          "page": "Table of contents (Slovenský)",
          "root": "Category:Slovenský",
          "alsoIn": "tiež v",
          "indentType": ":",
          "replace": ["[ _]\\(Slovenský\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "sr": {
          "page": "Table of contents (Српски)",
          "root": "Category:Српски",
          "alsoIn": "такође у",
          "indentType": ":",
          "replace": ["[ _]\\(Српски\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "th": {
          "page": "Table of contents (ไทย)",
          "root": "Category:ไทย",
          "alsoIn": "ยังอยู่ใน",
          "indentType": ":",
          "replace": ["[ _]\\(ไทย\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "tr": {
          "page": "Table of contents (Türkçe)",
          "root": "Category:Türkçe",
          "alsoIn": "ayrıca",
          "indentType": ":",
          "replace": ["[ _]\\(Türkçe\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "uk": {
          "page": "Table of contents (Українська)",
          "root": "Category:Українська",
          "alsoIn": "також в",
          "indentType": ":",
          "replace": ["[ _]\\(Українська\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "zh-hans": {
          "page": "Table of contents (简体中文)",
          "root": "Category:简体中文",
          "alsoIn": "同时还属于",
          "indentType": ":",
          "replace": ["[ _]\\(简体中文\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        },
        "zh-hant": {
          "page": "Table of contents (正體中文)",
          "root": "Category:正體中文",
          "alsoIn": "還在",
          "indentType": ":",
          "replace": ["[ _]\\(正體中文\\)", "", ""],
          "keepAltName": true,
          "showIndices": true,
          "rightToLeft": false
        }
      };

      return ArchWiki;
    }();
  }, {}], 5: [function (require, module, exports) {
    var CSS;

    CSS = require('../../lib.js.generic/dist/CSS');

    module.exports.Bot = function () {
      function Bot(WM) {
        _classCallCheck(this, Bot);

        this._previewFilter = this._previewFilter.bind(this);
        this._startAutomatic = this._startAutomatic.bind(this);
        this._startAutomaticContinue = this._startAutomaticContinue.bind(this);
        this.WM = WM;
        this.configuration = {
          plugin: null,
          function_: function function_() {},
          filters: [],
          list: {
            current: null,
            previous: null
          },
          visited: []
        };

        this.botToken = "0";
      }

      _createClass(Bot, [{
        key: "_makeUI",
        value: function _makeUI(functions, lists) {
          var divContainer, fdiv;
          divContainer = document.createElement('div');
          divContainer.id = 'WikiMonkeyBot';
          CSS.addStyleElement("#WikiMonkeyBot-PluginSelect {width:100%; margin-bottom:1em;} #WikiMonkeyBot-ListSelect {margin-bottom:1em;} #WikiMonkeyBotFilter {height:6em; margin-bottom:1em; resize:vertical;} #WikiMonkeyBotStart, #WikiMonkeyBotStop {margin-right:0.33em; margin-bottom:1em; font-weight:bold;} a.WikiMonkeyBotSelected {background-color:#faa; padding:0.2em 0.4em;} a.WikiMonkeyBotProcessing {background-color:#ff8; padding:0.2em 0.4em;} a.WikiMonkeyBotChanged {background-color:#afa; padding:0.2em 0.4em;} a.WikiMonkeyBotUnchanged {background-color:#aaf; padding:0.2em 0.4em;} a.WikiMonkeyBotBypassed {background-color:orangered; padding:0.2em 0.4em;} a.WikiMonkeyBotFailed {background-color:red; padding:0.2em 0.4em;}");
          fdiv = this.makeFunctionUI(functions);
          if (fdiv) {
            divContainer.appendChild(fdiv);
            divContainer.appendChild(this.makeConfUI(lists));
            return divContainer;
          } else {
            return false;
          }
        }
      }, {
        key: "makeFunctionUI",
        value: function makeFunctionUI(functions) {
          var divFunction, f, ffunctions, fieldset, legend, makeUI, option, pluginConf, pluginInst, pluginName, selectFunctions, self;
          self = this;
          fieldset = document.createElement('fieldset');
          legend = document.createElement('legend');
          legend.innerHTML = 'Plugin';
          selectFunctions = document.createElement('select');
          selectFunctions.id = 'WikiMonkeyBot-PluginSelect';
          ffunctions = [];
          for (f in functions) {
            pluginConf = functions[f];
            pluginName = pluginConf[0];
            pluginInst = pluginConf[1];

            if (!this.WM.Plugins[pluginName]) {
              continue;
            }

            if (!pluginInst || !pluginInst.length) {
              continue;
            }
            ffunctions.push(pluginConf);
            option = document.createElement('option');
            option.innerHTML = pluginInst[pluginInst.length - 1];
            selectFunctions.appendChild(option);
          }
          if (ffunctions.length) {
            selectFunctions.addEventListener("change", function (ffunctions) {
              return function () {
                var UI, id, makeUI, select;
                select = document.getElementById('WikiMonkeyBot-PluginSelect');
                id = select.selectedIndex;
                UI = document.getElementById('WikiMonkeyBotFunction');
                pluginConf = ffunctions[id];

                makeUI = self.WM.Plugins[pluginConf[0]].makeBotUI;
                if (makeUI instanceof Function) {
                  UI.replaceChild(makeUI(pluginConf[2]), UI.firstChild);
                } else {
                  UI.replaceChild(document.createElement('div'), UI.firstChild);
                }
                self.configuration.plugin = pluginConf[0];
                return self.configuration.function_ = function (title, callContinue, chainArgs) {
                  return self.WM.Plugins[pluginConf[0]].mainAuto(pluginConf[2], title, callContinue, chainArgs);
                };
              };
            }(ffunctions), false);
            divFunction = document.createElement('div');
            divFunction.id = "WikiMonkeyBotFunction";
            pluginConf = ffunctions[0];

            makeUI = this.WM.Plugins[pluginConf[0]].makeBotUI;
            if (makeUI instanceof Function) {
              divFunction.appendChild(makeUI(pluginConf[2]));
            } else {
              divFunction.appendChild(document.createElement('div'));
            }
            this.configuration.plugin = pluginConf[0];
            this.configuration.function_ = function (title, callContinue, chainArgs) {
              return self.WM.Plugins[pluginConf[0]].mainAuto(pluginConf[2], title, callContinue, chainArgs);
            };
            fieldset.appendChild(legend);
            fieldset.appendChild(selectFunctions);
            fieldset.appendChild(divFunction);
            return fieldset;
          } else {
            return false;
          }
        }
      }, {
        key: "makeListSelector",
        value: function makeListSelector(lists) {
          var i, len, list, option, selectLists, self;
          self = this;
          selectLists = document.createElement('select');
          selectLists.id = 'WikiMonkeyBot-ListSelect';
          for (i = 0, len = lists.length; i < len; i++) {
            list = lists[i];
            if (list[0]) {
              option = document.createElement('option');
              option.innerHTML = list[2];
              selectLists.appendChild(option);
              if (!this.configuration.list.current) {
                this.configuration.list.current = list;
              }
            }
          }
          selectLists.addEventListener("change", function (lss) {
            return function () {
              var id, select;
              select = document.getElementById('WikiMonkeyBot-ListSelect');
              id = select.selectedIndex;
              self.configuration.list.previous = self.configuration.list.current;

              return self.configuration.list.current = lss[id];
            };
          }(lists), false);
          return selectLists;
        }
      }, {
        key: "makeConfUI",
        value: function makeConfUI(lists) {
          var bot, duplicates, duplicatestag, elem, elems, fieldset, filter, forceStart, forceStartCB, forceStartLabel, i, inverse, inversetag, legend, len, listSelect, preview, self, start, startMsg;
          self = this;
          bot = document.createElement('div');
          fieldset = document.createElement('fieldset');
          legend = document.createElement('legend');
          legend.innerHTML = 'Filter';
          listSelect = this.makeListSelector(lists);
          filter = document.createElement('textarea');
          filter.id = 'WikiMonkeyBotFilter';
          preview = document.createElement('input');
          preview.id = 'WikiMonkeyBotPreview';
          preview.type = 'button';
          preview.value = 'Preview';
          duplicates = document.createElement('input');
          duplicates.type = 'checkbox';
          duplicates.id = 'WikiMonkeyBotDuplicates';
          inverse = document.createElement('input');
          inverse.type = 'checkbox';
          inverse.id = 'WikiMonkeyBotInverse';
          elems = [filter, duplicates, inverse];
          for (i = 0, len = elems.length; i < len; i++) {
            elem = elems[i];
            elem.addEventListener("change", function () {
              return self._disableStartBot('Filters have changed, preview the selection');
            }, false);
          }
          duplicatestag = document.createElement('span');
          duplicatestag.innerHTML = 'Duplicates';
          inversetag = document.createElement('span');
          inversetag.innerHTML = 'Inverse';
          preview.addEventListener("click", this._previewFilter, false);
          fieldset.appendChild(legend);
          if (listSelect.length > 1) {
            fieldset.appendChild(listSelect);
          }
          fieldset.appendChild(filter);
          fieldset.appendChild(preview);
          fieldset.appendChild(duplicates);
          fieldset.appendChild(duplicatestag);
          fieldset.appendChild(inverse);
          fieldset.appendChild(inversetag);
          start = document.createElement('input');
          start.type = 'button';
          start.value = 'Start bot';
          start.id = 'WikiMonkeyBotStart';
          start.addEventListener("click", this._startAutomatic, false);
          start.disabled = true;
          startMsg = document.createElement('span');
          startMsg.innerHTML = 'Set and preview the filter first';
          startMsg.id = 'WikiMonkeyBotStartMsg';
          forceStart = document.createElement('span');
          forceStart.id = 'WikiMonkeyBotForceStart';
          forceStartCB = document.createElement('input');
          forceStartCB.type = 'checkbox';
          forceStartCB.disabled = true;
          forceStartLabel = document.createElement('span');
          forceStartLabel.innerHTML = 'Force start, stopping any other currently running bots';
          forceStart.style.display = "none";
          forceStart.appendChild(forceStartCB);
          forceStart.appendChild(forceStartLabel);
          bot.appendChild(fieldset);
          bot.appendChild(start);
          bot.appendChild(startMsg);
          bot.appendChild(forceStart);
          return bot;
        }
      }, {
        key: "_enableStartBot",
        value: function _enableStartBot() {
          document.getElementById('WikiMonkeyBotStartMsg').innerHTML = '';
          return document.getElementById('WikiMonkeyBotStart').disabled = false;
        }
      }, {
        key: "_disableStartBot",
        value: function _disableStartBot(message) {
          document.getElementById('WikiMonkeyBotStartMsg').innerHTML = message;
          return document.getElementById('WikiMonkeyBotStart').disabled = true;
        }
      }, {
        key: "_enableStopBot",
        value: function _enableStopBot(stopId) {
          var self, start, stop;
          self = this;
          stop = document.createElement('input');
          stop.type = 'button';
          stop.value = 'Stop bot';
          stop.id = 'WikiMonkeyBotStop';
          stop.addEventListener("click", function (id) {
            return function () {
              clearTimeout(id);

              self._disableStopBot();
              self._endAutomatic(true);
              return self.WM.Log.logInfo('Bot stopped manually');
            };
          }(stopId), false);
          start = document.getElementById('WikiMonkeyBotStart');
          start.parentNode.insertBefore(stop, start);
          return start.style.display = 'none';
        }
      }, {
        key: "_disableStopBot",
        value: function _disableStopBot() {
          var stop;
          stop = document.getElementById('WikiMonkeyBotStop');
          stop.parentNode.removeChild(stop);
          return document.getElementById('WikiMonkeyBotStart').style.display = 'inline';
        }
      }, {
        key: "_disableControls",
        value: function _disableControls() {
          return this._setEnableControls(true);
        }
      }, {
        key: "_reEnableControls",
        value: function _reEnableControls() {
          return this._setEnableControls(false);
        }
      }, {
        key: "_setEnableControls",
        value: function _setEnableControls(flag) {
          var fset, fsets, i, len, results;
          fsets = document.getElementById('WikiMonkeyBot').getElementsByTagName('fieldset');
          results = [];
          for (i = 0, len = fsets.length; i < len; i++) {
            fset = fsets[i];

            results.push(fset.disabled = flag);
          }
          return results;
        }
      }, {
        key: "_enableForceStart",
        value: function _enableForceStart() {
          var force;
          force = document.getElementById('WikiMonkeyBotForceStart');
          force.getElementsByTagName('input')[0].disabled = false;
          return force.style.display = 'inline';
        }
      }, {
        key: "_disableForceStart",
        value: function _disableForceStart() {
          var force;
          force = document.getElementById('WikiMonkeyBotForceStart');
          force.getElementsByTagName('input')[0].checked = false;
          force.getElementsByTagName('input')[0].disabled = true;
          return force.style.display = 'none';
        }
      }, {
        key: "_canForceStart",
        value: function _canForceStart() {
          return document.getElementById('WikiMonkeyBotForceStart').getElementsByTagName('input')[0].checked;
        }
      }, {
        key: "makeFilters",
        value: function makeFilters() {
          var exc, filter, filters, firstSlash, i, lastSlash, len, modifiers, negative, pattern, regexp;
          this.configuration.filters = [];
          filters = document.getElementById('WikiMonkeyBotFilter').value.split('\n');
          for (i = 0, len = filters.length; i < len; i++) {
            filter = filters[i];

            if (filter) {
              firstSlash = filter.indexOf('/');
              lastSlash = filter.lastIndexOf('/');
              pattern = filter.substring(firstSlash + 1, lastSlash);
              modifiers = filter.substring(lastSlash + 1);
              negative = filter.charAt(0) === '!';
              try {
                regexp = new RegExp(pattern, modifiers);
              } catch (error) {
                exc = error;
                this.WM.Log.logError('Invalid regexp: ' + exc);
                return false;
              }
              this.configuration.filters.push([regexp, negative]);
            }
          }

          return true;
        }
      }, {
        key: "canProcessPage",
        value: function canProcessPage(link) {
          var duplicates, filter, filters, i, inverse, len, negative, regexp, test, title;

          if (link.className.split(" ").indexOf("new") < 0) {
            title = link.innerHTML;
            duplicates = document.getElementById('WikiMonkeyBotDuplicates').checked;
            if (duplicates || this.configuration.visited.indexOf(title) < 0) {
              this.configuration.visited.push(title);
              filters = this.configuration.filters;
              inverse = document.getElementById('WikiMonkeyBotInverse').checked;
              if (filters.length > 0) {
                for (i = 0, len = filters.length; i < len; i++) {
                  filter = filters[i];
                  regexp = filter[0];
                  negative = filter[1];
                  test = regexp.test(title);
                  if (test !== negative) {
                    if (inverse) {
                      return false;
                    } else {
                      return true;
                    }
                  }
                }

                if (inverse) {
                  return true;
                } else {
                  return false;
                }
              } else {
                if (inverse) {
                  return false;
                } else {
                  return true;
                }
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      }, {
        key: "changeWikiMonkeyLinkClassName",
        value: function changeWikiMonkeyLinkClassName(className, newClass) {
          var classes, cls, i, len, newClasses;
          classes = className.split(" ");
          newClasses = [];
          for (i = 0, len = classes.length; i < len; i++) {
            cls = classes[i];
            if (cls.indexOf("WikiMonkey") < 0) {
              newClasses.push(cls);
            }
          }

          newClasses.push(newClass);
          return newClasses.join(" ");
        }
      }, {
        key: "restoreOriginalLinkClassName",
        value: function restoreOriginalLinkClassName(className) {
          var classes, cls, i, len, origClasses;
          classes = className.split(" ");
          origClasses = [];
          for (i = 0, len = classes.length; i < len; i++) {
            cls = classes[i];
            if (cls.indexOf("WikiMonkey") < 0) {
              origClasses.push(cls);
            }
          }
          return origClasses.join(" ");
        }
      }, {
        key: "_previewFilter",
        value: function _previewFilter() {
          var N, enable, i, item, items, j, len, len1, link, linkId;
          this.WM.Log.logInfo('Updating filter preview, please wait ...');
          this._disableStartBot('Updating filter preview ...');
          if (this.configuration.list.previous) {
            if (this.configuration.list.current[0].nodeName === 'TBODY') {
              items = this.configuration.list.previous[0].getElementsByTagName('td');
            } else {
              items = this.configuration.list.previous[0].getElementsByTagName('li');
            }
            linkId = this.configuration.list.previous[1];
            for (i = 0, len = items.length; i < len; i++) {
              item = items[i];
              link = item.getElementsByTagName('a')[linkId];

              if (link) {
                link.className = this.restoreOriginalLinkClassName(link.className);
              }
            }
          }
          this.configuration.visited = [];
          linkId = this.configuration.list.current[1];
          enable = false;
          N = 0;
          if (this.makeFilters()) {
            if (this.configuration.list.current[0].nodeName === 'TBODY') {
              items = this.configuration.list.current[0].getElementsByTagName('td');
            } else {
              items = this.configuration.list.current[0].getElementsByTagName('li');
            }
            for (j = 0, len1 = items.length; j < len1; j++) {
              item = items[j];
              link = item.getElementsByTagName('a')[linkId];

              if (link) {
                if (this.canProcessPage(link)) {
                  link.className = this.changeWikiMonkeyLinkClassName(link.className, 'WikiMonkeyBotSelected');
                  enable = true;
                  N++;
                } else {
                  link.className = this.restoreOriginalLinkClassName(link.className);
                }
              }
            }
          }
          this.WM.Log.logInfo('Preview updated (' + N + ' pages selected)');
          if (enable) {
            return this._enableStartBot();
          } else {
            return this._disableStartBot('No pages selected, reset and preview the filter');
          }
        }
      }, {
        key: "_setBotToken",
        value: function _setBotToken() {
          var date, token;
          date = new Date();
          token = date.getTime() + "";
          this.botToken = token;
          return localStorage.setItem('WikiMonkeyBotToken', token);
        }
      }, {
        key: "_resetBotToken",
        value: function _resetBotToken(reset) {
          this.botToken = "0";
          if (reset) {
            return localStorage.setItem('WikiMonkeyBotToken', "0");
          }
        }
      }, {
        key: "_getBotToken",
        value: function _getBotToken() {
          return this.botToken;
        }
      }, {
        key: "_checkOtherBotsRunning",
        value: function _checkOtherBotsRunning() {
          var value;
          value = localStorage.getItem('WikiMonkeyBotToken');

          return value && value !== "0" && value !== this._getBotToken();
        }
      }, {
        key: "_startAutomatic",
        value: function _startAutomatic() {
          var i, item, items, itemsDOM, len, linkId;
          if (this._checkOtherBotsRunning() && !this._canForceStart()) {
            this.WM.Log.logError("It's not possible to start the bot (without forcing it) for one of the following reasons:<br> * another bot instance is currently running<br> * a previously running bot has stopped due to a page processing error<br> * a previously running bot has stopped due to a Javascript error<br> * a previously running bot has been interrupted by a browser page refresh");
            return this._enableForceStart();
          } else if (this.makeFilters()) {
            if (this.configuration.list.current[0].nodeName === 'TBODY') {
              itemsDOM = this.configuration.list.current[0].getElementsByTagName('td');
            } else {
              itemsDOM = this.configuration.list.current[0].getElementsByTagName('li');
            }

            items = [];
            for (i = 0, len = itemsDOM.length; i < len; i++) {
              item = itemsDOM[i];
              items.push(item);
            }
            linkId = this.configuration.list.current[1];
            this._disableForceStart();
            this._setBotToken();
            this.WM.Log.logInfo('Starting bot ...');
            this.WM.Log.logHidden("Plugin: " + this.configuration.plugin);
            this.WM.Log.logHidden("Filter: " + document.getElementById('WikiMonkeyBotFilter').value);
            this._disableStartBot('Bot is running ...');
            this._disableControls();
            this.configuration.visited = [];
            return this.WM.MW.isUserBot(this._startAutomaticContinue, [items, linkId]);
          }
        }
      }, {
        key: "_startAutomaticContinue",
        value: function _startAutomaticContinue(botTest, args) {
          var items, linkId;
          items = args[0];
          linkId = args[1];
          this.configuration.interval = botTest ? 3000 : 30000;
          return this._processItem(0, items, 0, linkId, null);
        }
      }, {
        key: "makeCallContinue",
        value: function makeCallContinue(lis, id, linkId, ln, article) {
          var self;
          self = this;
          return function (status, resArgs) {
            switch (status) {
              case 0:
                ln.className = self.changeWikiMonkeyLinkClassName(ln.className, 'WikiMonkeyBotUnchanged');
                self.WM.Log.logInfo(self.WM.Log.linkToWikiPage(article, article) + " processed (unchanged)");
                id++;
                self._processItem(status, lis, id, linkId, resArgs);
                break;

              case 1:
                ln.className = self.changeWikiMonkeyLinkClassName(ln.className, 'WikiMonkeyBotChanged');
                self.WM.Log.logInfo(self.WM.Log.linkToWikiPage(article, article) + " processed (changed)");
                id++;
                self._processItem(status, lis, id, linkId, resArgs);
                break;

              case 'protectedpage':
                ln.className = self.changeWikiMonkeyLinkClassName(ln.className, 'WikiMonkeyBotBypassed');
                self.WM.Log.logWarning("This user doesn't have the rights to " + "edit " + self.WM.Log.linkToWikiPage(article, article) + ", bypassing it ...");
                id++;

                self._processItem(0, lis, id, linkId, resArgs);
                break;
              default:
                ln.className = self.changeWikiMonkeyLinkClassName(ln.className, 'WikiMonkeyBotFailed');
                self.WM.Log.logError("Error processing " + self.WM.Log.linkToWikiPage(article, article) + ", stopping the bot");
                return self._endAutomatic(true);
            }
          };
        }
      }, {
        key: "_processItem",
        value: function _processItem(status, items, index, linkId, chainArgs) {
          var interval, link, self, stopId, title;
          self = this;
          if (items[index]) {
            link = items[index].getElementsByTagName('a')[linkId];

            if (link && this.canProcessPage(link)) {
              title = link.title;
              if (status === 0) {
                interval = 1000;
              } else {
                interval = this.configuration.interval;
              }
              this.WM.Log.logInfo('Waiting ' + interval / 1000 + ' seconds ...');
              stopId = setTimeout(function (lis, id, ln, article, chainArgs) {
                return function () {
                  self._disableStopBot();

                  if (!self._checkOtherBotsRunning()) {
                    ln.className = self.changeWikiMonkeyLinkClassName(ln.className, 'WikiMonkeyBotProcessing');
                    self.WM.Log.logInfo("Processing " + self.WM.Log.linkToWikiPage(article, article) + " ...");
                    return self.configuration.function_(article, self.makeCallContinue(lis, id, linkId, ln, article), chainArgs);
                  } else {
                    self.WM.Log.logError('Another bot has been ' + 'force-started, stopping ...');
                    return self._endAutomatic(false);
                  }
                };
              }(items, index, link, title, chainArgs), interval);
              return this._enableStopBot(stopId);
            } else {
              index++;
              return this._processItem(status, items, index, linkId, chainArgs);
            }
          } else {
            return this._endAutomatic(true);
          }
        }
      }, {
        key: "_endAutomatic",
        value: function _endAutomatic(reset) {
          this._resetBotToken(reset);
          this.WM.Log.logInfo('Bot operations completed (check the log for ' + 'warnings or errors)');
          this._disableStartBot('Bot operations completed, reset and preview ' + 'the filter');
          return this._reEnableControls();
        }
      }]);

      return Bot;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31 }], 6: [function (require, module, exports) {
    var Async, Obj;

    Async = require('../../lib.js.generic/dist/Async');

    Obj = require('../../lib.js.generic/dist/Obj');

    module.exports.Cat = function () {
      function Cat(WM1) {
        _classCallCheck(this, Cat);

        this.WM = WM1;
        null;
      }

      _createClass(Cat, [{
        key: "recurseTree",
        value: function recurseTree(params) {
          params.callChildren = WM.Cat._recurseTreeCallChildren;
          return Async.recurseTreeAsync(params);
        }
      }, {
        key: "recurseTreeContinue",
        value: function recurseTreeContinue(params) {
          return Async.recurseTreeAsync(params);
        }
      }, {
        key: "_recurseTreeCallChildren",
        value: function _recurseTreeCallChildren(params) {
          return WM.Cat.getSubCategories(params.node, WM.Cat._recurseTreeCallChildrenContinue, params);
        }
      }, {
        key: "_recurseTreeCallChildrenContinue",
        value: function _recurseTreeCallChildrenContinue(subCats, params) {
          var i, len, subCat;
          for (i = 0, len = subCats.length; i < len; i++) {
            subCat = subCats[i];
            params.children.push(subCat.title);
          }
          return Async.recurseTreeAsync(params);
        }
      }, {
        key: "getSubCategories",
        value: function getSubCategories(parent, call, callArgs) {
          return WM.Cat._getMembers(parent, "subcat", call, callArgs);
        }
      }, {
        key: "getAllMembers",
        value: function getAllMembers(parent, call, callArgs) {
          return WM.Cat._getMembers(parent, null, call, callArgs);
        }
      }, {
        key: "_getMembers",
        value: function _getMembers(name, cmtype, call, callArgs) {
          var query;
          query = {
            action: "query",
            list: "categorymembers",
            cmtitle: name,
            cmlimit: 500
          };
          if (cmtype) {
            query.cmtype = cmtype;
          }
          return this._getMembersContinue(query, call, callArgs, []);
        }
      }, {
        key: "_getMembersContinue",
        value: function _getMembersContinue(query, call, callArgs, members) {
          return WM.MW.callAPIGet(query, function (res, args) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
              query.cmcontinue = res["query-continue"].categorymembers.cmcontinue;
              return this._getMembersContinue(query, call, args, members);
            } else {
              return call(members, args);
            }
          }, callArgs, null);
        }
      }, {
        key: "getParentsAndInfo",
        value: function getParentsAndInfo(name, call, callArgs) {
          var query;
          query = {
            action: "query",
            prop: "categories|categoryinfo",
            titles: name,
            clprop: "hidden",
            cllimit: 500
          };
          return this._getParentsAndInfoContinue(query, call, callArgs, [], null);
        }
      }, {
        key: "_getParentsAndInfoContinue",
        value: function _getParentsAndInfoContinue(query, call, callArgs, parents, info) {
          return WM.MW.callAPIGet(query, function (res, args) {
            var page;
            page = Obj.getFirstItem(res.query.pages);
            if (page.categories) {
              parents = parents.concat(page.categories);
            }
            if (page.categoryinfo) {
              info = page.categoryinfo;
            }
            if (res["query-continue"]) {
              query.prop = "categories";
              query.clcontinue = res["query-continue"].categories.clcontinue;
              return this._getParentsAndInfoContinue(query, call, args, parents, info);
            } else {
              return call(parents, info, args);
            }
          }, callArgs, null);
        }
      }]);

      return Cat;
    }();
  }, { "../../lib.js.generic/dist/Async": 30, "../../lib.js.generic/dist/Obj": 35 }], 7: [function (require, module, exports) {
    var $, CSS, DOM;

    $ = window.$;

    CSS = require('../../lib.js.generic/dist/CSS');

    DOM = require('../../lib.js.generic/dist/DOM');

    module.exports.Cfg = function () {
      var DEFAULTS_REQUEST;

      var Cfg = function () {
        function Cfg(WM) {
          _classCallCheck(this, Cfg);

          this._doMakeUI = this._doMakeUI.bind(this);
          this.save = this.save.bind(this);
          this.saveEditor = this.saveEditor.bind(this);
          this.resetEditor = this.resetEditor.bind(this);
          this.requestDefaults = this.requestDefaults.bind(this);
          this.importFile = this.importFile.bind(this);
          this.exportEditor = this.exportEditor.bind(this);
          this.WM = WM;
          this.config = {};
        }

        _createClass(Cfg, [{
          key: "_makeUI",
          value: function _makeUI() {
            return DOM.waitUntilJQuerySelectorMatches('#preftoc', this._doMakeUI, [], 500);
          }
        }, {
          key: "_doMakeUI",
          value: function _doMakeUI() {
            var bdiv, editor, help, link, list, plugin, toc;

            CSS.addStyleElement("#WikiMonkey-prefsection textarea { height:30em;} #WikiMonkey-prefsection div, #WikiMonkey-prefsection p.message {display:inline-block; margin-bottom:0.5em;} #WikiMonkey-prefsection input {margin-right:0.5em;} #WikiMonkey-prefsection input[value='Save'] {font-weight:bold;}");
            toc = $("#preftoc");
            toc.find("a").click(this._hideEditor);
            link = $("<a/>").attr({
              "id": "WikiMonkey-preftab",
              "href": "#wiki-monkey",
              "role": "tab",
              "aria-controls": "WikiMonkey-config",
              "tabindex": "-1",
              "aria-selected": "false"
            }).text("Wiki Monkey").click(this._showEditor);
            $("<li/>").appendTo(toc).append(link);
            editor = $("<fieldset/>").addClass("prefsection").attr("id", "WikiMonkey-prefsection").hide();
            $("<legend/>").addClass("mainLegend").text("Wiki Monkey").appendTo(editor);
            bdiv = $("<div/>");
            $("<input/>").attr("type", "button").val("Save").click(this.saveEditor).appendTo(bdiv);
            $("<input/>").attr("type", "button").val("Reset").click(this.resetEditor).appendTo(bdiv);
            $("<input/>").attr("type", "button").val("Defaults").click(this.requestDefaults).appendTo(bdiv);
            $("<input/>").attr("type", "button").val("Import").click(this.importFile).appendTo(bdiv);
            $("<input/>").attr({
              "type": "file",
              "id": "WikiMonkey-import"
            }).change(this.doImportFile).appendTo(bdiv).hide();
            $("<input/>").attr("type", "button").val("Export").click(this.exportEditor).appendTo(bdiv);
            $("<a/>").attr({
              "id": "WikiMonkey-export",
              "download": "WikiMonkey.conf"
            }).appendTo(bdiv);
            editor.append(bdiv);
            help = $("<a/>").attr("href", "https://github.com/kynikos/wiki-monkey/wiki").text("[help]");
            $("<p/>").addClass("message").text("All pages running Wiki Monkey need to be refreshed for saved changes to take effect. ").append(help).appendTo(editor);
            $("<textarea/>").attr("id", "WikiMonkey-editor").appendTo(editor);
            $("<p/>").text('Wiki Monkey version: ' + GM_info.script.version).appendTo(editor);
            $("<p/>").text("Actually installed plugins (in general, a subset of those set in the loaded configuration):").appendTo(editor);
            list = $("<ul/>");
            for (plugin in this.WM.Plugins) {
              $("<li/>").text(plugin).appendTo(list);
            }
            list.appendTo(editor);
            $("#preferences").children("fieldset").last().after(editor);
            this.resetEditor();
            if (location.hash === "#wiki-monkey") {
              return this._showEditor();
            }
          }
        }, {
          key: "_showEditor",
          value: function _showEditor() {
            var editor, tab;
            tab = $("#WikiMonkey-preftab").parent();
            tab.siblings(".selected").removeClass("selected").children("a:first").attr({
              "tabindex": "-1",
              "aria-selected": "false"
            });
            tab.addClass("selected").children("a:first").attr({
              "tabindex": "0",
              "aria-selected": "true"
            });
            editor = $("#WikiMonkey-prefsection");
            editor.siblings("fieldset").hide();
            editor.show();
            return editor.siblings(".mw-prefs-buttons").hide();
          }
        }, {
          key: "_hideEditor",
          value: function _hideEditor() {
            var editor;
            $("#WikiMonkey-preftab").attr({
              "tabindex": "-1",
              "aria-selected": "false"
            }).parent().removeClass("selected");
            editor = $("#WikiMonkey-prefsection");
            editor.hide();
            return editor.siblings(".mw-prefs-buttons").show();
          }
        }, {
          key: "_load",
          value: function _load(defaultConfig) {
            var savedConfig, section, type;

            this.config = defaultConfig;
            savedConfig = JSON.parse(localStorage.getItem("WikiMonkey"));
            if (savedConfig) {
              for (section in savedConfig) {
                for (type in this.config[section]) {
                  if (savedConfig[section][type]) {
                    $.extend(this.config[section][type], savedConfig[section][type]);
                  }
                }
              }
            }
            return this.save();
          }
        }, {
          key: "_getEditorPlugins",
          value: function _getEditorPlugins() {
            return this.config["Plugins"]["Editor"];
          }
        }, {
          key: "_getDiffPlugins",
          value: function _getDiffPlugins() {
            return this.config["Plugins"]["Diff"];
          }
        }, {
          key: "_getBotPlugins",
          value: function _getBotPlugins() {
            return this.config["Plugins"]["Bot"];
          }
        }, {
          key: "_getSpecialPlugins",
          value: function _getSpecialPlugins() {
            return this.config["Plugins"]["Special"];
          }
        }, {
          key: "_getRecentChangesPlugins",
          value: function _getRecentChangesPlugins() {
            return this.config["Plugins"]["RecentChanges"];
          }
        }, {
          key: "_getNewPagesPlugins",
          value: function _getNewPagesPlugins() {
            return this.config["Plugins"]["NewPages"];
          }
        }, {
          key: "_getGeneralMods",
          value: function _getGeneralMods() {
            return this.config["Mods"]["General"];
          }
        }, {
          key: "_getEditorMods",
          value: function _getEditorMods() {
            return this.config["Mods"]["Editor"];
          }
        }, {
          key: "_getRecentChangesMods",
          value: function _getRecentChangesMods() {
            return this.config["Mods"]["RecentChanges"];
          }
        }, {
          key: "_getContributionsMods",
          value: function _getContributionsMods() {
            return this.config["Mods"]["Contributions"];
          }
        }, {
          key: "save",
          value: function save() {
            return localStorage.setItem("WikiMonkey", JSON.stringify(this.config));
          }
        }, {
          key: "saveEditor",
          value: function saveEditor() {
            var err, text;
            text = $("#WikiMonkey-editor").val();
            try {
              this.config = JSON.parse(text);
            } catch (error) {
              err = error;
              if (text === DEFAULTS_REQUEST) {
                this.config = {};
                $("#WikiMonkey-editor").val("The configuration has been reset to the default values and will be available after refreshing the page.");
              } else {
                alert("Not a valid JSON object, the configuration has not been saved.");
                return false;
              }
            }
            return this.save();
          }
        }, {
          key: "resetEditor",
          value: function resetEditor() {
            return $("#WikiMonkey-editor").val(JSON.stringify(this.config, void 0, 4));
          }
        }, {
          key: "requestDefaults",
          value: function requestDefaults() {
            return $("#WikiMonkey-editor").val(DEFAULTS_REQUEST);
          }
        }, {
          key: "importFile",
          value: function importFile() {
            return $("#WikiMonkey-import").trigger("click");
          }
        }, {
          key: "doImportFile",
          value: function doImportFile() {
            var file, freader;
            file = this.files[0];
            freader = new FileReader();
            freader.onload = function (fileLoadedEvent) {
              return $("#WikiMonkey-editor").val(fileLoadedEvent.target.result);
            };
            return freader.readAsText(file, "UTF-8");
          }
        }, {
          key: "exportEditor",
          value: function exportEditor() {
            var blob, link;
            blob = new Blob([$("#WikiMonkey-editor").val()], {
              type: 'text/plain'
            });
            link = $("#WikiMonkey-export").attr("href", window.URL.createObjectURL(blob));

            return link[0].click();
          }
        }]);

        return Cfg;
      }();

      ;

      DEFAULTS_REQUEST = "WARNING: If you click on the \"Save\" button now, the saved configuration will be reset to the default values at the next refresh!\nTo cancel this request, simply click on the \"Reset\" button.";

      return Cfg;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31, "../../lib.js.generic/dist/DOM": 33 }], 8: [function (require, module, exports) {
    var HTTP;

    HTTP = require('../../lib.js.generic/dist/HTTP');

    module.exports.Diff = function () {
      function Diff(WM) {
        _classCallCheck(this, Diff);

        this.WM = WM;
        null;
      }

      _createClass(Diff, [{
        key: "getEndTimestamp",
        value: function getEndTimestamp(call, callArgs) {
          var diff, giveEndTimestamp, oldid, pars, title;
          title = decodeURIComponent(HTTP.getURIParameter(null, 'title'));
          diff = HTTP.getURIParameter(null, 'diff');
          oldid = HTTP.getURIParameter(null, 'oldid');
          giveEndTimestamp = function giveEndTimestamp(page, id) {
            return call(page.revisions[id].timestamp, callArgs);
          };
          switch (diff) {
            case 'next':
              pars = {
                prop: "revisions",
                titles: title,
                rvlimit: "2",
                rvprop: "timestamp",
                rvdir: "newer",
                rvstartid: oldid
              };
              return this.WM.MW.callQuery(pars, giveEndTimestamp, 1, null);
            case 'prev':
              pars = {
                prop: "revisions",
                revids: oldid,
                rvprop: "timestamp"
              };
              return this.WM.MW.callQuery(pars, giveEndTimestamp, 0, null);
            default:
              pars = {
                prop: "revisions",
                revids: diff,
                rvprop: "timestamp"
              };
              return this.WM.MW.callQuery(pars, giveEndTimestamp, 0, null);
          }
        }
      }]);

      return Diff;
    }();
  }, { "../../lib.js.generic/dist/HTTP": 34 }], 9: [function (require, module, exports) {
    var Compatibility, HTTP;

    Compatibility = require('../../lib.js.generic/dist/Compatibility');

    HTTP = require('../../lib.js.generic/dist/HTTP');

    module.exports.Editor = function () {
      function Editor(WM) {
        _classCallCheck(this, Editor);

        this.WM = WM;
        null;
      }

      _createClass(Editor, [{
        key: "getTitle",
        value: function getTitle() {
          return this.WM.Parser.squashContiguousWhitespace(decodeURIComponent(HTTP.getURIParameter(null, 'title')));
        }
      }, {
        key: "isSection",
        value: function isSection() {
          if (document.getElementsByName('wpSection')[0].value) {
            return true;
          } else {
            return false;
          }
        }
      }, {
        key: "readSource",
        value: function readSource() {
          var value;
          value = document.getElementById('wpTextbox1').value;

          return Compatibility.normalizeCarriageReturns(value);
        }
      }, {
        key: "writeSource",
        value: function writeSource(text) {
          return document.getElementById('wpTextbox1').value = text;
        }
      }, {
        key: "readSummary",
        value: function readSummary() {
          return document.getElementById('wpSummary').getAttribute("value");
        }
      }, {
        key: "writeSummary",
        value: function writeSummary(text) {
          return document.getElementById('wpSummary').setAttribute("value", text);
        }
      }, {
        key: "appendToSummary",
        value: function appendToSummary(text) {
          return document.getElementById('wpSummary').setAttribute("value", this.readSummary() + text);
        }
      }]);

      return Editor;
    }();
  }, { "../../lib.js.generic/dist/Compatibility": 32, "../../lib.js.generic/dist/HTTP": 34 }], 10: [function (require, module, exports) {
    var $, CSS;

    $ = window.$;

    CSS = require('../../lib.js.generic/dist/CSS');

    module.exports.Filters = function () {
      function Filters(WM) {
        _classCallCheck(this, Filters);

        this.updateFilterUI = this.updateFilterUI.bind(this);
        this.executePlugin = this.executePlugin.bind(this);
        this.WM = WM;
      }

      _createClass(Filters, [{
        key: "_makeUI",
        value: function _makeUI(plugins) {
          var commandsFilterDiv, div, divFilter, filters, pid, pluginConf, pluginInst, pluginName, selectFilter;
          CSS.addStyleElement("#WikiMonkeyFilters-Commands {display:flex; align-items:center; justify-content:space-between;} #WikiMonkeyFilters-Commands > select {flex:auto;} #WikiMonkeyFilters-Commands > select, #WikiMonkeyFilters-Commands > input[type='button'] {margin-right:1em;} #WikiMonkeyFilters-Commands > input[type='checkbox'] {margin-right:0.4em;}");
          filters = [];
          selectFilter = $('<select/>').change(this.updateFilterUI(filters));
          for (pid in plugins) {
            pluginConf = plugins[pid];
            pluginName = pluginConf[0];
            pluginInst = pluginConf[1];

            if (!this.WM.Plugins[pluginName]) {
              continue;
            }

            if (!pluginInst || !pluginInst.length) {
              continue;
            }
            filters.push(pluginConf);
            $('<option/>').text(pluginInst[pluginInst.length - 1]).appendTo(selectFilter);
          }
          if (filters.length) {
            commandsFilterDiv = $('<div/>').attr('id', 'WikiMonkeyFilters-Commands');
            commandsFilterDiv.append(selectFilter);
            $('<input/>').attr('type', 'button').val('Apply filter').click(this.executePlugin(filters)).appendTo(commandsFilterDiv);
            $('<input/>').attr('type', 'checkbox').change(this.toggleLog).appendTo(commandsFilterDiv);
            $('<span/>').text('Show Log').appendTo(commandsFilterDiv);
            divFilter = $('<div/>').attr('id', "WikiMonkeyFilters-Options");

            $('<div/>').appendTo(divFilter);
            this.doUpdateFilterUI(divFilter, filters, 0);
            div = $('<div/>').attr('id', 'WikiMonkeyFilters').append(commandsFilterDiv).append(divFilter);
            return div[0];
          } else {
            return false;
          }
        }
      }, {
        key: "updateFilterUI",
        value: function updateFilterUI(filters) {
          var self;
          self = this;
          return function (event) {
            var UI, id, select;
            UI = $('#WikiMonkeyFilters-Options');
            select = $('#WikiMonkeyFilters-Commands').find('select').first();
            id = select[0].selectedIndex;
            return self.doUpdateFilterUI(UI, filters, id);
          };
        }
      }, {
        key: "doUpdateFilterUI",
        value: function doUpdateFilterUI(UI, filters, id) {
          var makeUI;
          makeUI = this.WM.Plugins[filters[id][0]].makeUI;
          if (makeUI instanceof Function) {
            return UI.children().first().replaceWith(makeUI(filters[id][2]));
          } else {
            return UI.children().first().replaceWith($('<div/>'));
          }
        }
      }, {
        key: "executePlugin",
        value: function executePlugin(filters) {
          var self;
          self = this;
          return function (event) {
            var id, select;
            select = $('#WikiMonkeyFilters-Commands').find('select').first();
            id = select[0].selectedIndex;
            self.WM.Plugins[filters[id][0]].main(filters[id][2]);
            return this.disabled = true;
          };
        }
      }, {
        key: "toggleLog",
        value: function toggleLog(event) {
          if (this.checked) {
            return $('#WikiMonkeyLog').show();
          } else {
            return $('#WikiMonkeyLog').hide();
          }
        }
      }]);

      return Filters;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31 }], 11: [function (require, module, exports) {
    var Obj;

    Obj = require('../../lib.js.generic/dist/Obj');

    module.exports.Interlanguage = function () {
      function Interlanguage(WM) {
        _classCallCheck(this, Interlanguage);

        this.parseLinks = this.parseLinks.bind(this);
        this.queryLinks = this.queryLinks.bind(this);
        this.createNewLink = this.createNewLink.bind(this);
        this.createVisitedLink = this.createVisitedLink.bind(this);
        this.collectLinks = this.collectLinks.bind(this);
        this._collectLinksContinue = this._collectLinksContinue.bind(this);
        this.updateLinks = this.updateLinks.bind(this);
        this.WM = WM;
      }

      _createClass(Interlanguage, [{
        key: "parseLinks",
        value: function parseLinks(supportedLangs, source, iwmap) {
          var i, iw, j, langlinks, len, len1, link, ltag, ltitle, lurl, parsedLinks;
          parsedLinks = this.WM.Parser.findSpecialLinks(source, supportedLangs.join("|"));
          langlinks = [];
          for (i = 0, len = parsedLinks.length; i < len; i++) {
            link = parsedLinks[i];

            ltag = link.namespace;
            ltitle = link.title + (link.fragment ? "#" + link.fragment : "");
            for (j = 0, len1 = iwmap.length; j < len1; j++) {
              iw = iwmap[j];
              if (iw.prefix.toLowerCase() === ltag.toLowerCase()) {
                lurl = this.WM.MW.fixInterwikiUrl(iw.url);
                lurl = lurl.replace("$1", encodeURIComponent(this.WM.Parser.squashContiguousWhitespace(ltitle)));
                break;
              }
            }
            langlinks.push({
              lang: ltag,
              title: ltitle,
              url: lurl,
              index: link.index,
              length: link.length
            });
          }
          return langlinks;
        }
      }, {
        key: "queryLinks",
        value: function queryLinks(queryTitle, title, supportedLangs, whitelist, firstPage, callEnd, callArgs) {
          var _this4 = this;

          var query;
          query = {
            action: "query",
            prop: "info|revisions",
            rvprop: "content|timestamp",
            intoken: "edit",
            titles: queryTitle,
            meta: "siteinfo",
            siprop: "interwikimap",
            sifilteriw: "local"
          };

          if (!firstPage) {
            query.redirects = "1";
          }
          return this.WM.MW.callAPIGet(query, function (res, args) {
            var edittoken, error, iwmap, langlinks, page, source, timestamp;
            if (res.query.pages) {
              page = Obj.getFirstItem(res.query.pages);
              if (page.revisions) {
                error = null;
                source = page.revisions[0]["*"];
                timestamp = page.revisions[0].timestamp;
                edittoken = page.edittoken;
                iwmap = res.query.interwikimap;
                langlinks = _this4.WM.Interlanguage.parseLinks(supportedLangs, source, iwmap);
              } else {
                error = 'nonexisting';
                source = false;
                timestamp = false;
                edittoken = false;
                iwmap = res.query.interwikimap;
                langlinks = false;
              }
            } else if (res.query.redirects) {
              error = 'unsolvedredirect';
              source = false;
              timestamp = false;
              edittoken = false;
              iwmap = res.query.interwikimap;
              langlinks = false;
            } else {
              error = 'unknown';
              source = false;
              timestamp = false;
              edittoken = false;
              iwmap = res.query.interwikimap;
              langlinks = false;
            }
            return callEnd(title, supportedLangs, whitelist, false, error, langlinks, iwmap, source, timestamp, edittoken, args);
          }, callArgs, function (args) {
            return callEnd(title, supportedLangs, whitelist, false, 'unknown', false, false, false, false, false, args);
          });
        }
      }, {
        key: "createNewLink",
        value: function createNewLink(origTag, title, url) {
          return {
            origTag: origTag,
            title: title,
            url: url
          };
        }
      }, {
        key: "createVisitedLink",
        value: function createVisitedLink(origTag, title, url, iwmap, source, timestamp, edittoken, links) {
          var entry, i, len, link;
          entry = {
            origTag: origTag,
            title: title,
            url: url,
            iwmap: iwmap,
            source: source,
            timestamp: timestamp,
            edittoken: edittoken,
            links: []
          };
          for (i = 0, len = links.length; i < len; i++) {
            link = links[i];
            entry.links.push(link);
          }
          return entry;
        }
      }, {
        key: "collectLinks",
        value: function collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, firstPage, callEnd, callArgs) {
          var link, origTag, queryTitle, tag, title, url;
          for (tag in newlinks) {
            link = newlinks[tag];
            break;
          }
          if (link) {
            delete newlinks[tag];
            url = link.url;

            queryTitle = decodeURIComponent(this.WM.MW.getTitleFromWikiUrl(url));
            if (queryTitle) {
              origTag = link.origTag;
              title = link.title;

              if (firstPage || whitelist.indexOf(tag) > -1) {
                this.WM.Log.logInfo("Reading " + this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " ...");
                return this.queryLinks(queryTitle, title, supportedLangs, whitelist, firstPage, this.WM.Interlanguage._collectLinksContinue, [url, tag, origTag, visitedlinks, newlinks, callEnd, callArgs]);
              } else {
                return this.WM.Interlanguage._collectLinksContinue(title, supportedLangs, whitelist, firstPage, 'notinwhitelist', [], false, null, null, null, [url, tag, origTag, visitedlinks, newlinks, callEnd, callArgs]);
              }
            } else {
              this.WM.Log.logWarning("Cannot extract the page title from " + this.WM.Log.linkToPage(url, decodeURI(url)) + ", removing it if it was linked from the processed article");
              return this.WM.Interlanguage.collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, firstPage, callEnd, callArgs);
            }
          } else {
            return callEnd(visitedlinks, callArgs);
          }
        }
      }, {
        key: "_collectLinksContinue",
        value: function _collectLinksContinue(title, supportedLangs, whitelist, firstPage, error, langlinks, iwmap, source, timestamp, edittoken, args) {
          var callArgs, callEnd, i, len, link, newlinks, nlink, origTag, tag, url, visitedlinks, vlink;
          url = args[0];
          tag = args[1];
          origTag = args[2];
          visitedlinks = args[3];
          newlinks = args[4];
          callEnd = args[5];
          callArgs = args[6];
          if (error === 'nonexisting') {
            this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " seems to point to a non-existing article: removing it if it was linked from the processed article");
          } else {
            if (error === 'unsolvedredirect') {
              this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " will not be checked because it points to an external redirect");
            } else if (error === 'unknown') {
              this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " will not be checked because of an unspecified problem");
            } else if (error === 'notinwhitelist') {
              this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " will not be checked because " + tag + " is not included in the whitelist defined in the configuration");
            }
            visitedlinks[tag] = this.WM.Interlanguage.createVisitedLink(origTag, title, url, iwmap, source, timestamp, edittoken, langlinks);
            for (i = 0, len = langlinks.length; i < len; i++) {
              link = langlinks[i];
              nlink = newlinks[link.lang.toLowerCase()];
              vlink = visitedlinks[link.lang.toLowerCase()];
              if (!vlink && !nlink) {
                newlinks[link.lang.toLowerCase()] = this.WM.Interlanguage.createNewLink(link.lang, link.title, link.url);
              } else if (vlink && vlink.url !== link.url) {
                this.WM.Log.logWarning("Possibly conflicting interlanguage links: " + this.WM.Log.linkToPage(link.url, "[[" + link.lang + ":" + link.title + "]]") + " and " + this.WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" + visitedlinks[link.lang.toLowerCase()].title + "]]"));
              } else if (nlink && nlink.url !== link.url) {
                this.WM.Log.logWarning("Possibly conflicting interlanguage links: " + this.WM.Log.linkToPage(link.url, "[[" + link.lang + ":" + link.title + "]]") + " and " + this.WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" + newlinks[link.lang.toLowerCase()].title + "]]"));
              }
            }
          }
          return this.WM.Interlanguage.collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, firstPage, callEnd, callArgs);
        }
      }, {
        key: "updateLinks",
        value: function updateLinks(lang, url, iwmap, source, oldlinks, newlinks) {
          var body, cleanText, firstLink, head, i, iw, j, len, len1, link, linkList, links, parts, tag, tagFound, textId, trailws;
          lang = lang.toLowerCase();
          linkList = [];
          for (tag in newlinks) {
            if (tag !== lang) {
              link = newlinks[tag];
              tagFound = false;

              for (i = 0, len = iwmap.length; i < len; i++) {
                iw = iwmap[i];
                if (iw.prefix.toLowerCase() === tag.toLowerCase()) {
                  linkList.push("[[" + link.origTag + ":" + link.title + "]]");
                  tagFound = true;
                  break;
                }
              }
              if (!tagFound) {
                this.WM.Log.logWarning(tag + " interlanguage links are not supported in " + this.WM.Log.linkToPage(url, "[[" + link.origTag + ":" + link.title + "]]") + " , ignoring them");
              }
            }
          }
          linkList.sort(function (a, b) {
            if (a.toLowerCase() > b.toLowerCase()) {
              return 1;
            }
            if (b.toLowerCase() > a.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          });
          cleanText = "";
          textId = 0;
          for (j = 0, len1 = oldlinks.length; j < len1; j++) {
            link = oldlinks[j];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
          }
          cleanText += source.substring(textId);
          if (oldlinks.length) {
            firstLink = oldlinks[0].index;
          } else {
            firstLink = 0;
          }
          parts = [];

          head = cleanText.substring(0, firstLink).trim();
          if (head) {
            parts.push(head);
          }
          links = linkList.join("\n");
          if (links) {
            parts.push(links);
          }
          body = cleanText.substr(firstLink).trim();
          if (body) {
            parts.push(body);
          }

          trailws = /\s*$/;
          return parts.join("\n") + trailws.exec(source);
        }
      }]);

      return Interlanguage;
    }();
  }, { "../../lib.js.generic/dist/Obj": 35 }], 12: [function (require, module, exports) {
    var CSS, Str;

    CSS = require('../../lib.js.generic/dist/CSS');

    Str = require('../../lib.js.generic/dist/Str');

    module.exports.Log = function () {
      var classesToLevels;

      var Log = function () {
        function Log(WM) {
          _classCallCheck(this, Log);

          this.WM = WM;
          this._currentInfoDisplayState = true;
        }

        _createClass(Log, [{
          key: "_makeLogArea",
          value: function _makeLogArea() {
            var log, logarea, par;

            CSS.addStyleElement("#WikiMonkeyLogArea {height:10em; border:2px solid #07b; padding:0.5em; overflow:auto; resize:vertical; background-color:#111;} #WikiMonkeyLogArea p.timestamp, #WikiMonkeyLog p.message {border:none; padding:0; font-family:monospace; color:#eee;} #WikiMonkeyLogArea p.timestamp {margin:0 1em 0 0; white-space:nowrap;} #WikiMonkeyLogArea p.message {margin:0;} #WikiMonkeyLogArea div.mdebug, #WikiMonkeyLogArea div.minfo, #WikiMonkeyLogArea div.mwarning, #WikiMonkeyLogArea div.merror {display:flex;} #WikiMonkeyLogArea div.mhidden {display:none;} #WikiMonkeyLogArea div.mjson {display:none;} #WikiMonkeyLogArea div.mdebug p.message {color:cyan;} #WikiMonkeyLogArea div.mwarning p.message {color:gold;} #WikiMonkeyLogArea div.merror p.message {color:red;} #WikiMonkeyLogArea a {color:inherit; text-decoration:underline;}");
            log = document.createElement('div');
            log.id = 'WikiMonkeyLog';
            par = document.createElement('p');
            par.appendChild(this.makeFilterLink());
            par.appendChild(document.createTextNode(' '));
            par.appendChild(this.makeSaveLink());
            log.appendChild(par);
            logarea = document.createElement('div');
            logarea.id = 'WikiMonkeyLogArea';
            log.appendChild(logarea);
            return log;
          }
        }, {
          key: "makeFilterLink",
          value: function makeFilterLink() {
            var link, self;
            self = this;
            link = document.createElement('a');
            link.href = '#WikiMonkey';
            link.innerHTML = this.computeFilterLinkAnchor();
            link.addEventListener("click", function () {
              var i, len, msg, msgs;

              self._currentInfoDisplayState = !self._currentInfoDisplayState;
              this.innerHTML = self.computeFilterLinkAnchor();
              msgs = document.getElementById('WikiMonkeyLogArea').getElementsByClassName('minfo');
              for (i = 0, len = msgs.length; i < len; i++) {
                msg = msgs[i];
                msg.style.display = self.computeInfoDisplayStyle();
              }
              return this.scrollToBottom();
            }, false);
            return link;
          }
        }, {
          key: "makeSaveLink",
          value: function makeSaveLink() {
            var link, self;
            self = this;
            link = document.createElement('a');
            link.href = '#';
            link.download = 'WikiMonkey.log';
            link.innerHTML = '[save log]';
            link.id = 'WikiMonkeyLog-Save';
            link.addEventListener("click", function () {
              link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(self.composeSaveLogText());
              return link.download = self.composeSaveLogFilename();
            }, false);
            return link;
          }
        }, {
          key: "composeSaveLogText",
          value: function composeSaveLogText() {
            var div, divs, i, len, level, log, message, ps, text, tstamp;
            log = document.getElementById('WikiMonkeyLogArea');
            divs = log.getElementsByTagName('div');
            text = '';
            for (i = 0, len = divs.length; i < len; i++) {
              div = divs[i];
              ps = div.getElementsByTagName('p');
              tstamp = ps[0].innerHTML;
              level = classesToLevels[div.className];
              message = ps[1].innerHTML;
              text += tstamp + '\t' + level + '\t' + message + '\n';
            }
            return text;
          }
        }, {
          key: "composeSaveLogFilename",
          value: function composeSaveLogFilename() {
            var date;
            date = new Date();
            return 'WikiMonkey-' + date.getFullYear() + Str.padLeft(String(date.getMonth() + 1), '0', 2) + Str.padLeft(String(date.getDate()), '0', 2) + Str.padLeft(String(date.getHours()), '0', 2) + Str.padLeft(String(date.getMinutes()), '0', 2) + '.log';
          }
        }, {
          key: "computeInfoDisplayStyle",
          value: function computeInfoDisplayStyle() {
            if (this._currentInfoDisplayState) {
              return 'flex';
            } else {
              return 'none';
            }
          }
        }, {
          key: "computeFilterLinkAnchor",
          value: function computeFilterLinkAnchor() {
            if (this._currentInfoDisplayState) {
              return '[hide info messages]';
            } else {
              return '[show info messages]';
            }
          }
        }, {
          key: "scrollToBottom",
          value: function scrollToBottom() {
            var log;
            log = document.getElementById('WikiMonkeyLogArea');
            return log.scrollTop = log.scrollHeight - log.clientHeight;
          }
        }, {
          key: "appendMessage",
          value: function appendMessage(text, type) {
            var line, log, msg, now, test, tstamp;
            tstamp = document.createElement('p');
            tstamp.className = 'timestamp';
            now = new Date();
            tstamp.innerHTML = now.toLocaleTimeString();
            msg = document.createElement('p');
            msg.className = 'message';

            msg.innerHTML = text ? text : " ";
            line = document.createElement('div');
            line.appendChild(tstamp);
            line.appendChild(msg);
            line.className = type;
            if (type === 'minfo') {
              line.style.display = this.computeInfoDisplayStyle();
            }
            log = document.getElementById('WikiMonkeyLogArea');
            test = log.scrollTop + log.clientHeight === log.scrollHeight;
            log.appendChild(line);
            if (test) {
              return this.scrollToBottom();
            }
          }
        }, {
          key: "logHidden",
          value: function logHidden(text) {
            return this.appendMessage(text, 'mhidden');
          }
        }, {
          key: "logJson",
          value: function logJson(component, data) {
            var text;
            text = JSON.stringify({
              "component": component,
              "data": data
            });
            return this.appendMessage(text, 'mjson');
          }
        }, {
          key: "logDebug",
          value: function logDebug(text) {
            return this.appendMessage(text, 'mdebug');
          }
        }, {
          key: "logInfo",
          value: function logInfo(text) {
            return this.appendMessage(text, 'minfo');
          }
        }, {
          key: "logWarning",
          value: function logWarning(text) {
            return this.appendMessage(text, 'mwarning');
          }
        }, {
          key: "logError",
          value: function logError(text) {
            return this.appendMessage(text, 'merror');
          }
        }, {
          key: "linkToPage",
          value: function linkToPage(url, anchor) {
            return "<a href=\"" + url + "\">" + anchor + "</a>";
          }
        }, {
          key: "linkToWikiPage",
          value: function linkToWikiPage(title, anchor) {
            var wikiUrls;

            wikiUrls = this.WM.MW.getWikiUrls();
            return "<a href=\"" + wikiUrls.short + title + "\">" + anchor + "</a>";
          }
        }]);

        return Log;
      }();

      ;

      classesToLevels = {
        'mhidden': 'HDN',
        'mjson': 'JSN',
        'mdebug': 'DBG',
        'minfo': 'INF',
        'mwarning': 'WRN',
        'merror': 'ERR'
      };

      return Log;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31, "../../lib.js.generic/dist/Str": 37 }], 13: [function (require, module, exports) {
    var $, HTTP, Obj;

    $ = window.$;

    HTTP = require('../../lib.js.generic/dist/HTTP');

    Obj = require('../../lib.js.generic/dist/Obj');

    module.exports.MW = function () {
      var interwikiFixes, localWikiPaths, localWikiUrls, wikiPaths;

      var MW = function () {
        function MW(WM) {
          _classCallCheck(this, MW);

          var hostname, key, wpaths;
          this.WM = WM;
          wpaths = this._getWikiPaths(location.href);
          hostname = wpaths[0];
          this.userInfo = null;
          localWikiPaths = wpaths[1];
          localWikiUrls = {};
          for (key in localWikiPaths) {
            localWikiUrls[key] = hostname + localWikiPaths[key];
          }
        }

        _createClass(MW, [{
          key: "_getWikiPaths",
          value: function _getWikiPaths(href) {
            var hostname, match, p, paths, r, re;

            for (r in wikiPaths.known) {
              re = new RegExp(r, "i");
              match = re.exec(href);
              if (match) {
                hostname = match[0];
                paths = {};
                for (p in wikiPaths.known[r]) {
                  paths[p] = wikiPaths.known[r][p];
                }
                break;
              }
            }
            if (!paths) {
              hostname = HTTP.getUrlLocation(href).hostname;
              paths = {};
              for (p in wikiPaths.default_) {
                paths[p] = wikiPaths.default_[p];
              }
            }
            return [hostname, paths];
          }
        }, {
          key: "getWikiPaths",
          value: function getWikiPaths(href) {
            if (href) {
              return this._getWikiPaths(href)[1];
            } else {
              return localWikiPaths;
            }
          }
        }, {
          key: "getWikiUrls",
          value: function getWikiUrls(href) {
            var hostname, key, paths, urls, wpaths;
            if (href) {
              wpaths = this._getWikiPaths(href);
              hostname = wpaths[0];
              paths = wpaths[1];
              urls = {};
              for (key in paths) {
                urls[key] = hostname + paths[key];
              }
              return urls;
            } else {
              return localWikiUrls;
            }
          }
        }, {
          key: "getTitleFromWikiUrl",
          value: function getTitleFromWikiUrl(url) {
            var match, pathname, r, re, title;
            title = HTTP.getURIParameters(url).title;

            if (!title) {
              pathname = HTTP.getUrlLocation(url).pathname;
              for (r in wikiPaths.known) {
                re = new RegExp(r, "i");
                match = re.exec(url);
                if (match) {
                  if (pathname.indexOf(wikiPaths.known[r].short) === 0) {
                    title = pathname.substr(wikiPaths.known[r].short.length);
                  } else {
                    title = false;
                  }
                  break;
                }
              }
              if (!title) {
                if (pathname.indexOf(wikiPaths.default_.short) === 0) {
                  title = pathname.substr(wikiPaths.default_.short.length);
                } else {
                  title = false;
                }
              }
            }
            return title;
          }
        }, {
          key: "failedQueryError",
          value: function failedQueryError(url) {
            return "Failed query: " + this.WM.Log.linkToPage(url, url);
          }
        }, {
          key: "callAPIGet",
          value: function callAPIGet(params, call, callArgs, callError) {
            var _this5 = this;

            var api;
            api = localWikiUrls.api;
            params.format = "json";
            return $.get({
              url: api,
              data: params
            }).done(function (data, textStatus, jqXHR) {
              if (!data instanceof Object) {
                _this5.WM.Log.logError("It is likely that the " + _this5.WM.Log.linkToPage(api, "API") + " for this wiki is disabled");
                if (callError) {
                  callError(callArgs);
                }
              }
              if (data) {
                return call(data, callArgs);
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              _this5.WM.Log.logError(_this5.failedQueryError(api));
              if (confirm("Wiki Monkey error: Failed query\n\nDo you want " + "to retry?")) {
                _this5.WM.Log.logInfo("Retrying ...");
                return _this5.callAPIGet(params, call, callArgs, callError);
              } else if (callError) {
                return callError(callArgs);
              }
            });
          }
        }, {
          key: "callAPIPost",
          value: function callAPIPost(params, call, callArgs, callError) {
            var _this6 = this;

            var api;
            api = localWikiUrls.api;
            params.format = "json";
            return $.post({
              url: api,
              data: params
            }).done(function (data, textStatus, jqXHR) {
              if (!data instanceof Object) {
                _this6.WM.Log.logError("It is likely that the " + _this6.WM.Log.linkToPage(api, "API") + " for this wiki is disabled");
                if (callError) {
                  callError(callArgs);
                }
              }
              if (data) {
                return call(data, callArgs);
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              _this6.WM.Log.logError(_this6.failedQueryError(api));
              if (confirm("Wiki Monkey error: Failed query\n\nDo you want " + "to retry?")) {
                _this6.WM.Log.logInfo("Retrying ...");
                return _this6.callAPIPost(params, call, callArgs, callError);
              } else if (callError) {
                return callError(callArgs);
              }
            });
          }
        }, {
          key: "callQuery",
          value: function callQuery(params, call, callArgs, callError) {
            var callBack;
            params.action = "query";
            callBack = function callBack(res, args) {
              var page;
              page = Obj.getFirstItem(res.query.pages);
              return call(page, args);
            };
            return this.callAPIGet(params, callBack, callArgs, callError);
          }
        }, {
          key: "callQueryEdit",
          value: function callQueryEdit(title, call, callArgs) {
            var callBack, pars;
            callBack = function callBack(page, args) {
              var edittoken, source, timestamp;
              source = page.revisions[0]["*"];
              timestamp = page.revisions[0].timestamp;
              edittoken = page.edittoken;
              return call(title, source, timestamp, edittoken, args);
            };
            pars = {
              prop: "info|revisions",
              rvprop: "content|timestamp",
              intoken: "edit",
              titles: title
            };
            return this.callQuery(pars, callBack, callArgs, null);
          }
        }, {
          key: "getUserInfo",
          value: function getUserInfo(call) {
            var _this7 = this;

            var pars, storeInfo;
            storeInfo = function storeInfo(res, call) {
              _this7.userInfo = res;
              return call();
            };
            if (!this.userInfo) {
              pars = {
                action: "query",
                meta: "userinfo",
                uiprop: "groups"
              };
              return this.callAPIGet(pars, storeInfo, call, null);
            } else {
              return call();
            }
          }
        }, {
          key: "isLoggedIn",
          value: function isLoggedIn(call, args) {
            var _this8 = this;

            return this.getUserInfo(function () {
              var test;
              test = _this8.userInfo.query.userinfo.id !== 0;
              return call(test, args);
            });
          }
        }, {
          key: "getUserName",
          value: function getUserName(call, args) {
            var _this9 = this;

            return this.getUserInfo(function () {
              return call(_this9.userInfo.query.userinfo.name, args);
            });
          }
        }, {
          key: "isUserBot",
          value: function isUserBot(call, args) {
            var _this10 = this;

            return this.getUserInfo(function () {
              var groups, res;
              groups = _this10.userInfo.query.userinfo.groups;
              res = groups.indexOf("bot") > -1;
              return call(res, args);
            });
          }
        }, {
          key: "getBacklinks",
          value: function getBacklinks(bltitle, blnamespace, call, callArgs) {
            var query;
            query = {
              action: "query",
              list: "backlinks",
              bltitle: bltitle,
              bllimit: 500
            };
            if (blnamespace) {
              query.blnamespace = blnamespace;
            }
            return this._getBacklinksContinue(query, call, callArgs, []);
          }
        }, {
          key: "_getBacklinksContinue",
          value: function _getBacklinksContinue(query, call, callArgs, backlinks) {
            var _this11 = this;

            return this.callAPIGet(query, function (res, args) {
              backlinks = backlinks.concat(res.query.backlinks);
              if (res["query-continue"]) {
                query.blcontinue = res["query-continue"].backlinks.blcontinue;
                return _this11._getBacklinksContinue(query, call, args, backlinks);
              } else {
                return call(backlinks, args);
              }
            }, callArgs, null);
          }
        }, {
          key: "getLanglinks",
          value: function getLanglinks(title, iwmap, call, callArgs) {
            var query;
            query = {
              action: "query",
              prop: "langlinks",
              titles: title,
              lllimit: 500,
              llurl: "1",
              redirects: "1"
            };
            if (iwmap) {
              query.meta = "siteinfo";
              query.siprop = "interwikimap";
              query.sifilteriw = "local";
            }
            return this._getLanglinksContinue(query, call, callArgs, [], null);
          }
        }, {
          key: "_getLanglinksContinue",
          value: function _getLanglinksContinue(query, call, callArgs, langlinks, iwmap) {
            var _this12 = this;

            return this.callAPIGet(query, function (res, args) {
              var page;
              page = Obj.getFirstItem(res.query.pages);
              langlinks = langlinks.concat(page.langlinks);
              if (res.query.interwikimap) {
                iwmap = res.query.interwikimap;
              }
              if (query.meta) {
                delete query.meta;
                delete query.siprop;
                delete query.sifilteriw;
              }
              if (res["query-continue"]) {
                query.llcontinue = res["query-continue"].langlinks.llcontinue;
                return _this12._getLanglinksContinue(query, call, args, langlinks, iwmap);
              } else {
                return call(langlinks, iwmap, args);
              }
            }, callArgs, null);
          }
        }, {
          key: "getInterwikiMap",
          value: function getInterwikiMap(title, call, callArgs) {
            return this.callAPIGet({
              action: "query",
              meta: "siteinfo",
              siprop: "interwikimap",
              sifilteriw: "local"
            }, function (res, args) {
              return call(res.query.interwikimap, args);
            }, callArgs, null);
          }
        }, {
          key: "fixInterwikiUrl",
          value: function fixInterwikiUrl(url) {
            var f, furl, i, ref;
            for (f = i = 0, ref = interwikiFixes.length; 0 <= ref ? i < ref : i > ref; f = 0 <= ref ? ++i : --i) {
              furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1]);
              if (furl !== url) {
                return furl;
              }
            }

            return url;
          }
        }, {
          key: "getSpecialList",
          value: function getSpecialList(qppage, siprop, call, callArgs) {
            var query;
            query = {
              action: "query",
              list: "querypage",
              qppage: qppage,
              qplimit: 500
            };
            if (siprop) {
              query.meta = "siteinfo";
              query.siprop = siprop;
            }
            return this._getSpecialListContinue(query, call, callArgs, [], {});
          }
        }, {
          key: "_getSpecialListContinue",
          value: function _getSpecialListContinue(query, call, callArgs, results, siteinfo) {
            var _this13 = this;

            return this.callAPIGet(query, function (res, args) {
              var key;
              results = results.concat(res.query.querypage.results);
              for (key in res.query) {
                if (key !== "querypage") {
                  siteinfo[key] = res.query[key];
                }
              }
              if (query.meta) {
                delete query.meta;
                delete query.siprop;
              }
              if (res["query-continue"]) {
                query.qpoffset = res["query-continue"].querypage.qpoffset;
                return _this13._getSpecialListContinue(query, call, args, results, siteinfo);
              } else {
                return call(results, siteinfo, args);
              }
            }, callArgs, null);
          }
        }, {
          key: "getUserContribs",
          value: function getUserContribs(ucuser, ucstart, ucend, call, callArgs) {
            var query;
            query = {
              action: "query",
              list: "usercontribs",
              ucuser: ucuser,
              ucprop: "",
              ucstart: ucstart,
              ucend: ucend,
              uclimit: 500
            };
            return this._getUserContribsContinue(query, call, callArgs, []);
          }
        }, {
          key: "_getUserContribsContinue",
          value: function _getUserContribsContinue(query, call, callArgs, results) {
            var _this14 = this;

            return this.callAPIGet(query, function (res, args) {
              results = results.concat(res.query.usercontribs);
              if (res["query-continue"]) {
                query.uccontinue = res["query-continue"].usercontribs.uccontinue;
                return _this14._getUserContribsContinue(query, call, args, results);
              } else {
                return call(results, args);
              }
            }, callArgs, null);
          }
        }]);

        return MW;
      }();

      ;

      localWikiPaths = null;

      localWikiUrls = null;

      wikiPaths = {
        known: {
          "^https?://[^\.]+\.wikipedia\.org": {
            short: "/wiki/",
            full: "/w/index.php",
            api: "/w/api.php"
          },
          "^https?://wiki\.archlinux\.org": {
            short: "/index.php/",
            full: "/index.php",
            api: "/api.php"
          },
          "^https?://wiki\.archlinux\.de": {
            short: "/title/",
            full: "/index.php",
            api: "/api.php"
          },
          "^http://wiki\.archlinux\.fr": {
            short: "/",
            full: "/index.php",
            api: "/api.php"
          },
          "^https?://wiki\.archlinux\.jp": {
            short: "/index.php/",
            full: "/index.php",
            api: "/api.php"
          },
          "^http://wiki\.archlinux\.ro": {
            short: "/index.php/",
            full: "/index.php",
            api: "/api.php"
          },
          "^http://wiki\.archlinux\.ir": {
            short: "/index.php/",
            full: "/index.php",
            api: "/api.php"
          }
        },
        default_: {
          short: "/index.php?title=",
          full: "/index.php",
          api: "/api.php"
        }
      };

      interwikiFixes = [["https://wiki.archlinux.org/index.php/$1_(", "https://wiki.archlinux.org/index.php/$1%20("]];

      return MW;
    }();
  }, { "../../lib.js.generic/dist/HTTP": 34, "../../lib.js.generic/dist/Obj": 35 }], 14: [function (require, module, exports) {
    var $, Async, CSS;

    $ = window.$;

    CSS = require('../../lib.js.generic/dist/CSS');

    Async = require('../../lib.js.generic/dist/Async');

    module.exports.Menu = function () {
      var makeChangeMenu, makeGroupAction;

      var Menu = function () {
        function Menu(WM) {
          _classCallCheck(this, Menu);

          this.executeEntryAction = this.executeEntryAction.bind(this);
          this.warnInputNeeded = this.warnInputNeeded.bind(this);
          this.WM = WM;
        }

        _createClass(Menu, [{
          key: "_makeUI",
          value: function _makeUI(plugins) {
            var currId, currMenu, entry, execAll, groupAction, groupActions, i, m, mainDiv, menuSel, menus, parentId, parentMenu, pid, plugin, pluginConf, pluginInst, pluginName, ref;
            CSS.addStyleElement("#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");
            mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');
            groupActions = {};
            for (pid in plugins) {
              pluginConf = plugins[pid];
              pluginName = pluginConf[0];
              pluginInst = pluginConf[1];

              if (this.WM.Plugins[pluginName]) {
                plugin = this.WM.Plugins[pluginName];
              } else {
                continue;
              }

              if (!pluginInst || !pluginInst.length) {
                continue;
              }
              if (plugin.makeUI) {
                groupAction = [this.warnInputNeeded, pluginConf[0]];
              } else {
                groupAction = [this.executeEntryAction, [plugin, pluginConf]];
              }
              pluginInst.unshift("WikiMonkeyMenuRoot");
              currId = false;
              for (m = i = 0, ref = pluginInst.length - 1; 0 <= ref ? i < ref : i > ref; m = 0 <= ref ? ++i : --i) {
                parentId = currId;
                currId = pluginInst.slice(0, m + 1).join("-").replace(/ /g, "_");

                menuSel = mainDiv.children("div[id='" + currId + "']");
                if (!menuSel.length) {
                  currMenu = $("<div/>").attr("id", currId).hide().appendTo(mainDiv);
                  groupActions[currId] = [];
                  if (m > 0) {
                    parentMenu = mainDiv.children("div[id='" + parentId + "']");
                    $('<input/>').attr('type', 'button').val('<').addClass('margin').click(makeChangeMenu(currMenu, parentMenu)).appendTo(currMenu);
                    $('<input/>').attr('type', 'button').val(pluginInst[m]).click(makeGroupAction(groupActions[currId])).appendTo(parentMenu);
                    $('<input/>').attr('type', 'button').val('>').addClass('margin').click(makeChangeMenu(parentMenu, currMenu)).appendTo(parentMenu);
                  }
                } else {
                  currMenu = menuSel.first();
                }
                groupActions[currId].push(groupAction);
              }
              entry = $("<input/>").attr('type', 'button').val(pluginInst[pluginInst.length - 1]).addClass('margin').appendTo(currMenu);
              if (plugin.makeUI) {
                entry.click(this.makeEntryUI(currMenu, plugin, pluginConf));
              } else {
                entry.click(this.makeEntryAction(plugin, pluginConf));
              }
            }
            menus = mainDiv.children();
            if (menus.length) {
              execAll = $('<input/>').attr('type', 'button').val("*").addClass('margin').click(makeGroupAction(groupActions["WikiMonkeyMenuRoot"]));

              mainDiv.children("div[id='WikiMonkeyMenuRoot']").first().prepend(execAll);
              menus.first().show();
              return mainDiv[0];
            } else {
              return false;
            }
          }
        }, {
          key: "makeEntryUI",
          value: function makeEntryUI(currMenu, plugin, pluginConf) {
            var self;
            self = this;
            return function (event) {
              var UI, UIdiv;
              currMenu.hide();
              UIdiv = $('<div/>');
              $('<input/>').attr('type', 'button').val('<').addClass('margin').click(function (event) {
                UIdiv.remove();
                return currMenu.show();
              }).appendTo(UIdiv);
              $('<input/>').attr('type', 'button').val('Execute').click(self.makeEntryAction(plugin, pluginConf)).appendTo(UIdiv);
              UI = plugin.makeUI(pluginConf[2]);
              return UIdiv.append(UI).insertAfter(currMenu);
            };
          }
        }, {
          key: "makeEntryAction",
          value: function makeEntryAction(plugin, pluginConf) {
            var self;
            self = this;
            return function (event) {
              return self.executeEntryAction([plugin, pluginConf], null);
            };
          }
        }, {
          key: "executeEntryAction",
          value: function executeEntryAction(args, callNext) {
            var plugin, pluginConf;
            plugin = args[0];
            pluginConf = args[1];
            this.WM.Log.logHidden("Plugin: " + pluginConf[0]);
            return plugin.main(pluginConf[2], callNext);
          }
        }, {
          key: "warnInputNeeded",
          value: function warnInputNeeded(pluginName, callNext) {
            this.WM.Log.logWarning("Plugin " + pluginName + " was not executed because it requires input from its interface.");
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return Menu;
      }();

      ;

      makeChangeMenu = function makeChangeMenu(currentMenu, changeMenu) {
        return function (event) {
          currentMenu.hide();
          return changeMenu.show();
        };
      };

      makeGroupAction = function makeGroupAction(subGroupActions) {
        return function (event) {
          return Async.executeAsync(subGroupActions, -1);
        };
      };

      return Menu;
    }();
  }, { "../../lib.js.generic/dist/Async": 30, "../../lib.js.generic/dist/CSS": 31 }], 15: [function (require, module, exports) {
    var $, CSS;

    $ = window.$;

    CSS = require('../../lib.js.generic/dist/CSS');

    module.exports.Mods = function () {
      var changeHeadingNumberStyle, disableEditSummarySubmitOnEnter, hideRollbackLinks, scrollToFirstHeading;

      var Mods = function () {
        function Mods(WM) {
          _classCallCheck(this, Mods);

          this.WM = WM;
        }

        _createClass(Mods, [{
          key: "applyGeneralMods",
          value: function applyGeneralMods() {
            var conf;
            conf = this.WM.Cfg._getGeneralMods();
            if (conf['heading_number_style']) {
              return changeHeadingNumberStyle(conf['heading_number_style']);
            }
          }
        }, {
          key: "applyEditorMods",
          value: function applyEditorMods() {
            var conf;
            conf = this.WM.Cfg._getEditorMods();
            if (conf['disable_edit_summary_submit_on_enter']) {
              disableEditSummarySubmitOnEnter();
            }
            if (conf['scroll_to_first_heading']) {
              return scrollToFirstHeading();
            }
          }
        }, {
          key: "applyRecentChangesMods",
          value: function applyRecentChangesMods() {
            var conf;
            conf = this.WM.Cfg._getRecentChangesMods();
            if (conf['hide_rollback_links']) {
              return hideRollbackLinks();
            }
          }
        }, {
          key: "applyContributionsMods",
          value: function applyContributionsMods() {
            var conf;
            conf = this.WM.Cfg._getContributionsMods();
            if (conf['hide_rollback_links']) {
              return hideRollbackLinks();
            }
          }
        }]);

        return Mods;
      }();

      ;

      changeHeadingNumberStyle = function changeHeadingNumberStyle(style) {
        return CSS.addStyleElement("span.mw-headline-number {" + style + "}");
      };

      disableEditSummarySubmitOnEnter = function disableEditSummarySubmitOnEnter() {
        return $('#wpSummary').keydown(function (event) {
          if (event.key === 'Enter' || typeof event.key === 'undefined' && event.keyCode === 13) {
            event.preventDefault();
            return false;
          }
        });
      };

      hideRollbackLinks = function hideRollbackLinks() {
        return CSS.addStyleElement("span.mw-rollback-link {display:none;}");
      };

      scrollToFirstHeading = function scrollToFirstHeading() {
        return window.scrollTo(0, $('#firstHeading').offset().top);
      };

      return Mods;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31 }], 16: [function (require, module, exports) {
    var RegEx, Str;

    RegEx = require('../../lib.js.generic/dist/RegEx');

    Str = require('../../lib.js.generic/dist/Str');

    module.exports.Parser = function () {
      var prepareRegexpWhitespace, prepareTitleCasing;

      var Parser = function () {
        function Parser(WM) {
          _classCallCheck(this, Parser);

          this.WM = WM;
        }

        _createClass(Parser, [{
          key: "squashContiguousWhitespace",
          value: function squashContiguousWhitespace(title) {
            return title.replace(/[_ ]+/g, " ");
          }
        }, {
          key: "neutralizeNowikiTags",
          value: function neutralizeNowikiTags(source) {
            var CLOSELENGTH, OPENLENGTH, i, len, maskLength, maskString, maskedText, prevId, tag, tags;

            OPENLENGTH = 8;
            CLOSELENGTH = 9;
            tags = Str.findSimpleEnclosures(source, /<nowiki>/i, OPENLENGTH, /<\/nowiki>/i, CLOSELENGTH);
            maskedText = "";
            prevId = 0;
            for (i = 0, len = tags.length; i < len; i++) {
              tag = tags[i];
              if (tag[1]) {
                maskLength = tag[1] - tag[0] + CLOSELENGTH;
                maskString = Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = tag[1] + CLOSELENGTH;
                continue;
              } else {
                maskLength = source.substr(tag[0]).length;
                maskString = Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = source.length;
                break;
              }
            }
            maskedText += source.substring(prevId);
            return maskedText;
          }
        }, {
          key: "dotEncode",
          value: function dotEncode(text) {
            return encodeURIComponent(text).replace(/%/g, ".");
          }
        }, {
          key: "dotEncodeLinkBreakingFragmentCharacters",
          value: function dotEncodeLinkBreakingFragmentCharacters(fragment) {
            fragment = fragment.replace(/\[/g, ".5B");
            fragment = fragment.replace(/\]/g, ".5D");
            fragment = fragment.replace(/\{/g, ".7B");
            fragment = fragment.replace(/\}/g, ".7D");
            fragment = fragment.replace(/\|/g, ".7C");
            return fragment;
          }
        }, {
          key: "compareArticleTitles",
          value: function compareArticleTitles(title1, title2) {
            var t1, t2;

            t1 = prepareTitleCasing(this.squashContiguousWhitespace(title1).trim());
            t2 = prepareTitleCasing(this.squashContiguousWhitespace(title2).trim());
            return t1 === t2;
          }
        }, {
          key: "findBehaviorSwitches",
          value: function findBehaviorSwitches(source, word) {
            var regExp;
            source = this.neutralizeNowikiTags(source);
            regExp;
            if (word) {
              regExp = new RegExp("__" + RegEx.escapePattern(word) + "__", "gi");
            } else {
              regExp = new RegExp("__(TOC|NOTOC|FORCETOC|NOEDITSECTION|" + "NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|" + "NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|" + "NOINDEX|STATICREDIRECT|START|END)__", "gi");
            }
            return RegEx.matchAll(source, regExp);
          }
        }, {
          key: "findLinksEngine",
          value: function findLinksEngine(source, titlePattern, specialOnly, caseSensitive) {
            var dbrace, dbraces, flags, i, inText, len, links, maskedText, match, nSource, nText, push, regExp, special;

            flags = caseSensitive ? "" : "i";

            special = specialOnly ? "(?:[ _]+:)?[ _]*" : "(?:\\:?[ _]*){0,2}";
            regExp = new RegExp("^" + special + "(" + titlePattern + ")" + "[ _]*(?:\\|[_\\s]*([\\s\\S]+?)[_\\s]*)?[_\\s]*$", flags);
            nSource = this.neutralizeNowikiTags(source);
            links = [];
            dbraces = Str.findInnermostEnclosures(nSource, "[[", "]]");
            for (i = 0, len = dbraces.length; i < len; i++) {
              dbrace = dbraces[i];
              inText = source.substring(dbrace[0] + 2, dbrace[1]);
              match = regExp.exec(inText);
              if (match) {
                push = true;
                if (match[6]) {
                  nText = this.neutralizeNowikiTags(match[6]);
                  maskedText = Str.findNestedEnclosures(nText, "{{", "}}", "x")[1];
                  if (maskedText.search(/(\{\{|\}\})/) > -1) {
                    this.WM.Log.logWarning("[[" + match[0] + "]] seems to contain part of a template, and the resulting behaviour cannot be predicted by this function, so the link will be ignored altogether");
                    push = false;
                  }
                }
                if (push) {
                  links.push({
                    "rawLink": "[[" + match[0] + "]]",
                    "link": match[1],
                    "rawTitle": match[2],
                    "namespace": match[3],
                    "title": match[4],
                    "fragment": match[5],
                    "anchor": match[6],
                    "index": dbrace[0],
                    "length": dbrace[1] + 2 - dbrace[0]
                  });
                }
              }
            }
            return links;
          }
        }, {
          key: "findSectionLinks",
          value: function findSectionLinks(source) {
            var fragmentChars, titlePattern;

            fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
            titlePattern = "(()())#(" + fragmentChars + ")";
            return this.findLinksEngine(source, titlePattern, false, true);
          }
        }, {
          key: "findInternalLinks",
          value: function findInternalLinks(source, namespace, title) {
            var caseSensitive, fragmentChars, namespaceChars, rens, retitle, titleChars, titlePattern;

            namespaceChars = "[^\\n\\{\\}\\[\\]\\|\\:\\#]+?";
            titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
            fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
            if (namespace) {
              rens = prepareRegexpWhitespace(RegEx.escapePattern(namespace));
              if (title) {
                retitle = prepareRegexpWhitespace(RegEx.escapePattern(title));
                titlePattern = "((" + rens + ")[ _]*:[ _]*" + "(" + retitle + "))" + "(?:[ _]*#(" + fragmentChars + "))?";

                caseSensitive = true;
              } else {
                titlePattern = "((" + rens + ")[ _]*:[ _]*" + "(" + titleChars + "))" + "(?:[ _]*#(" + fragmentChars + "))?";

                caseSensitive = false;
              }
            } else if (title) {
              retitle = prepareRegexpWhitespace(RegEx.escapePattern(title));

              titlePattern = "(()(" + retitle + "))" + "(?:[ _]*#(" + fragmentChars + "))?";

              caseSensitive = true;
            } else {
              titlePattern = "((?:(" + namespaceChars + ")[ _]*:[ _]*)?" + "(" + titleChars + "))" + "(?:[ _]*#(" + fragmentChars + "))?";
              caseSensitive = true;
            }
            return this.findLinksEngine(source, titlePattern, false, caseSensitive);
          }
        }, {
          key: "findInterwikiLinks",
          value: function findInterwikiLinks(source, wiki) {
            return this.findInternalLinks(source, wiki);
          }
        }, {
          key: "findSpecialLinks",
          value: function findSpecialLinks(source, pattern) {
            var fragmentChars, titleChars, titlePattern;

            titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
            fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
            titlePattern = "((" + pattern + ")[ _]*:[ _]*" + "(" + titleChars + "))" + "(?:[ _]*#(" + fragmentChars + "))?";

            return this.findLinksEngine(source, titlePattern, true, false);
          }
        }, {
          key: "findCategories",
          value: function findCategories(source) {
            return this.findSpecialLinks(source, "Category");
          }
        }, {
          key: "findInterlanguageLinks",
          value: function findInterlanguageLinks(source, language) {
            return this.findSpecialLinks(source, RegEx.escapePattern(language));
          }
        }, {
          key: "findVariables",
          value: function findVariables(source, variable) {
            var pattern;

            pattern = RegEx.escapePattern(variable);
            return this.findVariablesPattern(source, pattern);
          }
        }, {
          key: "findVariablesPattern",
          value: function findVariablesPattern(source, pattern) {
            var dbracket, dbrackets, i, inText, len, match, nSource, regExp, results;

            nSource = this.neutralizeNowikiTags(source);
            results = [];
            dbrackets = Str.findNestedEnclosures(nSource, "{{", "}}", "x")[0];
            for (i = 0, len = dbrackets.length; i < len; i++) {
              dbracket = dbrackets[i];
              inText = source.substring(dbracket[0] + 2, dbracket[1]);

              regExp = new RegExp("^\\s*(" + pattern + ")" + "(?:\\:\\s*([\\s\\S]*?))?\\s*$", "");
              match = regExp.exec(inText);
              if (match) {
                results.push({
                  "rawVariable": "{{" + match[0] + "}}",
                  "name": match[1],
                  "value": match[2],
                  "index": dbracket[0],
                  "length": dbracket[1] + 2 - dbracket[0]
                });
              }
            }
            return results;
          }
        }, {
          key: "findTransclusionsEngine",
          value: function findTransclusionsEngine(source, pattern, templatesOnly) {
            var argIndex, dbracket, dbrackets, i, inText, len, match, nSource, regExp, transclusions;

            regExp = new RegExp("^(\\s*" + (templatesOnly ? "" : ":?") + "[_ ]*(" + pattern + ")[_ ]*\\s*)" + "(?:\\|([\\s\\S]*))?$", "");
            nSource = this.neutralizeNowikiTags(source);
            transclusions = [];
            dbrackets = Str.findNestedEnclosures(nSource, "{{", "}}", "x")[0];
            for (i = 0, len = dbrackets.length; i < len; i++) {
              dbracket = dbrackets[i];
              inText = source.substring(dbracket[0] + 2, dbracket[1]);
              match = regExp.exec(inText);
              if (match) {
                argIndex = dbracket[0] + match[1].length + 3;
                transclusions.push({
                  "rawTransclusion": "{{" + match[0] + "}}",
                  "title": match[2],
                  "index": dbracket[0],
                  "length": dbracket[1] - dbracket[0] + 2,
                  "arguments": this.findTransclusionArguments(match, argIndex)
                });
              }
            }
            return transclusions;
          }
        }, {
          key: "findTransclusionArguments",
          value: function findTransclusionArguments(match, argIndex) {
            var argL, args, argument, eqIndex, i, key, keyIndex, keyMatches, len, mArgs, mArgument, maskedArgs, nArgs, rawArguments, rawKey, reKey, relIndex, value, valueIndex;
            rawArguments = match[3];
            args = [];
            if (rawArguments) {
              nArgs = this.neutralizeNowikiTags(rawArguments);

              maskedArgs = Str.findNestedEnclosures(nArgs, "[[", "]]", "x")[1];

              maskedArgs = Str.findNestedEnclosures(maskedArgs, "{{", "}}", "x")[1];

              if (maskedArgs.search(/(\{\{|\}\}|\[\[|\]\])/) > -1) {
                this.WM.Log.logWarning("{{" + match[0] + "}} seems to contain part of a link or template, and the resulting behaviour cannot be predicted by this function, so the whole template will be ignored altogether");
              } else {
                mArgs = maskedArgs.split("|");
                relIndex = 0;
                for (i = 0, len = mArgs.length; i < len; i++) {
                  mArgument = mArgs[i];
                  argL = mArgument.length;
                  argument = rawArguments.substr(relIndex, argL);
                  eqIndex = mArgument.indexOf("=");

                  if (eqIndex > 0) {
                    rawKey = argument.substring(0, eqIndex);
                    reKey = /^(\s*)(.+?)\s*$/;
                    keyMatches = reKey.exec(rawKey);
                    key = keyMatches[2];
                    keyIndex = argIndex + (keyMatches[1] ? keyMatches[1].length : 0);

                    value = argument.substr(eqIndex + 1);
                    valueIndex = argIndex + keyMatches[0].length + 1;
                  } else {
                    key = null;
                    keyIndex = null;
                    value = argument;
                    valueIndex = argIndex;
                  }
                  args.push({
                    key: key,
                    key_index: keyIndex,
                    value: value,
                    value_index: valueIndex
                  });

                  relIndex += argL + 1;
                }
              }
            }
            return args;
          }
        }, {
          key: "findTemplates",
          value: function findTemplates(source, template) {
            var pattern;
            if (template) {
              pattern = RegEx.escapePattern(template);
              pattern = prepareRegexpWhitespace(pattern);
              pattern = prepareTitleCasing(pattern);
            } else {
              pattern = "[^\\n\\{\\}\\[\\]\\||\\#]+?";
            }
            return this.findTemplatesPattern(source, pattern);
          }
        }, {
          key: "findTemplatesPattern",
          value: function findTemplatesPattern(source, pattern) {
            return this.findTransclusionsEngine(source, pattern, true);
          }
        }, {
          key: "findTransclusions",
          value: function findTransclusions(source, namespace, title) {
            var namespacePattern, pattern, titleChars, titlePattern;

            titleChars = "[^\\n\\{\\}\\[\\]\\||\\#]+?";
            if (namespace) {
              namespacePattern = RegEx.escapePattern(namespace);
              namespacePattern = prepareRegexpWhitespace(namespacePattern);
              namespacePattern = prepareTitleCasing(namespacePattern);
            }
            if (title) {
              titlePattern = RegEx.escapePattern(title);
              titlePattern = prepareRegexpWhitespace(titlePattern);
              titlePattern = prepareTitleCasing(titlePattern);
            }
            if (namespacePattern && titlePattern) {
              pattern = namespacePattern + "[ _]*:[ _]*" + titlePattern;
            } else if (!namespacePattern && titlePattern) {
              pattern = titlePattern;
            } else if (namespacePattern && !titlePattern) {
              pattern = namespacePattern + "[ _]*:" + titleChars;
            } else {
              pattern = titleChars;
            }
            return this.findTransclusionsEngine(source, pattern, false);
          }
        }, {
          key: "findSectionHeadings",
          value: function findSectionHeadings(source) {
            var L0, L1, MAXLEVEL, cleanheading, end, heading, i, len, level, line, match, maxTocLevel, minLevel, pLevel, prevLevels, rawheading, regExp, sections, start, tocLevel, tocPeer;

            MAXLEVEL = 6;
            sections = [];
            minLevel = MAXLEVEL;
            maxTocLevel = 0;
            tocLevel = 1;
            regExp = /^(\=+([ _]*(.+?)[ _]*)\=+)[ \t]*$/gm;
            while (true) {
              match = regExp.exec(source);
              if (match) {
                L0 = match[0].length;
                line = match[1];
                rawheading = match[2];
                heading = match[3];
                cleanheading = this.squashContiguousWhitespace(heading);
                L1 = line.length;
                level = 1;
                start = "=";
                end = "=";

                while (true) {
                  start = line.substr(level, 1);
                  end = line.substr(L1 - level - 1, 1);
                  if (L1 - level * 2 > 2 && start === "=" && end === "=") {
                    level++;
                  } else {
                    if (level > MAXLEVEL) {
                      level = MAXLEVEL;
                    } else if (level < minLevel) {
                      minLevel = level;
                    }
                    break;
                  }
                }
                if (level === minLevel) {
                  tocLevel = 1;
                  prevLevels = {};
                  prevLevels[level] = 1;
                  prevLevels.relMax = level;
                  if (maxTocLevel === 0) {
                    maxTocLevel = tocLevel;
                  }
                } else if (level > prevLevels.relMax) {
                  tocLevel++;
                  prevLevels[level] = tocLevel;
                  prevLevels.relMax = level;
                  if (tocLevel > maxTocLevel) {
                    maxTocLevel = tocLevel;
                  }
                } else if (level < prevLevels.relMax) {
                  if (prevLevels[level]) {
                    tocLevel = prevLevels[level];
                  } else {
                    tocPeer = prevLevels.relMax;
                    for (i = 0, len = prevLevels.length; i < len; i++) {
                      pLevel = prevLevels[i];
                      if (pLevel > level && pLevel < tocPeer) {
                        tocPeer = pLevel;
                      }
                    }
                    tocLevel = prevLevels[tocPeer];
                    prevLevels[level] = tocLevel;
                  }
                  prevLevels.relMax = level;
                }
                sections.push({
                  line: line,
                  rawheading: rawheading,
                  heading: heading,
                  cleanheading: cleanheading,
                  level: level,
                  tocLevel: tocLevel,
                  index: regExp.lastIndex - L0,
                  length0: L0,
                  length1: L1
                });
              } else {
                break;
              }
            }

            if (maxTocLevel === 0) {
              minLevel = 0;
            }
            return {
              sections: sections,
              minLevel: minLevel,
              maxTocLevel: maxTocLevel
            };
          }
        }]);

        return Parser;
      }();

      ;

      prepareRegexpWhitespace = function prepareRegexpWhitespace(title) {
        return title.replace(/[_ ]+/g, "[_ ]+");
      };

      prepareTitleCasing = function prepareTitleCasing(pattern) {
        var fcLower, fcUpper, firstChar;
        firstChar = pattern.charAt(0);
        fcUpper = firstChar.toUpperCase();
        fcLower = firstChar.toLowerCase();
        if (fcUpper !== fcLower) {
          pattern = "[" + fcUpper + fcLower + "]" + pattern.substr(1);
        }
        return pattern;
      };

      return Parser;
    }();
  }, { "../../lib.js.generic/dist/RegEx": 36, "../../lib.js.generic/dist/Str": 37 }], 17: [function (require, module, exports) {
    var Str;

    Str = require('../../lib.js.generic/dist/Str');

    module.exports.Tables = function () {
      function Tables(WM) {
        _classCallCheck(this, Tables);

        this.WM = WM;
        null;
      }

      _createClass(Tables, [{
        key: "appendRow",
        value: function appendRow(source, mark, values) {
          var endtable, lastId, newText, row;
          lastId = source.lastIndexOf('|}' + mark);
          endtable = lastId > -1 ? lastId : source.lastIndexOf('|}');
          row = "|-\n|" + values.join("\n|") + "\n";
          newText = Str.insert(source, row, endtable);
          return newText;
        }
      }]);

      return Tables;
    }();
  }, { "../../lib.js.generic/dist/Str": 37 }], 18: [function (require, module, exports) {
    var CSS, RegEx;

    CSS = require('../../lib.js.generic/dist/CSS');

    RegEx = require('../../lib.js.generic/dist/RegEx');

    module.exports.UI = function () {
      function UI(WM) {
        _classCallCheck(this, UI);

        this.WM = WM;
        null;
      }

      _createClass(UI, [{
        key: "_makeUI",
        value: function _makeUI() {
          var UI, conf, date, display, displayLog, help, hide, legend, logArea, main, main2, nextNode, patt1A, patt1B, patt2A, patt2B, patt3A, patt3B, patt4A, patt4B, patt5A, patt5B, wikiUrls;
          display = true;
          displayLog = true;
          this.WM.Mods.applyGeneralMods();
          if (document.getElementById('editform')) {
            nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            conf = this.WM.Cfg._getEditorPlugins();
            UI = conf ? this.WM.Menu._makeUI(conf) : null;
            this.WM.Mods.applyEditorMods();
          } else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            conf = this.WM.Cfg._getDiffPlugins();
            UI = conf ? this.WM.Menu._makeUI(conf) : null;
          } else if (document.getElementById('mw-subcategories') || document.getElementById('mw-pages')) {
            nextNode = document.getElementById('bodyContent');
            conf = this.WM.Cfg._getBotPlugins();
            UI = conf ? this.WM.Bot._makeUI(conf, [[document.getElementById('mw-pages'), 0, "Pages"], [document.getElementById('mw-subcategories'), 0, "Subcategories"]]) : null;
            display = false;
          } else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('form')[0].nextSibling;
            conf = this.WM.Cfg._getBotPlugins();
            UI = conf ? this.WM.Bot._makeUI(conf, [[document.getElementById('mw-whatlinkshere-list'), 0, "Pages"]]) : null;
            display = false;
          } else if (document.body.classList.contains('mw-special-LinkSearch') && document.getElementById('bodyContent').getElementsByTagName('ol')[0]) {
            nextNode = document.getElementsByClassName('mw-spcontent')[0];
            conf = this.WM.Cfg._getBotPlugins();
            UI = conf ? this.WM.Bot._makeUI(conf, [[document.getElementById('bodyContent').getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
            display = false;
          } else if (document.getElementById('mw-prefixindex-list-table')) {
            nextNode = document.getElementById('mw-prefixindex-list-table');
            conf = this.WM.Cfg._getBotPlugins();
            UI = conf ? this.WM.Bot._makeUI(conf, [[nextNode.getElementsByTagName('tbody')[0], 0, "Pages"]]) : null;
            display = false;
          } else if (document.getElementById('mw-prefs-form')) {
            this.WM.Cfg._makeUI();
          } else {
            wikiUrls = this.WM.MW.getWikiUrls();
            patt1A = new RegExp(RegEx.escapePattern(wikiUrls.full) + "\?.*?" + "title\\=Special(\\:|%3[Aa])SpecialPages", '');
            patt1B = new RegExp(RegEx.escapePattern(wikiUrls.short) + "Special(\\:|%3[Aa])SpecialPages", '');
            patt2A = new RegExp(RegEx.escapePattern(wikiUrls.full) + "\?.*?" + "title\\=Special(\\:|%3[Aa])RecentChanges", '');
            patt2B = new RegExp(RegEx.escapePattern(wikiUrls.short) + "Special(\\:|%3[Aa])RecentChanges", '');
            patt3A = new RegExp(RegEx.escapePattern(wikiUrls.full) + "\?.*?" + "title\\=Special(\\:|%3[Aa])NewPages", '');
            patt3B = new RegExp(RegEx.escapePattern(wikiUrls.short) + "Special(\\:|%3[Aa])NewPages", '');
            patt4A = new RegExp(RegEx.escapePattern(wikiUrls.full) + "\?.*?" + "title\\=Special(\\:|%3[Aa])ProtectedPages", '');
            patt4B = new RegExp(RegEx.escapePattern(wikiUrls.short) + "Special(\\:|%3[Aa])ProtectedPages", '');
            patt5A = new RegExp(RegEx.escapePattern(wikiUrls.full) + "\?.*?" + "title\\=Special(\\:|%3[Aa])Contributions", '');
            patt5B = new RegExp(RegEx.escapePattern(wikiUrls.short) + "Special(\\:|%3[Aa])Contributions", '');
            if (location.href.search(patt1A) > -1 || location.href.search(patt1B) > -1) {
              nextNode = document.getElementById('bodyContent');
              conf = this.WM.Cfg._getSpecialPlugins();
              UI = conf ? this.WM.Menu._makeUI(conf) : null;
            } else if (location.href.search(patt2A) > -1 || location.href.search(patt2B) > -1) {
              nextNode = document.getElementById('mw-content-text').getElementsByTagName('h4')[0];
              conf = this.WM.Cfg._getRecentChangesPlugins();
              UI = conf ? this.WM.Filters._makeUI(conf) : null;
              displayLog = false;
              this.WM.Mods.applyRecentChangesMods();
            } else if (location.href.search(patt3A) > -1 || location.href.search(patt3B) > -1) {
              nextNode = document.getElementById('mw-content-text').getElementsByTagName('ul')[0];
              conf = this.WM.Cfg._getNewPagesPlugins();
              UI = conf ? this.WM.Filters._makeUI(conf) : null;
              displayLog = false;
            } else if (location.href.search(patt4A) > -1 || location.href.search(patt4B) > -1) {
              nextNode = document.getElementById('mw-content-text').getElementsByTagName('ul')[0];
              conf = this.WM.Cfg._getBotPlugins();
              UI = conf ? this.WM.Bot._makeUI(conf, [[document.getElementById('mw-content-text').getElementsByTagName('ul')[0], 0, "Pages"]]) : null;
              display = false;
            } else if (location.href.search(patt5A) > -1 || location.href.search(patt5B) > -1) {
              this.WM.Mods.applyContributionsMods();
            } else if (document.getElementsByClassName('mw-spcontent').length > 0) {
              nextNode = document.getElementsByClassName('mw-spcontent')[0];
              conf = this.WM.Cfg._getBotPlugins();
              UI = conf ? this.WM.Bot._makeUI(conf, [[nextNode.getElementsByTagName('ol')[0], 0, "Pages"]]) : null;
              display = false;
            } else if (document.getElementsByClassName('mw-allpages-table-chunk').length > 0) {
              nextNode = document.getElementsByClassName('mw-allpages-table-chunk')[0];
              conf = this.WM.Cfg._getBotPlugins();
              UI = conf ? this.WM.Bot._makeUI(conf, [[nextNode.getElementsByTagName('tbody')[0], 0, "Pages"]]) : null;
              display = false;
            }
          }
          if (UI) {
            CSS.addStyleElement("#WikiMonkey {position:relative;} #WikiMonkey fieldset {margin:0 0 1em 0;}");
            main = document.createElement('fieldset');
            main.id = 'WikiMonkey';
            legend = document.createElement('legend');
            legend.appendChild(document.createTextNode('Wiki Monkey '));
            hide = document.createElement('a');
            hide.href = '#WikiMonkey';
            hide.innerHTML = '[hide]';
            hide.addEventListener("click", function () {
              var wmmain;
              wmmain = document.getElementById('WikiMonkeyMain');
              if (wmmain.style.display === 'none') {
                wmmain.style.display = 'block';
                this.innerHTML = '[hide]';
              } else {
                wmmain.style.display = 'none';
                this.innerHTML = '[show]';
              }
              return false;
            }, false);
            legend.appendChild(hide);
            legend.appendChild(document.createTextNode(' '));
            conf = document.createElement('a');
            conf.href = this.WM.MW.getWikiPaths().short + 'Special:Preferences#wiki-monkey';
            conf.innerHTML = '[conf]';
            legend.appendChild(conf);
            legend.appendChild(document.createTextNode(' '));
            help = document.createElement('a');
            help.href = 'https://github.com/kynikos/wiki-monkey/wiki';
            help.innerHTML = '[help]';
            legend.appendChild(help);
            main.appendChild(legend);
            main2 = document.createElement('div');
            main2.id = 'WikiMonkeyMain';
            main2.appendChild(UI);
            logArea = this.WM.Log._makeLogArea();
            if (!displayLog) {
              logArea.style.display = 'none';
            }
            main2.appendChild(logArea);
            if (!display) {
              main2.style.display = 'none';
              hide.innerHTML = '[show]';
            }
            main.appendChild(main2);
            nextNode.parentNode.insertBefore(main, nextNode);
            this.WM.Log.logHidden('Wiki Monkey version: ' + GM_info.script.version);
            date = new Date();
            this.WM.Log.logHidden('Date: ' + date.toString());
            return this.WM.Log.logHidden('URL: ' + location.href);
          }
        }
      }]);

      return UI;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31, "../../lib.js.generic/dist/RegEx": 36 }], 19: [function (require, module, exports) {
    module.exports.WhatLinksHere = function () {
      function WhatLinksHere(WM) {
        _classCallCheck(this, WhatLinksHere);

        this.WM = WM;
        null;
      }

      _createClass(WhatLinksHere, [{
        key: "isWhatLinksHerePage",
        value: function isWhatLinksHerePage() {
          if (document.getElementById('mw-whatlinkshere-list')) {
            return true;
          } else {
            return false;
          }
        }
      }, {
        key: "getTitle",
        value: function getTitle() {
          return document.getElementById('contentSub').getElementsByTagName('a')[0].title;
        }
      }]);

      return WhatLinksHere;
    }();
  }, {}], 20: [function (require, module, exports) {
    var ArchPackages_, ArchWiki_, Bot_, Cat_, Cfg_, Diff_, Editor_, Filters_, Interlanguage_, Log_, MW_, Menu_, Mods_, Parser_, Tables_, UI_, WhatLinksHere_;

    ArchPackages_ = require('./ArchPackages').ArchPackages;

    ArchWiki_ = require('./ArchWiki').ArchWiki;

    Bot_ = require('./Bot').Bot;

    Cat_ = require('./Cat').Cat;

    Cfg_ = require('./Cfg').Cfg;

    Diff_ = require('./Diff').Diff;

    Editor_ = require('./Editor').Editor;

    Filters_ = require('./Filters').Filters;

    Interlanguage_ = require('./Interlanguage').Interlanguage;

    Log_ = require('./Log').Log;

    Menu_ = require('./Menu').Menu;

    Mods_ = require('./Mods').Mods;

    MW_ = require('./MW').MW;

    Parser_ = require('./Parser').Parser;

    Tables_ = require('./Tables').Tables;

    UI_ = require('./UI').UI;

    WhatLinksHere_ = require('./WhatLinksHere').WhatLinksHere;

    module.exports.WM = function () {
      function WM() {
        _classCallCheck(this, WM);

        var Plugin, i, len, pname;
        this.ArchPackages = new ArchPackages_(this);
        this.ArchWiki = new ArchWiki_(this);
        this.Bot = new Bot_(this);
        this.Cat = new Cat_(this);
        this.Cfg = new Cfg_(this);
        this.Diff = new Diff_(this);
        this.Editor = new Editor_(this);
        this.Filters = new Filters_(this);
        this.Interlanguage = new Interlanguage_(this);
        this.Log = new Log_(this);
        this.Menu = new Menu_(this);
        this.Mods = new Mods_(this);
        this.MW = new MW_(this);
        this.Parser = new Parser_(this);
        this.Tables = new Tables_(this);
        this.UI = new UI_(this);
        this.WhatLinksHere = new WhatLinksHere_(this);
        this.Plugins = {};

        for (var _len = arguments.length, installedPlugins = Array(_len), _key = 0; _key < _len; _key++) {
          installedPlugins[_key] = arguments[_key];
        }

        for (i = 0, len = installedPlugins.length; i < len; i++) {
          var _installedPlugins$i = _slicedToArray(installedPlugins[i], 2);

          pname = _installedPlugins$i[0];
          Plugin = _installedPlugins$i[1];

          this.Plugins[pname] = new Plugin(this);
        }
      }

      _createClass(WM, [{
        key: "main",
        value: function main(defaultConfig) {
          this.Cfg._load(defaultConfig);
          return this.UI._makeUI();
        }
      }]);

      return WM;
    }();
  }, { "./ArchPackages": 3, "./ArchWiki": 4, "./Bot": 5, "./Cat": 6, "./Cfg": 7, "./Diff": 8, "./Editor": 9, "./Filters": 10, "./Interlanguage": 11, "./Log": 12, "./MW": 13, "./Menu": 14, "./Mods": 15, "./Parser": 16, "./Tables": 17, "./UI": 18, "./WhatLinksHere": 19 }], 21: [function (require, module, exports) {
    module.exports.ExpandContractions = function () {
      function ExpandContractions(WM) {
        _classCallCheck(this, ExpandContractions);

        this.WM = WM;
      }

      _createClass(ExpandContractions, [{
        key: "replace",
        value: function replace(source, regExp, newString, checkString, checkStrings) {
          var newtext;
          newtext = source.replace(regExp, newString);
          if (checkStrings.length > 1 && newtext !== source) {
            this.WM.Log.logWarning("Replaced some \"" + checkString + "\" with \"" + checkStrings[0] + "\": check that it didn't mean \"" + checkStrings.slice(1).join('\" or \"') + "\" instead");
          }
          return newtext;
        }
      }, {
        key: "main",
        value: function main(args, callNext) {
          var newtext, source, ss;
          source = this.WM.Editor.readSource();
          newtext = source;

          newtext = this.replace(newtext, /([a-z])'re/ig, '$1 are', "'re", ["are"]);
          newtext = this.replace(newtext, /([a-z])'ve/ig, '$1 have', "'ve", ["have"]);
          newtext = this.replace(newtext, /([a-z])'ll/ig, '$1 will', "'ll", ["will", "shall"]);
          newtext = this.replace(newtext, /([a-z])'d/ig, '$1 would', "'d", ["would", "had"]);
          newtext = this.replace(newtext, /(c)an't/ig, '$1annot', "can't", ["cannot"]);
          newtext = this.replace(newtext, /(w)on't/ig, '$1ill not', "won't", ["will not"]);
          newtext = this.replace(newtext, /([a-z])n't/ig, '$1 not', "n't", ["not"]);
          newtext = this.replace(newtext, /(here|there)'s/ig, '$1 is', "here/there's", ["here/there is", "here/there has"]);
          newtext = this.replace(newtext, /(g)onna/ig, '$1oing to', "gonna", ["going to"]);

          newtext = this.replace(newtext, /([a-z])'s (been)/ig, '$1 has $2', "'s been", ["has been"]);
          newtext = this.replace(newtext, /(let)'s/ig, '$1 us', "let's", ["let us"]);
          newtext = this.replace(newtext, /(it)'(s own)/ig, '$1$2', "it's own", ["its own"]);
          ss = newtext.match(/[a-z]'s/gi);
          if (ss) {
            this.WM.Log.logWarning("Found " + ss.length + " instances of \"'s\": " + "check if they can be replaced with \"is\", \"has\", ...");
          }
          if (newtext !== source) {
            this.WM.Editor.writeSource(newtext);
            this.WM.Log.logInfo("Expanded contractions");
          }
          if (callNext) {
            return callNext();
          }
        }
      }]);

      return ExpandContractions;
    }();
  }, {}], 22: [function (require, module, exports) {
    var CSS;

    CSS = require('../../lib.js.generic/dist/CSS');

    module.exports.FixBacklinkFragments = function () {
      var readTarget;

      var FixBacklinkFragments = function () {
        function FixBacklinkFragments(WM) {
          _classCallCheck(this, FixBacklinkFragments);

          this.makeBotUI = this.makeBotUI.bind(this);
          this.fixLinks = this.fixLinks.bind(this);
          this.fixArchWikiLinks = this.fixArchWikiLinks.bind(this);
          this.fixArchWikiLink = this.fixArchWikiLink.bind(this);
          this.fixFragment = this.fixFragment.bind(this);
          this.mainAutoFindSections = this.mainAutoFindSections.bind(this);
          this.mainAutoRead = this.mainAutoRead.bind(this);
          this.mainAutoWrite = this.mainAutoWrite.bind(this);
          this.mainAutoEnd = this.mainAutoEnd.bind(this);
          this.WM = WM;
        }

        _createClass(FixBacklinkFragments, [{
          key: "makeBotUI",
          value: function makeBotUI(args) {
            var divMain, label, target;
            CSS.addStyleElement("#WikiMonkey-FixBacklinkFragments " + "input[type='text'] {margin-left:0.33em;}");
            divMain = document.createElement('div');
            divMain.id = "WikiMonkey-FixBacklinkFragments";
            label = document.createElement('span');
            label.innerHTML = 'Target page:';
            divMain.appendChild(label);
            target = document.createElement('input');
            target.setAttribute('type', 'text');
            target.id = "WikiMonkey-FixBacklinkFragments-Target";
            if (this.WM.WhatLinksHere.isWhatLinksHerePage()) {
              target.value = this.WM.WhatLinksHere.getTitle();
            }
            divMain.appendChild(target);
            return divMain;
          }
        }, {
          key: "fixLinks",
          value: function fixLinks(source, target, sections) {
            var fixedFragment, i, len, link, links, newText, newlink, oldlink, prevId, rawfragment;

            links = this.WM.Parser.findInternalLinks(source, null, target);
            newText = "";
            prevId = 0;
            for (i = 0, len = links.length; i < len; i++) {
              link = links[i];
              newText += source.substring(prevId, link.index);
              newlink = link.rawLink;
              rawfragment = link.fragment;
              if (rawfragment) {
                fixedFragment = this.fixFragment(rawfragment, sections);
                if (fixedFragment === true) {
                  null;
                } else if (fixedFragment) {
                  oldlink = newlink;
                  newlink = "[[" + target + "#" + fixedFragment + (link.anchor ? "|" + link.anchor : "") + "]]";
                  this.WM.Log.logInfo("Fixed broken link fragment: " + oldlink + " -> " + this.WM.Log.linkToWikiPage(link.link, newlink));
                } else {
                  this.WM.Log.logWarning("Cannot fix broken link fragment: " + this.WM.Log.linkToWikiPage(link.link, newlink));
                }
              }
              newText += newlink;
              prevId = link.index + link.length;
            }
            newText += source.substr(prevId);

            if (location.hostname === 'wiki.archlinux.org') {
              newText = this.fixArchWikiLinks(newText, target, sections);
            }
            return newText;
          }
        }, {
          key: "fixArchWikiLinks",
          value: function fixArchWikiLinks(source, target, sections) {
            var i, j, len, len1, link, link2, links, links2, newText1, newText2, prevId;
            links = this.WM.Parser.findTemplates(source, 'Related');
            newText1 = "";
            prevId = 0;
            for (i = 0, len = links.length; i < len; i++) {
              link = links[i];
              newText1 += source.substring(prevId, link.index);
              newText1 += this.fixArchWikiLink(target, sections, link, 1);
              prevId = link.index + link.length;
            }
            newText1 += source.substr(prevId);
            links2 = this.WM.Parser.findTemplates(newText1, 'Related2');
            newText2 = "";
            prevId = 0;
            for (j = 0, len1 = links2.length; j < len1; j++) {
              link2 = links2[j];
              newText2 += newText1.substring(prevId, link2.index);
              newText2 += this.fixArchWikiLink(target, sections, link2, 2);
              prevId = link2.index + link2.length;
            }
            newText2 += newText1.substr(prevId);
            return newText2;
          }
        }, {
          key: "fixArchWikiLink",
          value: function fixArchWikiLink(target, sections, template, expectedArgs) {
            var anchor, args, fixedFragment, fragId, link, ltitle, newlink, rawfragment;
            args = template.arguments;

            if (args.length === expectedArgs) {
              link = args[0].value;
              fragId = link.indexOf('#');
              if (fragId > -1) {
                ltitle = link.substring(0, fragId);

                if (this.WM.Parser.compareArticleTitles(ltitle, target)) {
                  rawfragment = link.substr(fragId + 1);
                  fixedFragment = this.fixFragment(rawfragment, sections);
                  if (fixedFragment === true) {
                    null;
                  } else if (fixedFragment) {
                    anchor = args[1] ? "|" + args[1].value : "";
                    newlink = "{{" + template.title + "|" + target + "#" + fixedFragment + anchor + "}}";
                    this.WM.Log.logInfo("Fixed broken link fragment: " + template.rawTransclusion + " -> " + this.WM.Log.linkToWikiPage(link, newlink));
                    return newlink;
                  } else {
                    this.WM.Log.logWarning("Cannot fix broken link fragment: " + this.WM.Log.linkToWikiPage(link, template.rawTransclusion));
                  }
                }
              }
            } else {
              this.WM.Log.logWarning("Template:" + template.title + " must have " + expectedArgs + " and only " + expectedArgs + (expectedArgs > 1 ? " arguments: " : " argument: ") + template.rawTransclusion);
            }
            return template.rawTransclusion;
          }
        }, {
          key: "fixFragment",
          value: function fixFragment(rawfragment, sections) {
            var fragment, i, len, section;
            if (rawfragment) {
              fragment = this.WM.Parser.squashContiguousWhitespace(rawfragment).trim();
              if (sections.indexOf(fragment) < 0) {
                for (i = 0, len = sections.length; i < len; i++) {
                  section = sections[i];

                  if (section.toLowerCase() === fragment.toLowerCase()) {
                    return section;
                  }
                }
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          }
        }, {
          key: "mainAuto",
          value: function mainAuto(args, title, callBot, chainArgs) {
            var params, summary, target;
            summary = args;
            target = readTarget();
            this.WM.Log.logHidden("Target page: " + target);
            if (target) {
              if (chainArgs === null) {
                params = {
                  'action': 'parse',
                  'prop': 'sections',
                  'page': target,
                  'redirects': 1
                };
                this.WM.Log.logWarning("If some articles in the list are linking to the target article through a redirect, you should process the backlinks of that redirect page separately through its Special:WhatLinksHere page, as this plugin can only fix links that exactly match the title of the target article.\nIn order to save time you are advised to hide the redirects in the page lists that allow to do so.");
                return this.WM.MW.callAPIGet(params, this.mainAutoFindSections, [title, target, summary, callBot], null);
              } else {
                return this.mainAutoRead(target, chainArgs, title, summary, callBot);
              }
            } else {
              this.WM.Log.logError('The target page cannot be empty');
              return callBot(false, null);
            }
          }
        }, {
          key: "mainAutoFindSections",
          value: function mainAutoFindSections(res, args) {
            var callBot, i, len, ref, section, sections, summary, target, title;
            title = args[0];
            target = args[1];
            summary = args[2];
            callBot = args[3];
            sections = [];
            if (res.parse) {
              ref = res.parse.sections;
              for (i = 0, len = ref.length; i < len; i++) {
                section = ref[i];
                sections.push(this.WM.Parser.squashContiguousWhitespace(section.line).trim());
              }
              return this.mainAutoRead(target, sections, title, summary, callBot);
            } else {
              this.WM.Log.logError("The set target page, " + target + ", seems not to exist");
              if (res.error) {
                return callBot(res.error.code, sections);
              } else {
                return callBot(false, sections);
              }
            }
          }
        }, {
          key: "mainAutoRead",
          value: function mainAutoRead(target, sections, title, summary, callBot) {
            return this.WM.MW.callQueryEdit(title, this.mainAutoWrite, [target, summary, callBot, sections]);
          }
        }, {
          key: "mainAutoWrite",
          value: function mainAutoWrite(title, source, timestamp, edittoken, args) {
            var callBot, newtext, sections, summary, target;
            target = args[0];
            summary = args[1];
            callBot = args[2];
            sections = args[3];
            newtext = this.fixLinks(source, target, sections);
            if (newtext !== source) {
              return this.WM.MW.callAPIPost({
                action: "edit",
                bot: "1",
                title: title,
                summary: summary,
                text: newtext,
                basetimestamp: timestamp,
                token: edittoken
              }, this.mainAutoEnd, [callBot, sections], null);
            } else {
              return callBot(0, sections);
            }
          }
        }, {
          key: "mainAutoEnd",
          value: function mainAutoEnd(res, args) {
            var callBot, sections;
            callBot = args[0];
            sections = args[1];
            if (res.edit && res.edit.result === 'Success') {
              return callBot(1, sections);
            } else if (res.error) {
              this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
              return callBot(res.error.code, sections);
            } else {
              return callBot(false, sections);
            }
          }
        }]);

        return FixBacklinkFragments;
      }();

      ;

      readTarget = function readTarget() {
        return document.getElementById("WikiMonkey-FixBacklinkFragments-Target").value;
      };

      return FixBacklinkFragments;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31 }], 23: [function (require, module, exports) {
    var Str;

    Str = require('../../lib.js.generic/dist/Str');

    module.exports.FixDoubleRedirects = function () {
      function FixDoubleRedirects(WM) {
        _classCallCheck(this, FixDoubleRedirects);

        this.reverseResults = this.reverseResults.bind(this);
        this.iterateList = this.iterateList.bind(this);
        this.readMiddleRedirect = this.readMiddleRedirect.bind(this);
        this.processDoubleRedirect = this.processDoubleRedirect.bind(this);
        this.processDoubleRedirectEnd = this.processDoubleRedirectEnd.bind(this);
        this.WM = WM;
        null;
      }

      _createClass(FixDoubleRedirects, [{
        key: "main",
        value: function main(args, callNext) {
          var summary;
          summary = args;
          this.WM.Log.logInfo("Fixing double redirects ...");
          return this.WM.MW.getSpecialList("DoubleRedirects", "namespaces", this.reverseResults, [summary, callNext]);
        }
      }, {
        key: "reverseResults",
        value: function reverseResults(results, siteinfo, args) {
          var callNext, namespaces, summary;
          summary = args[0];
          callNext = args[1];
          namespaces = siteinfo.namespaces;
          results.reverse();
          return this.iterateList(results, namespaces, [summary, callNext]);
        }
      }, {
        key: "iterateList",
        value: function iterateList(doubleRedirects, namespaces, args) {
          var callNext, doubleRedirect, summary;
          summary = args[0];
          callNext = args[1];
          doubleRedirect = doubleRedirects.pop();
          if (doubleRedirect) {
            return this.WM.MW.callQueryEdit(doubleRedirect.title, this.readMiddleRedirect, [doubleRedirect, doubleRedirects, namespaces, summary, callNext]);
          } else {
            this.WM.Log.logInfo("Fixed double redirects");
            if (callNext) {
              return callNext();
            }
          }
        }
      }, {
        key: "readMiddleRedirect",
        value: function readMiddleRedirect(doubleRedirectTitle, doubleRedirectSource, timestamp, edittoken, args) {
          var callNext, doubleRedirect, doubleRedirects, middleRedirectTitle, namespaces, summary;
          doubleRedirect = args[0];
          doubleRedirects = args[1];
          namespaces = args[2];
          summary = args[3];
          callNext = args[4];
          middleRedirectTitle = namespaces[doubleRedirect.databaseResult.nsb]['*'] + ':' + doubleRedirect.databaseResult.tb;
          return this.WM.MW.callQuery({
            prop: "revisions",
            rvprop: "content",
            titles: middleRedirectTitle
          }, this.processDoubleRedirect, [doubleRedirect, doubleRedirectTitle, doubleRedirectSource, timestamp, edittoken, doubleRedirects, namespaces, summary, callNext], null);
        }
      }, {
        key: "processDoubleRedirect",
        value: function processDoubleRedirect(middleRedirect, args) {
          var callNext, doubleRedirect, doubleRedirectSource, doubleRedirectTitle, doubleRedirects, edittoken, middleRedirectSource, middleTarget, namespaces, newTarget, newTargetAltAnchor, newTargetFragment, newTargetInterlanguage, newTargetNamespace, newTargetTitle, newText, oldTarget, rawMiddleTarget, rawOldTarget, summary, timestamp;
          middleRedirectSource = middleRedirect.revisions[0]["*"];
          doubleRedirect = args[0];
          doubleRedirectTitle = args[1];
          doubleRedirectSource = args[2];
          timestamp = args[3];
          edittoken = args[4];
          doubleRedirects = args[5];
          namespaces = args[6];
          summary = args[7];
          callNext = args[8];
          this.WM.Log.logInfo("Processing " + this.WM.Log.linkToWikiPage(doubleRedirectTitle, doubleRedirectTitle) + " ...");
          rawOldTarget = doubleRedirectSource.match(/\s*#redirect\s*[^\n]+/i);
          oldTarget = this.WM.Parser.findInternalLinks(rawOldTarget[0], null)[0];
          rawMiddleTarget = middleRedirectSource.match(/\s*#redirect\s*[^\n]+/i);
          middleTarget = this.WM.Parser.findInternalLinks(rawMiddleTarget[0], null)[0];
          if (oldTarget.fragment) {
            newTargetFragment = "#" + oldTarget.fragment;
          } else if (middleTarget.fragment) {
            newTargetFragment = "#" + middleTarget.fragment;
          } else {
            newTargetFragment = "";
          }
          if (oldTarget.anchor) {
            newTargetAltAnchor = "|" + oldTarget.anchor;
          } else if (middleTarget.anchor) {
            newTargetAltAnchor = "|" + middleTarget.anchor;
          } else {
            newTargetAltAnchor = "";
          }
          if (doubleRedirect.databaseResult.iwc) {
            newTargetInterlanguage = doubleRedirect.databaseResult.iwc + ":";
          } else {
            newTargetInterlanguage = "";
          }
          if (namespaces[doubleRedirect.databaseResult.nsc]["*"]) {
            newTargetNamespace = this.WM.Parser.squashContiguousWhitespace(namespaces[doubleRedirect.databaseResult.nsc]["*"]) + ":";
          } else {
            newTargetNamespace = "";
          }
          newTargetTitle = this.WM.Parser.squashContiguousWhitespace(doubleRedirect.databaseResult.tc);
          newTarget = "[[" + newTargetInterlanguage + newTargetNamespace + newTargetTitle + newTargetFragment + newTargetAltAnchor + "]]";
          newText = Str.overwriteFor(doubleRedirectSource, newTarget, oldTarget.index, oldTarget.length);
          if (newText !== doubleRedirectSource) {
            return this.WM.MW.callAPIPost({
              action: "edit",
              bot: "1",
              title: doubleRedirectTitle,
              summary: summary,
              text: newText,
              b1asetimestamp: timestamp,
              token: edittoken
            }, this.processDoubleRedirectEnd, [doubleRedirects, namespaces, summary, callNext], null);
          } else {
            this.WM.Log.logWarning("Could not fix " + this.WM.Log.linkToWikiPage(doubleRedirectTitle, doubleRedirectTitle));
            return this.iterateList(doubleRedirects, namespaces, [summary, callNext]);
          }
        }
      }, {
        key: "processDoubleRedirectEnd",
        value: function processDoubleRedirectEnd(res, args) {
          var callNext, doubleRedirects, namespaces, summary;
          doubleRedirects = args[0];
          namespaces = args[1];
          summary = args[2];
          callNext = args[3];
          if (res.edit && res.edit.result === 'Success') {
            return this.iterateList(doubleRedirects, namespaces, [summary, callNext]);
          } else {
            return this.WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
          }
        }
      }]);

      return FixDoubleRedirects;
    }();
  }, { "../../lib.js.generic/dist/Str": 37 }], 24: [function (require, module, exports) {
    module.exports.FixFragments = function () {
      function FixFragments(WM) {
        _classCallCheck(this, FixFragments);

        this.WM = WM;
      }

      _createClass(FixFragments, [{
        key: "fixLinks",
        value: function fixLinks(source) {
          var i, ilinks, j, len, len1, link, newtext1, newtext2, prevId, rawfragment, sections, slinks, title;
          title = this.WM.Editor.getTitle();
          sections = this.WM.Parser.findSectionHeadings(source).sections;
          slinks = this.WM.Parser.findSectionLinks(source);
          newtext1 = "";
          prevId = 0;
          for (i = 0, len = slinks.length; i < len; i++) {
            link = slinks[i];
            newtext1 += source.substring(prevId, link.index);
            newtext1 += this.fixLink(source, sections, link.rawLink, link.fragment, link.anchor);
            prevId = link.index + link.length;
          }
          newtext1 += source.substr(prevId);

          ilinks = this.WM.Parser.findInternalLinks(newtext1, null, title);
          newtext2 = "";
          prevId = 0;
          for (j = 0, len1 = ilinks.length; j < len1; j++) {
            link = ilinks[j];
            newtext2 += newtext1.substring(prevId, link.index);
            rawfragment = link.fragment;
            if (rawfragment) {
              newtext2 += this.fixLink(newtext1, sections, link.rawLink, rawfragment, link.anchor);
            } else {
              newtext2 += link.rawLink;
            }
            prevId = link.index + link.length;
          }
          newtext2 += newtext1.substr(prevId);
          return newtext2;
        }
      }, {
        key: "fixLink",
        value: function fixLink(source, sections, rawlink, rawfragment, lalt) {
          var dotFragment, dotHeading, escHeading, fragment, heading, i, len, section;
          fragment = this.WM.Parser.squashContiguousWhitespace(rawfragment).trim();
          for (i = 0, len = sections.length; i < len; i++) {
            section = sections[i];
            heading = section.cleanheading;
            dotHeading = this.WM.Parser.dotEncode(heading);
            dotFragment = this.WM.Parser.dotEncode(fragment);
            if (dotHeading.toLowerCase() === dotFragment.toLowerCase()) {
              if (fragment === dotFragment) {
                return "[[#" + dotHeading + (lalt ? "|" + lalt : "") + "]]";
              } else {
                escHeading = this.WM.Parser.dotEncodeLinkBreakingFragmentCharacters(heading);
                return "[[#" + escHeading + (lalt ? "|" + lalt : "") + "]]";
              }
            }
          }

          this.WM.Log.logWarning("Cannot fix broken section link: " + rawlink);
          return rawlink;
        }
      }, {
        key: "main",
        value: function main(args, callNext) {
          var newtext, source;
          source = this.WM.Editor.readSource();
          newtext = this.fixLinks(source);
          if (newtext !== source) {
            this.WM.Editor.writeSource(newtext);
            this.WM.Log.logInfo("Fixed section links");
          } else {
            this.WM.Log.logInfo("No fixable section links found");
          }
          if (callNext) {
            return callNext();
          }
        }
      }]);

      return FixFragments;
    }();
  }, {}], 25: [function (require, module, exports) {
    module.exports.FixLinkFragments = function () {
      function FixLinkFragments(WM) {
        _classCallCheck(this, FixLinkFragments);

        this.processLink = this.processLink.bind(this);
        this.processLinkContinue = this.processLinkContinue.bind(this);
        this.fixFragment = this.fixFragment.bind(this);
        this.findArchWikiLinks = this.findArchWikiLinks.bind(this);
        this.findArchWikiLinks2 = this.findArchWikiLinks2.bind(this);
        this.processArchWikiLink = this.processArchWikiLink.bind(this);
        this.processArchWikiLinkContinue = this.processArchWikiLinkContinue.bind(this);
        this.mainContinue = this.mainContinue.bind(this);
        this.mainEnd = this.mainEnd.bind(this);
        this.WM = WM;
      }

      _createClass(FixLinkFragments, [{
        key: "processLink",
        value: function processLink(title, links, index, source, newText, prevId, call, callArgs) {
          var link, params, rawfragment, target;
          if (links[index]) {
            link = links[index];
            rawfragment = link.fragment;
            if (rawfragment) {
              this.WM.Log.logInfo("Processing " + this.WM.Log.linkToWikiPage(link.link, link.rawLink) + " ...");
              target = (link.namespace ? link.namespace + ":" : "") + link.title;

              if (!this.WM.Parser.compareArticleTitles(target, title)) {
                params = {
                  'action': 'parse',
                  'prop': 'sections',
                  'page': target,
                  'redirects': 1
                };
                return this.WM.MW.callAPIGet(params, this.processLinkContinue, [link, target, rawfragment, links, index, source, newText, prevId, title, call, callArgs], null);
              } else {
                index++;
                return this.processLink(title, links, index, source, newText, prevId, call, callArgs);
              }
            } else {
              index++;
              return this.processLink(title, links, index, source, newText, prevId, call, callArgs);
            }
          } else {
            newText += source.substr(prevId);
            return call(newText, callArgs);
          }
        }
      }, {
        key: "processLinkContinue",
        value: function processLinkContinue(res, args) {
          var call, callArgs, fixedFragment, i, index, len, link, links, newText, prevId, rawfragment, ref, section, sections, source, target, title;
          link = args[0];
          target = args[1];
          rawfragment = args[2];
          links = args[3];
          index = args[4];
          source = args[5];
          newText = args[6];
          prevId = args[7];
          title = args[8];
          call = args[9];
          callArgs = args[10];

          if (res.parse) {
            sections = [];
            ref = res.parse.sections;
            for (i = 0, len = ref.length; i < len; i++) {
              section = ref[i];
              sections.push(this.WM.Parser.squashContiguousWhitespace(section.line).trim());
            }
            fixedFragment = this.fixFragment(rawfragment, sections);
            newText += source.substring(prevId, link.index);
            if (fixedFragment === true) {
              newText += link.rawLink;
            } else if (fixedFragment) {
              newText += "[[" + target + "#" + fixedFragment + (link.anchor ? "|" + link.anchor : "") + "]]";
            } else {
              this.WM.Log.logWarning("Cannot fix broken link fragment: " + this.WM.Log.linkToWikiPage(link.link, link.rawLink));
              newText += link.rawLink;
            }
            prevId = link.index + link.length;
          }
          index++;
          return this.processLink(title, links, index, source, newText, prevId, call, callArgs);
        }
      }, {
        key: "fixFragment",
        value: function fixFragment(rawfragment, sections) {
          var dotFragment, dotSection, fragment, i, len, section;
          fragment = this.WM.Parser.squashContiguousWhitespace(rawfragment).trim();
          if (sections.indexOf(fragment) < 0) {
            for (i = 0, len = sections.length; i < len; i++) {
              section = sections[i];
              dotSection = this.WM.Parser.dotEncode(section);
              dotFragment = this.WM.Parser.dotEncode(fragment);
              if (dotSection.toLowerCase() === dotFragment.toLowerCase()) {
                if (fragment === dotFragment) {
                  return dotSection;
                } else {
                  return this.WM.Parser.dotEncodeLinkBreakingFragmentCharacters(section);
                }
              }
            }
            return false;
          } else {
            return true;
          }
        }
      }, {
        key: "findArchWikiLinks",
        value: function findArchWikiLinks(newText, callArgs) {
          var templates, title;
          templates = this.WM.Parser.findTemplates(newText, 'Related');
          title = this.WM.Editor.getTitle();
          return this.processArchWikiLink(title, templates, 1, 0, newText, "", 0, this.findArchWikiLinks2, callArgs);
        }
      }, {
        key: "findArchWikiLinks2",
        value: function findArchWikiLinks2(newText, callArgs) {
          var templates, title;
          templates = this.WM.Parser.findTemplates(newText, 'Related2');
          title = this.WM.Editor.getTitle();
          return this.processArchWikiLink(title, templates, 2, 0, newText, "", 0, this.mainEnd, callArgs);
        }
      }, {
        key: "processArchWikiLink",
        value: function processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs) {
          var args, fragId, link, params, rawfragment, rawtarget, target, template;
          if (templates[index]) {
            template = templates[index];
            args = template.arguments;

            if (args.length === expectedArgs) {
              link = args[0].value;
              fragId = link.indexOf('#');
              if (fragId > -1) {
                rawtarget = link.substring(0, fragId);
                target = this.WM.Parser.squashContiguousWhitespace(rawtarget).trim();
                rawfragment = link.substr(fragId + 1);
                if (rawfragment) {
                  if (!this.WM.Parser.compareArticleTitles(target, title)) {
                    this.WM.Log.logInfo("Processing " + this.WM.Log.linkToWikiPage(link, template.rawTransclusion) + " ...");
                    params = {
                      'action': 'parse',
                      'prop': 'sections',
                      'page': target,
                      'redirects': 1
                    };
                    return this.WM.MW.callAPIGet(params, this.processArchWikiLinkContinue, [template, target, rawfragment, templates, expectedArgs, index, source, newText, prevId, title, call, callArgs], null);
                  } else {
                    index++;
                    return this.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                  }
                } else {
                  index++;
                  return this.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                }
              } else {
                index++;
                return this.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
              }
            } else {
              this.WM.Log.logWarning("Template:" + template.title + " must have " + expectedArgs + " and only " + expectedArgs + (expectedArgs > 1 ? " arguments: " : " argument: ") + template.rawTransclusion);
              index++;
              return this.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
            }
          } else {
            newText += source.substr(prevId);
            return call(newText, callArgs);
          }
        }
      }, {
        key: "processArchWikiLinkContinue",
        value: function processArchWikiLinkContinue(res, args) {
          var anchor, call, callArgs, expectedArgs, fixedFragment, i, index, len, newText, prevId, rawfragment, ref, section, sections, source, target, template, templates, title;
          template = args[0];
          target = args[1];
          rawfragment = args[2];
          templates = args[3];
          expectedArgs = args[4];
          index = args[5];
          source = args[6];
          newText = args[7];
          prevId = args[8];
          title = args[9];
          call = args[10];
          callArgs = args[11];

          if (res.parse) {
            sections = [];
            ref = res.parse.sections;
            for (i = 0, len = ref.length; i < len; i++) {
              section = ref[i];
              sections.push(this.WM.Parser.squashContiguousWhitespace(section.line).trim());
            }
            fixedFragment = this.fixFragment(rawfragment, sections);
            newText += source.substring(prevId, template.index);
            if (fixedFragment === true) {
              newText += template.rawTransclusion;
            } else if (fixedFragment) {
              anchor = template.arguments[1] ? "|" + template.arguments[1].value : "";
              newText += "{{" + template.title + "|" + target + "#" + fixedFragment + anchor + "}}";
            } else {
              this.WM.Log.logWarning("Cannot fix broken link fragment: " + this.WM.Log.linkToWikiPage(target, template.rawTransclusion));
              newText += template.rawTransclusion;
            }
            prevId = template.index + template.length;
          }
          index++;
          return this.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
        }
      }, {
        key: "main",
        value: function main(args, callNext) {
          var links, source, title;
          source = this.WM.Editor.readSource();
          this.WM.Log.logInfo("Fixing links to sections of other articles ...");
          links = this.WM.Parser.findInternalLinks(source, null, null);
          title = this.WM.Editor.getTitle();
          return this.processLink(title, links, 0, source, "", 0, this.mainContinue, callNext);
        }
      }, {
        key: "mainContinue",
        value: function mainContinue(newText, callNext) {
          var templates;

          if (location.hostname === 'wiki.archlinux.org') {
            return templates = this.findArchWikiLinks(newText, callNext);
          } else {
            return this.mainEnd(newText, callNext);
          }
        }
      }, {
        key: "mainEnd",
        value: function mainEnd(newText, callNext) {
          var source;
          source = this.WM.Editor.readSource();
          if (newText !== source) {
            this.WM.Editor.writeSource(newText);
            this.WM.Log.logInfo("Replaced links to sections of other articles");
          } else {
            this.WM.Log.logInfo("No fixable links to sections of other articles " + "found");
          }
          if (callNext) {
            return callNext();
          }
        }
      }]);

      return FixLinkFragments;
    }();
  }, {}], 26: [function (require, module, exports) {
    module.exports.MultipleLineBreaks = function () {
      function MultipleLineBreaks(WM) {
        _classCallCheck(this, MultipleLineBreaks);

        this.WM = WM;
      }

      _createClass(MultipleLineBreaks, [{
        key: "main",
        value: function main(args, callNext) {
          var newtext, source;
          source = this.WM.Editor.readSource();
          newtext = source;
          newtext = newtext.replace(/[\n]{3,}/g, '\n\n');
          if (newtext !== source) {
            this.WM.Editor.writeSource(newtext);
            this.WM.Log.logInfo("Removed multiple line breaks");
          }
          if (callNext) {
            return callNext();
          }
        }
      }]);

      return MultipleLineBreaks;
    }();
  }, {}], 27: [function (require, module, exports) {
    var CSS;

    CSS = require('../../lib.js.generic/dist/CSS');

    module.exports.SimpleReplace = function () {
      var configuration, _makeUI2, storeRegExp;

      var SimpleReplace = function () {
        function SimpleReplace(WM) {
          _classCallCheck(this, SimpleReplace);

          this.storeConfiguration = this.storeConfiguration.bind(this);
          this.mainAutoWrite = this.mainAutoWrite.bind(this);
          this.mainAutoEnd = this.mainAutoEnd.bind(this);
          this.WM = WM;
        }

        _createClass(SimpleReplace, [{
          key: "makeUI",
          value: function makeUI(args) {
            return _makeUI2();
          }
        }, {
          key: "makeBotUI",
          value: function makeBotUI(args) {
            var divMain, par3, summary, summaryLabel;
            divMain = _makeUI2();
            par3 = document.createElement('div');
            summaryLabel = document.createElement('span');
            summaryLabel.innerHTML = 'Edit summary:';
            summary = document.createElement('input');
            summary.setAttribute('type', 'text');
            summary.id = "WikiMonkey-SimpleReplace-Summary";
            par3.appendChild(summaryLabel);
            par3.appendChild(summary);
            divMain.appendChild(par3);
            return divMain;
          }
        }, {
          key: "storeConfiguration",
          value: function storeConfiguration() {
            configuration = {
              pattern: document.getElementById("WikiMonkey-SimpleReplace-RegExp").value,
              ignoreCase: document.getElementById("WikiMonkey-SimpleReplace-IgnoreCase").checked,
              newString: document.getElementById("WikiMonkey-SimpleReplace-NewString").value
            };
            this.WM.Log.logHidden("Pattern: " + configuration.pattern);
            this.WM.Log.logHidden("Ignore case: " + configuration.ignoreCase);
            return this.WM.Log.logHidden("New string: " + configuration.newString);
          }
        }, {
          key: "main",
          value: function main(args, callNext) {
            var exc, newtext, source;
            this.storeConfiguration();
            try {
              storeRegExp();
            } catch (error) {
              exc = error;
              this.WM.Log.logError("Invalid pattern: " + exc);

              return false;
            }
            source = this.WM.Editor.readSource();
            newtext = source.replace(configuration.regExp, configuration.newString);
            if (newtext !== source) {
              this.WM.Editor.writeSource(newtext);
              this.WM.Log.logInfo("Text substituted");
            }
            if (callNext) {
              return callNext();
            }
          }
        }, {
          key: "mainAuto",
          value: function mainAuto(args, title, callBot, chainArgs) {
            var exc, summary;
            this.storeConfiguration();
            try {
              storeRegExp();
            } catch (error) {
              exc = error;
              this.WM.Log.logError("Invalid pattern: " + exc);
              callBot(false, null);

              return false;
            }
            summary = document.getElementById("WikiMonkey-SimpleReplace-Summary").value;
            if (summary !== "") {
              return this.WM.MW.callQueryEdit(title, this.WM.Plugins.SimpleReplace.mainAutoWrite, [summary, callBot]);
            } else {
              this.WM.Log.logError("The edit summary cannot be empty");
              return callBot(false, null);
            }
          }
        }, {
          key: "mainAutoWrite",
          value: function mainAutoWrite(title, source, timestamp, edittoken, args) {
            var callBot, newtext, summary;
            summary = args[0];
            callBot = args[1];
            newtext = source.replace(configuration.regExp, configuration.newString);
            if (newtext !== source) {
              return this.WM.MW.callAPIPost({
                action: "edit",
                bot: "1",
                title: title,
                summary: summary,
                text: newtext,
                basetimestamp: timestamp,
                token: edittoken
              }, this.WM.Plugins.SimpleReplace.mainAutoEnd, callBot, null);
            } else {
              return callBot(0, null);
            }
          }
        }, {
          key: "mainAutoEnd",
          value: function mainAutoEnd(res, callBot) {
            if (res.edit && res.edit.result === 'Success') {
              return callBot(1, null);
            } else if (res.error) {
              this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
              return callBot(res.error.code, null);
            } else {
              return callBot(false, null);
            }
          }
        }]);

        return SimpleReplace;
      }();

      ;

      _makeUI2 = function _makeUI2() {
        var divMain, ignoreCase, ignoreCaseLabel, newString, newStringLabel, par1, par2, regexp, regexpLabel;
        CSS.addStyleElement("#WikiMonkey-SimpleReplace div " + "{margin-bottom:0.33em;} " + "#WikiMonkey-SimpleReplace input[type='text'] " + "{margin-left:0.33em; width:60%;}");
        divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";
        par1 = document.createElement('div');
        regexpLabel = document.createElement('span');
        regexpLabel.innerHTML = 'RegExp pattern:';
        regexp = document.createElement('input');
        regexp.setAttribute('type', 'text');
        regexp.id = "WikiMonkey-SimpleReplace-RegExp";
        ignoreCase = document.createElement('input');
        ignoreCase.setAttribute('type', 'checkbox');
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase";
        ignoreCaseLabel = document.createElement('span');
        ignoreCaseLabel.innerHTML = 'i';
        par1.appendChild(regexpLabel);
        par1.appendChild(regexp);
        par1.appendChild(ignoreCase);
        par1.appendChild(ignoreCaseLabel);
        par2 = document.createElement('div');
        newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';
        newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString";
        par2.appendChild(newStringLabel);
        par2.appendChild(newString);
        divMain.appendChild(par1);
        divMain.appendChild(par2);
        return divMain;
      };

      configuration = null;

      storeRegExp = function storeRegExp() {
        return configuration.regExp = new RegExp(configuration.pattern, "g" + (configuration.ignoreCase ? "i" : ""));
      };

      return SimpleReplace;
    }();
  }, { "../../lib.js.generic/dist/CSS": 31 }], 28: [function (require, module, exports) {
    module.exports.SynchronizeInterlanguageLinks = function () {
      function SynchronizeInterlanguageLinks(WM) {
        _classCallCheck(this, SynchronizeInterlanguageLinks);

        this.detectLang = this.detectLang.bind(this);
        this.computeWhiteList = this.computeWhiteList.bind(this);
        this.computeSupportedLangs = this.computeSupportedLangs.bind(this);
        this.mainContinue = this.mainContinue.bind(this);
        this.mainEnd = this.mainEnd.bind(this);
        this.mainAutoWrite = this.mainAutoWrite.bind(this);
        this.mainAutoEnd = this.mainAutoEnd.bind(this);
        this.WM = WM;
      }

      _createClass(SynchronizeInterlanguageLinks, [{
        key: "detectLang",
        value: function detectLang(title, tag) {
          var detect, pureTitle;

          if (tag === "ArchWiki") {
            detect = this.WM.ArchWiki.detectLanguage(title);
            pureTitle = detect[0];
            tag = this.WM.ArchWiki.getInterlanguageTag(detect[1]);
          } else {
            pureTitle = title;
          }
          return [pureTitle, tag];
        }
      }, {
        key: "computeWhiteList",
        value: function computeWhiteList(whitelist) {
          if (whitelist === "ArchWiki") {
            return this.WM.ArchWiki.getInternalInterwikiLanguages();
          } else {
            return whitelist;
          }
        }
      }, {
        key: "computeSupportedLangs",
        value: function computeSupportedLangs(supportedLangs) {
          if (supportedLangs === "ArchWiki") {
            return this.WM.ArchWiki.getInterwikiLanguages();
          } else {
            return supportedLangs;
          }
        }
      }, {
        key: "main",
        value: function main(args, callNext) {
          var detect, pureTitle, supportedLangs, tag, title, whitelist;
          title = this.WM.Editor.getTitle();
          detect = this.detectLang(title, args[0]);
          pureTitle = detect[0];
          tag = detect[1];
          whitelist = this.computeWhiteList(args[1]);
          supportedLangs = this.computeSupportedLangs(args[2]);
          this.WM.Log.logInfo("Synchronizing interlanguage links ...");
          return this.WM.MW.getInterwikiMap(title, this.mainContinue, [tag, pureTitle, supportedLangs, whitelist, title, callNext]);
        }
      }, {
        key: "mainContinue",
        value: function mainContinue(iwmap, args) {
          var callNext, i, langlinks, len, link, newlinks, nlink, pureTitle, source, supportedLangs, tag, title, url, visitedlinks, vlink, whitelist, wikiUrls;
          tag = args[0];
          pureTitle = args[1];
          supportedLangs = args[2];
          whitelist = args[3];
          title = args[4];
          callNext = args[5];
          source = this.WM.Editor.readSource();
          langlinks = this.WM.Interlanguage.parseLinks(supportedLangs, source, iwmap);
          wikiUrls = this.WM.MW.getWikiUrls();
          url = wikiUrls.short + encodeURIComponent(this.WM.Parser.squashContiguousWhitespace(title));
          visitedlinks = {};
          visitedlinks[tag.toLowerCase()] = this.WM.Interlanguage.createVisitedLink(tag, pureTitle, url, iwmap, source, null, null, langlinks);
          newlinks = {};
          this.WM.Log.logInfo("Reading " + this.WM.Log.linkToPage(url, "edited article") + " ...");
          if (langlinks) {
            for (i = 0, len = langlinks.length; i < len; i++) {
              link = langlinks[i];
              nlink = newlinks[link.lang.toLowerCase()];
              vlink = visitedlinks[link.lang.toLowerCase()];
              if (!vlink && !nlink) {
                newlinks[link.lang.toLowerCase()] = this.WM.Interlanguage.createNewLink(link.lang, link.title, link.url);
              } else if (vlink && vlink.url !== link.url) {
                this.WM.Log.logWarning("Possibly conflicting interlanguage " + "links: " + this.WM.Log.linkToPage(link.url, "[[" + link.lang + ":" + link.title + "]]") + " and " + this.WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" + visitedlinks[link.lang.toLowerCase()].title + "]]"));
              } else if (nlink && nlink.url !== link.url) {
                this.WM.Log.logWarning("Possibly conflicting interlanguage " + "links: " + this.WM.Log.linkToPage(link.url, "[[" + link.lang + ":" + link.title + "]]") + " and " + this.WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" + newlinks[link.lang.toLowerCase()].title + "]]"));
              }
            }
            return this.WM.Interlanguage.collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, false, this.mainEnd, [tag, url, source, langlinks, iwmap, callNext]);
          } else {
            this.WM.Log.logInfo("No interlanguage links found");
            if (callNext) {
              return callNext();
            }
          }
        }
      }, {
        key: "mainEnd",
        value: function mainEnd(links, args) {
          var callNext, iwmap, langlinks, newText, source, tag, url;
          tag = args[0];
          url = args[1];
          source = args[2];
          langlinks = args[3];
          iwmap = args[4];
          callNext = args[5];
          newText = this.WM.Interlanguage.updateLinks(tag, url, iwmap, source, langlinks, links);
          if (newText !== source) {
            this.WM.Editor.writeSource(newText);
            this.WM.Log.logInfo("Synchronized interlanguage links");
          } else {
            this.WM.Log.logInfo("Interlanguage links were already synchronized");
          }
          if (callNext) {
            return callNext();
          }
        }
      }, {
        key: "mainAuto",
        value: function mainAuto(args, title, callBot, chainArgs) {
          var detect, newlinks, pureTitle, summary, supportedLangs, tag, url, visitedlinks, whitelist, wikiUrls;
          detect = this.detectLang(title, args[0]);
          pureTitle = detect[0];
          tag = detect[1];
          whitelist = this.computeWhiteList(args[1]);
          supportedLangs = this.computeSupportedLangs(args[2]);
          summary = args[3];
          wikiUrls = this.WM.MW.getWikiUrls();
          url = wikiUrls.short + encodeURIComponent(this.WM.Parser.squashContiguousWhitespace(title));
          visitedlinks = {};
          newlinks = {};
          newlinks[tag.toLowerCase()] = this.WM.Interlanguage.createNewLink(tag, pureTitle, url);
          return this.WM.Interlanguage.collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, true, this.mainAutoWrite, [title, url, tag, summary, callBot]);
        }
      }, {
        key: "mainAutoWrite",
        value: function mainAutoWrite(links, args) {
          var callBot, edittoken, iwmap, langlinks, lcTag, newText, source, summary, tag, timestamp, title, url;
          title = args[0];
          url = args[1];
          tag = args[2];
          summary = args[3];
          callBot = args[4];
          lcTag = tag.toLowerCase();

          iwmap = links[lcTag].iwmap;
          source = links[lcTag].source;
          langlinks = links[lcTag].links;
          timestamp = links[lcTag].timestamp;
          edittoken = links[lcTag].edittoken;
          newText = this.WM.Interlanguage.updateLinks(tag, url, iwmap, source, langlinks, links);
          if (newText !== source) {
            return this.WM.MW.callAPIPost({
              action: "edit",
              bot: "1",
              title: title,
              summary: summary,
              text: newText,
              basetimestamp: timestamp,
              token: edittoken
            }, this.mainAutoEnd, callBot, null);
          } else {
            return callBot(0, null);
          }
        }
      }, {
        key: "mainAutoEnd",
        value: function mainAutoEnd(res, callBot) {
          if (res.edit && res.edit.result === 'Success') {
            return callBot(1, null);
          } else if (res.error) {
            this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            return callBot(res.error.code, null);
          } else {
            return callBot(false, null);
          }
        }
      }]);

      return SynchronizeInterlanguageLinks;
    }();
  }, {}], 29: [function (require, module, exports) {
    var Str,
        indexOf = [].indexOf;

    Str = require('../../lib.js.generic/dist/Str');

    module.exports.UpdateCategoryTree = function () {
      function UpdateCategoryTree(WM) {
        _classCallCheck(this, UpdateCategoryTree);

        this.mainContinue = this.mainContinue.bind(this);
        this.readToC = this.readToC.bind(this);
        this.processToC = this.processToC.bind(this);
        this.storeAlternativeNames = this.storeAlternativeNames.bind(this);
        this.processCategory = this.processCategory.bind(this);
        this.processCategoryAddSuffix = this.processCategoryAddSuffix.bind(this);
        this.processCategoryEnd = this.processCategoryEnd.bind(this);
        this.createCatLink = this.createCatLink.bind(this);
        this.writeToC = this.writeToC.bind(this);
        this.checkWrite = this.checkWrite.bind(this);
        this.WM = WM;
      }

      _createClass(UpdateCategoryTree, [{
        key: "main",
        value: function main(args, callNext) {
          var inparams, params, showRootAlsoIn, summary;
          inparams = args[0];
          summary = args[1];

          if (args[2] != null) {
            showRootAlsoIn = args[2];
          } else {
            showRootAlsoIn = false;
            this.WM.Log.logInfo("The configuration does not specify the " + "showRootAlsoIn value, defaulting to false");
          }
          if (inparams.constructor === Array) {
            if (inparams[0] === "ArchWiki") {
              params = this.WM.ArchWiki.getTableOfContents(inparams[1]);
            } else {
              this.WM.Log.logError("Unrecognized parameter");
              return false;
            }
          } else {
            params = inparams;
          }
          return this.WM.MW.isUserBot(this.mainContinue, [params, showRootAlsoIn, summary, callNext]);
        }
      }, {
        key: "mainContinue",
        value: function mainContinue(botTest, args) {
          return this.readToC({
            params: args[0],
            minInterval: botTest ? 60000 : 21600000,
            edittoken: "",
            timestamp: "",
            source: "",
            startId: 0,
            endId: 0,
            treeText: "",
            startMark: "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->",
            endMark: "<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK",
            altNames: {},
            showRootAlsoIn: args[1],
            summary: args[2],
            callNext: args[3]
          });
        }
      }, {
        key: "readToC",
        value: function readToC(args) {
          this.WM.Log.logInfo('Updating ' + this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + " ...");
          return this.WM.MW.callQueryEdit(args.params.page, this.processToC, args);
        }
      }, {
        key: "processToC",
        value: function processToC(title, source, timestamp, edittoken, args) {
          var end, msTimestamp, now, start;
          args.source = source;
          args.timestamp = timestamp;
          args.edittoken = edittoken;
          now = new Date();
          msTimestamp = Date.parse(args.timestamp);
          if (now.getTime() - msTimestamp >= args.minInterval) {
            start = args.source.indexOf(args.startMark);
            end = args.source.lastIndexOf(args.endMark);
            if (start > -1 && end > -1) {
              args.startId = start + args.startMark.length;
              args.endId = end;
              args.treeText = "";
              args.altNames = args.params.keepAltName ? this.storeAlternativeNames(args.source) : {};
              return this.WM.Cat.recurseTree({
                node: args.params.root,
                callNode: this.processCategory,
                callEnd: this.writeToC,
                callArgs: args
              });
            } else {
              this.WM.Log.logError("Cannot find insertion marks in " + this.WM.Log.linkToWikiPage(args.params.page, args.params.page));
              if (args.callNext) {
                return args.callNext();
              }
            }
          } else {
            this.WM.Log.logWarning(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' has been updated too recently');
            if (args.callNext) {
              return args.callNext();
            }
          }
        }
      }, {
        key: "storeAlternativeNames",
        value: function storeAlternativeNames(source) {
          var dict, match, regExp;
          dict = {};
          regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm;
          while (true) {
            match = regExp.exec(source);
            if (match) {
              dict[match[1].toLowerCase()] = match[2];
            } else {
              break;
            }
          }
          return dict;
        }
      }, {
        key: "processCategory",
        value: function processCategory(params) {
          var altName, args, indices, j, node, ref, text;
          args = params.callArgs;
          this.WM.Log.logInfo("Processing " + this.WM.Log.linkToWikiPage(params.node, params.node) + " ...");
          text = "";
          for (j = 0, ref = params.ancestors.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--) {
            text += args.params.indentType;
          }
          if (args.params.showIndices) {
            indices = [];
            node = params;
            while (node.parentIndex !== null) {
              indices.push(node.siblingIndex + 1);
              node = params.nodesList[node.parentIndex];
            }
            if (indices.length) {
              text += "<small>" + indices.reverse().join(".") + ".</small> ";
            }
          }
          altName = args.altNames[params.node.toLowerCase()] ? args.altNames[params.node.toLowerCase()] : null;
          text += this.createCatLink(params.node, args.params.replace, altName);
          text += args.params.rightToLeft ? "&lrm; " : " ";
          if (params.children === "loop") {
            text += "'''[LOOP]'''\n";
            this.WM.Log.logWarning("Loop in " + this.WM.Log.linkToWikiPage(params.node, params.node));
            return this.processCategoryEnd(params, args, text);
          } else {
            return this.WM.Cat.getParentsAndInfo(params.node, this.processCategoryAddSuffix, [params, args, text, altName]);
          }
        }
      }, {
        key: "processCategoryAddSuffix",
        value: function processCategoryAddSuffix(parents, info, args_) {
          var alsoParents, altName, args, currParent, i, j, k, len, len1, par, params, parentTitles, text;
          params = args_[0];
          args = args_[1];
          text = args_[2];
          altName = args_[3];
          currParent = params.ancestors[params.ancestors.length - 1];
          alsoParents = [];
          text += "<small>(" + (info ? info.pages : 0) + ")";

          if (currParent || args.showRootAlsoIn) {
            for (j = 0, len = parents.length; j < len; j++) {
              par = parents[j];
              if (currParent !== par.title && !(indexOf.call(par, "hidden") >= 0)) {
                alsoParents.push(par);
              }
            }
            if (alsoParents.length) {
              parentTitles = [];
              for (k = 0, len1 = alsoParents.length; k < len1; k++) {
                i = alsoParents[k];
                altName = args.altNames[alsoParents[i].title.toLowerCase()] ? args.altNames[alsoParents[i].title.toLowerCase()] : null;
                parentTitles.push(this.createCatLink(alsoParents[i].title, args.params.replace, altName));
              }
              text += " (" + args.params.alsoIn + " " + parentTitles.join(", ") + ")";
            }
          }
          text += "</small>\n";
          return this.processCategoryEnd(params, args, text);
        }
      }, {
        key: "processCategoryEnd",
        value: function processCategoryEnd(params, args, text) {
          args.treeText += text;
          params.callArgs = args;
          return this.WM.Cat.recurseTreeContinue(params);
        }
      }, {
        key: "createCatLink",
        value: function createCatLink(cat, replace, altName) {
          var catName, regExp;
          if (altName) {
            catName = altName;
          } else if (replace) {
            regExp = new RegExp(replace[0], replace[1]);
            catName = cat.substr(9).replace(regExp, replace[2]);
          } else {
            catName = cat.substr(9);
          }
          return "[[:" + cat + "|" + catName + "]]";
        }
      }, {
        key: "writeToC",
        value: function writeToC(params) {
          var args, newtext;
          args = params.callArgs;
          args.treeText = "\n" + args.treeText;
          newtext = Str.overwriteBetween(args.source, args.treeText, args.startId, args.endId);
          if (newtext !== args.source) {
            return this.WM.MW.callAPIPost({
              action: "edit",
              bot: "1",
              minor: "1",
              title: args.params.page,
              summary: args.summary,
              text: newtext,
              basetimestamp: args.timestamp,
              token: args.edittoken
            }, this.checkWrite, args, null);
          } else {
            this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' is already up to date');
            if (args.callNext) {
              return args.callNext();
            }
          }
        }
      }, {
        key: "checkWrite",
        value: function checkWrite(res, args) {
          if (res.edit && res.edit.result === 'Success') {
            this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' correctly updated');
            if (args.callNext) {
              return args.callNext();
            }
          } else {
            return this.WM.Log.logError(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' has not been updated!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
          }
        }
      }]);

      return UpdateCategoryTree;
    }();
  }, { "../../lib.js.generic/dist/Str": 37 }], 30: [function (require, module, exports) {
    module.exports.executeAsync = function (functions, id) {
      var callContinue, fid;
      id++;
      if (functions[id]) {
        fid = functions[id];
        callContinue = function (_this) {
          return function () {
            return _this.executeAsync(functions, id);
          };
        }(this);
        return fid[0](fid[1], callContinue);
      }
    };

    module.exports.recurseTreeAsync = function (params) {
      if (params.stage === void 0) {
        params.parentIndex = null;
        params.siblingIndex = 0;
        params.ancestors = [];
        params.children = [];
        params.nodesList = [];
        params.stage = 1;
        return this.recurseTreeAsync(params);
      } else {
        return;
        switch (params.stage) {
          case 1:
            params.stage = 2;

            if (params.ancestors.indexOf(params.node) == -1) {
              params.callChildren(params);
              break;
            } else {
              params.children = "loop";
            }
          case 2:
            params.nodesList.push({
              node: params.node,
              parentIndex: params.parentIndex,
              siblingIndex: params.siblingIndex,
              ancestors: params.ancestors.slice(0),
              children: params.children.slice(0)
            });
            params.stage = 3;
            params.callNode(params);
            break;
          case 3:
            if (params.children.length && params.children != "loop") {
              params.ancestors.push(params.node);
              params.node = params.children[0];
              params.parentIndex = params.nodesList.length - 1;
              params.siblingIndex = 0;
              params.children = [];
              params.stage = 1;
              this.recurseTreeAsync(params);
            } else if (params.parentIndex != null) {
              var parent = params.nodesList[params.parentIndex];
              params.siblingIndex++;
              params.node = parent.children[params.siblingIndex];
              params.children = [];
              if (params.node) {
                params.stage = 1;
              } else {
                params.node = parent.node;
                params.parentIndex = parent.parentIndex;
                params.siblingIndex = parent.siblingIndex;
                params.ancestors = parent.ancestors.slice(0);
                params.stage = 3;
              }
              this.recurseTreeAsync(params);
            } else {
              params.callEnd(params);
            }
            break;
        }
        ;
      }
    };
  }, {}], 31: [function (require, module, exports) {
    module.exports.addStyleElement = function (css) {
      var style;
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      return document.head.appendChild(style);
    };
  }, {}], 32: [function (require, module, exports) {
    module.exports.normalizeCarriageReturns = function (source) {
      return source.replace(/\r\n/g, '\n');
    };
  }, {}], 33: [function (require, module, exports) {
    module.exports.getPreviousElementSibling = function (node) {
      while (node.previousSibling.nodeType !== 1) {
        node = node.previousSibling;
      }
      return node.previousSibling;
    };

    module.exports.getNextElementSibling = function (node) {
      while (node.nextSibling.nodeType !== 1) {
        node = node.nextSibling;
      }
      return node.nextSibling;
    };

    module.exports.getFirstElementChild = function (node) {
      if (node.firstChild.nodeType === 1) {
        return node.firstChild;
      } else {
        return module.exports.getNextElementSibling(node.firstChild);
      }
    };

    module.exports.getLastElementChild = function (node) {
      if (node.lastChild.nodeType === 1) {
        return node.lastChild;
      } else {
        return module.exports.getPreviousElementSibling(node.lastChild);
      }
    };

    module.exports.getChildElements = function (node) {
      var child, children, j, len, list;
      list = element.childNodes;
      children = [];
      for (j = 0, len = list.length; j < len; j++) {
        child = list[j];
        if (child.nodeType === 1) {
          children.push(child);
        }
      }
      return children;
    };

    module.exports.getChildrenByTagName = function (element, tag) {
      var child, children, j, len, list, localName;
      list = element.childNodes;
      children = [];
      for (j = 0, len = list.length; j < len; j++) {
        child = list[j];
        localName = child.localName;
        if (localName && localName.toLowerCase() === tag.toLowerCase()) {
          children.push(child);
        }
      }
      return children;
    };

    module.exports.isDescendantOf = function (descendant, ancestor, identity) {
      var response;
      response = false;
      if (identity && descendant.isSameNode(ancestor)) {
        response = true;
      } else {
        while (descendant !== document.body) {
          if (descendant.parentNode.isSameNode(ancestor)) {
            response = true;
            break;
          }
          descendant = descendant.parentNode;
        }
      }
      return response;
    };

    module.exports.getSiblingPositionByTagName = function (element) {
      var i, siblings;
      i = 0;
      siblings = module.exports.getChildrenByTagName(element.parentNode, element.localName);
      while (!siblings[i].isSameNode(element)) {
        i++;
      }
      if (i < siblings.length) {
        return i;
      } else {
        return -1;
      }
    };

    module.exports.getLongTextNode = function (element) {
      var child, j, len, nodes, text;
      text = "";
      nodes = element.childNodes;
      for (j = 0, len = nodes.length; j < len; j++) {
        child = nodes[j];
        if (child.nodeType === 3) {
          text += child.nodeValue;
        }
      }
      return text;
    };

    module.exports.waitUntilJQuerySelectorMatches = function (selector, handler, args, interval) {
      var $, _recurse;
      $ = window.$;
      _recurse = function recurse() {
        if ($(selector)[0]) {
          return handler(args);
        } else {
          return setTimeout(_recurse, interval);
        }
      };
      return _recurse();
    };
  }, {}], 34: [function (require, module, exports) {
    module.exports.getUrlLocation = function (url) {
      var link;
      link = document.createElement('a');
      link.href = url;
      return link;
    };

    module.exports.getURIParameters = function (uri) {
      var i, len, par, qarray, qdict, qstring, s;
      if (uri) {
        qstring = module.exports.getUrlLocation(uri).search;
      } else {
        qstring = location.search;
      }
      qarray = qstring.substr(1).split('&');
      qdict = new Object();
      s = new Array();
      for (i = 0, len = qarray.length; i < len; i++) {
        par = qarray[i];
        s = par.split('=');
        qdict[s[0]] = s[1];
      }
      return qdict;
    };

    module.exports.getURIParameter = function (uri, name) {
      return module.exports.getURIParameters(uri)[name];
    };

    module.exports.sendGetAsyncRequest = function (url, call) {
      var req;
      req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          return call(req);
        }
      };
      req.open("GET", url, true);
      return req.send();
    };

    module.exports.sendGetSyncRequest = function (url) {
      var req;
      req = new XMLHttpRequest();
      req.open("GET", url, false);
      req.send();
      return req;
    };

    module.exports.sendPostAsyncRequest = function (url, call, query, header, headervalue) {
      var req;
      req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          return call(req);
        }
      };
      req.open("POST", url, true);
      if (header && headervalue) {
        req.setRequestHeader(header, headervalue);
      }
      return req.send(query);
    };

    module.exports.sendPostSyncRequest = function (url, query, header, headervalue) {
      var req;
      req = new XMLHttpRequest();
      req.open("POST", url, false);
      if (header && headervalue) {
        req.setRequestHeader(header, headervalue);
      }
      req.send(query);
      return req;
    };
  }, {}], 35: [function (require, module, exports) {
    module.exports.getKeys = function (object) {
      var i, keys;
      keys = [];
      for (i in object) {
        keys.push(i);
      }
      return keys;
    };

    module.exports.getValues = function (object) {
      var i, values;
      values = [];
      for (i in object) {
        values.push(object[i]);
      }
      return values;
    };

    module.exports.getFirstItem = function (object) {
      var i;
      for (i in object) {
        return object[i];
      }
    };
  }, {}], 36: [function (require, module, exports) {
    module.exports.escapePattern = function (string) {
      return string.replace(/[-[\]{}()^$*+?.|\\]/g, "\\$&");
    };

    module.exports.matchAll = function (source, regExp) {
      var L, match, result;
      result = [];
      while (true) {
        match = regExp.exec(source);
        if (match) {
          L = match[0].length;
          result.push({
            "match": match,
            "index": regExp.lastIndex - L,
            "length": L
          });
        } else {
          break;
        }
      }
      return result;
    };

    module.exports.matchAllConditional = function (source, regExp, test) {
      var L, match, result;
      result = [];
      while (true) {
        match = regExp.exec(source);
        if (match && test(match)) {
          L = match[0].length;
          result.push({
            "match": match,
            "index": regExp.lastIndex - L,
            "length": L
          });
        } else {
          break;
        }
      }
      return result;
    };
  }, {}], 37: [function (require, module, exports) {
    module.exports.insert = function (string, newString, id) {
      if (id == null) {
        id = 0;
      }
      return string.substring(0, id) + newString + string.substr(id);
    };

    module.exports.overwriteFor = function (string, newString, id, length) {
      if (id == null) {
        id = 0;
      }
      if (!length || length < 0) {
        length = 0;
      }
      return string.substring(0, id) + newString + string.substr(id + length);
    };

    module.exports.overwriteAt = function (string, newString, id) {
      return module.exports.overwriteFor(string, newString, id, newString.length);
    };

    module.exports.overwriteBetween = function (string, newString, id1, id2) {
      var tempid;
      if (id1 == null) {
        id1 = 0;
      }
      if (id2 == null) {
        id2 = id1;
      }
      if (id1 > id2) {
        tempid = id2;
        id2 = id1;
        id1 = tempid;
      }
      return string.substring(0, id1) + newString + string.substr(id2);
    };

    module.exports.removeFor = function (string, id, length) {
      return module.exports.overwriteFor(string, "", id, length);
    };

    module.exports.removeBetween = function (string, id1, id2) {
      return module.exports.overwriteBetween(string, "", id1, id2);
    };

    module.exports.padLeft = function (string, filler, length) {
      while (string.length < length) {
        string = filler + string;
      }
      return string;
    };

    module.exports.padRight = function (string, filler, length) {
      while (string.length < length) {
        string += filler;
      }
      return string;
    };

    module.exports.findSimpleEnclosures = function (string, openTag, openLength, closeTag, closeLength) {
      var cIndex, cIndexRel, oIndex, oIndexRel, results, searchIndex;
      results = [];
      searchIndex = 0;
      oIndexRel = string.search(openTag);
      while (true) {
        if (oIndexRel > -1) {
          oIndex = searchIndex + oIndexRel;
          cIndexRel = string.substr(oIndex + openLength).search(closeTag);
          if (cIndexRel > -1) {
            cIndex = oIndex + openLength + cIndexRel;
            results.push([oIndex, cIndex]);
            searchIndex = cIndex + closeLength;
            if (searchIndex < string.length) {
              oIndexRel = string.substr(searchIndex).search(openTag);
              continue;
            } else {
              break;
            }
          } else {
            results.push([oIndex, false]);
            break;
          }
        } else {
          break;
        }
      }
      return results;
    };

    module.exports.findNestedEnclosures = function (string, openTag, closeTag, maskChar) {
      var cIndex, cIndexRel, closeLength, maskLength, maskedString, maskedString1, maskedString2, maskedString3, oIndex, oIndexRel, openLength, results, searchIndex;
      openLength = openTag.length;
      closeLength = closeTag.length;
      results = [];
      searchIndex = 0;
      cIndexRel = string.indexOf(closeTag);
      maskedString = string;
      while (true) {
        if (cIndexRel > -1) {
          cIndex = searchIndex + cIndexRel;
          oIndexRel = maskedString.substring(searchIndex, cIndex).lastIndexOf(openTag);
          if (oIndexRel > -1) {
            oIndex = searchIndex + oIndexRel;
            results.push([oIndex, cIndex]);
            maskedString1 = maskedString.substring(0, oIndex);
            maskLength = cIndex - oIndex + closeLength;
            maskedString2 = module.exports.padRight("", maskChar, maskLength);
            maskedString3 = maskedString.substring(cIndex + closeLength);
            maskedString = maskedString1 + maskedString2 + maskedString3;
          } else {
            searchIndex = cIndex + closeLength;
          }
          cIndexRel = maskedString.substring(searchIndex).indexOf(closeTag);
          continue;
        } else {
          break;
        }
      }
      return [results, maskedString];
    };

    module.exports.findInnermostEnclosures = function (string, openTag, closeTag) {
      var cIndex, cIndexRel, closeLength, oIndex, oIndexRel, openLength, results, searchIndex;
      openLength = openTag.length;
      closeLength = closeTag.length;
      results = [];
      searchIndex = 0;
      while (true) {
        cIndexRel = string.substring(searchIndex).indexOf(closeTag);
        if (cIndexRel > -1) {
          cIndex = searchIndex + cIndexRel;
          oIndexRel = string.substring(searchIndex, cIndex).lastIndexOf(openTag);
          if (oIndexRel > -1) {
            oIndex = searchIndex + oIndexRel;
            results.push([oIndex, cIndex]);
          }
          searchIndex = cIndex + closeLength;
          continue;
        } else {
          break;
        }
      }
      return results;
    };
  }, {}] }, {}, [1]);

}
