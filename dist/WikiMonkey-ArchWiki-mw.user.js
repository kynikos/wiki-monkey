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

"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    var WM;

    var _require = require('./modules/_Init');

    WM = _require.WM;

    new WM("ArchWiki", require("./plugins/ArchWikiFixHeader"), require("./plugins/ArchWikiFixHeadings"), require("./plugins/ArchWikiFixLinks"), require("./plugins/ArchWikiNewTemplates"), require("./plugins/ArchWikiNPFilter"), require("./plugins/ArchWikiRCFilter"), require("./plugins/ArchWikiSaveTalk"), require("./plugins/ArchWikiSortContacts"), require("./plugins/ArchWikiSummaryToRelated"), require("./plugins/ExpandContractions"), require("./plugins/FixBacklinkFragments"), require("./plugins/FixDoubleRedirects"), require("./plugins/FixFragments"), require("./plugins/FixLinkFragments"), require("./plugins/MultipleLineBreaks"), require("./plugins/SimpleReplace"), require("./plugins/SynchronizeInterlanguageLinks"), require("./plugins/UpdateCategoryTree"));
  }, { "./modules/_Init": 18, "./plugins/ArchWikiFixHeader": 20, "./plugins/ArchWikiFixHeadings": 21, "./plugins/ArchWikiFixLinks": 22, "./plugins/ArchWikiNPFilter": 23, "./plugins/ArchWikiNewTemplates": 24, "./plugins/ArchWikiRCFilter": 25, "./plugins/ArchWikiSaveTalk": 26, "./plugins/ArchWikiSortContacts": 27, "./plugins/ArchWikiSummaryToRelated": 28, "./plugins/ExpandContractions": 29, "./plugins/FixBacklinkFragments": 30, "./plugins/FixDoubleRedirects": 31, "./plugins/FixFragments": 32, "./plugins/FixLinkFragments": 33, "./plugins/MultipleLineBreaks": 34, "./plugins/SimpleReplace": 35, "./plugins/SynchronizeInterlanguageLinks": 36, "./plugins/UpdateCategoryTree": 37 }], 2: [function (require, module, exports) {
    module.exports = function () {
      var languages, tablesOfContents;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          this.WM = WM;
        }

        _createClass2(exports, [{
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

        return exports;
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

      return exports;
    }();
  }, {}], 3: [function (require, module, exports) {
    var CSS;

    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this._previewFilter = this._previewFilter.bind(this);
        this._startAutomatic = this._startAutomatic.bind(this);
        this._startAutomaticContinue = this._startAutomaticContinue.bind(this);
        this.WM = WM;
        this.configuration = {
          plugin_name: null,
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

      _createClass2(exports, [{
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
          var Plugin, divFunction, ffunctions, fieldset, i, legend, len, makeUI, option, plugin, pluginInst, selectFunctions, self;
          self = this;
          fieldset = document.createElement('fieldset');
          legend = document.createElement('legend');
          legend.innerHTML = 'Plugin';
          selectFunctions = document.createElement('select');
          selectFunctions.id = 'WikiMonkeyBot-PluginSelect';
          ffunctions = [];
          for (i = 0, len = functions.length; i < len; i++) {
            Plugin = functions[i];
            plugin = new Plugin(this.WM);
            pluginInst = plugin.conf.bot_label;

            if (!pluginInst || !pluginInst.length) {
              continue;
            }
            ffunctions.push(plugin);
            option = document.createElement('option');
            option.innerHTML = pluginInst;
            if (plugin.constructor.name === this.WM.conf.default_bot_plugin) {
              option.selected = true;
            }
            selectFunctions.appendChild(option);
          }
          if (ffunctions.length) {
            selectFunctions.addEventListener("change", function (ffunctions) {
              return function () {
                var UI, id, makeUI, select;
                select = document.getElementById('WikiMonkeyBot-PluginSelect');
                id = select.selectedIndex;
                UI = document.getElementById('WikiMonkeyBotFunction');
                plugin = ffunctions[id];

                makeUI = plugin.makeBotUI;
                if (makeUI instanceof Function) {
                  UI.replaceChild(makeUI(), UI.firstChild);
                } else {
                  UI.replaceChild(document.createElement('div'), UI.firstChild);
                }
                self.configuration.plugin_name = plugin.constructor.name;
                return self.configuration.function_ = function (title, callContinue, chainArgs) {
                  return plugin.main_bot(title, callContinue, chainArgs);
                };
              };
            }(ffunctions), false);
            divFunction = document.createElement('div');
            divFunction.id = "WikiMonkeyBotFunction";
            plugin = ffunctions[selectFunctions.selectedIndex];

            makeUI = plugin.makeBotUI;
            if (makeUI instanceof Function) {
              divFunction.appendChild(makeUI());
            } else {
              divFunction.appendChild(document.createElement('div'));
            }
            this.configuration.plugin_name = plugin.constructor.name;
            this.configuration.function_ = function (title, callContinue, chainArgs) {
              return plugin.main_bot(title, callContinue, chainArgs);
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
            this.WM.Log.logHidden("Plugin: " + this.configuration.plugin_name);
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430 }], 4: [function (require, module, exports) {
    var Async, Obj;

    Async = require('../../auxiliary/lib.js.generic/dist/Async');

    Obj = require('../../auxiliary/lib.js.generic/dist/Obj');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.WM = WM;
      }

      _createClass2(exports, [{
        key: "recurseTree",
        value: function recurseTree(params) {
          params.callChildren = this.WM.Cat._recurseTreeCallChildren;
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
          return this.WM.Cat.getSubCategories(params.node, this.WM.Cat._recurseTreeCallChildrenContinue, params);
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
          return this.WM.Cat._getMembers(parent, "subcat", call, callArgs);
        }
      }, {
        key: "getAllMembers",
        value: function getAllMembers(parent, call, callArgs) {
          return this.WM.Cat._getMembers(parent, null, call, callArgs);
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
          return this.WM.MW.callAPIGet(query, function (res, args) {
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
          return this.WM.MW.callAPIGet(query, function (res, args) {
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Async": 429, "../../auxiliary/lib.js.generic/dist/Obj": 433 }], 5: [function (require, module, exports) {
    var HTTP;

    HTTP = require('../../auxiliary/lib.js.generic/dist/HTTP');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.WM = WM;
      }

      _createClass2(exports, [{
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/HTTP": 432 }], 6: [function (require, module, exports) {
    var Compatibility, HTTP;

    Compatibility = require('../../auxiliary/lib.js.generic/dist/Compatibility');

    HTTP = require('../../auxiliary/lib.js.generic/dist/HTTP');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.WM = WM;
      }

      _createClass2(exports, [{
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Compatibility": 431, "../../auxiliary/lib.js.generic/dist/HTTP": 432 }], 7: [function (require, module, exports) {
    var CSS;

    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.updateFilterUI = this.updateFilterUI.bind(this);
        this.executePlugin = this.executePlugin.bind(this);
        this.WM = WM;
      }

      _createClass2(exports, [{
        key: "_makeUI",
        value: function _makeUI(page_type, plugins) {
          var Plugin, commandsFilterDiv, div, divFilter, filters, i, len, option, plugin, pluginInst, selectFilter;
          this.page_type = page_type;
          CSS.addStyleElement("#WikiMonkeyFilters-Commands {display:flex; align-items:center; justify-content:space-between;} #WikiMonkeyFilters-Commands > select {flex:auto;} #WikiMonkeyFilters-Commands > select, #WikiMonkeyFilters-Commands > input[type='button'] {margin-right:1em;} #WikiMonkeyFilters-Commands > input[type='checkbox'] {margin-right:0.4em;}");
          filters = [];
          selectFilter = $('<select/>').change(this.updateFilterUI(filters));
          for (i = 0, len = plugins.length; i < len; i++) {
            Plugin = plugins[i];
            plugin = new Plugin(this.WM);
            pluginInst = plugin.conf.filter_label;

            if (!pluginInst) {
              continue;
            }
            filters.push(plugin);
            option = $('<option/>').text(pluginInst);
            if (plugin.constructor.name === this.WM.conf["default_" + this.page_type + "_plugin"]) {
              option[0].selected = true;
            }
            option.appendTo(selectFilter);
          }
          if (filters.length) {
            commandsFilterDiv = $('<div/>').attr('id', 'WikiMonkeyFilters-Commands');
            commandsFilterDiv.append(selectFilter);
            $('<input/>').attr('type', 'button').val('Apply filter').click(this.executePlugin(filters)).appendTo(commandsFilterDiv);
            $('<input/>').attr('type', 'checkbox').change(this.toggleLog).appendTo(commandsFilterDiv);
            $('<span/>').text('Show Log').appendTo(commandsFilterDiv);
            divFilter = $('<div/>').attr('id', "WikiMonkeyFilters-Options");

            $('<div/>').appendTo(divFilter);
            this.doUpdateFilterUI(divFilter, filters, selectFilter[0].selectedIndex);
            div = $('<div/>').attr('id', 'WikiMonkeyFilters').append(commandsFilterDiv).append(divFilter);
            return div[0];
          } else {
            return false;
          }
        }
      }, {
        key: "updateFilterUI",
        value: function updateFilterUI(filters) {
          var _this2 = this;

          return function (event) {
            var UI, id, select;
            UI = $('#WikiMonkeyFilters-Options');
            select = $('#WikiMonkeyFilters-Commands').find('select').first();
            id = select[0].selectedIndex;
            return _this2.doUpdateFilterUI(UI, filters, id);
          };
        }
      }, {
        key: "doUpdateFilterUI",
        value: function doUpdateFilterUI(UI, filters, id) {
          var makeUI;
          makeUI = filters[id].makeUI;
          if (makeUI instanceof Function) {
            return UI.children().first().replaceWith(makeUI());
          } else {
            return UI.children().first().replaceWith($('<div/>'));
          }
        }
      }, {
        key: "executePlugin",
        value: function executePlugin(filters) {
          var _this3 = this;

          return function (event) {
            var id, select;
            select = $('#WikiMonkeyFilters-Commands').find('select').first();
            id = select[0].selectedIndex;
            filters[id]["main_" + _this3.page_type]();
            return event.target.disabled = true;
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430 }], 8: [function (require, module, exports) {
    var Obj;

    Obj = require('../../auxiliary/lib.js.generic/dist/Obj');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.parseLinks = this.parseLinks.bind(this);
        this.queryLinks = this.queryLinks.bind(this);
        this.createNewLink = this.createNewLink.bind(this);
        this.createVisitedLink = this.createVisitedLink.bind(this);
        this.collectLinks = this.collectLinks.bind(this);
        this._collectLinksContinue = this._collectLinksContinue.bind(this);
        this.updateLinks = this.updateLinks.bind(this);
        this.WM = WM;
      }

      _createClass2(exports, [{
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Obj": 433 }], 9: [function (require, module, exports) {
    var Str, jss;

    var _require2 = require('./libs');

    jss = _require2.jss;


    Str = require('../../auxiliary/lib.js.generic/dist/Str');

    module.exports = function () {
      var classesToLevels;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          var classes, styles;
          this.WM = WM;
          this._currentInfoDisplayState = true;

          styles = {
            log: {
              height: '10em',
              border: '2px solid #07b',
              padding: '0.5em',
              overflow: 'auto',
              resize: 'vertical',
              'background-color': '#111',
              '& p.timestamp, & p.message': {
                border: 'none',
                padding: 0,
                'font-family': 'monospace',
                color: '#eee'
              },
              '& p.timestamp': {
                margin: '0 1em 0 0',
                'white-space': 'nowrap'
              },
              '& p.message': {
                margin: 0
              },
              '& div.mdebug, & div.minfo, & div.mwarning, & div.merror': {
                display: 'flex'
              },
              '& div.mhidden': {
                display: 'none'
              },
              '& div.mjson': {
                display: 'none'
              },
              '& div.mdebug p.message': {
                color: 'cyan'
              },
              '& div.mwarning p.message': {
                color: 'gold'
              },
              '& div.merror p.message': {
                color: 'red'
              },
              '& a': {
                color: 'inherit',
                'text-decoration': 'underline'
              }
            }
          };

          var _jss$createStyleSheet = jss.createStyleSheet(styles, {
            classNamePrefix: "WikiMonkey-"
          }).attach();

          classes = _jss$createStyleSheet.classes;

          this.classes = classes;
        }

        _createClass2(exports, [{
          key: "_makeLogArea",
          value: function _makeLogArea() {
            var log, par;
            log = document.createElement('div');
            log.id = 'WikiMonkeyLog';
            par = document.createElement('p');
            par.appendChild(this.makeFilterLink());
            par.appendChild(document.createTextNode(' '));
            par.appendChild(this.makeSaveLink());
            log.appendChild(par);
            this.logarea = document.createElement('div');
            this.logarea.className = this.classes.log;
            log.appendChild(this.logarea);
            return log;
          }
        }, {
          key: "makeFilterLink",
          value: function makeFilterLink() {
            var _this5 = this;

            var link;
            link = document.createElement('a');
            link.href = '#WikiMonkey';
            link.innerHTML = this.computeFilterLinkAnchor();
            link.addEventListener("click", function (event) {
              var i, len, msg, msgs;
              event.preventDefault();

              _this5._currentInfoDisplayState = !_this5._currentInfoDisplayState;
              link.innerHTML = _this5.computeFilterLinkAnchor();
              msgs = _this5.logarea.getElementsByClassName('minfo');
              for (i = 0, len = msgs.length; i < len; i++) {
                msg = msgs[i];
                msg.style.display = _this5.computeInfoDisplayStyle();
              }
              return _this5.scrollToBottom();
            }, false);
            return link;
          }
        }, {
          key: "makeSaveLink",
          value: function makeSaveLink() {
            var _this6 = this;

            var link;
            link = document.createElement('a');
            link.href = '#';
            link.download = 'WikiMonkey.log';
            link.innerHTML = '[save log]';
            link.id = 'WikiMonkeyLog-Save';
            link.addEventListener("click", function () {
              link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(_this6.composeSaveLogText());
              return link.download = _this6.composeSaveLogFilename();
            }, false);
            return link;
          }
        }, {
          key: "composeSaveLogText",
          value: function composeSaveLogText() {
            var div, divs, i, len, level, message, ps, text, tstamp;
            divs = this.logarea.getElementsByTagName('div');
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
            return this.logarea.scrollTop = this.logarea.scrollHeight - this.logarea.clientHeight;
          }
        }, {
          key: "appendMessage",
          value: function appendMessage(text, type) {
            var line, msg, now, test, tstamp;
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

            test = this.logarea.scrollTop + this.logarea.clientHeight === this.logarea.scrollHeight;
            this.logarea.appendChild(line);
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

        return exports;
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Str": 435, "./libs": 19 }], 10: [function (require, module, exports) {
    var A, HTTP, Obj;

    HTTP = require('../../auxiliary/lib.js.generic/dist/HTTP');

    Obj = require('../../auxiliary/lib.js.generic/dist/Obj');

    var _require3 = require('./libs');

    A = _require3.A;


    module.exports = function () {
      var interwikiFixes, localWikiPaths, localWikiUrls, wikiPaths;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          var hostname, key, wpaths;
          this.WM = WM;
          this.api = new mw.Api();
          wpaths = this._getWikiPaths(location.href);
          hostname = wpaths[0];
          this.userInfo = null;
          localWikiPaths = wpaths[1];
          localWikiUrls = {};
          for (key in localWikiPaths) {
            localWikiUrls[key] = hostname + localWikiPaths[key];
          }
        }

        _createClass2(exports, [{
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
          key: "linkArticle",
          value: function linkArticle(page, label) {
            return A({
              href: mw.util.getUrl(page)
            }, label || page);
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
            if (url) {
              return "Failed query: " + this.WM.Log.linkToPage(url, url);
            }
            return "Failed query";
          }
        }, {
          key: "callAPIGet",
          value: function callAPIGet(params, call, callArgs, callError) {
            var _this7 = this;

            params.format = "json";
            return this.api.get(params).done(function (data, textStatus, jqXHR) {
              if (call) {
                return call(data, callArgs);
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              console.error(jqXHR, textStatus, errorThrown);
              _this7.WM.Log.logError(_this7.failedQueryError());
              if (confirm("Wiki Monkey error: Failed query\n\nDo you want " + "to retry?")) {
                _this7.WM.Log.logInfo("Retrying ...");
                return _this7.callAPIGet(params, call, callArgs, callError);
              } else if (callError) {
                return callError(callArgs);
              }
            });
          }
        }, {
          key: "callAPIPost",
          value: function callAPIPost(params, call, callArgs, callError) {
            var _this8 = this;

            params.format = "json";
            return this.api.post(params).done(function (data, textStatus, jqXHR) {
              if (call) {
                return call(data, callArgs);
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              console.error(jqXHR, textStatus, errorThrown);
              _this8.WM.Log.logError(_this8.failedQueryError());
              if (confirm("Wiki Monkey error: Failed query\n\nDo you want " + "to retry?")) {
                _this8.WM.Log.logInfo("Retrying ...");
                return _this8.callAPIPost(params, call, callArgs, callError);
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
            var _this9 = this;

            var pars, storeInfo;
            storeInfo = function storeInfo(res, call) {
              _this9.userInfo = res;
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
            var _this10 = this;

            return this.getUserInfo(function () {
              var test;
              test = _this10.userInfo.query.userinfo.id !== 0;
              return call(test, args);
            });
          }
        }, {
          key: "getUserName",
          value: function getUserName(call, args) {
            var _this11 = this;

            return this.getUserInfo(function () {
              return call(_this11.userInfo.query.userinfo.name, args);
            });
          }
        }, {
          key: "isUserBot",
          value: function isUserBot(call, args) {
            var _this12 = this;

            return this.getUserInfo(function () {
              var groups, res;
              groups = _this12.userInfo.query.userinfo.groups;
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
            var _this13 = this;

            return this.callAPIGet(query, function (res, args) {
              backlinks = backlinks.concat(res.query.backlinks);
              if (res["query-continue"]) {
                query.blcontinue = res["query-continue"].backlinks.blcontinue;
                return _this13._getBacklinksContinue(query, call, args, backlinks);
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
            var _this14 = this;

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
                return _this14._getLanglinksContinue(query, call, args, langlinks, iwmap);
              } else {
                return call(langlinks, iwmap, args);
              }
            }, callArgs, null);
          }
        }, {
          key: "getInterwikiMap",
          value: function getInterwikiMap(title) {
            return this.callAPIGet({
              action: "query",
              meta: "siteinfo",
              siprop: "interwikimap"
            });
          }
        }, {
          key: "getLocalInterwikiMap",
          value: function getLocalInterwikiMap(title, call, callArgs) {
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
            var _this15 = this;

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
                return _this15._getSpecialListContinue(query, call, args, results, siteinfo);
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
            var _this16 = this;

            return this.callAPIGet(query, function (res, args) {
              results = results.concat(res.query.usercontribs);
              if (res["query-continue"]) {
                query.uccontinue = res["query-continue"].usercontribs.uccontinue;
                return _this16._getUserContribsContinue(query, call, args, results);
              } else {
                return call(results, args);
              }
            }, callArgs, null);
          }
        }]);

        return exports;
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/HTTP": 432, "../../auxiliary/lib.js.generic/dist/Obj": 433, "./libs": 19 }], 11: [function (require, module, exports) {
    var Async, CSS;

    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    Async = require('../../auxiliary/lib.js.generic/dist/Async');

    module.exports = function () {
      var makeChangeMenu, makeGroupAction;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          this.executeEntryAction = this.executeEntryAction.bind(this);
          this.warnInputNeeded = this.warnInputNeeded.bind(this);
          this.WM = WM;
        }

        _createClass2(exports, [{
          key: "_makeUI",
          value: function _makeUI(page_type, plugins) {
            var Plugin, currId, currMenu, entry, execAll, groupAction, groupActions, i, j, len, m, mainDiv, menuSel, menus, parentId, parentMenu, plugin, pluginInst, ref;
            this.page_type = page_type;
            CSS.addStyleElement("#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");
            mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');
            groupActions = {};
            for (i = 0, len = plugins.length; i < len; i++) {
              Plugin = plugins[i];
              plugin = new Plugin(this.WM);
              pluginInst = plugin.conf[this.page_type + "_menu"];

              if (!pluginInst || !pluginInst.length) {
                continue;
              }
              if (plugin.makeUI) {
                groupAction = [this.warnInputNeeded, plugin];
              } else {
                groupAction = [this.executeEntryAction, plugin];
              }
              pluginInst.unshift("WikiMonkeyMenuRoot");
              currId = false;
              for (m = j = 0, ref = pluginInst.length - 1; 0 <= ref ? j < ref : j > ref; m = 0 <= ref ? ++j : --j) {
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
                entry.click(this.makeEntryUI(currMenu, plugin));
              } else {
                entry.click(this.makeEntryAction(plugin));
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
          value: function makeEntryUI(currMenu, plugin) {
            var _this17 = this;

            return function (event) {
              var UI, UIdiv;
              currMenu.hide();
              UIdiv = $('<div/>');
              $('<input/>').attr('type', 'button').val('<').addClass('margin').click(function (event) {
                UIdiv.remove();
                return currMenu.show();
              }).appendTo(UIdiv);
              $('<input/>').attr('type', 'button').val('Execute').click(_this17.makeEntryAction(plugin)).appendTo(UIdiv);
              UI = plugin.makeUI();
              return UIdiv.append(UI).insertAfter(currMenu);
            };
          }
        }, {
          key: "makeEntryAction",
          value: function makeEntryAction(plugin) {
            var _this18 = this;

            return function (event) {
              return _this18.executeEntryAction(plugin, null);
            };
          }
        }, {
          key: "executeEntryAction",
          value: function executeEntryAction(plugin, callNext) {
            this.WM.Log.logHidden("Plugin: " + plugin.constructor.name);
            return plugin["main_" + this.page_type](callNext);
          }
        }, {
          key: "warnInputNeeded",
          value: function warnInputNeeded(plugin, callNext) {
            this.WM.Log.logWarning("Plugin " + plugin.constructor.name + " was not executed because it requires input from its interface.");
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return exports;
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Async": 429, "../../auxiliary/lib.js.generic/dist/CSS": 430 }], 12: [function (require, module, exports) {
    var CSS;

    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    module.exports = function () {
      var changeHeadingNumberStyle, disableEditSummarySubmitOnEnter, hideRollbackLinks, scrollToFirstHeading;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          this.WM = WM;
        }

        _createClass2(exports, [{
          key: "applyGeneralMods",
          value: function applyGeneralMods() {
            if (this.WM.conf.heading_number_style) {
              return changeHeadingNumberStyle(conf['heading_number_style']);
            }
          }
        }, {
          key: "applyEditorMods",
          value: function applyEditorMods() {
            if (this.WM.conf.disable_edit_summary_submit_on_enter) {
              disableEditSummarySubmitOnEnter();
            }
            if (this.WM.conf.scroll_to_first_heading) {
              return scrollToFirstHeading();
            }
          }
        }, {
          key: "applyRecentChangesMods",
          value: function applyRecentChangesMods() {
            if (this.WM.conf.hide_rollback_links) {
              return hideRollbackLinks();
            }
          }
        }, {
          key: "applyContributionsMods",
          value: function applyContributionsMods() {
            if (this.WM.conf.hide_rollback_links) {
              return hideRollbackLinks();
            }
          }
        }]);

        return exports;
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430 }], 13: [function (require, module, exports) {
    var RegEx, Str;

    RegEx = require('../../auxiliary/lib.js.generic/dist/RegEx');

    Str = require('../../auxiliary/lib.js.generic/dist/Str');

    module.exports = function () {
      var prepareRegexpWhitespace, prepareTitleCasing;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          this.WM = WM;
        }

        _createClass2(exports, [{
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

        return exports;
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/RegEx": 434, "../../auxiliary/lib.js.generic/dist/Str": 435 }], 14: [function (require, module, exports) {
    var Str;

    Str = require('../../auxiliary/lib.js.generic/dist/Str');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.WM = WM;
      }

      _createClass2(exports, [{
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

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Str": 435 }], 15: [function (require, module, exports) {
    var CSS, RegEx;

    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    RegEx = require('../../auxiliary/lib.js.generic/dist/RegEx');

    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.WM = WM;
      }

      _createClass2(exports, [{
        key: "_makeUI",
        value: function _makeUI() {
          var UI, conf, date, display, displayLog, hide, legend, logArea, main, main2, nextNode, patt1A, patt1B, patt2A, patt2B, patt3A, patt3B, patt4A, patt4B, patt5A, patt5B, wikiUrls;
          display = true;
          displayLog = true;
          this.WM.Mods.applyGeneralMods();
          if (document.getElementById('editform')) {
            nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            conf = this.WM.Plugins.editor;
            UI = conf.length ? this.WM.Menu._makeUI('editor', conf) : null;
            this.WM.Mods.applyEditorMods();
          } else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            conf = this.WM.Plugins.diff;
            UI = conf.length ? this.WM.Menu._makeUI('diff', conf) : null;
          } else if (document.getElementById('mw-subcategories') || document.getElementById('mw-pages')) {
            nextNode = document.getElementById('bodyContent');
            conf = this.WM.Plugins.bot;
            UI = conf.length ? this.WM.Bot._makeUI(conf, [[document.getElementById('mw-pages'), 0, "Pages"], [document.getElementById('mw-subcategories'), 0, "Subcategories"]]) : null;
            display = false;
          } else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('form')[0].nextSibling;
            conf = this.WM.Plugins.bot;
            UI = conf.length ? this.WM.Bot._makeUI(conf, [[document.getElementById('mw-whatlinkshere-list'), 0, "Pages"]]) : null;
            display = false;
          } else if (document.body.classList.contains('mw-special-LinkSearch') && document.getElementById('bodyContent').getElementsByTagName('ol')[0]) {
            nextNode = document.getElementsByClassName('mw-spcontent')[0];
            conf = this.WM.Plugins.bot;
            UI = conf.length ? this.WM.Bot._makeUI(conf, [[document.getElementById('bodyContent').getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
            display = false;
          } else if (document.getElementById('mw-prefixindex-list-table')) {
            nextNode = document.getElementById('mw-prefixindex-list-table');
            conf = this.WM.Plugins.bot;
            UI = conf.length ? this.WM.Bot._makeUI(conf, [[nextNode.getElementsByTagName('tbody')[0], 0, "Pages"]]) : null;
            display = false;
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
              conf = this.WM.Plugins.special;
              UI = conf.length ? this.WM.Menu._makeUI('special', conf) : null;
            } else if (location.href.search(patt2A) > -1 || location.href.search(patt2B) > -1) {
              nextNode = document.getElementById('mw-content-text').getElementsByTagName('h4')[0];
              conf = this.WM.Plugins.recentchanges;
              UI = conf.length ? this.WM.Filters._makeUI('recentchanges', conf) : null;
              displayLog = false;
              this.WM.Mods.applyRecentChangesMods();
            } else if (location.href.search(patt3A) > -1 || location.href.search(patt3B) > -1) {
              nextNode = document.getElementById('mw-content-text').getElementsByTagName('ul')[0];
              conf = this.WM.Plugins.newpages;
              UI = conf.length ? this.WM.Filters._makeUI('newpages', conf) : null;
              displayLog = false;
            } else if (location.href.search(patt4A) > -1 || location.href.search(patt4B) > -1) {
              nextNode = document.getElementById('mw-content-text').getElementsByTagName('ul')[0];
              conf = this.WM.Plugins.bot;
              UI = conf.length ? this.WM.Bot._makeUI(conf, [[document.getElementById('mw-content-text').getElementsByTagName('ul')[0], 0, "Pages"]]) : null;
              display = false;
            } else if (location.href.search(patt5A) > -1 || location.href.search(patt5B) > -1) {
              this.WM.Mods.applyContributionsMods();
            } else if (document.getElementsByClassName('mw-spcontent').length > 0) {
              nextNode = document.getElementsByClassName('mw-spcontent')[0];
              conf = this.WM.Plugins.bot;
              UI = conf.length ? this.WM.Bot._makeUI(conf, [[nextNode.getElementsByTagName('ol')[0], 0, "Pages"]]) : null;
              display = false;
            } else if (document.getElementsByClassName('mw-allpages-table-chunk').length > 0) {
              nextNode = document.getElementsByClassName('mw-allpages-table-chunk')[0];
              conf = this.WM.Plugins.bot;
              UI = conf.length ? this.WM.Bot._makeUI(conf, [[nextNode.getElementsByTagName('tbody')[0], 0, "Pages"]]) : null;
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
            hide.addEventListener("click", function (event) {
              var wmmain;
              event.preventDefault();
              wmmain = document.getElementById('WikiMonkeyMain');
              if (wmmain.style.display === 'none') {
                wmmain.style.display = 'block';
                return this.innerHTML = '[hide]';
              } else {
                wmmain.style.display = 'none';
                return this.innerHTML = '[show]';
              }
            }, false);
            legend.appendChild(hide);
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
            this.WM.Log.logHidden('Wiki Monkey version: ' + this.WM.VERSION);
            date = new Date();
            this.WM.Log.logHidden('Date: ' + date.toString());
            return this.WM.Log.logHidden('URL: ' + location.href);
          }
        }
      }]);

      return exports;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430, "../../auxiliary/lib.js.generic/dist/RegEx": 434 }], 16: [function (require, module, exports) {
    var A,
        Br,
        Div,
        moment,
        indexOf = [].indexOf;

    var _require4 = require('./libs');

    moment = _require4.moment;
    A = _require4.A;
    Br = _require4.Br;
    Div = _require4.Div;


    module.exports = function () {
      var VERSION_URL;

      var exports = function () {
        function exports(WM) {
          _classCallCheck2(this, exports);

          this.WM = WM;
        }

        _createClass2(exports, [{
          key: "check_and_notify",
          value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var _this19 = this;

              var upstream_version;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!this.should_check()) {
                        _context.next = 9;
                        break;
                      }

                      _context.next = 3;
                      return $.get(VERSION_URL);

                    case 3:
                      upstream_version = _context.sent;

                      if (!(this.WM.VERSION !== upstream_version)) {
                        _context.next = 8;
                        break;
                      }

                      return _context.abrupt("return", this.display_notification(["Version " + upstream_version + " is available.", Br(), A({
                        href: "https://github.com/kynikos/wiki-monkey/wiki/Changelog"
                      }, "Changelog"), Br(), A('Run upgrade', {
                        onclick: function onclick() {
                          return _this19.upgrade(upstream_version);
                        }
                      })]));

                    case 8:
                      return _context.abrupt("return", mw.storage.set('WikiMonkey-last-update-check', moment().format('YYYY-MM-DD')));

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function check_and_notify() {
              return _ref2.apply(this, arguments);
            }

            return check_and_notify;
          }()
        }, {
          key: "should_check",
          value: function should_check() {
            var diff, lastupdcheck, ref;
            lastupdcheck = mw.storage.get('WikiMonkey-last-update-check');
            if (!lastupdcheck) {
              return true;
            }
            diff = moment().diff(moment(lastupdcheck), 'days');

            if (diff >= 1 && (ref = moment().day(), indexOf.call(this.WM.conf.update_check_wdays, ref) >= 0) || diff >= 7) {
              return true;
            }
            return false;
          }
        }, {
          key: "display_notification",
          value: function display_notification(content, optionsoverride) {
            var options;
            options = {
              autoHide: false,
              tag: 'WikiMonkey-upgrade',
              title: 'Wiki Monkey',
              type: 'info'
            };
            $.extend(options, optionsoverride);
            return mw.notification.notify(content, options);
          }
        }, {
          key: "upgrade",
          value: function upgrade(upstream_version) {
            var _this20 = this;

            var page, pagelink, regex;
            page = "User:" + mw.user.getName() + "/common.js";
            pagelink = this.WM.MW.linkArticle(page);
            this.display_notification("Upgrading to version " + upstream_version + "...");

            regex = new RegExp("([\"']https?://[^/]+/kynikos/wiki-monkey/" + ("v)" + mw.RegExp.escape(this.WM.VERSION) + "(/dist/") + "WikiMonkey-[^/]+\\.js[\"'])", 'g');
            return this.WM.MW.api.edit(page, function (revision) {
              var newtext;
              newtext = revision.content.replace(regex, "$1" + upstream_version + "$2");
              if (newtext === revision.content) {
                return Promise.reject(new Error("Could not find Wiki Monkey loader line"));
              }
              return {
                text: newtext,
                summary: "Update Wiki Monkey to version " + upstream_version,
                bot: true
              };
            }).done(function (result) {
              console.log(result);
              return _this20.display_notification(["Upgrade successful: you need to refresh the open wiki page(s) in order to use the new version.", Br(), A({
                href: "https://github.com/kynikos/wiki-monkey/wiki/Changelog"
              }, "Changelog")]);
            }).fail(function (code, error) {
              console.error(code, error);
              return _this20.display_notification(["Could not complete the upgrade to version " + upstream_version + ": ", A({
                onclick: function onclick() {
                  return _this20.upgrade(upstream_version);
                }
              }, "retry"), " in case it was a temporary problem; it is also possible that Wiki Monkey is installed in a non-standard way in ", pagelink, " and the upgrade should be executed manually; finally, it is possible that the upgrade was already launched and completed from another page: in this case refresh the page to verify."], {
                type: 'error'
              });
            });
          }
        }, {
          key: "check_obsolete_config",
          value: function check_obsolete_config() {
            var _this21 = this;

            var blob, confhref, oldconf;

            oldconf = localStorage.getItem("WikiMonkey");
            if (oldconf !== null) {
              blob = new Blob([oldconf], {
                type: 'application/json'
              });
              confhref = window.URL.createObjectURL(blob);
              return this.display_notification(["Wiki Monkey 4.0.0 uses a completely rewritten configuration system. After updating, your old configuration was not automatically imported, but it is still saved in your browser's localStorage. You can decide to export it and then merge it manually, or simply remove it and use the default configuration options.", Br(), A({
                href: "https://github.com/kynikos/wiki-monkey/wiki/Configuration"
              }, "New configuration instructions"), Br(), A({
                href: confhref
              }, "View old configuration"), Br(), A({
                href: confhref,
                download: "wikimonkey_oldconf.json"
              }, "Export old configuration"), Br(), A({
                onclick: function onclick() {
                  localStorage.removeItem("WikiMonkey");
                  return _this21.display_notification("The old configuration was successfully removed.", {
                    autoHide: true
                  });
                }
              }, "Delete old configuration")]);
            }
          }
        }]);

        return exports;
      }();

      ;

      VERSION_URL = 'https://raw.githubusercontent.com/kynikos/wiki-monkey/master/VERSION';

      return exports;
    }();
  }, { "./libs": 19 }], 17: [function (require, module, exports) {
    module.exports = function () {
      function exports(WM) {
        _classCallCheck2(this, exports);

        this.WM = WM;
      }

      _createClass2(exports, [{
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

      return exports;
    }();
  }, {}], 18: [function (require, module, exports) {
    var ArchWiki, Bot, Cat, Diff, Editor, Filters, Interlanguage, Log, MW, Menu, Mods, Parser, Plugin, Tables, UI, Upgrade, WhatLinksHere, mwmodpromise;

    mwmodpromise = mw.loader.using(['mediawiki.api.edit', 'mediawiki.notification']);

    require('./libs');

    ArchWiki = require('./ArchWiki');

    Bot = require('./Bot');

    Cat = require('./Cat');

    Diff = require('./Diff');

    Editor = require('./Editor');

    Filters = require('./Filters');

    Interlanguage = require('./Interlanguage');

    Log = require('./Log');

    Menu = require('./Menu');

    Mods = require('./Mods');

    MW = require('./MW');

    Parser = require('./Parser');

    Tables = require('./Tables');

    UI = require('./UI');

    Upgrade = require('./Upgrade');

    WhatLinksHere = require('./WhatLinksHere');

    var _require5 = require('../plugins/_Plugin');

    Plugin = _require5.Plugin;


    module.exports.WM = function () {
      var WM = function () {
        function WM(wiki_name) {
          _classCallCheck2(this, WM);

          this.init = this.init.bind(this);
          this.wiki_name = wiki_name;

          for (var _len2 = arguments.length, installed_plugins_temp = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            installed_plugins_temp[_key2 - 1] = arguments[_key2];
          }

          this.installed_plugins_temp = installed_plugins_temp;
          this.setup();
          $.when(mwmodpromise, $.ready).done(this.init);
        }

        _createClass2(WM, [{
          key: "setup",
          value: function setup() {
            var PluginSub, error, i, interface_, len, option, pmod, pname, ref, user_config, value;

            user_config = window.wikiMonkeyConfig || window.wikimonkey_config || {};
            for (option in user_config) {
              value = user_config[option];
              if (!(option in this.conf)) {
                continue;
              }
              this.conf[option] = value;
              delete user_config[option];
            }
            this.Plugins = {
              bot: [],
              diff: [],
              editor: [],
              newpages: [],
              recentchanges: [],
              special: []
            };
            ref = this.installed_plugins_temp;
            for (i = 0, len = ref.length; i < len; i++) {
              pmod = ref[i];
              for (pname in pmod) {
                PluginSub = pmod[pname];
                if (!(PluginSub.prototype instanceof Plugin)) {
                  continue;
                }
                try {
                  PluginSub.__configure(this.wiki_name, user_config);
                } catch (error1) {
                  error = error1;

                  if (error.message === "Plugin disabled") {
                    continue;
                  }
                  throw error;
                }
                for (interface_ in this.Plugins) {
                  if (PluginSub.prototype["main_" + interface_]) {
                    this.Plugins[interface_].push(PluginSub);
                  }
                }
              }
            }
            if (!$.isEmptyObject(user_config)) {
              console.warn("Unkown configuration options", user_config);
            }
            return delete this.installed_plugins_temp;
          }
        }, {
          key: "init",
          value: function init() {
            this.ArchWiki = new ArchWiki(this);
            this.Bot = new Bot(this);
            this.Cat = new Cat(this);
            this.Diff = new Diff(this);
            this.Editor = new Editor(this);
            this.Filters = new Filters(this);
            this.Interlanguage = new Interlanguage(this);
            this.Log = new Log(this);
            this.Menu = new Menu(this);
            this.Mods = new Mods(this);
            this.MW = new MW(this);
            this.Parser = new Parser(this);
            this.Tables = new Tables(this);
            this.UI = new UI(this);
            this.Upgrade = new Upgrade(this);
            this.WhatLinksHere = new WhatLinksHere(this);
            this.Upgrade.check_obsolete_config();
            if (this.conf.update_check_wdays) {
              this.Upgrade.check_and_notify();
            }
            return this.UI._makeUI();
          }
        }]);

        return WM;
      }();

      ;

      WM.prototype.VERSION = '4.0.0';

      WM.prototype.conf = {
        default_bot_plugin: "SimpleReplace",
        default_recentchanges_plugin: null,
        default_newpages_plugin: null,
        update_check_wdays: [6],
        hide_rollback_links: true,
        disable_edit_summary_submit_on_enter: true,
        scroll_to_first_heading: false,
        heading_number_style: false
      };

      return WM;
    }();
  }, { "../plugins/_Plugin": 38, "./ArchWiki": 2, "./Bot": 3, "./Cat": 4, "./Diff": 5, "./Editor": 6, "./Filters": 7, "./Interlanguage": 8, "./Log": 9, "./MW": 10, "./Menu": 11, "./Mods": 12, "./Parser": 13, "./Tables": 14, "./UI": 15, "./Upgrade": 16, "./WhatLinksHere": 17, "./libs": 19 }], 19: [function (require, module, exports) {
    var helper, hh, jss, tag;

    require('babel-polyfill');

    hh = require('hyperscript-helpers')(require('hyperscript'));

    for (tag in hh) {
      helper = hh[tag];

      module.exports[tag.charAt(0).toUpperCase() + tag.slice(1)] = helper;
    }

    module.exports.moment = require('moment');

    jss = require('jss').default;

    jss.setup(require('jss-preset-default').default());

    module.exports.jss = jss;
  }, { "babel-polyfill": 39, "hyperscript": 373, "hyperscript-helpers": 372, "jss": 399, "jss-preset-default": 388, "moment": 423 }], 20: [function (require, module, exports) {
    var Plugin,
        indexOf = [].indexOf;

    var _require6 = require('./_Plugin');

    Plugin = _require6.Plugin;


    module.exports.ArchWikiFixHeader = function () {
      var ArchWikiFixHeader = function (_Plugin) {
        _inherits(ArchWikiFixHeader, _Plugin);

        function ArchWikiFixHeader() {
          _classCallCheck2(this, ArchWikiFixHeader);

          return _possibleConstructorReturn(this, (ArchWikiFixHeader.__proto__ || Object.getPrototypeOf(ArchWikiFixHeader)).apply(this, arguments));
        }

        _createClass2(ArchWikiFixHeader, [{
          key: "main_editor",
          value: function main_editor(callNext) {
            var b, behaviorswitches, bslist, bswitch, cat, categories, catlang, catlink, catlinks, catlist, cattext, cleantitle, content, contentId, displaytitle, dlct, dt, firstChar, fulllink, header, i, interlanguage, iwlinks, iwlist, j, k, l, language, lct, len, len1, len2, len3, link, linklang, linktext, linktitle, lowercasetitle, newText, ref, ref1, source, tempcontent, titlemod, titlemods;
            source = this.WM.Editor.readSource();
            language = this.WM.ArchWiki.detectLanguage(this.WM.Editor.getTitle())[1];
            header = "";
            content = source;

            content = content.replace(/^\s*<noinclude>/, "");
            if (content !== source) {
              header += "<noinclude>\n";
            }

            displaytitle = this.WM.Parser.findVariables(content, "DISPLAYTITLE");
            lowercasetitle = this.WM.Parser.findTemplates(content, "Lowercase title");
            titlemods = displaytitle.concat(lowercasetitle);
            titlemods.sort(function (a, b) {
              return a.index - b.index;
            });
            tempcontent = "";
            contentId = 0;
            for (i = 0, len = titlemods.length; i < len; i++) {
              titlemod = titlemods[i];
              tempcontent += content.substring(contentId, titlemod.index);
              contentId = titlemod.index + titlemod.length;
            }
            tempcontent += content.substring(contentId);
            content = tempcontent;
            dt = displaytitle.pop();
            lct = lowercasetitle.pop();
            dlct = "";
            if (dt && !lct) {
              dlct = "{{DISPLAYTITLE:" + dt.value + "}}";
            } else if (!dt && lct) {
              dlct = "{{Lowercase title}}";
            } else if (dt && lct) {
              dlct = dt.index < lct.index ? "{{Lowercase title}}" : "{{DISPLAYTITLE:" + dt.value + "}}";
            }
            if (displaytitle.length || lowercasetitle.length) {
              this.WM.Log.logWarning("Found multiple instances of {{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last one has been used, the others have been deleted");
            }

            behaviorswitches = this.WM.Parser.findBehaviorSwitches(content);
            bslist = [];
            tempcontent = "";
            contentId = 0;
            for (b = j = 0, len1 = behaviorswitches.length; j < len1; b = ++j) {
              bswitch = behaviorswitches[b];
              if ((ref = bswitch.match[1]) === "TOC" || ref === "START" || ref === "END") {
                behaviorswitches.splice(b, 1);
              } else {
                if (ref1 = bswitch.match[0], indexOf.call(bslist, ref1) < 0) {
                  bslist.push(bswitch.match[0]);
                } else {
                  this.WM.Log.logWarning("Removed duplicate of " + bswitch.match[0]);
                }
                tempcontent += content.substring(contentId, bswitch.index);
                contentId = bswitch.index + bswitch.length;
              }
            }
            tempcontent += content.substring(contentId);
            content = tempcontent;
            if (!dlct && bslist.length) {
              header += bslist.join(" ") + "\n";
            } else if (dlct && !bslist.length) {
              header += dlct + "\n";
            } else if (dlct && bslist.length) {
              header += dlct + " " + bslist.join(" ") + "\n";
            }

            categories = this.WM.Parser.findCategories(content);
            catlist = [];
            catlinks = [];
            tempcontent = "";
            contentId = 0;
            for (k = 0, len2 = categories.length; k < len2; k++) {
              cat = categories[k];
              if (cat.fragment) {
                this.WM.Log.logWarning(this.WM.Log.linkToWikiPage(cat.link, cat.rawLink) + " contains a fragment reference, but it doesn't make sense in categories and will be removed");
              }
              cleantitle = this.WM.Parser.squashContiguousWhitespace(cat.title);
              cattext = "Category:" + cleantitle;

              catlang = this.WM.ArchWiki.detectLanguage(cattext)[1];
              catlink = "[[" + cattext + (cat.anchor ? "|" + cat.anchor : "") + "]]";
              if (language !== catlang) {
                this.WM.Log.logWarning(this.WM.Log.linkToWikiPage(cat.link, cattext) + " belongs to a different language than the one of the title (" + language + ")");
              }
              if (catlist.indexOf(cattext) < 0) {
                catlist.push(cattext);
                catlinks.push(catlink);
              } else {
                this.WM.Log.logWarning("Removed duplicate of " + this.WM.Log.linkToWikiPage(cat.link, cattext));
              }
              tempcontent += content.substring(contentId, cat.index);
              contentId = cat.index + cat.length;
            }
            if (catlist.length) {
              header += catlinks.join("\n") + "\n";
            } else {
              this.WM.Log.logWarning("The article is not categorized");
            }
            tempcontent += content.substring(contentId);
            content = tempcontent;

            interlanguage = this.WM.ArchWiki.findAllInterlanguageLinks(content);
            iwlist = [];
            iwlinks = [];
            tempcontent = "";
            contentId = 0;
            for (l = 0, len3 = interlanguage.length; l < len3; l++) {
              link = interlanguage[l];
              if (link.anchor) {
                this.WM.Log.logWarning(link.rawLink + " contains an alternative text, but it doesn't make sense in interlanguage links and will be removed");
              }

              linktitle = link.title;
              linklang = link.namespace;
              linktext = linklang + ":" + linktitle;
              fulllink = "[[" + linktext + (link.fragment ? "#" + link.fragment : "") + "]]";
              if (iwlist.indexOf(linktext) < 0) {
                iwlist.push(linktext);
                iwlinks.push(fulllink);
              } else {
                this.WM.Log.logWarning("Removed duplicate of " + linktext);
              }
              tempcontent += content.substring(contentId, link.index);
              contentId = link.index + link.length;
            }
            if (iwlist.length) {
              iwlinks.sort();
              header += iwlinks.join("\n") + "\n";
            }
            tempcontent += content.substring(contentId);
            content = tempcontent;
            firstChar = content.search(/[^\s]/);
            content = content.substr(firstChar);
            newText = header + content;
            if (newText !== source) {
              this.WM.Editor.writeSource(newText);
              this.WM.Log.logInfo("Fixed header");
            }
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return ArchWikiFixHeader;
      }(Plugin);

      ;

      ArchWikiFixHeader.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Fix header"]
      };

      return ArchWikiFixHeader;
    }();
  }, { "./_Plugin": 38 }], 21: [function (require, module, exports) {
    var Plugin;

    var _require7 = require('./_Plugin');

    Plugin = _require7.Plugin;


    module.exports.ArchWikiFixHeadings = function () {
      var ArchWikiFixHeadings = function (_Plugin2) {
        _inherits(ArchWikiFixHeadings, _Plugin2);

        function ArchWikiFixHeadings() {
          _classCallCheck2(this, ArchWikiFixHeadings);

          return _possibleConstructorReturn(this, (ArchWikiFixHeadings.__proto__ || Object.getPrototypeOf(ArchWikiFixHeadings)).apply(this, arguments));
        }

        _createClass2(ArchWikiFixHeadings, [{
          key: "main_editor",
          value: function main_editor(callNext) {
            var i, increaseLevel, info, len, newtext, prevId, ref, section, source;
            source = this.WM.Editor.readSource();
            info = this.WM.Parser.findSectionHeadings(source);
            if (this.WM.Editor.isSection()) {
              increaseLevel = info.minLevel - 1;
            } else {
              if (info.maxTocLevel < 6) {
                increaseLevel = 1;
              } else {
                increaseLevel = 0;
                this.WM.Log.logWarning("There are 6 levels of headings, it has been necessary to start creating them from level 1 although usually it is suggested to start from level 2");
              }
            }
            newtext = "";
            prevId = 0;
            ref = info.sections;
            for (i = 0, len = ref.length; i < len; i++) {
              section = ref[i];
              newtext += source.substring(prevId, section.index);
              newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
              newtext += section.rawheading;
              newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
              prevId = section.index + section.length0;
            }
            newtext += source.substr(prevId);
            if (newtext !== source) {
              this.WM.Editor.writeSource(newtext);
              this.WM.Log.logInfo("Fixed section headings");
            }
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return ArchWikiFixHeadings;
      }(Plugin);

      ;

      ArchWikiFixHeadings.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Fix headings"]
      };

      return ArchWikiFixHeadings;
    }();
  }, { "./_Plugin": 38 }], 22: [function (require, module, exports) {
    var Plugin;

    var _require8 = require('./_Plugin');

    Plugin = _require8.Plugin;


    module.exports.ArchWikiFixLinks = function () {
      var ArchWikiFixLinks = function (_Plugin3) {
        _inherits(ArchWikiFixLinks, _Plugin3);

        function ArchWikiFixLinks() {
          _classCallCheck2(this, ArchWikiFixLinks);

          return _possibleConstructorReturn(this, (ArchWikiFixLinks.__proto__ || Object.getPrototypeOf(ArchWikiFixLinks)).apply(this, arguments));
        }

        _createClass2(ArchWikiFixLinks, [{
          key: "doReplace",
          value: function doReplace(txt) {
            var L, match, newText, prevId, re;

            re = /http:\/\/([a-z]+\.)?archlinux\.org(?!\.[a-z])/ig;
            txt = txt.replace(re, 'https://$1archlinux.org');

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
              this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to wiki.archlinux.org");
            }

            re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/([^\]]+?) (.+?)\]/ig;
            txt = txt.replace(re, '[[wikipedia:$1|$2]]');
            re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/(.+?)\]/ig;
            txt = txt.replace(re, '[[wikipedia:$1]]');
            re = /https?:\/\/en\.wikipedia\.org\/wiki\/([^\s]+)/ig;
            txt = txt.replace(re, '[[wikipedia:$1]]');
            re = /https?:\/\/([a-z]+?)\.wikipedia\.org(?!\.)/ig;
            if (re.test(txt)) {
              this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to Wikipedia");
            }

            re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/? +(.+?)?\]/ig;
            newText = '';
            prevId = 0;
            while (true) {
              match = re.exec(txt);
              if (match) {
                if (match[1] === match[2]) {
                  L = match[0].length;
                  newText += txt.substring(prevId, re.lastIndex - L) + '{{Pkg|' + match[1] + '}}';
                  prevId = re.lastIndex;
                }
              } else {
                break;
              }
            }
            newText += txt.substr(prevId);
            txt = newText;
            re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/?\]/ig;
            txt = txt.replace(re, '{{Pkg|$1}}');
            re = /([^\[])https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s\/]+)\/?/ig;
            txt = txt.replace(re, '$1{{Pkg|$2}}');
            re = /https?:\/\/(?:www\.)?archlinux\.org\/packages(?!\/?\s)/ig;
            if (re.test(txt)) {
              this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to archlinux.org/packages");
            }

            re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/? +(.+?)?\]/ig;
            newText = '';
            prevId = 0;
            while (true) {
              match = re.exec(txt);
              if (match) {
                if (match[1] === match[2]) {
                  L = match[0].length;
                  newText += txt.substring(prevId, re.lastIndex - L) + '{{AUR|' + match[1] + '}}';
                  prevId = re.lastIndex;
                }
              } else {
                break;
              }
            }
            newText += txt.substr(prevId);
            txt = newText;
            re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/?\]/ig;
            txt = txt.replace(re, '{{AUR|$1}}');
            re = /([^\[])https?:\/\/aur\.archlinux\.org\/packages\/([^\s\/]+)\/?/ig;
            txt = txt.replace(re, '$1{{AUR|$2}}');
            re = /https?:\/\/aur\.archlinux\.org(?!(?:\.|(?:\/?packages)?\/?\s))/ig;
            if (re.test(txt)) {
              this.WM.Log.logWarning("It hasn't been possible to convert some links to aur.archlinux.org (try the \"Fix old AUR links\" function, if installed)");
            }

            re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/? +(.+?)?\]/ig;
            newText = '';
            prevId = 0;
            while (true) {
              match = re.exec(txt);
              if (match) {
                if (match[1] === match[2]) {
                  L = match[0].length;
                  newText += txt.substring(prevId, re.lastIndex - L) + '{{Bug|' + match[1] + '}}';
                  prevId = re.lastIndex;
                }
              } else {
                break;
              }
            }
            newText += txt.substr(prevId);
            txt = newText;
            re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/?\]/ig;
            txt = txt.replace(re, '{{Bug|$1}}');
            re = /([^\[])https?:\/\/bugs\.archlinux\.org\/task\/([^\s\/]+)\/?/ig;
            txt = txt.replace(re, '$1{{Bug|$2}}');
            re = /https?:\/\/bugs\.archlinux\.org\/task/ig;
            if (re.test(txt)) {
              this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to bugs.archlinux.org/task");
            }
            return txt;
          }
        }, {
          key: "main_editor",
          value: function main_editor(callNext) {
            var newtext, source;
            source = this.WM.Editor.readSource();
            newtext = this.doReplace(source);
            if (newtext !== source) {
              this.WM.Editor.writeSource(newtext);
              this.WM.Log.logInfo("Fixed links");
            } else {
              this.WM.Log.logInfo("No fixable links found");
            }
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return ArchWikiFixLinks;
      }(Plugin);

      ;

      ArchWikiFixLinks.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Fix external links"]
      };

      return ArchWikiFixLinks;
    }();
  }, { "./_Plugin": 38 }], 23: [function (require, module, exports) {
    var CSS, Plugin;

    var _require9 = require('./_Plugin');

    Plugin = _require9.Plugin;


    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    module.exports.ArchWikiNPFilter = function () {
      var ArchWikiNPFilter = function (_Plugin4) {
        _inherits(ArchWikiNPFilter, _Plugin4);

        function ArchWikiNPFilter() {
          _classCallCheck2(this, ArchWikiNPFilter);

          return _possibleConstructorReturn(this, (ArchWikiNPFilter.__proto__ || Object.getPrototypeOf(ArchWikiNPFilter)).apply(this, arguments));
        }

        _createClass2(ArchWikiNPFilter, [{
          key: "main_newpages",
          value: function main_newpages() {
            var contentDiv, i, language, len, li, liList, link, pureTitle, ul;
            CSS.addStyleElement("#mw-content-text > h5 {background-color:#afa;}");
            contentDiv = $('#mw-content-text');
            ul = contentDiv.find('ul').first();
            liList = ul.children('li');
            for (i = 0, len = liList.length; i < len; i++) {
              li = liList[i];
              link = $(li).find('a.mw-newpages-pagename').first();

              var _WM$ArchWiki$detectLa = this.WM.ArchWiki.detectLanguage(link[0].title);

              var _WM$ArchWiki$detectLa2 = _slicedToArray(_WM$ArchWiki$detectLa, 2);

              pureTitle = _WM$ArchWiki$detectLa2[0];
              language = _WM$ArchWiki$detectLa2[1];

              if (language !== this.conf.default_language) {
                this.moveArticle(contentDiv, li, language);
              }
            }
            return this.WM.Log.logInfo("Grouped articles by language");
          }
        }, {
          key: "moveArticle",
          value: function moveArticle(contentDiv, li, language) {
            var HLang, i, langFound, langHs, len, ul;
            langHs = contentDiv.children('h5');
            langFound = false;
            for (i = 0, len = langHs.length; i < len; i++) {
              HLang = langHs[i];
              if (HLang.innerHTML === language) {
                ul = $(HLang).next().append(li);
                langFound = true;
                break;
              }
            }
            if (!langFound) {
              return contentDiv.append($('<h5>').text(language), $('<ul>').append(li));
            }
          }
        }]);

        return ArchWikiNPFilter;
      }(Plugin);

      ;

      ArchWikiNPFilter.conf_default = {
        enabled: true,
        filter_label: "Default filter",
        default_language: "English"
      };

      return ArchWikiNPFilter;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430, "./_Plugin": 38 }], 24: [function (require, module, exports) {
    var Plugin;

    var _require10 = require('./_Plugin');

    Plugin = _require10.Plugin;


    module.exports.ArchWikiNewTemplates = function () {
      var ArchWikiNewTemplates = function (_Plugin5) {
        _inherits(ArchWikiNewTemplates, _Plugin5);

        function ArchWikiNewTemplates() {
          _classCallCheck2(this, ArchWikiNewTemplates);

          return _possibleConstructorReturn(this, (ArchWikiNewTemplates.__proto__ || Object.getPrototypeOf(ArchWikiNewTemplates)).apply(this, arguments));
        }

        _createClass2(ArchWikiNewTemplates, [{
          key: "main_editor",
          value: function main_editor(callNext) {
            var i, len, newtext, re10, re11, re12, re13, re14, re15, re16, re8, re9, source, test, tests;
            source = this.WM.Editor.readSource();
            newtext = source;
            re8 = /<pre>(((?!<(pre|nowiki)>)[^\=\|])*?((?!<(pre|nowiki)>)[^\=\|\}]))<\/pre>/ig;
            re9 = /<pre>(((?!<(pre|nowiki)>)[^\|])*?((?!<(pre|nowiki)>)[^\|\}]))<\/pre>/ig;
            re10 = /<pre>(\n*((?!<(pre|nowiki)>).\n*)+?)<\/pre>/ig;
            re11 = /<code>(((?!<(code|nowiki)>)[^\=\|\n])*?((?!<(code|nowiki)>)[^\=\|\}\n]))<\/code>/ig;
            re12 = /<code>(((?!<(code|nowiki)>)[^\|\n])*?((?!<(code|nowiki)>)[^\|\}\n]))<\/code>/ig;
            re13 = /<code>(((?!<(code|nowiki)>)[^\n])+?)<\/code>/ig;
            re14 = /<tt>(((?!<(tt|nowiki)>)[^\=\|\n])*?((?!<(tt|nowiki)>)[^\=\|\}\n]))<\/tt>/ig;
            re15 = /<tt>(((?!<(tt|nowiki)>)[^\|\n])*?((?!<(tt|nowiki)>)[^\|\}\n]))<\/tt>/ig;
            re16 = /<tt>(((?!<(tt|nowiki)>)[^\n])+?)<\/tt>/ig;
            newtext = newtext.replace(re8, '{{bc|$1}}');
            newtext = newtext.replace(re9, '{{bc|1=$1}}');
            newtext = newtext.replace(re10, '{{bc|<nowiki>$1</nowiki>}}');
            newtext = newtext.replace(re11, '{{ic|$1}}');
            newtext = newtext.replace(re12, '{{ic|1=$1}}');
            newtext = newtext.replace(re13, '{{ic|<nowiki>$1</nowiki>}}');
            newtext = newtext.replace(re14, '{{ic|$1}}');
            newtext = newtext.replace(re15, '{{ic|1=$1}}');
            newtext = newtext.replace(re16, '{{ic|<nowiki>$1</nowiki>}}');
            if (newtext !== source) {
              this.WM.Editor.writeSource(newtext);
              this.WM.Log.logInfo("Turned HTML tags into proper templates");
            }
            tests = [['&lt;pre>', newtext.match(/<pre/ig)], ['&lt;code>', newtext.match(/<code/ig)], ['&lt;tt>', newtext.match(/<tt/ig)]];
            for (i = 0, len = tests.length; i < len; i++) {
              test = tests[i];
              if (test[1]) {
                this.WM.Log.logWarning(test[1].length + ' ' + test[0] + ' instances require manual intervention');
              }
            }
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return ArchWikiNewTemplates;
      }(Plugin);

      ;

      ArchWikiNewTemplates.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Use code templates"]
      };

      return ArchWikiNewTemplates;
    }();
  }, { "./_Plugin": 38 }], 25: [function (require, module, exports) {
    var CSS, Plugin;

    var _require11 = require('./_Plugin');

    Plugin = _require11.Plugin;


    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    module.exports.ArchWikiRCFilter = function () {
      var ArchWikiRCFilter = function (_Plugin6) {
        _inherits(ArchWikiRCFilter, _Plugin6);

        function ArchWikiRCFilter() {
          _classCallCheck2(this, ArchWikiRCFilter);

          return _possibleConstructorReturn(this, (ArchWikiRCFilter.__proto__ || Object.getPrototypeOf(ArchWikiRCFilter)).apply(this, arguments));
        }

        _createClass2(ArchWikiRCFilter, [{
          key: "main_recentchanges",
          value: function main_recentchanges() {
            var articleTable, groupDiv, h4, h4s, j, k, language, len, len1, link, pureTitle, ref;
            h4s = $('#mw-content-text .mw-changeslist > h4');
            if (h4s.eq(0).next()[0].localName.toLowerCase() !== 'div') {
              return this.WM.Log.logError("This filter is designed to work on top of MediaWiki's filter, which you can enable in your user preferences.");
            } else {
              CSS.addStyleElement("#mw-content-text > div > h4 {background-color:#aaf;} #mw-content-text > div > div > h5 {background-color:#afa;}");
              for (j = 0, len = h4s.length; j < len; j++) {
                h4 = h4s[j];
                groupDiv = $(h4).next();
                ref = groupDiv.children('table');
                for (k = 0, len1 = ref.length; k < len1; k++) {
                  articleTable = ref[k];
                  link = $(articleTable).find('a.mw-changeslist-title').first();
                  if (link[0]) {
                    var _WM$ArchWiki$detectLa3 = this.WM.ArchWiki.detectLanguage(link[0].title);

                    var _WM$ArchWiki$detectLa4 = _slicedToArray(_WM$ArchWiki$detectLa3, 2);

                    pureTitle = _WM$ArchWiki$detectLa4[0];
                    language = _WM$ArchWiki$detectLa4[1];

                    if (language !== this.conf.default_language) {
                      this.moveArticle(groupDiv, articleTable, language);
                    }
                  }
                }
              }
              return this.WM.Log.logInfo("Grouped articles by language");
            }
          }
        }, {
          key: "moveArticle",
          value: function moveArticle(groupDiv, articleTable, language) {
            var HLang, i, j, langFound, langHs, len;
            langHs = groupDiv.children('h5');
            langFound = false;
            for (i = j = 0, len = langHs.length; j < len; i = ++j) {
              HLang = langHs[i];
              if (HLang.innerHTML === language) {
                if (i + 1 < langHs.length) {
                  langHs.eq(i + 1).before(articleTable);
                } else {
                  groupDiv.append(articleTable);
                }
                langFound = true;
                break;
              }
            }
            if (!langFound) {
              return groupDiv.append($('<h5>').text(language), articleTable);
            }
          }
        }]);

        return ArchWikiRCFilter;
      }(Plugin);

      ;

      ArchWikiRCFilter.conf_default = {
        enabled: true,
        filter_label: "Default filter",
        default_language: "English"
      };

      return ArchWikiRCFilter;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430, "./_Plugin": 38 }], 26: [function (require, module, exports) {
    var CSS,
        HTTP,
        Plugin,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    };

    var _require12 = require('./_Plugin');

    Plugin = _require12.Plugin;


    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    HTTP = require('../../auxiliary/lib.js.generic/dist/HTTP');

    ref = module.exports.ArchWikiSaveTalk = function () {
      var ArchWikiSaveTalk = function (_Plugin7) {
        _inherits(ArchWikiSaveTalk, _Plugin7);

        function ArchWikiSaveTalk() {
          _classCallCheck2(this, ArchWikiSaveTalk);

          var _this28 = _possibleConstructorReturn(this, (ArchWikiSaveTalk.__proto__ || Object.getPrototypeOf(ArchWikiSaveTalk)).apply(this, arguments));

          _this28.mainGetEndTimestamp = _this28.mainGetEndTimestamp.bind(_this28);
          _this28.mainWrite = _this28.mainWrite.bind(_this28);
          _this28.mainEnd = _this28.mainEnd.bind(_this28);
          return _this28;
        }

        _createClass2(ArchWikiSaveTalk, [{
          key: "makeUI",
          value: function makeUI() {
            var article, link;
            CSS.addStyleElement("#WikiMonkey-ArchWikiSaveTalk {margin-left:0.33em;}");
            article = this.conf.page;
            link = document.createElement('a');
            link.id = "WikiMonkey-ArchWikiSaveTalk";
            link.href = "/index.php/" + article;
            link.innerHTML = article;
            return link;
          }
        }, {
          key: "main_diff",
          value: function main_diff(callNext) {
            var article, summary;
            article = this.conf.page;
            summary = this.conf.edit_summary;
            this.WM.Log.logInfo('Appending diff to ' + this.WM.Log.linkToWikiPage(article, article) + " ...");
            return this.WM.Diff.getEndTimestamp(this.mainGetEndTimestamp, [article, summary, callNext]);
          }
        }, {
          key: "mainGetEndTimestamp",
          value: function mainGetEndTimestamp(enddate, args) {
            var article, callNext, summary;
            boundMethodCheck(this, ref);
            article = args[0];
            summary = args[1];
            callNext = args[2];
            return this.WM.MW.callQueryEdit(article, this.mainWrite, [summary, enddate, callNext]);
          }
        }, {
          key: "mainWrite",
          value: function mainWrite(article, source, timestamp, edittoken, args) {
            var callNext, enddate, newtext, pEnddate, summary, title;
            boundMethodCheck(this, ref);
            summary = args[0];
            enddate = args[1];
            callNext = args[2];
            title = HTTP.getURIParameter(null, 'title');
            pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8);
            newtext = this.WM.Tables.appendRow(source, "<!-- REPLY TABLE -->", ["[" + location.href + " " + title + "]", pEnddate]);
            return this.WM.MW.callAPIPost({
              action: "edit",
              bot: "1",
              title: article,
              summary: summary,
              text: newtext,
              basetimestamp: timestamp,
              token: edittoken
            }, this.mainEnd, [article, callNext], null);
          }
        }, {
          key: "mainEnd",
          value: function mainEnd(res, args) {
            var article, callNext;
            boundMethodCheck(this, ref);
            article = args[0];
            callNext = args[1];
            if (res.edit && res.edit.result === 'Success') {
              this.WM.Log.logInfo('Diff correctly appended to ' + this.WM.Log.linkToWikiPage(article, article));
              if (callNext) {
                return callNext();
              }
            } else {
              return this.WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
            }
          }
        }]);

        return ArchWikiSaveTalk;
      }(Plugin);

      ;

      ArchWikiSaveTalk.conf_default = {
        enabled: false,
        diff_menu: ["Save discussion"],
        page: null,
        edit_summary: "add discussion"
      };

      return ArchWikiSaveTalk;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430, "../../auxiliary/lib.js.generic/dist/HTTP": 432, "./_Plugin": 38 }], 27: [function (require, module, exports) {
    var Plugin,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    };

    var _require13 = require('./_Plugin');

    Plugin = _require13.Plugin;


    ref = module.exports.ArchWikiSortContacts = function () {
      var endMark, regExp, startMark;

      var ArchWikiSortContacts = function (_Plugin8) {
        _inherits(ArchWikiSortContacts, _Plugin8);

        function ArchWikiSortContacts() {
          _classCallCheck2(this, ArchWikiSortContacts);

          var _this29 = _possibleConstructorReturn(this, (ArchWikiSortContacts.__proto__ || Object.getPrototypeOf(ArchWikiSortContacts)).apply(this, arguments));

          _this29.parseList = _this29.parseList.bind(_this29);
          _this29.iterateUsers = _this29.iterateUsers.bind(_this29);
          _this29.storeUserContribs = _this29.storeUserContribs.bind(_this29);
          _this29.updateList = _this29.updateList.bind(_this29);
          _this29.writePage = _this29.writePage.bind(_this29);
          return _this29;
        }

        _createClass2(ArchWikiSortContacts, [{
          key: "main_special",
          value: function main_special(callNext) {
            return this.iteratePages(-1, callNext);
          }
        }, {
          key: "iteratePages",
          value: function iteratePages(pageid, callNext) {
            var inactiveIntro, inactiveLimit, page, pconf, recentDays, summary;
            pageid++;
            pconf = this.conf.pages[pageid];
            if (pconf) {
              page = pconf.title;
              recentDays = pconf.recent_days;
              inactiveLimit = pconf.inactive_limit;
              inactiveIntro = pconf.inactive_message;
              summary = this.conf.edit_summary;
              this.WM.Log.logInfo("Sorting " + this.WM.Log.linkToWikiPage(page, page) + " ...");
              return this.WM.MW.callQueryEdit(page, this.parseList, [recentDays, inactiveLimit, inactiveIntro, summary, callNext, pageid]);
            } else if (callNext) {
              return callNext();
            }
          }
        }, {
          key: "parseList",
          value: function parseList(title, source, timestamp, edittoken, args) {
            var callNext, date, endList, inactiveIntro, inactiveLimit, pageid, recentDays, startList, summary, ucend, ucstart, users, usersArray;
            boundMethodCheck(this, ref);
            recentDays = args[0];
            inactiveLimit = args[1];
            inactiveIntro = args[2];
            summary = args[3];
            callNext = args[4];
            pageid = args[5];
            startList = source.indexOf(startMark);
            endList = source.indexOf(endMark);
            if (startList > -1 && endList > -1) {
              startList += startMark.length;
              date = new Date();
              ucstart = Math.floor(Date.now() / 1000);
              ucend = ucstart - 86400 * recentDays;
              users = {
                active: [],
                inactive: []
              };
              usersArray = source.substring(startList, endList).split("\n");
              return this.iterateUsers(usersArray, -1, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext, pageid);
            } else {
              return this.WM.Log.logError("Cannot find the needed marks");
            }
          }
        }, {
          key: "iterateUsers",
          value: function iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext, pageid) {
            var match, ucuser, userString;
            boundMethodCheck(this, ref);
            index++;
            if (index < usersArray.length) {
              userString = usersArray[index];
              match = regExp.exec(userString);
              if (match) {
                ucuser = match[1].charAt(0).toUpperCase() + match[1].substr(1);
                if (match[2]) {
                  ucuser += "|" + match[2].charAt(0).toUpperCase() + match[2].substr(1);
                }
                this.WM.Log.logInfo("Querying " + ucuser + " ...");
                return this.WM.MW.getUserContribs(ucuser, ucstart, ucend, this.storeUserContribs, [usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext, pageid]);
              } else if (userString !== "" && userString.indexOf(inactiveIntro) !== 0) {
                return this.WM.Log.logError("An entry in the list may not be correctly " + "formatted");
              } else {
                return this.iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext, pageid);
              }
            } else {
              return this.updateList(users, title, source, startList, endList, timestamp, edittoken, inactiveIntro, summary, callNext, pageid);
            }
          }
        }, {
          key: "storeUserContribs",
          value: function storeUserContribs(results, args) {
            var callNext, edits, edittoken, endList, inactiveIntro, inactiveLimit, index, pageid, source, startList, summary, timestamp, title, ucend, ucstart, users, usersArray;
            boundMethodCheck(this, ref);
            usersArray = args[0];
            index = args[1];
            ucstart = args[2];
            ucend = args[3];
            users = args[4];
            title = args[5];
            source = args[6];
            startList = args[7];
            endList = args[8];
            timestamp = args[9];
            edittoken = args[10];
            inactiveLimit = args[11];
            inactiveIntro = args[12];
            summary = args[13];
            callNext = args[14];
            pageid = args[15];
            edits = results.length;
            if (edits < inactiveLimit) {
              users.inactive.push({
                "text": usersArray[index],
                "edits": edits
              });
            } else {
              users.active.push({
                "text": usersArray[index],
                "edits": edits
              });
            }
            return this.iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext, pageid);
          }
        }, {
          key: "updateList",
          value: function updateList(users, title, source, startList, endList, timestamp, edittoken, inactiveIntro, summary, callNext, pageid) {
            var i, j, len, len1, newList, newText, ref1, ref2, sorter, user;
            boundMethodCheck(this, ref);
            sorter = function sorter(a, b) {
              if (a.edits < b.edits) {
                return 1;
              } else if (a.edits > b.edits) {
                return -1;
              } else {
                return 0;
              }
            };
            users.active.sort(sorter);
            users.inactive.sort(sorter);
            newList = "\n";
            ref1 = users.active;
            for (i = 0, len = ref1.length; i < len; i++) {
              user = ref1[i];
              newList += user.text + "\n";
            }
            if (users.inactive.length > 0) {
              newList += "\n" + inactiveIntro + "\n\n";
              ref2 = users.inactive;
              for (j = 0, len1 = ref2.length; j < len1; j++) {
                user = ref2[j];
                newList += user.text + "\n";
              }
            }
            newText = source.substring(0, startList) + newList + source.substring(endList);
            if (newText !== source) {
              return this.WM.MW.callAPIPost({
                action: "edit",
                bot: "1",
                minor: "1",
                title: title,
                summary: summary,
                text: newText,
                b1asetimestamp: timestamp,
                token: edittoken
              }, this.writePage, [title, callNext, pageid], null);
            } else {
              this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(title, title) + " was already up to date");
              return this.iteratePages(pageid, callNext);
            }
          }
        }, {
          key: "writePage",
          value: function writePage(res, args) {
            var callNext, pageid, title;
            boundMethodCheck(this, ref);
            title = args[0];
            callNext = args[1];
            pageid = args[2];
            if (res.edit && res.edit.result === 'Success') {
              this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(title, title) + " was correctly updated");
              return this.iteratePages(pageid, callNext);
            } else {
              return this.WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
            }
          }
        }]);

        return ArchWikiSortContacts;
      }(Plugin);

      ;

      startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->";

      endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";

      regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" + "(?: \\<!-- associated bot: (.+?) -->.*)?$", "");

      ArchWikiSortContacts.conf_default = {
        enabled: false,
        special_menu: ["Sort staff contacts"],
        edit_summary: "automatically sort list according to recent activity",
        pages: [{
          title: "ArchWiki:Administrators",
          recent_days: 30,
          inactive_limit: 30,
          inactive_message: "The following Administrators are currently inactive (less than 30 edits in the last 30 days):"
        }, {
          title: "ArchWiki:Maintainers",
          recent_days: 30,
          inactive_limit: 10,
          inactive_message: "The following Maintainers are currently inactive (less than 10 edits in the last 30 days):"
        }]
      };

      return ArchWikiSortContacts;
    }();
  }, { "./_Plugin": 38 }], 28: [function (require, module, exports) {
    var Plugin;

    var _require14 = require('./_Plugin');

    Plugin = _require14.Plugin;


    module.exports.ArchWikiSummaryToRelated = function () {
      var ArchWikiSummaryToRelated = function (_Plugin9) {
        _inherits(ArchWikiSummaryToRelated, _Plugin9);

        function ArchWikiSummaryToRelated() {
          _classCallCheck2(this, ArchWikiSummaryToRelated);

          return _possibleConstructorReturn(this, (ArchWikiSummaryToRelated.__proto__ || Object.getPrototypeOf(ArchWikiSummaryToRelated)).apply(this, arguments));
        }

        _createClass2(ArchWikiSummaryToRelated, [{
          key: "main_editor",
          value: function main_editor(callNext) {
            var asend, asends, asstart, asstarts, aswiki, aswikis, i, language, len, link, newText, source, suffix;
            source = this.WM.Editor.readSource();
            asstarts = this.WM.Parser.findTemplates(source, 'Article summary start');
            asends = this.WM.Parser.findTemplates(source, 'Article summary end');
            if (asstarts.length && asends.length && asstarts[0].index < asends[0].index) {
              asstart = asstarts[0];
              asend = asends[0];
              newText = source.substring(0, asstart.index).trim();
              aswikis = this.WM.Parser.findTemplates(source, 'Article summary wiki');
              if (aswikis.length) {
                language = this.WM.ArchWiki.detectLanguage(this.WM.Editor.getTitle())[1];
                suffix = language === "English" ? "" : " (" + language + ")";
                newText += "\n{{Related articles start" + suffix + "}}\n";
                for (i = 0, len = aswikis.length; i < len; i++) {
                  aswiki = aswikis[i];
                  link = aswiki.arguments[0].value;
                  newText += "{{Related|" + link + "}}\n";
                }
                newText += "{{Related articles end}}";
              }
              newText += "\n\n-----------------------------------------------\n";
              newText += source.substring(asstart.index, asend.index + asend.length).trim();
              newText += "\n-----------------------------------------------\n\n";
              newText += source.substr(asend.index + asend.length).trim();
              this.WM.Editor.writeSource(newText);
              this.WM.Log.logWarning("Started converting Article summary to " + "Related articles, but manual intervention is required.");
            }
            if (callNext) {
              return callNext();
            }
          }
        }]);

        return ArchWikiSummaryToRelated;
      }(Plugin);

      ;

      ArchWikiSummaryToRelated.conf_default = {
        enabled: false,
        editor_menu: ["Text plugins", "Convert summary to related"]
      };

      return ArchWikiSummaryToRelated;
    }();
  }, { "./_Plugin": 38 }], 29: [function (require, module, exports) {
    var Plugin;

    var _require15 = require('./_Plugin');

    Plugin = _require15.Plugin;


    module.exports.ExpandContractions = function () {
      var ExpandContractions = function (_Plugin10) {
        _inherits(ExpandContractions, _Plugin10);

        function ExpandContractions() {
          _classCallCheck2(this, ExpandContractions);

          return _possibleConstructorReturn(this, (ExpandContractions.__proto__ || Object.getPrototypeOf(ExpandContractions)).apply(this, arguments));
        }

        _createClass2(ExpandContractions, [{
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
          key: "main_editor",
          value: function main_editor(callNext) {
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
      }(Plugin);

      ;

      ExpandContractions.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Expand contractions"]
      };

      return ExpandContractions;
    }();
  }, { "./_Plugin": 38 }], 30: [function (require, module, exports) {
    var CSS,
        Plugin,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    };

    var _require16 = require('./_Plugin');

    Plugin = _require16.Plugin;


    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    ref = module.exports.FixBacklinkFragments = function () {
      var readTarget;

      var FixBacklinkFragments = function (_Plugin11) {
        _inherits(FixBacklinkFragments, _Plugin11);

        function FixBacklinkFragments() {
          _classCallCheck2(this, FixBacklinkFragments);

          var _this32 = _possibleConstructorReturn(this, (FixBacklinkFragments.__proto__ || Object.getPrototypeOf(FixBacklinkFragments)).apply(this, arguments));

          _this32.makeBotUI = _this32.makeBotUI.bind(_this32);
          _this32.fixLinks = _this32.fixLinks.bind(_this32);
          _this32.fixArchWikiLinks = _this32.fixArchWikiLinks.bind(_this32);
          _this32.fixArchWikiLink = _this32.fixArchWikiLink.bind(_this32);
          _this32.fixFragment = _this32.fixFragment.bind(_this32);
          _this32.mainAutoFindSections = _this32.mainAutoFindSections.bind(_this32);
          _this32.mainAutoRead = _this32.mainAutoRead.bind(_this32);
          _this32.mainAutoWrite = _this32.mainAutoWrite.bind(_this32);
          _this32.mainAutoEnd = _this32.mainAutoEnd.bind(_this32);
          return _this32;
        }

        _createClass2(FixBacklinkFragments, [{
          key: "makeBotUI",
          value: function makeBotUI() {
            var divMain, label, target;
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);

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
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
          key: "main_bot",
          value: function main_bot(title, callBot, chainArgs) {
            var params, summary, target;
            summary = this.conf.edit_summary;
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
            var callBot, i, len, ref1, section, sections, summary, target, title;
            boundMethodCheck(this, ref);
            title = args[0];
            target = args[1];
            summary = args[2];
            callBot = args[3];
            sections = [];
            if (res.parse) {
              ref1 = res.parse.sections;
              for (i = 0, len = ref1.length; i < len; i++) {
                section = ref1[i];
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
            boundMethodCheck(this, ref);
            return this.WM.MW.callQueryEdit(title, this.mainAutoWrite, [target, summary, callBot, sections]);
          }
        }, {
          key: "mainAutoWrite",
          value: function mainAutoWrite(title, source, timestamp, edittoken, args) {
            var callBot, newtext, sections, summary, target;
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
      }(Plugin);

      ;

      FixBacklinkFragments.conf_default = {
        enabled: true,
        bot_label: "Fix links to specific sections of a target page",
        edit_summary: "fix links to specific sections"
      };

      readTarget = function readTarget() {
        return document.getElementById("WikiMonkey-FixBacklinkFragments-Target").value;
      };

      return FixBacklinkFragments;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430, "./_Plugin": 38 }], 31: [function (require, module, exports) {
    var Plugin,
        Str,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    };

    var _require17 = require('./_Plugin');

    Plugin = _require17.Plugin;


    Str = require('../../auxiliary/lib.js.generic/dist/Str');

    ref = module.exports.FixDoubleRedirects = function () {
      var FixDoubleRedirects = function (_Plugin12) {
        _inherits(FixDoubleRedirects, _Plugin12);

        function FixDoubleRedirects() {
          _classCallCheck2(this, FixDoubleRedirects);

          var _this33 = _possibleConstructorReturn(this, (FixDoubleRedirects.__proto__ || Object.getPrototypeOf(FixDoubleRedirects)).apply(this, arguments));

          _this33.reverseResults = _this33.reverseResults.bind(_this33);
          _this33.iterateList = _this33.iterateList.bind(_this33);
          _this33.readMiddleRedirect = _this33.readMiddleRedirect.bind(_this33);
          _this33.processDoubleRedirect = _this33.processDoubleRedirect.bind(_this33);
          _this33.processDoubleRedirectEnd = _this33.processDoubleRedirectEnd.bind(_this33);
          return _this33;
        }

        _createClass2(FixDoubleRedirects, [{
          key: "main_special",
          value: function main_special(callNext) {
            this.WM.Log.logInfo("Fixing double redirects ...");
            return this.WM.MW.getSpecialList("DoubleRedirects", "namespaces", this.reverseResults, callNext);
          }
        }, {
          key: "reverseResults",
          value: function reverseResults(results, siteinfo, callNext) {
            var namespaces;
            boundMethodCheck(this, ref);
            namespaces = siteinfo.namespaces;
            results.reverse();
            return this.iterateList(results, namespaces, callNext);
          }
        }, {
          key: "iterateList",
          value: function iterateList(doubleRedirects, namespaces, callNext) {
            var doubleRedirect;
            boundMethodCheck(this, ref);
            doubleRedirect = doubleRedirects.pop();
            if (doubleRedirect) {
              return this.WM.MW.callQueryEdit(doubleRedirect.title, this.readMiddleRedirect, [doubleRedirect, doubleRedirects, namespaces, callNext]);
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
            var callNext, doubleRedirect, doubleRedirects, middleRedirectTitle, namespaces;
            boundMethodCheck(this, ref);
            doubleRedirect = args[0];
            doubleRedirects = args[1];
            namespaces = args[2];
            callNext = args[3];
            middleRedirectTitle = namespaces[doubleRedirect.databaseResult.nsb]['*'] + ':' + doubleRedirect.databaseResult.tb;
            return this.WM.MW.callQuery({
              prop: "revisions",
              rvprop: "content",
              titles: middleRedirectTitle
            }, this.processDoubleRedirect, [doubleRedirect, doubleRedirectTitle, doubleRedirectSource, timestamp, edittoken, doubleRedirects, namespaces, callNext], null);
          }
        }, {
          key: "processDoubleRedirect",
          value: function processDoubleRedirect(middleRedirect, args) {
            var callNext, doubleRedirect, doubleRedirectSource, doubleRedirectTitle, doubleRedirects, edittoken, middleRedirectSource, middleTarget, namespaces, newTarget, newTargetAltAnchor, newTargetFragment, newTargetInterlanguage, newTargetNamespace, newTargetTitle, newText, oldTarget, rawMiddleTarget, rawOldTarget, timestamp;
            boundMethodCheck(this, ref);
            middleRedirectSource = middleRedirect.revisions[0]["*"];
            doubleRedirect = args[0];
            doubleRedirectTitle = args[1];
            doubleRedirectSource = args[2];
            timestamp = args[3];
            edittoken = args[4];
            doubleRedirects = args[5];
            namespaces = args[6];
            callNext = args[7];
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
                summary: this.conf.edit_summary,
                text: newText,
                b1asetimestamp: timestamp,
                token: edittoken
              }, this.processDoubleRedirectEnd, [doubleRedirects, namespaces, callNext], null);
            } else {
              this.WM.Log.logWarning("Could not fix " + this.WM.Log.linkToWikiPage(doubleRedirectTitle, doubleRedirectTitle));
              return this.iterateList(doubleRedirects, namespaces, callNext);
            }
          }
        }, {
          key: "processDoubleRedirectEnd",
          value: function processDoubleRedirectEnd(res, args) {
            var callNext, doubleRedirects, namespaces;
            boundMethodCheck(this, ref);
            doubleRedirects = args[0];
            namespaces = args[1];
            callNext = args[2];
            if (res.edit && res.edit.result === 'Success') {
              return this.iterateList(doubleRedirects, namespaces, callNext);
            } else {
              return this.WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
            }
          }
        }]);

        return FixDoubleRedirects;
      }(Plugin);

      ;

      FixDoubleRedirects.conf_default = {
        enabled: true,
        special_menu: ["Fix double redirects"],
        edit_summary: "fix double redirect"
      };

      return FixDoubleRedirects;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Str": 435, "./_Plugin": 38 }], 32: [function (require, module, exports) {
    var Plugin;

    var _require18 = require('./_Plugin');

    Plugin = _require18.Plugin;


    module.exports.FixFragments = function () {
      var FixFragments = function (_Plugin13) {
        _inherits(FixFragments, _Plugin13);

        function FixFragments() {
          _classCallCheck2(this, FixFragments);

          return _possibleConstructorReturn(this, (FixFragments.__proto__ || Object.getPrototypeOf(FixFragments)).apply(this, arguments));
        }

        _createClass2(FixFragments, [{
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
          key: "main_editor",
          value: function main_editor(callNext) {
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
      }(Plugin);

      ;

      FixFragments.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Fix section links"]
      };

      return FixFragments;
    }();
  }, { "./_Plugin": 38 }], 33: [function (require, module, exports) {
    var Plugin,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    },
        indexOf = [].indexOf;

    var _require19 = require('./_Plugin');

    Plugin = _require19.Plugin;


    ref = module.exports.FixLinkFragments = function () {
      var FixLinkFragments = function (_Plugin14) {
        _inherits(FixLinkFragments, _Plugin14);

        function FixLinkFragments() {
          _classCallCheck2(this, FixLinkFragments);

          var _this35 = _possibleConstructorReturn(this, (FixLinkFragments.__proto__ || Object.getPrototypeOf(FixLinkFragments)).apply(this, arguments));

          _this35.processLink = _this35.processLink.bind(_this35);
          _this35.processLinkContinue = _this35.processLinkContinue.bind(_this35);
          _this35.fixFragment = _this35.fixFragment.bind(_this35);
          _this35.findArchWikiLinks = _this35.findArchWikiLinks.bind(_this35);
          _this35.findArchWikiLinks2 = _this35.findArchWikiLinks2.bind(_this35);
          _this35.processArchWikiLink = _this35.processArchWikiLink.bind(_this35);
          _this35.processArchWikiLinkContinue = _this35.processArchWikiLinkContinue.bind(_this35);
          _this35.mainContinue = _this35.mainContinue.bind(_this35);
          _this35.mainEnd = _this35.mainEnd.bind(_this35);
          return _this35;
        }

        _createClass2(FixLinkFragments, [{
          key: "processLink",
          value: function processLink(title, iwprefixes, links, index, source, newText, prevId, call, callArgs) {
            var link, params, rawfragment, ref1, target;
            boundMethodCheck(this, ref);
            if (links[index]) {
              link = links[index];
              rawfragment = link.fragment;
              if (!(link.namespace != null && (ref1 = link.namespace.toLowerCase(), indexOf.call(iwprefixes, ref1) >= 0)) && rawfragment) {
                this.WM.Log.logInfo("Processing " + this.WM.Log.linkToWikiPage(link.link, link.rawLink) + " ...");
                target = (link.namespace ? link.namespace + ":" : "") + link.title;

                if (!this.WM.Parser.compareArticleTitles(target, title)) {
                  params = {
                    'action': 'parse',
                    'prop': 'sections',
                    'page': target,
                    'redirects': 1
                  };
                  return this.WM.MW.callAPIGet(params, this.processLinkContinue, [link, target, rawfragment, iwprefixes, links, index, source, newText, prevId, title, call, callArgs], null);
                } else {
                  index++;
                  return this.processLink(title, iwprefixes, links, index, source, newText, prevId, call, callArgs);
                }
              } else {
                index++;
                return this.processLink(title, iwprefixes, links, index, source, newText, prevId, call, callArgs);
              }
            } else {
              newText += source.substr(prevId);
              return call(newText, iwprefixes, callArgs);
            }
          }
        }, {
          key: "processLinkContinue",
          value: function processLinkContinue(res, args) {
            var call, callArgs, fixedFragment, i, index, iwprefixes, len, link, links, newText, prevId, rawfragment, ref1, section, sections, source, target, title;
            boundMethodCheck(this, ref);
            link = args[0];
            target = args[1];
            rawfragment = args[2];
            iwprefixes = args[3];
            links = args[4];
            index = args[5];
            source = args[6];
            newText = args[7];
            prevId = args[8];
            title = args[9];
            call = args[10];
            callArgs = args[11];

            if (res.parse) {
              sections = [];
              ref1 = res.parse.sections;
              for (i = 0, len = ref1.length; i < len; i++) {
                section = ref1[i];
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
            return this.processLink(title, iwprefixes, links, index, source, newText, prevId, call, callArgs);
          }
        }, {
          key: "fixFragment",
          value: function fixFragment(rawfragment, sections) {
            var dotFragment, dotSection, fragment, i, len, section;
            boundMethodCheck(this, ref);
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
          value: function findArchWikiLinks(newText, iwprefixes, callArgs) {
            var templates, title;
            boundMethodCheck(this, ref);
            templates = this.WM.Parser.findTemplates(newText, 'Related');
            title = this.WM.Editor.getTitle();
            return this.processArchWikiLink(title, iwprefixes, templates, 1, 0, newText, "", 0, this.findArchWikiLinks2, iwprefixes, callArgs);
          }
        }, {
          key: "findArchWikiLinks2",
          value: function findArchWikiLinks2(newText, iwprefixes, callArgs) {
            var templates, title;
            boundMethodCheck(this, ref);
            templates = this.WM.Parser.findTemplates(newText, 'Related2');
            title = this.WM.Editor.getTitle();
            return this.processArchWikiLink(title, iwprefixes, templates, 2, 0, newText, "", 0, this.mainEnd, callArgs);
          }
        }, {
          key: "processArchWikiLink",
          value: function processArchWikiLink(title, iwprefixes, templates, expectedArgs, index, source, newText, prevId, call, callArgs) {
            var args, fragId, link, params, rawfragment, rawtarget, target, template;
            boundMethodCheck(this, ref);
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
                      return this.WM.MW.callAPIGet(params, this.processArchWikiLinkContinue, [template, target, rawfragment, iwprefixes, templates, expectedArgs, index, source, newText, prevId, title, call, callArgs], null);
                    } else {
                      index++;
                      return this.processArchWikiLink(title, iwprefixes, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                    }
                  } else {
                    index++;
                    return this.processArchWikiLink(title, iwprefixes, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                  }
                } else {
                  index++;
                  return this.processArchWikiLink(title, iwprefixes, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                }
              } else {
                this.WM.Log.logWarning("Template:" + template.title + " must have " + expectedArgs + " and only " + expectedArgs + (expectedArgs > 1 ? " arguments: " : " argument: ") + template.rawTransclusion);
                index++;
                return this.processArchWikiLink(title, iwprefixes, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
              }
            } else {
              newText += source.substr(prevId);
              return call(newText, callArgs);
            }
          }
        }, {
          key: "processArchWikiLinkContinue",
          value: function processArchWikiLinkContinue(res, args) {
            var anchor, call, callArgs, expectedArgs, fixedFragment, i, index, iwprefixes, len, newText, prevId, rawfragment, ref1, section, sections, source, target, template, templates, title;
            boundMethodCheck(this, ref);
            template = args[0];
            target = args[1];
            rawfragment = args[2];
            iwprefixes = args[3];
            templates = args[4];
            expectedArgs = args[5];
            index = args[6];
            source = args[7];
            newText = args[8];
            prevId = args[9];
            title = args[10];
            call = args[11];
            callArgs = args[12];

            if (res.parse) {
              sections = [];
              ref1 = res.parse.sections;
              for (i = 0, len = ref1.length; i < len; i++) {
                section = ref1[i];
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
            return this.processArchWikiLink(title, iwprefixes, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
          }
        }, {
          key: "main_editor",
          value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(callNext) {
              var iw, iwprefixes, links, res, source, title;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      source = this.WM.Editor.readSource();
                      this.WM.Log.logInfo("Fixing links to sections of other articles ...");
                      title = this.WM.Editor.getTitle();
                      _context2.next = 5;
                      return this.WM.MW.getInterwikiMap(title);

                    case 5:
                      res = _context2.sent;

                      iwprefixes = function () {
                        var i, len, ref1, results;
                        ref1 = res.query.interwikimap;
                        results = [];
                        for (i = 0, len = ref1.length; i < len; i++) {
                          iw = ref1[i];
                          results.push(iw.prefix);
                        }
                        return results;
                      }();
                      links = this.WM.Parser.findInternalLinks(source, null, null);
                      return _context2.abrupt("return", this.processLink(title, iwprefixes, links, 0, source, "", 0, this.mainContinue, callNext));

                    case 9:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            function main_editor(_x) {
              return _ref3.apply(this, arguments);
            }

            return main_editor;
          }()
        }, {
          key: "mainContinue",
          value: function mainContinue(newText, iwprefixes, callNext) {
            var templates;
            boundMethodCheck(this, ref);

            if (location.hostname === 'wiki.archlinux.org') {
              return templates = this.findArchWikiLinks(newText, iwprefixes, callNext);
            } else {
              return this.mainEnd(newText, callNext);
            }
          }
        }, {
          key: "mainEnd",
          value: function mainEnd(newText, callNext) {
            var source;
            boundMethodCheck(this, ref);
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
      }(Plugin);

      ;

      FixLinkFragments.conf_default = {
        enabled: true,
        editor_menu: ["Query plugins", "Fix external section links"]
      };

      return FixLinkFragments;
    }();
  }, { "./_Plugin": 38 }], 34: [function (require, module, exports) {
    var Plugin;

    var _require20 = require('./_Plugin');

    Plugin = _require20.Plugin;


    module.exports.MultipleLineBreaks = function () {
      var MultipleLineBreaks = function (_Plugin15) {
        _inherits(MultipleLineBreaks, _Plugin15);

        function MultipleLineBreaks() {
          _classCallCheck2(this, MultipleLineBreaks);

          return _possibleConstructorReturn(this, (MultipleLineBreaks.__proto__ || Object.getPrototypeOf(MultipleLineBreaks)).apply(this, arguments));
        }

        _createClass2(MultipleLineBreaks, [{
          key: "main_editor",
          value: function main_editor(callNext) {
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
      }(Plugin);

      ;

      MultipleLineBreaks.conf_default = {
        enabled: true,
        editor_menu: ["Text plugins", "Squash multiple line breaks"]
      };

      return MultipleLineBreaks;
    }();
  }, { "./_Plugin": 38 }], 35: [function (require, module, exports) {
    var CSS,
        Plugin,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    };

    var _require21 = require('./_Plugin');

    Plugin = _require21.Plugin;


    CSS = require('../../auxiliary/lib.js.generic/dist/CSS');

    ref = module.exports.SimpleReplace = function () {
      var configuration, _makeUI2, storeRegExp;

      var SimpleReplace = function (_Plugin16) {
        _inherits(SimpleReplace, _Plugin16);

        function SimpleReplace() {
          _classCallCheck2(this, SimpleReplace);

          var _this37 = _possibleConstructorReturn(this, (SimpleReplace.__proto__ || Object.getPrototypeOf(SimpleReplace)).apply(this, arguments));

          _this37.storeConfiguration = _this37.storeConfiguration.bind(_this37);
          _this37.mainAutoWrite = _this37.mainAutoWrite.bind(_this37);
          _this37.mainAutoEnd = _this37.mainAutoEnd.bind(_this37);
          return _this37;
        }

        _createClass2(SimpleReplace, [{
          key: "makeUI",
          value: function makeUI() {
            return _makeUI2();
          }
        }, {
          key: "makeBotUI",
          value: function makeBotUI() {
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
            boundMethodCheck(this, ref);
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
          key: "main_editor",
          value: function main_editor(callNext) {
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
          key: "main_bot",
          value: function main_bot(title, callBot, chainArgs) {
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
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
      }(Plugin);

      ;

      SimpleReplace.conf_default = {
        enabled: true,
        editor_menu: ["RegExp substitution"],
        bot_label: "RegExp substitution"
      };

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
  }, { "../../auxiliary/lib.js.generic/dist/CSS": 430, "./_Plugin": 38 }], 36: [function (require, module, exports) {
    var Plugin,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    };

    var _require22 = require('./_Plugin');

    Plugin = _require22.Plugin;


    ref = module.exports.SynchronizeInterlanguageLinks = function () {
      var SynchronizeInterlanguageLinks = function (_Plugin17) {
        _inherits(SynchronizeInterlanguageLinks, _Plugin17);

        function SynchronizeInterlanguageLinks() {
          _classCallCheck2(this, SynchronizeInterlanguageLinks);

          var _this38 = _possibleConstructorReturn(this, (SynchronizeInterlanguageLinks.__proto__ || Object.getPrototypeOf(SynchronizeInterlanguageLinks)).apply(this, arguments));

          _this38.detectLang = _this38.detectLang.bind(_this38);
          _this38.computeWhiteList = _this38.computeWhiteList.bind(_this38);
          _this38.computeSupportedLangs = _this38.computeSupportedLangs.bind(_this38);
          _this38.mainContinue = _this38.mainContinue.bind(_this38);
          _this38.mainEnd = _this38.mainEnd.bind(_this38);
          _this38.mainAutoWrite = _this38.mainAutoWrite.bind(_this38);
          _this38.mainAutoEnd = _this38.mainAutoEnd.bind(_this38);
          return _this38;
        }

        _createClass2(SynchronizeInterlanguageLinks, [{
          key: "detectLang",
          value: function detectLang(title, tag) {
            var detect, pureTitle;
            boundMethodCheck(this, ref);

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
            boundMethodCheck(this, ref);

            if (whitelist === "ArchWiki") {
              return this.WM.ArchWiki.getInternalInterwikiLanguages();
            } else {
              return whitelist;
            }
          }
        }, {
          key: "computeSupportedLangs",
          value: function computeSupportedLangs(supportedLangs) {
            boundMethodCheck(this, ref);

            if (supportedLangs === "ArchWiki") {
              return this.WM.ArchWiki.getInterwikiLanguages();
            } else {
              return supportedLangs;
            }
          }
        }, {
          key: "main_editor",
          value: function main_editor(callNext) {
            var detect, pureTitle, supportedLangs, tag, title, whitelist;
            title = this.WM.Editor.getTitle();
            detect = this.detectLang(title, this.conf.language_tag);
            pureTitle = detect[0];
            tag = detect[1];
            whitelist = this.computeWhiteList(this.conf.tag_whitelist);
            supportedLangs = this.computeSupportedLangs(this.conf.supported_tags);
            this.WM.Log.logInfo("Synchronizing interlanguage links ...");
            return this.WM.MW.getLocalInterwikiMap(title, this.mainContinue, [tag, pureTitle, supportedLangs, whitelist, title, callNext]);
          }
        }, {
          key: "mainContinue",
          value: function mainContinue(iwmap, args) {
            var callNext, i, langlinks, len, link, newlinks, nlink, pureTitle, source, supportedLangs, tag, title, url, visitedlinks, vlink, whitelist, wikiUrls;
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
          key: "main_bot",
          value: function main_bot(title, callBot, chainArgs) {
            var detect, newlinks, pureTitle, summary, supportedLangs, tag, url, visitedlinks, whitelist, wikiUrls;
            detect = this.detectLang(title, this.conf.language_tag);
            pureTitle = detect[0];
            tag = detect[1];
            whitelist = this.computeWhiteList(this.conf.tag_whitelist);
            supportedLangs = this.computeSupportedLangs(this.conf.supported_tags);
            summary = this.conf.edit_summary;
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
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
      }(Plugin);

      ;

      SynchronizeInterlanguageLinks.conf_default = {
        enabled: true,
        editor_menu: ["Query plugins", "Sync interlanguage links"],
        bot_label: "Synchronize interlanguage links",
        language_tag: "en",
        tag_whitelist: ["en"],
        supported_tags: ["en"],
        edit_summary: "synchronized interlanguage links with the other wikis"
      };

      SynchronizeInterlanguageLinks.wiki_to_conf_default = {
        ArchWiki: {
          language_tag: "ArchWiki",
          tag_whitelist: "ArchWiki",
          supported_tags: "ArchWiki"
        },
        Wikipedia: {
          enabled: false
        }
      };

      return SynchronizeInterlanguageLinks;
    }();
  }, { "./_Plugin": 38 }], 37: [function (require, module, exports) {
    var Plugin,
        Str,
        ref,
        boundMethodCheck = function boundMethodCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new Error('Bound instance method accessed before binding');
      }
    },
        indexOf = [].indexOf;

    var _require23 = require('./_Plugin');

    Plugin = _require23.Plugin;


    Str = require('../../auxiliary/lib.js.generic/dist/Str');

    ref = module.exports.UpdateCategoryTree = function () {
      var UpdateCategoryTree = function (_Plugin18) {
        _inherits(UpdateCategoryTree, _Plugin18);

        function UpdateCategoryTree() {
          _classCallCheck2(this, UpdateCategoryTree);

          var _this39 = _possibleConstructorReturn(this, (UpdateCategoryTree.__proto__ || Object.getPrototypeOf(UpdateCategoryTree)).apply(this, arguments));

          _this39.mainContinue = _this39.mainContinue.bind(_this39);
          _this39.readToC = _this39.readToC.bind(_this39);
          _this39.processToC = _this39.processToC.bind(_this39);
          _this39.storeAlternativeNames = _this39.storeAlternativeNames.bind(_this39);
          _this39.processCategory = _this39.processCategory.bind(_this39);
          _this39.processCategoryAddSuffix = _this39.processCategoryAddSuffix.bind(_this39);
          _this39.processCategoryEnd = _this39.processCategoryEnd.bind(_this39);
          _this39.createCatLink = _this39.createCatLink.bind(_this39);
          _this39.writeToC = _this39.writeToC.bind(_this39);
          _this39.checkWrite = _this39.checkWrite.bind(_this39);
          return _this39;
        }

        _createClass2(UpdateCategoryTree, [{
          key: "main_special",
          value: function main_special(callNext) {
            return this.iteratePages(-1, callNext);
          }
        }, {
          key: "iteratePages",
          value: function iteratePages(pageid, callNext) {
            var params, pconf, showRootAlsoIn, summary;
            pageid++;
            summary = this.conf.edit_summary;
            showRootAlsoIn = this.conf.show_root_also_in;
            pconf = this.conf.pages[pageid];
            if (pconf) {
              if ($.type(pconf) === "string") {
                params = this.WM.ArchWiki.getTableOfContents(pconf);
              } else {
                params = pconf;
              }
              return this.WM.MW.isUserBot(this.mainContinue, [params, showRootAlsoIn, summary, callNext, pageid]);
            } else if (callNext) {
              return callNext();
            }
          }
        }, {
          key: "mainContinue",
          value: function mainContinue(botTest, args) {
            boundMethodCheck(this, ref);
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
              callNext: args[3],
              pageid: args[4]
            });
          }
        }, {
          key: "readToC",
          value: function readToC(args) {
            boundMethodCheck(this, ref);
            this.WM.Log.logInfo('Updating ' + this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + " ...");
            return this.WM.MW.callQueryEdit(args.params.page, this.processToC, args);
          }
        }, {
          key: "processToC",
          value: function processToC(title, source, timestamp, edittoken, args) {
            var end, msTimestamp, now, start;
            boundMethodCheck(this, ref);
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
                return this.iteratePages(args.pageid, args.callNext);
              }
            } else {
              this.WM.Log.logWarning(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' has been updated too recently');
              return this.iteratePages(args.pageid, args.callNext);
            }
          }
        }, {
          key: "storeAlternativeNames",
          value: function storeAlternativeNames(source) {
            var dict, match, regExp;
            boundMethodCheck(this, ref);
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
            var altName, args, indices, j, node, ref1, text;
            boundMethodCheck(this, ref);
            args = params.callArgs;
            this.WM.Log.logInfo("Processing " + this.WM.Log.linkToWikiPage(params.node, params.node) + " ...");
            text = "";
            for (j = 0, ref1 = params.ancestors.length; 0 <= ref1 ? j < ref1 : j > ref1; 0 <= ref1 ? j++ : j--) {
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
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
            args.treeText += text;
            params.callArgs = args;
            return this.WM.Cat.recurseTreeContinue(params);
          }
        }, {
          key: "createCatLink",
          value: function createCatLink(cat, replace, altName) {
            var catName, regExp;
            boundMethodCheck(this, ref);
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
            boundMethodCheck(this, ref);
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
              return this.iteratePages(args.pageid, args.callNext);
            }
          }
        }, {
          key: "checkWrite",
          value: function checkWrite(res, args) {
            boundMethodCheck(this, ref);
            if (res.edit && res.edit.result === 'Success') {
              this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' correctly updated');
              return this.iteratePages(args.pageid, args.callNext);
            } else {
              return this.WM.Log.logError(this.WM.Log.linkToWikiPage(args.params.page, args.params.page) + ' has not been updated!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
            }
          }
        }]);

        return UpdateCategoryTree;
      }(Plugin);

      ;

      UpdateCategoryTree.conf_default = {
        enabled: false,
        special_menu: ["Update category trees"],
        edit_summary: "automatic update",
        show_root_also_in: false,
        pages: []
      };

      UpdateCategoryTree.wiki_to_conf_default = {
        ArchWiki: {
          pages: ["ar", "cs", "cs", "da", "el", "en", "es", "he", "hr", "hu", "id", "it", "ko", "lt", "nl", "pl", "pt", "ru", "sk", "sr", "th", "tr", "uk", "zh-hans", "zh-hant"]
        },
        Wikipedia: {}
      };

      return UpdateCategoryTree;
    }();
  }, { "../../auxiliary/lib.js.generic/dist/Str": 435, "./_Plugin": 38 }], 38: [function (require, module, exports) {
    module.exports.Plugin = function () {
      var Plugin = function () {
        _createClass2(Plugin, null, [{
          key: "__configure",
          value: function __configure(wiki_name, user_config) {
            var option, ref, value;

            this.prototype.conf = {};
            if (this.conf_default != null) {
              $.extend(this.prototype.conf, this.conf_default);
            }
            if (this.wiki_to_conf_default != null && wiki_name in this.wiki_to_conf_default) {
              $.extend(this.prototype.conf, this.wiki_to_conf_default[wiki_name]);
            }
            if (this.name in user_config) {
              ref = user_config[this.name];

              for (option in ref) {
                value = ref[option];
                if (!(option in this.prototype.conf)) {
                  continue;
                }
                this.prototype.conf[option] = value;
                delete user_config[this.name][option];
              }
            }
            if (!this.prototype.conf.enabled) {
              delete user_config[this.name];

              throw new Error("Plugin disabled");
            }
            if ($.isEmptyObject(user_config[this.name])) {
              return delete user_config[this.name];
            }
          }
        }]);

        function Plugin(WM) {
          _classCallCheck2(this, Plugin);

          this.WM = WM;
        }

        return Plugin;
      }();

      ;

      Plugin.prototype.main_bot = null;

      Plugin.prototype.main_diff = null;

      Plugin.prototype.main_editor = null;

      Plugin.prototype.main_newpages = null;

      Plugin.prototype.main_recentchanges = null;

      Plugin.prototype.main_special = null;

      return Plugin;
    }();
  }, {}], 39: [function (require, module, exports) {
    (function (global) {
      "use strict";

      require("core-js/shim");

      require("regenerator-runtime/runtime");

      require("core-js/fn/regexp/escape");

      if (global._babelPolyfill) {
        throw new Error("only one instance of babel-polyfill is allowed");
      }
      global._babelPolyfill = true;

      var DEFINE_PROPERTY = "defineProperty";
      function define(O, key, value) {
        O[key] || Object[DEFINE_PROPERTY](O, key, {
          writable: true,
          configurable: true,
          value: value
        });
      }

      define(String.prototype, "padLeft", "".padStart);
      define(String.prototype, "padRight", "".padEnd);

      "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
        [][key] && define(Array, key, Function.call.bind([][key]));
      });
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, { "core-js/fn/regexp/escape": 44, "core-js/shim": 366, "regenerator-runtime/runtime": 40 }], 40: [function (require, module, exports) {
    (function (global) {

      !function (global) {
        "use strict";

        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined;
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

        var inModule = (typeof module === "undefined" ? "undefined" : _typeof2(module)) === "object";
        var runtime = global.regeneratorRuntime;
        if (runtime) {
          if (inModule) {
            module.exports = runtime;
          }

          return;
        }

        runtime = global.regeneratorRuntime = inModule ? module.exports : {};

        function wrap(innerFn, outerFn, self, tryLocsList) {
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);

          generator._invoke = makeInvokeMethod(innerFn, self, context);

          return generator;
        }
        runtime.wrap = wrap;

        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";

        var ContinueSentinel = {};

        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}

        var IteratorPrototype = {};
        IteratorPrototype[iteratorSymbol] = function () {
          return this;
        };

        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function (method) {
            prototype[method] = function (arg) {
              return this._invoke(method, arg);
            };
          });
        }

        runtime.isGeneratorFunction = function (genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };

        runtime.mark = function (genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            if (!(toStringTagSymbol in genFun)) {
              genFun[toStringTagSymbol] = "GeneratorFunction";
            }
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };

        runtime.awrap = function (arg) {
          return { __await: arg };
        };

        function AsyncIterator(generator) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value && (typeof value === "undefined" ? "undefined" : _typeof2(value)) === "object" && hasOwn.call(value, "__await")) {
                return Promise.resolve(value.__await).then(function (value) {
                  invoke("next", value, resolve, reject);
                }, function (err) {
                  invoke("throw", err, resolve, reject);
                });
              }

              return Promise.resolve(value).then(function (unwrapped) {
                result.value = unwrapped;
                resolve(result);
              }, reject);
            }
          }

          if (_typeof2(global.process) === "object" && global.process.domain) {
            invoke = global.process.domain.bind(invoke);
          }

          var previousPromise;

          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new Promise(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }

            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }

          this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);
        AsyncIterator.prototype[asyncIteratorSymbol] = function () {
          return this;
        };
        runtime.AsyncIterator = AsyncIterator;

        runtime.async = function (innerFn, outerFn, self, tryLocsList) {
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

          return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
        };

        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;

          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }

            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }

              return doneResult();
            }

            context.method = method;
            context.arg = arg;

            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel) continue;
                  return delegateResult;
                }
              }

              if (context.method === "next") {
                context.sent = context._sent = context.arg;
              } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw context.arg;
                }

                context.dispatchException(context.arg);
              } else if (context.method === "return") {
                context.abrupt("return", context.arg);
              }

              state = GenStateExecuting;

              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                if (record.arg === ContinueSentinel) {
                  continue;
                }

                return {
                  value: record.arg,
                  done: context.done
                };
              } else if (record.type === "throw") {
                state = GenStateCompleted;

                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }

        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];
          if (method === undefined) {
            context.delegate = null;

            if (context.method === "throw") {
              if (delegate.iterator.return) {
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);

                if (context.method === "throw") {
                  return ContinueSentinel;
                }
              }

              context.method = "throw";
              context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }

            return ContinueSentinel;
          }

          var record = tryCatch(method, delegate.iterator, context.arg);

          if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
          }

          var info = record.arg;

          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }

          if (info.done) {
            context[delegate.resultName] = info.value;

            context.next = delegate.nextLoc;

            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined;
            }
          } else {
            return info;
          }

          context.delegate = null;
          return ContinueSentinel;
        }

        defineIteratorMethods(Gp);

        Gp[toStringTagSymbol] = "Generator";

        Gp[iteratorSymbol] = function () {
          return this;
        };

        Gp.toString = function () {
          return "[object Generator]";
        };

        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };

          if (1 in locs) {
            entry.catchLoc = locs[1];
          }

          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }

          this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }

        function Context(tryLocsList) {
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }

        runtime.keys = function (object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();

          return function next() {
            while (keys.length) {
              var key = keys.pop();
              if (key in object) {
                next.value = key;
                next.done = false;
                return next;
              }
            }

            next.done = true;
            return next;
          };
        };

        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }

            if (typeof iterable.next === "function") {
              return iterable;
            }

            if (!isNaN(iterable.length)) {
              var i = -1,
                  next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

              return next.next = next;
            }
          }

          return { next: doneResult };
        }
        runtime.values = values;

        function doneResult() {
          return { value: undefined, done: true };
        }

        Context.prototype = {
          constructor: Context,

          reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;

            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;

            this.method = "next";
            this.arg = undefined;

            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
              for (var name in this) {
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined;
                }
              }
            }
          },

          stop: function stop() {
            this.done = true;

            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }

            return this.rval;
          },

          dispatchException: function dispatchException(exception) {
            if (this.done) {
              throw exception;
            }

            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;

              if (caught) {
                context.method = "next";
                context.arg = undefined;
              }

              return !!caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");

                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }
                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },

          abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }

            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              finallyEntry = null;
            }

            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
              this.method = "next";
              this.next = finallyEntry.finallyLoc;
              return ContinueSentinel;
            }

            return this.complete(record);
          },

          complete: function complete(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }

            if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = this.arg = record.arg;
              this.method = "return";
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }

            return ContinueSentinel;
          },

          finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },

          "catch": function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }

            throw new Error("illegal catch attempt");
          },

          delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            };

            if (this.method === "next") {
              this.arg = undefined;
            }

            return ContinueSentinel;
          }
        };
      }((typeof global === "undefined" ? "undefined" : _typeof2(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof2(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof2(self)) === "object" ? self : this);
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {}], 41: [function (require, module, exports) {}, {}], 42: [function (require, module, exports) {
    module.exports = function split(undef) {

      var nativeSplit = String.prototype.split,
          compliantExecNpcg = /()??/.exec("")[1] === undef,
          self;

      self = function self(str, separator, limit) {
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return nativeSplit.call(str, separator, limit);
        }
        var output = [],
            flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""),
            lastLastIndex = 0,
            separator = new RegExp(separator.source, flags + "g"),
            separator2,
            match,
            lastIndex,
            lastLength;
        str += "";
        if (!compliantExecNpcg) {
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }

        limit = limit === undef ? -1 >>> 0 : limit >>> 0;
        while (match = separator.exec(str)) {
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));

            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undef) {
                    match[i] = undef;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;
          }
        }
        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };

      return self;
    }();
  }, {}], 43: [function (require, module, exports) {
    var indexof = require('indexof');

    module.exports = ClassList;

    function ClassList(elem) {
      var cl = elem.classList;

      if (cl) {
        return cl;
      }

      var classList = {
        add: add,
        remove: remove,
        contains: contains,
        toggle: toggle,
        toString: $toString,
        length: 0,
        item: item
      };

      return classList;

      function add(token) {
        var list = getTokens();
        if (indexof(list, token) > -1) {
          return;
        }
        list.push(token);
        setTokens(list);
      }

      function remove(token) {
        var list = getTokens(),
            index = indexof(list, token);

        if (index === -1) {
          return;
        }

        list.splice(index, 1);
        setTokens(list);
      }

      function contains(token) {
        return indexof(getTokens(), token) > -1;
      }

      function toggle(token) {
        if (contains(token)) {
          remove(token);
          return false;
        } else {
          add(token);
          return true;
        }
      }

      function $toString() {
        return elem.className;
      }

      function item(index) {
        var tokens = getTokens();
        return tokens[index] || null;
      }

      function getTokens() {
        var className = elem.className;

        return filter(className.split(" "), isTruthy);
      }

      function setTokens(list) {
        var length = list.length;

        elem.className = list.join(" ");
        classList.length = length;

        for (var i = 0; i < list.length; i++) {
          classList[i] = list[i];
        }

        delete list[length];
      }
    }

    function filter(arr, fn) {
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i])) ret.push(arr[i]);
      }
      return ret;
    }

    function isTruthy(value) {
      return !!value;
    }
  }, { "indexof": 374 }], 44: [function (require, module, exports) {
    require('../../modules/core.regexp.escape');
    module.exports = require('../../modules/_core').RegExp.escape;
  }, { "../../modules/_core": 65, "../../modules/core.regexp.escape": 169 }], 45: [function (require, module, exports) {
    module.exports = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };
  }, {}], 46: [function (require, module, exports) {
    var cof = require('./_cof');
    module.exports = function (it, msg) {
      if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
      return +it;
    };
  }, { "./_cof": 60 }], 47: [function (require, module, exports) {
    var UNSCOPABLES = require('./_wks')('unscopables');
    var ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
    module.exports = function (key) {
      ArrayProto[UNSCOPABLES][key] = true;
    };
  }, { "./_hide": 84, "./_wks": 167 }], 48: [function (require, module, exports) {
    module.exports = function (it, Constructor, name, forbiddenField) {
      if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
        throw TypeError(name + ': incorrect invocation!');
      }return it;
    };
  }, {}], 49: [function (require, module, exports) {
    var isObject = require('./_is-object');
    module.exports = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };
  }, { "./_is-object": 93 }], 50: [function (require, module, exports) {
    'use strict';

    var toObject = require('./_to-object');
    var toAbsoluteIndex = require('./_to-absolute-index');
    var toLength = require('./_to-length');

    module.exports = [].copyWithin || function copyWithin(target, start) {
      var O = toObject(this);
      var len = toLength(O.length);
      var to = toAbsoluteIndex(target, len);
      var from = toAbsoluteIndex(start, len);
      var end = arguments.length > 2 ? arguments[2] : undefined;
      var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
      var inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count-- > 0) {
        if (from in O) O[to] = O[from];else delete O[to];
        to += inc;
        from += inc;
      }return O;
    };
  }, { "./_to-absolute-index": 153, "./_to-length": 157, "./_to-object": 158 }], 51: [function (require, module, exports) {
    'use strict';

    var toObject = require('./_to-object');
    var toAbsoluteIndex = require('./_to-absolute-index');
    var toLength = require('./_to-length');
    module.exports = function fill(value) {
      var O = toObject(this);
      var length = toLength(O.length);
      var aLen = arguments.length;
      var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
      var end = aLen > 2 ? arguments[2] : undefined;
      var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
      while (endPos > index) {
        O[index++] = value;
      }return O;
    };
  }, { "./_to-absolute-index": 153, "./_to-length": 157, "./_to-object": 158 }], 52: [function (require, module, exports) {
    var forOf = require('./_for-of');

    module.exports = function (iter, ITERATOR) {
      var result = [];
      forOf(iter, false, result.push, result, ITERATOR);
      return result;
    };
  }, { "./_for-of": 81 }], 53: [function (require, module, exports) {
    var toIObject = require('./_to-iobject');
    var toLength = require('./_to-length');
    var toAbsoluteIndex = require('./_to-absolute-index');
    module.exports = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;

        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];

          if (value != value) return true;
        } else for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }return !IS_INCLUDES && -1;
      };
    };
  }, { "./_to-absolute-index": 153, "./_to-iobject": 156, "./_to-length": 157 }], 54: [function (require, module, exports) {
    var ctx = require('./_ctx');
    var IObject = require('./_iobject');
    var toObject = require('./_to-object');
    var toLength = require('./_to-length');
    var asc = require('./_array-species-create');
    module.exports = function (TYPE, $create) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      var create = $create || asc;
      return function ($this, callbackfn, that) {
        var O = toObject($this);
        var self = IObject(O);
        var f = ctx(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
        var val, res;
        for (; length > index; index++) {
          if (NO_HOLES || index in self) {
            val = self[index];
            res = f(val, index, O);
            if (TYPE) {
              if (IS_MAP) result[index] = res;else if (res) switch (TYPE) {
                  case 3:
                    return true;
                  case 5:
                    return val;
                  case 6:
                    return index;
                  case 2:
                    result.push(val);} else if (IS_EVERY) return false;
            }
          }
        }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
      };
    };
  }, { "./_array-species-create": 57, "./_ctx": 67, "./_iobject": 89, "./_to-length": 157, "./_to-object": 158 }], 55: [function (require, module, exports) {
    var aFunction = require('./_a-function');
    var toObject = require('./_to-object');
    var IObject = require('./_iobject');
    var toLength = require('./_to-length');

    module.exports = function (that, callbackfn, aLen, memo, isRight) {
      aFunction(callbackfn);
      var O = toObject(that);
      var self = IObject(O);
      var length = toLength(O.length);
      var index = isRight ? length - 1 : 0;
      var i = isRight ? -1 : 1;
      if (aLen < 2) for (;;) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (isRight ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
      for (; isRight ? index >= 0 : length > index; index += i) {
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      }return memo;
    };
  }, { "./_a-function": 45, "./_iobject": 89, "./_to-length": 157, "./_to-object": 158 }], 56: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var isArray = require('./_is-array');
    var SPECIES = require('./_wks')('species');

    module.exports = function (original) {
      var C;
      if (isArray(original)) {
        C = original.constructor;

        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
        if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      }return C === undefined ? Array : C;
    };
  }, { "./_is-array": 91, "./_is-object": 93, "./_wks": 167 }], 57: [function (require, module, exports) {
    var speciesConstructor = require('./_array-species-constructor');

    module.exports = function (original, length) {
      return new (speciesConstructor(original))(length);
    };
  }, { "./_array-species-constructor": 56 }], 58: [function (require, module, exports) {
    'use strict';

    var aFunction = require('./_a-function');
    var isObject = require('./_is-object');
    var invoke = require('./_invoke');
    var arraySlice = [].slice;
    var factories = {};

    var construct = function construct(F, len, args) {
      if (!(len in factories)) {
        for (var n = [], i = 0; i < len; i++) {
          n[i] = 'a[' + i + ']';
        }
        factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
      }return factories[len](F, args);
    };

    module.exports = Function.bind || function bind(that) {
      var fn = aFunction(this);
      var partArgs = arraySlice.call(arguments, 1);
      var bound = function bound() {
        var args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
      };
      if (isObject(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };
  }, { "./_a-function": 45, "./_invoke": 88, "./_is-object": 93 }], 59: [function (require, module, exports) {
    var cof = require('./_cof');
    var TAG = require('./_wks')('toStringTag');

    var ARG = cof(function () {
      return arguments;
    }()) == 'Arguments';

    var tryGet = function tryGet(it, key) {
      try {
        return it[key];
      } catch (e) {}
    };

    module.exports = function (it) {
      var O, T, B;
      return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
  }, { "./_cof": 60, "./_wks": 167 }], 60: [function (require, module, exports) {
    var toString = {}.toString;

    module.exports = function (it) {
      return toString.call(it).slice(8, -1);
    };
  }, {}], 61: [function (require, module, exports) {
    'use strict';

    var dP = require('./_object-dp').f;
    var create = require('./_object-create');
    var redefineAll = require('./_redefine-all');
    var ctx = require('./_ctx');
    var anInstance = require('./_an-instance');
    var forOf = require('./_for-of');
    var $iterDefine = require('./_iter-define');
    var step = require('./_iter-step');
    var setSpecies = require('./_set-species');
    var DESCRIPTORS = require('./_descriptors');
    var fastKey = require('./_meta').fastKey;
    var validate = require('./_validate-collection');
    var SIZE = DESCRIPTORS ? '_s' : 'size';

    var getEntry = function getEntry(that, key) {
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return that._i[index];

      for (entry = that._f; entry; entry = entry.n) {
        if (entry.k == key) return entry;
      }
    };

    module.exports = {
      getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, NAME, '_i');
          that._t = NAME;
          that._i = create(null);
          that._f = undefined;
          that._l = undefined;
          that[SIZE] = 0;
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        });
        redefineAll(C.prototype, {
          clear: function clear() {
            for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
              entry.r = true;
              if (entry.p) entry.p = entry.p.n = undefined;
              delete data[entry.i];
            }
            that._f = that._l = undefined;
            that[SIZE] = 0;
          },

          'delete': function _delete(key) {
            var that = validate(this, NAME);
            var entry = getEntry(that, key);
            if (entry) {
              var next = entry.n;
              var prev = entry.p;
              delete that._i[entry.i];
              entry.r = true;
              if (prev) prev.n = next;
              if (next) next.p = prev;
              if (that._f == entry) that._f = next;
              if (that._l == entry) that._l = prev;
              that[SIZE]--;
            }return !!entry;
          },

          forEach: function forEach(callbackfn) {
            validate(this, NAME);
            var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
            var entry;
            while (entry = entry ? entry.n : this._f) {
              f(entry.v, entry.k, this);

              while (entry && entry.r) {
                entry = entry.p;
              }
            }
          },

          has: function has(key) {
            return !!getEntry(validate(this, NAME), key);
          }
        });
        if (DESCRIPTORS) dP(C.prototype, 'size', {
          get: function get() {
            return validate(this, NAME)[SIZE];
          }
        });
        return C;
      },
      def: function def(that, key, value) {
        var entry = getEntry(that, key);
        var prev, index;

        if (entry) {
          entry.v = value;
        } else {
          that._l = entry = {
            i: index = fastKey(key, true),
            k: key,
            v: value,
            p: prev = that._l,
            n: undefined,
            r: false };
          if (!that._f) that._f = entry;
          if (prev) prev.n = entry;
          that[SIZE]++;

          if (index !== 'F') that._i[index] = entry;
        }return that;
      },
      getEntry: getEntry,
      setStrong: function setStrong(C, NAME, IS_MAP) {
        $iterDefine(C, NAME, function (iterated, kind) {
          this._t = validate(iterated, NAME);
          this._k = kind;
          this._l = undefined;
        }, function () {
          var that = this;
          var kind = that._k;
          var entry = that._l;

          while (entry && entry.r) {
            entry = entry.p;
          }
          if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
            that._t = undefined;
            return step(1);
          }

          if (kind == 'keys') return step(0, entry.k);
          if (kind == 'values') return step(0, entry.v);
          return step(0, [entry.k, entry.v]);
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        setSpecies(NAME);
      }
    };
  }, { "./_an-instance": 48, "./_ctx": 67, "./_descriptors": 71, "./_for-of": 81, "./_iter-define": 97, "./_iter-step": 99, "./_meta": 107, "./_object-create": 112, "./_object-dp": 113, "./_redefine-all": 132, "./_set-species": 139, "./_validate-collection": 164 }], 62: [function (require, module, exports) {
    var classof = require('./_classof');
    var from = require('./_array-from-iterable');
    module.exports = function (NAME) {
      return function toJSON() {
        if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
        return from(this);
      };
    };
  }, { "./_array-from-iterable": 52, "./_classof": 59 }], 63: [function (require, module, exports) {
    'use strict';

    var redefineAll = require('./_redefine-all');
    var getWeak = require('./_meta').getWeak;
    var anObject = require('./_an-object');
    var isObject = require('./_is-object');
    var anInstance = require('./_an-instance');
    var forOf = require('./_for-of');
    var createArrayMethod = require('./_array-methods');
    var $has = require('./_has');
    var validate = require('./_validate-collection');
    var arrayFind = createArrayMethod(5);
    var arrayFindIndex = createArrayMethod(6);
    var id = 0;

    var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
      return that._l || (that._l = new UncaughtFrozenStore());
    };
    var UncaughtFrozenStore = function UncaughtFrozenStore() {
      this.a = [];
    };
    var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
      return arrayFind(store.a, function (it) {
        return it[0] === key;
      });
    };
    UncaughtFrozenStore.prototype = {
      get: function get(key) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) return entry[1];
      },
      has: function has(key) {
        return !!findUncaughtFrozen(this, key);
      },
      set: function set(key, value) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) entry[1] = value;else this.a.push([key, value]);
      },
      'delete': function _delete(key) {
        var index = arrayFindIndex(this.a, function (it) {
          return it[0] === key;
        });
        if (~index) this.a.splice(index, 1);
        return !!~index;
      }
    };

    module.exports = {
      getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, NAME, '_i');
          that._t = NAME;
          that._i = id++;
          that._l = undefined;
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        });
        redefineAll(C.prototype, {
          'delete': function _delete(key) {
            if (!isObject(key)) return false;
            var data = getWeak(key);
            if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
            return data && $has(data, this._i) && delete data[this._i];
          },

          has: function has(key) {
            if (!isObject(key)) return false;
            var data = getWeak(key);
            if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
            return data && $has(data, this._i);
          }
        });
        return C;
      },
      def: function def(that, key, value) {
        var data = getWeak(anObject(key), true);
        if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
        return that;
      },
      ufstore: uncaughtFrozenStore
    };
  }, { "./_an-instance": 48, "./_an-object": 49, "./_array-methods": 54, "./_for-of": 81, "./_has": 83, "./_is-object": 93, "./_meta": 107, "./_redefine-all": 132, "./_validate-collection": 164 }], 64: [function (require, module, exports) {
    'use strict';

    var global = require('./_global');
    var $export = require('./_export');
    var redefine = require('./_redefine');
    var redefineAll = require('./_redefine-all');
    var meta = require('./_meta');
    var forOf = require('./_for-of');
    var anInstance = require('./_an-instance');
    var isObject = require('./_is-object');
    var fails = require('./_fails');
    var $iterDetect = require('./_iter-detect');
    var setToStringTag = require('./_set-to-string-tag');
    var inheritIfRequired = require('./_inherit-if-required');

    module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
      var Base = global[NAME];
      var C = Base;
      var ADDER = IS_MAP ? 'set' : 'add';
      var proto = C && C.prototype;
      var O = {};
      var fixMethod = function fixMethod(KEY) {
        var fn = proto[KEY];
        redefine(proto, KEY, KEY == 'delete' ? function (a) {
          return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'has' ? function has(a) {
          return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'get' ? function get(a) {
          return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'add' ? function add(a) {
          fn.call(this, a === 0 ? 0 : a);return this;
        } : function set(a, b) {
          fn.call(this, a === 0 ? 0 : a, b);return this;
        });
      };
      if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
        new C().entries().next();
      }))) {
        C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
        redefineAll(C.prototype, methods);
        meta.NEED = true;
      } else {
        var instance = new C();

        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;

        var THROWS_ON_PRIMITIVES = fails(function () {
          instance.has(1);
        });

        var ACCEPT_ITERABLES = $iterDetect(function (iter) {
          new C(iter);
        });
        var BUGGY_ZERO = !IS_WEAK && fails(function () {
          var $instance = new C();
          var index = 5;
          while (index--) {
            $instance[ADDER](index, index);
          }return !$instance.has(-0);
        });
        if (!ACCEPT_ITERABLES) {
          C = wrapper(function (target, iterable) {
            anInstance(target, C, NAME);
            var that = inheritIfRequired(new Base(), target, C);
            if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
            return that;
          });
          C.prototype = proto;
          proto.constructor = C;
        }
        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete');
          fixMethod('has');
          IS_MAP && fixMethod('get');
        }
        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

        if (IS_WEAK && proto.clear) delete proto.clear;
      }

      setToStringTag(C, NAME);

      O[NAME] = C;
      $export($export.G + $export.W + $export.F * (C != Base), O);

      if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

      return C;
    };
  }, { "./_an-instance": 48, "./_export": 75, "./_fails": 77, "./_for-of": 81, "./_global": 82, "./_inherit-if-required": 87, "./_is-object": 93, "./_iter-detect": 98, "./_meta": 107, "./_redefine": 133, "./_redefine-all": 132, "./_set-to-string-tag": 140 }], 65: [function (require, module, exports) {
    var core = module.exports = { version: '2.5.1' };
    if (typeof __e == 'number') __e = core;
  }, {}], 66: [function (require, module, exports) {
    'use strict';

    var $defineProperty = require('./_object-dp');
    var createDesc = require('./_property-desc');

    module.exports = function (object, index, value) {
      if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
    };
  }, { "./_object-dp": 113, "./_property-desc": 131 }], 67: [function (require, module, exports) {
    var aFunction = require('./_a-function');
    module.exports = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 1:
          return function (a) {
            return fn.call(that, a);
          };
        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };
        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }
      return function () {
        return fn.apply(that, arguments);
      };
    };
  }, { "./_a-function": 45 }], 68: [function (require, module, exports) {
    'use strict';

    var fails = require('./_fails');
    var getTime = Date.prototype.getTime;
    var $toISOString = Date.prototype.toISOString;

    var lz = function lz(num) {
      return num > 9 ? num : '0' + num;
    };

    module.exports = fails(function () {
      return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
    }) || !fails(function () {
      $toISOString.call(new Date(NaN));
    }) ? function toISOString() {
      if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
      var d = this;
      var y = d.getUTCFullYear();
      var m = d.getUTCMilliseconds();
      var s = y < 0 ? '-' : y > 9999 ? '+' : '';
      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
    } : $toISOString;
  }, { "./_fails": 77 }], 69: [function (require, module, exports) {
    'use strict';

    var anObject = require('./_an-object');
    var toPrimitive = require('./_to-primitive');
    var NUMBER = 'number';

    module.exports = function (hint) {
      if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
      return toPrimitive(anObject(this), hint != NUMBER);
    };
  }, { "./_an-object": 49, "./_to-primitive": 159 }], 70: [function (require, module, exports) {
    module.exports = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };
  }, {}], 71: [function (require, module, exports) {
    module.exports = !require('./_fails')(function () {
      return Object.defineProperty({}, 'a', { get: function get() {
          return 7;
        } }).a != 7;
    });
  }, { "./_fails": 77 }], 72: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var document = require('./_global').document;

    var is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
      return is ? document.createElement(it) : {};
    };
  }, { "./_global": 82, "./_is-object": 93 }], 73: [function (require, module, exports) {
    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
  }, {}], 74: [function (require, module, exports) {
    var getKeys = require('./_object-keys');
    var gOPS = require('./_object-gops');
    var pIE = require('./_object-pie');
    module.exports = function (it) {
      var result = getKeys(it);
      var getSymbols = gOPS.f;
      if (getSymbols) {
        var symbols = getSymbols(it);
        var isEnum = pIE.f;
        var i = 0;
        var key;
        while (symbols.length > i) {
          if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }
      }return result;
    };
  }, { "./_object-gops": 119, "./_object-keys": 122, "./_object-pie": 123 }], 75: [function (require, module, exports) {
    var global = require('./_global');
    var core = require('./_core');
    var hide = require('./_hide');
    var redefine = require('./_redefine');
    var ctx = require('./_ctx');
    var PROTOTYPE = 'prototype';

    var $export = function $export(type, name, source) {
      var IS_FORCED = type & $export.F;
      var IS_GLOBAL = type & $export.G;
      var IS_STATIC = type & $export.S;
      var IS_PROTO = type & $export.P;
      var IS_BIND = type & $export.B;
      var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
      var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
      var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
      var key, own, out, exp;
      if (IS_GLOBAL) source = name;
      for (key in source) {
        own = !IS_FORCED && target && target[key] !== undefined;

        out = (own ? target : source)[key];

        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;

        if (target) redefine(target, key, out, type & $export.U);

        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };
    global.core = core;

    $export.F = 1;
    $export.G = 2;
    $export.S = 4;
    $export.P = 8;
    $export.B = 16;
    $export.W = 32;
    $export.U = 64;
    $export.R = 128;
    module.exports = $export;
  }, { "./_core": 65, "./_ctx": 67, "./_global": 82, "./_hide": 84, "./_redefine": 133 }], 76: [function (require, module, exports) {
    var MATCH = require('./_wks')('match');
    module.exports = function (KEY) {
      var re = /./;
      try {
        '/./'[KEY](re);
      } catch (e) {
        try {
          re[MATCH] = false;
          return !'/./'[KEY](re);
        } catch (f) {}
      }return true;
    };
  }, { "./_wks": 167 }], 77: [function (require, module, exports) {
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
  }, {}], 78: [function (require, module, exports) {
    'use strict';

    var hide = require('./_hide');
    var redefine = require('./_redefine');
    var fails = require('./_fails');
    var defined = require('./_defined');
    var wks = require('./_wks');

    module.exports = function (KEY, length, exec) {
      var SYMBOL = wks(KEY);
      var fns = exec(defined, SYMBOL, ''[KEY]);
      var strfn = fns[0];
      var rxfn = fns[1];
      if (fails(function () {
        var O = {};
        O[SYMBOL] = function () {
          return 7;
        };
        return ''[KEY](O) != 7;
      })) {
        redefine(String.prototype, KEY, strfn);
        hide(RegExp.prototype, SYMBOL, length == 2 ? function (string, arg) {
          return rxfn.call(string, this, arg);
        } : function (string) {
          return rxfn.call(string, this);
        });
      }
    };
  }, { "./_defined": 70, "./_fails": 77, "./_hide": 84, "./_redefine": 133, "./_wks": 167 }], 79: [function (require, module, exports) {
    'use strict';

    var anObject = require('./_an-object');
    module.exports = function () {
      var that = anObject(this);
      var result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };
  }, { "./_an-object": 49 }], 80: [function (require, module, exports) {
    'use strict';

    var isArray = require('./_is-array');
    var isObject = require('./_is-object');
    var toLength = require('./_to-length');
    var ctx = require('./_ctx');
    var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

    function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
      var targetIndex = start;
      var sourceIndex = 0;
      var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
      var element, spreadable;

      while (sourceIndex < sourceLen) {
        if (sourceIndex in source) {
          element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

          spreadable = false;
          if (isObject(element)) {
            spreadable = element[IS_CONCAT_SPREADABLE];
            spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
          }

          if (spreadable && depth > 0) {
            targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
          } else {
            if (targetIndex >= 0x1fffffffffffff) throw TypeError();
            target[targetIndex] = element;
          }

          targetIndex++;
        }
        sourceIndex++;
      }
      return targetIndex;
    }

    module.exports = flattenIntoArray;
  }, { "./_ctx": 67, "./_is-array": 91, "./_is-object": 93, "./_to-length": 157, "./_wks": 167 }], 81: [function (require, module, exports) {
    var ctx = require('./_ctx');
    var call = require('./_iter-call');
    var isArrayIter = require('./_is-array-iter');
    var anObject = require('./_an-object');
    var toLength = require('./_to-length');
    var getIterFn = require('./core.get-iterator-method');
    var BREAK = {};
    var RETURN = {};
    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () {
        return iterable;
      } : getIterFn(iterable);
      var f = ctx(fn, that, entries ? 2 : 1);
      var index = 0;
      var length, step, iterator, result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');

      if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
        result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = call(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  }, { "./_an-object": 49, "./_ctx": 67, "./_is-array-iter": 90, "./_iter-call": 95, "./_to-length": 157, "./core.get-iterator-method": 168 }], 82: [function (require, module, exports) {
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
    if (typeof __g == 'number') __g = global;
  }, {}], 83: [function (require, module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function (it, key) {
      return hasOwnProperty.call(it, key);
    };
  }, {}], 84: [function (require, module, exports) {
    var dP = require('./_object-dp');
    var createDesc = require('./_property-desc');
    module.exports = require('./_descriptors') ? function (object, key, value) {
      return dP.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
  }, { "./_descriptors": 71, "./_object-dp": 113, "./_property-desc": 131 }], 85: [function (require, module, exports) {
    var document = require('./_global').document;
    module.exports = document && document.documentElement;
  }, { "./_global": 82 }], 86: [function (require, module, exports) {
    module.exports = !require('./_descriptors') && !require('./_fails')(function () {
      return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function get() {
          return 7;
        } }).a != 7;
    });
  }, { "./_descriptors": 71, "./_dom-create": 72, "./_fails": 77 }], 87: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var setPrototypeOf = require('./_set-proto').set;
    module.exports = function (that, target, C) {
      var S = target.constructor;
      var P;
      if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
        setPrototypeOf(that, P);
      }return that;
    };
  }, { "./_is-object": 93, "./_set-proto": 138 }], 88: [function (require, module, exports) {
    module.exports = function (fn, args, that) {
      var un = that === undefined;
      switch (args.length) {
        case 0:
          return un ? fn() : fn.call(that);
        case 1:
          return un ? fn(args[0]) : fn.call(that, args[0]);
        case 2:
          return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
        case 3:
          return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
        case 4:
          return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      }return fn.apply(that, args);
    };
  }, {}], 89: [function (require, module, exports) {
    var cof = require('./_cof');

    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }, { "./_cof": 60 }], 90: [function (require, module, exports) {
    var Iterators = require('./_iterators');
    var ITERATOR = require('./_wks')('iterator');
    var ArrayProto = Array.prototype;

    module.exports = function (it) {
      return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
  }, { "./_iterators": 100, "./_wks": 167 }], 91: [function (require, module, exports) {
    var cof = require('./_cof');
    module.exports = Array.isArray || function isArray(arg) {
      return cof(arg) == 'Array';
    };
  }, { "./_cof": 60 }], 92: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var floor = Math.floor;
    module.exports = function isInteger(it) {
      return !isObject(it) && isFinite(it) && floor(it) === it;
    };
  }, { "./_is-object": 93 }], 93: [function (require, module, exports) {
    module.exports = function (it) {
      return (typeof it === "undefined" ? "undefined" : _typeof2(it)) === 'object' ? it !== null : typeof it === 'function';
    };
  }, {}], 94: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var cof = require('./_cof');
    var MATCH = require('./_wks')('match');
    module.exports = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
    };
  }, { "./_cof": 60, "./_is-object": 93, "./_wks": 167 }], 95: [function (require, module, exports) {
    var anObject = require('./_an-object');
    module.exports = function (iterator, fn, value, entries) {
      try {
        return entries ? fn(anObject(value)[0], value[1]) : fn(value);
      } catch (e) {
        var ret = iterator['return'];
        if (ret !== undefined) anObject(ret.call(iterator));
        throw e;
      }
    };
  }, { "./_an-object": 49 }], 96: [function (require, module, exports) {
    'use strict';

    var create = require('./_object-create');
    var descriptor = require('./_property-desc');
    var setToStringTag = require('./_set-to-string-tag');
    var IteratorPrototype = {};

    require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () {
      return this;
    });

    module.exports = function (Constructor, NAME, next) {
      Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
      setToStringTag(Constructor, NAME + ' Iterator');
    };
  }, { "./_hide": 84, "./_object-create": 112, "./_property-desc": 131, "./_set-to-string-tag": 140, "./_wks": 167 }], 97: [function (require, module, exports) {
    'use strict';

    var LIBRARY = require('./_library');
    var $export = require('./_export');
    var redefine = require('./_redefine');
    var hide = require('./_hide');
    var has = require('./_has');
    var Iterators = require('./_iterators');
    var $iterCreate = require('./_iter-create');
    var setToStringTag = require('./_set-to-string-tag');
    var getPrototypeOf = require('./_object-gpo');
    var ITERATOR = require('./_wks')('iterator');
    var BUGGY = !([].keys && 'next' in [].keys());
    var FF_ITERATOR = '@@iterator';
    var KEYS = 'keys';
    var VALUES = 'values';

    var returnThis = function returnThis() {
      return this;
    };

    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME, next);
      var getMethod = function getMethod(kind) {
        if (!BUGGY && kind in proto) return proto[kind];
        switch (kind) {
          case KEYS:
            return function keys() {
              return new Constructor(this, kind);
            };
          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }return function entries() {
          return new Constructor(this, kind);
        };
      };
      var TAG = NAME + ' Iterator';
      var DEF_VALUES = DEFAULT == VALUES;
      var VALUES_BUG = false;
      var proto = Base.prototype;
      var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
      var $default = $native || getMethod(DEFAULT);
      var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
      var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
      var methods, key, IteratorPrototype;

      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
          setToStringTag(IteratorPrototype, TAG, true);

          if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
        }
      }

      if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }

      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
      }

      Iterators[NAME] = $default;
      Iterators[TAG] = returnThis;
      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key in methods) {
          if (!(key in proto)) redefine(proto, key, methods[key]);
        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
      }
      return methods;
    };
  }, { "./_export": 75, "./_has": 83, "./_hide": 84, "./_iter-create": 96, "./_iterators": 100, "./_library": 101, "./_object-gpo": 120, "./_redefine": 133, "./_set-to-string-tag": 140, "./_wks": 167 }], 98: [function (require, module, exports) {
    var ITERATOR = require('./_wks')('iterator');
    var SAFE_CLOSING = false;

    try {
      var riter = [7][ITERATOR]();
      riter['return'] = function () {
        SAFE_CLOSING = true;
      };

      Array.from(riter, function () {
        throw 2;
      });
    } catch (e) {}

    module.exports = function (exec, skipClosing) {
      if (!skipClosing && !SAFE_CLOSING) return false;
      var safe = false;
      try {
        var arr = [7];
        var iter = arr[ITERATOR]();
        iter.next = function () {
          return { done: safe = true };
        };
        arr[ITERATOR] = function () {
          return iter;
        };
        exec(arr);
      } catch (e) {}
      return safe;
    };
  }, { "./_wks": 167 }], 99: [function (require, module, exports) {
    module.exports = function (done, value) {
      return { value: value, done: !!done };
    };
  }, {}], 100: [function (require, module, exports) {
    module.exports = {};
  }, {}], 101: [function (require, module, exports) {
    module.exports = false;
  }, {}], 102: [function (require, module, exports) {
    var $expm1 = Math.expm1;
    module.exports = !$expm1 || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
      return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
    } : $expm1;
  }, {}], 103: [function (require, module, exports) {
    var sign = require('./_math-sign');
    var pow = Math.pow;
    var EPSILON = pow(2, -52);
    var EPSILON32 = pow(2, -23);
    var MAX32 = pow(2, 127) * (2 - EPSILON32);
    var MIN32 = pow(2, -126);

    var roundTiesToEven = function roundTiesToEven(n) {
      return n + 1 / EPSILON - 1 / EPSILON;
    };

    module.exports = Math.fround || function fround(x) {
      var $abs = Math.abs(x);
      var $sign = sign(x);
      var a, result;
      if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);

      if (result > MAX32 || result != result) return $sign * Infinity;
      return $sign * result;
    };
  }, { "./_math-sign": 106 }], 104: [function (require, module, exports) {
    module.exports = Math.log1p || function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
    };
  }, {}], 105: [function (require, module, exports) {
    module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
      if (arguments.length === 0 || x != x || inLow != inLow || inHigh != inHigh || outLow != outLow || outHigh != outHigh) return NaN;
      if (x === Infinity || x === -Infinity) return x;
      return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
    };
  }, {}], 106: [function (require, module, exports) {
    module.exports = Math.sign || function sign(x) {
      return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
    };
  }, {}], 107: [function (require, module, exports) {
    var META = require('./_uid')('meta');
    var isObject = require('./_is-object');
    var has = require('./_has');
    var setDesc = require('./_object-dp').f;
    var id = 0;
    var isExtensible = Object.isExtensible || function () {
      return true;
    };
    var FREEZE = !require('./_fails')(function () {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function setMeta(it) {
      setDesc(it, META, { value: {
          i: 'O' + ++id,
          w: {} } });
    };
    var fastKey = function fastKey(it, create) {
      if (!isObject(it)) return (typeof it === "undefined" ? "undefined" : _typeof2(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has(it, META)) {
        if (!isExtensible(it)) return 'F';

        if (!create) return 'E';

        setMeta(it);
      }return it[META].i;
    };
    var getWeak = function getWeak(it, create) {
      if (!has(it, META)) {
        if (!isExtensible(it)) return true;

        if (!create) return false;

        setMeta(it);
      }return it[META].w;
    };

    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
  }, { "./_fails": 77, "./_has": 83, "./_is-object": 93, "./_object-dp": 113, "./_uid": 163 }], 108: [function (require, module, exports) {
    var Map = require('./es6.map');
    var $export = require('./_export');
    var shared = require('./_shared')('metadata');
    var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

    var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
      var targetMetadata = store.get(target);
      if (!targetMetadata) {
        if (!create) return undefined;
        store.set(target, targetMetadata = new Map());
      }
      var keyMetadata = targetMetadata.get(targetKey);
      if (!keyMetadata) {
        if (!create) return undefined;
        targetMetadata.set(targetKey, keyMetadata = new Map());
      }return keyMetadata;
    };
    var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
    };
    var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
    };
    var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
    };
    var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
      var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
      var keys = [];
      if (metadataMap) metadataMap.forEach(function (_, key) {
        keys.push(key);
      });
      return keys;
    };
    var toMetaKey = function toMetaKey(it) {
      return it === undefined || (typeof it === "undefined" ? "undefined" : _typeof2(it)) == 'symbol' ? it : String(it);
    };
    var exp = function exp(O) {
      $export($export.S, 'Reflect', O);
    };

    module.exports = {
      store: store,
      map: getOrCreateMetadataMap,
      has: ordinaryHasOwnMetadata,
      get: ordinaryGetOwnMetadata,
      set: ordinaryDefineOwnMetadata,
      keys: ordinaryOwnMetadataKeys,
      key: toMetaKey,
      exp: exp
    };
  }, { "./_export": 75, "./_shared": 142, "./es6.map": 199, "./es6.weak-map": 305 }], 109: [function (require, module, exports) {
    var global = require('./_global');
    var macrotask = require('./_task').set;
    var Observer = global.MutationObserver || global.WebKitMutationObserver;
    var process = global.process;
    var Promise = global.Promise;
    var isNode = require('./_cof')(process) == 'process';

    module.exports = function () {
      var head, last, notify;

      var flush = function flush() {
        var parent, fn;
        if (isNode && (parent = process.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (e) {
            if (head) notify();else last = undefined;
            throw e;
          }
        }last = undefined;
        if (parent) parent.enter();
      };

      if (isNode) {
        notify = function notify() {
          process.nextTick(flush);
        };
      } else if (Observer) {
        var toggle = true;
        var node = document.createTextNode('');
        new Observer(flush).observe(node, { characterData: true });
        notify = function notify() {
          node.data = toggle = !toggle;
        };
      } else if (Promise && Promise.resolve) {
        var promise = Promise.resolve();
        notify = function notify() {
          promise.then(flush);
        };
      } else {
        notify = function notify() {
          macrotask.call(global, flush);
        };
      }

      return function (fn) {
        var task = { fn: fn, next: undefined };
        if (last) last.next = task;
        if (!head) {
          head = task;
          notify();
        }last = task;
      };
    };
  }, { "./_cof": 60, "./_global": 82, "./_task": 152 }], 110: [function (require, module, exports) {
    'use strict';

    var aFunction = require('./_a-function');

    function PromiseCapability(C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve);
      this.reject = aFunction(reject);
    }

    module.exports.f = function (C) {
      return new PromiseCapability(C);
    };
  }, { "./_a-function": 45 }], 111: [function (require, module, exports) {
    'use strict';

    var getKeys = require('./_object-keys');
    var gOPS = require('./_object-gops');
    var pIE = require('./_object-pie');
    var toObject = require('./_to-object');
    var IObject = require('./_iobject');
    var $assign = Object.assign;

    module.exports = !$assign || require('./_fails')(function () {
      var A = {};
      var B = {};

      var S = Symbol();
      var K = 'abcdefghijklmnopqrst';
      A[S] = 7;
      K.split('').forEach(function (k) {
        B[k] = k;
      });
      return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
    }) ? function assign(target, source) {
      var T = toObject(target);
      var aLen = arguments.length;
      var index = 1;
      var getSymbols = gOPS.f;
      var isEnum = pIE.f;
      while (aLen > index) {
        var S = IObject(arguments[index++]);
        var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while (length > j) {
          if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
        }
      }return T;
    } : $assign;
  }, { "./_fails": 77, "./_iobject": 89, "./_object-gops": 119, "./_object-keys": 122, "./_object-pie": 123, "./_to-object": 158 }], 112: [function (require, module, exports) {
    var anObject = require('./_an-object');
    var dPs = require('./_object-dps');
    var enumBugKeys = require('./_enum-bug-keys');
    var IE_PROTO = require('./_shared-key')('IE_PROTO');
    var Empty = function Empty() {};
    var PROTOTYPE = 'prototype';

    var _createDict = function createDict() {
      var iframe = require('./_dom-create')('iframe');
      var i = enumBugKeys.length;
      var lt = '<';
      var gt = '>';
      var iframeDocument;
      iframe.style.display = 'none';
      require('./_html').appendChild(iframe);
      iframe.src = 'javascript:';
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
      iframeDocument.close();
      _createDict = iframeDocument.F;
      while (i--) {
        delete _createDict[PROTOTYPE][enumBugKeys[i]];
      }return _createDict();
    };

    module.exports = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null;

        result[IE_PROTO] = O;
      } else result = _createDict();
      return Properties === undefined ? result : dPs(result, Properties);
    };
  }, { "./_an-object": 49, "./_dom-create": 72, "./_enum-bug-keys": 73, "./_html": 85, "./_object-dps": 114, "./_shared-key": 141 }], 113: [function (require, module, exports) {
    var anObject = require('./_an-object');
    var IE8_DOM_DEFINE = require('./_ie8-dom-define');
    var toPrimitive = require('./_to-primitive');
    var dP = Object.defineProperty;

    exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) {}
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
  }, { "./_an-object": 49, "./_descriptors": 71, "./_ie8-dom-define": 86, "./_to-primitive": 159 }], 114: [function (require, module, exports) {
    var dP = require('./_object-dp');
    var anObject = require('./_an-object');
    var getKeys = require('./_object-keys');

    module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = getKeys(Properties);
      var length = keys.length;
      var i = 0;
      var P;
      while (length > i) {
        dP.f(O, P = keys[i++], Properties[P]);
      }return O;
    };
  }, { "./_an-object": 49, "./_descriptors": 71, "./_object-dp": 113, "./_object-keys": 122 }], 115: [function (require, module, exports) {
    'use strict';

    module.exports = require('./_library') || !require('./_fails')(function () {
      var K = Math.random();

      __defineSetter__.call(null, K, function () {});
      delete require('./_global')[K];
    });
  }, { "./_fails": 77, "./_global": 82, "./_library": 101 }], 116: [function (require, module, exports) {
    var pIE = require('./_object-pie');
    var createDesc = require('./_property-desc');
    var toIObject = require('./_to-iobject');
    var toPrimitive = require('./_to-primitive');
    var has = require('./_has');
    var IE8_DOM_DEFINE = require('./_ie8-dom-define');
    var gOPD = Object.getOwnPropertyDescriptor;

    exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = toIObject(O);
      P = toPrimitive(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD(O, P);
      } catch (e) {}
      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
  }, { "./_descriptors": 71, "./_has": 83, "./_ie8-dom-define": 86, "./_object-pie": 123, "./_property-desc": 131, "./_to-iobject": 156, "./_to-primitive": 159 }], 117: [function (require, module, exports) {
    var toIObject = require('./_to-iobject');
    var gOPN = require('./_object-gopn').f;
    var toString = {}.toString;

    var windowNames = (typeof window === "undefined" ? "undefined" : _typeof2(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function getWindowNames(it) {
      try {
        return gOPN(it);
      } catch (e) {
        return windowNames.slice();
      }
    };

    module.exports.f = function getOwnPropertyNames(it) {
      return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
    };
  }, { "./_object-gopn": 118, "./_to-iobject": 156 }], 118: [function (require, module, exports) {
    var $keys = require('./_object-keys-internal');
    var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return $keys(O, hiddenKeys);
    };
  }, { "./_enum-bug-keys": 73, "./_object-keys-internal": 121 }], 119: [function (require, module, exports) {
    exports.f = Object.getOwnPropertySymbols;
  }, {}], 120: [function (require, module, exports) {
    var has = require('./_has');
    var toObject = require('./_to-object');
    var IE_PROTO = require('./_shared-key')('IE_PROTO');
    var ObjectProto = Object.prototype;

    module.exports = Object.getPrototypeOf || function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO)) return O[IE_PROTO];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }return O instanceof Object ? ObjectProto : null;
    };
  }, { "./_has": 83, "./_shared-key": 141, "./_to-object": 158 }], 121: [function (require, module, exports) {
    var has = require('./_has');
    var toIObject = require('./_to-iobject');
    var arrayIndexOf = require('./_array-includes')(false);
    var IE_PROTO = require('./_shared-key')('IE_PROTO');

    module.exports = function (object, names) {
      var O = toIObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) {
        if (key != IE_PROTO) has(O, key) && result.push(key);
      }
      while (names.length > i) {
        if (has(O, key = names[i++])) {
          ~arrayIndexOf(result, key) || result.push(key);
        }
      }return result;
    };
  }, { "./_array-includes": 53, "./_has": 83, "./_shared-key": 141, "./_to-iobject": 156 }], 122: [function (require, module, exports) {
    var $keys = require('./_object-keys-internal');
    var enumBugKeys = require('./_enum-bug-keys');

    module.exports = Object.keys || function keys(O) {
      return $keys(O, enumBugKeys);
    };
  }, { "./_enum-bug-keys": 73, "./_object-keys-internal": 121 }], 123: [function (require, module, exports) {
    exports.f = {}.propertyIsEnumerable;
  }, {}], 124: [function (require, module, exports) {
    var $export = require('./_export');
    var core = require('./_core');
    var fails = require('./_fails');
    module.exports = function (KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY];
      var exp = {};
      exp[KEY] = exec(fn);
      $export($export.S + $export.F * fails(function () {
        fn(1);
      }), 'Object', exp);
    };
  }, { "./_core": 65, "./_export": 75, "./_fails": 77 }], 125: [function (require, module, exports) {
    var getKeys = require('./_object-keys');
    var toIObject = require('./_to-iobject');
    var isEnum = require('./_object-pie').f;
    module.exports = function (isEntries) {
      return function (it) {
        var O = toIObject(it);
        var keys = getKeys(O);
        var length = keys.length;
        var i = 0;
        var result = [];
        var key;
        while (length > i) {
          if (isEnum.call(O, key = keys[i++])) {
            result.push(isEntries ? [key, O[key]] : O[key]);
          }
        }return result;
      };
    };
  }, { "./_object-keys": 122, "./_object-pie": 123, "./_to-iobject": 156 }], 126: [function (require, module, exports) {
    var gOPN = require('./_object-gopn');
    var gOPS = require('./_object-gops');
    var anObject = require('./_an-object');
    var Reflect = require('./_global').Reflect;
    module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
      var keys = gOPN.f(anObject(it));
      var getSymbols = gOPS.f;
      return getSymbols ? keys.concat(getSymbols(it)) : keys;
    };
  }, { "./_an-object": 49, "./_global": 82, "./_object-gopn": 118, "./_object-gops": 119 }], 127: [function (require, module, exports) {
    var $parseFloat = require('./_global').parseFloat;
    var $trim = require('./_string-trim').trim;

    module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
      var string = $trim(String(str), 3);
      var result = $parseFloat(string);
      return result === 0 && string.charAt(0) == '-' ? -0 : result;
    } : $parseFloat;
  }, { "./_global": 82, "./_string-trim": 150, "./_string-ws": 151 }], 128: [function (require, module, exports) {
    var $parseInt = require('./_global').parseInt;
    var $trim = require('./_string-trim').trim;
    var ws = require('./_string-ws');
    var hex = /^[-+]?0[xX]/;

    module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
      var string = $trim(String(str), 3);
      return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
    } : $parseInt;
  }, { "./_global": 82, "./_string-trim": 150, "./_string-ws": 151 }], 129: [function (require, module, exports) {
    module.exports = function (exec) {
      try {
        return { e: false, v: exec() };
      } catch (e) {
        return { e: true, v: e };
      }
    };
  }, {}], 130: [function (require, module, exports) {
    var anObject = require('./_an-object');
    var isObject = require('./_is-object');
    var newPromiseCapability = require('./_new-promise-capability');

    module.exports = function (C, x) {
      anObject(C);
      if (isObject(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };
  }, { "./_an-object": 49, "./_is-object": 93, "./_new-promise-capability": 110 }], 131: [function (require, module, exports) {
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
  }, {}], 132: [function (require, module, exports) {
    var redefine = require('./_redefine');
    module.exports = function (target, src, safe) {
      for (var key in src) {
        redefine(target, key, src[key], safe);
      }return target;
    };
  }, { "./_redefine": 133 }], 133: [function (require, module, exports) {
    var global = require('./_global');
    var hide = require('./_hide');
    var has = require('./_has');
    var SRC = require('./_uid')('src');
    var TO_STRING = 'toString';
    var $toString = Function[TO_STRING];
    var TPL = ('' + $toString).split(TO_STRING);

    require('./_core').inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        hide(O, key, val);
      }
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  }, { "./_core": 65, "./_global": 82, "./_has": 83, "./_hide": 84, "./_uid": 163 }], 134: [function (require, module, exports) {
    module.exports = function (regExp, replace) {
      var replacer = replace === Object(replace) ? function (part) {
        return replace[part];
      } : replace;
      return function (it) {
        return String(it).replace(regExp, replacer);
      };
    };
  }, {}], 135: [function (require, module, exports) {
    module.exports = Object.is || function is(x, y) {
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };
  }, {}], 136: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var aFunction = require('./_a-function');
    var ctx = require('./_ctx');
    var forOf = require('./_for-of');

    module.exports = function (COLLECTION) {
      $export($export.S, COLLECTION, { from: function from(source) {
          var mapFn = arguments[1];
          var mapping, A, n, cb;
          aFunction(this);
          mapping = mapFn !== undefined;
          if (mapping) aFunction(mapFn);
          if (source == undefined) return new this();
          A = [];
          if (mapping) {
            n = 0;
            cb = ctx(mapFn, arguments[2], 2);
            forOf(source, false, function (nextItem) {
              A.push(cb(nextItem, n++));
            });
          } else {
            forOf(source, false, A.push, A);
          }
          return new this(A);
        } });
    };
  }, { "./_a-function": 45, "./_ctx": 67, "./_export": 75, "./_for-of": 81 }], 137: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');

    module.exports = function (COLLECTION) {
      $export($export.S, COLLECTION, { of: function of() {
          var length = arguments.length;
          var A = Array(length);
          while (length--) {
            A[length] = arguments[length];
          }return new this(A);
        } });
    };
  }, { "./_export": 75 }], 138: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var anObject = require('./_an-object');
    var check = function check(O, proto) {
      anObject(O);
      if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
    };
    module.exports = {
      set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
        try {
          set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) {
          buggy = true;
        }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
      check: check
    };
  }, { "./_an-object": 49, "./_ctx": 67, "./_is-object": 93, "./_object-gopd": 116 }], 139: [function (require, module, exports) {
    'use strict';

    var global = require('./_global');
    var dP = require('./_object-dp');
    var DESCRIPTORS = require('./_descriptors');
    var SPECIES = require('./_wks')('species');

    module.exports = function (KEY) {
      var C = global[KEY];
      if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
        configurable: true,
        get: function get() {
          return this;
        }
      });
    };
  }, { "./_descriptors": 71, "./_global": 82, "./_object-dp": 113, "./_wks": 167 }], 140: [function (require, module, exports) {
    var def = require('./_object-dp').f;
    var has = require('./_has');
    var TAG = require('./_wks')('toStringTag');

    module.exports = function (it, tag, stat) {
      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
    };
  }, { "./_has": 83, "./_object-dp": 113, "./_wks": 167 }], 141: [function (require, module, exports) {
    var shared = require('./_shared')('keys');
    var uid = require('./_uid');
    module.exports = function (key) {
      return shared[key] || (shared[key] = uid(key));
    };
  }, { "./_shared": 142, "./_uid": 163 }], 142: [function (require, module, exports) {
    var global = require('./_global');
    var SHARED = '__core-js_shared__';
    var store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
      return store[key] || (store[key] = {});
    };
  }, { "./_global": 82 }], 143: [function (require, module, exports) {
    var anObject = require('./_an-object');
    var aFunction = require('./_a-function');
    var SPECIES = require('./_wks')('species');
    module.exports = function (O, D) {
      var C = anObject(O).constructor;
      var S;
      return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
  }, { "./_a-function": 45, "./_an-object": 49, "./_wks": 167 }], 144: [function (require, module, exports) {
    'use strict';

    var fails = require('./_fails');

    module.exports = function (method, arg) {
      return !!method && fails(function () {
        arg ? method.call(null, function () {}, 1) : method.call(null);
      });
    };
  }, { "./_fails": 77 }], 145: [function (require, module, exports) {
    var toInteger = require('./_to-integer');
    var defined = require('./_defined');

    module.exports = function (TO_STRING) {
      return function (that, pos) {
        var s = String(defined(that));
        var i = toInteger(pos);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    };
  }, { "./_defined": 70, "./_to-integer": 155 }], 146: [function (require, module, exports) {
    var isRegExp = require('./_is-regexp');
    var defined = require('./_defined');

    module.exports = function (that, searchString, NAME) {
      if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
      return String(defined(that));
    };
  }, { "./_defined": 70, "./_is-regexp": 94 }], 147: [function (require, module, exports) {
    var $export = require('./_export');
    var fails = require('./_fails');
    var defined = require('./_defined');
    var quot = /"/g;

    var createHTML = function createHTML(string, tag, attribute, value) {
      var S = String(defined(string));
      var p1 = '<' + tag;
      if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
      return p1 + '>' + S + '</' + tag + '>';
    };
    module.exports = function (NAME, exec) {
      var O = {};
      O[NAME] = exec(createHTML);
      $export($export.P + $export.F * fails(function () {
        var test = ''[NAME]('"');
        return test !== test.toLowerCase() || test.split('"').length > 3;
      }), 'String', O);
    };
  }, { "./_defined": 70, "./_export": 75, "./_fails": 77 }], 148: [function (require, module, exports) {
    var toLength = require('./_to-length');
    var repeat = require('./_string-repeat');
    var defined = require('./_defined');

    module.exports = function (that, maxLength, fillString, left) {
      var S = String(defined(that));
      var stringLength = S.length;
      var fillStr = fillString === undefined ? ' ' : String(fillString);
      var intMaxLength = toLength(maxLength);
      if (intMaxLength <= stringLength || fillStr == '') return S;
      var fillLen = intMaxLength - stringLength;
      var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
      return left ? stringFiller + S : S + stringFiller;
    };
  }, { "./_defined": 70, "./_string-repeat": 149, "./_to-length": 157 }], 149: [function (require, module, exports) {
    'use strict';

    var toInteger = require('./_to-integer');
    var defined = require('./_defined');

    module.exports = function repeat(count) {
      var str = String(defined(this));
      var res = '';
      var n = toInteger(count);
      if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
      for (; n > 0; (n >>>= 1) && (str += str)) {
        if (n & 1) res += str;
      }return res;
    };
  }, { "./_defined": 70, "./_to-integer": 155 }], 150: [function (require, module, exports) {
    var $export = require('./_export');
    var defined = require('./_defined');
    var fails = require('./_fails');
    var spaces = require('./_string-ws');
    var space = '[' + spaces + ']';
    var non = "\u200B\x85";
    var ltrim = RegExp('^' + space + space + '*');
    var rtrim = RegExp(space + space + '*$');

    var exporter = function exporter(KEY, exec, ALIAS) {
      var exp = {};
      var FORCE = fails(function () {
        return !!spaces[KEY]() || non[KEY]() != non;
      });
      var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
      if (ALIAS) exp[ALIAS] = fn;
      $export($export.P + $export.F * FORCE, 'String', exp);
    };

    var trim = exporter.trim = function (string, TYPE) {
      string = String(defined(string));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };

    module.exports = exporter;
  }, { "./_defined": 70, "./_export": 75, "./_fails": 77, "./_string-ws": 151 }], 151: [function (require, module, exports) {
    module.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
  }, {}], 152: [function (require, module, exports) {
    var ctx = require('./_ctx');
    var invoke = require('./_invoke');
    var html = require('./_html');
    var cel = require('./_dom-create');
    var global = require('./_global');
    var process = global.process;
    var setTask = global.setImmediate;
    var clearTask = global.clearImmediate;
    var MessageChannel = global.MessageChannel;
    var Dispatch = global.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var defer, channel, port;
    var run = function run() {
      var id = +this;

      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listener = function listener(event) {
      run.call(event.data);
    };

    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [];
        var i = 1;
        while (arguments.length > i) {
          args.push(arguments[i++]);
        }queue[++counter] = function () {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };

      if (require('./_cof')(process) == 'process') {
        defer = function defer(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (Dispatch && Dispatch.now) {
        defer = function defer(id) {
          Dispatch.now(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function defer(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listener, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function defer(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function defer(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  }, { "./_cof": 60, "./_ctx": 67, "./_dom-create": 72, "./_global": 82, "./_html": 85, "./_invoke": 88 }], 153: [function (require, module, exports) {
    var toInteger = require('./_to-integer');
    var max = Math.max;
    var min = Math.min;
    module.exports = function (index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
  }, { "./_to-integer": 155 }], 154: [function (require, module, exports) {
    var toInteger = require('./_to-integer');
    var toLength = require('./_to-length');
    module.exports = function (it) {
      if (it === undefined) return 0;
      var number = toInteger(it);
      var length = toLength(number);
      if (number !== length) throw RangeError('Wrong length!');
      return length;
    };
  }, { "./_to-integer": 155, "./_to-length": 157 }], 155: [function (require, module, exports) {
    var ceil = Math.ceil;
    var floor = Math.floor;
    module.exports = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
  }, {}], 156: [function (require, module, exports) {
    var IObject = require('./_iobject');
    var defined = require('./_defined');
    module.exports = function (it) {
      return IObject(defined(it));
    };
  }, { "./_defined": 70, "./_iobject": 89 }], 157: [function (require, module, exports) {
    var toInteger = require('./_to-integer');
    var min = Math.min;
    module.exports = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    };
  }, { "./_to-integer": 155 }], 158: [function (require, module, exports) {
    var defined = require('./_defined');
    module.exports = function (it) {
      return Object(defined(it));
    };
  }, { "./_defined": 70 }], 159: [function (require, module, exports) {
    var isObject = require('./_is-object');

    module.exports = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
  }, { "./_is-object": 93 }], 160: [function (require, module, exports) {
    'use strict';

    if (require('./_descriptors')) {
      var LIBRARY = require('./_library');
      var global = require('./_global');
      var fails = require('./_fails');
      var $export = require('./_export');
      var $typed = require('./_typed');
      var $buffer = require('./_typed-buffer');
      var ctx = require('./_ctx');
      var anInstance = require('./_an-instance');
      var propertyDesc = require('./_property-desc');
      var hide = require('./_hide');
      var redefineAll = require('./_redefine-all');
      var toInteger = require('./_to-integer');
      var toLength = require('./_to-length');
      var toIndex = require('./_to-index');
      var toAbsoluteIndex = require('./_to-absolute-index');
      var toPrimitive = require('./_to-primitive');
      var has = require('./_has');
      var classof = require('./_classof');
      var isObject = require('./_is-object');
      var toObject = require('./_to-object');
      var isArrayIter = require('./_is-array-iter');
      var create = require('./_object-create');
      var getPrototypeOf = require('./_object-gpo');
      var gOPN = require('./_object-gopn').f;
      var getIterFn = require('./core.get-iterator-method');
      var uid = require('./_uid');
      var wks = require('./_wks');
      var createArrayMethod = require('./_array-methods');
      var createArrayIncludes = require('./_array-includes');
      var speciesConstructor = require('./_species-constructor');
      var ArrayIterators = require('./es6.array.iterator');
      var Iterators = require('./_iterators');
      var $iterDetect = require('./_iter-detect');
      var setSpecies = require('./_set-species');
      var arrayFill = require('./_array-fill');
      var arrayCopyWithin = require('./_array-copy-within');
      var $DP = require('./_object-dp');
      var $GOPD = require('./_object-gopd');
      var dP = $DP.f;
      var gOPD = $GOPD.f;
      var RangeError = global.RangeError;
      var TypeError = global.TypeError;
      var Uint8Array = global.Uint8Array;
      var ARRAY_BUFFER = 'ArrayBuffer';
      var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
      var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
      var PROTOTYPE = 'prototype';
      var ArrayProto = Array[PROTOTYPE];
      var $ArrayBuffer = $buffer.ArrayBuffer;
      var $DataView = $buffer.DataView;
      var arrayForEach = createArrayMethod(0);
      var arrayFilter = createArrayMethod(2);
      var arraySome = createArrayMethod(3);
      var arrayEvery = createArrayMethod(4);
      var arrayFind = createArrayMethod(5);
      var arrayFindIndex = createArrayMethod(6);
      var arrayIncludes = createArrayIncludes(true);
      var arrayIndexOf = createArrayIncludes(false);
      var arrayValues = ArrayIterators.values;
      var arrayKeys = ArrayIterators.keys;
      var arrayEntries = ArrayIterators.entries;
      var arrayLastIndexOf = ArrayProto.lastIndexOf;
      var arrayReduce = ArrayProto.reduce;
      var arrayReduceRight = ArrayProto.reduceRight;
      var arrayJoin = ArrayProto.join;
      var arraySort = ArrayProto.sort;
      var arraySlice = ArrayProto.slice;
      var arrayToString = ArrayProto.toString;
      var arrayToLocaleString = ArrayProto.toLocaleString;
      var ITERATOR = wks('iterator');
      var TAG = wks('toStringTag');
      var TYPED_CONSTRUCTOR = uid('typed_constructor');
      var DEF_CONSTRUCTOR = uid('def_constructor');
      var ALL_CONSTRUCTORS = $typed.CONSTR;
      var TYPED_ARRAY = $typed.TYPED;
      var VIEW = $typed.VIEW;
      var WRONG_LENGTH = 'Wrong length!';

      var $map = createArrayMethod(1, function (O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });

      var LITTLE_ENDIAN = fails(function () {
        return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      });

      var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
        new Uint8Array(1).set({});
      });

      var toOffset = function toOffset(it, BYTES) {
        var offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      var validate = function validate(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + ' is not a typed array!');
      };

      var allocate = function allocate(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        }return new C(length);
      };

      var speciesFromList = function speciesFromList(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function fromList(C, list) {
        var index = 0;
        var length = list.length;
        var result = allocate(C, length);
        while (length > index) {
          result[index] = list[index++];
        }return result;
      };

      var addGetter = function addGetter(it, key, internal) {
        dP(it, key, { get: function get() {
            return this._d[internal];
          } });
      };

      var $from = function from(source) {
        var O = toObject(source);
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var iterFn = getIterFn(O);
        var i, length, values, result, step, iterator;
        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }O = values;
        }
        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }
        return result;
      };

      var $of = function of() {
        var index = 0;
        var length = arguments.length;
        var result = allocate(this, length);
        while (length > index) {
          result[index] = arguments[index++];
        }return result;
      };

      var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
        arrayToLocaleString.call(new Uint8Array(1));
      });

      var $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      var proto = {
        copyWithin: function copyWithin(target, start) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value) {
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn) {
          return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
        },
        find: function find(predicate) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) {
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement) {
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn) {
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn) {
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          var that = this;
          var length = validate(that).length;
          var middle = Math.floor(length / 2);
          var index = 0;
          var value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }return that;
        },
        some: function some(callbackfn) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          var O = validate(this);
          var length = O.length;
          var $begin = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
        }
      };

      var $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      var $set = function set(arrayLike) {
        validate(this);
        var offset = toOffset(arguments[1], 1);
        var length = this.length;
        var src = toObject(arrayLike);
        var len = toLength(src.length);
        var index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);
        while (index < len) {
          this[offset + index] = src[index++];
        }
      };

      var $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        }
      };

      var isTAIndex = function isTAIndex(target, key) {
        return isObject(target) && target[TYPED_ARRAY] && (typeof key === "undefined" ? "undefined" : _typeof2(key)) != 'symbol' && key in target && String(+key) == String(key);
      };
      var $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
      };
      var $setDesc = function defineProperty(target, key, desc) {
        if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
          target[key] = desc.value;
          return target;
        }return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc
      });

      if (fails(function () {
        arrayToString.call({});
      })) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      var $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor: function constructor() {},
        toString: arrayToString,
        toLocaleString: $toLocaleString
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get: function get() {
          return this[TYPED_ARRAY];
        }
      });

      module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
        var GETTER = 'get' + KEY;
        var SETTER = 'set' + KEY;
        var TypedArray = global[NAME];
        var Base = TypedArray || {};
        var TAC = TypedArray && getPrototypeOf(TypedArray);
        var FORCED = !TypedArray || !$typed.ABV;
        var O = {};
        var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
        var getter = function getter(that, index) {
          var data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };
        var setter = function setter(that, index, value) {
          var data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };
        var addElement = function addElement(that, index) {
          dP(that, index, {
            get: function get() {
              return getter(this, index);
            },
            set: function set(value) {
              return setter(this, index, value);
            },
            enumerable: true
          });
        };
        if (FORCED) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, '_d');
            var index = 0;
            var offset = 0;
            var buffer, byteLength, length, klass;
            if (!isObject(data)) {
              length = toIndex(data);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              var $len = data.byteLength;
              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }
              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }
            hide(that, '_d', {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer)
            });
            while (index < length) {
              addElement(that, index++);
            }
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (!fails(function () {
          TypedArray(1);
        }) || !fails(function () {
          new TypedArray(-1);
        }) || !$iterDetect(function (iter) {
          new TypedArray();
          new TypedArray(null);
          new TypedArray(1.5);
          new TypedArray(iter);
        }, true)) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            var klass;

            if (!isObject(data)) return new Base(toIndex(data));
            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
            }
            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }
        var $nativeIterator = TypedArrayPrototype[ITERATOR];
        var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
        var $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get: function get() {
              return NAME;
            }
          });
        }

        O[NAME] = TypedArray;

        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES
        });

        $export($export.S + $export.F * fails(function () {
          Base.of.call(TypedArray, 1);
        }), NAME, {
          from: $from,
          of: $of
        });

        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

        $export($export.P, NAME, proto);

        setSpecies(NAME);

        $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

        if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

        $export($export.P + $export.F * fails(function () {
          new TypedArray(1).slice();
        }), NAME, { slice: $slice });

        $export($export.P + $export.F * (fails(function () {
          return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
        }) || !fails(function () {
          TypedArrayPrototype.toLocaleString.call([1, 2]);
        })), NAME, { toLocaleString: $toLocaleString });

        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else module.exports = function () {};
  }, { "./_an-instance": 48, "./_array-copy-within": 50, "./_array-fill": 51, "./_array-includes": 53, "./_array-methods": 54, "./_classof": 59, "./_ctx": 67, "./_descriptors": 71, "./_export": 75, "./_fails": 77, "./_global": 82, "./_has": 83, "./_hide": 84, "./_is-array-iter": 90, "./_is-object": 93, "./_iter-detect": 98, "./_iterators": 100, "./_library": 101, "./_object-create": 112, "./_object-dp": 113, "./_object-gopd": 116, "./_object-gopn": 118, "./_object-gpo": 120, "./_property-desc": 131, "./_redefine-all": 132, "./_set-species": 139, "./_species-constructor": 143, "./_to-absolute-index": 153, "./_to-index": 154, "./_to-integer": 155, "./_to-length": 157, "./_to-object": 158, "./_to-primitive": 159, "./_typed": 162, "./_typed-buffer": 161, "./_uid": 163, "./_wks": 167, "./core.get-iterator-method": 168, "./es6.array.iterator": 180 }], 161: [function (require, module, exports) {
    'use strict';

    var global = require('./_global');
    var DESCRIPTORS = require('./_descriptors');
    var LIBRARY = require('./_library');
    var $typed = require('./_typed');
    var hide = require('./_hide');
    var redefineAll = require('./_redefine-all');
    var fails = require('./_fails');
    var anInstance = require('./_an-instance');
    var toInteger = require('./_to-integer');
    var toLength = require('./_to-length');
    var toIndex = require('./_to-index');
    var gOPN = require('./_object-gopn').f;
    var dP = require('./_object-dp').f;
    var arrayFill = require('./_array-fill');
    var setToStringTag = require('./_set-to-string-tag');
    var ARRAY_BUFFER = 'ArrayBuffer';
    var DATA_VIEW = 'DataView';
    var PROTOTYPE = 'prototype';
    var WRONG_LENGTH = 'Wrong length!';
    var WRONG_INDEX = 'Wrong index!';
    var $ArrayBuffer = global[ARRAY_BUFFER];
    var $DataView = global[DATA_VIEW];
    var Math = global.Math;
    var RangeError = global.RangeError;

    var Infinity = global.Infinity;
    var BaseBuffer = $ArrayBuffer;
    var abs = Math.abs;
    var pow = Math.pow;
    var floor = Math.floor;
    var log = Math.log;
    var LN2 = Math.LN2;
    var BUFFER = 'buffer';
    var BYTE_LENGTH = 'byteLength';
    var BYTE_OFFSET = 'byteOffset';
    var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
    var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
    var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

    function packIEEE754(value, mLen, nBytes) {
      var buffer = Array(nBytes);
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
      var i = 0;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      var e, m, c;
      value = abs(value);

      if (value != value || value === Infinity) {
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);
        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
      buffer[--i] |= s * 128;
      return buffer;
    }
    function unpackIEEE754(buffer, mLen, nBytes) {
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = eLen - 7;
      var i = nBytes - 1;
      var s = buffer[i--];
      var e = s & 127;
      var m;
      s >>= 7;
      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      }return (s ? -1 : 1) * m * pow(2, e - mLen);
    }

    function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    }
    function packI8(it) {
      return [it & 0xff];
    }
    function packI16(it) {
      return [it & 0xff, it >> 8 & 0xff];
    }
    function packI32(it) {
      return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
    }
    function packF64(it) {
      return packIEEE754(it, 52, 8);
    }
    function packF32(it) {
      return packIEEE754(it, 23, 4);
    }

    function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, { get: function get() {
          return this[internal];
        } });
    }

    function get(view, bytes, index, isLittleEndian) {
      var numIndex = +index;
      var intIndex = toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    }
    function set(view, bytes, index, conversion, value, isLittleEndian) {
      var numIndex = +index;
      var intIndex = toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = conversion(+value);
      for (var i = 0; i < bytes; i++) {
        store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
      }
    }

    if (!$typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
        var byteLength = toIndex(length);
        this._b = arrayFill.call(Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        anInstance(this, $DataView, DATA_VIEW);
        anInstance(buffer, $ArrayBuffer, DATA_VIEW);
        var bufferLength = buffer[$LENGTH];
        var offset = toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (DESCRIPTORS) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return get(this, 1, byteOffset)[0] << 24 >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16: function getUint16(byteOffset) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32: function getInt32(byteOffset) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value) {
          set(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value) {
          set(this, 8, byteOffset, packF64, value, arguments[2]);
        }
      });
    } else {
      if (!fails(function () {
        $ArrayBuffer(1);
      }) || !fails(function () {
        new $ArrayBuffer(-1);
      }) || fails(function () {
        new $ArrayBuffer();
        new $ArrayBuffer(1.5);
        new $ArrayBuffer(NaN);
        return $ArrayBuffer.name != ARRAY_BUFFER;
      })) {
        $ArrayBuffer = function ArrayBuffer(length) {
          anInstance(this, $ArrayBuffer);
          return new BaseBuffer(toIndex(length));
        };
        var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
        }
        if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
      }

      var view = new $DataView(new $ArrayBuffer(2));
      var $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
        setInt8: function setInt8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        },
        setUint8: function setUint8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        }
      }, true);
    }
    setToStringTag($ArrayBuffer, ARRAY_BUFFER);
    setToStringTag($DataView, DATA_VIEW);
    hide($DataView[PROTOTYPE], $typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  }, { "./_an-instance": 48, "./_array-fill": 51, "./_descriptors": 71, "./_fails": 77, "./_global": 82, "./_hide": 84, "./_library": 101, "./_object-dp": 113, "./_object-gopn": 118, "./_redefine-all": 132, "./_set-to-string-tag": 140, "./_to-index": 154, "./_to-integer": 155, "./_to-length": 157, "./_typed": 162 }], 162: [function (require, module, exports) {
    var global = require('./_global');
    var hide = require('./_hide');
    var uid = require('./_uid');
    var TYPED = uid('typed_array');
    var VIEW = uid('view');
    var ABV = !!(global.ArrayBuffer && global.DataView);
    var CONSTR = ABV;
    var i = 0;
    var l = 9;
    var Typed;

    var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

    while (i < l) {
      if (Typed = global[TypedArrayConstructors[i++]]) {
        hide(Typed.prototype, TYPED, true);
        hide(Typed.prototype, VIEW, true);
      } else CONSTR = false;
    }

    module.exports = {
      ABV: ABV,
      CONSTR: CONSTR,
      TYPED: TYPED,
      VIEW: VIEW
    };
  }, { "./_global": 82, "./_hide": 84, "./_uid": 163 }], 163: [function (require, module, exports) {
    var id = 0;
    var px = Math.random();
    module.exports = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };
  }, {}], 164: [function (require, module, exports) {
    var isObject = require('./_is-object');
    module.exports = function (it, TYPE) {
      if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
      return it;
    };
  }, { "./_is-object": 93 }], 165: [function (require, module, exports) {
    var global = require('./_global');
    var core = require('./_core');
    var LIBRARY = require('./_library');
    var wksExt = require('./_wks-ext');
    var defineProperty = require('./_object-dp').f;
    module.exports = function (name) {
      var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
      if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
    };
  }, { "./_core": 65, "./_global": 82, "./_library": 101, "./_object-dp": 113, "./_wks-ext": 166 }], 166: [function (require, module, exports) {
    exports.f = require('./_wks');
  }, { "./_wks": 167 }], 167: [function (require, module, exports) {
    var store = require('./_shared')('wks');
    var uid = require('./_uid');
    var _Symbol2 = require('./_global').Symbol;
    var USE_SYMBOL = typeof _Symbol2 == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && _Symbol2[name] || (USE_SYMBOL ? _Symbol2 : uid)('Symbol.' + name));
    };

    $exports.store = store;
  }, { "./_global": 82, "./_shared": 142, "./_uid": 163 }], 168: [function (require, module, exports) {
    var classof = require('./_classof');
    var ITERATOR = require('./_wks')('iterator');
    var Iterators = require('./_iterators');
    module.exports = require('./_core').getIteratorMethod = function (it) {
      if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
  }, { "./_classof": 59, "./_core": 65, "./_iterators": 100, "./_wks": 167 }], 169: [function (require, module, exports) {
    var $export = require('./_export');
    var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

    $export($export.S, 'RegExp', { escape: function escape(it) {
        return $re(it);
      } });
  }, { "./_export": 75, "./_replacer": 134 }], 170: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

    require('./_add-to-unscopables')('copyWithin');
  }, { "./_add-to-unscopables": 47, "./_array-copy-within": 50, "./_export": 75 }], 171: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $every = require('./_array-methods')(4);

    $export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
      every: function every(callbackfn) {
        return $every(this, callbackfn, arguments[1]);
      }
    });
  }, { "./_array-methods": 54, "./_export": 75, "./_strict-method": 144 }], 172: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.P, 'Array', { fill: require('./_array-fill') });

    require('./_add-to-unscopables')('fill');
  }, { "./_add-to-unscopables": 47, "./_array-fill": 51, "./_export": 75 }], 173: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $filter = require('./_array-methods')(2);

    $export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
      filter: function filter(callbackfn) {
        return $filter(this, callbackfn, arguments[1]);
      }
    });
  }, { "./_array-methods": 54, "./_export": 75, "./_strict-method": 144 }], 174: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $find = require('./_array-methods')(6);
    var KEY = 'findIndex';
    var forced = true;

    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      findIndex: function findIndex(callbackfn) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    require('./_add-to-unscopables')(KEY);
  }, { "./_add-to-unscopables": 47, "./_array-methods": 54, "./_export": 75 }], 175: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $find = require('./_array-methods')(5);
    var KEY = 'find';
    var forced = true;

    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      find: function find(callbackfn) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    require('./_add-to-unscopables')(KEY);
  }, { "./_add-to-unscopables": 47, "./_array-methods": 54, "./_export": 75 }], 176: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $forEach = require('./_array-methods')(0);
    var STRICT = require('./_strict-method')([].forEach, true);

    $export($export.P + $export.F * !STRICT, 'Array', {
      forEach: function forEach(callbackfn) {
        return $forEach(this, callbackfn, arguments[1]);
      }
    });
  }, { "./_array-methods": 54, "./_export": 75, "./_strict-method": 144 }], 177: [function (require, module, exports) {
    'use strict';

    var ctx = require('./_ctx');
    var $export = require('./_export');
    var toObject = require('./_to-object');
    var call = require('./_iter-call');
    var isArrayIter = require('./_is-array-iter');
    var toLength = require('./_to-length');
    var createProperty = require('./_create-property');
    var getIterFn = require('./core.get-iterator-method');

    $export($export.S + $export.F * !require('./_iter-detect')(function (iter) {
      Array.from(iter);
    }), 'Array', {
      from: function from(arrayLike) {
        var O = toObject(arrayLike);
        var C = typeof this == 'function' ? this : Array;
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var index = 0;
        var iterFn = getIterFn(O);
        var length, result, step, iterator;
        if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);

        if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
          for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
            createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
          }
        } else {
          length = toLength(O.length);
          for (result = new C(length); length > index; index++) {
            createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
          }
        }
        result.length = index;
        return result;
      }
    });
  }, { "./_create-property": 66, "./_ctx": 67, "./_export": 75, "./_is-array-iter": 90, "./_iter-call": 95, "./_iter-detect": 98, "./_to-length": 157, "./_to-object": 158, "./core.get-iterator-method": 168 }], 178: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $indexOf = require('./_array-includes')(false);
    var $native = [].indexOf;
    var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

    $export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
      indexOf: function indexOf(searchElement) {
        return NEGATIVE_ZERO ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
      }
    });
  }, { "./_array-includes": 53, "./_export": 75, "./_strict-method": 144 }], 179: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Array', { isArray: require('./_is-array') });
  }, { "./_export": 75, "./_is-array": 91 }], 180: [function (require, module, exports) {
    'use strict';

    var addToUnscopables = require('./_add-to-unscopables');
    var step = require('./_iter-step');
    var Iterators = require('./_iterators');
    var toIObject = require('./_to-iobject');

    module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
      this._t = toIObject(iterated);
      this._i = 0;
      this._k = kind;
    }, function () {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
      }
      if (kind == 'keys') return step(0, index);
      if (kind == 'values') return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, 'values');

    Iterators.Arguments = Iterators.Array;

    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
  }, { "./_add-to-unscopables": 47, "./_iter-define": 97, "./_iter-step": 99, "./_iterators": 100, "./_to-iobject": 156 }], 181: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toIObject = require('./_to-iobject');
    var arrayJoin = [].join;

    $export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
      join: function join(separator) {
        return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
      }
    });
  }, { "./_export": 75, "./_iobject": 89, "./_strict-method": 144, "./_to-iobject": 156 }], 182: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toIObject = require('./_to-iobject');
    var toInteger = require('./_to-integer');
    var toLength = require('./_to-length');
    var $native = [].lastIndexOf;
    var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

    $export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
      lastIndexOf: function lastIndexOf(searchElement) {
        if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
        var O = toIObject(this);
        var length = toLength(O.length);
        var index = length - 1;
        if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
        if (index < 0) index = length + index;
        for (; index >= 0; index--) {
          if (index in O) if (O[index] === searchElement) return index || 0;
        }return -1;
      }
    });
  }, { "./_export": 75, "./_strict-method": 144, "./_to-integer": 155, "./_to-iobject": 156, "./_to-length": 157 }], 183: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $map = require('./_array-methods')(1);

    $export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
      map: function map(callbackfn) {
        return $map(this, callbackfn, arguments[1]);
      }
    });
  }, { "./_array-methods": 54, "./_export": 75, "./_strict-method": 144 }], 184: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var createProperty = require('./_create-property');

    $export($export.S + $export.F * require('./_fails')(function () {
      function F() {}
      return !(Array.of.call(F) instanceof F);
    }), 'Array', {
      of: function of() {
        var index = 0;
        var aLen = arguments.length;
        var result = new (typeof this == 'function' ? this : Array)(aLen);
        while (aLen > index) {
          createProperty(result, index, arguments[index++]);
        }result.length = aLen;
        return result;
      }
    });
  }, { "./_create-property": 66, "./_export": 75, "./_fails": 77 }], 185: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $reduce = require('./_array-reduce');

    $export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
      reduceRight: function reduceRight(callbackfn) {
        return $reduce(this, callbackfn, arguments.length, arguments[1], true);
      }
    });
  }, { "./_array-reduce": 55, "./_export": 75, "./_strict-method": 144 }], 186: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $reduce = require('./_array-reduce');

    $export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
      reduce: function reduce(callbackfn) {
        return $reduce(this, callbackfn, arguments.length, arguments[1], false);
      }
    });
  }, { "./_array-reduce": 55, "./_export": 75, "./_strict-method": 144 }], 187: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var html = require('./_html');
    var cof = require('./_cof');
    var toAbsoluteIndex = require('./_to-absolute-index');
    var toLength = require('./_to-length');
    var arraySlice = [].slice;

    $export($export.P + $export.F * require('./_fails')(function () {
      if (html) arraySlice.call(html);
    }), 'Array', {
      slice: function slice(begin, end) {
        var len = toLength(this.length);
        var klass = cof(this);
        end = end === undefined ? len : end;
        if (klass == 'Array') return arraySlice.call(this, begin, end);
        var start = toAbsoluteIndex(begin, len);
        var upTo = toAbsoluteIndex(end, len);
        var size = toLength(upTo - start);
        var cloned = Array(size);
        var i = 0;
        for (; i < size; i++) {
          cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
        }return cloned;
      }
    });
  }, { "./_cof": 60, "./_export": 75, "./_fails": 77, "./_html": 85, "./_to-absolute-index": 153, "./_to-length": 157 }], 188: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $some = require('./_array-methods')(3);

    $export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
      some: function some(callbackfn) {
        return $some(this, callbackfn, arguments[1]);
      }
    });
  }, { "./_array-methods": 54, "./_export": 75, "./_strict-method": 144 }], 189: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var aFunction = require('./_a-function');
    var toObject = require('./_to-object');
    var fails = require('./_fails');
    var $sort = [].sort;
    var test = [1, 2, 3];

    $export($export.P + $export.F * (fails(function () {
      test.sort(undefined);
    }) || !fails(function () {
      test.sort(null);
    }) || !require('./_strict-method')($sort)), 'Array', {
      sort: function sort(comparefn) {
        return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
      }
    });
  }, { "./_a-function": 45, "./_export": 75, "./_fails": 77, "./_strict-method": 144, "./_to-object": 158 }], 190: [function (require, module, exports) {
    require('./_set-species')('Array');
  }, { "./_set-species": 139 }], 191: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Date', { now: function now() {
        return new Date().getTime();
      } });
  }, { "./_export": 75 }], 192: [function (require, module, exports) {
    var $export = require('./_export');
    var toISOString = require('./_date-to-iso-string');

    $export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
      toISOString: toISOString
    });
  }, { "./_date-to-iso-string": 68, "./_export": 75 }], 193: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toObject = require('./_to-object');
    var toPrimitive = require('./_to-primitive');

    $export($export.P + $export.F * require('./_fails')(function () {
      return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
          return 1;
        } }) !== 1;
    }), 'Date', {
      toJSON: function toJSON(key) {
        var O = toObject(this);
        var pv = toPrimitive(O);
        return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
      }
    });
  }, { "./_export": 75, "./_fails": 77, "./_to-object": 158, "./_to-primitive": 159 }], 194: [function (require, module, exports) {
    var TO_PRIMITIVE = require('./_wks')('toPrimitive');
    var proto = Date.prototype;

    if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
  }, { "./_date-to-primitive": 69, "./_hide": 84, "./_wks": 167 }], 195: [function (require, module, exports) {
    var DateProto = Date.prototype;
    var INVALID_DATE = 'Invalid Date';
    var TO_STRING = 'toString';
    var $toString = DateProto[TO_STRING];
    var getTime = DateProto.getTime;
    if (new Date(NaN) + '' != INVALID_DATE) {
      require('./_redefine')(DateProto, TO_STRING, function toString() {
        var value = getTime.call(this);

        return value === value ? $toString.call(this) : INVALID_DATE;
      });
    }
  }, { "./_redefine": 133 }], 196: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.P, 'Function', { bind: require('./_bind') });
  }, { "./_bind": 58, "./_export": 75 }], 197: [function (require, module, exports) {
    'use strict';

    var isObject = require('./_is-object');
    var getPrototypeOf = require('./_object-gpo');
    var HAS_INSTANCE = require('./_wks')('hasInstance');
    var FunctionProto = Function.prototype;

    if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
        if (typeof this != 'function' || !isObject(O)) return false;
        if (!isObject(this.prototype)) return O instanceof this;

        while (O = getPrototypeOf(O)) {
          if (this.prototype === O) return true;
        }return false;
      } });
  }, { "./_is-object": 93, "./_object-dp": 113, "./_object-gpo": 120, "./_wks": 167 }], 198: [function (require, module, exports) {
    var dP = require('./_object-dp').f;
    var FProto = Function.prototype;
    var nameRE = /^\s*function ([^ (]*)/;
    var NAME = 'name';

    NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
      configurable: true,
      get: function get() {
        try {
          return ('' + this).match(nameRE)[1];
        } catch (e) {
          return '';
        }
      }
    });
  }, { "./_descriptors": 71, "./_object-dp": 113 }], 199: [function (require, module, exports) {
    'use strict';

    var strong = require('./_collection-strong');
    var validate = require('./_validate-collection');
    var MAP = 'Map';

    module.exports = require('./_collection')(MAP, function (get) {
      return function Map() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      get: function get(key) {
        var entry = strong.getEntry(validate(this, MAP), key);
        return entry && entry.v;
      },

      set: function set(key, value) {
        return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
      }
    }, strong, true);
  }, { "./_collection": 64, "./_collection-strong": 61, "./_validate-collection": 164 }], 200: [function (require, module, exports) {
    var $export = require('./_export');
    var log1p = require('./_math-log1p');
    var sqrt = Math.sqrt;
    var $acosh = Math.acosh;

    $export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710 && $acosh(Infinity) == Infinity), 'Math', {
      acosh: function acosh(x) {
        return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
      }
    });
  }, { "./_export": 75, "./_math-log1p": 104 }], 201: [function (require, module, exports) {
    var $export = require('./_export');
    var $asinh = Math.asinh;

    function asinh(x) {
      return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
    }

    $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
  }, { "./_export": 75 }], 202: [function (require, module, exports) {
    var $export = require('./_export');
    var $atanh = Math.atanh;

    $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
      atanh: function atanh(x) {
        return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
      }
    });
  }, { "./_export": 75 }], 203: [function (require, module, exports) {
    var $export = require('./_export');
    var sign = require('./_math-sign');

    $export($export.S, 'Math', {
      cbrt: function cbrt(x) {
        return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
      }
    });
  }, { "./_export": 75, "./_math-sign": 106 }], 204: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      clz32: function clz32(x) {
        return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
      }
    });
  }, { "./_export": 75 }], 205: [function (require, module, exports) {
    var $export = require('./_export');
    var exp = Math.exp;

    $export($export.S, 'Math', {
      cosh: function cosh(x) {
        return (exp(x = +x) + exp(-x)) / 2;
      }
    });
  }, { "./_export": 75 }], 206: [function (require, module, exports) {
    var $export = require('./_export');
    var $expm1 = require('./_math-expm1');

    $export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
  }, { "./_export": 75, "./_math-expm1": 102 }], 207: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { fround: require('./_math-fround') });
  }, { "./_export": 75, "./_math-fround": 103 }], 208: [function (require, module, exports) {
    var $export = require('./_export');
    var abs = Math.abs;

    $export($export.S, 'Math', {
      hypot: function hypot(value1, value2) {
        var sum = 0;
        var i = 0;
        var aLen = arguments.length;
        var larg = 0;
        var arg, div;
        while (i < aLen) {
          arg = abs(arguments[i++]);
          if (larg < arg) {
            div = larg / arg;
            sum = sum * div * div + 1;
            larg = arg;
          } else if (arg > 0) {
            div = arg / larg;
            sum += div * div;
          } else sum += arg;
        }
        return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
      }
    });
  }, { "./_export": 75 }], 209: [function (require, module, exports) {
    var $export = require('./_export');
    var $imul = Math.imul;

    $export($export.S + $export.F * require('./_fails')(function () {
      return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
    }), 'Math', {
      imul: function imul(x, y) {
        var UINT16 = 0xffff;
        var xn = +x;
        var yn = +y;
        var xl = UINT16 & xn;
        var yl = UINT16 & yn;
        return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
      }
    });
  }, { "./_export": 75, "./_fails": 77 }], 210: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      log10: function log10(x) {
        return Math.log(x) * Math.LOG10E;
      }
    });
  }, { "./_export": 75 }], 211: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { log1p: require('./_math-log1p') });
  }, { "./_export": 75, "./_math-log1p": 104 }], 212: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      log2: function log2(x) {
        return Math.log(x) / Math.LN2;
      }
    });
  }, { "./_export": 75 }], 213: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { sign: require('./_math-sign') });
  }, { "./_export": 75, "./_math-sign": 106 }], 214: [function (require, module, exports) {
    var $export = require('./_export');
    var expm1 = require('./_math-expm1');
    var exp = Math.exp;

    $export($export.S + $export.F * require('./_fails')(function () {
      return !Math.sinh(-2e-17) != -2e-17;
    }), 'Math', {
      sinh: function sinh(x) {
        return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
      }
    });
  }, { "./_export": 75, "./_fails": 77, "./_math-expm1": 102 }], 215: [function (require, module, exports) {
    var $export = require('./_export');
    var expm1 = require('./_math-expm1');
    var exp = Math.exp;

    $export($export.S, 'Math', {
      tanh: function tanh(x) {
        var a = expm1(x = +x);
        var b = expm1(-x);
        return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
      }
    });
  }, { "./_export": 75, "./_math-expm1": 102 }], 216: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      trunc: function trunc(it) {
        return (it > 0 ? Math.floor : Math.ceil)(it);
      }
    });
  }, { "./_export": 75 }], 217: [function (require, module, exports) {
    'use strict';

    var global = require('./_global');
    var has = require('./_has');
    var cof = require('./_cof');
    var inheritIfRequired = require('./_inherit-if-required');
    var toPrimitive = require('./_to-primitive');
    var fails = require('./_fails');
    var gOPN = require('./_object-gopn').f;
    var gOPD = require('./_object-gopd').f;
    var dP = require('./_object-dp').f;
    var $trim = require('./_string-trim').trim;
    var NUMBER = 'Number';
    var $Number = global[NUMBER];
    var Base = $Number;
    var proto = $Number.prototype;

    var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
    var TRIM = 'trim' in String.prototype;

    var toNumber = function toNumber(argument) {
      var it = toPrimitive(argument, false);
      if (typeof it == 'string' && it.length > 2) {
        it = TRIM ? it.trim() : $trim(it, 3);
        var first = it.charCodeAt(0);
        var third, radix, maxCode;
        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN;
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66:case 98:
              radix = 2;maxCode = 49;break;
            case 79:case 111:
              radix = 8;maxCode = 55;break;
            default:
              return +it;
          }
          for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
            code = digits.charCodeAt(i);

            if (code < 48 || code > maxCode) return NaN;
          }return parseInt(digits, radix);
        }
      }return +it;
    };

    if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
      $Number = function Number(value) {
        var it = arguments.length < 1 ? 0 : value;
        var that = this;
        return that instanceof $Number && (BROKEN_COF ? fails(function () {
          proto.valueOf.call(that);
        }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
      };
      for (var keys = require('./_descriptors') ? gOPN(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
        if (has(Base, key = keys[j]) && !has($Number, key)) {
          dP($Number, key, gOPD(Base, key));
        }
      }
      $Number.prototype = proto;
      proto.constructor = $Number;
      require('./_redefine')(global, NUMBER, $Number);
    }
  }, { "./_cof": 60, "./_descriptors": 71, "./_fails": 77, "./_global": 82, "./_has": 83, "./_inherit-if-required": 87, "./_object-create": 112, "./_object-dp": 113, "./_object-gopd": 116, "./_object-gopn": 118, "./_redefine": 133, "./_string-trim": 150, "./_to-primitive": 159 }], 218: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
  }, { "./_export": 75 }], 219: [function (require, module, exports) {
    var $export = require('./_export');
    var _isFinite = require('./_global').isFinite;

    $export($export.S, 'Number', {
      isFinite: function isFinite(it) {
        return typeof it == 'number' && _isFinite(it);
      }
    });
  }, { "./_export": 75, "./_global": 82 }], 220: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Number', { isInteger: require('./_is-integer') });
  }, { "./_export": 75, "./_is-integer": 92 }], 221: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Number', {
      isNaN: function isNaN(number) {
        return number != number;
      }
    });
  }, { "./_export": 75 }], 222: [function (require, module, exports) {
    var $export = require('./_export');
    var isInteger = require('./_is-integer');
    var abs = Math.abs;

    $export($export.S, 'Number', {
      isSafeInteger: function isSafeInteger(number) {
        return isInteger(number) && abs(number) <= 0x1fffffffffffff;
      }
    });
  }, { "./_export": 75, "./_is-integer": 92 }], 223: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
  }, { "./_export": 75 }], 224: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
  }, { "./_export": 75 }], 225: [function (require, module, exports) {
    var $export = require('./_export');
    var $parseFloat = require('./_parse-float');

    $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
  }, { "./_export": 75, "./_parse-float": 127 }], 226: [function (require, module, exports) {
    var $export = require('./_export');
    var $parseInt = require('./_parse-int');

    $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
  }, { "./_export": 75, "./_parse-int": 128 }], 227: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toInteger = require('./_to-integer');
    var aNumberValue = require('./_a-number-value');
    var repeat = require('./_string-repeat');
    var $toFixed = 1.0.toFixed;
    var floor = Math.floor;
    var data = [0, 0, 0, 0, 0, 0];
    var ERROR = 'Number.toFixed: incorrect invocation!';
    var ZERO = '0';

    var multiply = function multiply(n, c) {
      var i = -1;
      var c2 = c;
      while (++i < 6) {
        c2 += n * data[i];
        data[i] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };
    var divide = function divide(n) {
      var i = 6;
      var c = 0;
      while (--i >= 0) {
        c += data[i];
        data[i] = floor(c / n);
        c = c % n * 1e7;
      }
    };
    var numToString = function numToString() {
      var i = 6;
      var s = '';
      while (--i >= 0) {
        if (s !== '' || i === 0 || data[i] !== 0) {
          var t = String(data[i]);
          s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
        }
      }return s;
    };
    var pow = function pow(x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    };
    var log = function log(x) {
      var n = 0;
      var x2 = x;
      while (x2 >= 4096) {
        n += 12;
        x2 /= 4096;
      }
      while (x2 >= 2) {
        n += 1;
        x2 /= 2;
      }return n;
    };

    $export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !require('./_fails')(function () {
      $toFixed.call({});
    })), 'Number', {
      toFixed: function toFixed(fractionDigits) {
        var x = aNumberValue(this, ERROR);
        var f = toInteger(fractionDigits);
        var s = '';
        var m = ZERO;
        var e, z, j, k;
        if (f < 0 || f > 20) throw RangeError(ERROR);

        if (x != x) return 'NaN';
        if (x <= -1e21 || x >= 1e21) return String(x);
        if (x < 0) {
          s = '-';
          x = -x;
        }
        if (x > 1e-21) {
          e = log(x * pow(2, 69, 1)) - 69;
          z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
          z *= 0x10000000000000;
          e = 52 - e;
          if (e > 0) {
            multiply(0, z);
            j = f;
            while (j >= 7) {
              multiply(1e7, 0);
              j -= 7;
            }
            multiply(pow(10, j, 1), 0);
            j = e - 1;
            while (j >= 23) {
              divide(1 << 23);
              j -= 23;
            }
            divide(1 << j);
            multiply(1, 1);
            divide(2);
            m = numToString();
          } else {
            multiply(0, z);
            multiply(1 << -e, 0);
            m = numToString() + repeat.call(ZERO, f);
          }
        }
        if (f > 0) {
          k = m.length;
          m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
        } else {
          m = s + m;
        }return m;
      }
    });
  }, { "./_a-number-value": 46, "./_export": 75, "./_fails": 77, "./_string-repeat": 149, "./_to-integer": 155 }], 228: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $fails = require('./_fails');
    var aNumberValue = require('./_a-number-value');
    var $toPrecision = 1.0.toPrecision;

    $export($export.P + $export.F * ($fails(function () {
      return $toPrecision.call(1, undefined) !== '1';
    }) || !$fails(function () {
      $toPrecision.call({});
    })), 'Number', {
      toPrecision: function toPrecision(precision) {
        var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
        return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
      }
    });
  }, { "./_a-number-value": 46, "./_export": 75, "./_fails": 77 }], 229: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });
  }, { "./_export": 75, "./_object-assign": 111 }], 230: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Object', { create: require('./_object-create') });
  }, { "./_export": 75, "./_object-create": 112 }], 231: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });
  }, { "./_descriptors": 71, "./_export": 75, "./_object-dps": 114 }], 232: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });
  }, { "./_descriptors": 71, "./_export": 75, "./_object-dp": 113 }], 233: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var meta = require('./_meta').onFreeze;

    require('./_object-sap')('freeze', function ($freeze) {
      return function freeze(it) {
        return $freeze && isObject(it) ? $freeze(meta(it)) : it;
      };
    });
  }, { "./_is-object": 93, "./_meta": 107, "./_object-sap": 124 }], 234: [function (require, module, exports) {
    var toIObject = require('./_to-iobject');
    var $getOwnPropertyDescriptor = require('./_object-gopd').f;

    require('./_object-sap')('getOwnPropertyDescriptor', function () {
      return function getOwnPropertyDescriptor(it, key) {
        return $getOwnPropertyDescriptor(toIObject(it), key);
      };
    });
  }, { "./_object-gopd": 116, "./_object-sap": 124, "./_to-iobject": 156 }], 235: [function (require, module, exports) {
    require('./_object-sap')('getOwnPropertyNames', function () {
      return require('./_object-gopn-ext').f;
    });
  }, { "./_object-gopn-ext": 117, "./_object-sap": 124 }], 236: [function (require, module, exports) {
    var toObject = require('./_to-object');
    var $getPrototypeOf = require('./_object-gpo');

    require('./_object-sap')('getPrototypeOf', function () {
      return function getPrototypeOf(it) {
        return $getPrototypeOf(toObject(it));
      };
    });
  }, { "./_object-gpo": 120, "./_object-sap": 124, "./_to-object": 158 }], 237: [function (require, module, exports) {
    var isObject = require('./_is-object');

    require('./_object-sap')('isExtensible', function ($isExtensible) {
      return function isExtensible(it) {
        return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
      };
    });
  }, { "./_is-object": 93, "./_object-sap": 124 }], 238: [function (require, module, exports) {
    var isObject = require('./_is-object');

    require('./_object-sap')('isFrozen', function ($isFrozen) {
      return function isFrozen(it) {
        return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
      };
    });
  }, { "./_is-object": 93, "./_object-sap": 124 }], 239: [function (require, module, exports) {
    var isObject = require('./_is-object');

    require('./_object-sap')('isSealed', function ($isSealed) {
      return function isSealed(it) {
        return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
      };
    });
  }, { "./_is-object": 93, "./_object-sap": 124 }], 240: [function (require, module, exports) {
    var $export = require('./_export');
    $export($export.S, 'Object', { is: require('./_same-value') });
  }, { "./_export": 75, "./_same-value": 135 }], 241: [function (require, module, exports) {
    var toObject = require('./_to-object');
    var $keys = require('./_object-keys');

    require('./_object-sap')('keys', function () {
      return function keys(it) {
        return $keys(toObject(it));
      };
    });
  }, { "./_object-keys": 122, "./_object-sap": 124, "./_to-object": 158 }], 242: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var meta = require('./_meta').onFreeze;

    require('./_object-sap')('preventExtensions', function ($preventExtensions) {
      return function preventExtensions(it) {
        return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
      };
    });
  }, { "./_is-object": 93, "./_meta": 107, "./_object-sap": 124 }], 243: [function (require, module, exports) {
    var isObject = require('./_is-object');
    var meta = require('./_meta').onFreeze;

    require('./_object-sap')('seal', function ($seal) {
      return function seal(it) {
        return $seal && isObject(it) ? $seal(meta(it)) : it;
      };
    });
  }, { "./_is-object": 93, "./_meta": 107, "./_object-sap": 124 }], 244: [function (require, module, exports) {
    var $export = require('./_export');
    $export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });
  }, { "./_export": 75, "./_set-proto": 138 }], 245: [function (require, module, exports) {
    'use strict';

    var classof = require('./_classof');
    var test = {};
    test[require('./_wks')('toStringTag')] = 'z';
    if (test + '' != '[object z]') {
      require('./_redefine')(Object.prototype, 'toString', function toString() {
        return '[object ' + classof(this) + ']';
      }, true);
    }
  }, { "./_classof": 59, "./_redefine": 133, "./_wks": 167 }], 246: [function (require, module, exports) {
    var $export = require('./_export');
    var $parseFloat = require('./_parse-float');

    $export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
  }, { "./_export": 75, "./_parse-float": 127 }], 247: [function (require, module, exports) {
    var $export = require('./_export');
    var $parseInt = require('./_parse-int');

    $export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
  }, { "./_export": 75, "./_parse-int": 128 }], 248: [function (require, module, exports) {
    'use strict';

    var LIBRARY = require('./_library');
    var global = require('./_global');
    var ctx = require('./_ctx');
    var classof = require('./_classof');
    var $export = require('./_export');
    var isObject = require('./_is-object');
    var aFunction = require('./_a-function');
    var anInstance = require('./_an-instance');
    var forOf = require('./_for-of');
    var speciesConstructor = require('./_species-constructor');
    var task = require('./_task').set;
    var microtask = require('./_microtask')();
    var newPromiseCapabilityModule = require('./_new-promise-capability');
    var perform = require('./_perform');
    var promiseResolve = require('./_promise-resolve');
    var PROMISE = 'Promise';
    var TypeError = global.TypeError;
    var process = global.process;
    var $Promise = global[PROMISE];
    var isNode = classof(process) == 'process';
    var empty = function empty() {};
    var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
    var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

    var USE_NATIVE = !!function () {
      try {
        var promise = $Promise.resolve(1);
        var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
          exec(empty, empty);
        };

        return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
      } catch (e) {}
    }();

    var isThenable = function isThenable(it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var notify = function notify(promise, isReject) {
      if (promise._n) return;
      promise._n = true;
      var chain = promise._c;
      microtask(function () {
        var value = promise._v;
        var ok = promise._s == 1;
        var i = 0;
        var run = function run(reaction) {
          var handler = ok ? reaction.ok : reaction.fail;
          var resolve = reaction.resolve;
          var reject = reaction.reject;
          var domain = reaction.domain;
          var result, then;
          try {
            if (handler) {
              if (!ok) {
                if (promise._h == 2) onHandleUnhandled(promise);
                promise._h = 1;
              }
              if (handler === true) result = value;else {
                if (domain) domain.enter();
                result = handler(value);
                if (domain) domain.exit();
              }
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i) {
          run(chain[i++]);
        }
        promise._c = [];
        promise._n = false;
        if (isReject && !promise._h) onUnhandled(promise);
      });
    };
    var onUnhandled = function onUnhandled(promise) {
      task.call(global, function () {
        var value = promise._v;
        var unhandled = isUnhandled(promise);
        var result, handler, console;
        if (unhandled) {
          result = perform(function () {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (handler = global.onunhandledrejection) {
              handler({ promise: promise, reason: value });
            } else if ((console = global.console) && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          });

          promise._h = isNode || isUnhandled(promise) ? 2 : 1;
        }promise._a = undefined;
        if (unhandled && result.e) throw result.v;
      });
    };
    var isUnhandled = function isUnhandled(promise) {
      if (promise._h == 1) return false;
      var chain = promise._a || promise._c;
      var i = 0;
      var reaction;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
      }return true;
    };
    var onHandleUnhandled = function onHandleUnhandled(promise) {
      task.call(global, function () {
        var handler;
        if (isNode) {
          process.emit('rejectionHandled', promise);
        } else if (handler = global.onrejectionhandled) {
          handler({ promise: promise, reason: promise._v });
        }
      });
    };
    var $reject = function $reject(value) {
      var promise = this;
      if (promise._d) return;
      promise._d = true;
      promise = promise._w || promise;
      promise._v = value;
      promise._s = 2;
      if (!promise._a) promise._a = promise._c.slice();
      notify(promise, true);
    };
    var $resolve = function $resolve(value) {
      var promise = this;
      var then;
      if (promise._d) return;
      promise._d = true;
      promise = promise._w || promise;
      try {
        if (promise === value) throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          microtask(function () {
            var wrapper = { _w: promise, _d: false };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          promise._v = value;
          promise._s = 1;
          notify(promise, false);
        }
      } catch (e) {
        $reject.call({ _w: promise, _d: false }, e);
      }
    };

    if (!USE_NATIVE) {
      $Promise = function Promise(executor) {
        anInstance(this, $Promise, PROMISE, '_h');
        aFunction(executor);
        Internal.call(this);
        try {
          executor(ctx($resolve, this, 1), ctx($reject, this, 1));
        } catch (err) {
          $reject.call(this, err);
        }
      };

      Internal = function Promise(executor) {
        this._c = [];
        this._a = undefined;
        this._s = 0;
        this._d = false;
        this._v = undefined;
        this._h = 0;
        this._n = false;
      };
      Internal.prototype = require('./_redefine-all')($Promise.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = isNode ? process.domain : undefined;
          this._c.push(reaction);
          if (this._a) this._a.push(reaction);
          if (this._s) notify(this, false);
          return reaction.promise;
        },

        'catch': function _catch(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      OwnPromiseCapability = function OwnPromiseCapability() {
        var promise = new Internal();
        this.promise = promise;
        this.resolve = ctx($resolve, promise, 1);
        this.reject = ctx($reject, promise, 1);
      };
      newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
        return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
    require('./_set-to-string-tag')($Promise, PROMISE);
    require('./_set-species')(PROMISE);
    Wrapper = require('./_core')[PROMISE];

    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
      reject: function reject(r) {
        var capability = newPromiseCapability(this);
        var $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      }
    });
    $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
      resolve: function resolve(x) {
        return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
      }
    });
    $export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
      $Promise.all(iter)['catch'](empty);
    })), PROMISE, {
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var values = [];
          var index = 0;
          var remaining = 1;
          forOf(iterable, false, function (promise) {
            var $index = index++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            C.resolve(promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[$index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.e) reject(result.v);
        return capability.promise;
      },

      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function () {
          forOf(iterable, false, function (promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (result.e) reject(result.v);
        return capability.promise;
      }
    });
  }, { "./_a-function": 45, "./_an-instance": 48, "./_classof": 59, "./_core": 65, "./_ctx": 67, "./_export": 75, "./_for-of": 81, "./_global": 82, "./_is-object": 93, "./_iter-detect": 98, "./_library": 101, "./_microtask": 109, "./_new-promise-capability": 110, "./_perform": 129, "./_promise-resolve": 130, "./_redefine-all": 132, "./_set-species": 139, "./_set-to-string-tag": 140, "./_species-constructor": 143, "./_task": 152, "./_wks": 167 }], 249: [function (require, module, exports) {
    var $export = require('./_export');
    var aFunction = require('./_a-function');
    var anObject = require('./_an-object');
    var rApply = (require('./_global').Reflect || {}).apply;
    var fApply = Function.apply;

    $export($export.S + $export.F * !require('./_fails')(function () {
      rApply(function () {});
    }), 'Reflect', {
      apply: function apply(target, thisArgument, argumentsList) {
        var T = aFunction(target);
        var L = anObject(argumentsList);
        return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
      }
    });
  }, { "./_a-function": 45, "./_an-object": 49, "./_export": 75, "./_fails": 77, "./_global": 82 }], 250: [function (require, module, exports) {
    var $export = require('./_export');
    var create = require('./_object-create');
    var aFunction = require('./_a-function');
    var anObject = require('./_an-object');
    var isObject = require('./_is-object');
    var fails = require('./_fails');
    var bind = require('./_bind');
    var rConstruct = (require('./_global').Reflect || {}).construct;

    var NEW_TARGET_BUG = fails(function () {
      function F() {}
      return !(rConstruct(function () {}, [], F) instanceof F);
    });
    var ARGS_BUG = !fails(function () {
      rConstruct(function () {});
    });

    $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
      construct: function construct(Target, args) {
        aFunction(Target);
        anObject(args);
        var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
        if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
        if (Target == newTarget) {
          switch (args.length) {
            case 0:
              return new Target();
            case 1:
              return new Target(args[0]);
            case 2:
              return new Target(args[0], args[1]);
            case 3:
              return new Target(args[0], args[1], args[2]);
            case 4:
              return new Target(args[0], args[1], args[2], args[3]);
          }

          var $args = [null];
          $args.push.apply($args, args);
          return new (bind.apply(Target, $args))();
        }

        var proto = newTarget.prototype;
        var instance = create(isObject(proto) ? proto : Object.prototype);
        var result = Function.apply.call(Target, instance, args);
        return isObject(result) ? result : instance;
      }
    });
  }, { "./_a-function": 45, "./_an-object": 49, "./_bind": 58, "./_export": 75, "./_fails": 77, "./_global": 82, "./_is-object": 93, "./_object-create": 112 }], 251: [function (require, module, exports) {
    var dP = require('./_object-dp');
    var $export = require('./_export');
    var anObject = require('./_an-object');
    var toPrimitive = require('./_to-primitive');

    $export($export.S + $export.F * require('./_fails')(function () {
      Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
    }), 'Reflect', {
      defineProperty: function defineProperty(target, propertyKey, attributes) {
        anObject(target);
        propertyKey = toPrimitive(propertyKey, true);
        anObject(attributes);
        try {
          dP.f(target, propertyKey, attributes);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "./_an-object": 49, "./_export": 75, "./_fails": 77, "./_object-dp": 113, "./_to-primitive": 159 }], 252: [function (require, module, exports) {
    var $export = require('./_export');
    var gOPD = require('./_object-gopd').f;
    var anObject = require('./_an-object');

    $export($export.S, 'Reflect', {
      deleteProperty: function deleteProperty(target, propertyKey) {
        var desc = gOPD(anObject(target), propertyKey);
        return desc && !desc.configurable ? false : delete target[propertyKey];
      }
    });
  }, { "./_an-object": 49, "./_export": 75, "./_object-gopd": 116 }], 253: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var anObject = require('./_an-object');
    var Enumerate = function Enumerate(iterated) {
      this._t = anObject(iterated);
      this._i = 0;
      var keys = this._k = [];
      var key;
      for (key in iterated) {
        keys.push(key);
      }
    };
    require('./_iter-create')(Enumerate, 'Object', function () {
      var that = this;
      var keys = that._k;
      var key;
      do {
        if (that._i >= keys.length) return { value: undefined, done: true };
      } while (!((key = keys[that._i++]) in that._t));
      return { value: key, done: false };
    });

    $export($export.S, 'Reflect', {
      enumerate: function enumerate(target) {
        return new Enumerate(target);
      }
    });
  }, { "./_an-object": 49, "./_export": 75, "./_iter-create": 96 }], 254: [function (require, module, exports) {
    var gOPD = require('./_object-gopd');
    var $export = require('./_export');
    var anObject = require('./_an-object');

    $export($export.S, 'Reflect', {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        return gOPD.f(anObject(target), propertyKey);
      }
    });
  }, { "./_an-object": 49, "./_export": 75, "./_object-gopd": 116 }], 255: [function (require, module, exports) {
    var $export = require('./_export');
    var getProto = require('./_object-gpo');
    var anObject = require('./_an-object');

    $export($export.S, 'Reflect', {
      getPrototypeOf: function getPrototypeOf(target) {
        return getProto(anObject(target));
      }
    });
  }, { "./_an-object": 49, "./_export": 75, "./_object-gpo": 120 }], 256: [function (require, module, exports) {
    var gOPD = require('./_object-gopd');
    var getPrototypeOf = require('./_object-gpo');
    var has = require('./_has');
    var $export = require('./_export');
    var isObject = require('./_is-object');
    var anObject = require('./_an-object');

    function get(target, propertyKey) {
      var receiver = arguments.length < 3 ? target : arguments[2];
      var desc, proto;
      if (anObject(target) === receiver) return target[propertyKey];
      if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
      if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
    }

    $export($export.S, 'Reflect', { get: get });
  }, { "./_an-object": 49, "./_export": 75, "./_has": 83, "./_is-object": 93, "./_object-gopd": 116, "./_object-gpo": 120 }], 257: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Reflect', {
      has: function has(target, propertyKey) {
        return propertyKey in target;
      }
    });
  }, { "./_export": 75 }], 258: [function (require, module, exports) {
    var $export = require('./_export');
    var anObject = require('./_an-object');
    var $isExtensible = Object.isExtensible;

    $export($export.S, 'Reflect', {
      isExtensible: function isExtensible(target) {
        anObject(target);
        return $isExtensible ? $isExtensible(target) : true;
      }
    });
  }, { "./_an-object": 49, "./_export": 75 }], 259: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });
  }, { "./_export": 75, "./_own-keys": 126 }], 260: [function (require, module, exports) {
    var $export = require('./_export');
    var anObject = require('./_an-object');
    var $preventExtensions = Object.preventExtensions;

    $export($export.S, 'Reflect', {
      preventExtensions: function preventExtensions(target) {
        anObject(target);
        try {
          if ($preventExtensions) $preventExtensions(target);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "./_an-object": 49, "./_export": 75 }], 261: [function (require, module, exports) {
    var $export = require('./_export');
    var setProto = require('./_set-proto');

    if (setProto) $export($export.S, 'Reflect', {
      setPrototypeOf: function setPrototypeOf(target, proto) {
        setProto.check(target, proto);
        try {
          setProto.set(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "./_export": 75, "./_set-proto": 138 }], 262: [function (require, module, exports) {
    var dP = require('./_object-dp');
    var gOPD = require('./_object-gopd');
    var getPrototypeOf = require('./_object-gpo');
    var has = require('./_has');
    var $export = require('./_export');
    var createDesc = require('./_property-desc');
    var anObject = require('./_an-object');
    var isObject = require('./_is-object');

    function set(target, propertyKey, V) {
      var receiver = arguments.length < 4 ? target : arguments[3];
      var ownDesc = gOPD.f(anObject(target), propertyKey);
      var existingDescriptor, proto;
      if (!ownDesc) {
        if (isObject(proto = getPrototypeOf(target))) {
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = createDesc(0);
      }
      if (has(ownDesc, 'value')) {
        if (ownDesc.writable === false || !isObject(receiver)) return false;
        existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
        existingDescriptor.value = V;
        dP.f(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }

    $export($export.S, 'Reflect', { set: set });
  }, { "./_an-object": 49, "./_export": 75, "./_has": 83, "./_is-object": 93, "./_object-dp": 113, "./_object-gopd": 116, "./_object-gpo": 120, "./_property-desc": 131 }], 263: [function (require, module, exports) {
    var global = require('./_global');
    var inheritIfRequired = require('./_inherit-if-required');
    var dP = require('./_object-dp').f;
    var gOPN = require('./_object-gopn').f;
    var isRegExp = require('./_is-regexp');
    var $flags = require('./_flags');
    var $RegExp = global.RegExp;
    var Base = $RegExp;
    var proto = $RegExp.prototype;
    var re1 = /a/g;
    var re2 = /a/g;

    var CORRECT_NEW = new $RegExp(re1) !== re1;

    if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
      re2[require('./_wks')('match')] = false;

      return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
    }))) {
      $RegExp = function RegExp(p, f) {
        var tiRE = this instanceof $RegExp;
        var piRE = isRegExp(p);
        var fiU = f === undefined;
        return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
      };
      var proxy = function proxy(key) {
        key in $RegExp || dP($RegExp, key, {
          configurable: true,
          get: function get() {
            return Base[key];
          },
          set: function set(it) {
            Base[key] = it;
          }
        });
      };
      for (var keys = gOPN(Base), i = 0; keys.length > i;) {
        proxy(keys[i++]);
      }proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      require('./_redefine')(global, 'RegExp', $RegExp);
    }

    require('./_set-species')('RegExp');
  }, { "./_descriptors": 71, "./_fails": 77, "./_flags": 79, "./_global": 82, "./_inherit-if-required": 87, "./_is-regexp": 94, "./_object-dp": 113, "./_object-gopn": 118, "./_redefine": 133, "./_set-species": 139, "./_wks": 167 }], 264: [function (require, module, exports) {
    if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
      configurable: true,
      get: require('./_flags')
    });
  }, { "./_descriptors": 71, "./_flags": 79, "./_object-dp": 113 }], 265: [function (require, module, exports) {
    require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
      return [function match(regexp) {
        'use strict';

        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      }, $match];
    });
  }, { "./_fix-re-wks": 78 }], 266: [function (require, module, exports) {
    require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace) {
      return [function replace(searchValue, replaceValue) {
        'use strict';

        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
      }, $replace];
    });
  }, { "./_fix-re-wks": 78 }], 267: [function (require, module, exports) {
    require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search) {
      return [function search(regexp) {
        'use strict';

        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      }, $search];
    });
  }, { "./_fix-re-wks": 78 }], 268: [function (require, module, exports) {
    require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split) {
      'use strict';

      var isRegExp = require('./_is-regexp');
      var _split = $split;
      var $push = [].push;
      var $SPLIT = 'split';
      var LENGTH = 'length';
      var LAST_INDEX = 'lastIndex';
      if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
        var NPCG = /()??/.exec('')[1] === undefined;
        $split = function $split(separator, limit) {
          var string = String(this);
          if (separator === undefined && limit === 0) return [];

          if (!isRegExp(separator)) return _split.call(string, separator, limit);
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;

          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var separator2, match, lastIndex, lastLength, i;

          if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
          while (match = separatorCopy.exec(string)) {
            lastIndex = match.index + match[0][LENGTH];
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));

              if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
                for (i = 1; i < arguments[LENGTH] - 2; i++) {
                  if (arguments[i] === undefined) match[i] = undefined;
                }
              });
              if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
              lastLength = match[0][LENGTH];
              lastLastIndex = lastIndex;
              if (output[LENGTH] >= splitLimit) break;
            }
            if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++;
          }
          if (lastLastIndex === string[LENGTH]) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
        };
      } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
        $split = function $split(separator, limit) {
          return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
        };
      }

      return [function split(separator, limit) {
        var O = defined(this);
        var fn = separator == undefined ? undefined : separator[SPLIT];
        return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
      }, $split];
    });
  }, { "./_fix-re-wks": 78, "./_is-regexp": 94 }], 269: [function (require, module, exports) {
    'use strict';

    require('./es6.regexp.flags');
    var anObject = require('./_an-object');
    var $flags = require('./_flags');
    var DESCRIPTORS = require('./_descriptors');
    var TO_STRING = 'toString';
    var $toString = /./[TO_STRING];

    var define = function define(fn) {
      require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
    };

    if (require('./_fails')(function () {
      return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
    })) {
      define(function toString() {
        var R = anObject(this);
        return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
      });
    } else if ($toString.name != TO_STRING) {
      define(function toString() {
        return $toString.call(this);
      });
    }
  }, { "./_an-object": 49, "./_descriptors": 71, "./_fails": 77, "./_flags": 79, "./_redefine": 133, "./es6.regexp.flags": 264 }], 270: [function (require, module, exports) {
    'use strict';

    var strong = require('./_collection-strong');
    var validate = require('./_validate-collection');
    var SET = 'Set';

    module.exports = require('./_collection')(SET, function (get) {
      return function Set() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      add: function add(value) {
        return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
      }
    }, strong);
  }, { "./_collection": 64, "./_collection-strong": 61, "./_validate-collection": 164 }], 271: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('anchor', function (createHTML) {
      return function anchor(name) {
        return createHTML(this, 'a', 'name', name);
      };
    });
  }, { "./_string-html": 147 }], 272: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('big', function (createHTML) {
      return function big() {
        return createHTML(this, 'big', '', '');
      };
    });
  }, { "./_string-html": 147 }], 273: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('blink', function (createHTML) {
      return function blink() {
        return createHTML(this, 'blink', '', '');
      };
    });
  }, { "./_string-html": 147 }], 274: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('bold', function (createHTML) {
      return function bold() {
        return createHTML(this, 'b', '', '');
      };
    });
  }, { "./_string-html": 147 }], 275: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $at = require('./_string-at')(false);
    $export($export.P, 'String', {
      codePointAt: function codePointAt(pos) {
        return $at(this, pos);
      }
    });
  }, { "./_export": 75, "./_string-at": 145 }], 276: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toLength = require('./_to-length');
    var context = require('./_string-context');
    var ENDS_WITH = 'endsWith';
    var $endsWith = ''[ENDS_WITH];

    $export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
      endsWith: function endsWith(searchString) {
        var that = context(this, searchString, ENDS_WITH);
        var endPosition = arguments.length > 1 ? arguments[1] : undefined;
        var len = toLength(that.length);
        var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
        var search = String(searchString);
        return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
      }
    });
  }, { "./_export": 75, "./_fails-is-regexp": 76, "./_string-context": 146, "./_to-length": 157 }], 277: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('fixed', function (createHTML) {
      return function fixed() {
        return createHTML(this, 'tt', '', '');
      };
    });
  }, { "./_string-html": 147 }], 278: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('fontcolor', function (createHTML) {
      return function fontcolor(color) {
        return createHTML(this, 'font', 'color', color);
      };
    });
  }, { "./_string-html": 147 }], 279: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('fontsize', function (createHTML) {
      return function fontsize(size) {
        return createHTML(this, 'font', 'size', size);
      };
    });
  }, { "./_string-html": 147 }], 280: [function (require, module, exports) {
    var $export = require('./_export');
    var toAbsoluteIndex = require('./_to-absolute-index');
    var fromCharCode = String.fromCharCode;
    var $fromCodePoint = String.fromCodePoint;

    $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
      fromCodePoint: function fromCodePoint(x) {
        var res = [];
        var aLen = arguments.length;
        var i = 0;
        var code;
        while (aLen > i) {
          code = +arguments[i++];
          if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
          res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
        }return res.join('');
      }
    });
  }, { "./_export": 75, "./_to-absolute-index": 153 }], 281: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var context = require('./_string-context');
    var INCLUDES = 'includes';

    $export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
      includes: function includes(searchString) {
        return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
  }, { "./_export": 75, "./_fails-is-regexp": 76, "./_string-context": 146 }], 282: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('italics', function (createHTML) {
      return function italics() {
        return createHTML(this, 'i', '', '');
      };
    });
  }, { "./_string-html": 147 }], 283: [function (require, module, exports) {
    'use strict';

    var $at = require('./_string-at')(true);

    require('./_iter-define')(String, 'String', function (iterated) {
      this._t = String(iterated);
      this._i = 0;
    }, function () {
      var O = this._t;
      var index = this._i;
      var point;
      if (index >= O.length) return { value: undefined, done: true };
      point = $at(O, index);
      this._i += point.length;
      return { value: point, done: false };
    });
  }, { "./_iter-define": 97, "./_string-at": 145 }], 284: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('link', function (createHTML) {
      return function link(url) {
        return createHTML(this, 'a', 'href', url);
      };
    });
  }, { "./_string-html": 147 }], 285: [function (require, module, exports) {
    var $export = require('./_export');
    var toIObject = require('./_to-iobject');
    var toLength = require('./_to-length');

    $export($export.S, 'String', {
      raw: function raw(callSite) {
        var tpl = toIObject(callSite.raw);
        var len = toLength(tpl.length);
        var aLen = arguments.length;
        var res = [];
        var i = 0;
        while (len > i) {
          res.push(String(tpl[i++]));
          if (i < aLen) res.push(String(arguments[i]));
        }return res.join('');
      }
    });
  }, { "./_export": 75, "./_to-iobject": 156, "./_to-length": 157 }], 286: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.P, 'String', {
      repeat: require('./_string-repeat')
    });
  }, { "./_export": 75, "./_string-repeat": 149 }], 287: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('small', function (createHTML) {
      return function small() {
        return createHTML(this, 'small', '', '');
      };
    });
  }, { "./_string-html": 147 }], 288: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toLength = require('./_to-length');
    var context = require('./_string-context');
    var STARTS_WITH = 'startsWith';
    var $startsWith = ''[STARTS_WITH];

    $export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
      startsWith: function startsWith(searchString) {
        var that = context(this, searchString, STARTS_WITH);
        var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
        var search = String(searchString);
        return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
      }
    });
  }, { "./_export": 75, "./_fails-is-regexp": 76, "./_string-context": 146, "./_to-length": 157 }], 289: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('strike', function (createHTML) {
      return function strike() {
        return createHTML(this, 'strike', '', '');
      };
    });
  }, { "./_string-html": 147 }], 290: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('sub', function (createHTML) {
      return function sub() {
        return createHTML(this, 'sub', '', '');
      };
    });
  }, { "./_string-html": 147 }], 291: [function (require, module, exports) {
    'use strict';

    require('./_string-html')('sup', function (createHTML) {
      return function sup() {
        return createHTML(this, 'sup', '', '');
      };
    });
  }, { "./_string-html": 147 }], 292: [function (require, module, exports) {
    'use strict';

    require('./_string-trim')('trim', function ($trim) {
      return function trim() {
        return $trim(this, 3);
      };
    });
  }, { "./_string-trim": 150 }], 293: [function (require, module, exports) {
    'use strict';

    var global = require('./_global');
    var has = require('./_has');
    var DESCRIPTORS = require('./_descriptors');
    var $export = require('./_export');
    var redefine = require('./_redefine');
    var META = require('./_meta').KEY;
    var $fails = require('./_fails');
    var shared = require('./_shared');
    var setToStringTag = require('./_set-to-string-tag');
    var uid = require('./_uid');
    var wks = require('./_wks');
    var wksExt = require('./_wks-ext');
    var wksDefine = require('./_wks-define');
    var enumKeys = require('./_enum-keys');
    var isArray = require('./_is-array');
    var anObject = require('./_an-object');
    var toIObject = require('./_to-iobject');
    var toPrimitive = require('./_to-primitive');
    var createDesc = require('./_property-desc');
    var _create = require('./_object-create');
    var gOPNExt = require('./_object-gopn-ext');
    var $GOPD = require('./_object-gopd');
    var $DP = require('./_object-dp');
    var $keys = require('./_object-keys');
    var gOPD = $GOPD.f;
    var dP = $DP.f;
    var gOPN = gOPNExt.f;
    var $Symbol = global.Symbol;
    var $JSON = global.JSON;
    var _stringify = $JSON && $JSON.stringify;
    var PROTOTYPE = 'prototype';
    var HIDDEN = wks('_hidden');
    var TO_PRIMITIVE = wks('toPrimitive');
    var isEnum = {}.propertyIsEnumerable;
    var SymbolRegistry = shared('symbol-registry');
    var AllSymbols = shared('symbols');
    var OPSymbols = shared('op-symbols');
    var ObjectProto = Object[PROTOTYPE];
    var USE_NATIVE = typeof $Symbol == 'function';
    var QObject = global.QObject;

    var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

    var setSymbolDesc = DESCRIPTORS && $fails(function () {
      return _create(dP({}, 'a', {
        get: function get() {
          return dP(this, 'a', { value: 7 }).a;
        }
      })).a != 7;
    }) ? function (it, key, D) {
      var protoDesc = gOPD(ObjectProto, key);
      if (protoDesc) delete ObjectProto[key];
      dP(it, key, D);
      if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;

    var wrap = function wrap(tag) {
      var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
      sym._k = tag;
      return sym;
    };

    var isSymbol = USE_NATIVE && _typeof2($Symbol.iterator) == 'symbol' ? function (it) {
      return (typeof it === "undefined" ? "undefined" : _typeof2(it)) == 'symbol';
    } : function (it) {
      return it instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(it, key, D) {
      if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
      anObject(it);
      key = toPrimitive(key, true);
      anObject(D);
      if (has(AllSymbols, key)) {
        if (!D.enumerable) {
          if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
          it[HIDDEN][key] = true;
        } else {
          if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
          D = _create(D, { enumerable: createDesc(0, false) });
        }return setSymbolDesc(it, key, D);
      }return dP(it, key, D);
    };
    var $defineProperties = function defineProperties(it, P) {
      anObject(it);
      var keys = enumKeys(P = toIObject(P));
      var i = 0;
      var l = keys.length;
      var key;
      while (l > i) {
        $defineProperty(it, key = keys[i++], P[key]);
      }return it;
    };
    var $create = function create(it, P) {
      return P === undefined ? _create(it) : $defineProperties(_create(it), P);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
      var E = isEnum.call(this, key = toPrimitive(key, true));
      if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
      return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
      it = toIObject(it);
      key = toPrimitive(key, true);
      if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
      var D = gOPD(it, key);
      if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
      return D;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
      var names = gOPN(toIObject(it));
      var result = [];
      var i = 0;
      var key;
      while (names.length > i) {
        if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
      }return result;
    };
    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
      var IS_OP = it === ObjectProto;
      var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
      var result = [];
      var i = 0;
      var key;
      while (names.length > i) {
        if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
      }return result;
    };

    if (!USE_NATIVE) {
      $Symbol = function _Symbol3() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
        var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
        var $set = function $set(value) {
          if (this === ObjectProto) $set.call(OPSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDesc(this, tag, createDesc(1, value));
        };
        if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
        return wrap(tag);
      };
      redefine($Symbol[PROTOTYPE], 'toString', function toString() {
        return this._k;
      });

      $GOPD.f = $getOwnPropertyDescriptor;
      $DP.f = $defineProperty;
      require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
      require('./_object-pie').f = $propertyIsEnumerable;
      require('./_object-gops').f = $getOwnPropertySymbols;

      if (DESCRIPTORS && !require('./_library')) {
        redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
      }

      wksExt.f = function (name) {
        return wrap(wks(name));
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

    for (var es6Symbols = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
      wks(es6Symbols[j++]);
    }for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
      wksDefine(wellKnownSymbols[k++]);
    }$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
      'for': function _for(key) {
        return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
      },

      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
        for (var key in SymbolRegistry) {
          if (SymbolRegistry[key] === sym) return key;
        }
      },
      useSetter: function useSetter() {
        setter = true;
      },
      useSimple: function useSimple() {
        setter = false;
      }
    });

    $export($export.S + $export.F * !USE_NATIVE, 'Object', {
      create: $create,

      defineProperty: $defineProperty,

      defineProperties: $defineProperties,

      getOwnPropertyDescriptor: $getOwnPropertyDescriptor,

      getOwnPropertyNames: $getOwnPropertyNames,

      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
      var S = $Symbol();

      return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
    })), 'JSON', {
      stringify: function stringify(it) {
        if (it === undefined || isSymbol(it)) return;
        var args = [it];
        var i = 1;
        var replacer, $replacer;
        while (arguments.length > i) {
          args.push(arguments[i++]);
        }replacer = args[1];
        if (typeof replacer == 'function') $replacer = replacer;
        if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
          if ($replacer) value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
      }
    });

    $Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);

    setToStringTag($Symbol, 'Symbol');

    setToStringTag(Math, 'Math', true);

    setToStringTag(global.JSON, 'JSON', true);
  }, { "./_an-object": 49, "./_descriptors": 71, "./_enum-keys": 74, "./_export": 75, "./_fails": 77, "./_global": 82, "./_has": 83, "./_hide": 84, "./_is-array": 91, "./_library": 101, "./_meta": 107, "./_object-create": 112, "./_object-dp": 113, "./_object-gopd": 116, "./_object-gopn": 118, "./_object-gopn-ext": 117, "./_object-gops": 119, "./_object-keys": 122, "./_object-pie": 123, "./_property-desc": 131, "./_redefine": 133, "./_set-to-string-tag": 140, "./_shared": 142, "./_to-iobject": 156, "./_to-primitive": 159, "./_uid": 163, "./_wks": 167, "./_wks-define": 165, "./_wks-ext": 166 }], 294: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $typed = require('./_typed');
    var buffer = require('./_typed-buffer');
    var anObject = require('./_an-object');
    var toAbsoluteIndex = require('./_to-absolute-index');
    var toLength = require('./_to-length');
    var isObject = require('./_is-object');
    var ArrayBuffer = require('./_global').ArrayBuffer;
    var speciesConstructor = require('./_species-constructor');
    var $ArrayBuffer = buffer.ArrayBuffer;
    var $DataView = buffer.DataView;
    var $isView = $typed.ABV && ArrayBuffer.isView;
    var $slice = $ArrayBuffer.prototype.slice;
    var VIEW = $typed.VIEW;
    var ARRAY_BUFFER = 'ArrayBuffer';

    $export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

    $export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
      isView: function isView(it) {
        return $isView && $isView(it) || isObject(it) && VIEW in it;
      }
    });

    $export($export.P + $export.U + $export.F * require('./_fails')(function () {
      return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
    }), ARRAY_BUFFER, {
      slice: function slice(start, end) {
        if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start);
        var len = anObject(this).byteLength;
        var first = toAbsoluteIndex(start, len);
        var final = toAbsoluteIndex(end === undefined ? len : end, len);
        var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
        var viewS = new $DataView(this);
        var viewT = new $DataView(result);
        var index = 0;
        while (first < final) {
          viewT.setUint8(index++, viewS.getUint8(first++));
        }return result;
      }
    });

    require('./_set-species')(ARRAY_BUFFER);
  }, { "./_an-object": 49, "./_export": 75, "./_fails": 77, "./_global": 82, "./_is-object": 93, "./_set-species": 139, "./_species-constructor": 143, "./_to-absolute-index": 153, "./_to-length": 157, "./_typed": 162, "./_typed-buffer": 161 }], 295: [function (require, module, exports) {
    var $export = require('./_export');
    $export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
      DataView: require('./_typed-buffer').DataView
    });
  }, { "./_export": 75, "./_typed": 162, "./_typed-buffer": 161 }], 296: [function (require, module, exports) {
    require('./_typed-array')('Float32', 4, function (init) {
      return function Float32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 297: [function (require, module, exports) {
    require('./_typed-array')('Float64', 8, function (init) {
      return function Float64Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 298: [function (require, module, exports) {
    require('./_typed-array')('Int16', 2, function (init) {
      return function Int16Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 299: [function (require, module, exports) {
    require('./_typed-array')('Int32', 4, function (init) {
      return function Int32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 300: [function (require, module, exports) {
    require('./_typed-array')('Int8', 1, function (init) {
      return function Int8Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 301: [function (require, module, exports) {
    require('./_typed-array')('Uint16', 2, function (init) {
      return function Uint16Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 302: [function (require, module, exports) {
    require('./_typed-array')('Uint32', 4, function (init) {
      return function Uint32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 303: [function (require, module, exports) {
    require('./_typed-array')('Uint8', 1, function (init) {
      return function Uint8Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "./_typed-array": 160 }], 304: [function (require, module, exports) {
    require('./_typed-array')('Uint8', 1, function (init) {
      return function Uint8ClampedArray(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    }, true);
  }, { "./_typed-array": 160 }], 305: [function (require, module, exports) {
    'use strict';

    var each = require('./_array-methods')(0);
    var redefine = require('./_redefine');
    var meta = require('./_meta');
    var assign = require('./_object-assign');
    var weak = require('./_collection-weak');
    var isObject = require('./_is-object');
    var fails = require('./_fails');
    var validate = require('./_validate-collection');
    var WEAK_MAP = 'WeakMap';
    var getWeak = meta.getWeak;
    var isExtensible = Object.isExtensible;
    var uncaughtFrozenStore = weak.ufstore;
    var tmp = {};
    var InternalMap;

    var wrapper = function wrapper(get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    var methods = {
      get: function get(key) {
        if (isObject(key)) {
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
          return data ? data[this._i] : undefined;
        }
      },

      set: function set(key, value) {
        return weak.def(validate(this, WEAK_MAP), key, value);
      }
    };

    var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

    if (fails(function () {
      return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;
    })) {
      InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
      assign(InternalMap.prototype, methods);
      meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], function (key) {
        var proto = $WeakMap.prototype;
        var method = proto[key];
        redefine(proto, key, function (a, b) {
          if (isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();
            var result = this._f[key](a, b);
            return key == 'set' ? this : result;
          }return method.call(this, a, b);
        });
      });
    }
  }, { "./_array-methods": 54, "./_collection": 64, "./_collection-weak": 63, "./_fails": 77, "./_is-object": 93, "./_meta": 107, "./_object-assign": 111, "./_redefine": 133, "./_validate-collection": 164 }], 306: [function (require, module, exports) {
    'use strict';

    var weak = require('./_collection-weak');
    var validate = require('./_validate-collection');
    var WEAK_SET = 'WeakSet';

    require('./_collection')(WEAK_SET, function (get) {
      return function WeakSet() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      add: function add(value) {
        return weak.def(validate(this, WEAK_SET), value, true);
      }
    }, weak, false, true);
  }, { "./_collection": 64, "./_collection-weak": 63, "./_validate-collection": 164 }], 307: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var flattenIntoArray = require('./_flatten-into-array');
    var toObject = require('./_to-object');
    var toLength = require('./_to-length');
    var aFunction = require('./_a-function');
    var arraySpeciesCreate = require('./_array-species-create');

    $export($export.P, 'Array', {
      flatMap: function flatMap(callbackfn) {
        var O = toObject(this);
        var sourceLen, A;
        aFunction(callbackfn);
        sourceLen = toLength(O.length);
        A = arraySpeciesCreate(O, 0);
        flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
        return A;
      }
    });

    require('./_add-to-unscopables')('flatMap');
  }, { "./_a-function": 45, "./_add-to-unscopables": 47, "./_array-species-create": 57, "./_export": 75, "./_flatten-into-array": 80, "./_to-length": 157, "./_to-object": 158 }], 308: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var flattenIntoArray = require('./_flatten-into-array');
    var toObject = require('./_to-object');
    var toLength = require('./_to-length');
    var toInteger = require('./_to-integer');
    var arraySpeciesCreate = require('./_array-species-create');

    $export($export.P, 'Array', {
      flatten: function flatten() {
        var depthArg = arguments[0];
        var O = toObject(this);
        var sourceLen = toLength(O.length);
        var A = arraySpeciesCreate(O, 0);
        flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
        return A;
      }
    });

    require('./_add-to-unscopables')('flatten');
  }, { "./_add-to-unscopables": 47, "./_array-species-create": 57, "./_export": 75, "./_flatten-into-array": 80, "./_to-integer": 155, "./_to-length": 157, "./_to-object": 158 }], 309: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $includes = require('./_array-includes')(true);

    $export($export.P, 'Array', {
      includes: function includes(el) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    require('./_add-to-unscopables')('includes');
  }, { "./_add-to-unscopables": 47, "./_array-includes": 53, "./_export": 75 }], 310: [function (require, module, exports) {
    var $export = require('./_export');
    var microtask = require('./_microtask')();
    var process = require('./_global').process;
    var isNode = require('./_cof')(process) == 'process';

    $export($export.G, {
      asap: function asap(fn) {
        var domain = isNode && process.domain;
        microtask(domain ? domain.bind(fn) : fn);
      }
    });
  }, { "./_cof": 60, "./_export": 75, "./_global": 82, "./_microtask": 109 }], 311: [function (require, module, exports) {
    var $export = require('./_export');
    var cof = require('./_cof');

    $export($export.S, 'Error', {
      isError: function isError(it) {
        return cof(it) === 'Error';
      }
    });
  }, { "./_cof": 60, "./_export": 75 }], 312: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.G, { global: require('./_global') });
  }, { "./_export": 75, "./_global": 82 }], 313: [function (require, module, exports) {
    require('./_set-collection-from')('Map');
  }, { "./_set-collection-from": 136 }], 314: [function (require, module, exports) {
    require('./_set-collection-of')('Map');
  }, { "./_set-collection-of": 137 }], 315: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });
  }, { "./_collection-to-json": 62, "./_export": 75 }], 316: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      clamp: function clamp(x, lower, upper) {
        return Math.min(upper, Math.max(lower, x));
      }
    });
  }, { "./_export": 75 }], 317: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });
  }, { "./_export": 75 }], 318: [function (require, module, exports) {
    var $export = require('./_export');
    var RAD_PER_DEG = 180 / Math.PI;

    $export($export.S, 'Math', {
      degrees: function degrees(radians) {
        return radians * RAD_PER_DEG;
      }
    });
  }, { "./_export": 75 }], 319: [function (require, module, exports) {
    var $export = require('./_export');
    var scale = require('./_math-scale');
    var fround = require('./_math-fround');

    $export($export.S, 'Math', {
      fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
        return fround(scale(x, inLow, inHigh, outLow, outHigh));
      }
    });
  }, { "./_export": 75, "./_math-fround": 103, "./_math-scale": 105 }], 320: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      iaddh: function iaddh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0;
        var $x1 = x1 >>> 0;
        var $y0 = y0 >>> 0;
        return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
      }
    });
  }, { "./_export": 75 }], 321: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      imulh: function imulh(u, v) {
        var UINT16 = 0xffff;
        var $u = +u;
        var $v = +v;
        var u0 = $u & UINT16;
        var v0 = $v & UINT16;
        var u1 = $u >> 16;
        var v1 = $v >> 16;
        var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
      }
    });
  }, { "./_export": 75 }], 322: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      isubh: function isubh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0;
        var $x1 = x1 >>> 0;
        var $y0 = y0 >>> 0;
        return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
      }
    });
  }, { "./_export": 75 }], 323: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });
  }, { "./_export": 75 }], 324: [function (require, module, exports) {
    var $export = require('./_export');
    var DEG_PER_RAD = Math.PI / 180;

    $export($export.S, 'Math', {
      radians: function radians(degrees) {
        return degrees * DEG_PER_RAD;
      }
    });
  }, { "./_export": 75 }], 325: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { scale: require('./_math-scale') });
  }, { "./_export": 75, "./_math-scale": 105 }], 326: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', { signbit: function signbit(x) {
        return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
      } });
  }, { "./_export": 75 }], 327: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'Math', {
      umulh: function umulh(u, v) {
        var UINT16 = 0xffff;
        var $u = +u;
        var $v = +v;
        var u0 = $u & UINT16;
        var v0 = $v & UINT16;
        var u1 = $u >>> 16;
        var v1 = $v >>> 16;
        var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
      }
    });
  }, { "./_export": 75 }], 328: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toObject = require('./_to-object');
    var aFunction = require('./_a-function');
    var $defineProperty = require('./_object-dp');

    require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
      __defineGetter__: function __defineGetter__(P, getter) {
        $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
      }
    });
  }, { "./_a-function": 45, "./_descriptors": 71, "./_export": 75, "./_object-dp": 113, "./_object-forced-pam": 115, "./_to-object": 158 }], 329: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toObject = require('./_to-object');
    var aFunction = require('./_a-function');
    var $defineProperty = require('./_object-dp');

    require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
      __defineSetter__: function __defineSetter__(P, setter) {
        $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
      }
    });
  }, { "./_a-function": 45, "./_descriptors": 71, "./_export": 75, "./_object-dp": 113, "./_object-forced-pam": 115, "./_to-object": 158 }], 330: [function (require, module, exports) {
    var $export = require('./_export');
    var $entries = require('./_object-to-array')(true);

    $export($export.S, 'Object', {
      entries: function entries(it) {
        return $entries(it);
      }
    });
  }, { "./_export": 75, "./_object-to-array": 125 }], 331: [function (require, module, exports) {
    var $export = require('./_export');
    var ownKeys = require('./_own-keys');
    var toIObject = require('./_to-iobject');
    var gOPD = require('./_object-gopd');
    var createProperty = require('./_create-property');

    $export($export.S, 'Object', {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIObject(object);
        var getDesc = gOPD.f;
        var keys = ownKeys(O);
        var result = {};
        var i = 0;
        var key, desc;
        while (keys.length > i) {
          desc = getDesc(O, key = keys[i++]);
          if (desc !== undefined) createProperty(result, key, desc);
        }
        return result;
      }
    });
  }, { "./_create-property": 66, "./_export": 75, "./_object-gopd": 116, "./_own-keys": 126, "./_to-iobject": 156 }], 332: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toObject = require('./_to-object');
    var toPrimitive = require('./_to-primitive');
    var getPrototypeOf = require('./_object-gpo');
    var getOwnPropertyDescriptor = require('./_object-gopd').f;

    require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
      __lookupGetter__: function __lookupGetter__(P) {
        var O = toObject(this);
        var K = toPrimitive(P, true);
        var D;
        do {
          if (D = getOwnPropertyDescriptor(O, K)) return D.get;
        } while (O = getPrototypeOf(O));
      }
    });
  }, { "./_descriptors": 71, "./_export": 75, "./_object-forced-pam": 115, "./_object-gopd": 116, "./_object-gpo": 120, "./_to-object": 158, "./_to-primitive": 159 }], 333: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var toObject = require('./_to-object');
    var toPrimitive = require('./_to-primitive');
    var getPrototypeOf = require('./_object-gpo');
    var getOwnPropertyDescriptor = require('./_object-gopd').f;

    require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
      __lookupSetter__: function __lookupSetter__(P) {
        var O = toObject(this);
        var K = toPrimitive(P, true);
        var D;
        do {
          if (D = getOwnPropertyDescriptor(O, K)) return D.set;
        } while (O = getPrototypeOf(O));
      }
    });
  }, { "./_descriptors": 71, "./_export": 75, "./_object-forced-pam": 115, "./_object-gopd": 116, "./_object-gpo": 120, "./_to-object": 158, "./_to-primitive": 159 }], 334: [function (require, module, exports) {
    var $export = require('./_export');
    var $values = require('./_object-to-array')(false);

    $export($export.S, 'Object', {
      values: function values(it) {
        return $values(it);
      }
    });
  }, { "./_export": 75, "./_object-to-array": 125 }], 335: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var global = require('./_global');
    var core = require('./_core');
    var microtask = require('./_microtask')();
    var OBSERVABLE = require('./_wks')('observable');
    var aFunction = require('./_a-function');
    var anObject = require('./_an-object');
    var anInstance = require('./_an-instance');
    var redefineAll = require('./_redefine-all');
    var hide = require('./_hide');
    var forOf = require('./_for-of');
    var RETURN = forOf.RETURN;

    var getMethod = function getMethod(fn) {
      return fn == null ? undefined : aFunction(fn);
    };

    var cleanupSubscription = function cleanupSubscription(subscription) {
      var cleanup = subscription._c;
      if (cleanup) {
        subscription._c = undefined;
        cleanup();
      }
    };

    var subscriptionClosed = function subscriptionClosed(subscription) {
      return subscription._o === undefined;
    };

    var closeSubscription = function closeSubscription(subscription) {
      if (!subscriptionClosed(subscription)) {
        subscription._o = undefined;
        cleanupSubscription(subscription);
      }
    };

    var Subscription = function Subscription(observer, subscriber) {
      anObject(observer);
      this._c = undefined;
      this._o = observer;
      observer = new SubscriptionObserver(this);
      try {
        var cleanup = subscriber(observer);
        var subscription = cleanup;
        if (cleanup != null) {
          if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
            subscription.unsubscribe();
          };else aFunction(cleanup);
          this._c = cleanup;
        }
      } catch (e) {
        observer.error(e);
        return;
      }if (subscriptionClosed(this)) cleanupSubscription(this);
    };

    Subscription.prototype = redefineAll({}, {
      unsubscribe: function unsubscribe() {
        closeSubscription(this);
      }
    });

    var SubscriptionObserver = function SubscriptionObserver(subscription) {
      this._s = subscription;
    };

    SubscriptionObserver.prototype = redefineAll({}, {
      next: function next(value) {
        var subscription = this._s;
        if (!subscriptionClosed(subscription)) {
          var observer = subscription._o;
          try {
            var m = getMethod(observer.next);
            if (m) return m.call(observer, value);
          } catch (e) {
            try {
              closeSubscription(subscription);
            } finally {
              throw e;
            }
          }
        }
      },
      error: function error(value) {
        var subscription = this._s;
        if (subscriptionClosed(subscription)) throw value;
        var observer = subscription._o;
        subscription._o = undefined;
        try {
          var m = getMethod(observer.error);
          if (!m) throw value;
          value = m.call(observer, value);
        } catch (e) {
          try {
            cleanupSubscription(subscription);
          } finally {
            throw e;
          }
        }cleanupSubscription(subscription);
        return value;
      },
      complete: function complete(value) {
        var subscription = this._s;
        if (!subscriptionClosed(subscription)) {
          var observer = subscription._o;
          subscription._o = undefined;
          try {
            var m = getMethod(observer.complete);
            value = m ? m.call(observer, value) : undefined;
          } catch (e) {
            try {
              cleanupSubscription(subscription);
            } finally {
              throw e;
            }
          }cleanupSubscription(subscription);
          return value;
        }
      }
    });

    var $Observable = function Observable(subscriber) {
      anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
    };

    redefineAll($Observable.prototype, {
      subscribe: function subscribe(observer) {
        return new Subscription(observer, this._f);
      },
      forEach: function forEach(fn) {
        var that = this;
        return new (core.Promise || global.Promise)(function (resolve, reject) {
          aFunction(fn);
          var subscription = that.subscribe({
            next: function next(value) {
              try {
                return fn(value);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      }
    });

    redefineAll($Observable, {
      from: function from(x) {
        var C = typeof this === 'function' ? this : $Observable;
        var method = getMethod(anObject(x)[OBSERVABLE]);
        if (method) {
          var observable = anObject(method.call(x));
          return observable.constructor === C ? observable : new C(function (observer) {
            return observable.subscribe(observer);
          });
        }
        return new C(function (observer) {
          var done = false;
          microtask(function () {
            if (!done) {
              try {
                if (forOf(x, false, function (it) {
                  observer.next(it);
                  if (done) return RETURN;
                }) === RETURN) return;
              } catch (e) {
                if (done) throw e;
                observer.error(e);
                return;
              }observer.complete();
            }
          });
          return function () {
            done = true;
          };
        });
      },
      of: function of() {
        for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
          items[i] = arguments[i++];
        }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
          var done = false;
          microtask(function () {
            if (!done) {
              for (var j = 0; j < items.length; ++j) {
                observer.next(items[j]);
                if (done) return;
              }observer.complete();
            }
          });
          return function () {
            done = true;
          };
        });
      }
    });

    hide($Observable.prototype, OBSERVABLE, function () {
      return this;
    });

    $export($export.G, { Observable: $Observable });

    require('./_set-species')('Observable');
  }, { "./_a-function": 45, "./_an-instance": 48, "./_an-object": 49, "./_core": 65, "./_export": 75, "./_for-of": 81, "./_global": 82, "./_hide": 84, "./_microtask": 109, "./_redefine-all": 132, "./_set-species": 139, "./_wks": 167 }], 336: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var core = require('./_core');
    var global = require('./_global');
    var speciesConstructor = require('./_species-constructor');
    var promiseResolve = require('./_promise-resolve');

    $export($export.P + $export.R, 'Promise', { 'finally': function _finally(onFinally) {
        var C = speciesConstructor(this, core.Promise || global.Promise);
        var isFunction = typeof onFinally == 'function';
        return this.then(isFunction ? function (x) {
          return promiseResolve(C, onFinally()).then(function () {
            return x;
          });
        } : onFinally, isFunction ? function (e) {
          return promiseResolve(C, onFinally()).then(function () {
            throw e;
          });
        } : onFinally);
      } });
  }, { "./_core": 65, "./_export": 75, "./_global": 82, "./_promise-resolve": 130, "./_species-constructor": 143 }], 337: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var newPromiseCapability = require('./_new-promise-capability');
    var perform = require('./_perform');

    $export($export.S, 'Promise', { 'try': function _try(callbackfn) {
        var promiseCapability = newPromiseCapability.f(this);
        var result = perform(callbackfn);
        (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
        return promiseCapability.promise;
      } });
  }, { "./_export": 75, "./_new-promise-capability": 110, "./_perform": 129 }], 338: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var toMetaKey = metadata.key;
    var ordinaryDefineOwnMetadata = metadata.set;

    metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
      } });
  }, { "./_an-object": 49, "./_metadata": 108 }], 339: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var toMetaKey = metadata.key;
    var getOrCreateMetadataMap = metadata.map;
    var store = metadata.store;

    metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target) {
        var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
        var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
        if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
        if (metadataMap.size) return true;
        var targetMetadata = store.get(target);
        targetMetadata['delete'](targetKey);
        return !!targetMetadata.size || store['delete'](target);
      } });
  }, { "./_an-object": 49, "./_metadata": 108 }], 340: [function (require, module, exports) {
    var Set = require('./es6.set');
    var from = require('./_array-from-iterable');
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var getPrototypeOf = require('./_object-gpo');
    var ordinaryOwnMetadataKeys = metadata.keys;
    var toMetaKey = metadata.key;

    var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
      var oKeys = ordinaryOwnMetadataKeys(O, P);
      var parent = getPrototypeOf(O);
      if (parent === null) return oKeys;
      var pKeys = ordinaryMetadataKeys(parent, P);
      return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
    };

    metadata.exp({ getMetadataKeys: function getMetadataKeys(target) {
        return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
      } });
  }, { "./_an-object": 49, "./_array-from-iterable": 52, "./_metadata": 108, "./_object-gpo": 120, "./es6.set": 270 }], 341: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var getPrototypeOf = require('./_object-gpo');
    var ordinaryHasOwnMetadata = metadata.has;
    var ordinaryGetOwnMetadata = metadata.get;
    var toMetaKey = metadata.key;

    var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = getPrototypeOf(O);
      return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
    };

    metadata.exp({ getMetadata: function getMetadata(metadataKey, target) {
        return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "./_an-object": 49, "./_metadata": 108, "./_object-gpo": 120 }], 342: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var ordinaryOwnMetadataKeys = metadata.keys;
    var toMetaKey = metadata.key;

    metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target) {
        return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
      } });
  }, { "./_an-object": 49, "./_metadata": 108 }], 343: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var ordinaryGetOwnMetadata = metadata.get;
    var toMetaKey = metadata.key;

    metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target) {
        return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "./_an-object": 49, "./_metadata": 108 }], 344: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var getPrototypeOf = require('./_object-gpo');
    var ordinaryHasOwnMetadata = metadata.has;
    var toMetaKey = metadata.key;

    var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = getPrototypeOf(O);
      return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
    };

    metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target) {
        return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "./_an-object": 49, "./_metadata": 108, "./_object-gpo": 120 }], 345: [function (require, module, exports) {
    var metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var ordinaryHasOwnMetadata = metadata.has;
    var toMetaKey = metadata.key;

    metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target) {
        return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "./_an-object": 49, "./_metadata": 108 }], 346: [function (require, module, exports) {
    var $metadata = require('./_metadata');
    var anObject = require('./_an-object');
    var aFunction = require('./_a-function');
    var toMetaKey = $metadata.key;
    var ordinaryDefineOwnMetadata = $metadata.set;

    $metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
        return function decorator(target, targetKey) {
          ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
        };
      } });
  }, { "./_a-function": 45, "./_an-object": 49, "./_metadata": 108 }], 347: [function (require, module, exports) {
    require('./_set-collection-from')('Set');
  }, { "./_set-collection-from": 136 }], 348: [function (require, module, exports) {
    require('./_set-collection-of')('Set');
  }, { "./_set-collection-of": 137 }], 349: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });
  }, { "./_collection-to-json": 62, "./_export": 75 }], 350: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $at = require('./_string-at')(true);

    $export($export.P, 'String', {
      at: function at(pos) {
        return $at(this, pos);
      }
    });
  }, { "./_export": 75, "./_string-at": 145 }], 351: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var defined = require('./_defined');
    var toLength = require('./_to-length');
    var isRegExp = require('./_is-regexp');
    var getFlags = require('./_flags');
    var RegExpProto = RegExp.prototype;

    var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
      this._r = regexp;
      this._s = string;
    };

    require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
      var match = this._r.exec(this._s);
      return { value: match, done: match === null };
    });

    $export($export.P, 'String', {
      matchAll: function matchAll(regexp) {
        defined(this);
        if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
        var S = String(this);
        var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
        var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
        rx.lastIndex = toLength(regexp.lastIndex);
        return new $RegExpStringIterator(rx, S);
      }
    });
  }, { "./_defined": 70, "./_export": 75, "./_flags": 79, "./_is-regexp": 94, "./_iter-create": 96, "./_to-length": 157 }], 352: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $pad = require('./_string-pad');

    $export($export.P, 'String', {
      padEnd: function padEnd(maxLength) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
      }
    });
  }, { "./_export": 75, "./_string-pad": 148 }], 353: [function (require, module, exports) {
    'use strict';

    var $export = require('./_export');
    var $pad = require('./_string-pad');

    $export($export.P, 'String', {
      padStart: function padStart(maxLength) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
      }
    });
  }, { "./_export": 75, "./_string-pad": 148 }], 354: [function (require, module, exports) {
    'use strict';

    require('./_string-trim')('trimLeft', function ($trim) {
      return function trimLeft() {
        return $trim(this, 1);
      };
    }, 'trimStart');
  }, { "./_string-trim": 150 }], 355: [function (require, module, exports) {
    'use strict';

    require('./_string-trim')('trimRight', function ($trim) {
      return function trimRight() {
        return $trim(this, 2);
      };
    }, 'trimEnd');
  }, { "./_string-trim": 150 }], 356: [function (require, module, exports) {
    require('./_wks-define')('asyncIterator');
  }, { "./_wks-define": 165 }], 357: [function (require, module, exports) {
    require('./_wks-define')('observable');
  }, { "./_wks-define": 165 }], 358: [function (require, module, exports) {
    var $export = require('./_export');

    $export($export.S, 'System', { global: require('./_global') });
  }, { "./_export": 75, "./_global": 82 }], 359: [function (require, module, exports) {
    require('./_set-collection-from')('WeakMap');
  }, { "./_set-collection-from": 136 }], 360: [function (require, module, exports) {
    require('./_set-collection-of')('WeakMap');
  }, { "./_set-collection-of": 137 }], 361: [function (require, module, exports) {
    require('./_set-collection-from')('WeakSet');
  }, { "./_set-collection-from": 136 }], 362: [function (require, module, exports) {
    require('./_set-collection-of')('WeakSet');
  }, { "./_set-collection-of": 137 }], 363: [function (require, module, exports) {
    var $iterators = require('./es6.array.iterator');
    var getKeys = require('./_object-keys');
    var redefine = require('./_redefine');
    var global = require('./_global');
    var hide = require('./_hide');
    var Iterators = require('./_iterators');
    var wks = require('./_wks');
    var ITERATOR = wks('iterator');
    var TO_STRING_TAG = wks('toStringTag');
    var ArrayValues = Iterators.Array;

    var DOMIterables = {
      CSSRuleList: true,
      CSSStyleDeclaration: false,
      CSSValueList: false,
      ClientRectList: false,
      DOMRectList: false,
      DOMStringList: false,
      DOMTokenList: true,
      DataTransferItemList: false,
      FileList: false,
      HTMLAllCollection: false,
      HTMLCollection: false,
      HTMLFormElement: false,
      HTMLSelectElement: false,
      MediaList: true,
      MimeTypeArray: false,
      NamedNodeMap: false,
      NodeList: true,
      PaintRequestList: false,
      Plugin: false,
      PluginArray: false,
      SVGLengthList: false,
      SVGNumberList: false,
      SVGPathSegList: false,
      SVGPointList: false,
      SVGStringList: false,
      SVGTransformList: false,
      SourceBufferList: false,
      StyleSheetList: true,
      TextTrackCueList: false,
      TextTrackList: false,
      TouchList: false
    };

    for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
      var NAME = collections[i];
      var explicit = DOMIterables[NAME];
      var Collection = global[NAME];
      var proto = Collection && Collection.prototype;
      var key;
      if (proto) {
        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = ArrayValues;
        if (explicit) for (key in $iterators) {
          if (!proto[key]) redefine(proto, key, $iterators[key], true);
        }
      }
    }
  }, { "./_global": 82, "./_hide": 84, "./_iterators": 100, "./_object-keys": 122, "./_redefine": 133, "./_wks": 167, "./es6.array.iterator": 180 }], 364: [function (require, module, exports) {
    var $export = require('./_export');
    var $task = require('./_task');
    $export($export.G + $export.B, {
      setImmediate: $task.set,
      clearImmediate: $task.clear
    });
  }, { "./_export": 75, "./_task": 152 }], 365: [function (require, module, exports) {
    var global = require('./_global');
    var $export = require('./_export');
    var navigator = global.navigator;
    var slice = [].slice;
    var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent);
    var wrap = function wrap(set) {
      return function (fn, time) {
        var boundArgs = arguments.length > 2;
        var args = boundArgs ? slice.call(arguments, 2) : false;
        return set(boundArgs ? function () {
          (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
        } : fn, time);
      };
    };
    $export($export.G + $export.B + $export.F * MSIE, {
      setTimeout: wrap(global.setTimeout),
      setInterval: wrap(global.setInterval)
    });
  }, { "./_export": 75, "./_global": 82 }], 366: [function (require, module, exports) {
    require('./modules/es6.symbol');
    require('./modules/es6.object.create');
    require('./modules/es6.object.define-property');
    require('./modules/es6.object.define-properties');
    require('./modules/es6.object.get-own-property-descriptor');
    require('./modules/es6.object.get-prototype-of');
    require('./modules/es6.object.keys');
    require('./modules/es6.object.get-own-property-names');
    require('./modules/es6.object.freeze');
    require('./modules/es6.object.seal');
    require('./modules/es6.object.prevent-extensions');
    require('./modules/es6.object.is-frozen');
    require('./modules/es6.object.is-sealed');
    require('./modules/es6.object.is-extensible');
    require('./modules/es6.object.assign');
    require('./modules/es6.object.is');
    require('./modules/es6.object.set-prototype-of');
    require('./modules/es6.object.to-string');
    require('./modules/es6.function.bind');
    require('./modules/es6.function.name');
    require('./modules/es6.function.has-instance');
    require('./modules/es6.parse-int');
    require('./modules/es6.parse-float');
    require('./modules/es6.number.constructor');
    require('./modules/es6.number.to-fixed');
    require('./modules/es6.number.to-precision');
    require('./modules/es6.number.epsilon');
    require('./modules/es6.number.is-finite');
    require('./modules/es6.number.is-integer');
    require('./modules/es6.number.is-nan');
    require('./modules/es6.number.is-safe-integer');
    require('./modules/es6.number.max-safe-integer');
    require('./modules/es6.number.min-safe-integer');
    require('./modules/es6.number.parse-float');
    require('./modules/es6.number.parse-int');
    require('./modules/es6.math.acosh');
    require('./modules/es6.math.asinh');
    require('./modules/es6.math.atanh');
    require('./modules/es6.math.cbrt');
    require('./modules/es6.math.clz32');
    require('./modules/es6.math.cosh');
    require('./modules/es6.math.expm1');
    require('./modules/es6.math.fround');
    require('./modules/es6.math.hypot');
    require('./modules/es6.math.imul');
    require('./modules/es6.math.log10');
    require('./modules/es6.math.log1p');
    require('./modules/es6.math.log2');
    require('./modules/es6.math.sign');
    require('./modules/es6.math.sinh');
    require('./modules/es6.math.tanh');
    require('./modules/es6.math.trunc');
    require('./modules/es6.string.from-code-point');
    require('./modules/es6.string.raw');
    require('./modules/es6.string.trim');
    require('./modules/es6.string.iterator');
    require('./modules/es6.string.code-point-at');
    require('./modules/es6.string.ends-with');
    require('./modules/es6.string.includes');
    require('./modules/es6.string.repeat');
    require('./modules/es6.string.starts-with');
    require('./modules/es6.string.anchor');
    require('./modules/es6.string.big');
    require('./modules/es6.string.blink');
    require('./modules/es6.string.bold');
    require('./modules/es6.string.fixed');
    require('./modules/es6.string.fontcolor');
    require('./modules/es6.string.fontsize');
    require('./modules/es6.string.italics');
    require('./modules/es6.string.link');
    require('./modules/es6.string.small');
    require('./modules/es6.string.strike');
    require('./modules/es6.string.sub');
    require('./modules/es6.string.sup');
    require('./modules/es6.date.now');
    require('./modules/es6.date.to-json');
    require('./modules/es6.date.to-iso-string');
    require('./modules/es6.date.to-string');
    require('./modules/es6.date.to-primitive');
    require('./modules/es6.array.is-array');
    require('./modules/es6.array.from');
    require('./modules/es6.array.of');
    require('./modules/es6.array.join');
    require('./modules/es6.array.slice');
    require('./modules/es6.array.sort');
    require('./modules/es6.array.for-each');
    require('./modules/es6.array.map');
    require('./modules/es6.array.filter');
    require('./modules/es6.array.some');
    require('./modules/es6.array.every');
    require('./modules/es6.array.reduce');
    require('./modules/es6.array.reduce-right');
    require('./modules/es6.array.index-of');
    require('./modules/es6.array.last-index-of');
    require('./modules/es6.array.copy-within');
    require('./modules/es6.array.fill');
    require('./modules/es6.array.find');
    require('./modules/es6.array.find-index');
    require('./modules/es6.array.species');
    require('./modules/es6.array.iterator');
    require('./modules/es6.regexp.constructor');
    require('./modules/es6.regexp.to-string');
    require('./modules/es6.regexp.flags');
    require('./modules/es6.regexp.match');
    require('./modules/es6.regexp.replace');
    require('./modules/es6.regexp.search');
    require('./modules/es6.regexp.split');
    require('./modules/es6.promise');
    require('./modules/es6.map');
    require('./modules/es6.set');
    require('./modules/es6.weak-map');
    require('./modules/es6.weak-set');
    require('./modules/es6.typed.array-buffer');
    require('./modules/es6.typed.data-view');
    require('./modules/es6.typed.int8-array');
    require('./modules/es6.typed.uint8-array');
    require('./modules/es6.typed.uint8-clamped-array');
    require('./modules/es6.typed.int16-array');
    require('./modules/es6.typed.uint16-array');
    require('./modules/es6.typed.int32-array');
    require('./modules/es6.typed.uint32-array');
    require('./modules/es6.typed.float32-array');
    require('./modules/es6.typed.float64-array');
    require('./modules/es6.reflect.apply');
    require('./modules/es6.reflect.construct');
    require('./modules/es6.reflect.define-property');
    require('./modules/es6.reflect.delete-property');
    require('./modules/es6.reflect.enumerate');
    require('./modules/es6.reflect.get');
    require('./modules/es6.reflect.get-own-property-descriptor');
    require('./modules/es6.reflect.get-prototype-of');
    require('./modules/es6.reflect.has');
    require('./modules/es6.reflect.is-extensible');
    require('./modules/es6.reflect.own-keys');
    require('./modules/es6.reflect.prevent-extensions');
    require('./modules/es6.reflect.set');
    require('./modules/es6.reflect.set-prototype-of');
    require('./modules/es7.array.includes');
    require('./modules/es7.array.flat-map');
    require('./modules/es7.array.flatten');
    require('./modules/es7.string.at');
    require('./modules/es7.string.pad-start');
    require('./modules/es7.string.pad-end');
    require('./modules/es7.string.trim-left');
    require('./modules/es7.string.trim-right');
    require('./modules/es7.string.match-all');
    require('./modules/es7.symbol.async-iterator');
    require('./modules/es7.symbol.observable');
    require('./modules/es7.object.get-own-property-descriptors');
    require('./modules/es7.object.values');
    require('./modules/es7.object.entries');
    require('./modules/es7.object.define-getter');
    require('./modules/es7.object.define-setter');
    require('./modules/es7.object.lookup-getter');
    require('./modules/es7.object.lookup-setter');
    require('./modules/es7.map.to-json');
    require('./modules/es7.set.to-json');
    require('./modules/es7.map.of');
    require('./modules/es7.set.of');
    require('./modules/es7.weak-map.of');
    require('./modules/es7.weak-set.of');
    require('./modules/es7.map.from');
    require('./modules/es7.set.from');
    require('./modules/es7.weak-map.from');
    require('./modules/es7.weak-set.from');
    require('./modules/es7.global');
    require('./modules/es7.system.global');
    require('./modules/es7.error.is-error');
    require('./modules/es7.math.clamp');
    require('./modules/es7.math.deg-per-rad');
    require('./modules/es7.math.degrees');
    require('./modules/es7.math.fscale');
    require('./modules/es7.math.iaddh');
    require('./modules/es7.math.isubh');
    require('./modules/es7.math.imulh');
    require('./modules/es7.math.rad-per-deg');
    require('./modules/es7.math.radians');
    require('./modules/es7.math.scale');
    require('./modules/es7.math.umulh');
    require('./modules/es7.math.signbit');
    require('./modules/es7.promise.finally');
    require('./modules/es7.promise.try');
    require('./modules/es7.reflect.define-metadata');
    require('./modules/es7.reflect.delete-metadata');
    require('./modules/es7.reflect.get-metadata');
    require('./modules/es7.reflect.get-metadata-keys');
    require('./modules/es7.reflect.get-own-metadata');
    require('./modules/es7.reflect.get-own-metadata-keys');
    require('./modules/es7.reflect.has-metadata');
    require('./modules/es7.reflect.has-own-metadata');
    require('./modules/es7.reflect.metadata');
    require('./modules/es7.asap');
    require('./modules/es7.observable');
    require('./modules/web.timers');
    require('./modules/web.immediate');
    require('./modules/web.dom.iterable');
    module.exports = require('./modules/_core');
  }, { "./modules/_core": 65, "./modules/es6.array.copy-within": 170, "./modules/es6.array.every": 171, "./modules/es6.array.fill": 172, "./modules/es6.array.filter": 173, "./modules/es6.array.find": 175, "./modules/es6.array.find-index": 174, "./modules/es6.array.for-each": 176, "./modules/es6.array.from": 177, "./modules/es6.array.index-of": 178, "./modules/es6.array.is-array": 179, "./modules/es6.array.iterator": 180, "./modules/es6.array.join": 181, "./modules/es6.array.last-index-of": 182, "./modules/es6.array.map": 183, "./modules/es6.array.of": 184, "./modules/es6.array.reduce": 186, "./modules/es6.array.reduce-right": 185, "./modules/es6.array.slice": 187, "./modules/es6.array.some": 188, "./modules/es6.array.sort": 189, "./modules/es6.array.species": 190, "./modules/es6.date.now": 191, "./modules/es6.date.to-iso-string": 192, "./modules/es6.date.to-json": 193, "./modules/es6.date.to-primitive": 194, "./modules/es6.date.to-string": 195, "./modules/es6.function.bind": 196, "./modules/es6.function.has-instance": 197, "./modules/es6.function.name": 198, "./modules/es6.map": 199, "./modules/es6.math.acosh": 200, "./modules/es6.math.asinh": 201, "./modules/es6.math.atanh": 202, "./modules/es6.math.cbrt": 203, "./modules/es6.math.clz32": 204, "./modules/es6.math.cosh": 205, "./modules/es6.math.expm1": 206, "./modules/es6.math.fround": 207, "./modules/es6.math.hypot": 208, "./modules/es6.math.imul": 209, "./modules/es6.math.log10": 210, "./modules/es6.math.log1p": 211, "./modules/es6.math.log2": 212, "./modules/es6.math.sign": 213, "./modules/es6.math.sinh": 214, "./modules/es6.math.tanh": 215, "./modules/es6.math.trunc": 216, "./modules/es6.number.constructor": 217, "./modules/es6.number.epsilon": 218, "./modules/es6.number.is-finite": 219, "./modules/es6.number.is-integer": 220, "./modules/es6.number.is-nan": 221, "./modules/es6.number.is-safe-integer": 222, "./modules/es6.number.max-safe-integer": 223, "./modules/es6.number.min-safe-integer": 224, "./modules/es6.number.parse-float": 225, "./modules/es6.number.parse-int": 226, "./modules/es6.number.to-fixed": 227, "./modules/es6.number.to-precision": 228, "./modules/es6.object.assign": 229, "./modules/es6.object.create": 230, "./modules/es6.object.define-properties": 231, "./modules/es6.object.define-property": 232, "./modules/es6.object.freeze": 233, "./modules/es6.object.get-own-property-descriptor": 234, "./modules/es6.object.get-own-property-names": 235, "./modules/es6.object.get-prototype-of": 236, "./modules/es6.object.is": 240, "./modules/es6.object.is-extensible": 237, "./modules/es6.object.is-frozen": 238, "./modules/es6.object.is-sealed": 239, "./modules/es6.object.keys": 241, "./modules/es6.object.prevent-extensions": 242, "./modules/es6.object.seal": 243, "./modules/es6.object.set-prototype-of": 244, "./modules/es6.object.to-string": 245, "./modules/es6.parse-float": 246, "./modules/es6.parse-int": 247, "./modules/es6.promise": 248, "./modules/es6.reflect.apply": 249, "./modules/es6.reflect.construct": 250, "./modules/es6.reflect.define-property": 251, "./modules/es6.reflect.delete-property": 252, "./modules/es6.reflect.enumerate": 253, "./modules/es6.reflect.get": 256, "./modules/es6.reflect.get-own-property-descriptor": 254, "./modules/es6.reflect.get-prototype-of": 255, "./modules/es6.reflect.has": 257, "./modules/es6.reflect.is-extensible": 258, "./modules/es6.reflect.own-keys": 259, "./modules/es6.reflect.prevent-extensions": 260, "./modules/es6.reflect.set": 262, "./modules/es6.reflect.set-prototype-of": 261, "./modules/es6.regexp.constructor": 263, "./modules/es6.regexp.flags": 264, "./modules/es6.regexp.match": 265, "./modules/es6.regexp.replace": 266, "./modules/es6.regexp.search": 267, "./modules/es6.regexp.split": 268, "./modules/es6.regexp.to-string": 269, "./modules/es6.set": 270, "./modules/es6.string.anchor": 271, "./modules/es6.string.big": 272, "./modules/es6.string.blink": 273, "./modules/es6.string.bold": 274, "./modules/es6.string.code-point-at": 275, "./modules/es6.string.ends-with": 276, "./modules/es6.string.fixed": 277, "./modules/es6.string.fontcolor": 278, "./modules/es6.string.fontsize": 279, "./modules/es6.string.from-code-point": 280, "./modules/es6.string.includes": 281, "./modules/es6.string.italics": 282, "./modules/es6.string.iterator": 283, "./modules/es6.string.link": 284, "./modules/es6.string.raw": 285, "./modules/es6.string.repeat": 286, "./modules/es6.string.small": 287, "./modules/es6.string.starts-with": 288, "./modules/es6.string.strike": 289, "./modules/es6.string.sub": 290, "./modules/es6.string.sup": 291, "./modules/es6.string.trim": 292, "./modules/es6.symbol": 293, "./modules/es6.typed.array-buffer": 294, "./modules/es6.typed.data-view": 295, "./modules/es6.typed.float32-array": 296, "./modules/es6.typed.float64-array": 297, "./modules/es6.typed.int16-array": 298, "./modules/es6.typed.int32-array": 299, "./modules/es6.typed.int8-array": 300, "./modules/es6.typed.uint16-array": 301, "./modules/es6.typed.uint32-array": 302, "./modules/es6.typed.uint8-array": 303, "./modules/es6.typed.uint8-clamped-array": 304, "./modules/es6.weak-map": 305, "./modules/es6.weak-set": 306, "./modules/es7.array.flat-map": 307, "./modules/es7.array.flatten": 308, "./modules/es7.array.includes": 309, "./modules/es7.asap": 310, "./modules/es7.error.is-error": 311, "./modules/es7.global": 312, "./modules/es7.map.from": 313, "./modules/es7.map.of": 314, "./modules/es7.map.to-json": 315, "./modules/es7.math.clamp": 316, "./modules/es7.math.deg-per-rad": 317, "./modules/es7.math.degrees": 318, "./modules/es7.math.fscale": 319, "./modules/es7.math.iaddh": 320, "./modules/es7.math.imulh": 321, "./modules/es7.math.isubh": 322, "./modules/es7.math.rad-per-deg": 323, "./modules/es7.math.radians": 324, "./modules/es7.math.scale": 325, "./modules/es7.math.signbit": 326, "./modules/es7.math.umulh": 327, "./modules/es7.object.define-getter": 328, "./modules/es7.object.define-setter": 329, "./modules/es7.object.entries": 330, "./modules/es7.object.get-own-property-descriptors": 331, "./modules/es7.object.lookup-getter": 332, "./modules/es7.object.lookup-setter": 333, "./modules/es7.object.values": 334, "./modules/es7.observable": 335, "./modules/es7.promise.finally": 336, "./modules/es7.promise.try": 337, "./modules/es7.reflect.define-metadata": 338, "./modules/es7.reflect.delete-metadata": 339, "./modules/es7.reflect.get-metadata": 341, "./modules/es7.reflect.get-metadata-keys": 340, "./modules/es7.reflect.get-own-metadata": 343, "./modules/es7.reflect.get-own-metadata-keys": 342, "./modules/es7.reflect.has-metadata": 344, "./modules/es7.reflect.has-own-metadata": 345, "./modules/es7.reflect.metadata": 346, "./modules/es7.set.from": 347, "./modules/es7.set.of": 348, "./modules/es7.set.to-json": 349, "./modules/es7.string.at": 350, "./modules/es7.string.match-all": 351, "./modules/es7.string.pad-end": 352, "./modules/es7.string.pad-start": 353, "./modules/es7.string.trim-left": 354, "./modules/es7.string.trim-right": 355, "./modules/es7.symbol.async-iterator": 356, "./modules/es7.symbol.observable": 357, "./modules/es7.system.global": 358, "./modules/es7.weak-map.from": 359, "./modules/es7.weak-map.of": 360, "./modules/es7.weak-set.from": 361, "./modules/es7.weak-set.of": 362, "./modules/web.dom.iterable": 363, "./modules/web.immediate": 364, "./modules/web.timers": 365 }], 367: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = camelize;
    var regExp = /[-\s]+(.)?/g;

    function camelize(str) {
      return str.replace(regExp, toUpper);
    }

    function toUpper(match, c) {
      return c ? c.toUpperCase() : '';
    }
  }, {}], 368: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.supportedValue = exports.supportedProperty = exports.prefix = undefined;

    var _prefix = require('./prefix');

    var _prefix2 = _interopRequireDefault(_prefix);

    var _supportedProperty = require('./supported-property');

    var _supportedProperty2 = _interopRequireDefault(_supportedProperty);

    var _supportedValue = require('./supported-value');

    var _supportedValue2 = _interopRequireDefault(_supportedValue);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    exports['default'] = {
      prefix: _prefix2['default'],
      supportedProperty: _supportedProperty2['default'],
      supportedValue: _supportedValue2['default']
    }; /**
        * CSS Vendor prefix detection and property feature testing.
        *
        * @copyright Oleg Slobodskoi 2015
        * @website https://github.com/jsstyles/css-vendor
        * @license MIT
        */

    exports.prefix = _prefix2['default'];
    exports.supportedProperty = _supportedProperty2['default'];
    exports.supportedValue = _supportedValue2['default'];
  }, { "./prefix": 369, "./supported-property": 370, "./supported-value": 371 }], 369: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _isInBrowser = require('is-in-browser');

    var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var js = '';

    var css = '';

    if (_isInBrowser2['default']) {
      var jsCssMap = {
        Moz: '-moz-',

        ms: '-ms-',
        O: '-o-',
        Webkit: '-webkit-'
      };
      var style = document.createElement('p').style;
      var testProp = 'Transform';

      for (var key in jsCssMap) {
        if (key + testProp in style) {
          js = key;
          css = jsCssMap[key];
          break;
        }
      }
    }

    exports['default'] = { js: js, css: css };
  }, { "is-in-browser": 375 }], 370: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = supportedProperty;

    var _isInBrowser = require('is-in-browser');

    var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

    var _prefix = require('./prefix');

    var _prefix2 = _interopRequireDefault(_prefix);

    var _camelize = require('./camelize');

    var _camelize2 = _interopRequireDefault(_camelize);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var el = void 0;
    var cache = {};

    if (_isInBrowser2['default']) {
      el = document.createElement('p');

      var computed = window.getComputedStyle(document.documentElement, '');
      for (var key in computed) {
        if (!isNaN(key)) cache[computed[key]] = computed[key];
      }
    }

    function supportedProperty(prop) {
      if (!el) return prop;

      if (cache[prop] != null) return cache[prop];

      if ((0, _camelize2['default'])(prop) in el.style) {
        cache[prop] = prop;
      } else if (_prefix2['default'].js + (0, _camelize2['default'])('-' + prop) in el.style) {
          cache[prop] = _prefix2['default'].css + prop;
        } else {
          cache[prop] = false;
        }

      return cache[prop];
    }
  }, { "./camelize": 367, "./prefix": 369, "is-in-browser": 375 }], 371: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = supportedValue;

    var _isInBrowser = require('is-in-browser');

    var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

    var _prefix = require('./prefix');

    var _prefix2 = _interopRequireDefault(_prefix);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var cache = {};
    var el = void 0;

    if (_isInBrowser2['default']) el = document.createElement('p');

    function supportedValue(property, value) {
      if (!el) return value;

      if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) return value;

      var cacheKey = property + value;

      if (cache[cacheKey] != null) return cache[cacheKey];

      try {
        el.style[property] = value;
      } catch (err) {
        cache[cacheKey] = false;
        return false;
      }

      if (el.style[property] !== '') {
        cache[cacheKey] = value;
      } else {
        value = _prefix2['default'].css + value;

        if (value === '-ms-flex') value = '-ms-flexbox';

        el.style[property] = value;

        if (el.style[property] !== '') cache[cacheKey] = value;
      }

      if (!cache[cacheKey]) cache[cacheKey] = false;

      el.style[property] = '';

      return cache[cacheKey];
    }
  }, { "./prefix": 369, "is-in-browser": 375 }], 372: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    var isValidString = function isValidString(param) {
      return typeof param === 'string' && param.length > 0;
    };

    var startsWith = function startsWith(string, start) {
      return string[0] === start;
    };

    var isSelector = function isSelector(param) {
      return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
    };

    var node = function node(h) {
      return function (tagName) {
        return function (first) {
          for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }

          if (isSelector(first)) {
            return h.apply(undefined, [tagName + first].concat(rest));
          } else if (typeof first === 'undefined') {
            return h(tagName);
          } else {
            return h.apply(undefined, [tagName, first].concat(rest));
          }
        };
      };
    };

    var TAG_NAMES = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'math', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nextid', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rb', 'rbc', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];

    exports['default'] = function (h) {
      var createTag = node(h);
      var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
      TAG_NAMES.forEach(function (n) {
        exported[n] = createTag(n);
      });
      return exported;
    };

    module.exports = exports['default'];
  }, {}], 373: [function (require, module, exports) {
    var split = require('browser-split');
    var ClassList = require('class-list');

    var w = typeof window === 'undefined' ? require('html-element') : window;
    var document = w.document;
    var Text = w.Text;

    function context() {

      var cleanupFuncs = [];

      function h() {
        var args = [].slice.call(arguments),
            e = null;
        function item(l) {
          var r;
          function parseClass(string) {

            var m = split(string, /([\.#]?[^\s#.]+)/);
            if (/^\.|#/.test(m[1])) e = document.createElement('div');
            forEach(m, function (v) {
              var s = v.substring(1, v.length);
              if (!v) return;
              if (!e) e = document.createElement(v);else if (v[0] === '.') ClassList(e).add(s);else if (v[0] === '#') e.setAttribute('id', s);
            });
          }

          if (l == null) ;else if ('string' === typeof l) {
            if (!e) parseClass(l);else e.appendChild(r = document.createTextNode(l));
          } else if ('number' === typeof l || 'boolean' === typeof l || l instanceof Date || l instanceof RegExp) {
            e.appendChild(r = document.createTextNode(l.toString()));
          } else if (isArray(l)) forEach(l, item);else if (isNode(l)) e.appendChild(r = l);else if (l instanceof Text) e.appendChild(r = l);else if ('object' === (typeof l === "undefined" ? "undefined" : _typeof2(l))) {
              for (var k in l) {
                if ('function' === typeof l[k]) {
                  if (/^on\w+/.test(k)) {
                    (function (k, l) {
                      if (e.addEventListener) {
                        e.addEventListener(k.substring(2), l[k], false);
                        cleanupFuncs.push(function () {
                          e.removeEventListener(k.substring(2), l[k], false);
                        });
                      } else {
                        e.attachEvent(k, l[k]);
                        cleanupFuncs.push(function () {
                          e.detachEvent(k, l[k]);
                        });
                      }
                    })(k, l);
                  } else {
                    e[k] = l[k]();
                    cleanupFuncs.push(l[k](function (v) {
                      e[k] = v;
                    }));
                  }
                } else if (k === 'style') {
                  if ('string' === typeof l[k]) {
                    e.style.cssText = l[k];
                  } else {
                    for (var s in l[k]) {
                      (function (s, v) {
                        if ('function' === typeof v) {
                          e.style.setProperty(s, v());
                          cleanupFuncs.push(v(function (val) {
                            e.style.setProperty(s, val);
                          }));
                        } else var match = l[k][s].match(/(.*)\W+!important\W*$/);
                        if (match) {
                          e.style.setProperty(s, match[1], 'important');
                        } else {
                          e.style.setProperty(s, l[k][s]);
                        }
                      })(s, l[k][s]);
                    }
                  }
                } else if (k === 'attrs') {
                  for (var v in l[k]) {
                    e.setAttribute(v, l[k][v]);
                  }
                } else if (k.substr(0, 5) === "data-") {
                  e.setAttribute(k, l[k]);
                } else {
                  e[k] = l[k];
                }
              }
            } else if ('function' === typeof l) {
              var v = l();
              e.appendChild(r = isNode(v) ? v : document.createTextNode(v));

              cleanupFuncs.push(l(function (v) {
                if (isNode(v) && r.parentElement) r.parentElement.replaceChild(v, r), r = v;else r.textContent = v;
              }));
            }

          return r;
        }
        while (args.length) {
          item(args.shift());
        }return e;
      }

      h.cleanup = function () {
        for (var i = 0; i < cleanupFuncs.length; i++) {
          cleanupFuncs[i]();
        }
        cleanupFuncs.length = 0;
      };

      return h;
    }

    var h = module.exports = context();
    h.context = context;

    function isNode(el) {
      return el && el.nodeName && el.nodeType;
    }

    function forEach(arr, fn) {
      if (arr.forEach) return arr.forEach(fn);
      for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
      }
    }

    function isArray(arr) {
      return Object.prototype.toString.call(arr) == '[object Array]';
    }
  }, { "browser-split": 42, "class-list": 43, "html-element": 41 }], 374: [function (require, module, exports) {

    var indexOf = [].indexOf;

    module.exports = function (arr, obj) {
      if (indexOf) return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i;
      }
      return -1;
    };
  }, {}], 375: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var isBrowser = exports.isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

    exports.default = isBrowser;
  }, {}], 376: [function (require, module, exports) {
    'use strict';

    var symbolObservable = require('symbol-observable');

    module.exports = function (fn) {
      return Boolean(fn && fn[symbolObservable]);
    };
  }, { "symbol-observable": 377 }], 377: [function (require, module, exports) {
    (function (global) {
      'use strict';

      module.exports = require('./ponyfill')(global || window || this);
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, { "./ponyfill": 378 }], 378: [function (require, module, exports) {
    'use strict';

    module.exports = function symbolObservablePonyfill(root) {
      var result;
      var _Symbol4 = root.Symbol;

      if (typeof _Symbol4 === 'function') {
        if (_Symbol4.observable) {
          result = _Symbol4.observable;
        } else {
          result = _Symbol4('observable');
          _Symbol4.observable = result;
        }
      } else {
        result = '@@observable';
      }

      return result;
    };
  }, {}], 379: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = camelCase;
    var regExp = /([A-Z])/g;

    function replace(str) {
      return "-" + str.toLowerCase();
    }

    function convertCase(style) {
      var converted = {};

      for (var prop in style) {
        converted[prop.replace(regExp, replace)] = style[prop];
      }

      if (style.fallbacks) {
        if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
      }

      return converted;
    }

    function camelCase() {
      function onProcessStyle(style) {
        if (Array.isArray(style)) {
          for (var index = 0; index < style.length; index++) {
            style[index] = convertCase(style[index]);
          }
          return style;
        }

        return convertCase(style);
      }

      return { onProcessStyle: onProcessStyle };
    }
  }, {}], 380: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = jssCompose;

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function registerClass(rule, className) {
      if (!className) return true;

      if (Array.isArray(className)) {
        for (var index = 0; index < className.length; index++) {
          var isSetted = registerClass(rule, className[index]);
          if (!isSetted) return false;
        }

        return true;
      }

      if (className.indexOf(' ') > -1) {
        return registerClass(rule, className.split(' '));
      }

      var parent = rule.options.parent;

      if (className[0] === '$') {
        var refRule = parent.getRule(className.substr(1));

        if (!refRule) {
          (0, _warning2.default)(false, '[JSS] Referenced rule is not defined. \r\n%s', rule);
          return false;
        }

        if (refRule === rule) {
          (0, _warning2.default)(false, '[JSS] Cyclic composition detected. \r\n%s', rule);
          return false;
        }

        parent.classes[rule.key] += ' ' + parent.classes[refRule.key];

        return true;
      }

      rule.options.parent.classes[rule.key] += ' ' + className;

      return true;
    }

    function jssCompose() {
      function onProcessStyle(style, rule) {
        if (!style.composes) return style;
        registerClass(rule, style.composes);

        delete style.composes;
        return style;
      }
      return { onProcessStyle: onProcessStyle };
    }
  }, { "warning": 428 }], 381: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports['default'] = {
      'animation-delay': 'ms',
      'animation-duration': 'ms',
      'background-position': 'px',
      'background-position-x': 'px',
      'background-position-y': 'px',
      'background-size': 'px',
      border: 'px',
      'border-bottom': 'px',
      'border-bottom-left-radius': 'px',
      'border-bottom-right-radius': 'px',
      'border-bottom-width': 'px',
      'border-left': 'px',
      'border-left-width': 'px',
      'border-radius': 'px',
      'border-right': 'px',
      'border-right-width': 'px',
      'border-spacing': 'px',
      'border-top': 'px',
      'border-top-left-radius': 'px',
      'border-top-right-radius': 'px',
      'border-top-width': 'px',
      'border-width': 'px',
      'border-after-width': 'px',
      'border-before-width': 'px',
      'border-end-width': 'px',
      'border-horizontal-spacing': 'px',
      'border-start-width': 'px',
      'border-vertical-spacing': 'px',
      bottom: 'px',
      'box-shadow': 'px',
      'column-gap': 'px',
      'column-rule': 'px',
      'column-rule-width': 'px',
      'column-width': 'px',
      'flex-basis': 'px',
      'font-size': 'px',
      'font-size-delta': 'px',
      height: 'px',
      left: 'px',
      'letter-spacing': 'px',
      'logical-height': 'px',
      'logical-width': 'px',
      margin: 'px',
      'margin-after': 'px',
      'margin-before': 'px',
      'margin-bottom': 'px',
      'margin-left': 'px',
      'margin-right': 'px',
      'margin-top': 'px',
      'max-height': 'px',
      'max-width': 'px',
      'margin-end': 'px',
      'margin-start': 'px',
      'mask-position-x': 'px',
      'mask-position-y': 'px',
      'mask-size': 'px',
      'max-logical-height': 'px',
      'max-logical-width': 'px',
      'min-height': 'px',
      'min-width': 'px',
      'min-logical-height': 'px',
      'min-logical-width': 'px',
      motion: 'px',
      'motion-offset': 'px',
      outline: 'px',
      'outline-offset': 'px',
      'outline-width': 'px',
      padding: 'px',
      'padding-bottom': 'px',
      'padding-left': 'px',
      'padding-right': 'px',
      'padding-top': 'px',
      'padding-after': 'px',
      'padding-before': 'px',
      'padding-end': 'px',
      'padding-start': 'px',
      'perspective-origin-x': '%',
      'perspective-origin-y': '%',
      perspective: 'px',
      right: 'px',
      'shape-margin': 'px',
      size: 'px',
      'text-indent': 'px',
      'text-stroke': 'px',
      'text-stroke-width': 'px',
      top: 'px',
      'transform-origin': '%',
      'transform-origin-x': '%',
      'transform-origin-y': '%',
      'transform-origin-z': '%',
      'transition-delay': 'ms',
      'transition-duration': 'ms',
      'vertical-align': 'px',
      width: 'px',
      'word-spacing': 'px',

      'box-shadow-x': 'px',
      'box-shadow-y': 'px',
      'box-shadow-blur': 'px',
      'box-shadow-spread': 'px',
      'font-line-height': 'px',
      'text-shadow-x': 'px',
      'text-shadow-y': 'px',
      'text-shadow-blur': 'px'
    };
  }, {}], 382: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    exports['default'] = defaultUnit;

    var _isObservable = require('is-observable');

    var _isObservable2 = _interopRequireDefault(_isObservable);

    var _defaultUnits = require('./defaultUnits');

    var _defaultUnits2 = _interopRequireDefault(_defaultUnits);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function addCamelCasedVersion(obj) {
      var regExp = /(-[a-z])/g;
      var replace = function replace(str) {
        return str[1].toUpperCase();
      };
      var newObj = {};
      for (var key in obj) {
        newObj[key] = obj[key];
        newObj[key.replace(regExp, replace)] = obj[key];
      }
      return newObj;
    }

    var units = addCamelCasedVersion(_defaultUnits2['default']);

    function iterate(prop, value, options) {
      if (!value) return value;

      var convertedValue = value;

      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      if (type === 'object') {
        if (Array.isArray(value)) type = 'array';
        if ((0, _isObservable2['default'])(value)) type = 'observable';
      }

      switch (type) {
        case 'object':
          if (prop === 'fallbacks') {
            for (var innerProp in value) {
              value[innerProp] = iterate(innerProp, value[innerProp], options);
            }
            break;
          }
          for (var _innerProp in value) {
            value[_innerProp] = iterate(prop + '-' + _innerProp, value[_innerProp], options);
          }
          break;
        case 'array':
          for (var i = 0; i < value.length; i++) {
            value[i] = iterate(prop, value[i], options);
          }
          break;
        case 'number':
          if (value !== 0) {
            convertedValue = value + (options[prop] || units[prop] || '');
          }
          break;
        default:
          break;
      }

      return convertedValue;
    }

    function defaultUnit() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var camelCasedOptions = addCamelCasedVersion(options);

      function onProcessStyle(style, rule) {
        if (rule.type !== 'style') return style;

        for (var prop in style) {
          style[prop] = iterate(prop, style[prop], camelCasedOptions);
        }

        return style;
      }

      function onChangeValue(value, prop) {
        return iterate(prop, value, camelCasedOptions);
      }

      return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
    }
  }, { "./defaultUnits": 381, "is-observable": 376 }], 383: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    exports.default = jssExpand;

    var _isObservable = require('is-observable');

    var _isObservable2 = _interopRequireDefault(_isObservable);

    var _props = require('./props');

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }return obj;
    }

    function mapValuesByProp(value, prop, rule) {
      return value.map(function (item) {
        return objectToString(item, prop, rule);
      });
    }

    function arrayToString(value, prop, scheme, rule) {
      if (scheme[prop] == null) return value.join(',');
      if (value.length === 0) return '';
      if (Array.isArray(value[0])) return arrayToString(value[0], prop, scheme);
      if (_typeof(value[0]) === 'object' && !(0, _isObservable2.default)(value[0])) {
        return mapValuesByProp(value, prop, rule);
      }
      return value.join(' ');
    }

    function objectToString(value, prop, rule, isFallback) {
      if (!(_props.propObj[prop] || _props.customPropObj[prop])) return '';

      var result = [];

      if (_props.customPropObj[prop]) {
        value = customPropsToStyle(value, rule, _props.customPropObj[prop], isFallback);
      }

      if (Object.keys(value).length) {
        for (var baseProp in _props.propObj[prop]) {
          if (value[baseProp]) {
            if (Array.isArray(value[baseProp])) {
              result.push(arrayToString(value[baseProp], baseProp, _props.propArrayInObj));
            } else result.push(value[baseProp]);
            continue;
          }

          if (_props.propObj[prop][baseProp] != null) {
            result.push(_props.propObj[prop][baseProp]);
          }
        }
      }

      return result.join(' ');
    }

    function customPropsToStyle(value, rule, customProps, isFallback) {
      for (var prop in customProps) {
        var propName = customProps[prop];

        if (typeof value[prop] !== 'undefined' && (isFallback || !rule.prop(propName))) {
          var appendedValue = styleDetector(_defineProperty({}, propName, value[prop]), rule)[propName];

          if (isFallback) rule.style.fallbacks[propName] = appendedValue;else rule.style[propName] = appendedValue;
        }

        delete value[prop];
      }

      return value;
    }

    function styleDetector(style, rule, isFallback) {
      for (var prop in style) {
        var value = style[prop];

        if (Array.isArray(value)) {
          if (!Array.isArray(value[0])) {
            if (prop === 'fallbacks') {
              for (var index = 0; index < style.fallbacks.length; index++) {
                style.fallbacks[index] = styleDetector(style.fallbacks[index], rule, true);
              }
              continue;
            }

            style[prop] = arrayToString(value, prop, _props.propArray);

            if (!style[prop]) delete style[prop];
          }
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !(0, _isObservable2.default)(value)) {
          if (prop === 'fallbacks') {
            style.fallbacks = styleDetector(style.fallbacks, rule, true);
            continue;
          }

          style[prop] = objectToString(value, prop, rule, isFallback);

          if (!style[prop]) delete style[prop];
        } else if (style[prop] === '') delete style[prop];
      }

      return style;
    }

    function jssExpand() {
      function onProcessStyle(style, rule) {
        if (!style || rule.type !== 'style') return style;

        if (Array.isArray(style)) {
          for (var index = 0; index < style.length; index++) {
            style[index] = styleDetector(style[index], rule);
          }
          return style;
        }

        return styleDetector(style, rule);
      }

      return { onProcessStyle: onProcessStyle };
    }
  }, { "./props": 384, "is-observable": 376 }], 384: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var propArray = exports.propArray = {
      'background-size': true,
      'background-position': true,
      border: true,
      'border-bottom': true,
      'border-left': true,
      'border-top': true,
      'border-right': true,
      'border-radius': true,
      'box-shadow': true,
      flex: true,
      margin: true,
      padding: true,
      outline: true,
      'transform-origin': true,
      transform: true,
      transition: true
    };

    var propArrayInObj = exports.propArrayInObj = {
      position: true,
      size: true };

    var propObj = exports.propObj = {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      background: {
        attachment: null,
        color: null,
        image: null,
        position: null,
        repeat: null
      },
      border: {
        width: null,
        style: null,
        color: null
      },
      'border-top': {
        width: null,
        style: null,
        color: null
      },
      'border-right': {
        width: null,
        style: null,
        color: null
      },
      'border-bottom': {
        width: null,
        style: null,
        color: null
      },
      'border-left': {
        width: null,
        style: null,
        color: null
      },
      outline: {
        width: null,
        style: null,
        color: null
      },
      'list-style': {
        type: null,
        position: null,
        image: null
      },
      transition: {
        property: null,
        duration: null,
        'timing-function': null,
        timingFunction: null,
        delay: null
      },
      animation: {
        name: null,
        duration: null,
        'timing-function': null,
        timingFunction: null,
        delay: null,
        'iteration-count': null,
        iterationCount: null,
        direction: null,
        'fill-mode': null,
        fillMode: null,
        'play-state': null,
        playState: null },
      'box-shadow': {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: null,
        inset: null
      },
      'text-shadow': {
        x: 0,
        y: 0,
        blur: null,
        color: null
      }
    };

    var customPropObj = exports.customPropObj = {
      border: {
        radius: 'border-radius'
      },
      background: {
        size: 'background-size',
        image: 'background-image'
      },
      font: {
        style: 'font-style',
        variant: 'font-variant',
        weight: 'font-weight',
        stretch: 'font-stretch',
        size: 'font-size',
        family: 'font-family',
        lineHeight: 'line-height',
        'line-height': 'line-height'
      },
      flex: {
        grow: 'flex-grow',
        basis: 'flex-basis',
        direction: 'flex-direction',
        wrap: 'flex-wrap',
        flow: 'flex-flow',
        shrink: 'flex-shrink'
      },
      align: {
        self: 'align-self',
        items: 'align-items',
        content: 'align-content'
      }
    };
  }, {}], 385: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    exports['default'] = jssExtend;

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    var _isObservable = require('is-observable');

    var _isObservable2 = _interopRequireDefault(_isObservable);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var isObject = function isObject(obj) {
      return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj) && !(0, _isObservable2['default'])(obj);
    };

    function extend(style, rule, sheet) {
      var newStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (typeof style.extend === 'string') {
        if (sheet) {
          var refRule = sheet.getRule(style.extend);
          if (refRule) {
            if (refRule === rule) (0, _warning2['default'])(false, '[JSS] A rule tries to extend itself \r\n%s', rule);else if (refRule.options.parent) {
              var originalStyle = refRule.options.parent.rules.raw[style.extend];
              extend(originalStyle, rule, sheet, newStyle);
            }
          }
        }
      } else if (Array.isArray(style.extend)) {
        for (var index = 0; index < style.extend.length; index++) {
          extend(style.extend[index], rule, sheet, newStyle);
        }
      } else {
        for (var prop in style.extend) {
          if (prop === 'extend') {
            extend(style.extend.extend, rule, sheet, newStyle);
          } else if (isObject(style.extend[prop])) {
            if (!newStyle[prop]) newStyle[prop] = {};
            extend(style.extend[prop], rule, sheet, newStyle[prop]);
          } else {
            newStyle[prop] = style.extend[prop];
          }
        }
      }

      for (var _prop in style) {
        if (_prop === 'extend') continue;
        if (isObject(newStyle[_prop]) && isObject(style[_prop])) {
          extend(style[_prop], rule, sheet, newStyle[_prop]);
        } else if (isObject(style[_prop])) {
          newStyle[_prop] = extend(style[_prop], rule, sheet);
        } else {
          newStyle[_prop] = style[_prop];
        }
      }

      return newStyle;
    }

    function jssExtend() {
      function onProcessStyle(style, rule, sheet) {
        return style.extend ? extend(style, rule, sheet) : style;
      }

      return { onProcessStyle: onProcessStyle };
    }
  }, { "is-observable": 376, "warning": 428 }], 386: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    exports['default'] = jssGlobal;

    var _jss = require('jss');

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var propKey = '@global';
    var prefixKey = '@global ';

    var GlobalContainerRule = function () {
      function GlobalContainerRule(key, styles, options) {
        _classCallCheck(this, GlobalContainerRule);

        this.type = 'global';

        this.key = key;
        this.options = options;
        this.rules = new _jss.RuleList(_extends({}, options, {
          parent: this
        }));

        for (var selector in styles) {
          this.rules.add(selector, styles[selector], { selector: selector });
        }

        this.rules.process();
      }

      _createClass(GlobalContainerRule, [{
        key: 'getRule',
        value: function getRule(name) {
          return this.rules.get(name);
        }

      }, {
        key: 'addRule',
        value: function addRule(name, style, options) {
          var rule = this.rules.add(name, style, options);
          this.options.jss.plugins.onProcessRule(rule);
          return rule;
        }

      }, {
        key: 'indexOf',
        value: function indexOf(rule) {
          return this.rules.indexOf(rule);
        }

      }, {
        key: 'toString',
        value: function toString() {
          return this.rules.toString();
        }
      }]);

      return GlobalContainerRule;
    }();

    var GlobalPrefixedRule = function () {
      function GlobalPrefixedRule(name, style, options) {
        _classCallCheck(this, GlobalPrefixedRule);

        this.name = name;
        this.options = options;
        var selector = name.substr(prefixKey.length);
        this.rule = options.jss.createRule(selector, style, _extends({}, options, {
          parent: this,
          selector: selector
        }));
      }

      _createClass(GlobalPrefixedRule, [{
        key: 'toString',
        value: function toString(options) {
          return this.rule.toString(options);
        }
      }]);

      return GlobalPrefixedRule;
    }();

    var separatorRegExp = /\s*,\s*/g;

    function addScope(selector, scope) {
      var parts = selector.split(separatorRegExp);
      var scoped = '';
      for (var i = 0; i < parts.length; i++) {
        scoped += scope + ' ' + parts[i].trim();
        if (parts[i + 1]) scoped += ', ';
      }
      return scoped;
    }

    function handleNestedGlobalContainerRule(rule) {
      var options = rule.options,
          style = rule.style;

      var rules = style[propKey];

      if (!rules) return;

      for (var name in rules) {
        options.sheet.addRule(name, rules[name], _extends({}, options, {
          selector: addScope(name, rule.selector)
        }));
      }

      delete style[propKey];
    }

    function handlePrefixedGlobalRule(rule) {
      var options = rule.options,
          style = rule.style;

      for (var prop in style) {
        if (prop.substr(0, propKey.length) !== propKey) continue;

        var selector = addScope(prop.substr(propKey.length), rule.selector);
        options.sheet.addRule(selector, style[prop], _extends({}, options, {
          selector: selector
        }));
        delete style[prop];
      }
    }

    function jssGlobal() {
      function onCreateRule(name, styles, options) {
        if (name === propKey) {
          return new GlobalContainerRule(name, styles, options);
        }

        if (name[0] === '@' && name.substr(0, prefixKey.length) === prefixKey) {
          return new GlobalPrefixedRule(name, styles, options);
        }

        var parent = options.parent;

        if (parent) {
          if (parent.type === 'global' || parent.options.parent.type === 'global') {
            options.global = true;
          }
        }

        if (options.global) options.selector = name;

        return null;
      }

      function onProcessRule(rule) {
        if (rule.type !== 'style') return;

        handleNestedGlobalContainerRule(rule);
        handlePrefixedGlobalRule(rule);
      }

      return { onCreateRule: onCreateRule, onProcessRule: onProcessRule };
    }
  }, { "jss": 399 }], 387: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    exports.default = jssNested;

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var separatorRegExp = /\s*,\s*/g;
    var parentRegExp = /&/g;
    var refRegExp = /\$([\w-]+)/g;

    function jssNested() {
      function getReplaceRef(container) {
        return function (match, key) {
          var rule = container.getRule(key);
          if (rule) return rule.selector;
          (0, _warning2.default)(false, '[JSS] Could not find the referenced rule %s in %s.', key, container.options.meta || container);
          return key;
        };
      }

      var hasAnd = function hasAnd(str) {
        return str.indexOf('&') !== -1;
      };

      function replaceParentRefs(nestedProp, parentProp) {
        var parentSelectors = parentProp.split(separatorRegExp);
        var nestedSelectors = nestedProp.split(separatorRegExp);

        var result = '';

        for (var i = 0; i < parentSelectors.length; i++) {
          var parent = parentSelectors[i];

          for (var j = 0; j < nestedSelectors.length; j++) {
            var nested = nestedSelectors[j];
            if (result) result += ', ';

            result += hasAnd(nested) ? nested.replace(parentRegExp, parent) : parent + ' ' + nested;
          }
        }

        return result;
      }

      function getOptions(rule, container, options) {
        if (options) return _extends({}, options, { index: options.index + 1 });

        var nestingLevel = rule.options.nestingLevel;

        nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;

        return _extends({}, rule.options, {
          nestingLevel: nestingLevel,
          index: container.indexOf(rule) + 1
        });
      }

      function onProcessStyle(style, rule) {
        if (rule.type !== 'style') return style;
        var container = rule.options.parent;
        var options = void 0;
        var replaceRef = void 0;
        for (var prop in style) {
          var isNested = hasAnd(prop);
          var isNestedConditional = prop[0] === '@';

          if (!isNested && !isNestedConditional) continue;

          options = getOptions(rule, container, options);

          if (isNested) {
            var selector = replaceParentRefs(prop, rule.selector);if (!replaceRef) replaceRef = getReplaceRef(container);selector = selector.replace(refRegExp, replaceRef);

            container.addRule(selector, style[prop], _extends({}, options, { selector: selector }));
          } else if (isNestedConditional) {
            container.addRule(prop, null, options).addRule(rule.key, style[prop], { selector: rule.selector });
          }

          delete style[prop];
        }

        return style;
      }

      return { onProcessStyle: onProcessStyle };
    }
  }, { "warning": 428 }], 388: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _jssTemplate = require('jss-template');

    var _jssTemplate2 = _interopRequireDefault(_jssTemplate);

    var _jssGlobal = require('jss-global');

    var _jssGlobal2 = _interopRequireDefault(_jssGlobal);

    var _jssExtend = require('jss-extend');

    var _jssExtend2 = _interopRequireDefault(_jssExtend);

    var _jssNested = require('jss-nested');

    var _jssNested2 = _interopRequireDefault(_jssNested);

    var _jssCompose = require('jss-compose');

    var _jssCompose2 = _interopRequireDefault(_jssCompose);

    var _jssCamelCase = require('jss-camel-case');

    var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

    var _jssDefaultUnit = require('jss-default-unit');

    var _jssDefaultUnit2 = _interopRequireDefault(_jssDefaultUnit);

    var _jssExpand = require('jss-expand');

    var _jssExpand2 = _interopRequireDefault(_jssExpand);

    var _jssVendorPrefixer = require('jss-vendor-prefixer');

    var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

    var _jssPropsSort = require('jss-props-sort');

    var _jssPropsSort2 = _interopRequireDefault(_jssPropsSort);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    exports.default = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        plugins: [(0, _jssTemplate2.default)(options.template), (0, _jssGlobal2.default)(options.global), (0, _jssExtend2.default)(options.extend), (0, _jssNested2.default)(options.nested), (0, _jssCompose2.default)(options.compose), (0, _jssCamelCase2.default)(options.camelCase), (0, _jssDefaultUnit2.default)(options.defaultUnit), (0, _jssExpand2.default)(options.expand), (0, _jssVendorPrefixer2.default)(options.vendorPrefixer), (0, _jssPropsSort2.default)(options.propsSort)]
      };
    };
  }, { "jss-camel-case": 379, "jss-compose": 380, "jss-default-unit": 382, "jss-expand": 383, "jss-extend": 385, "jss-global": 386, "jss-nested": 387, "jss-props-sort": 389, "jss-template": 390, "jss-vendor-prefixer": 392 }], 389: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = jssPropsSort;

    function jssPropsSort() {
      function sort(prop0, prop1) {
        return prop0.length - prop1.length;
      }

      function onProcessStyle(style, rule) {
        if (rule.type !== 'style') return style;

        var newStyle = {};
        var props = Object.keys(style).sort(sort);
        for (var prop in props) {
          newStyle[props[prop]] = style[props[prop]];
        }
        return newStyle;
      }

      return { onProcessStyle: onProcessStyle };
    }
  }, {}], 390: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _parse = require('./parse');

    var _parse2 = _interopRequireDefault(_parse);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var onProcessRule = function onProcessRule(rule) {
      if (typeof rule.style === 'string') {
        rule.style = (0, _parse2['default'])(rule.style);
      }
    };

    exports['default'] = function () {
      return { onProcessRule: onProcessRule };
    };
  }, { "./parse": 391 }], 391: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var semiWithNl = /;\n/;

    exports['default'] = function (cssText) {
      var style = {};
      var split = cssText.split(semiWithNl);
      for (var i = 0; i < split.length; i++) {
        var decl = split[i];

        if (!decl) continue;
        var colonIndex = decl.indexOf(':');
        if (colonIndex === -1) {
          (0, _warning2['default'])(false, 'Malformed CSS string "%s"', decl);
          continue;
        }
        var prop = decl.substr(0, colonIndex).trim();
        var value = decl.substr(colonIndex + 1).trim();
        style[prop] = value;
      }
      return style;
    };
  }, { "warning": 428 }], 392: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = jssVendorPrefixer;

    var _cssVendor = require('css-vendor');

    var vendor = _interopRequireWildcard(_cssVendor);

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }newObj['default'] = obj;return newObj;
      }
    }

    function jssVendorPrefixer() {
      function onProcessRule(rule) {
        if (rule.type === 'keyframes') {
          rule.key = '@' + vendor.prefix.css + rule.key.substr(1);
        }
      }

      function onProcessStyle(style, rule) {
        if (rule.type !== 'style') return style;

        for (var prop in style) {
          var value = style[prop];

          var changeProp = false;
          var supportedProp = vendor.supportedProperty(prop);
          if (supportedProp && supportedProp !== prop) changeProp = true;

          var changeValue = false;
          var supportedValue = vendor.supportedValue(supportedProp, value);
          if (supportedValue && supportedValue !== value) changeValue = true;

          if (changeProp || changeValue) {
            if (changeProp) delete style[prop];
            style[supportedProp || prop] = supportedValue || value;
          }
        }

        return style;
      }

      function onChangeValue(value, prop) {
        return vendor.supportedValue(prop, value);
      }

      return { onProcessRule: onProcessRule, onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
    }
  }, { "css-vendor": 368 }], 393: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _isInBrowser = require('is-in-browser');

    var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

    var _StyleSheet = require('./StyleSheet');

    var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

    var _PluginsRegistry = require('./PluginsRegistry');

    var _PluginsRegistry2 = _interopRequireDefault(_PluginsRegistry);

    var _rules = require('./plugins/rules');

    var _rules2 = _interopRequireDefault(_rules);

    var _observables = require('./plugins/observables');

    var _observables2 = _interopRequireDefault(_observables);

    var _functions = require('./plugins/functions');

    var _functions2 = _interopRequireDefault(_functions);

    var _sheets = require('./sheets');

    var _sheets2 = _interopRequireDefault(_sheets);

    var _StyleRule = require('./rules/StyleRule');

    var _StyleRule2 = _interopRequireDefault(_StyleRule);

    var _createGenerateClassName = require('./utils/createGenerateClassName');

    var _createGenerateClassName2 = _interopRequireDefault(_createGenerateClassName);

    var _createRule2 = require('./utils/createRule');

    var _createRule3 = _interopRequireDefault(_createRule2);

    var _DomRenderer = require('./renderers/DomRenderer');

    var _DomRenderer2 = _interopRequireDefault(_DomRenderer);

    var _VirtualRenderer = require('./renderers/VirtualRenderer');

    var _VirtualRenderer2 = _interopRequireDefault(_VirtualRenderer);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var defaultPlugins = _rules2['default'].concat([_observables2['default'], _functions2['default']]);

    var Jss = function () {
      function Jss(options) {
        _classCallCheck(this, Jss);

        this.version = "9.3.3";
        this.plugins = new _PluginsRegistry2['default']();
        this.options = {
          createGenerateClassName: _createGenerateClassName2['default'],
          Renderer: _isInBrowser2['default'] ? _DomRenderer2['default'] : _VirtualRenderer2['default'],
          plugins: []
        };
        this.generateClassName = (0, _createGenerateClassName2['default'])();

        this.use.apply(this, defaultPlugins);
        this.setup(options);
      }

      _createClass(Jss, [{
        key: 'setup',
        value: function setup() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (options.createGenerateClassName) {
            this.options.createGenerateClassName = options.createGenerateClassName;

            this.generateClassName = options.createGenerateClassName();
          }

          if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;
          if (options.virtual || options.Renderer) {
            this.options.Renderer = options.Renderer || (options.virtual ? _VirtualRenderer2['default'] : _DomRenderer2['default']);
          }

          if (options.plugins) this.use.apply(this, options.plugins);

          return this;
        }

      }, {
        key: 'createStyleSheet',
        value: function createStyleSheet(styles) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var index = options.index;
          if (typeof index !== 'number') {
            index = _sheets2['default'].index === 0 ? 0 : _sheets2['default'].index + 1;
          }
          var sheet = new _StyleSheet2['default'](styles, _extends({}, options, {
            jss: this,
            generateClassName: options.generateClassName || this.generateClassName,
            insertionPoint: this.options.insertionPoint,
            Renderer: this.options.Renderer,
            index: index
          }));
          this.plugins.onProcessSheet(sheet);

          return sheet;
        }

      }, {
        key: 'removeStyleSheet',
        value: function removeStyleSheet(sheet) {
          sheet.detach();
          _sheets2['default'].remove(sheet);
          return this;
        }

      }, {
        key: 'createRule',
        value: function createRule(name) {
          var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

          if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
            options = style;
            style = name;
            name = undefined;
          }

          var ruleOptions = options;

          ruleOptions.jss = this;
          ruleOptions.Renderer = this.options.Renderer;
          if (!ruleOptions.generateClassName) ruleOptions.generateClassName = this.generateClassName;
          if (!ruleOptions.classes) ruleOptions.classes = {};
          var rule = (0, _createRule3['default'])(name, style, ruleOptions);

          if (!ruleOptions.selector && rule instanceof _StyleRule2['default']) {
            rule.selector = '.' + ruleOptions.generateClassName(rule);
          }

          this.plugins.onProcessRule(rule);

          return rule;
        }

      }, {
        key: 'use',
        value: function use() {
          var _this = this;

          for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
            plugins[_key] = arguments[_key];
          }

          plugins.forEach(function (plugin) {
            if (_this.options.plugins.indexOf(plugin) === -1) {
              _this.options.plugins.push(plugin);
              _this.plugins.use(plugin);
            }
          });

          return this;
        }
      }]);

      return Jss;
    }();

    exports['default'] = Jss;
  }, { "./PluginsRegistry": 394, "./StyleSheet": 398, "./plugins/functions": 400, "./plugins/observables": 401, "./plugins/rules": 402, "./renderers/DomRenderer": 403, "./renderers/VirtualRenderer": 404, "./rules/StyleRule": 409, "./sheets": 411, "./utils/createGenerateClassName": 413, "./utils/createRule": 414, "is-in-browser": 375 }], 394: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var PluginsRegistry = function () {
      function PluginsRegistry() {
        _classCallCheck(this, PluginsRegistry);

        this.hooks = {
          onCreateRule: [],
          onProcessRule: [],
          onProcessStyle: [],
          onProcessSheet: [],
          onChangeValue: [],
          onUpdate: []

        };
      }

      _createClass(PluginsRegistry, [{
        key: 'onCreateRule',
        value: function onCreateRule(name, decl, options) {
          for (var i = 0; i < this.hooks.onCreateRule.length; i++) {
            var rule = this.hooks.onCreateRule[i](name, decl, options);
            if (rule) return rule;
          }
          return null;
        }

      }, {
        key: 'onProcessRule',
        value: function onProcessRule(rule) {
          if (rule.isProcessed) return;
          var sheet = rule.options.sheet;

          for (var i = 0; i < this.hooks.onProcessRule.length; i++) {
            this.hooks.onProcessRule[i](rule, sheet);
          }

          if (rule.style) this.onProcessStyle(rule.style, rule, sheet);

          rule.isProcessed = true;
        }

      }, {
        key: 'onProcessStyle',
        value: function onProcessStyle(style, rule, sheet) {
          var nextStyle = style;

          for (var i = 0; i < this.hooks.onProcessStyle.length; i++) {
            nextStyle = this.hooks.onProcessStyle[i](nextStyle, rule, sheet);

            rule.style = nextStyle;
          }
        }

      }, {
        key: 'onProcessSheet',
        value: function onProcessSheet(sheet) {
          for (var i = 0; i < this.hooks.onProcessSheet.length; i++) {
            this.hooks.onProcessSheet[i](sheet);
          }
        }

      }, {
        key: 'onUpdate',
        value: function onUpdate(data, rule, sheet) {
          for (var i = 0; i < this.hooks.onUpdate.length; i++) {
            this.hooks.onUpdate[i](data, rule, sheet);
          }
        }

      }, {
        key: 'onChangeValue',
        value: function onChangeValue(value, prop, rule) {
          var processedValue = value;
          for (var i = 0; i < this.hooks.onChangeValue.length; i++) {
            processedValue = this.hooks.onChangeValue[i](processedValue, prop, rule);
          }
          return processedValue;
        }

      }, {
        key: 'use',
        value: function use(plugin) {
          for (var name in plugin) {
            if (this.hooks[name]) this.hooks[name].push(plugin[name]);else (0, _warning2['default'])(false, '[JSS] Unknown hook "%s".', name);
          }
        }
      }]);

      return PluginsRegistry;
    }();

    exports['default'] = PluginsRegistry;
  }, { "warning": 428 }], 395: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _createRule = require('./utils/createRule');

    var _createRule2 = _interopRequireDefault(_createRule);

    var _linkRule = require('./utils/linkRule');

    var _linkRule2 = _interopRequireDefault(_linkRule);

    var _StyleRule = require('./rules/StyleRule');

    var _StyleRule2 = _interopRequireDefault(_StyleRule);

    var _escape = require('./utils/escape');

    var _escape2 = _interopRequireDefault(_escape);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var RuleList = function () {
      function RuleList(options) {
        _classCallCheck(this, RuleList);

        this.map = {};
        this.raw = {};
        this.index = [];

        this.options = options;
        this.classes = options.classes;
      }

      _createClass(RuleList, [{
        key: 'add',
        value: function add(name, decl, options) {
          var _options = this.options,
              parent = _options.parent,
              sheet = _options.sheet,
              jss = _options.jss,
              Renderer = _options.Renderer,
              generateClassName = _options.generateClassName;

          options = _extends({
            classes: this.classes,
            parent: parent,
            sheet: sheet,
            jss: jss,
            Renderer: Renderer,
            generateClassName: generateClassName
          }, options);

          if (!options.selector && this.classes[name]) {
            options.selector = '.' + (0, _escape2['default'])(this.classes[name]);
          }

          this.raw[name] = decl;

          var rule = (0, _createRule2['default'])(name, decl, options);

          var className = void 0;

          if (!options.selector && rule instanceof _StyleRule2['default']) {
            className = generateClassName(rule, sheet);
            rule.selector = '.' + (0, _escape2['default'])(className);
          }

          this.register(rule, className);

          var index = options.index === undefined ? this.index.length : options.index;
          this.index.splice(index, 0, rule);

          return rule;
        }

      }, {
        key: 'get',
        value: function get(name) {
          return this.map[name];
        }

      }, {
        key: 'remove',
        value: function remove(rule) {
          this.unregister(rule);
          this.index.splice(this.indexOf(rule), 1);
        }

      }, {
        key: 'indexOf',
        value: function indexOf(rule) {
          return this.index.indexOf(rule);
        }

      }, {
        key: 'process',
        value: function process() {
          var plugins = this.options.jss.plugins;


          this.index.slice(0).forEach(plugins.onProcessRule, plugins);
        }

      }, {
        key: 'register',
        value: function register(rule, className) {
          this.map[rule.key] = rule;
          if (rule instanceof _StyleRule2['default']) {
            this.map[rule.selector] = rule;
            if (className) this.classes[rule.key] = className;
          }
        }

      }, {
        key: 'unregister',
        value: function unregister(rule) {
          delete this.map[rule.key];
          if (rule instanceof _StyleRule2['default']) {
            delete this.map[rule.selector];
            delete this.classes[rule.key];
          }
        }

      }, {
        key: 'update',
        value: function update(name, data) {
          var _options2 = this.options,
              plugins = _options2.jss.plugins,
              sheet = _options2.sheet;

          if (typeof name === 'string') {
            plugins.onUpdate(data, this.get(name), sheet);
            return;
          }

          for (var index = 0; index < this.index.length; index++) {
            plugins.onUpdate(name, this.index[index], sheet);
          }
        }

      }, {
        key: 'link',
        value: function link(cssRules) {
          var map = this.options.sheet.renderer.getUnescapedKeysMap(this.index);

          for (var i = 0; i < cssRules.length; i++) {
            var cssRule = cssRules[i];
            var _key = this.options.sheet.renderer.getKey(cssRule);
            if (map[_key]) _key = map[_key];
            var rule = this.map[_key];
            if (rule) (0, _linkRule2['default'])(rule, cssRule);
          }
        }

      }, {
        key: 'toString',
        value: function toString(options) {
          var str = '';
          var sheet = this.options.sheet;

          var link = sheet ? sheet.options.link : false;

          for (var index = 0; index < this.index.length; index++) {
            var rule = this.index[index];
            var css = rule.toString(options);

            if (!css && !link) continue;

            if (str) str += '\n';
            str += css;
          }

          return str;
        }
      }]);

      return RuleList;
    }();

    exports['default'] = RuleList;
  }, { "./rules/StyleRule": 409, "./utils/createRule": 414, "./utils/escape": 415, "./utils/linkRule": 420 }], 396: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var SheetsManager = function () {
      function SheetsManager() {
        _classCallCheck(this, SheetsManager);

        this.sheets = [];
        this.refs = [];
        this.keys = [];
      }

      _createClass(SheetsManager, [{
        key: 'get',
        value: function get(key) {
          var index = this.keys.indexOf(key);
          return this.sheets[index];
        }
      }, {
        key: 'add',
        value: function add(key, sheet) {
          var sheets = this.sheets,
              refs = this.refs,
              keys = this.keys;

          var index = sheets.indexOf(sheet);

          if (index !== -1) return index;

          sheets.push(sheet);
          refs.push(0);
          keys.push(key);

          return sheets.length - 1;
        }
      }, {
        key: 'manage',
        value: function manage(key) {
          var index = this.keys.indexOf(key);
          var sheet = this.sheets[index];
          if (this.refs[index] === 0) sheet.attach();
          this.refs[index]++;
          if (!this.keys[index]) this.keys.splice(index, 0, key);
          return sheet;
        }
      }, {
        key: 'unmanage',
        value: function unmanage(key) {
          var index = this.keys.indexOf(key);
          if (index === -1) {
            (0, _warning2['default'])(false, 'SheetsManager: can\'t find sheet to unmanage');
            return;
          }
          if (this.refs[index] > 0) {
            this.refs[index]--;
            if (this.refs[index] === 0) this.sheets[index].detach();
          }
        }
      }, {
        key: 'size',
        get: function get() {
          return this.keys.length;
        }
      }]);

      return SheetsManager;
    }();

    exports['default'] = SheetsManager;
  }, { "warning": 428 }], 397: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var SheetsRegistry = function () {
      function SheetsRegistry() {
        _classCallCheck(this, SheetsRegistry);

        this.registry = [];
      }

      _createClass(SheetsRegistry, [{
        key: 'add',

        value: function add(sheet) {
          var registry = this.registry;
          var index = sheet.options.index;

          if (registry.indexOf(sheet) !== -1) return;

          if (registry.length === 0 || index >= this.index) {
            registry.push(sheet);
            return;
          }

          for (var i = 0; i < registry.length; i++) {
            if (registry[i].options.index > index) {
              registry.splice(i, 0, sheet);
              return;
            }
          }
        }

      }, {
        key: 'reset',
        value: function reset() {
          this.registry = [];
        }

      }, {
        key: 'remove',
        value: function remove(sheet) {
          var index = this.registry.indexOf(sheet);
          this.registry.splice(index, 1);
        }

      }, {
        key: 'toString',
        value: function toString(options) {
          return this.registry.filter(function (sheet) {
            return sheet.attached;
          }).map(function (sheet) {
            return sheet.toString(options);
          }).join('\n');
        }
      }, {
        key: 'index',

        get: function get() {
          return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
        }
      }]);

      return SheetsRegistry;
    }();

    exports['default'] = SheetsRegistry;
  }, {}], 398: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _linkRule = require('./utils/linkRule');

    var _linkRule2 = _interopRequireDefault(_linkRule);

    var _RuleList = require('./RuleList');

    var _RuleList2 = _interopRequireDefault(_RuleList);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var StyleSheet = function () {
      function StyleSheet(styles, options) {
        _classCallCheck(this, StyleSheet);

        this.attached = false;
        this.deployed = false;
        this.linked = false;
        this.classes = {};
        this.options = _extends({}, options, {
          sheet: this,
          parent: this,
          classes: this.classes
        });
        this.renderer = new options.Renderer(this);
        this.rules = new _RuleList2['default'](this.options);

        for (var name in styles) {
          this.rules.add(name, styles[name]);
        }

        this.rules.process();
      }

      _createClass(StyleSheet, [{
        key: 'attach',
        value: function attach() {
          if (this.attached) return this;
          if (!this.deployed) this.deploy();
          this.renderer.attach();
          if (!this.linked && this.options.link) this.link();
          this.attached = true;
          return this;
        }

      }, {
        key: 'detach',
        value: function detach() {
          if (!this.attached) return this;
          this.renderer.detach();
          this.attached = false;
          return this;
        }

      }, {
        key: 'addRule',
        value: function addRule(name, decl, options) {
          var queue = this.queue;

          if (this.attached && !queue) this.queue = [];

          var rule = this.rules.add(name, decl, options);
          this.options.jss.plugins.onProcessRule(rule);

          if (this.attached) {
            if (!this.deployed) return rule;

            if (queue) queue.push(rule);else {
              this.insertRule(rule);
              if (this.queue) {
                this.queue.forEach(this.insertRule, this);
                this.queue = undefined;
              }
            }
            return rule;
          }

          this.deployed = false;

          return rule;
        }

      }, {
        key: 'insertRule',
        value: function insertRule(rule) {
          var renderable = this.renderer.insertRule(rule);
          if (renderable && this.options.link) (0, _linkRule2['default'])(rule, renderable);
        }

      }, {
        key: 'addRules',
        value: function addRules(styles, options) {
          var added = [];
          for (var name in styles) {
            added.push(this.addRule(name, styles[name], options));
          }
          return added;
        }

      }, {
        key: 'getRule',
        value: function getRule(name) {
          return this.rules.get(name);
        }

      }, {
        key: 'deleteRule',
        value: function deleteRule(name) {
          var rule = this.rules.get(name);

          if (!rule) return false;

          this.rules.remove(rule);

          if (this.attached && rule.renderable) {
            return this.renderer.deleteRule(rule.renderable);
          }

          return true;
        }

      }, {
        key: 'indexOf',
        value: function indexOf(rule) {
          return this.rules.indexOf(rule);
        }

      }, {
        key: 'deploy',
        value: function deploy() {
          this.renderer.deploy();
          this.deployed = true;
          return this;
        }

      }, {
        key: 'link',
        value: function link() {
          var cssRules = this.renderer.getRules();

          if (cssRules) this.rules.link(cssRules);
          this.linked = true;
          return this;
        }

      }, {
        key: 'update',
        value: function update(name, data) {
          this.rules.update(name, data);
          return this;
        }

      }, {
        key: 'toString',
        value: function toString(options) {
          return this.rules.toString(options);
        }
      }]);

      return StyleSheet;
    }();

    exports['default'] = StyleSheet;
  }, { "./RuleList": 395, "./utils/linkRule": 420 }], 399: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = exports.createGenerateClassName = exports.sheets = exports.RuleList = exports.SheetsManager = exports.SheetsRegistry = exports.getDynamicStyles = undefined;

    var _getDynamicStyles = require('./utils/getDynamicStyles');

    Object.defineProperty(exports, 'getDynamicStyles', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_getDynamicStyles)['default'];
      }
    });

    var _SheetsRegistry = require('./SheetsRegistry');

    Object.defineProperty(exports, 'SheetsRegistry', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_SheetsRegistry)['default'];
      }
    });

    var _SheetsManager = require('./SheetsManager');

    Object.defineProperty(exports, 'SheetsManager', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_SheetsManager)['default'];
      }
    });

    var _RuleList = require('./RuleList');

    Object.defineProperty(exports, 'RuleList', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_RuleList)['default'];
      }
    });

    var _sheets = require('./sheets');

    Object.defineProperty(exports, 'sheets', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_sheets)['default'];
      }
    });

    var _createGenerateClassName = require('./utils/createGenerateClassName');

    Object.defineProperty(exports, 'createGenerateClassName', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_createGenerateClassName)['default'];
      }
    });

    var _Jss = require('./Jss');

    var _Jss2 = _interopRequireDefault(_Jss);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var create = exports.create = function create(options) {
      return new _Jss2['default'](options);
    };

    exports['default'] = create();
  }, { "./Jss": 393, "./RuleList": 395, "./SheetsManager": 396, "./SheetsRegistry": 397, "./sheets": 411, "./utils/createGenerateClassName": 413, "./utils/getDynamicStyles": 416 }], 400: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _RuleList = require('../RuleList');

    var _RuleList2 = _interopRequireDefault(_RuleList);

    var _StyleRule = require('../rules/StyleRule');

    var _StyleRule2 = _interopRequireDefault(_StyleRule);

    var _kebabCase = require('../utils/kebabCase');

    var _kebabCase2 = _interopRequireDefault(_kebabCase);

    var _createRule = require('../utils/createRule');

    var _createRule2 = _interopRequireDefault(_createRule);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var now = Date.now();
    var fnValuesNs = 'fnValues' + now;
    var fnStyleNs = 'fnStyle' + ++now;

    exports['default'] = {
      onCreateRule: function onCreateRule(name, decl, options) {
        if (typeof decl !== 'function') return null;
        var rule = (0, _createRule2['default'])(name, {}, options);
        rule[fnStyleNs] = decl;
        return rule;
      },
      onProcessStyle: function onProcessStyle(style, rule) {
        var fn = {};
        for (var prop in style) {
          var value = style[prop];
          if (typeof value !== 'function') continue;
          delete style[prop];
          fn[(0, _kebabCase2['default'])(prop)] = value;
        }
        rule = rule;
        rule[fnValuesNs] = fn;
        return style;
      },
      onUpdate: function onUpdate(data, rule) {
        if (rule.rules instanceof _RuleList2['default']) {
          rule.rules.update(data);
          return;
        }
        if (!(rule instanceof _StyleRule2['default'])) return;

        rule = rule;

        if (rule[fnValuesNs]) {
          for (var prop in rule[fnValuesNs]) {
            rule.prop(prop, rule[fnValuesNs][prop](data));
          }
        }

        rule = rule;

        var fnStyle = rule[fnStyleNs];

        if (fnStyle) {
          var style = fnStyle(data);
          for (var _prop in style) {
            rule.prop(_prop, style[_prop]);
          }
        }
      }
    };
  }, { "../RuleList": 395, "../rules/StyleRule": 409, "../utils/createRule": 414, "../utils/kebabCase": 419 }], 401: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _StyleRule = require('../rules/StyleRule');

    var _StyleRule2 = _interopRequireDefault(_StyleRule);

    var _createRule = require('../utils/createRule');

    var _createRule2 = _interopRequireDefault(_createRule);

    var _isObservable = require('../utils/isObservable');

    var _isObservable2 = _interopRequireDefault(_isObservable);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    exports['default'] = {
      onCreateRule: function onCreateRule(name, decl, options) {
        if (!(0, _isObservable2['default'])(decl)) return null;

        var style$ = decl;

        var rule = (0, _createRule2['default'])(name, {}, options);

        style$.subscribe(function (style) {
          for (var prop in style) {
            rule.prop(prop, style[prop]);
          }
        });

        return rule;
      },
      onProcessRule: function onProcessRule(rule) {
        if (!(rule instanceof _StyleRule2['default'])) return;
        var styleRule = rule;
        var style = styleRule.style;

        var _loop = function _loop(prop) {
          var value = style[prop];
          if (!(0, _isObservable2['default'])(value)) return 'continue';
          delete style[prop];
          value.subscribe({
            next: function next(nextValue) {
              styleRule.prop(prop, nextValue);
            }
          });
        };

        for (var prop in style) {
          var _ret = _loop(prop);

          if (_ret === 'continue') continue;
        }
      }
    };
  }, { "../rules/StyleRule": 409, "../utils/createRule": 414, "../utils/isObservable": 418 }], 402: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _SimpleRule = require('../rules/SimpleRule');

    var _SimpleRule2 = _interopRequireDefault(_SimpleRule);

    var _KeyframesRule = require('../rules/KeyframesRule');

    var _KeyframesRule2 = _interopRequireDefault(_KeyframesRule);

    var _ConditionalRule = require('../rules/ConditionalRule');

    var _ConditionalRule2 = _interopRequireDefault(_ConditionalRule);

    var _FontFaceRule = require('../rules/FontFaceRule');

    var _FontFaceRule2 = _interopRequireDefault(_FontFaceRule);

    var _ViewportRule = require('../rules/ViewportRule');

    var _ViewportRule2 = _interopRequireDefault(_ViewportRule);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var classes = {
      '@charset': _SimpleRule2['default'],
      '@import': _SimpleRule2['default'],
      '@namespace': _SimpleRule2['default'],
      '@keyframes': _KeyframesRule2['default'],
      '@media': _ConditionalRule2['default'],
      '@supports': _ConditionalRule2['default'],
      '@font-face': _FontFaceRule2['default'],
      '@viewport': _ViewportRule2['default'],
      '@-ms-viewport': _ViewportRule2['default']

    };
    exports['default'] = Object.keys(classes).map(function (key) {
      var re = new RegExp('^' + key);
      var onCreateRule = function onCreateRule(name, decl, options) {
        return re.test(name) ? new classes[key](name, decl, options) : null;
      };
      return { onCreateRule: onCreateRule };
    });
  }, { "../rules/ConditionalRule": 405, "../rules/FontFaceRule": 406, "../rules/KeyframesRule": 407, "../rules/SimpleRule": 408, "../rules/ViewportRule": 410 }], 403: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    var _sheets = require('../sheets');

    var _sheets2 = _interopRequireDefault(_sheets);

    var _StyleRule = require('../rules/StyleRule');

    var _StyleRule2 = _interopRequireDefault(_StyleRule);

    var _global = require('../utils/global');

    var _global2 = _interopRequireDefault(_global);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function getStyle(cssRule, prop) {
      try {
        return cssRule.style.getPropertyValue(prop);
      } catch (err) {
        return '';
      }
    }

    function setStyle(cssRule, prop, value) {
      try {
        cssRule.style.setProperty(prop, value);
      } catch (err) {
        return false;
      }
      return true;
    }

    var CSSRuleTypes = {
      STYLE_RULE: 1,
      KEYFRAMES_RULE: 7

    };var getKey = function () {
      var extractKey = function extractKey(cssText) {
        var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return cssText.substr(from, cssText.indexOf('{') - 1);
      };

      return function (cssRule) {
        if (cssRule.type === CSSRuleTypes.STYLE_RULE) return cssRule.selectorText;
        if (cssRule.type === CSSRuleTypes.KEYFRAMES_RULE) {
          var name = cssRule.name;

          if (name) return '@keyframes ' + name;

          var cssText = cssRule.cssText;

          return '@' + extractKey(cssText, cssText.indexOf('keyframes'));
        }

        return extractKey(cssRule.cssText);
      };
    }();

    function setSelector(cssRule, selectorText) {
      cssRule.selectorText = selectorText;

      return cssRule.selectorText === selectorText;
    }

    var getHead = function () {
      var head = void 0;
      return function () {
        if (!head) head = document.head || document.getElementsByTagName('head')[0];
        return head;
      };
    }();

    var getUnescapedKeysMap = function () {
      var style = void 0;
      var isAttached = false;

      return function (rules) {
        var map = {};

        if (!style) style = document.createElement('style');
        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i];
          if (!(rule instanceof _StyleRule2['default'])) continue;
          var selector = rule.selector;


          if (selector && selector.indexOf('\\') !== -1) {
            if (!isAttached) {
              getHead().appendChild(style);
              isAttached = true;
            }
            style.textContent = selector + ' {}';
            var _style = style,
                sheet = _style.sheet;

            if (sheet) {
              var cssRules = sheet.cssRules;

              if (cssRules) map[cssRules[0].selectorText] = rule.key;
            }
          }
        }
        if (isAttached) {
          getHead().removeChild(style);
          isAttached = false;
        }
        return map;
      };
    }();

    function findHigherSheet(registry, options) {
      for (var i = 0; i < registry.length; i++) {
        var sheet = registry[i];
        if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
          return sheet;
        }
      }
      return null;
    }

    function findHighestSheet(registry, options) {
      for (var i = registry.length - 1; i >= 0; i--) {
        var sheet = registry[i];
        if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
          return sheet;
        }
      }
      return null;
    }

    function findCommentNode(text) {
      var head = getHead();
      for (var i = 0; i < head.childNodes.length; i++) {
        var node = head.childNodes[i];
        if (node.nodeType === 8 && node.nodeValue.trim() === text) {
          return node;
        }
      }
      return null;
    }

    function findPrevNode(options) {
      var registry = _sheets2['default'].registry;

      if (registry.length > 0) {
        var sheet = findHigherSheet(registry, options);
        if (sheet) return sheet.renderer.element;

        sheet = findHighestSheet(registry, options);
        if (sheet) return sheet.renderer.element.nextElementSibling;
      }

      var insertionPoint = options.insertionPoint;

      if (insertionPoint && typeof insertionPoint === 'string') {
        var comment = findCommentNode(insertionPoint);
        if (comment) return comment.nextSibling;

        (0, _warning2['default'])(insertionPoint === 'jss', '[JSS] Insertion point "%s" not found.', insertionPoint);
      }

      return null;
    }

    function insertStyle(style, options) {
      var insertionPoint = options.insertionPoint;

      var prevNode = findPrevNode(options);

      if (prevNode) {
        var parentNode = prevNode.parentNode;

        if (parentNode) parentNode.insertBefore(style, prevNode);
        return;
      }

      if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
        var insertionPointElement = insertionPoint;
        var _parentNode = insertionPointElement.parentNode;

        if (_parentNode) _parentNode.insertBefore(style, insertionPointElement.nextSibling);else (0, _warning2['default'])(false, '[JSS] Insertion point is not in the DOM.');
        return;
      }

      getHead().insertBefore(style, prevNode);
    }

    var DomRenderer = function () {
      function DomRenderer(sheet) {
        _classCallCheck(this, DomRenderer);

        this.getStyle = getStyle;
        this.setStyle = setStyle;
        this.setSelector = setSelector;
        this.getKey = getKey;
        this.getUnescapedKeysMap = getUnescapedKeysMap;
        this.hasInsertedRules = false;

        if (sheet) _sheets2['default'].add(sheet);

        this.sheet = sheet;

        var _ref = this.sheet ? this.sheet.options : {},
            media = _ref.media,
            meta = _ref.meta,
            element = _ref.element;

        this.element = element || document.createElement('style');
        this.element.type = 'text/css';
        this.element.setAttribute('data-jss', '');
        if (media) this.element.setAttribute('media', media);
        if (meta) this.element.setAttribute('data-meta', meta);

        var nonce = _global2['default'].__webpack_nonce__;
        if (nonce) this.element.setAttribute('nonce', nonce);
      }

      _createClass(DomRenderer, [{
        key: 'attach',
        value: function attach() {
          if (this.element.parentNode || !this.sheet) return;

          if (this.hasInsertedRules) {
            this.deploy();
            this.hasInsertedRules = false;
          }

          insertStyle(this.element, this.sheet.options);
        }

      }, {
        key: 'detach',
        value: function detach() {
          this.element.parentNode.removeChild(this.element);
        }

      }, {
        key: 'deploy',
        value: function deploy() {
          if (!this.sheet) return;
          this.element.textContent = '\n' + this.sheet.toString() + '\n';
        }

      }, {
        key: 'insertRule',
        value: function insertRule(rule, index) {
          var sheet = this.element.sheet;
          var cssRules = sheet.cssRules;

          var str = rule.toString();
          if (!index) index = cssRules.length;

          if (!str) return false;

          try {
            sheet.insertRule(str, index);
          } catch (err) {
            (0, _warning2['default'])(false, '[JSS] Can not insert an unsupported rule \n\r%s', rule);
            return false;
          }
          this.hasInsertedRules = true;

          return cssRules[index];
        }

      }, {
        key: 'deleteRule',
        value: function deleteRule(cssRule) {
          var sheet = this.element.sheet;

          var index = this.indexOf(cssRule);
          if (index === -1) return false;
          sheet.deleteRule(index);
          return true;
        }

      }, {
        key: 'indexOf',
        value: function indexOf(cssRule) {
          var cssRules = this.element.sheet.cssRules;

          for (var _index = 0; _index < cssRules.length; _index++) {
            if (cssRule === cssRules[_index]) return _index;
          }
          return -1;
        }

      }, {
        key: 'replaceRule',
        value: function replaceRule(cssRule, rule) {
          var index = this.indexOf(cssRule);
          var newCssRule = this.insertRule(rule, index);
          this.element.sheet.deleteRule(index);
          return newCssRule;
        }

      }, {
        key: 'getRules',
        value: function getRules() {
          return this.element.sheet.cssRules;
        }
      }]);

      return DomRenderer;
    }();

    exports['default'] = DomRenderer;
  }, { "../rules/StyleRule": 409, "../sheets": 411, "../utils/global": 417, "warning": 428 }], 404: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var VirtualRenderer = function () {
      function VirtualRenderer() {
        _classCallCheck(this, VirtualRenderer);
      }

      _createClass(VirtualRenderer, [{
        key: 'setStyle',
        value: function setStyle() {
          return true;
        }
      }, {
        key: 'getStyle',
        value: function getStyle() {
          return '';
        }
      }, {
        key: 'setSelector',
        value: function setSelector() {
          return true;
        }
      }, {
        key: 'getKey',
        value: function getKey() {
          return '';
        }
      }, {
        key: 'attach',
        value: function attach() {}
      }, {
        key: 'detach',
        value: function detach() {}
      }, {
        key: 'deploy',
        value: function deploy() {}
      }, {
        key: 'insertRule',
        value: function insertRule() {
          return false;
        }
      }, {
        key: 'deleteRule',
        value: function deleteRule() {
          return true;
        }
      }, {
        key: 'replaceRule',
        value: function replaceRule() {
          return false;
        }
      }, {
        key: 'getRules',
        value: function getRules() {}
      }, {
        key: 'indexOf',
        value: function indexOf() {
          return -1;
        }
      }]);

      return VirtualRenderer;
    }();

    exports['default'] = VirtualRenderer;
  }, {}], 405: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _RuleList = require('../RuleList');

    var _RuleList2 = _interopRequireDefault(_RuleList);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var ConditionalRule = function () {
      function ConditionalRule(key, styles, options) {
        _classCallCheck(this, ConditionalRule);

        this.type = 'conditional';
        this.isProcessed = false;

        this.key = key;
        this.options = options;
        this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));

        for (var name in styles) {
          this.rules.add(name, styles[name]);
        }

        this.rules.process();
      }

      _createClass(ConditionalRule, [{
        key: 'getRule',
        value: function getRule(name) {
          return this.rules.get(name);
        }

      }, {
        key: 'indexOf',
        value: function indexOf(rule) {
          return this.rules.indexOf(rule);
        }

      }, {
        key: 'addRule',
        value: function addRule(name, style, options) {
          var rule = this.rules.add(name, style, options);
          this.options.jss.plugins.onProcessRule(rule);
          return rule;
        }

      }, {
        key: 'toString',
        value: function toString() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };

          var inner = this.rules.toString(options);
          return inner ? this.key + ' {\n' + inner + '\n}' : '';
        }
      }]);

      return ConditionalRule;
    }();

    exports['default'] = ConditionalRule;
  }, { "../RuleList": 395 }], 406: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _toCss = require('../utils/toCss');

    var _toCss2 = _interopRequireDefault(_toCss);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var FontFaceRule = function () {
      function FontFaceRule(key, style, options) {
        _classCallCheck(this, FontFaceRule);

        this.type = 'font-face';
        this.isProcessed = false;

        this.key = key;
        this.style = style;
        this.options = options;
      }

      _createClass(FontFaceRule, [{
        key: 'toString',
        value: function toString(options) {
          if (Array.isArray(this.style)) {
            var str = '';
            for (var index = 0; index < this.style.length; index++) {
              str += (0, _toCss2['default'])(this.key, this.style[index]);
              if (this.style[index + 1]) str += '\n';
            }
            return str;
          }

          return (0, _toCss2['default'])(this.key, this.style, options);
        }
      }]);

      return FontFaceRule;
    }();

    exports['default'] = FontFaceRule;
  }, { "../utils/toCss": 421 }], 407: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _RuleList = require('../RuleList');

    var _RuleList2 = _interopRequireDefault(_RuleList);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var KeyframesRule = function () {
      function KeyframesRule(key, frames, options) {
        _classCallCheck(this, KeyframesRule);

        this.type = 'keyframes';
        this.isProcessed = false;

        this.key = key;
        this.options = options;
        this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));

        for (var name in frames) {
          this.rules.add(name, frames[name], _extends({}, this.options, {
            parent: this,
            selector: name
          }));
        }

        this.rules.process();
      }

      _createClass(KeyframesRule, [{
        key: 'toString',
        value: function toString() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };

          var inner = this.rules.toString(options);
          if (inner) inner += '\n';
          return this.key + ' {\n' + inner + '}';
        }
      }]);

      return KeyframesRule;
    }();

    exports['default'] = KeyframesRule;
  }, { "../RuleList": 395 }], 408: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var SimpleRule = function () {
      function SimpleRule(key, value, options) {
        _classCallCheck(this, SimpleRule);

        this.type = 'simple';
        this.isProcessed = false;

        this.key = key;
        this.value = value;
        this.options = options;
      }

      _createClass(SimpleRule, [{
        key: 'toString',
        value: function toString(options) {
          if (Array.isArray(this.value)) {
            var str = '';
            for (var index = 0; index < this.value.length; index++) {
              str += this.key + ' ' + this.value[index] + ';';
              if (this.value[index + 1]) str += '\n';
            }
            return str;
          }

          return this.key + ' ' + this.value + ';';
        }
      }]);

      return SimpleRule;
    }();

    exports['default'] = SimpleRule;
  }, {}], 409: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    var _toCss = require('../utils/toCss');

    var _toCss2 = _interopRequireDefault(_toCss);

    var _toCssValue = require('../utils/toCssValue');

    var _toCssValue2 = _interopRequireDefault(_toCssValue);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var StyleRule = function () {
      function StyleRule(key, style, options) {
        _classCallCheck(this, StyleRule);

        this.type = 'style';
        this.isProcessed = false;
        var sheet = options.sheet,
            Renderer = options.Renderer,
            selector = options.selector;

        this.key = key;
        this.options = options;
        this.style = style;
        if (selector) this.selectorText = selector;
        this.renderer = sheet ? sheet.renderer : new Renderer();
      }

      _createClass(StyleRule, [{
        key: 'prop',

        value: function prop(name, nextValue) {
          if (nextValue != null) {
            if (this.style[name] !== nextValue) {
              nextValue = this.options.jss.plugins.onChangeValue(nextValue, name, this);
              this.style[name] = nextValue;

              if (this.renderable) this.renderer.setStyle(this.renderable, name, nextValue);else {
                var sheet = this.options.sheet;

                if (sheet && sheet.attached) {
                  (0, _warning2['default'])(false, 'Rule is not linked. Missing sheet option "link: true".');
                }
              }
            }
            return this;
          }

          return this.style[name];
        }

      }, {
        key: 'applyTo',
        value: function applyTo(renderable) {
          var json = this.toJSON();
          for (var prop in json) {
            this.renderer.setStyle(renderable, prop, json[prop]);
          }return this;
        }

      }, {
        key: 'toJSON',
        value: function toJSON() {
          var json = {};
          for (var prop in this.style) {
            var value = this.style[prop];
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = (0, _toCssValue2['default'])(value);
          }
          return json;
        }

      }, {
        key: 'toString',
        value: function toString(options) {
          var sheet = this.options.sheet;

          var link = sheet ? sheet.options.link : false;
          var opts = link ? _extends({}, options, { allowEmpty: true }) : options;
          return (0, _toCss2['default'])(this.selector, this.style, opts);
        }
      }, {
        key: 'selector',
        set: function set(selector) {
          if (selector === this.selectorText) return;

          this.selectorText = selector;

          if (this.renderable) {
            var hasChanged = this.renderer.setSelector(this.renderable, selector);

            if (!hasChanged && this.renderable) {
              var renderable = this.renderer.replaceRule(this.renderable, this);
              if (renderable) this.renderable = renderable;
            }
          }
        },

        get: function get() {
          return this.selectorText;
        }
      }]);

      return StyleRule;
    }();

    exports['default'] = StyleRule;
  }, { "../utils/toCss": 421, "../utils/toCssValue": 422, "warning": 428 }], 410: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _toCss = require('../utils/toCss');

    var _toCss2 = _interopRequireDefault(_toCss);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var ViewportRule = function () {
      function ViewportRule(key, style, options) {
        _classCallCheck(this, ViewportRule);

        this.type = 'viewport';
        this.isProcessed = false;

        this.key = key;
        this.style = style;
        this.options = options;
      }

      _createClass(ViewportRule, [{
        key: 'toString',
        value: function toString(options) {
          return (0, _toCss2['default'])(this.key, this.style, options);
        }
      }]);

      return ViewportRule;
    }();

    exports['default'] = ViewportRule;
  }, { "../utils/toCss": 421 }], 411: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _SheetsRegistry = require('./SheetsRegistry');

    var _SheetsRegistry2 = _interopRequireDefault(_SheetsRegistry);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    exports['default'] = new _SheetsRegistry2['default']();
  }, { "./SheetsRegistry": 397 }], 412: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    exports['default'] = cloneStyle;

    var _isObservable = require('./isObservable');

    var _isObservable2 = _interopRequireDefault(_isObservable);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    var isArray = Array.isArray;
    function cloneStyle(style) {
      if (style == null) return style;

      var typeOfStyle = typeof style === 'undefined' ? 'undefined' : _typeof(style);

      if (typeOfStyle === 'string' || typeOfStyle === 'number' || typeOfStyle === 'function') {
        return style;
      }

      if (isArray(style)) return style.map(cloneStyle);

      if ((0, _isObservable2['default'])(style)) return style;

      var newStyle = {};
      for (var name in style) {
        var value = style[name];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          newStyle[name] = cloneStyle(value);
          continue;
        }
        newStyle[name] = value;
      }

      return newStyle;
    }
  }, { "./isObservable": 418 }], 413: [function (require, module, exports) {
    (function (process) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _warning = require('warning');

      var _warning2 = _interopRequireDefault(_warning);

      var _StyleSheet = require('../StyleSheet');

      var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

      var _global = require('./global');

      var _global2 = _interopRequireDefault(_global);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      var ns = '2f1acc6c3a606b082e5eef5e54414ffb';

      if (_global2['default'][ns] == null) _global2['default'][ns] = 0;

      var jssCounter = _global2['default'][ns]++;

      var maxRules = 1e10;

      var env = process.env.NODE_ENV;

      exports['default'] = function () {
        var ruleCounter = 0;

        return function (rule, sheet) {
          ruleCounter += 1;

          if (ruleCounter > maxRules) {
            (0, _warning2['default'])(false, '[JSS] You might have a memory leak. Rule counter is at %s.', ruleCounter);
          }

          if (env === 'production') {
            return 'c' + jssCounter + ruleCounter;
          }

          var prefix = sheet ? sheet.options.classNamePrefix || '' : '';
          return prefix + rule.key + '-' + jssCounter + '-' + ruleCounter;
        };
      };
    }).call(this, require('_process'));
  }, { "../StyleSheet": 398, "./global": 417, "_process": 424, "warning": 428 }], 414: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = createRule;

    var _warning = require('warning');

    var _warning2 = _interopRequireDefault(_warning);

    var _StyleRule = require('../rules/StyleRule');

    var _StyleRule2 = _interopRequireDefault(_StyleRule);

    var _cloneStyle = require('../utils/cloneStyle');

    var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function createRule() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unnamed';
      var decl = arguments[1];
      var options = arguments[2];
      var jss = options.jss;

      var declCopy = (0, _cloneStyle2['default'])(decl);

      var rule = jss.plugins.onCreateRule(name, declCopy, options);
      if (rule) return rule;

      if (name[0] === '@') {
        (0, _warning2['default'])(false, '[JSS] Unknown at-rule %s', name);
      }

      return new _StyleRule2['default'](name, declCopy, options);
    }
  }, { "../rules/StyleRule": 409, "../utils/cloneStyle": 412, "warning": 428 }], 415: [function (require, module, exports) {
    (function (process) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _global = require('./global');

      var _global2 = _interopRequireDefault(_global);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      var CSS = _global2['default'].CSS;

      var env = process.env.NODE_ENV;

      var escapeRegex = /([[\].#*$><+~=|^:(),"'`])/g;

      exports['default'] = function (str) {
        if (env === 'production') return str;

        if (!CSS || !CSS.escape) {
          return str.replace(escapeRegex, '\\$1');
        }

        return CSS.escape(str);
      };
    }).call(this, require('_process'));
  }, { "./global": 417, "_process": 424 }], 416: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    exports['default'] = function (styles) {
      function extract(styles) {
        var to = null;

        for (var key in styles) {
          var value = styles[key];
          var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

          if (type === 'function') {
            if (!to) to = {};
            to[key] = value;
          } else if (type === 'object' && value !== null && !Array.isArray(value)) {
            var extracted = extract(value);
            if (extracted) {
              if (!to) to = {};
              to[key] = extracted;
            }
          }
        }

        return to;
      }

      return extract(styles);
    };
  }, {}], 417: [function (require, module, exports) {
    (function (global) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = typeof window === 'undefined' ? global : window;
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {}], 418: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _symbolObservable = require('symbol-observable');

    var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    exports['default'] = function (value) {
      return value && value[_symbolObservable2['default']] && value === value[_symbolObservable2['default']]();
    };
  }, { "symbol-observable": 425 }], 419: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var regExp = /([A-Z])/g;
    var replace = function replace(str) {
      return "-" + str.toLowerCase();
    };

    exports["default"] = function (str) {
      return str.replace(regExp, replace);
    };
  }, {}], 420: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = linkRule;

    function linkRule(rule, cssRule) {
      rule.renderable = cssRule;
      if (rule.rules && cssRule.cssRules) rule.rules.link(cssRule.cssRules);
    }
  }, {}], 421: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = toCss;

    var _toCssValue = require('./toCssValue');

    var _toCssValue2 = _interopRequireDefault(_toCssValue);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { 'default': obj };
    }

    function indentStr(str, indent) {
      var result = '';
      for (var index = 0; index < indent; index++) {
        result += '  ';
      }return result + str;
    }

    function toCss(selector, style) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var result = '';

      if (!style) return result;

      var _options$indent = options.indent,
          indent = _options$indent === undefined ? 0 : _options$indent;
      var fallbacks = style.fallbacks;

      indent++;

      if (fallbacks) {
        if (Array.isArray(fallbacks)) {
          for (var index = 0; index < fallbacks.length; index++) {
            var fallback = fallbacks[index];
            for (var prop in fallback) {
              var value = fallback[prop];
              if (value != null) {
                result += '\n' + indentStr(prop + ': ' + (0, _toCssValue2['default'])(value) + ';', indent);
              }
            }
          }
        } else {
            for (var _prop in fallbacks) {
              var _value = fallbacks[_prop];
              if (_value != null) {
                result += '\n' + indentStr(_prop + ': ' + (0, _toCssValue2['default'])(_value) + ';', indent);
              }
            }
          }
      }

      for (var _prop2 in style) {
        var _value2 = style[_prop2];
        if (_value2 != null && _prop2 !== 'fallbacks') {
          result += '\n' + indentStr(_prop2 + ': ' + (0, _toCssValue2['default'])(_value2) + ';', indent);
        }
      }

      if (!result && !options.allowEmpty) return result;

      indent--;
      result = indentStr(selector + ' {' + result + '\n', indent) + indentStr('}', indent);

      return result;
    }
  }, { "./toCssValue": 422 }], 422: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = toCssValue;
    var joinWithSpace = function joinWithSpace(value) {
      return value.join(' ');
    };

    function toCssValue(value) {
      if (!Array.isArray(value)) return value;

      if (Array.isArray(value[0])) {
        return toCssValue(value.map(joinWithSpace));
      }

      return value.join(', ');
    }
  }, {}], 423: [function (require, module, exports) {

    ;(function (global, factory) {
      (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
    })(this, function () {
      'use strict';

      var hookCallback;

      function hooks() {
        return hookCallback.apply(null, arguments);
      }

      function setHookCallback(callback) {
        hookCallback = callback;
      }

      function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
      }

      function isObject(input) {
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
      }

      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
        } else {
          var k;
          for (k in obj) {
            if (obj.hasOwnProperty(k)) {
              return false;
            }
          }
          return true;
        }
      }

      function isUndefined(input) {
        return input === void 0;
      }

      function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
      }

      function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
      }

      function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
          res.push(fn(arr[i], i));
        }
        return res;
      }

      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }

      function extend(a, b) {
        for (var i in b) {
          if (hasOwnProp(b, i)) {
            a[i] = b[i];
          }
        }

        if (hasOwnProp(b, 'toString')) {
          a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
          a.valueOf = b.valueOf;
        }

        return a;
      }

      function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
      }

      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }

      function getParsingFlags(m) {
        if (m._pf == null) {
          m._pf = defaultParsingFlags();
        }
        return m._pf;
      }

      var some;
      if (Array.prototype.some) {
        some = Array.prototype.some;
      } else {
        some = function some(fun) {
          var t = Object(this);
          var len = t.length >>> 0;

          for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
              return true;
            }
          }

          return false;
        };
      }

      function isValid(m) {
        if (m._isValid == null) {
          var flags = getParsingFlags(m);
          var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
          });
          var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

          if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
          }

          if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
          } else {
            return isNowValid;
          }
        }
        return m._isValid;
      }

      function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
          extend(getParsingFlags(m), flags);
        } else {
          getParsingFlags(m).userInvalidated = true;
        }

        return m;
      }

      var momentProperties = hooks.momentProperties = [];

      function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
          to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
          to._i = from._i;
        }
        if (!isUndefined(from._f)) {
          to._f = from._f;
        }
        if (!isUndefined(from._l)) {
          to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
          to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
          to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
          to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
          to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
          to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
          to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
          for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
              to[prop] = val;
            }
          }
        }

        return to;
      }

      var updateInProgress = false;

      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
          this._d = new Date(NaN);
        }

        if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }

      function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
      }

      function absFloor(number) {
        if (number < 0) {
          return Math.ceil(number) || 0;
        } else {
          return Math.floor(number);
        }
      }

      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
        }

        return value;
      }

      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
          if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
            diffs++;
          }
        }
        return diffs + lengthDiff;
      }

      function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
          console.warn('Deprecation warning: ' + msg);
        }
      }

      function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
              arg = '';
              if (_typeof2(arguments[i]) === 'object') {
                arg += '\n[' + i + '] ';
                for (var key in arguments[0]) {
                  arg += key + ': ' + arguments[0][key] + ', ';
                }
                arg = arg.slice(0, -2);
              } else {
                arg = arguments[i];
              }
              args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }

      var deprecations = {};

      function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }

      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;

      function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
      }

      function set(config) {
        var prop, i;
        for (i in config) {
          prop = config[i];
          if (isFunction(prop)) {
            this[i] = prop;
          } else {
            this['_' + i] = prop;
          }
        }
        this._config = config;

        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
      }

      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
              res[prop] = {};
              extend(res[prop], parentConfig[prop]);
              extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
              res[prop] = childConfig[prop];
            } else {
              delete res[prop];
            }
          }
        }
        for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
            res[prop] = extend({}, res[prop]);
          }
        }
        return res;
      }

      function Locale(config) {
        if (config != null) {
          this.set(config);
        }
      }

      var keys;

      if (Object.keys) {
        keys = Object.keys;
      } else {
        keys = function keys(obj) {
          var i,
              res = [];
          for (i in obj) {
            if (hasOwnProp(obj, i)) {
              res.push(i);
            }
          }
          return res;
        };
      }

      var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
      };

      function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
      }

      var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
      };

      function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
          return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
          return val.slice(1);
        });

        return this._longDateFormat[key];
      }

      var defaultInvalidDate = 'Invalid date';

      function invalidDate() {
        return this._invalidDate;
      }

      var defaultOrdinal = '%d';
      var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

      function ordinal(number) {
        return this._ordinal.replace('%d', number);
      }

      var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
      };

      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }

      function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
      }

      var aliases = {};

      function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
      }

      function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
      }

      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
              normalizedInput[normalizedProp] = inputObject[prop];
            }
          }
        }

        return normalizedInput;
      }

      var priorities = {};

      function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
      }

      function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
          units.push({ unit: u, priority: priorities[u] });
        }
        units.sort(function (a, b) {
          return a.priority - b.priority;
        });
        return units;
      }

      function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }

      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

      var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

      var formatFunctions = {};

      var formatTokenFunctions = {};

      function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
          func = function func() {
            return this[callback]();
          };
        }
        if (token) {
          formatTokenFunctions[token] = func;
        }
        if (padded) {
          formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
        }
        if (ordinal) {
          formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
          };
        }
      }

      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
      }

      function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
          } else {
            array[i] = removeFormattingTokens(array[i]);
          }
        }

        return function (mom) {
          var output = '',
              i;
          for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
          }
          return output;
        };
      }

      function formatMoment(m, format) {
        if (!m.isValid()) {
          return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
      }

      function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
          return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
          format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }

        return format;
      }

      var match1 = /\d/;
      var match2 = /\d\d/;
      var match3 = /\d{3}/;
      var match4 = /\d{4}/;
      var match6 = /[+-]?\d{6}/;
      var match1to2 = /\d\d?/;
      var match3to4 = /\d\d\d\d?/;
      var match5to6 = /\d\d\d\d\d\d?/;
      var match1to3 = /\d{1,3}/;
      var match1to4 = /\d{1,4}/;
      var match1to6 = /[+-]?\d{1,6}/;

      var matchUnsigned = /\d+/;
      var matchSigned = /[+-]?\d+/;

      var matchOffset = /Z|[+-]\d\d:?\d\d/gi;
      var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;

      var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
      var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

      var regexes = {};

      function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }

      function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
          return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
      }

      function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
          return p1 || p2 || p3 || p4;
        }));
      }

      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      var tokens = {};

      function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
          token = [token];
        }
        if (isNumber(callback)) {
          func = function func(input, array) {
            array[callback] = toInt(input);
          };
        }
        for (i = 0; i < token.length; i++) {
          tokens[token[i]] = func;
        }
      }

      function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
          config._w = config._w || {};
          callback(input, config._w, config, token);
        });
      }

      function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
          tokens[token](input, config._a, config, token);
        }
      }

      var YEAR = 0;
      var MONTH = 1;
      var DATE = 2;
      var HOUR = 3;
      var MINUTE = 4;
      var SECOND = 5;
      var MILLISECOND = 6;
      var WEEK = 7;
      var WEEKDAY = 8;

      addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
      });

      addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
      });

      addFormatToken(0, ['YYYY', 4], 0, 'year');
      addFormatToken(0, ['YYYYY', 5], 0, 'year');
      addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

      addUnitAlias('year', 'y');

      addUnitPriority('year', 1);

      addRegexToken('Y', matchSigned);
      addRegexToken('YY', match1to2, match2);
      addRegexToken('YYYY', match1to4, match4);
      addRegexToken('YYYYY', match1to6, match6);
      addRegexToken('YYYYYY', match1to6, match6);

      addParseToken(['YYYYY', 'YYYYYY'], YEAR);
      addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
      });

      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }

      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }

      hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
      };

      var getSetYear = makeGetSet('FullYear', true);

      function getIsLeapYear() {
        return isLeapYear(this.year());
      }

      function makeGetSet(unit, keepTime) {
        return function (value) {
          if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          } else {
            return get(this, unit);
          }
        };
      }

      function get(mom, unit) {
        return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
      }

      function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
          if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
          } else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
          }
        }
      }

      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units]();
        }
        return this;
      }

      function stringSet(units, value) {
        if ((typeof units === "undefined" ? "undefined" : _typeof2(units)) === 'object') {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units);
          for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
          }
        } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units](value);
          }
        }
        return this;
      }

      function mod(n, x) {
        return (n % x + x) % x;
      }

      var indexOf;

      if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function indexOf(o) {
          var i;
          for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
              return i;
            }
          }
          return -1;
        };
      }

      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
          return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }

      addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
      });

      addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
      });

      addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
      });

      addUnitAlias('month', 'M');

      addUnitPriority('month', 8);

      addRegexToken('M', match1to2);
      addRegexToken('MM', match1to2, match2);
      addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
      });
      addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
      });

      addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
      });

      addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);

        if (month != null) {
          array[MONTH] = month;
        } else {
          getParsingFlags(config).invalidMonth = input;
        }
      });

      var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
      var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
      function localeMonths(m, format) {
        if (!m) {
          return isArray(this._months) ? this._months : this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
      }

      var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
      function localeMonthsShort(m, format) {
        if (!m) {
          return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
      }

      function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
          }
        }

        if (strict) {
          if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }

      function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
          mom = createUTC([2000, i]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
          }
          if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
          }

          if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
          } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }

      function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
          return mom;
        }

        if (typeof value === 'string') {
          if (/^\d+$/.test(value)) {
            value = toInt(value);
          } else {
            value = mom.localeData().monthsParse(value);

            if (!isNumber(value)) {
              return mom;
            }
          }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
      }

      function getSetMonth(value) {
        if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        } else {
          return get(this, 'Month');
        }
      }

      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }

      var defaultMonthsShortRegex = matchWord;
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsShortStrictRegex;
          } else {
            return this._monthsShortRegex;
          }
        } else {
          if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
      }

      var defaultMonthsRegex = matchWord;
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsStrictRegex;
          } else {
            return this._monthsRegex;
          }
        } else {
          if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
      }

      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
          mom = createUTC([2000, i]);
          shortPieces.push(this.monthsShort(mom, ''));
          longPieces.push(this.months(mom, ''));
          mixedPieces.push(this.months(mom, ''));
          mixedPieces.push(this.monthsShort(mom, ''));
        }

        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
          mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
      }

      function createDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);

        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
          date.setFullYear(y);
        }
        return date;
      }

      function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
          date.setUTCFullYear(y);
        }
        return date;
      }

      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy,
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
      }

      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }

        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }

      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }

        return {
          week: resWeek,
          year: resYear
        };
      }

      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }

      addFormatToken('w', ['ww', 2], 'wo', 'week');
      addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

      addUnitAlias('week', 'w');
      addUnitAlias('isoWeek', 'W');

      addUnitPriority('week', 5);
      addUnitPriority('isoWeek', 5);

      addRegexToken('w', match1to2);
      addRegexToken('ww', match1to2, match2);
      addRegexToken('W', match1to2);
      addRegexToken('WW', match1to2, match2);

      addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
      });

      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }

      var defaultLocaleWeek = {
        dow: 0,
        doy: 6 };

      function localeFirstDayOfWeek() {
        return this._week.dow;
      }

      function localeFirstDayOfYear() {
        return this._week.doy;
      }

      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
      }

      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
      }

      addFormatToken('d', 0, 'do', 'day');

      addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
      });

      addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
      });

      addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
      });

      addFormatToken('e', 0, 0, 'weekday');
      addFormatToken('E', 0, 0, 'isoWeekday');

      addUnitAlias('day', 'd');
      addUnitAlias('weekday', 'e');
      addUnitAlias('isoWeekday', 'E');

      addUnitPriority('day', 11);
      addUnitPriority('weekday', 11);
      addUnitPriority('isoWeekday', 11);

      addRegexToken('d', match1to2);
      addRegexToken('e', match1to2);
      addRegexToken('E', match1to2);
      addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
      });
      addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
      });
      addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
      });

      addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);

        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      });

      addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
      });

      function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
          return input;
        }

        if (!isNaN(input)) {
          return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
          return input;
        }

        return null;
      }

      function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
          return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
      }

      var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
      function localeWeekdays(m, format) {
        if (!m) {
          return isArray(this._weekdays) ? this._weekdays : this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
      }

      var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
      function localeWeekdaysShort(m) {
        return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }

      var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
      function localeWeekdaysMin(m) {
        return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }

      function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];

          for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
          }
        }

        if (strict) {
          if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }

      function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {

          mom = createUTC([2000, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
          }
          if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
          }

          if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
          }
        }
      }

      function getSetDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, 'd');
        } else {
          return day;
        }
      }

      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
      }

      function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }

        if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
          return this.day() || 7;
        }
      }

      var defaultWeekdaysRegex = matchWord;
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysStrictRegex;
          } else {
            return this._weekdaysRegex;
          }
        } else {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
      }

      var defaultWeekdaysShortRegex = matchWord;
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysShortStrictRegex;
          } else {
            return this._weekdaysShortRegex;
          }
        } else {
          if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
      }

      var defaultWeekdaysMinRegex = matchWord;
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysMinStrictRegex;
          } else {
            return this._weekdaysMinRegex;
          }
        } else {
          if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
      }

      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([2000, 1]).day(i);
          minp = this.weekdaysMin(mom, '');
          shortp = this.weekdaysShort(mom, '');
          longp = this.weekdays(mom, '');
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }

        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
          mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
      }

      function hFormat() {
        return this.hours() % 12 || 12;
      }

      function kFormat() {
        return this.hours() || 24;
      }

      addFormatToken('H', ['HH', 2], 0, 'hour');
      addFormatToken('h', ['hh', 2], 0, hFormat);
      addFormatToken('k', ['kk', 2], 0, kFormat);

      addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });

      addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });

      addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
      });

      addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });

      function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
          return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
      }

      meridiem('a', true);
      meridiem('A', false);

      addUnitAlias('hour', 'h');

      addUnitPriority('hour', 13);

      function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
      }

      addRegexToken('a', matchMeridiem);
      addRegexToken('A', matchMeridiem);
      addRegexToken('H', match1to2);
      addRegexToken('h', match1to2);
      addRegexToken('k', match1to2);
      addRegexToken('HH', match1to2, match2);
      addRegexToken('hh', match1to2, match2);
      addRegexToken('kk', match1to2, match2);

      addRegexToken('hmm', match3to4);
      addRegexToken('hmmss', match5to6);
      addRegexToken('Hmm', match3to4);
      addRegexToken('Hmmss', match5to6);

      addParseToken(['H', 'HH'], HOUR);
      addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });

      function localeIsPM(input) {
        return (input + '').toLowerCase().charAt(0) === 'p';
      }

      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
      function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
          return isLower ? 'pm' : 'PM';
        } else {
          return isLower ? 'am' : 'AM';
        }
      }

      var getSetHour = makeGetSet('Hours', true);

      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
      };

      var locales = {};
      var localeFamilies = {};
      var globalLocale;

      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
      }

      function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
          split = normalizeLocale(names[i]).split('-');
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split('-') : null;
          while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
              return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
              break;
            }
            j--;
          }
          i++;
        }
        return null;
      }

      function loadLocale(name) {
        var oldLocale = null;

        if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
          try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
          } catch (e) {}
        }
        return locales[name];
      }

      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          if (isUndefined(values)) {
            data = getLocale(key);
          } else {
            data = defineLocale(key, values);
          }

          if (data) {
            globalLocale = data;
          }
        }

        return globalLocale._abbr;
      }

      function defineLocale(name, config) {
        if (config !== null) {
          var parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
              parentConfig = locales[config.parentLocale]._config;
            } else {
              if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
              }
              localeFamilies[config.parentLocale].push({
                name: name,
                config: config
              });
              return null;
            }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));

          if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
              defineLocale(x.name, x.config);
            });
          }

          getSetGlobalLocale(name);

          return locales[name];
        } else {
          delete locales[name];
          return null;
        }
      }

      function updateLocale(name, config) {
        if (config != null) {
          var locale,
              tmpLocale,
              parentConfig = baseConfig;

          tmpLocale = loadLocale(name);
          if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
          }
          config = mergeConfigs(parentConfig, config);
          locale = new Locale(config);
          locale.parentLocale = locales[name];
          locales[name] = locale;

          getSetGlobalLocale(name);
        } else {
          if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
              locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
              delete locales[name];
            }
          }
        }
        return locales[name];
      }

      function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
        }

        if (!key) {
          return globalLocale;
        }

        if (!isArray(key)) {
          locale = loadLocale(key);
          if (locale) {
            return locale;
          }
          key = [key];
        }

        return chooseLocale(key);
      }

      function listLocales() {
        return keys(locales);
      }

      function checkOverflow(m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
          }

          getParsingFlags(m).overflow = overflow;
        }

        return m;
      }

      function defaults(a, b, c) {
        if (a != null) {
          return a;
        }
        if (b != null) {
          return b;
        }
        return c;
      }

      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
          return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }

      function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            yearToUse;

        if (config._d) {
          return;
        }

        currentDate = currentDateArray(config);

        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
        }

        if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
          }

          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }

        for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
        }

        for (; i < 7; i++) {
          config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }

        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);

        if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
          config._a[HOUR] = 24;
        }

        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== config._d.getDay()) {
          getParsingFlags(config).weekdayMismatch = true;
        }
      }

      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;

          weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
          }
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;

          var curWeek = weekOfYear(createLocal(), dow, doy);

          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

          week = defaults(w.w, curWeek.week);

          if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
              weekdayOverflow = true;
            }
          } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
              weekdayOverflow = true;
            }
          } else {
            weekday = dow;
          }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
        } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }

      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
      var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

      var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

      var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];

      var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];

      var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

      function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
          getParsingFlags(config).iso = true;

          for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
              dateFormat = isoDates[i][0];
              allowTime = isoDates[i][2] !== false;
              break;
            }
          }
          if (dateFormat == null) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
              if (isoTimes[i][1].exec(match[3])) {
                timeFormat = (match[2] || ' ') + isoTimes[i][0];
                break;
              }
            }
            if (timeFormat == null) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (tzRegex.exec(match[4])) {
              tzFormat = 'Z';
            } else {
              config._isValid = false;
              return;
            }
          }
          config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
          configFromStringAndFormat(config);
        } else {
          config._isValid = false;
        }
      }

      var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

        if (secondStr) {
          result.push(parseInt(secondStr, 10));
        }

        return result;
      }

      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
          return 2000 + year;
        } else if (year <= 999) {
          return 1900 + year;
        }
        return year;
      }

      function preprocessRFC2822(s) {
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
      }

      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
              weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }

      var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
      };

      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
          return obsOffsets[obsOffset];
        } else if (militaryOffset) {
          return 0;
        } else {
          var hm = parseInt(numOffset, 10);
          var m = hm % 100,
              h = (hm - m) / 100;
          return h * 60 + m;
        }
      }

      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
          var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
          if (!checkWeekday(match[1], parsedArray, config)) {
            return;
          }

          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);

          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

          getParsingFlags(config).rfc2822 = true;
        } else {
          config._isValid = false;
        }
      }

      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
          config._d = new Date(+matched[1]);
          return;
        }

        configFromISO(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }

        hooks.createFromInputFallback(config);
      }

      hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
      });

      hooks.ISO_8601 = function () {};

      hooks.RFC_2822 = function () {};

      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
          token = tokens[i];
          parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];

          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
              getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
          }

          if (formatTokenFunctions[token]) {
            if (parsedInput) {
              getParsingFlags(config).empty = false;
            } else {
              getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
          } else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
          }
        }

        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
        }

        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;

        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
      }

      function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
          return hour;
        }
        if (locale.meridiemHour != null) {
          return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
          isPm = locale.isPM(meridiem);
          if (isPm && hour < 12) {
            hour += 12;
          }
          if (!isPm && hour === 12) {
            hour = 0;
          }
          return hour;
        } else {
          return hour;
        }
      }

      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;

        if (config._f.length === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = new Date(NaN);
          return;
        }

        for (i = 0; i < config._f.length; i++) {
          currentScore = 0;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);

          if (!isValid(tempConfig)) {
            continue;
          }

          currentScore += getParsingFlags(tempConfig).charsLeftOver;

          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

          getParsingFlags(tempConfig).score = currentScore;

          if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
          }
        }

        extend(config, bestMoment || tempConfig);
      }

      function configFromObject(config) {
        if (config._d) {
          return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
          return obj && parseInt(obj, 10);
        });

        configFromArray(config);
      }

      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, 'd');
          res._nextDay = undefined;
        }

        return res;
      }

      function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || format === undefined && input === '') {
          return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
          config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
          return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
          config._d = input;
        } else if (isArray(format)) {
          configFromStringAndArray(config);
        } else if (format) {
          configFromStringAndFormat(config);
        } else {
          configFromInput(config);
        }

        if (!isValid(config)) {
          config._d = null;
        }

        return config;
      }

      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
          config._d = new Date(hooks.now());
        } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
          configFromString(config);
        } else if (isArray(input)) {
          config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else if (isObject(input)) {
          configFromObject(config);
        } else if (isNumber(input)) {
          config._d = new Date(input);
        } else {
          hooks.createFromInputFallback(config);
        }
      }

      function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
          strict = locale;
          locale = undefined;
        }

        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
          input = undefined;
        }

        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
      }

      function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
      }

      var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other < this ? this : other;
        } else {
          return createInvalid();
        }
      });

      var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other > this ? this : other;
        } else {
          return createInvalid();
        }
      });

      function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
          moments = moments[0];
        }
        if (!moments.length) {
          return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
          }
        }
        return res;
      }

      function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
      }

      function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
      }

      var now = function now() {
        return Date.now ? Date.now() : +new Date();
      };

      var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

      function isDurationValid(m) {
        for (var key in m) {
          if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
          }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
          if (m[ordering[i]]) {
            if (unitHasDecimal) {
              return false;
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
              unitHasDecimal = true;
            }
          }
        }

        return true;
      }

      function isValid$1() {
        return this._isValid;
      }

      function createInvalid$1() {
        return createDuration(NaN);
      }

      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 1000 * 60 * 60;
        this._days = +days + weeks * 7;

        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
      }

      function isDuration(obj) {
        return obj instanceof Duration;
      }

      function absRound(number) {
        if (number < 0) {
          return Math.round(-1 * number) * -1;
        } else {
          return Math.round(number);
        }
      }

      function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
          var offset = this.utcOffset();
          var sign = '+';
          if (offset < 0) {
            offset = -offset;
            sign = '-';
          }
          return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
      }

      offset('Z', ':');
      offset('ZZ', '');

      addRegexToken('Z', matchShortOffset);
      addRegexToken('ZZ', matchShortOffset);
      addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });

      var chunkOffset = /([\+\-]|\d\d)/gi;

      function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
          return null;
        }

        var chunk = matches[matches.length - 1] || [];
        var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
      }

      function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
          res = model.clone();
          diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();

          res._d.setTime(res._d.valueOf() + diff);
          hooks.updateOffset(res, false);
          return res;
        } else {
          return createLocal(input).local();
        }
      }

      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
      }

      hooks.updateOffset = function () {};

      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
              return this;
            }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
            this.add(localAdjust, 'm');
          }
          if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
              addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
              this._changeInProgress = true;
              hooks.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
          return this;
        } else {
          return this._isUTC ? offset : getDateOffset(this);
        }
      }

      function getSetZone(input, keepLocalTime) {
        if (input != null) {
          if (typeof input !== 'string') {
            input = -input;
          }

          this.utcOffset(input, keepLocalTime);

          return this;
        } else {
          return -this.utcOffset();
        }
      }

      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }

      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;

          if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
          }
        }
        return this;
      }

      function setOffsetToParsedOffset() {
        if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
            this.utcOffset(tZone);
          } else {
            this.utcOffset(0, true);
          }
        }
        return this;
      }

      function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
          return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
      }

      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }

      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
          var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
          this._isDSTShifted = false;
        }

        return this._isDSTShifted;
      }

      function isLocal() {
        return this.isValid() ? !this._isUTC : false;
      }

      function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
      }

      function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }

      var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

      var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

      function createDuration(input, key) {
        var duration = input,
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
          duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
          };
        } else if (isNumber(input)) {
          duration = {};
          if (key) {
            duration[key] = input;
          } else {
            duration.milliseconds = input;
          }
        } else if (!!(match = aspNetRegex.exec(input))) {
          sign = match[1] === '-' ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign,
            h: toInt(match[HOUR]) * sign,
            m: toInt(match[MINUTE]) * sign,
            s: toInt(match[SECOND]) * sign,
            ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign };
        } else if (!!(match = isoRegex.exec(input))) {
          sign = match[1] === '-' ? -1 : match[1] === '+' ? 1 : 1;
          duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            w: parseIso(match[4], sign),
            d: parseIso(match[5], sign),
            h: parseIso(match[6], sign),
            m: parseIso(match[7], sign),
            s: parseIso(match[8], sign)
          };
        } else if (duration == null) {
          duration = {};
        } else if ((typeof duration === "undefined" ? "undefined" : _typeof2(duration)) === 'object' && ('from' in duration || 'to' in duration)) {
          diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
          ret._locale = input._locale;
        }

        return ret;
      }

      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;

      function parseIso(inp, sign) {
        var res = inp && parseFloat(inp.replace(',', '.'));

        return (isNaN(res) ? 0 : res) * sign;
      }

      function positiveMomentsDifference(base, other) {
        var res = { milliseconds: 0, months: 0 };

        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
          --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
      }

      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
          return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
        } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }

        return res;
      }

      function createAdder(direction, name) {
        return function (val, period) {
          var dur, tmp;

          if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val;val = period;period = tmp;
          }

          val = typeof val === 'string' ? +val : val;
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }

      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
          return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
          setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
          set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
          mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
          hooks.updateOffset(mom, days || months);
        }
      }

      var add = createAdder(1, 'add');
      var subtract = createAdder(-1, 'subtract');

      function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
      }

      function calendar$1(time, formats) {
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
      }

      function clone() {
        return new Moment(this);
      }

      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
          return this.valueOf() > localInput.valueOf();
        } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
      }

      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
          return this.valueOf() < localInput.valueOf();
        } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
      }

      function isBetween(from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
      }

      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
          return this.valueOf() === localInput.valueOf();
        } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
      }

      function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }

      function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }

      function diff(input, units, asFloat) {
        var that, zoneDelta, delta, output;

        if (!this.isValid()) {
          return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
          return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
          case 'year':
            output = monthDiff(this, that) / 12;break;
          case 'month':
            output = monthDiff(this, that);break;
          case 'quarter':
            output = monthDiff(this, that) / 3;break;
          case 'second':
            output = (this - that) / 1e3;break;
          case 'minute':
            output = (this - that) / 6e4;break;
          case 'hour':
            output = (this - that) / 36e5;break;
          case 'day':
            output = (this - that - zoneDelta) / 864e5;break;
          case 'week':
            output = (this - that - zoneDelta) / 6048e5;break;
          default:
            output = this - that;
        }

        return asFloat ? output : absFloor(output);
      }

      function monthDiff(a, b) {
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');

          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');

          adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust) || 0;
      }

      hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
      hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

      function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      }

      function toISOString() {
        if (!this.isValid()) {
          return null;
        }
        var m = this.clone().utc();
        if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
          return this.toDate().toISOString();
        }
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
      }

      function inspect() {
        if (!this.isValid()) {
          return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
          zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
      }

      function format(inputString) {
        if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }

      function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }

      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }

      function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }

      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }

      function locale(key) {
        var newLocaleData;

        if (key === undefined) {
          return this._locale._abbr;
        } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
            this._locale = newLocaleData;
          }
          return this;
        }
      }

      var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
        if (key === undefined) {
          return this.localeData();
        } else {
          return this.locale(key);
        }
      });

      function localeData() {
        return this._locale;
      }

      function startOf(units) {
        units = normalizeUnits(units);

        switch (units) {
          case 'year':
            this.month(0);

          case 'quarter':
          case 'month':
            this.date(1);

          case 'week':
          case 'isoWeek':
          case 'day':
          case 'date':
            this.hours(0);

          case 'hour':
            this.minutes(0);

          case 'minute':
            this.seconds(0);

          case 'second':
            this.milliseconds(0);
        }

        if (units === 'week') {
          this.weekday(0);
        }
        if (units === 'isoWeek') {
          this.isoWeekday(1);
        }

        if (units === 'quarter') {
          this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
      }

      function endOf(units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
          return this;
        }

        if (units === 'date') {
          units = 'day';
        }

        return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
      }

      function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
      }

      function unix() {
        return Math.floor(this.valueOf() / 1000);
      }

      function toDate() {
        return new Date(this.valueOf());
      }

      function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
      }

      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }

      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }

      function isValid$2() {
        return isValid(this);
      }

      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }

      function invalidAt() {
        return getParsingFlags(this).overflow;
      }

      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }

      addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
      });

      addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
      });

      function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
      }

      addWeekYearFormatToken('gggg', 'weekYear');
      addWeekYearFormatToken('ggggg', 'weekYear');
      addWeekYearFormatToken('GGGG', 'isoWeekYear');
      addWeekYearFormatToken('GGGGG', 'isoWeekYear');

      addUnitAlias('weekYear', 'gg');
      addUnitAlias('isoWeekYear', 'GG');

      addUnitPriority('weekYear', 1);
      addUnitPriority('isoWeekYear', 1);

      addRegexToken('G', matchSigned);
      addRegexToken('g', matchSigned);
      addRegexToken('GG', match1to2, match2);
      addRegexToken('gg', match1to2, match2);
      addRegexToken('GGGG', match1to4, match4);
      addRegexToken('gggg', match1to4, match4);
      addRegexToken('GGGGG', match1to6, match6);
      addRegexToken('ggggg', match1to6, match6);

      addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
      });

      addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
      });

      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
      }

      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
      }

      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }

      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }

      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
          return weekOfYear(this, dow, doy).year;
        } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
            week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
      }

      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }

      addFormatToken('Q', 0, 'Qo', 'quarter');

      addUnitAlias('quarter', 'Q');

      addUnitPriority('quarter', 7);

      addRegexToken('Q', match1);
      addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
      });

      function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }

      addFormatToken('D', ['DD', 2], 'Do', 'date');

      addUnitAlias('date', 'D');

      addUnitPriority('date', 9);

      addRegexToken('D', match1to2);
      addRegexToken('DD', match1to2, match2);
      addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
      });

      addParseToken(['D', 'DD'], DATE);
      addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
      });

      var getSetDayOfMonth = makeGetSet('Date', true);

      addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

      addUnitAlias('dayOfYear', 'DDD');

      addUnitPriority('dayOfYear', 4);

      addRegexToken('DDD', match1to3);
      addRegexToken('DDDD', match3);
      addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
      });

      function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
      }

      addFormatToken('m', ['mm', 2], 0, 'minute');

      addUnitAlias('minute', 'm');

      addUnitPriority('minute', 14);

      addRegexToken('m', match1to2);
      addRegexToken('mm', match1to2, match2);
      addParseToken(['m', 'mm'], MINUTE);

      var getSetMinute = makeGetSet('Minutes', false);

      addFormatToken('s', ['ss', 2], 0, 'second');

      addUnitAlias('second', 's');

      addUnitPriority('second', 15);

      addRegexToken('s', match1to2);
      addRegexToken('ss', match1to2, match2);
      addParseToken(['s', 'ss'], SECOND);

      var getSetSecond = makeGetSet('Seconds', false);

      addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
      });

      addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
      });

      addFormatToken(0, ['SSS', 3], 0, 'millisecond');
      addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
      });
      addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
      });
      addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
      });
      addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
      });
      addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
      });
      addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
      });

      addUnitAlias('millisecond', 'ms');

      addUnitPriority('millisecond', 16);

      addRegexToken('S', match1to3, match1);
      addRegexToken('SS', match1to3, match2);
      addRegexToken('SSS', match1to3, match3);

      var token;
      for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
      }

      function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
      }

      for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
      }


      var getSetMillisecond = makeGetSet('Milliseconds', false);

      addFormatToken('z', 0, 0, 'zoneAbbr');
      addFormatToken('zz', 0, 0, 'zoneName');

      function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
      }

      function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
      }

      var proto = Moment.prototype;

      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;

      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;

      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;

      proto.quarter = proto.quarters = getSetQuarter;

      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;

      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.isoWeeksInYear = getISOWeeksInYear;

      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;

      proto.hour = proto.hours = getSetHour;

      proto.minute = proto.minutes = getSetMinute;

      proto.second = proto.seconds = getSetSecond;

      proto.millisecond = proto.milliseconds = getSetMillisecond;

      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;

      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;

      proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
      proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
      proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
      proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
      proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

      function createUnix(input) {
        return createLocal(input * 1000);
      }

      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }

      function preParsePostFormat(string) {
        return string;
      }

      var proto$1 = Locale.prototype;

      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;

      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;

      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;

      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;

      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;

      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;

      function get$1(format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
      }

      function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
          index = format;
          format = undefined;
        }

        format = format || '';

        if (index != null) {
          return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
          out[i] = get$1(format, i, field, 'month');
        }
        return out;
      }

      function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
          if (isNumber(format)) {
            index = format;
            format = undefined;
          }

          format = format || '';
        } else {
          format = localeSorted;
          index = format;
          localeSorted = false;

          if (isNumber(format)) {
            index = format;
            format = undefined;
          }

          format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
          return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
          out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
      }

      function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
      }

      function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
      }

      function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
      }

      function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
      }

      function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
      }

      getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function ordinal(number) {
          var b = number % 10,
              output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
          return number + output;
        }
      });

      hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
      hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

      var mathAbs = Math.abs;

      function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
      }

      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
      }

      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }

      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }

      function absCeil(number) {
        if (number < 0) {
          return Math.floor(number);
        } else {
          return Math.ceil(number);
        }
      }

      function bubble() {
        var milliseconds = this._milliseconds;
        var days = this._days;
        var months = this._months;
        var data = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
          milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
          days = 0;
          months = 0;
        }

        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
      }

      function daysToMonths(days) {
        return days * 4800 / 146097;
      }

      function monthsToDays(months) {
        return months * 146097 / 4800;
      }

      function as(units) {
        if (!this.isValid()) {
          return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
          days = this._days + milliseconds / 864e5;
          months = this._months + daysToMonths(days);
          return units === 'month' ? months : months / 12;
        } else {
          days = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
            case 'week':
              return days / 7 + milliseconds / 6048e5;
            case 'day':
              return days + milliseconds / 864e5;
            case 'hour':
              return days * 24 + milliseconds / 36e5;
            case 'minute':
              return days * 1440 + milliseconds / 6e4;
            case 'second':
              return days * 86400 + milliseconds / 1000;

            case 'millisecond':
              return Math.floor(days * 864e5) + milliseconds;
            default:
              throw new Error('Unknown unit ' + units);
          }
        }
      }

      function valueOf$1() {
        if (!this.isValid()) {
          return NaN;
        }
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
      }

      function makeAs(alias) {
        return function () {
          return this.as(alias);
        };
      }

      var asMilliseconds = makeAs('ms');
      var asSeconds = makeAs('s');
      var asMinutes = makeAs('m');
      var asHours = makeAs('h');
      var asDays = makeAs('d');
      var asWeeks = makeAs('w');
      var asMonths = makeAs('M');
      var asYears = makeAs('y');

      function clone$1() {
        return createDuration(this);
      }

      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
      }

      function makeGetter(name) {
        return function () {
          return this.isValid() ? this._data[name] : NaN;
        };
      }

      var milliseconds = makeGetter('milliseconds');
      var seconds = makeGetter('seconds');
      var minutes = makeGetter('minutes');
      var hours = makeGetter('hours');
      var days = makeGetter('days');
      var months = makeGetter('months');
      var years = makeGetter('years');

      function weeks() {
        return absFloor(this.days() / 7);
      }

      var round = Math.round;
      var thresholds = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11 };

      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }

      function relativeTime$1(posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds = round(duration.as('s'));
        var minutes = round(duration.as('m'));
        var hours = round(duration.as('h'));
        var days = round(duration.as('d'));
        var months = round(duration.as('M'));
        var years = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
      }

      function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
          return round;
        }
        if (typeof roundingFunction === 'function') {
          round = roundingFunction;
          return true;
        }
        return false;
      }

      function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
          return false;
        }
        if (limit === undefined) {
          return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
          thresholds.ss = limit - 1;
        }
        return true;
      }

      function humanize(withSuffix) {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
          output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
      }

      var abs$1 = Math.abs;

      function sign(x) {
        return (x > 0) - (x < 0) || +x;
      }

      function toISOString$1() {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days = abs$1(this._days);
        var months = abs$1(this._months);
        var minutes, hours, years;

        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        years = absFloor(months / 12);
        months %= 12;

        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
          return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' + (Y ? ymSign + Y + 'Y' : '') + (M ? ymSign + M + 'M' : '') + (D ? daysSign + D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? hmsSign + h + 'H' : '') + (m ? hmsSign + m + 'M' : '') + (s ? hmsSign + s + 'S' : '');
      }

      var proto$2 = Duration.prototype;

      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;

      proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
      proto$2.lang = lang;

      addFormatToken('X', 0, 0, 'unix');
      addFormatToken('x', 0, 0, 'valueOf');

      addRegexToken('x', matchSigned);
      addRegexToken('X', matchTimestamp);
      addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
      });
      addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
      });

      hooks.version = '2.19.3';

      setHookCallback(createLocal);

      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;

      return hooks;
    });
  }, {}], 424: [function (require, module, exports) {
    var process = module.exports = {};

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }

      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }

      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };

    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = '';
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
      return [];
    };

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
      return '/';
    };
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
      return 0;
    };
  }, {}], 425: [function (require, module, exports) {
    module.exports = require('./lib/index');
  }, { "./lib/index": 426 }], 426: [function (require, module, exports) {
    (function (global) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _ponyfill = require('./ponyfill.js');

      var _ponyfill2 = _interopRequireDefault(_ponyfill);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      var root;

      if (typeof self !== 'undefined') {
        root = self;
      } else if (typeof window !== 'undefined') {
        root = window;
      } else if (typeof global !== 'undefined') {
        root = global;
      } else if (typeof module !== 'undefined') {
        root = module;
      } else {
        root = Function('return this')();
      }

      var result = (0, _ponyfill2['default'])(root);
      exports['default'] = result;
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, { "./ponyfill.js": 427 }], 427: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports['default'] = symbolObservablePonyfill;
    function symbolObservablePonyfill(root) {
      var result;
      var _Symbol = root.Symbol;

      if (typeof _Symbol === 'function') {
        if (_Symbol.observable) {
          result = _Symbol.observable;
        } else {
          result = _Symbol('observable');
          _Symbol.observable = result;
        }
      } else {
        result = '@@observable';
      }

      return result;
    };
  }, {}], 428: [function (require, module, exports) {
    (function (process) {

      'use strict';

      var warning = function warning() {};

      if (process.env.NODE_ENV !== 'production') {
        warning = function warning(condition, format, args) {
          var len = arguments.length;
          args = new Array(len > 2 ? len - 2 : 0);
          for (var key = 2; key < len; key++) {
            args[key - 2] = arguments[key];
          }
          if (format === undefined) {
            throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (format.length < 10 || /^[s\W]*$/.test(format)) {
            throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
          }

          if (!condition) {
            var argIndex = 0;
            var message = 'Warning: ' + format.replace(/%s/g, function () {
              return args[argIndex++];
            });
            if (typeof console !== 'undefined') {
              console.error(message);
            }
            try {
              throw new Error(message);
            } catch (x) {}
          }
        };
      }

      module.exports = warning;
    }).call(this, require('_process'));
  }, { "_process": 424 }], 429: [function (require, module, exports) {
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
  }, {}], 430: [function (require, module, exports) {
    module.exports.addStyleElement = function (css) {
      var style;
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      return document.head.appendChild(style);
    };
  }, {}], 431: [function (require, module, exports) {
    module.exports.normalizeCarriageReturns = function (source) {
      return source.replace(/\r\n/g, '\n');
    };
  }, {}], 432: [function (require, module, exports) {
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
  }, {}], 433: [function (require, module, exports) {
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
  }, {}], 434: [function (require, module, exports) {
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
  }, {}], 435: [function (require, module, exports) {
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
