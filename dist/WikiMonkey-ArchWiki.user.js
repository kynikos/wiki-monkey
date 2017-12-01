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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
		var WM;

		WM = require('./modules/_Init').WM;

		new WM(require("../build/configurations/ArchWiki-bot"), ['ArchWikiFixHeader', require("./plugins/ArchWikiFixHeader").ArchWikiFixHeader], ['ArchWikiFixHeadings', require("./plugins/ArchWikiFixHeadings").ArchWikiFixHeadings], ['ArchWikiFixLinks', require("./plugins/ArchWikiFixLinks").ArchWikiFixLinks], ['ArchWikiNewTemplates', require("./plugins/ArchWikiNewTemplates").ArchWikiNewTemplates], ['ArchWikiNPFilter', require("./plugins/ArchWikiNPFilter").ArchWikiNPFilter], ['ArchWikiOldAURLinks', require("./plugins/ArchWikiOldAURLinks").ArchWikiOldAURLinks], ['ArchWikiQuickReport', require("./plugins/ArchWikiQuickReport").ArchWikiQuickReport], ['ArchWikiSortContacts', require("./plugins/ArchWikiSortContacts").ArchWikiSortContacts], ['ArchWikiSummaryToRelated', require("./plugins/ArchWikiSummaryToRelated").ArchWikiSummaryToRelated], ['ArchWikiRCFilter', require("./plugins/ArchWikiRCFilter").ArchWikiRCFilter], ['ArchWikiUpdatePackageTemplates', require("./plugins/ArchWikiUpdatePackageTemplates").ArchWikiUpdatePackageTemplates], ['ExpandContractions', require("./plugins/ExpandContractions").ExpandContractions], ['FixBacklinkFragments', require("./plugins/FixBacklinkFragments").FixBacklinkFragments], ['FixDoubleRedirects', require("./plugins/FixDoubleRedirects").FixDoubleRedirects], ['FixFragments', require("./plugins/FixFragments").FixFragments], ['FixLinkFragments', require("./plugins/FixLinkFragments").FixLinkFragments], ['MultipleLineBreaks', require("./plugins/MultipleLineBreaks").MultipleLineBreaks], ['SimpleReplace', require("./plugins/SimpleReplace").SimpleReplace], ['SynchronizeInterlanguageLinks', require("./plugins/SynchronizeInterlanguageLinks").SynchronizeInterlanguageLinks], ['UpdateCategoryTree', require("./plugins/UpdateCategoryTree").UpdateCategoryTree]);
	}, { "../build/configurations/ArchWiki-bot": 2, "./modules/_Init": 20, "./plugins/ArchWikiFixHeader": 21, "./plugins/ArchWikiFixHeadings": 22, "./plugins/ArchWikiFixLinks": 23, "./plugins/ArchWikiNPFilter": 24, "./plugins/ArchWikiNewTemplates": 25, "./plugins/ArchWikiOldAURLinks": 26, "./plugins/ArchWikiQuickReport": 27, "./plugins/ArchWikiRCFilter": 28, "./plugins/ArchWikiSortContacts": 29, "./plugins/ArchWikiSummaryToRelated": 30, "./plugins/ArchWikiUpdatePackageTemplates": 31, "./plugins/ExpandContractions": 32, "./plugins/FixBacklinkFragments": 33, "./plugins/FixDoubleRedirects": 34, "./plugins/FixFragments": 35, "./plugins/FixLinkFragments": 36, "./plugins/MultipleLineBreaks": 37, "./plugins/SimpleReplace": 38, "./plugins/SynchronizeInterlanguageLinks": 39, "./plugins/UpdateCategoryTree": 40 }], 2: [function (require, module, exports) {
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
					"030IL": ["SynchronizeInterlanguageLinks", ["Synchronize interlanguage links"], ["ArchWiki", "ArchWiki", "ArchWiki", "synchronized interlanguage links with the other wikis"]],
					"040APT": ["ArchWikiUpdatePackageTemplates", ["Check packages linked with Pkg/AUR templates and possibly update them"], "update Pkg/AUR templates to reflect new package status"],
					"050AAL": ["ArchWikiOldAURLinks", ["Replace old-style direct AUR package links with Template:AUR"], "replace old-style direct package links with Pkg/AUR templates"]
				},
				"Diff": {
					"010AQR": ["ArchWikiQuickReport", ["Quick report"], ["ArchWiki:Reports", "add report for %t"]]
				},
				"Editor": {
					"010AHE": ["ArchWikiFixHeader", ["Text plugins", "Fix header"], null],
					"020ASE": ["ArchWikiFixHeadings", ["Text plugins", "Fix headings"], null],
					"030AEL": ["ArchWikiFixLinks", ["Text plugins", "Fix external links"], null],
					"040SL": ["FixFragments", ["Text plugins", "Fix section links"], null],
					"050ACT": ["ArchWikiNewTemplates", ["Text plugins", "Use code templates"], null],
					"060EC": ["ExpandContractions", ["Text plugins", "Expand contractions"], null],
					"070ML": ["MultipleLineBreaks", ["Text plugins", "Squash multiple line breaks"], null],
					"080ASR": ["ArchWikiSummaryToRelated", ["Text plugins", "Convert summary to related"], null],
					"110SR": ["SimpleReplace", ["RegExp substitution"], null],
					"210ES": ["FixLinkFragments", ["Query plugins", "Fix external section links"], null],
					"220AIL": ["SynchronizeInterlanguageLinks", ["Query plugins", "Sync interlanguage links"], ["ArchWiki", "ArchWiki", "ArchWiki", null]],
					"230AAL": ["ArchWikiOldAURLinks", ["Query plugins", "Fix old AUR links"], null],
					"240APT": ["ArchWikiUpdatePackageTemplates", ["Query plugins", "Update package templates"], null]
				},
				"NewPages": {
					"010ANP": ["ArchWikiNPFilter", ["Default filter"], {
						"language": "English"
					}]
				},
				"RecentChanges": {
					"010ARC": ["ArchWikiRCFilter", ["Default filter"], {
						"language": "English"
					}]
				},
				"Special": {
					"010CTar": ["UpdateCategoryTree", ["Update category trees", "Arabic"], [["ArchWiki", "ar"], "automatic update", false]],
					"010CTbg": ["UpdateCategoryTree", ["Update category trees", "Bulgarian"], [["ArchWiki", "bg"], "automatic update", false]],
					"010CTcs": ["UpdateCategoryTree", ["Update category trees", "Czech"], [["ArchWiki", "cs"], "automatic update", false]],
					"010CTda": ["UpdateCategoryTree", ["Update category trees", "Danish"], [["ArchWiki", "da"], "automatic update", false]],
					"010CTel": ["UpdateCategoryTree", ["Update category trees", "Greek"], [["ArchWiki", "el"], "automatic update", false]],
					"010CTen": ["UpdateCategoryTree", ["Update category trees", "English"], [["ArchWiki", "en"], "automatic update", false]],
					"010CTes": ["UpdateCategoryTree", ["Update category trees", "Spanish"], [["ArchWiki", "es"], "automatic update", false]],
					"010CThe": ["UpdateCategoryTree", ["Update category trees", "Hebrew"], [["ArchWiki", "he"], "automatic update", false]],
					"010CThr": ["UpdateCategoryTree", ["Update category trees", "Croatian"], [["ArchWiki", "hr"], "automatic update", false]],
					"010CThu": ["UpdateCategoryTree", ["Update category trees", "Hungarian"], [["ArchWiki", "hu"], "automatic update", false]],
					"010CTid": ["UpdateCategoryTree", ["Update category trees", "Indonesian"], [["ArchWiki", "id"], "automatic update", false]],
					"010CTit": ["UpdateCategoryTree", ["Update category trees", "Italian"], [["ArchWiki", "it"], "automatic update", false]],
					"010CTko": ["UpdateCategoryTree", ["Update category trees", "Korean"], [["ArchWiki", "ko"], "automatic update", false]],
					"010CTlt": ["UpdateCategoryTree", ["Update category trees", "Lithuanian"], [["ArchWiki", "lt"], "automatic update", false]],
					"010CTnl": ["UpdateCategoryTree", ["Update category trees", "Dutch"], [["ArchWiki", "nl"], "automatic update", false]],
					"010CTpl": ["UpdateCategoryTree", ["Update category trees", "Polish"], [["ArchWiki", "pl"], "automatic update", false]],
					"010CTpt": ["UpdateCategoryTree", ["Update category trees", "Portuguese"], [["ArchWiki", "pt"], "automatic update", false]],
					"010CTru": ["UpdateCategoryTree", ["Update category trees", "Russian"], [["ArchWiki", "ru"], "automatic update", false]],
					"010CTsk": ["UpdateCategoryTree", ["Update category trees", "Slovak"], [["ArchWiki", "sk"], "automatic update", false]],
					"010CTsr": ["UpdateCategoryTree", ["Update category trees", "Serbian"], [["ArchWiki", "sr"], "automatic update", false]],
					"010CTth": ["UpdateCategoryTree", ["Update category trees", "Thai"], [["ArchWiki", "th"], "automatic update", false]],
					"010CTtr": ["UpdateCategoryTree", ["Update category trees", "Turkish"], [["ArchWiki", "tr"], "automatic update", false]],
					"010CTuk": ["UpdateCategoryTree", ["Update category trees", "Ukrainian"], [["ArchWiki", "uk"], "automatic update", false]],
					"010CTzhhans": ["UpdateCategoryTree", ["Update category trees", "Chinese (Simplified)"], [["ArchWiki", "zh-hans"], "automatic update", false]],
					"010CTzhhant": ["UpdateCategoryTree", ["Update category trees", "Chinese (Traditional)"], [["ArchWiki", "zh-hant"], "automatic update", false]],
					"020DR": ["FixDoubleRedirects", ["Fix double redirects"], "fix double redirect"],
					"040ASCC": ["ArchWikiSortContacts", null, null]
				}
			}
		};
	}, {}], 3: [function (require, module, exports) {
		var $, Obj, RegEx;

		$ = require('jquery');

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
	}, { "../../lib.js.generic/dist/Obj": 47, "../../lib.js.generic/dist/RegEx": 48, "jquery": 41 }], 4: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/CSS": 43 }], 6: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/Async": 42, "../../lib.js.generic/dist/Obj": 47 }], 7: [function (require, module, exports) {
		var $, CSS, DOM;

		$ = require('jquery');

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
	}, { "../../lib.js.generic/dist/CSS": 43, "../../lib.js.generic/dist/DOM": 45, "jquery": 41 }], 8: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/HTTP": 46 }], 9: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/Compatibility": 44, "../../lib.js.generic/dist/HTTP": 46 }], 10: [function (require, module, exports) {
		var $, CSS;

		$ = require('jquery');

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
	}, { "../../lib.js.generic/dist/CSS": 43, "jquery": 41 }], 11: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/Obj": 47 }], 12: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/CSS": 43, "../../lib.js.generic/dist/Str": 49 }], 13: [function (require, module, exports) {
		var $, HTTP, Obj;

		$ = require('jquery');

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
	}, { "../../lib.js.generic/dist/HTTP": 46, "../../lib.js.generic/dist/Obj": 47, "jquery": 41 }], 14: [function (require, module, exports) {
		var $, Async, CSS;

		$ = require('jquery');

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
	}, { "../../lib.js.generic/dist/Async": 42, "../../lib.js.generic/dist/CSS": 43, "jquery": 41 }], 15: [function (require, module, exports) {
		var $, CSS;

		$ = require('jquery');

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
	}, { "../../lib.js.generic/dist/CSS": 43, "jquery": 41 }], 16: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/RegEx": 48, "../../lib.js.generic/dist/Str": 49 }], 17: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/Str": 49 }], 18: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/CSS": 43, "../../lib.js.generic/dist/RegEx": 48 }], 19: [function (require, module, exports) {
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

		module.exports.WM = function WM(default_config) {
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

			for (var _len = arguments.length, installed_plugins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				installed_plugins[_key - 1] = arguments[_key];
			}

			for (i = 0, len = installed_plugins.length; i < len; i++) {
				var _installed_plugins$i = _slicedToArray(installed_plugins[i], 2);

				pname = _installed_plugins$i[0];
				Plugin = _installed_plugins$i[1];

				this.Plugins[pname] = new Plugin(this);
			}
			this.Cfg._load(default_config);
			this.UI._makeUI();
		};
	}, { "./ArchPackages": 3, "./ArchWiki": 4, "./Bot": 5, "./Cat": 6, "./Cfg": 7, "./Diff": 8, "./Editor": 9, "./Filters": 10, "./Interlanguage": 11, "./Log": 12, "./MW": 13, "./Menu": 14, "./Mods": 15, "./Parser": 16, "./Tables": 17, "./UI": 18, "./WhatLinksHere": 19 }], 21: [function (require, module, exports) {
		var indexOf = [].indexOf;

		module.exports.ArchWikiFixHeader = function () {
			function ArchWikiFixHeader(WM) {
				_classCallCheck(this, ArchWikiFixHeader);

				this.WM = WM;
			}

			_createClass(ArchWikiFixHeader, [{
				key: "main",
				value: function main(args, callNext) {
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
		}();
	}, {}], 22: [function (require, module, exports) {
		module.exports.ArchWikiFixHeadings = function () {
			function ArchWikiFixHeadings(WM) {
				_classCallCheck(this, ArchWikiFixHeadings);

				this.WM = WM;
			}

			_createClass(ArchWikiFixHeadings, [{
				key: "main",
				value: function main(args, callNext) {
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
		}();
	}, {}], 23: [function (require, module, exports) {
		module.exports.ArchWikiFixLinks = function () {
			function ArchWikiFixLinks(WM) {
				_classCallCheck(this, ArchWikiFixLinks);

				this.WM = WM;
			}

			_createClass(ArchWikiFixLinks, [{
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
				key: "main",
				value: function main(args, callNext) {
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
		}();
	}, {}], 24: [function (require, module, exports) {
		var $, CSS;

		$ = require('jquery');

		CSS = require('../../lib.js.generic/dist/CSS');

		module.exports.ArchWikiNPFilter = function () {
			function ArchWikiNPFilter(WM) {
				_classCallCheck(this, ArchWikiNPFilter);

				this.WM = WM;
			}

			_createClass(ArchWikiNPFilter, [{
				key: "main",
				value: function main(params) {
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

						if (language !== params.language) {
							this.WM.Plugins.ArchWikiNPFilter.moveArticle(contentDiv, li, language);
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
		}();
	}, { "../../lib.js.generic/dist/CSS": 43, "jquery": 41 }], 25: [function (require, module, exports) {
		module.exports.ArchWikiNewTemplates = function () {
			function ArchWikiNewTemplates(WM) {
				_classCallCheck(this, ArchWikiNewTemplates);

				this.WM = WM;
			}

			_createClass(ArchWikiNewTemplates, [{
				key: "main",
				value: function main(args, callNext) {
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
		}();
	}, {}], 26: [function (require, module, exports) {
		var RegEx;

		RegEx = require('../../lib.js.generic/dist/RegEx');

		module.exports.ArchWikiOldAURLinks = function () {
			function ArchWikiOldAURLinks(WM) {
				_classCallCheck(this, ArchWikiOldAURLinks);

				this.doReplace = this.doReplace.bind(this);
				this.doReplaceContinue = this.doReplaceContinue.bind(this);
				this.checkIfOfficial = this.checkIfOfficial.bind(this);
				this.doReplaceContinue2 = this.doReplaceContinue2.bind(this);
				this.mainEnd = this.mainEnd.bind(this);
				this.mainAutoReplace = this.mainAutoReplace.bind(this);
				this.mainAutoWrite = this.mainAutoWrite.bind(this);
				this.mainAutoEnd = this.mainAutoEnd.bind(this);
				this.WM = WM;
			}

			_createClass(ArchWikiOldAURLinks, [{
				key: "doReplace",
				value: function doReplace(source, call, callArgs) {
					var links, newText, regExp;
					regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=([0-9]+)) ([^\]]+?)\]/g;
					links = RegEx.matchAll(source, regExp);
					newText = source;
					if (links.length > 0) {
						return this.WM.ArchPackages.getAURInfo(links[0].match[2], this.doReplaceContinue, [source, newText, links, 0, call, callArgs]);
					} else {
						return call(source, newText, callArgs);
					}
				}
			}, {
				key: "doReplaceContinue",
				value: function doReplaceContinue(res, args) {
					var call, callArgs, index, link, links, newText, newlink, pkgname, source;
					source = args[0];
					newText = args[1];
					links = args[2];
					index = args[3];
					call = args[4];
					callArgs = args[5];
					link = links[index];
					this.WM.Log.logInfo("Processing " + this.WM.Log.linkToPage(link.match[1], link.match[0]) + " ...");
					if (res.type === "error") {
						this.WM.Log.logError("The AUR's RPC interface returned an error: " + res.results);
						return call(-1, -1, callArgs);
					} else {
						if (res.resultcount > 0) {
							pkgname = res.results.Name;
							if (link.match[3] === pkgname) {
								newlink = "{{AUR|" + pkgname + "}}";
								newText = newText.replace(link.match[0], newlink);
								this.WM.Log.logInfo("Checked and replaced link with " + newlink);
								return this.doReplaceContinue2(source, newText, links, index, call, callArgs);
							} else {
								this.WM.Log.logWarning("Couldn't replace: the link doesn't use the package name (" + pkgname + ") as the anchor text");
								return this.doReplaceContinue2(source, newText, links, index, call, callArgs);
							}
						} else {
							return this.WM.ArchPackages.isOfficialPackage(link.match[3], this.checkIfOfficial, [link, source, newText, links, index, call, callArgs]);
						}
					}
				}
			}, {
				key: "checkIfOfficial",
				value: function checkIfOfficial(res, args) {
					var call, callArgs, index, link, links, newText, newlink, source;
					link = args[0];
					source = args[1];
					newText = args[2];
					links = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					if (res) {
						newlink = "{{Pkg|" + link.match[3] + "}}";
						newText = newText.replace(link.match[0], newlink);
						this.WM.Log.logInfo("Replaced link with " + newlink);
						this.WM.Log.logWarning("The package doesn't exist anymore in the AUR, but a package with the same name as the link anchor has been found in the official repositories");
					} else {
						this.WM.Log.logWarning("Couldn't replace: the package doesn't exist anymore in the AUR and there's no package in the official repositories that has the same name as the link anchor");
					}
					return this.doReplaceContinue2(source, newText, links, index, call, callArgs);
				}
			}, {
				key: "doReplaceContinue2",
				value: function doReplaceContinue2(source, newText, links, index, call, callArgs) {
					index++;
					if (links[index]) {
						return this.WM.ArchPackages.getAURInfo(links[index].match[2], this.doReplaceContinue, [source, newText, links, index, call, callArgs]);
					} else {
						return call(source, newText, callArgs);
					}
				}
			}, {
				key: "main",
				value: function main(args, callNext) {
					var source;
					source = this.WM.Editor.readSource();
					this.WM.Log.logInfo("Replacing old-style direct AUR package links ...");
					return this.doReplace(source, this.mainEnd, callNext);
				}
			}, {
				key: "mainEnd",
				value: function mainEnd(source, newtext, callNext) {
					if (source === -1) {
						callNext = false;
					} else if (newtext !== source) {
						this.WM.Editor.writeSource(newtext);
						this.WM.Log.logInfo("Replaced old-style direct AUR package links");
					} else {
						this.WM.Log.logInfo("No automatically replaceable old-style AUR " + "package links found");
					}
					if (callNext) {
						return callNext();
					}
				}
			}, {
				key: "mainAuto",
				value: function mainAuto(args, title, callBot, chainArgs) {
					var summary;
					summary = args;
					return this.WM.MW.callQueryEdit(title, this.mainAutoReplace, [summary, callBot]);
				}
			}, {
				key: "mainAutoReplace",
				value: function mainAutoReplace(title, source, timestamp, edittoken, args) {
					var callBot, summary;
					summary = args[0];
					callBot = args[1];
					return this.doReplace(source, this.mainAutoWrite, [title, edittoken, timestamp, summary, callBot]);
				}
			}, {
				key: "mainAutoWrite",
				value: function mainAutoWrite(source, newtext, args) {
					var callBot, edittoken, summary, timestamp, title;
					title = args[0];
					edittoken = args[1];
					timestamp = args[2];
					summary = args[3];
					callBot = args[4];
					if (source === -1) {
						return callBot(false, null);
					} else if (newtext !== source) {
						return this.WM.MW.callAPIPost({
							action: "edit",
							bot: "1",
							title: title,
							summary: summary,
							text: newtext,
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

			return ArchWikiOldAURLinks;
		}();
	}, { "../../lib.js.generic/dist/RegEx": 48 }], 27: [function (require, module, exports) {
		var CSS, HTTP;

		CSS = require('../../lib.js.generic/dist/CSS');

		HTTP = require('../../lib.js.generic/dist/HTTP');

		module.exports.ArchWikiQuickReport = function () {
			function ArchWikiQuickReport(WM) {
				_classCallCheck(this, ArchWikiQuickReport);

				this.mainGetEndTimestamp = this.mainGetEndTimestamp.bind(this);
				this.mainWrite = this.mainWrite.bind(this);
				this.mainEnd = this.mainEnd.bind(this);
				this.WM = WM;
			}

			_createClass(ArchWikiQuickReport, [{
				key: "makeUI",
				value: function makeUI(args) {
					var article, i, input, len, link, option, select, span, types, value;
					CSS.addStyleElement("#WikiMonkey-ArchWikiQuickReport > select, #WikiMonkey-ArchWikiQuickReport > input, #WikiMonkey-ArchWikiQuickReport > a {margin-left:0.33em;}");
					article = args[0];
					select = document.createElement('select');
					types = ["&lt;TYPE&gt;", "content", "style"];
					for (i = 0, len = types.length; i < len; i++) {
						value = types[i];
						option = document.createElement('option');
						option.setAttribute('value', value);
						option.innerHTML = value;
						select.appendChild(option);
					}
					select.id = "WikiMonkey-ArchWikiQuickReport-select";
					input = document.createElement('input');
					input.setAttribute('type', 'text');
					input.id = "WikiMonkey-ArchWikiQuickReport-input";
					link = document.createElement('a');
					link.href = "/index.php/" + article;
					link.innerHTML = article;
					span = document.createElement('span');
					span.id = "WikiMonkey-ArchWikiQuickReport";
					span.appendChild(select);
					span.appendChild(input);
					span.appendChild(link);
					return span;
				}
			}, {
				key: "main",
				value: function main(args, callNext) {
					var article, select, summary, type;
					article = args[0];
					summary = args[1];
					this.WM.Log.logInfo('Appending diff to ' + this.WM.Log.linkToWikiPage(article, article) + " ...");
					select = document.getElementById("WikiMonkey-ArchWikiQuickReport-select");
					type = select.options[select.selectedIndex].value;
					if (type !== 'content' && type !== 'style') {
						return this.WM.Log.logError('Select a valid report type');
					} else {
						return this.WM.Diff.getEndTimestamp(this.mainGetEndTimestamp, [article, type, summary, callNext]);
					}
				}
			}, {
				key: "mainGetEndTimestamp",
				value: function mainGetEndTimestamp(enddate, args) {
					var article, callNext, summary, type;
					article = args[0];
					type = args[1];
					summary = args[2];
					callNext = args[3];
					return this.WM.MW.callQueryEdit(article, this.mainWrite, [type, summary, enddate, callNext]);
				}
			}, {
				key: "mainWrite",
				value: function mainWrite(article, source, timestamp, edittoken, args) {
					var callNext, enddate, expsummary, newtext, notes, pEnddate, summary, title, type;
					type = args[0];
					summary = args[1];
					enddate = args[2];
					callNext = args[3];
					title = HTTP.getURIParameter(null, 'title');
					pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8);
					notes = document.getElementById("WikiMonkey-ArchWikiQuickReport-input").value;
					newtext = this.WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", pEnddate, type, notes]);

					expsummary = summary.replace(/(^|[^%])(%%)*%t/g, '$1$2[[' + title + ']]');
					expsummary = expsummary.replace(/%(.)/g, '$1');
					return this.WM.MW.callAPIPost({
						action: "edit",
						bot: "1",
						title: article,
						summary: expsummary,
						text: newtext,
						basetimestamp: timestamp,
						token: edittoken
					}, this.mainEnd, [article, callNext], null);
				}
			}, {
				key: "mainEnd",
				value: function mainEnd(res, args) {
					var article, callNext;
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

			return ArchWikiQuickReport;
		}();
	}, { "../../lib.js.generic/dist/CSS": 43, "../../lib.js.generic/dist/HTTP": 46 }], 28: [function (require, module, exports) {
		var $, CSS;

		$ = require('jquery');

		CSS = require('../../lib.js.generic/dist/CSS');

		module.exports.ArchWikiRCFilter = function () {
			function ArchWikiRCFilter(WM) {
				_classCallCheck(this, ArchWikiRCFilter);

				this.WM = WM;
			}

			_createClass(ArchWikiRCFilter, [{
				key: "main",
				value: function main(params) {
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

									if (language !== params.language) {
										this.WM.Plugins.ArchWikiRCFilter.moveArticle(groupDiv, articleTable, language);
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
		}();
	}, { "../../lib.js.generic/dist/CSS": 43, "jquery": 41 }], 29: [function (require, module, exports) {
		module.exports.ArchWikiSortContacts = function () {
			var endMark, regExp, startMark;

			var ArchWikiSortContacts = function () {
				function ArchWikiSortContacts(WM) {
					_classCallCheck(this, ArchWikiSortContacts);

					this.parseList = this.parseList.bind(this);
					this.iterateUsers = this.iterateUsers.bind(this);
					this.storeUserContribs = this.storeUserContribs.bind(this);
					this.updateList = this.updateList.bind(this);
					this.writePage = this.writePage.bind(this);
					this.WM = WM;
				}

				_createClass(ArchWikiSortContacts, [{
					key: "main",
					value: function main(args, callNext) {
						var inactiveIntro, inactiveLimit, page, recentDays, summary;
						page = args[0];
						recentDays = args[1];
						inactiveLimit = args[2];
						inactiveIntro = args[3];
						summary = args[4];
						this.WM.Log.logInfo("Sorting " + this.WM.Log.linkToWikiPage(page, page) + " ...");
						return this.WM.MW.callQueryEdit(page, this.parseList, [recentDays, inactiveLimit, inactiveIntro, summary, callNext]);
					}
				}, {
					key: "parseList",
					value: function parseList(title, source, timestamp, edittoken, args) {
						var callNext, date, endList, inactiveIntro, inactiveLimit, recentDays, startList, summary, ucend, ucstart, users, usersArray;
						recentDays = args[0];
						inactiveLimit = args[1];
						inactiveIntro = args[2];
						summary = args[3];
						callNext = args[4];
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
							return this.iterateUsers(usersArray, -1, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext);
						} else {
							return this.WM.Log.logError("Cannot find the needed marks");
						}
					}
				}, {
					key: "iterateUsers",
					value: function iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext) {
						var match, ucuser, userString;
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
								return this.WM.MW.getUserContribs(ucuser, ucstart, ucend, this.storeUserContribs, [usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext]);
							} else if (userString !== "" && userString.indexOf(inactiveIntro) !== 0) {
								return this.WM.Log.logError("An entry in the list may not be correctly " + "formatted");
							} else {
								return this.iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext);
							}
						} else {
							return this.updateList(users, title, source, startList, endList, timestamp, edittoken, inactiveIntro, summary, callNext);
						}
					}
				}, {
					key: "storeUserContribs",
					value: function storeUserContribs(results, args) {
						var callNext, edits, edittoken, endList, inactiveIntro, inactiveLimit, index, source, startList, summary, timestamp, title, ucend, ucstart, users, usersArray;
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
						return this.iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext);
					}
				}, {
					key: "updateList",
					value: function updateList(users, title, source, startList, endList, timestamp, edittoken, inactiveIntro, summary, callNext) {
						var i, j, len, len1, newList, newText, ref, ref1, sorter, user;
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
						ref = users.active;
						for (i = 0, len = ref.length; i < len; i++) {
							user = ref[i];
							newList += user.text + "\n";
						}
						if (users.inactive.length > 0) {
							newList += "\n" + inactiveIntro + "\n\n";
							ref1 = users.inactive;
							for (j = 0, len1 = ref1.length; j < len1; j++) {
								user = ref1[j];
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
							}, this.writePage, [title, callNext], null);
						} else {
							this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(title, title) + " was already up to date");
							if (callNext) {
								return callNext();
							}
						}
					}
				}, {
					key: "writePage",
					value: function writePage(res, args) {
						var callNext, title;
						title = args[0];
						callNext = args[1];
						if (res.edit && res.edit.result === 'Success') {
							this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(title, title) + " was correctly updated");
							if (callNext) {
								return callNext();
							}
						} else {
							return this.WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
						}
					}
				}]);

				return ArchWikiSortContacts;
			}();

			;

			startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->";

			endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";

			regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" + "(?: \\<!-- associated bot: (.+?) -->.*)?$", "");

			return ArchWikiSortContacts;
		}();
	}, {}], 30: [function (require, module, exports) {
		module.exports.ArchWikiSummaryToRelated = function () {
			function ArchWikiSummaryToRelated(WM) {
				_classCallCheck(this, ArchWikiSummaryToRelated);

				this.WM = WM;
			}

			_createClass(ArchWikiSummaryToRelated, [{
				key: "main",
				value: function main(args, callNext) {
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
		}();
	}, {}], 31: [function (require, module, exports) {
		module.exports.ArchWikiUpdatePackageTemplates = function () {
			function ArchWikiUpdatePackageTemplates(WM) {
				_classCallCheck(this, ArchWikiUpdatePackageTemplates);

				this.doUpdate = this.doUpdate.bind(this);
				this.doUpdateContinue = this.doUpdateContinue.bind(this);
				this.doUpdateContinue2 = this.doUpdateContinue2.bind(this);
				this.checkOfficial = this.checkOfficial.bind(this);
				this.checkOfficiallc = this.checkOfficiallc.bind(this);
				this.checkAUR = this.checkAUR.bind(this);
				this.checkAURlc = this.checkAURlc.bind(this);
				this.checkGroup64 = this.checkGroup64.bind(this);
				this.checkGroup64lc = this.checkGroup64lc.bind(this);
				this.checkGroup32 = this.checkGroup32.bind(this);
				this.checkGroup32lc = this.checkGroup32lc.bind(this);
				this.checkOfficial2 = this.checkOfficial2.bind(this);
				this.checkOfficiallc2 = this.checkOfficiallc2.bind(this);
				this.checkAUR2 = this.checkAUR2.bind(this);
				this.checkAURlc2 = this.checkAURlc2.bind(this);
				this.checkGroup64_2 = this.checkGroup64_2.bind(this);
				this.checkGroup64lc2 = this.checkGroup64lc2.bind(this);
				this.checkGroup32_2 = this.checkGroup32_2.bind(this);
				this.checkGroup32lc2 = this.checkGroup32lc2.bind(this);
				this.doUpdateContinue3 = this.doUpdateContinue3.bind(this);
				this.mainEnd = this.mainEnd.bind(this);
				this.mainAutoReplace = this.mainAutoReplace.bind(this);
				this.mainAutoWrite = this.mainAutoWrite.bind(this);
				this.mainAutoEnd = this.mainAutoEnd.bind(this);
				this.WM = WM;
			}

			_createClass(ArchWikiUpdatePackageTemplates, [{
				key: "doUpdate",
				value: function doUpdate(source, call, callArgs) {
					var newText, templates;

					templates = this.WM.Parser.findTemplatesPattern(source, "[Pp]kg|[Aa]ur|AUR|[Gg]rp");
					newText = "";
					if (templates.length > 0) {
						return this.doUpdateContinue(source, newText, templates, 0, call, callArgs);
					} else {
						return call(source, source, callArgs);
					}
				}
			}, {
				key: "doUpdateContinue",
				value: function doUpdateContinue(source, newText, templates, index, call, callArgs) {
					this.WM.Log.logInfo("Processing " + templates[index].rawTransclusion + " ...");
					newText += source.substring(index === 0 ? 0 : templates[index - 1].index + templates[index - 1].length, templates[index].index);
					switch (templates[index].title.toLowerCase()) {
						case 'pkg':
							return this.doUpdateContinue2([this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64, this.checkAURlc, this.checkAUR, this.checkOfficiallc, this.checkOfficial], source, newText, templates, index, call, callArgs);
						case 'aur':
							return this.doUpdateContinue2([this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64, this.checkOfficiallc, this.checkOfficial, this.checkAURlc, this.checkAUR], source, newText, templates, index, call, callArgs);
						case 'grp':
							return this.doUpdateContinue2([this.checkAURlc, this.checkAUR, this.checkOfficiallc, this.checkOfficial, this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64], source, newText, templates, index, call, callArgs);
						default:
							newText += templates[index].rawTransclusion;
							return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "doUpdateContinue2",
				value: function doUpdateContinue2(checks, source, newText, templates, index, call, callArgs) {
					var check, pkg;
					check = checks.pop();
					if (check) {
						return check(checks, source, newText, templates, index, call, callArgs);
					} else {
						pkg = templates[index].arguments[0].value.trim();
						this.WM.Log.logWarning(pkg + " hasn't been found neither in the official " + "repositories nor in the AUR nor as a package group");
						this.WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates", {
							"error": "notfound",
							"page": callArgs[0],
							"pagelanguage": this.WM.ArchWiki.detectLanguage(callArgs[0])[1],
							"package": pkg
						});
						newText += templates[index].rawTransclusion;
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkOfficial",
				value: function checkOfficial(checks, source, newText, templates, index, call, callArgs) {
					var pkgname;
					pkgname = templates[index].arguments[0].value.trim();
					this.WM.Log.logInfo("Looking for " + pkgname + " in the official repositories ...");
					return this.WM.ArchPackages.isOfficialPackage(pkgname, this.checkOfficial2, [checks, source, newText, templates, index, call, callArgs]);
				}
			}, {
				key: "checkOfficiallc",
				value: function checkOfficiallc(checks, source, newText, templates, index, call, callArgs) {
					var pkgname;
					pkgname = templates[index].arguments[0].value.trim();
					if (pkgname.toLowerCase() !== pkgname) {
						this.WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the official repositories ...");
						return this.WM.ArchPackages.isOfficialPackage(pkgname.toLowerCase(), this.checkOfficiallc2, [checks, source, newText, templates, index, call, callArgs]);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkAUR",
				value: function checkAUR(checks, source, newText, templates, index, call, callArgs) {
					var pkgname;
					pkgname = templates[index].arguments[0].value.trim();
					this.WM.Log.logInfo("Looking for " + pkgname + " in the AUR ...");
					return this.WM.ArchPackages.isAURPackage(pkgname, this.checkAUR2, [checks, source, newText, templates, index, call, callArgs]);
				}
			}, {
				key: "checkAURlc",
				value: function checkAURlc(checks, source, newText, templates, index, call, callArgs) {
					var pkgname;
					pkgname = templates[index].arguments[0].value.trim();
					if (pkgname.toLowerCase() !== pkgname) {
						this.WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the AUR ...");
						return this.WM.ArchPackages.isAURPackage(pkgname.toLowerCase(), this.checkAURlc2, [checks, source, newText, templates, index, call, callArgs]);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkGroup64",
				value: function checkGroup64(checks, source, newText, templates, index, call, callArgs) {
					var grpname;
					grpname = templates[index].arguments[0].value.trim();
					this.WM.Log.logInfo("Looking for " + grpname + " as an x86_64 package group ...");
					return this.WM.ArchPackages.isPackageGroup64(grpname, this.checkGroup64_2, [checks, source, newText, templates, index, call, callArgs]);
				}
			}, {
				key: "checkGroup64lc",
				value: function checkGroup64lc(checks, source, newText, templates, index, call, callArgs) {
					var grpname;
					grpname = templates[index].arguments[0].value.trim();
					if (grpname.toLowerCase() !== grpname) {
						this.WM.Log.logInfo("Looking for " + grpname.toLowerCase() + " (lowercase) as an x86_64 package group ...");
						return this.WM.ArchPackages.isPackageGroup64(grpname.toLowerCase(), this.checkGroup64lc2, [checks, source, newText, templates, index, call, callArgs]);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkGroup32",
				value: function checkGroup32(checks, source, newText, templates, index, call, callArgs) {
					var grpname;
					grpname = templates[index].arguments[0].value.trim();
					this.WM.Log.logInfo("Looking for " + grpname + " as an i686 package group ...");
					return this.WM.ArchPackages.isPackageGroup32(grpname, this.checkGroup32_2, [checks, source, newText, templates, index, call, callArgs]);
				}
			}, {
				key: "checkGroup32lc",
				value: function checkGroup32lc(checks, source, newText, templates, index, call, callArgs) {
					var grpname;
					grpname = templates[index].arguments[0].value.trim();
					if (grpname.toLowerCase() !== grpname) {
						this.WM.Log.logInfo("Looking for " + grpname.toLowerCase() + " (lowercase) as an i686 package group ...");
						return this.WM.ArchPackages.isPackageGroup32(grpname.toLowerCase(), this.checkGroup32lc2, [checks, source, newText, templates, index, call, callArgs]);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkOfficial2",
				value: function checkOfficial2(res, args) {
					var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					pkgname = template.arguments[0].value.trim();
					if (res) {
						if (template.title.toLowerCase() !== 'pkg') {
							newtemplate = "{{Pkg|" + pkgname + "}}";
							newText += newtemplate;
							this.WM.Log.logInfo("Replacing template with " + newtemplate);
						} else {
							newText += template.rawTransclusion;
						}
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkOfficiallc2",
				value: function checkOfficiallc2(res, args) {
					var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					pkgname = template.arguments[0].value.trim();
					if (res) {
						newtemplate = "{{Pkg|" + pkgname.toLowerCase() + "}}";
						newText += newtemplate;
						this.WM.Log.logInfo("Replacing template with " + newtemplate);
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkAUR2",
				value: function checkAUR2(res, args) {
					var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					pkgname = template.arguments[0].value.trim();
					if (res) {
						if (template.title.toLowerCase() !== 'aur') {
							newtemplate = "{{AUR|" + pkgname + "}}";
							newText += newtemplate;
							this.WM.Log.logInfo("Replacing template with " + newtemplate);
						} else {
							newText += template.rawTransclusion;
						}
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkAURlc2",
				value: function checkAURlc2(res, args) {
					var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					pkgname = template.arguments[0].value.trim();
					if (res) {
						newtemplate = "{{AUR|" + pkgname.toLowerCase() + "}}";
						newText += newtemplate;
						this.WM.Log.logInfo("Replacing template with " + newtemplate);
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkGroup64_2",
				value: function checkGroup64_2(res, args) {
					var call, callArgs, checks, grpname, index, newText, newtemplate, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					grpname = template.arguments[0].value.trim();
					if (res) {
						if (template.title.toLowerCase() !== 'grp') {
							newtemplate = "{{Grp|" + grpname + "}}";
							newText += newtemplate;
							this.WM.Log.logInfo("Replacing template with " + newtemplate);
						} else {
							newText += template.rawTransclusion;
						}
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkGroup64lc2",
				value: function checkGroup64lc2(res, args) {
					var call, callArgs, checks, grpname, index, newText, newtemplate, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					grpname = template.arguments[0].value.trim();
					if (res) {
						newtemplate = "{{Grp|" + grpname.toLowerCase() + "}}";
						newText += newtemplate;
						this.WM.Log.logInfo("Replacing template with " + newtemplate);
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkGroup32_2",
				value: function checkGroup32_2(res, args) {
					var call, callArgs, checks, grpname, index, newText, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					grpname = template.arguments[0].value.trim();
					if (res) {
						newText += template.rawTransclusion;
						this.WM.Log.logWarning(grpname + " is a package group for i686 only, " + "and Template:Grp only supports x86_64");
						this.WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates", {
							"error": "group64",
							"page": callArgs[0],
							"pagelanguage": this.WM.ArchWiki.detectLanguage(callArgs[0])[1],
							"package": grpname
						});
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "checkGroup32lc2",
				value: function checkGroup32lc2(res, args) {
					var call, callArgs, checks, grpname, index, newText, source, template, templates;
					checks = args[0];
					source = args[1];
					newText = args[2];
					templates = args[3];
					index = args[4];
					call = args[5];
					callArgs = args[6];
					template = templates[index];
					grpname = template.arguments[0].value.trim();
					if (res) {
						newText += template.rawTransclusion;
						this.WM.Log.logWarning(grpname + " is a package group for i686 only, " + "and Template:Grp only supports x86_64");
						this.WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates", {
							"error": "group64",
							"page": callArgs[0],
							"pagelanguage": this.WM.ArchWiki.detectLanguage(callArgs[0])[1],
							"package": grpname
						});
						return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
					} else {
						return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
					}
				}
			}, {
				key: "doUpdateContinue3",
				value: function doUpdateContinue3(source, newText, templates, index, call, callArgs) {
					index++;
					if (templates[index]) {
						return this.doUpdateContinue(source, newText, templates, index, call, callArgs);
					} else {
						newText += source.substring(templates[index - 1].index + templates[index - 1].length);
						return call(source, newText, callArgs);
					}
				}
			}, {
				key: "main",
				value: function main(args, callNext) {
					var source, title;
					title = this.WM.Editor.getTitle();
					source = this.WM.Editor.readSource();
					this.WM.Log.logInfo("Updating package templates ...");
					return this.doUpdate(source, this.mainEnd, [title, callNext]);
				}
			}, {
				key: "mainEnd",
				value: function mainEnd(source, newtext, args) {
					var callNext;
					callNext = args[1];
					if (newtext !== source) {
						this.WM.Editor.writeSource(newtext);
						this.WM.Log.logInfo("Updated package templates");
					} else {
						this.WM.Log.logInfo("No automatically updatable package templates " + "found");
					}
					if (callNext) {
						return callNext();
					}
				}
			}, {
				key: "mainAuto",
				value: function mainAuto(args, title, callBot, chainArgs) {
					var summary;
					summary = args;
					return this.WM.MW.callQueryEdit(title, this.mainAutoReplace, [summary, callBot]);
				}
			}, {
				key: "mainAutoReplace",
				value: function mainAutoReplace(title, source, timestamp, edittoken, args) {
					var callBot, summary;
					summary = args[0];
					callBot = args[1];
					return this.doUpdate(source, this.mainAutoWrite, [title, edittoken, timestamp, summary, callBot]);
				}
			}, {
				key: "mainAutoWrite",
				value: function mainAutoWrite(source, newtext, args) {
					var callBot, edittoken, summary, timestamp, title;
					title = args[0];
					edittoken = args[1];
					timestamp = args[2];
					summary = args[3];
					callBot = args[4];
					if (newtext !== source) {
						return this.WM.MW.callAPIPost({
							action: "edit",
							bot: "1",
							title: title,
							summary: summary,
							text: newtext,
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

			return ArchWikiUpdatePackageTemplates;
		}();
	}, {}], 32: [function (require, module, exports) {
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
	}, {}], 33: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/CSS": 43 }], 34: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/Str": 49 }], 35: [function (require, module, exports) {
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
	}, {}], 36: [function (require, module, exports) {
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
	}, {}], 37: [function (require, module, exports) {
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
	}, {}], 38: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/CSS": 43 }], 39: [function (require, module, exports) {
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
	}, {}], 40: [function (require, module, exports) {
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
	}, { "../../lib.js.generic/dist/Str": 49 }], 41: [function (require, module, exports) {
		(function (global, factory) {

			"use strict";

			if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
				module.exports = global.document ? factory(global, true) : function (w) {
					if (!w.document) {
						throw new Error("jQuery requires a window with a document");
					}
					return factory(w);
				};
			} else {
				factory(global);
			}
		})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
			"use strict";

			var arr = [];

			var document = window.document;

			var getProto = Object.getPrototypeOf;

			var _slice = arr.slice;

			var concat = arr.concat;

			var push = arr.push;

			var indexOf = arr.indexOf;

			var class2type = {};

			var toString = class2type.toString;

			var hasOwn = class2type.hasOwnProperty;

			var fnToString = hasOwn.toString;

			var ObjectFunctionString = fnToString.call(Object);

			var support = {};

			function DOMEval(code, doc) {
				doc = doc || document;

				var script = doc.createElement("script");

				script.text = code;
				doc.head.appendChild(script).parentNode.removeChild(script);
			}


			var version = "3.2.1",
			    jQuery = function jQuery(selector, context) {
				return new jQuery.fn.init(selector, context);
			},
			    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			    rmsPrefix = /^-ms-/,
			    rdashAlpha = /-([a-z])/g,
			    fcamelCase = function fcamelCase(all, letter) {
				return letter.toUpperCase();
			};

			jQuery.fn = jQuery.prototype = {
				jquery: version,

				constructor: jQuery,

				length: 0,

				toArray: function toArray() {
					return _slice.call(this);
				},

				get: function get(num) {
					if (num == null) {
						return _slice.call(this);
					}

					return num < 0 ? this[num + this.length] : this[num];
				},

				pushStack: function pushStack(elems) {
					var ret = jQuery.merge(this.constructor(), elems);

					ret.prevObject = this;

					return ret;
				},

				each: function each(callback) {
					return jQuery.each(this, callback);
				},

				map: function map(callback) {
					return this.pushStack(jQuery.map(this, function (elem, i) {
						return callback.call(elem, i, elem);
					}));
				},

				slice: function slice() {
					return this.pushStack(_slice.apply(this, arguments));
				},

				first: function first() {
					return this.eq(0);
				},

				last: function last() {
					return this.eq(-1);
				},

				eq: function eq(i) {
					var len = this.length,
					    j = +i + (i < 0 ? len : 0);
					return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
				},

				end: function end() {
					return this.prevObject || this.constructor();
				},

				push: push,
				sort: arr.sort,
				splice: arr.splice
			};

			jQuery.extend = jQuery.fn.extend = function () {
				var options,
				    name,
				    src,
				    copy,
				    copyIsArray,
				    clone,
				    target = arguments[0] || {},
				    i = 1,
				    length = arguments.length,
				    deep = false;

				if (typeof target === "boolean") {
					deep = target;

					target = arguments[i] || {};
					i++;
				}

				if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
					target = {};
				}

				if (i === length) {
					target = this;
					i--;
				}

				for (; i < length; i++) {
					if ((options = arguments[i]) != null) {
						for (name in options) {
							src = target[name];
							copy = options[name];

							if (target === copy) {
								continue;
							}

							if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

								if (copyIsArray) {
									copyIsArray = false;
									clone = src && Array.isArray(src) ? src : [];
								} else {
									clone = src && jQuery.isPlainObject(src) ? src : {};
								}

								target[name] = jQuery.extend(deep, clone, copy);
							} else if (copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}

				return target;
			};

			jQuery.extend({
				expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

				isReady: true,

				error: function error(msg) {
					throw new Error(msg);
				},

				noop: function noop() {},

				isFunction: function isFunction(obj) {
					return jQuery.type(obj) === "function";
				},

				isWindow: function isWindow(obj) {
					return obj != null && obj === obj.window;
				},

				isNumeric: function isNumeric(obj) {
					var type = jQuery.type(obj);
					return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
				},

				isPlainObject: function isPlainObject(obj) {
					var proto, Ctor;

					if (!obj || toString.call(obj) !== "[object Object]") {
						return false;
					}

					proto = getProto(obj);

					if (!proto) {
						return true;
					}

					Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
					return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
				},

				isEmptyObject: function isEmptyObject(obj) {
					var name;

					for (name in obj) {
						return false;
					}
					return true;
				},

				type: function type(obj) {
					if (obj == null) {
						return obj + "";
					}

					return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
				},

				globalEval: function globalEval(code) {
					DOMEval(code);
				},

				camelCase: function camelCase(string) {
					return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
				},

				each: function each(obj, callback) {
					var length,
					    i = 0;

					if (isArrayLike(obj)) {
						length = obj.length;
						for (; i < length; i++) {
							if (callback.call(obj[i], i, obj[i]) === false) {
								break;
							}
						}
					} else {
						for (i in obj) {
							if (callback.call(obj[i], i, obj[i]) === false) {
								break;
							}
						}
					}

					return obj;
				},

				trim: function trim(text) {
					return text == null ? "" : (text + "").replace(rtrim, "");
				},

				makeArray: function makeArray(arr, results) {
					var ret = results || [];

					if (arr != null) {
						if (isArrayLike(Object(arr))) {
							jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
						} else {
							push.call(ret, arr);
						}
					}

					return ret;
				},

				inArray: function inArray(elem, arr, i) {
					return arr == null ? -1 : indexOf.call(arr, elem, i);
				},

				merge: function merge(first, second) {
					var len = +second.length,
					    j = 0,
					    i = first.length;

					for (; j < len; j++) {
						first[i++] = second[j];
					}

					first.length = i;

					return first;
				},

				grep: function grep(elems, callback, invert) {
					var callbackInverse,
					    matches = [],
					    i = 0,
					    length = elems.length,
					    callbackExpect = !invert;

					for (; i < length; i++) {
						callbackInverse = !callback(elems[i], i);
						if (callbackInverse !== callbackExpect) {
							matches.push(elems[i]);
						}
					}

					return matches;
				},

				map: function map(elems, callback, arg) {
					var length,
					    value,
					    i = 0,
					    ret = [];

					if (isArrayLike(elems)) {
						length = elems.length;
						for (; i < length; i++) {
							value = callback(elems[i], i, arg);

							if (value != null) {
								ret.push(value);
							}
						}
					} else {
						for (i in elems) {
							value = callback(elems[i], i, arg);

							if (value != null) {
								ret.push(value);
							}
						}
					}

					return concat.apply([], ret);
				},

				guid: 1,

				proxy: function proxy(fn, context) {
					var tmp, args, proxy;

					if (typeof context === "string") {
						tmp = fn[context];
						context = fn;
						fn = tmp;
					}

					if (!jQuery.isFunction(fn)) {
						return undefined;
					}

					args = _slice.call(arguments, 2);
					proxy = function proxy() {
						return fn.apply(context || this, args.concat(_slice.call(arguments)));
					};

					proxy.guid = fn.guid = fn.guid || jQuery.guid++;

					return proxy;
				},

				now: Date.now,

				support: support
			});

			if (typeof Symbol === "function") {
				jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
			}

			jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
				class2type["[object " + name + "]"] = name.toLowerCase();
			});

			function isArrayLike(obj) {
				var length = !!obj && "length" in obj && obj.length,
				    type = jQuery.type(obj);

				if (type === "function" || jQuery.isWindow(obj)) {
					return false;
				}

				return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
			}
			var Sizzle = function (window) {

				var i,
				    support,
				    Expr,
				    getText,
				    isXML,
				    tokenize,
				    compile,
				    select,
				    outermostContext,
				    sortInput,
				    hasDuplicate,
				    setDocument,
				    document,
				    docElem,
				    documentIsHTML,
				    rbuggyQSA,
				    rbuggyMatches,
				    matches,
				    contains,
				    expando = "sizzle" + 1 * new Date(),
				    preferredDoc = window.document,
				    dirruns = 0,
				    done = 0,
				    classCache = createCache(),
				    tokenCache = createCache(),
				    compilerCache = createCache(),
				    sortOrder = function sortOrder(a, b) {
					if (a === b) {
						hasDuplicate = true;
					}
					return 0;
				},
				    hasOwn = {}.hasOwnProperty,
				    arr = [],
				    pop = arr.pop,
				    push_native = arr.push,
				    push = arr.push,
				    slice = arr.slice,
				    indexOf = function indexOf(list, elem) {
					var i = 0,
					    len = list.length;
					for (; i < len; i++) {
						if (list[i] === elem) {
							return i;
						}
					}
					return -1;
				},
				    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				    whitespace = "[\\x20\\t\\r\\n\\f]",
				    identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
				    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
				    pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
				    rwhitespace = new RegExp(whitespace + "+", "g"),
				    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
				    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
				    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
				    rpseudo = new RegExp(pseudos),
				    ridentifier = new RegExp("^" + identifier + "$"),
				    matchExpr = {
					"ID": new RegExp("^#(" + identifier + ")"),
					"CLASS": new RegExp("^\\.(" + identifier + ")"),
					"TAG": new RegExp("^(" + identifier + "|[*])"),
					"ATTR": new RegExp("^" + attributes),
					"PSEUDO": new RegExp("^" + pseudos),
					"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
					"bool": new RegExp("^(?:" + booleans + ")$", "i"),

					"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
				},
				    rinputs = /^(?:input|select|textarea|button)$/i,
				    rheader = /^h\d$/i,
				    rnative = /^[^{]+\{\s*\[native \w/,
				    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				    rsibling = /[+~]/,
				    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
				    funescape = function funescape(_, escaped, escapedWhitespace) {
					var high = "0x" + escaped - 0x10000;

					return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
				},
				    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
				    fcssescape = function fcssescape(ch, asCodePoint) {
					if (asCodePoint) {
						if (ch === "\0") {
							return "\uFFFD";
						}

						return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
					}

					return "\\" + ch;
				},
				    unloadHandler = function unloadHandler() {
					setDocument();
				},
				    disabledAncestor = addCombinator(function (elem) {
					return elem.disabled === true && ("form" in elem || "label" in elem);
				}, { dir: "parentNode", next: "legend" });

				try {
					push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);

					arr[preferredDoc.childNodes.length].nodeType;
				} catch (e) {
					push = { apply: arr.length ? function (target, els) {
							push_native.apply(target, slice.call(els));
						} : function (target, els) {
							var j = target.length,
							    i = 0;

							while (target[j++] = els[i++]) {}
							target.length = j - 1;
						}
					};
				}

				function Sizzle(selector, context, results, seed) {
					var m,
					    i,
					    elem,
					    nid,
					    match,
					    groups,
					    newSelector,
					    newContext = context && context.ownerDocument,
					    nodeType = context ? context.nodeType : 9;

					results = results || [];

					if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

						return results;
					}

					if (!seed) {

						if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
							setDocument(context);
						}
						context = context || document;

						if (documentIsHTML) {
							if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
								if (m = match[1]) {
									if (nodeType === 9) {
										if (elem = context.getElementById(m)) {
											if (elem.id === m) {
												results.push(elem);
												return results;
											}
										} else {
											return results;
										}
									} else {
										if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

											results.push(elem);
											return results;
										}
									}
								} else if (match[2]) {
									push.apply(results, context.getElementsByTagName(selector));
									return results;
								} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

									push.apply(results, context.getElementsByClassName(m));
									return results;
								}
							}

							if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

								if (nodeType !== 1) {
									newContext = context;
									newSelector = selector;
								} else if (context.nodeName.toLowerCase() !== "object") {
									if (nid = context.getAttribute("id")) {
										nid = nid.replace(rcssescape, fcssescape);
									} else {
										context.setAttribute("id", nid = expando);
									}

									groups = tokenize(selector);
									i = groups.length;
									while (i--) {
										groups[i] = "#" + nid + " " + toSelector(groups[i]);
									}
									newSelector = groups.join(",");

									newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
								}

								if (newSelector) {
									try {
										push.apply(results, newContext.querySelectorAll(newSelector));
										return results;
									} catch (qsaError) {} finally {
										if (nid === expando) {
											context.removeAttribute("id");
										}
									}
								}
							}
						}
					}

					return select(selector.replace(rtrim, "$1"), context, results, seed);
				}

				function createCache() {
					var keys = [];

					function cache(key, value) {
						if (keys.push(key + " ") > Expr.cacheLength) {
							delete cache[keys.shift()];
						}
						return cache[key + " "] = value;
					}
					return cache;
				}

				function markFunction(fn) {
					fn[expando] = true;
					return fn;
				}

				function assert(fn) {
					var el = document.createElement("fieldset");

					try {
						return !!fn(el);
					} catch (e) {
						return false;
					} finally {
						if (el.parentNode) {
							el.parentNode.removeChild(el);
						}

						el = null;
					}
				}

				function addHandle(attrs, handler) {
					var arr = attrs.split("|"),
					    i = arr.length;

					while (i--) {
						Expr.attrHandle[arr[i]] = handler;
					}
				}

				function siblingCheck(a, b) {
					var cur = b && a,
					    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

					if (diff) {
						return diff;
					}

					if (cur) {
						while (cur = cur.nextSibling) {
							if (cur === b) {
								return -1;
							}
						}
					}

					return a ? 1 : -1;
				}

				function createInputPseudo(type) {
					return function (elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === type;
					};
				}

				function createButtonPseudo(type) {
					return function (elem) {
						var name = elem.nodeName.toLowerCase();
						return (name === "input" || name === "button") && elem.type === type;
					};
				}

				function createDisabledPseudo(disabled) {
					return function (elem) {
						if ("form" in elem) {
							if (elem.parentNode && elem.disabled === false) {
								if ("label" in elem) {
									if ("label" in elem.parentNode) {
										return elem.parentNode.disabled === disabled;
									} else {
										return elem.disabled === disabled;
									}
								}

								return elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
							}

							return elem.disabled === disabled;
						} else if ("label" in elem) {
							return elem.disabled === disabled;
						}

						return false;
					};
				}

				function createPositionalPseudo(fn) {
					return markFunction(function (argument) {
						argument = +argument;
						return markFunction(function (seed, matches) {
							var j,
							    matchIndexes = fn([], seed.length, argument),
							    i = matchIndexes.length;

							while (i--) {
								if (seed[j = matchIndexes[i]]) {
									seed[j] = !(matches[j] = seed[j]);
								}
							}
						});
					});
				}

				function testContext(context) {
					return context && typeof context.getElementsByTagName !== "undefined" && context;
				}

				support = Sizzle.support = {};

				isXML = Sizzle.isXML = function (elem) {
					var documentElement = elem && (elem.ownerDocument || elem).documentElement;
					return documentElement ? documentElement.nodeName !== "HTML" : false;
				};

				setDocument = Sizzle.setDocument = function (node) {
					var hasCompare,
					    subWindow,
					    doc = node ? node.ownerDocument || node : preferredDoc;

					if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
						return document;
					}

					document = doc;
					docElem = document.documentElement;
					documentIsHTML = !isXML(document);

					if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
						if (subWindow.addEventListener) {
							subWindow.addEventListener("unload", unloadHandler, false);
						} else if (subWindow.attachEvent) {
							subWindow.attachEvent("onunload", unloadHandler);
						}
					}

					support.attributes = assert(function (el) {
						el.className = "i";
						return !el.getAttribute("className");
					});

					support.getElementsByTagName = assert(function (el) {
						el.appendChild(document.createComment(""));
						return !el.getElementsByTagName("*").length;
					});

					support.getElementsByClassName = rnative.test(document.getElementsByClassName);

					support.getById = assert(function (el) {
						docElem.appendChild(el).id = expando;
						return !document.getElementsByName || !document.getElementsByName(expando).length;
					});

					if (support.getById) {
						Expr.filter["ID"] = function (id) {
							var attrId = id.replace(runescape, funescape);
							return function (elem) {
								return elem.getAttribute("id") === attrId;
							};
						};
						Expr.find["ID"] = function (id, context) {
							if (typeof context.getElementById !== "undefined" && documentIsHTML) {
								var elem = context.getElementById(id);
								return elem ? [elem] : [];
							}
						};
					} else {
						Expr.filter["ID"] = function (id) {
							var attrId = id.replace(runescape, funescape);
							return function (elem) {
								var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
								return node && node.value === attrId;
							};
						};

						Expr.find["ID"] = function (id, context) {
							if (typeof context.getElementById !== "undefined" && documentIsHTML) {
								var node,
								    i,
								    elems,
								    elem = context.getElementById(id);

								if (elem) {
									node = elem.getAttributeNode("id");
									if (node && node.value === id) {
										return [elem];
									}

									elems = context.getElementsByName(id);
									i = 0;
									while (elem = elems[i++]) {
										node = elem.getAttributeNode("id");
										if (node && node.value === id) {
											return [elem];
										}
									}
								}

								return [];
							}
						};
					}

					Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
						if (typeof context.getElementsByTagName !== "undefined") {
							return context.getElementsByTagName(tag);
						} else if (support.qsa) {
							return context.querySelectorAll(tag);
						}
					} : function (tag, context) {
						var elem,
						    tmp = [],
						    i = 0,
						    results = context.getElementsByTagName(tag);

						if (tag === "*") {
							while (elem = results[i++]) {
								if (elem.nodeType === 1) {
									tmp.push(elem);
								}
							}

							return tmp;
						}
						return results;
					};

					Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
						if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
							return context.getElementsByClassName(className);
						}
					};

					rbuggyMatches = [];

					rbuggyQSA = [];

					if (support.qsa = rnative.test(document.querySelectorAll)) {
						assert(function (el) {
							docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

							if (el.querySelectorAll("[msallowcapture^='']").length) {
								rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
							}

							if (!el.querySelectorAll("[selected]").length) {
								rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
							}

							if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
								rbuggyQSA.push("~=");
							}

							if (!el.querySelectorAll(":checked").length) {
								rbuggyQSA.push(":checked");
							}

							if (!el.querySelectorAll("a#" + expando + "+*").length) {
								rbuggyQSA.push(".#.+[+~]");
							}
						});

						assert(function (el) {
							el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

							var input = document.createElement("input");
							input.setAttribute("type", "hidden");
							el.appendChild(input).setAttribute("name", "D");

							if (el.querySelectorAll("[name=d]").length) {
								rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
							}

							if (el.querySelectorAll(":enabled").length !== 2) {
								rbuggyQSA.push(":enabled", ":disabled");
							}

							docElem.appendChild(el).disabled = true;
							if (el.querySelectorAll(":disabled").length !== 2) {
								rbuggyQSA.push(":enabled", ":disabled");
							}

							el.querySelectorAll("*,:x");
							rbuggyQSA.push(",.*:");
						});
					}

					if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

						assert(function (el) {
							support.disconnectedMatch = matches.call(el, "*");

							matches.call(el, "[s!='']:x");
							rbuggyMatches.push("!=", pseudos);
						});
					}

					rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
					rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

					hasCompare = rnative.test(docElem.compareDocumentPosition);

					contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
						    bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
					} : function (a, b) {
						if (b) {
							while (b = b.parentNode) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};

					sortOrder = hasCompare ? function (a, b) {
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
						if (compare) {
							return compare;
						}

						compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;

						if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
							if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
								return -1;
							}
							if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
								return 1;
							}

							return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
						}

						return compare & 4 ? -1 : 1;
					} : function (a, b) {
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						var cur,
						    i = 0,
						    aup = a.parentNode,
						    bup = b.parentNode,
						    ap = [a],
						    bp = [b];

						if (!aup || !bup) {
							return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
						} else if (aup === bup) {
							return siblingCheck(a, b);
						}

						cur = a;
						while (cur = cur.parentNode) {
							ap.unshift(cur);
						}
						cur = b;
						while (cur = cur.parentNode) {
							bp.unshift(cur);
						}

						while (ap[i] === bp[i]) {
							i++;
						}

						return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
					};

					return document;
				};

				Sizzle.matches = function (expr, elements) {
					return Sizzle(expr, null, null, elements);
				};

				Sizzle.matchesSelector = function (elem, expr) {
					if ((elem.ownerDocument || elem) !== document) {
						setDocument(elem);
					}

					expr = expr.replace(rattributeQuotes, "='$1']");

					if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

						try {
							var ret = matches.call(elem, expr);

							if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
								return ret;
							}
						} catch (e) {}
					}

					return Sizzle(expr, document, null, [elem]).length > 0;
				};

				Sizzle.contains = function (context, elem) {
					if ((context.ownerDocument || context) !== document) {
						setDocument(context);
					}
					return contains(context, elem);
				};

				Sizzle.attr = function (elem, name) {
					if ((elem.ownerDocument || elem) !== document) {
						setDocument(elem);
					}

					var fn = Expr.attrHandle[name.toLowerCase()],
					    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

					return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				};

				Sizzle.escape = function (sel) {
					return (sel + "").replace(rcssescape, fcssescape);
				};

				Sizzle.error = function (msg) {
					throw new Error("Syntax error, unrecognized expression: " + msg);
				};

				Sizzle.uniqueSort = function (results) {
					var elem,
					    duplicates = [],
					    j = 0,
					    i = 0;

					hasDuplicate = !support.detectDuplicates;
					sortInput = !support.sortStable && results.slice(0);
					results.sort(sortOrder);

					if (hasDuplicate) {
						while (elem = results[i++]) {
							if (elem === results[i]) {
								j = duplicates.push(i);
							}
						}
						while (j--) {
							results.splice(duplicates[j], 1);
						}
					}

					sortInput = null;

					return results;
				};

				getText = Sizzle.getText = function (elem) {
					var node,
					    ret = "",
					    i = 0,
					    nodeType = elem.nodeType;

					if (!nodeType) {
						while (node = elem[i++]) {
							ret += getText(node);
						}
					} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
						if (typeof elem.textContent === "string") {
							return elem.textContent;
						} else {
							for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
								ret += getText(elem);
							}
						}
					} else if (nodeType === 3 || nodeType === 4) {
						return elem.nodeValue;
					}


					return ret;
				};

				Expr = Sizzle.selectors = {
					cacheLength: 50,

					createPseudo: markFunction,

					match: matchExpr,

					attrHandle: {},

					find: {},

					relative: {
						">": { dir: "parentNode", first: true },
						" ": { dir: "parentNode" },
						"+": { dir: "previousSibling", first: true },
						"~": { dir: "previousSibling" }
					},

					preFilter: {
						"ATTR": function ATTR(match) {
							match[1] = match[1].replace(runescape, funescape);

							match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

							if (match[2] === "~=") {
								match[3] = " " + match[3] + " ";
							}

							return match.slice(0, 4);
						},

						"CHILD": function CHILD(match) {
							match[1] = match[1].toLowerCase();

							if (match[1].slice(0, 3) === "nth") {
								if (!match[3]) {
									Sizzle.error(match[0]);
								}

								match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
								match[5] = +(match[7] + match[8] || match[3] === "odd");
							} else if (match[3]) {
								Sizzle.error(match[0]);
							}

							return match;
						},

						"PSEUDO": function PSEUDO(match) {
							var excess,
							    unquoted = !match[6] && match[2];

							if (matchExpr["CHILD"].test(match[0])) {
								return null;
							}

							if (match[3]) {
								match[2] = match[4] || match[5] || "";
							} else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
								match[0] = match[0].slice(0, excess);
								match[2] = unquoted.slice(0, excess);
							}

							return match.slice(0, 3);
						}
					},

					filter: {

						"TAG": function TAG(nodeNameSelector) {
							var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
							return nodeNameSelector === "*" ? function () {
								return true;
							} : function (elem) {
								return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
							};
						},

						"CLASS": function CLASS(className) {
							var pattern = classCache[className + " "];

							return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
								return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
							});
						},

						"ATTR": function ATTR(name, operator, check) {
							return function (elem) {
								var result = Sizzle.attr(elem, name);

								if (result == null) {
									return operator === "!=";
								}
								if (!operator) {
									return true;
								}

								result += "";

								return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
							};
						},

						"CHILD": function CHILD(type, what, argument, first, last) {
							var simple = type.slice(0, 3) !== "nth",
							    forward = type.slice(-4) !== "last",
							    ofType = what === "of-type";

							return first === 1 && last === 0 ? function (elem) {
								return !!elem.parentNode;
							} : function (elem, context, xml) {
								var cache,
								    uniqueCache,
								    outerCache,
								    node,
								    nodeIndex,
								    start,
								    dir = simple !== forward ? "nextSibling" : "previousSibling",
								    parent = elem.parentNode,
								    name = ofType && elem.nodeName.toLowerCase(),
								    useCache = !xml && !ofType,
								    diff = false;

								if (parent) {
									if (simple) {
										while (dir) {
											node = elem;
											while (node = node[dir]) {
												if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

													return false;
												}
											}

											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}

									start = [forward ? parent.firstChild : parent.lastChild];

									if (forward && useCache) {
										node = parent;
										outerCache = node[expando] || (node[expando] = {});

										uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

										cache = uniqueCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = nodeIndex && cache[2];
										node = nodeIndex && parent.childNodes[nodeIndex];

										while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
											if (node.nodeType === 1 && ++diff && node === elem) {
												uniqueCache[type] = [dirruns, nodeIndex, diff];
												break;
											}
										}
									} else {
										if (useCache) {
											node = elem;
											outerCache = node[expando] || (node[expando] = {});

											uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

											cache = uniqueCache[type] || [];
											nodeIndex = cache[0] === dirruns && cache[1];
											diff = nodeIndex;
										}

										if (diff === false) {
											while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

												if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
													if (useCache) {
														outerCache = node[expando] || (node[expando] = {});

														uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

														uniqueCache[type] = [dirruns, diff];
													}

													if (node === elem) {
														break;
													}
												}
											}
										}
									}

									diff -= last;
									return diff === first || diff % first === 0 && diff / first >= 0;
								}
							};
						},

						"PSEUDO": function PSEUDO(pseudo, argument) {
							var args,
							    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

							if (fn[expando]) {
								return fn(argument);
							}

							if (fn.length > 1) {
								args = [pseudo, pseudo, "", argument];
								return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
									var idx,
									    matched = fn(seed, argument),
									    i = matched.length;
									while (i--) {
										idx = indexOf(seed, matched[i]);
										seed[idx] = !(matches[idx] = matched[i]);
									}
								}) : function (elem) {
									return fn(elem, 0, args);
								};
							}

							return fn;
						}
					},

					pseudos: {
						"not": markFunction(function (selector) {
							var input = [],
							    results = [],
							    matcher = compile(selector.replace(rtrim, "$1"));

							return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
								var elem,
								    unmatched = matcher(seed, null, xml, []),
								    i = seed.length;

								while (i--) {
									if (elem = unmatched[i]) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) : function (elem, context, xml) {
								input[0] = elem;
								matcher(input, null, xml, results);

								input[0] = null;
								return !results.pop();
							};
						}),

						"has": markFunction(function (selector) {
							return function (elem) {
								return Sizzle(selector, elem).length > 0;
							};
						}),

						"contains": markFunction(function (text) {
							text = text.replace(runescape, funescape);
							return function (elem) {
								return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
							};
						}),

						"lang": markFunction(function (lang) {
							if (!ridentifier.test(lang || "")) {
								Sizzle.error("unsupported lang: " + lang);
							}
							lang = lang.replace(runescape, funescape).toLowerCase();
							return function (elem) {
								var elemLang;
								do {
									if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

										elemLang = elemLang.toLowerCase();
										return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
									}
								} while ((elem = elem.parentNode) && elem.nodeType === 1);
								return false;
							};
						}),

						"target": function target(elem) {
							var hash = window.location && window.location.hash;
							return hash && hash.slice(1) === elem.id;
						},

						"root": function root(elem) {
							return elem === docElem;
						},

						"focus": function focus(elem) {
							return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
						},

						"enabled": createDisabledPseudo(false),
						"disabled": createDisabledPseudo(true),

						"checked": function checked(elem) {
							var nodeName = elem.nodeName.toLowerCase();
							return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
						},

						"selected": function selected(elem) {
							if (elem.parentNode) {
								elem.parentNode.selectedIndex;
							}

							return elem.selected === true;
						},

						"empty": function empty(elem) {
							for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
								if (elem.nodeType < 6) {
									return false;
								}
							}
							return true;
						},

						"parent": function parent(elem) {
							return !Expr.pseudos["empty"](elem);
						},

						"header": function header(elem) {
							return rheader.test(elem.nodeName);
						},

						"input": function input(elem) {
							return rinputs.test(elem.nodeName);
						},

						"button": function button(elem) {
							var name = elem.nodeName.toLowerCase();
							return name === "input" && elem.type === "button" || name === "button";
						},

						"text": function text(elem) {
							var attr;
							return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
						},

						"first": createPositionalPseudo(function () {
							return [0];
						}),

						"last": createPositionalPseudo(function (matchIndexes, length) {
							return [length - 1];
						}),

						"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
							return [argument < 0 ? argument + length : argument];
						}),

						"even": createPositionalPseudo(function (matchIndexes, length) {
							var i = 0;
							for (; i < length; i += 2) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"odd": createPositionalPseudo(function (matchIndexes, length) {
							var i = 1;
							for (; i < length; i += 2) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
							var i = argument < 0 ? argument + length : argument;
							for (; --i >= 0;) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
							var i = argument < 0 ? argument + length : argument;
							for (; ++i < length;) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						})
					}
				};

				Expr.pseudos["nth"] = Expr.pseudos["eq"];

				for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
					Expr.pseudos[i] = createInputPseudo(i);
				}
				for (i in { submit: true, reset: true }) {
					Expr.pseudos[i] = createButtonPseudo(i);
				}

				function setFilters() {}
				setFilters.prototype = Expr.filters = Expr.pseudos;
				Expr.setFilters = new setFilters();

				tokenize = Sizzle.tokenize = function (selector, parseOnly) {
					var matched,
					    match,
					    tokens,
					    type,
					    soFar,
					    groups,
					    preFilters,
					    cached = tokenCache[selector + " "];

					if (cached) {
						return parseOnly ? 0 : cached.slice(0);
					}

					soFar = selector;
					groups = [];
					preFilters = Expr.preFilter;

					while (soFar) {
						if (!matched || (match = rcomma.exec(soFar))) {
							if (match) {
								soFar = soFar.slice(match[0].length) || soFar;
							}
							groups.push(tokens = []);
						}

						matched = false;

						if (match = rcombinators.exec(soFar)) {
							matched = match.shift();
							tokens.push({
								value: matched,

								type: match[0].replace(rtrim, " ")
							});
							soFar = soFar.slice(matched.length);
						}

						for (type in Expr.filter) {
							if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
								matched = match.shift();
								tokens.push({
									value: matched,
									type: type,
									matches: match
								});
								soFar = soFar.slice(matched.length);
							}
						}

						if (!matched) {
							break;
						}
					}

					return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
				};

				function toSelector(tokens) {
					var i = 0,
					    len = tokens.length,
					    selector = "";
					for (; i < len; i++) {
						selector += tokens[i].value;
					}
					return selector;
				}

				function addCombinator(matcher, combinator, base) {
					var dir = combinator.dir,
					    skip = combinator.next,
					    key = skip || dir,
					    checkNonElements = base && key === "parentNode",
					    doneName = done++;

					return combinator.first ? function (elem, context, xml) {
						while (elem = elem[dir]) {
							if (elem.nodeType === 1 || checkNonElements) {
								return matcher(elem, context, xml);
							}
						}
						return false;
					} : function (elem, context, xml) {
						var oldCache,
						    uniqueCache,
						    outerCache,
						    newCache = [dirruns, doneName];

						if (xml) {
							while (elem = elem[dir]) {
								if (elem.nodeType === 1 || checkNonElements) {
									if (matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						} else {
							while (elem = elem[dir]) {
								if (elem.nodeType === 1 || checkNonElements) {
									outerCache = elem[expando] || (elem[expando] = {});

									uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

									if (skip && skip === elem.nodeName.toLowerCase()) {
										elem = elem[dir] || elem;
									} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
										return newCache[2] = oldCache[2];
									} else {
										uniqueCache[key] = newCache;

										if (newCache[2] = matcher(elem, context, xml)) {
											return true;
										}
									}
								}
							}
						}
						return false;
					};
				}

				function elementMatcher(matchers) {
					return matchers.length > 1 ? function (elem, context, xml) {
						var i = matchers.length;
						while (i--) {
							if (!matchers[i](elem, context, xml)) {
								return false;
							}
						}
						return true;
					} : matchers[0];
				}

				function multipleContexts(selector, contexts, results) {
					var i = 0,
					    len = contexts.length;
					for (; i < len; i++) {
						Sizzle(selector, contexts[i], results);
					}
					return results;
				}

				function condense(unmatched, map, filter, context, xml) {
					var elem,
					    newUnmatched = [],
					    i = 0,
					    len = unmatched.length,
					    mapped = map != null;

					for (; i < len; i++) {
						if (elem = unmatched[i]) {
							if (!filter || filter(elem, context, xml)) {
								newUnmatched.push(elem);
								if (mapped) {
									map.push(i);
								}
							}
						}
					}

					return newUnmatched;
				}

				function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
					if (postFilter && !postFilter[expando]) {
						postFilter = setMatcher(postFilter);
					}
					if (postFinder && !postFinder[expando]) {
						postFinder = setMatcher(postFinder, postSelector);
					}
					return markFunction(function (seed, results, context, xml) {
						var temp,
						    i,
						    elem,
						    preMap = [],
						    postMap = [],
						    preexisting = results.length,
						    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
						    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
						    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;

						if (matcher) {
							matcher(matcherIn, matcherOut, context, xml);
						}

						if (postFilter) {
							temp = condense(matcherOut, postMap);
							postFilter(temp, [], context, xml);

							i = temp.length;
							while (i--) {
								if (elem = temp[i]) {
									matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
								}
							}
						}

						if (seed) {
							if (postFinder || preFilter) {
								if (postFinder) {
									temp = [];
									i = matcherOut.length;
									while (i--) {
										if (elem = matcherOut[i]) {
											temp.push(matcherIn[i] = elem);
										}
									}
									postFinder(null, matcherOut = [], temp, xml);
								}

								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

										seed[temp] = !(results[temp] = elem);
									}
								}
							}
						} else {
							matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
							if (postFinder) {
								postFinder(null, results, matcherOut, xml);
							} else {
								push.apply(results, matcherOut);
							}
						}
					});
				}

				function matcherFromTokens(tokens) {
					var checkContext,
					    matcher,
					    j,
					    len = tokens.length,
					    leadingRelative = Expr.relative[tokens[0].type],
					    implicitRelative = leadingRelative || Expr.relative[" "],
					    i = leadingRelative ? 1 : 0,
					    matchContext = addCombinator(function (elem) {
						return elem === checkContext;
					}, implicitRelative, true),
					    matchAnyContext = addCombinator(function (elem) {
						return indexOf(checkContext, elem) > -1;
					}, implicitRelative, true),
					    matchers = [function (elem, context, xml) {
						var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));

						checkContext = null;
						return ret;
					}];

					for (; i < len; i++) {
						if (matcher = Expr.relative[tokens[i].type]) {
							matchers = [addCombinator(elementMatcher(matchers), matcher)];
						} else {
							matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

							if (matcher[expando]) {
								j = ++i;
								for (; j < len; j++) {
									if (Expr.relative[tokens[j].type]) {
										break;
									}
								}
								return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
							}
							matchers.push(matcher);
						}
					}

					return elementMatcher(matchers);
				}

				function matcherFromGroupMatchers(elementMatchers, setMatchers) {
					var bySet = setMatchers.length > 0,
					    byElement = elementMatchers.length > 0,
					    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
						var elem,
						    j,
						    matcher,
						    matchedCount = 0,
						    i = "0",
						    unmatched = seed && [],
						    setMatched = [],
						    contextBackup = outermostContext,
						    elems = seed || byElement && Expr.find["TAG"]("*", outermost),
						    dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
						    len = elems.length;

						if (outermost) {
							outermostContext = context === document || context || outermost;
						}

						for (; i !== len && (elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								if (!context && elem.ownerDocument !== document) {
									setDocument(elem);
									xml = !documentIsHTML;
								}
								while (matcher = elementMatchers[j++]) {
									if (matcher(elem, context || document, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
								}
							}

							if (bySet) {
								if (elem = !matcher && elem) {
									matchedCount--;
								}

								if (seed) {
									unmatched.push(elem);
								}
							}
						}

						matchedCount += i;

						if (bySet && i !== matchedCount) {
							j = 0;
							while (matcher = setMatchers[j++]) {
								matcher(unmatched, setMatched, context, xml);
							}

							if (seed) {
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}

								setMatched = condense(setMatched);
							}

							push.apply(results, setMatched);

							if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

								Sizzle.uniqueSort(results);
							}
						}

						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}

						return unmatched;
					};

					return bySet ? markFunction(superMatcher) : superMatcher;
				}

				compile = Sizzle.compile = function (selector, match) {
					var i,
					    setMatchers = [],
					    elementMatchers = [],
					    cached = compilerCache[selector + " "];

					if (!cached) {
						if (!match) {
							match = tokenize(selector);
						}
						i = match.length;
						while (i--) {
							cached = matcherFromTokens(match[i]);
							if (cached[expando]) {
								setMatchers.push(cached);
							} else {
								elementMatchers.push(cached);
							}
						}

						cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

						cached.selector = selector;
					}
					return cached;
				};

				select = Sizzle.select = function (selector, context, results, seed) {
					var i,
					    tokens,
					    token,
					    type,
					    find,
					    compiled = typeof selector === "function" && selector,
					    match = !seed && tokenize(selector = compiled.selector || selector);

					results = results || [];

					if (match.length === 1) {
						tokens = match[0] = match[0].slice(0);
						if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

							context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
							if (!context) {
								return results;
							} else if (compiled) {
								context = context.parentNode;
							}

							selector = selector.slice(tokens.shift().value.length);
						}

						i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
						while (i--) {
							token = tokens[i];

							if (Expr.relative[type = token.type]) {
								break;
							}
							if (find = Expr.find[type]) {
								if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
									tokens.splice(i, 1);
									selector = seed.length && toSelector(tokens);
									if (!selector) {
										push.apply(results, seed);
										return results;
									}

									break;
								}
							}
						}
					}

					(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
					return results;
				};

				support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

				support.detectDuplicates = !!hasDuplicate;

				setDocument();

				support.sortDetached = assert(function (el) {
					return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
				});

				if (!assert(function (el) {
					el.innerHTML = "<a href='#'></a>";
					return el.firstChild.getAttribute("href") === "#";
				})) {
					addHandle("type|href|height|width", function (elem, name, isXML) {
						if (!isXML) {
							return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
						}
					});
				}

				if (!support.attributes || !assert(function (el) {
					el.innerHTML = "<input/>";
					el.firstChild.setAttribute("value", "");
					return el.firstChild.getAttribute("value") === "";
				})) {
					addHandle("value", function (elem, name, isXML) {
						if (!isXML && elem.nodeName.toLowerCase() === "input") {
							return elem.defaultValue;
						}
					});
				}

				if (!assert(function (el) {
					return el.getAttribute("disabled") == null;
				})) {
					addHandle(booleans, function (elem, name, isXML) {
						var val;
						if (!isXML) {
							return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
						}
					});
				}

				return Sizzle;
			}(window);

			jQuery.find = Sizzle;
			jQuery.expr = Sizzle.selectors;

			jQuery.expr[":"] = jQuery.expr.pseudos;
			jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
			jQuery.text = Sizzle.getText;
			jQuery.isXMLDoc = Sizzle.isXML;
			jQuery.contains = Sizzle.contains;
			jQuery.escapeSelector = Sizzle.escape;

			var dir = function dir(elem, _dir, until) {
				var matched = [],
				    truncate = until !== undefined;

				while ((elem = elem[_dir]) && elem.nodeType !== 9) {
					if (elem.nodeType === 1) {
						if (truncate && jQuery(elem).is(until)) {
							break;
						}
						matched.push(elem);
					}
				}
				return matched;
			};

			var _siblings = function _siblings(n, elem) {
				var matched = [];

				for (; n; n = n.nextSibling) {
					if (n.nodeType === 1 && n !== elem) {
						matched.push(n);
					}
				}

				return matched;
			};

			var rneedsContext = jQuery.expr.match.needsContext;

			function nodeName(elem, name) {

				return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
			};
			var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

			var risSimple = /^.[^:#\[\.,]*$/;

			function winnow(elements, qualifier, not) {
				if (jQuery.isFunction(qualifier)) {
					return jQuery.grep(elements, function (elem, i) {
						return !!qualifier.call(elem, i, elem) !== not;
					});
				}

				if (qualifier.nodeType) {
					return jQuery.grep(elements, function (elem) {
						return elem === qualifier !== not;
					});
				}

				if (typeof qualifier !== "string") {
					return jQuery.grep(elements, function (elem) {
						return indexOf.call(qualifier, elem) > -1 !== not;
					});
				}

				if (risSimple.test(qualifier)) {
					return jQuery.filter(qualifier, elements, not);
				}

				qualifier = jQuery.filter(qualifier, elements);
				return jQuery.grep(elements, function (elem) {
					return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
				});
			}

			jQuery.filter = function (expr, elems, not) {
				var elem = elems[0];

				if (not) {
					expr = ":not(" + expr + ")";
				}

				if (elems.length === 1 && elem.nodeType === 1) {
					return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
				}

				return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
					return elem.nodeType === 1;
				}));
			};

			jQuery.fn.extend({
				find: function find(selector) {
					var i,
					    ret,
					    len = this.length,
					    self = this;

					if (typeof selector !== "string") {
						return this.pushStack(jQuery(selector).filter(function () {
							for (i = 0; i < len; i++) {
								if (jQuery.contains(self[i], this)) {
									return true;
								}
							}
						}));
					}

					ret = this.pushStack([]);

					for (i = 0; i < len; i++) {
						jQuery.find(selector, self[i], ret);
					}

					return len > 1 ? jQuery.uniqueSort(ret) : ret;
				},
				filter: function filter(selector) {
					return this.pushStack(winnow(this, selector || [], false));
				},
				not: function not(selector) {
					return this.pushStack(winnow(this, selector || [], true));
				},
				is: function is(selector) {
					return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
				}
			});

			var rootjQuery,
			    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
			    init = jQuery.fn.init = function (selector, context, root) {
				var match, elem;

				if (!selector) {
					return this;
				}

				root = root || rootjQuery;

				if (typeof selector === "string") {
					if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
						match = [null, selector, null];
					} else {
						match = rquickExpr.exec(selector);
					}

					if (match && (match[1] || !context)) {
						if (match[1]) {
							context = context instanceof jQuery ? context[0] : context;

							jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

							if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
								for (match in context) {
									if (jQuery.isFunction(this[match])) {
										this[match](context[match]);
									} else {
										this.attr(match, context[match]);
									}
								}
							}

							return this;
						} else {
							elem = document.getElementById(match[2]);

							if (elem) {
								this[0] = elem;
								this.length = 1;
							}
							return this;
						}
					} else if (!context || context.jquery) {
						return (context || root).find(selector);
					} else {
						return this.constructor(context).find(selector);
					}
				} else if (selector.nodeType) {
					this[0] = selector;
					this.length = 1;
					return this;
				} else if (jQuery.isFunction(selector)) {
					return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
				}

				return jQuery.makeArray(selector, this);
			};

			init.prototype = jQuery.fn;

			rootjQuery = jQuery(document);

			var rparentsprev = /^(?:parents|prev(?:Until|All))/,
			    guaranteedUnique = {
				children: true,
				contents: true,
				next: true,
				prev: true
			};

			jQuery.fn.extend({
				has: function has(target) {
					var targets = jQuery(target, this),
					    l = targets.length;

					return this.filter(function () {
						var i = 0;
						for (; i < l; i++) {
							if (jQuery.contains(this, targets[i])) {
								return true;
							}
						}
					});
				},

				closest: function closest(selectors, context) {
					var cur,
					    i = 0,
					    l = this.length,
					    matched = [],
					    targets = typeof selectors !== "string" && jQuery(selectors);

					if (!rneedsContext.test(selectors)) {
						for (; i < l; i++) {
							for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
								if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

									matched.push(cur);
									break;
								}
							}
						}
					}

					return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
				},

				index: function index(elem) {
					if (!elem) {
						return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
					}

					if (typeof elem === "string") {
						return indexOf.call(jQuery(elem), this[0]);
					}

					return indexOf.call(this, elem.jquery ? elem[0] : elem);
				},

				add: function add(selector, context) {
					return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
				},

				addBack: function addBack(selector) {
					return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
				}
			});

			function sibling(cur, dir) {
				while ((cur = cur[dir]) && cur.nodeType !== 1) {}
				return cur;
			}

			jQuery.each({
				parent: function parent(elem) {
					var parent = elem.parentNode;
					return parent && parent.nodeType !== 11 ? parent : null;
				},
				parents: function parents(elem) {
					return dir(elem, "parentNode");
				},
				parentsUntil: function parentsUntil(elem, i, until) {
					return dir(elem, "parentNode", until);
				},
				next: function next(elem) {
					return sibling(elem, "nextSibling");
				},
				prev: function prev(elem) {
					return sibling(elem, "previousSibling");
				},
				nextAll: function nextAll(elem) {
					return dir(elem, "nextSibling");
				},
				prevAll: function prevAll(elem) {
					return dir(elem, "previousSibling");
				},
				nextUntil: function nextUntil(elem, i, until) {
					return dir(elem, "nextSibling", until);
				},
				prevUntil: function prevUntil(elem, i, until) {
					return dir(elem, "previousSibling", until);
				},
				siblings: function siblings(elem) {
					return _siblings((elem.parentNode || {}).firstChild, elem);
				},
				children: function children(elem) {
					return _siblings(elem.firstChild);
				},
				contents: function contents(elem) {
					if (nodeName(elem, "iframe")) {
						return elem.contentDocument;
					}

					if (nodeName(elem, "template")) {
						elem = elem.content || elem;
					}

					return jQuery.merge([], elem.childNodes);
				}
			}, function (name, fn) {
				jQuery.fn[name] = function (until, selector) {
					var matched = jQuery.map(this, fn, until);

					if (name.slice(-5) !== "Until") {
						selector = until;
					}

					if (selector && typeof selector === "string") {
						matched = jQuery.filter(selector, matched);
					}

					if (this.length > 1) {
						if (!guaranteedUnique[name]) {
							jQuery.uniqueSort(matched);
						}

						if (rparentsprev.test(name)) {
							matched.reverse();
						}
					}

					return this.pushStack(matched);
				};
			});
			var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

			function createOptions(options) {
				var object = {};
				jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
					object[flag] = true;
				});
				return object;
			}

			jQuery.Callbacks = function (options) {
				options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

				var firing,
				    memory,
				    _fired,
				    _locked,
				    list = [],
				    queue = [],
				    firingIndex = -1,
				    fire = function fire() {
					_locked = _locked || options.once;

					_fired = firing = true;
					for (; queue.length; firingIndex = -1) {
						memory = queue.shift();
						while (++firingIndex < list.length) {
							if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
								firingIndex = list.length;
								memory = false;
							}
						}
					}

					if (!options.memory) {
						memory = false;
					}

					firing = false;

					if (_locked) {
						if (memory) {
							list = [];
						} else {
							list = "";
						}
					}
				},
				    self = {
					add: function add() {
						if (list) {
							if (memory && !firing) {
								firingIndex = list.length - 1;
								queue.push(memory);
							}

							(function add(args) {
								jQuery.each(args, function (_, arg) {
									if (jQuery.isFunction(arg)) {
										if (!options.unique || !self.has(arg)) {
											list.push(arg);
										}
									} else if (arg && arg.length && jQuery.type(arg) !== "string") {
										add(arg);
									}
								});
							})(arguments);

							if (memory && !firing) {
								fire();
							}
						}
						return this;
					},

					remove: function remove() {
						jQuery.each(arguments, function (_, arg) {
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);

								if (index <= firingIndex) {
									firingIndex--;
								}
							}
						});
						return this;
					},

					has: function has(fn) {
						return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
					},

					empty: function empty() {
						if (list) {
							list = [];
						}
						return this;
					},

					disable: function disable() {
						_locked = queue = [];
						list = memory = "";
						return this;
					},
					disabled: function disabled() {
						return !list;
					},

					lock: function lock() {
						_locked = queue = [];
						if (!memory && !firing) {
							list = memory = "";
						}
						return this;
					},
					locked: function locked() {
						return !!_locked;
					},

					fireWith: function fireWith(context, args) {
						if (!_locked) {
							args = args || [];
							args = [context, args.slice ? args.slice() : args];
							queue.push(args);
							if (!firing) {
								fire();
							}
						}
						return this;
					},

					fire: function fire() {
						self.fireWith(this, arguments);
						return this;
					},

					fired: function fired() {
						return !!_fired;
					}
				};

				return self;
			};

			function Identity(v) {
				return v;
			}
			function Thrower(ex) {
				throw ex;
			}

			function adoptValue(value, resolve, reject, noValue) {
				var method;

				try {
					if (value && jQuery.isFunction(method = value.promise)) {
						method.call(value).done(resolve).fail(reject);
					} else if (value && jQuery.isFunction(method = value.then)) {
						method.call(value, resolve, reject);
					} else {
						resolve.apply(undefined, [value].slice(noValue));
					}
				} catch (value) {
					reject.apply(undefined, [value]);
				}
			}

			jQuery.extend({

				Deferred: function Deferred(func) {
					var tuples = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
					    _state = "pending",
					    _promise = {
						state: function state() {
							return _state;
						},
						always: function always() {
							deferred.done(arguments).fail(arguments);
							return this;
						},
						"catch": function _catch(fn) {
							return _promise.then(null, fn);
						},

						pipe: function pipe() {
							var fns = arguments;

							return jQuery.Deferred(function (newDefer) {
								jQuery.each(tuples, function (i, tuple) {
									var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

									deferred[tuple[1]](function () {
										var returned = fn && fn.apply(this, arguments);
										if (returned && jQuery.isFunction(returned.promise)) {
											returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
										} else {
											newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
										}
									});
								});
								fns = null;
							}).promise();
						},
						then: function then(onFulfilled, onRejected, onProgress) {
							var maxDepth = 0;
							function resolve(depth, deferred, handler, special) {
								return function () {
									var that = this,
									    args = arguments,
									    mightThrow = function mightThrow() {
										var returned, then;

										if (depth < maxDepth) {
											return;
										}

										returned = handler.apply(that, args);

										if (returned === deferred.promise()) {
											throw new TypeError("Thenable self-resolution");
										}

										then = returned && ((typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

										if (jQuery.isFunction(then)) {
											if (special) {
												then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
											} else {
												maxDepth++;

												then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
											}
										} else {
											if (handler !== Identity) {
												that = undefined;
												args = [returned];
											}

											(special || deferred.resolveWith)(that, args);
										}
									},
									    process = special ? mightThrow : function () {
										try {
											mightThrow();
										} catch (e) {

											if (jQuery.Deferred.exceptionHook) {
												jQuery.Deferred.exceptionHook(e, process.stackTrace);
											}

											if (depth + 1 >= maxDepth) {
												if (handler !== Thrower) {
													that = undefined;
													args = [e];
												}

												deferred.rejectWith(that, args);
											}
										}
									};

									if (depth) {
										process();
									} else {
										if (jQuery.Deferred.getStackHook) {
											process.stackTrace = jQuery.Deferred.getStackHook();
										}
										window.setTimeout(process);
									}
								};
							}

							return jQuery.Deferred(function (newDefer) {
								tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

								tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

								tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
							}).promise();
						},

						promise: function promise(obj) {
							return obj != null ? jQuery.extend(obj, _promise) : _promise;
						}
					},
					    deferred = {};

					jQuery.each(tuples, function (i, tuple) {
						var list = tuple[2],
						    stateString = tuple[5];

						_promise[tuple[1]] = list.add;

						if (stateString) {
							list.add(function () {
								_state = stateString;
							}, tuples[3 - i][2].disable, tuples[0][2].lock);
						}

						list.add(tuple[3].fire);

						deferred[tuple[0]] = function () {
							deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
							return this;
						};

						deferred[tuple[0] + "With"] = list.fireWith;
					});

					_promise.promise(deferred);

					if (func) {
						func.call(deferred, deferred);
					}

					return deferred;
				},

				when: function when(singleValue) {
					var remaining = arguments.length,
					    i = remaining,
					    resolveContexts = Array(i),
					    resolveValues = _slice.call(arguments),
					    master = jQuery.Deferred(),
					    updateFunc = function updateFunc(i) {
						return function (value) {
							resolveContexts[i] = this;
							resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
							if (! --remaining) {
								master.resolveWith(resolveContexts, resolveValues);
							}
						};
					};

					if (remaining <= 1) {
						adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

						if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

							return master.then();
						}
					}

					while (i--) {
						adoptValue(resolveValues[i], updateFunc(i), master.reject);
					}

					return master.promise();
				}
			});

			var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

			jQuery.Deferred.exceptionHook = function (error, stack) {
				if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
					window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
				}
			};

			jQuery.readyException = function (error) {
				window.setTimeout(function () {
					throw error;
				});
			};

			var readyList = jQuery.Deferred();

			jQuery.fn.ready = function (fn) {

				readyList.then(fn).catch(function (error) {
					jQuery.readyException(error);
				});

				return this;
			};

			jQuery.extend({
				isReady: false,

				readyWait: 1,

				ready: function ready(wait) {
					if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
						return;
					}

					jQuery.isReady = true;

					if (wait !== true && --jQuery.readyWait > 0) {
						return;
					}

					readyList.resolveWith(document, [jQuery]);
				}
			});

			jQuery.ready.then = readyList.then;

			function completed() {
				document.removeEventListener("DOMContentLoaded", completed);
				window.removeEventListener("load", completed);
				jQuery.ready();
			}

			if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
				window.setTimeout(jQuery.ready);
			} else {
				document.addEventListener("DOMContentLoaded", completed);

				window.addEventListener("load", completed);
			}

			var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
				var i = 0,
				    len = elems.length,
				    bulk = key == null;

				if (jQuery.type(key) === "object") {
					chainable = true;
					for (i in key) {
						access(elems, fn, i, key[i], true, emptyGet, raw);
					}
				} else if (value !== undefined) {
					chainable = true;

					if (!jQuery.isFunction(value)) {
						raw = true;
					}

					if (bulk) {
						if (raw) {
							fn.call(elems, value);
							fn = null;
						} else {
							bulk = fn;
							fn = function fn(elem, key, value) {
								return bulk.call(jQuery(elem), value);
							};
						}
					}

					if (fn) {
						for (; i < len; i++) {
							fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
						}
					}
				}

				if (chainable) {
					return elems;
				}

				if (bulk) {
					return fn.call(elems);
				}

				return len ? fn(elems[0], key) : emptyGet;
			};
			var acceptData = function acceptData(owner) {
				return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
			};

			function Data() {
				this.expando = jQuery.expando + Data.uid++;
			}

			Data.uid = 1;

			Data.prototype = {

				cache: function cache(owner) {
					var value = owner[this.expando];

					if (!value) {
						value = {};

						if (acceptData(owner)) {
							if (owner.nodeType) {
								owner[this.expando] = value;
							} else {
								Object.defineProperty(owner, this.expando, {
									value: value,
									configurable: true
								});
							}
						}
					}

					return value;
				},
				set: function set(owner, data, value) {
					var prop,
					    cache = this.cache(owner);

					if (typeof data === "string") {
						cache[jQuery.camelCase(data)] = value;
					} else {
						for (prop in data) {
							cache[jQuery.camelCase(prop)] = data[prop];
						}
					}
					return cache;
				},
				get: function get(owner, key) {
					return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
				},
				access: function access(owner, key, value) {
					if (key === undefined || key && typeof key === "string" && value === undefined) {

						return this.get(owner, key);
					}

					this.set(owner, key, value);

					return value !== undefined ? value : key;
				},
				remove: function remove(owner, key) {
					var i,
					    cache = owner[this.expando];

					if (cache === undefined) {
						return;
					}

					if (key !== undefined) {
						if (Array.isArray(key)) {
							key = key.map(jQuery.camelCase);
						} else {
							key = jQuery.camelCase(key);

							key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
						}

						i = key.length;

						while (i--) {
							delete cache[key[i]];
						}
					}

					if (key === undefined || jQuery.isEmptyObject(cache)) {
						if (owner.nodeType) {
							owner[this.expando] = undefined;
						} else {
							delete owner[this.expando];
						}
					}
				},
				hasData: function hasData(owner) {
					var cache = owner[this.expando];
					return cache !== undefined && !jQuery.isEmptyObject(cache);
				}
			};
			var dataPriv = new Data();

			var dataUser = new Data();

			var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			    rmultiDash = /[A-Z]/g;

			function getData(data) {
				if (data === "true") {
					return true;
				}

				if (data === "false") {
					return false;
				}

				if (data === "null") {
					return null;
				}

				if (data === +data + "") {
					return +data;
				}

				if (rbrace.test(data)) {
					return JSON.parse(data);
				}

				return data;
			}

			function dataAttr(elem, key, data) {
				var name;

				if (data === undefined && elem.nodeType === 1) {
					name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
					data = elem.getAttribute(name);

					if (typeof data === "string") {
						try {
							data = getData(data);
						} catch (e) {}

						dataUser.set(elem, key, data);
					} else {
						data = undefined;
					}
				}
				return data;
			}

			jQuery.extend({
				hasData: function hasData(elem) {
					return dataUser.hasData(elem) || dataPriv.hasData(elem);
				},

				data: function data(elem, name, _data) {
					return dataUser.access(elem, name, _data);
				},

				removeData: function removeData(elem, name) {
					dataUser.remove(elem, name);
				},

				_data: function _data(elem, name, data) {
					return dataPriv.access(elem, name, data);
				},

				_removeData: function _removeData(elem, name) {
					dataPriv.remove(elem, name);
				}
			});

			jQuery.fn.extend({
				data: function data(key, value) {
					var i,
					    name,
					    data,
					    elem = this[0],
					    attrs = elem && elem.attributes;

					if (key === undefined) {
						if (this.length) {
							data = dataUser.get(elem);

							if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
								i = attrs.length;
								while (i--) {
									if (attrs[i]) {
										name = attrs[i].name;
										if (name.indexOf("data-") === 0) {
											name = jQuery.camelCase(name.slice(5));
											dataAttr(elem, name, data[name]);
										}
									}
								}
								dataPriv.set(elem, "hasDataAttrs", true);
							}
						}

						return data;
					}

					if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
						return this.each(function () {
							dataUser.set(this, key);
						});
					}

					return access(this, function (value) {
						var data;

						if (elem && value === undefined) {
							data = dataUser.get(elem, key);
							if (data !== undefined) {
								return data;
							}

							data = dataAttr(elem, key);
							if (data !== undefined) {
								return data;
							}

							return;
						}

						this.each(function () {
							dataUser.set(this, key, value);
						});
					}, null, value, arguments.length > 1, null, true);
				},

				removeData: function removeData(key) {
					return this.each(function () {
						dataUser.remove(this, key);
					});
				}
			});

			jQuery.extend({
				queue: function queue(elem, type, data) {
					var queue;

					if (elem) {
						type = (type || "fx") + "queue";
						queue = dataPriv.get(elem, type);

						if (data) {
							if (!queue || Array.isArray(data)) {
								queue = dataPriv.access(elem, type, jQuery.makeArray(data));
							} else {
								queue.push(data);
							}
						}
						return queue || [];
					}
				},

				dequeue: function dequeue(elem, type) {
					type = type || "fx";

					var queue = jQuery.queue(elem, type),
					    startLength = queue.length,
					    fn = queue.shift(),
					    hooks = jQuery._queueHooks(elem, type),
					    next = function next() {
						jQuery.dequeue(elem, type);
					};

					if (fn === "inprogress") {
						fn = queue.shift();
						startLength--;
					}

					if (fn) {
						if (type === "fx") {
							queue.unshift("inprogress");
						}

						delete hooks.stop;
						fn.call(elem, next, hooks);
					}

					if (!startLength && hooks) {
						hooks.empty.fire();
					}
				},

				_queueHooks: function _queueHooks(elem, type) {
					var key = type + "queueHooks";
					return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
						empty: jQuery.Callbacks("once memory").add(function () {
							dataPriv.remove(elem, [type + "queue", key]);
						})
					});
				}
			});

			jQuery.fn.extend({
				queue: function queue(type, data) {
					var setter = 2;

					if (typeof type !== "string") {
						data = type;
						type = "fx";
						setter--;
					}

					if (arguments.length < setter) {
						return jQuery.queue(this[0], type);
					}

					return data === undefined ? this : this.each(function () {
						var queue = jQuery.queue(this, type, data);

						jQuery._queueHooks(this, type);

						if (type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
					});
				},
				dequeue: function dequeue(type) {
					return this.each(function () {
						jQuery.dequeue(this, type);
					});
				},
				clearQueue: function clearQueue(type) {
					return this.queue(type || "fx", []);
				},

				promise: function promise(type, obj) {
					var tmp,
					    count = 1,
					    defer = jQuery.Deferred(),
					    elements = this,
					    i = this.length,
					    resolve = function resolve() {
						if (! --count) {
							defer.resolveWith(elements, [elements]);
						}
					};

					if (typeof type !== "string") {
						obj = type;
						type = undefined;
					}
					type = type || "fx";

					while (i--) {
						tmp = dataPriv.get(elements[i], type + "queueHooks");
						if (tmp && tmp.empty) {
							count++;
							tmp.empty.add(resolve);
						}
					}
					resolve();
					return defer.promise(obj);
				}
			});
			var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

			var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

			var cssExpand = ["Top", "Right", "Bottom", "Left"];

			var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {
				elem = el || elem;

				return elem.style.display === "none" || elem.style.display === "" && jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
			};

			var swap = function swap(elem, options, callback, args) {
				var ret,
				    name,
				    old = {};

				for (name in options) {
					old[name] = elem.style[name];
					elem.style[name] = options[name];
				}

				ret = callback.apply(elem, args || []);

				for (name in options) {
					elem.style[name] = old[name];
				}

				return ret;
			};

			function adjustCSS(elem, prop, valueParts, tween) {
				var adjusted,
				    scale = 1,
				    maxIterations = 20,
				    currentValue = tween ? function () {
					return tween.cur();
				} : function () {
					return jQuery.css(elem, prop, "");
				},
				    initial = currentValue(),
				    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
				    initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

				if (initialInUnit && initialInUnit[3] !== unit) {
					unit = unit || initialInUnit[3];

					valueParts = valueParts || [];

					initialInUnit = +initial || 1;

					do {
						scale = scale || ".5";

						initialInUnit = initialInUnit / scale;
						jQuery.style(elem, prop, initialInUnit + unit);
					} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
				}

				if (valueParts) {
					initialInUnit = +initialInUnit || +initial || 0;

					adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
					if (tween) {
						tween.unit = unit;
						tween.start = initialInUnit;
						tween.end = adjusted;
					}
				}
				return adjusted;
			}

			var defaultDisplayMap = {};

			function getDefaultDisplay(elem) {
				var temp,
				    doc = elem.ownerDocument,
				    nodeName = elem.nodeName,
				    display = defaultDisplayMap[nodeName];

				if (display) {
					return display;
				}

				temp = doc.body.appendChild(doc.createElement(nodeName));
				display = jQuery.css(temp, "display");

				temp.parentNode.removeChild(temp);

				if (display === "none") {
					display = "block";
				}
				defaultDisplayMap[nodeName] = display;

				return display;
			}

			function showHide(elements, show) {
				var display,
				    elem,
				    values = [],
				    index = 0,
				    length = elements.length;

				for (; index < length; index++) {
					elem = elements[index];
					if (!elem.style) {
						continue;
					}

					display = elem.style.display;
					if (show) {
						if (display === "none") {
							values[index] = dataPriv.get(elem, "display") || null;
							if (!values[index]) {
								elem.style.display = "";
							}
						}
						if (elem.style.display === "" && isHiddenWithinTree(elem)) {
							values[index] = getDefaultDisplay(elem);
						}
					} else {
						if (display !== "none") {
							values[index] = "none";

							dataPriv.set(elem, "display", display);
						}
					}
				}

				for (index = 0; index < length; index++) {
					if (values[index] != null) {
						elements[index].style.display = values[index];
					}
				}

				return elements;
			}

			jQuery.fn.extend({
				show: function show() {
					return showHide(this, true);
				},
				hide: function hide() {
					return showHide(this);
				},
				toggle: function toggle(state) {
					if (typeof state === "boolean") {
						return state ? this.show() : this.hide();
					}

					return this.each(function () {
						if (isHiddenWithinTree(this)) {
							jQuery(this).show();
						} else {
							jQuery(this).hide();
						}
					});
				}
			});
			var rcheckableType = /^(?:checkbox|radio)$/i;

			var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

			var rscriptType = /^$|\/(?:java|ecma)script/i;

			var wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],

				thead: [1, "<table>", "</table>"],
				col: [2, "<table><colgroup>", "</colgroup></table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

				_default: [0, "", ""]
			};

			wrapMap.optgroup = wrapMap.option;

			wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
			wrapMap.th = wrapMap.td;

			function getAll(context, tag) {
				var ret;

				if (typeof context.getElementsByTagName !== "undefined") {
					ret = context.getElementsByTagName(tag || "*");
				} else if (typeof context.querySelectorAll !== "undefined") {
					ret = context.querySelectorAll(tag || "*");
				} else {
					ret = [];
				}

				if (tag === undefined || tag && nodeName(context, tag)) {
					return jQuery.merge([context], ret);
				}

				return ret;
			}

			function setGlobalEval(elems, refElements) {
				var i = 0,
				    l = elems.length;

				for (; i < l; i++) {
					dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
				}
			}

			var rhtml = /<|&#?\w+;/;

			function buildFragment(elems, context, scripts, selection, ignored) {
				var elem,
				    tmp,
				    tag,
				    wrap,
				    contains,
				    j,
				    fragment = context.createDocumentFragment(),
				    nodes = [],
				    i = 0,
				    l = elems.length;

				for (; i < l; i++) {
					elem = elems[i];

					if (elem || elem === 0) {
						if (jQuery.type(elem) === "object") {
							jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
						} else if (!rhtml.test(elem)) {
							nodes.push(context.createTextNode(elem));
						} else {
							tmp = tmp || fragment.appendChild(context.createElement("div"));

							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;
							tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild;
							}

							jQuery.merge(nodes, tmp.childNodes);

							tmp = fragment.firstChild;

							tmp.textContent = "";
						}
					}
				}

				fragment.textContent = "";

				i = 0;
				while (elem = nodes[i++]) {
					if (selection && jQuery.inArray(elem, selection) > -1) {
						if (ignored) {
							ignored.push(elem);
						}
						continue;
					}

					contains = jQuery.contains(elem.ownerDocument, elem);

					tmp = getAll(fragment.appendChild(elem), "script");

					if (contains) {
						setGlobalEval(tmp);
					}

					if (scripts) {
						j = 0;
						while (elem = tmp[j++]) {
							if (rscriptType.test(elem.type || "")) {
								scripts.push(elem);
							}
						}
					}
				}

				return fragment;
			}

			(function () {
				var fragment = document.createDocumentFragment(),
				    div = fragment.appendChild(document.createElement("div")),
				    input = document.createElement("input");

				input.setAttribute("type", "radio");
				input.setAttribute("checked", "checked");
				input.setAttribute("name", "t");

				div.appendChild(input);

				support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

				div.innerHTML = "<textarea>x</textarea>";
				support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
			})();
			var documentElement = document.documentElement;

			var rkeyEvent = /^key/,
			    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

			function returnTrue() {
				return true;
			}

			function returnFalse() {
				return false;
			}

			function safeActiveElement() {
				try {
					return document.activeElement;
				} catch (err) {}
			}

			function _on(elem, types, selector, data, fn, one) {
				var origFn, type;

				if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
					if (typeof selector !== "string") {
						data = data || selector;
						selector = undefined;
					}
					for (type in types) {
						_on(elem, type, selector, data, types[type], one);
					}
					return elem;
				}

				if (data == null && fn == null) {
					fn = selector;
					data = selector = undefined;
				} else if (fn == null) {
					if (typeof selector === "string") {
						fn = data;
						data = undefined;
					} else {
						fn = data;
						data = selector;
						selector = undefined;
					}
				}
				if (fn === false) {
					fn = returnFalse;
				} else if (!fn) {
					return elem;
				}

				if (one === 1) {
					origFn = fn;
					fn = function fn(event) {
						jQuery().off(event);
						return origFn.apply(this, arguments);
					};

					fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
				}
				return elem.each(function () {
					jQuery.event.add(this, types, fn, data, selector);
				});
			}

			jQuery.event = {

				global: {},

				add: function add(elem, types, handler, data, selector) {

					var handleObjIn,
					    eventHandle,
					    tmp,
					    events,
					    t,
					    handleObj,
					    special,
					    handlers,
					    type,
					    namespaces,
					    origType,
					    elemData = dataPriv.get(elem);

					if (!elemData) {
						return;
					}

					if (handler.handler) {
						handleObjIn = handler;
						handler = handleObjIn.handler;
						selector = handleObjIn.selector;
					}

					if (selector) {
						jQuery.find.matchesSelector(documentElement, selector);
					}

					if (!handler.guid) {
						handler.guid = jQuery.guid++;
					}

					if (!(events = elemData.events)) {
						events = elemData.events = {};
					}
					if (!(eventHandle = elemData.handle)) {
						eventHandle = elemData.handle = function (e) {
							return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
						};
					}

					types = (types || "").match(rnothtmlwhite) || [""];
					t = types.length;
					while (t--) {
						tmp = rtypenamespace.exec(types[t]) || [];
						type = origType = tmp[1];
						namespaces = (tmp[2] || "").split(".").sort();

						if (!type) {
							continue;
						}

						special = jQuery.event.special[type] || {};

						type = (selector ? special.delegateType : special.bindType) || type;

						special = jQuery.event.special[type] || {};

						handleObj = jQuery.extend({
							type: type,
							origType: origType,
							data: data,
							handler: handler,
							guid: handler.guid,
							selector: selector,
							needsContext: selector && jQuery.expr.match.needsContext.test(selector),
							namespace: namespaces.join(".")
						}, handleObjIn);

						if (!(handlers = events[type])) {
							handlers = events[type] = [];
							handlers.delegateCount = 0;

							if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

								if (elem.addEventListener) {
									elem.addEventListener(type, eventHandle);
								}
							}
						}

						if (special.add) {
							special.add.call(elem, handleObj);

							if (!handleObj.handler.guid) {
								handleObj.handler.guid = handler.guid;
							}
						}

						if (selector) {
							handlers.splice(handlers.delegateCount++, 0, handleObj);
						} else {
							handlers.push(handleObj);
						}

						jQuery.event.global[type] = true;
					}
				},

				remove: function remove(elem, types, handler, selector, mappedTypes) {

					var j,
					    origCount,
					    tmp,
					    events,
					    t,
					    handleObj,
					    special,
					    handlers,
					    type,
					    namespaces,
					    origType,
					    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

					if (!elemData || !(events = elemData.events)) {
						return;
					}

					types = (types || "").match(rnothtmlwhite) || [""];
					t = types.length;
					while (t--) {
						tmp = rtypenamespace.exec(types[t]) || [];
						type = origType = tmp[1];
						namespaces = (tmp[2] || "").split(".").sort();

						if (!type) {
							for (type in events) {
								jQuery.event.remove(elem, type + types[t], handler, selector, true);
							}
							continue;
						}

						special = jQuery.event.special[type] || {};
						type = (selector ? special.delegateType : special.bindType) || type;
						handlers = events[type] || [];
						tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

						origCount = j = handlers.length;
						while (j--) {
							handleObj = handlers[j];

							if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
								handlers.splice(j, 1);

								if (handleObj.selector) {
									handlers.delegateCount--;
								}
								if (special.remove) {
									special.remove.call(elem, handleObj);
								}
							}
						}

						if (origCount && !handlers.length) {
							if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

								jQuery.removeEvent(elem, type, elemData.handle);
							}

							delete events[type];
						}
					}

					if (jQuery.isEmptyObject(events)) {
						dataPriv.remove(elem, "handle events");
					}
				},

				dispatch: function dispatch(nativeEvent) {
					var event = jQuery.event.fix(nativeEvent);

					var i,
					    j,
					    ret,
					    matched,
					    handleObj,
					    handlerQueue,
					    args = new Array(arguments.length),
					    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
					    special = jQuery.event.special[event.type] || {};

					args[0] = event;

					for (i = 1; i < arguments.length; i++) {
						args[i] = arguments[i];
					}

					event.delegateTarget = this;

					if (special.preDispatch && special.preDispatch.call(this, event) === false) {
						return;
					}

					handlerQueue = jQuery.event.handlers.call(this, event, handlers);

					i = 0;
					while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
						event.currentTarget = matched.elem;

						j = 0;
						while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
							if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

								event.handleObj = handleObj;
								event.data = handleObj.data;

								ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

								if (ret !== undefined) {
									if ((event.result = ret) === false) {
										event.preventDefault();
										event.stopPropagation();
									}
								}
							}
						}
					}

					if (special.postDispatch) {
						special.postDispatch.call(this, event);
					}

					return event.result;
				},

				handlers: function handlers(event, _handlers) {
					var i,
					    handleObj,
					    sel,
					    matchedHandlers,
					    matchedSelectors,
					    handlerQueue = [],
					    delegateCount = _handlers.delegateCount,
					    cur = event.target;

					if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {

						for (; cur !== this; cur = cur.parentNode || this) {
							if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
								matchedHandlers = [];
								matchedSelectors = {};
								for (i = 0; i < delegateCount; i++) {
									handleObj = _handlers[i];

									sel = handleObj.selector + " ";

									if (matchedSelectors[sel] === undefined) {
										matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
									}
									if (matchedSelectors[sel]) {
										matchedHandlers.push(handleObj);
									}
								}
								if (matchedHandlers.length) {
									handlerQueue.push({ elem: cur, handlers: matchedHandlers });
								}
							}
						}
					}

					cur = this;
					if (delegateCount < _handlers.length) {
						handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
					}

					return handlerQueue;
				},

				addProp: function addProp(name, hook) {
					Object.defineProperty(jQuery.Event.prototype, name, {
						enumerable: true,
						configurable: true,

						get: jQuery.isFunction(hook) ? function () {
							if (this.originalEvent) {
								return hook(this.originalEvent);
							}
						} : function () {
							if (this.originalEvent) {
								return this.originalEvent[name];
							}
						},

						set: function set(value) {
							Object.defineProperty(this, name, {
								enumerable: true,
								configurable: true,
								writable: true,
								value: value
							});
						}
					});
				},

				fix: function fix(originalEvent) {
					return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
				},

				special: {
					load: {
						noBubble: true
					},
					focus: {
						trigger: function trigger() {
							if (this !== safeActiveElement() && this.focus) {
								this.focus();
								return false;
							}
						},
						delegateType: "focusin"
					},
					blur: {
						trigger: function trigger() {
							if (this === safeActiveElement() && this.blur) {
								this.blur();
								return false;
							}
						},
						delegateType: "focusout"
					},
					click: {
						trigger: function trigger() {
							if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
								this.click();
								return false;
							}
						},

						_default: function _default(event) {
							return nodeName(event.target, "a");
						}
					},

					beforeunload: {
						postDispatch: function postDispatch(event) {
							if (event.result !== undefined && event.originalEvent) {
								event.originalEvent.returnValue = event.result;
							}
						}
					}
				}
			};

			jQuery.removeEvent = function (elem, type, handle) {
				if (elem.removeEventListener) {
					elem.removeEventListener(type, handle);
				}
			};

			jQuery.Event = function (src, props) {
				if (!(this instanceof jQuery.Event)) {
					return new jQuery.Event(src, props);
				}

				if (src && src.type) {
					this.originalEvent = src;
					this.type = src.type;

					this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;

					this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

					this.currentTarget = src.currentTarget;
					this.relatedTarget = src.relatedTarget;
				} else {
					this.type = src;
				}

				if (props) {
					jQuery.extend(this, props);
				}

				this.timeStamp = src && src.timeStamp || jQuery.now();

				this[jQuery.expando] = true;
			};

			jQuery.Event.prototype = {
				constructor: jQuery.Event,
				isDefaultPrevented: returnFalse,
				isPropagationStopped: returnFalse,
				isImmediatePropagationStopped: returnFalse,
				isSimulated: false,

				preventDefault: function preventDefault() {
					var e = this.originalEvent;

					this.isDefaultPrevented = returnTrue;

					if (e && !this.isSimulated) {
						e.preventDefault();
					}
				},
				stopPropagation: function stopPropagation() {
					var e = this.originalEvent;

					this.isPropagationStopped = returnTrue;

					if (e && !this.isSimulated) {
						e.stopPropagation();
					}
				},
				stopImmediatePropagation: function stopImmediatePropagation() {
					var e = this.originalEvent;

					this.isImmediatePropagationStopped = returnTrue;

					if (e && !this.isSimulated) {
						e.stopImmediatePropagation();
					}

					this.stopPropagation();
				}
			};

			jQuery.each({
				altKey: true,
				bubbles: true,
				cancelable: true,
				changedTouches: true,
				ctrlKey: true,
				detail: true,
				eventPhase: true,
				metaKey: true,
				pageX: true,
				pageY: true,
				shiftKey: true,
				view: true,
				"char": true,
				charCode: true,
				key: true,
				keyCode: true,
				button: true,
				buttons: true,
				clientX: true,
				clientY: true,
				offsetX: true,
				offsetY: true,
				pointerId: true,
				pointerType: true,
				screenX: true,
				screenY: true,
				targetTouches: true,
				toElement: true,
				touches: true,

				which: function which(event) {
					var button = event.button;

					if (event.which == null && rkeyEvent.test(event.type)) {
						return event.charCode != null ? event.charCode : event.keyCode;
					}

					if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
						if (button & 1) {
							return 1;
						}

						if (button & 2) {
							return 3;
						}

						if (button & 4) {
							return 2;
						}

						return 0;
					}

					return event.which;
				}
			}, jQuery.event.addProp);

			jQuery.each({
				mouseenter: "mouseover",
				mouseleave: "mouseout",
				pointerenter: "pointerover",
				pointerleave: "pointerout"
			}, function (orig, fix) {
				jQuery.event.special[orig] = {
					delegateType: fix,
					bindType: fix,

					handle: function handle(event) {
						var ret,
						    target = this,
						    related = event.relatedTarget,
						    handleObj = event.handleObj;

						if (!related || related !== target && !jQuery.contains(target, related)) {
							event.type = handleObj.origType;
							ret = handleObj.handler.apply(this, arguments);
							event.type = fix;
						}
						return ret;
					}
				};
			});

			jQuery.fn.extend({

				on: function on(types, selector, data, fn) {
					return _on(this, types, selector, data, fn);
				},
				one: function one(types, selector, data, fn) {
					return _on(this, types, selector, data, fn, 1);
				},
				off: function off(types, selector, fn) {
					var handleObj, type;
					if (types && types.preventDefault && types.handleObj) {
						handleObj = types.handleObj;
						jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
						return this;
					}
					if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
						for (type in types) {
							this.off(type, selector, types[type]);
						}
						return this;
					}
					if (selector === false || typeof selector === "function") {
						fn = selector;
						selector = undefined;
					}
					if (fn === false) {
						fn = returnFalse;
					}
					return this.each(function () {
						jQuery.event.remove(this, types, fn, selector);
					});
				}
			});

			var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
			    rnoInnerhtml = /<script|<style|<link/i,
			    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
			    rscriptTypeMasked = /^true\/(.*)/,
			    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

			function manipulationTarget(elem, content) {
				if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

					return jQuery(">tbody", elem)[0] || elem;
				}

				return elem;
			}

			function disableScript(elem) {
				elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
				return elem;
			}
			function restoreScript(elem) {
				var match = rscriptTypeMasked.exec(elem.type);

				if (match) {
					elem.type = match[1];
				} else {
					elem.removeAttribute("type");
				}

				return elem;
			}

			function cloneCopyEvent(src, dest) {
				var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

				if (dest.nodeType !== 1) {
					return;
				}

				if (dataPriv.hasData(src)) {
					pdataOld = dataPriv.access(src);
					pdataCur = dataPriv.set(dest, pdataOld);
					events = pdataOld.events;

					if (events) {
						delete pdataCur.handle;
						pdataCur.events = {};

						for (type in events) {
							for (i = 0, l = events[type].length; i < l; i++) {
								jQuery.event.add(dest, type, events[type][i]);
							}
						}
					}
				}

				if (dataUser.hasData(src)) {
					udataOld = dataUser.access(src);
					udataCur = jQuery.extend({}, udataOld);

					dataUser.set(dest, udataCur);
				}
			}

			function fixInput(src, dest) {
				var nodeName = dest.nodeName.toLowerCase();

				if (nodeName === "input" && rcheckableType.test(src.type)) {
					dest.checked = src.checked;
				} else if (nodeName === "input" || nodeName === "textarea") {
					dest.defaultValue = src.defaultValue;
				}
			}

			function domManip(collection, args, callback, ignored) {
				args = concat.apply([], args);

				var fragment,
				    first,
				    scripts,
				    hasScripts,
				    node,
				    doc,
				    i = 0,
				    l = collection.length,
				    iNoClone = l - 1,
				    value = args[0],
				    isFunction = jQuery.isFunction(value);

				if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
					return collection.each(function (index) {
						var self = collection.eq(index);
						if (isFunction) {
							args[0] = value.call(this, index, self.html());
						}
						domManip(self, args, callback, ignored);
					});
				}

				if (l) {
					fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
					first = fragment.firstChild;

					if (fragment.childNodes.length === 1) {
						fragment = first;
					}

					if (first || ignored) {
						scripts = jQuery.map(getAll(fragment, "script"), disableScript);
						hasScripts = scripts.length;

						for (; i < l; i++) {
							node = fragment;

							if (i !== iNoClone) {
								node = jQuery.clone(node, true, true);

								if (hasScripts) {
									jQuery.merge(scripts, getAll(node, "script"));
								}
							}

							callback.call(collection[i], node, i);
						}

						if (hasScripts) {
							doc = scripts[scripts.length - 1].ownerDocument;

							jQuery.map(scripts, restoreScript);

							for (i = 0; i < hasScripts; i++) {
								node = scripts[i];
								if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

									if (node.src) {
										if (jQuery._evalUrl) {
											jQuery._evalUrl(node.src);
										}
									} else {
										DOMEval(node.textContent.replace(rcleanScript, ""), doc);
									}
								}
							}
						}
					}
				}

				return collection;
			}

			function _remove(elem, selector, keepData) {
				var node,
				    nodes = selector ? jQuery.filter(selector, elem) : elem,
				    i = 0;

				for (; (node = nodes[i]) != null; i++) {
					if (!keepData && node.nodeType === 1) {
						jQuery.cleanData(getAll(node));
					}

					if (node.parentNode) {
						if (keepData && jQuery.contains(node.ownerDocument, node)) {
							setGlobalEval(getAll(node, "script"));
						}
						node.parentNode.removeChild(node);
					}
				}

				return elem;
			}

			jQuery.extend({
				htmlPrefilter: function htmlPrefilter(html) {
					return html.replace(rxhtmlTag, "<$1></$2>");
				},

				clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
					var i,
					    l,
					    srcElements,
					    destElements,
					    clone = elem.cloneNode(true),
					    inPage = jQuery.contains(elem.ownerDocument, elem);

					if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
						destElements = getAll(clone);
						srcElements = getAll(elem);

						for (i = 0, l = srcElements.length; i < l; i++) {
							fixInput(srcElements[i], destElements[i]);
						}
					}

					if (dataAndEvents) {
						if (deepDataAndEvents) {
							srcElements = srcElements || getAll(elem);
							destElements = destElements || getAll(clone);

							for (i = 0, l = srcElements.length; i < l; i++) {
								cloneCopyEvent(srcElements[i], destElements[i]);
							}
						} else {
							cloneCopyEvent(elem, clone);
						}
					}

					destElements = getAll(clone, "script");
					if (destElements.length > 0) {
						setGlobalEval(destElements, !inPage && getAll(elem, "script"));
					}

					return clone;
				},

				cleanData: function cleanData(elems) {
					var data,
					    elem,
					    type,
					    special = jQuery.event.special,
					    i = 0;

					for (; (elem = elems[i]) !== undefined; i++) {
						if (acceptData(elem)) {
							if (data = elem[dataPriv.expando]) {
								if (data.events) {
									for (type in data.events) {
										if (special[type]) {
											jQuery.event.remove(elem, type);
										} else {
											jQuery.removeEvent(elem, type, data.handle);
										}
									}
								}

								elem[dataPriv.expando] = undefined;
							}
							if (elem[dataUser.expando]) {
								elem[dataUser.expando] = undefined;
							}
						}
					}
				}
			});

			jQuery.fn.extend({
				detach: function detach(selector) {
					return _remove(this, selector, true);
				},

				remove: function remove(selector) {
					return _remove(this, selector);
				},

				text: function text(value) {
					return access(this, function (value) {
						return value === undefined ? jQuery.text(this) : this.empty().each(function () {
							if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
								this.textContent = value;
							}
						});
					}, null, value, arguments.length);
				},

				append: function append() {
					return domManip(this, arguments, function (elem) {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							var target = manipulationTarget(this, elem);
							target.appendChild(elem);
						}
					});
				},

				prepend: function prepend() {
					return domManip(this, arguments, function (elem) {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							var target = manipulationTarget(this, elem);
							target.insertBefore(elem, target.firstChild);
						}
					});
				},

				before: function before() {
					return domManip(this, arguments, function (elem) {
						if (this.parentNode) {
							this.parentNode.insertBefore(elem, this);
						}
					});
				},

				after: function after() {
					return domManip(this, arguments, function (elem) {
						if (this.parentNode) {
							this.parentNode.insertBefore(elem, this.nextSibling);
						}
					});
				},

				empty: function empty() {
					var elem,
					    i = 0;

					for (; (elem = this[i]) != null; i++) {
						if (elem.nodeType === 1) {
							jQuery.cleanData(getAll(elem, false));

							elem.textContent = "";
						}
					}

					return this;
				},

				clone: function clone(dataAndEvents, deepDataAndEvents) {
					dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
					deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

					return this.map(function () {
						return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
					});
				},

				html: function html(value) {
					return access(this, function (value) {
						var elem = this[0] || {},
						    i = 0,
						    l = this.length;

						if (value === undefined && elem.nodeType === 1) {
							return elem.innerHTML;
						}

						if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

							value = jQuery.htmlPrefilter(value);

							try {
								for (; i < l; i++) {
									elem = this[i] || {};

									if (elem.nodeType === 1) {
										jQuery.cleanData(getAll(elem, false));
										elem.innerHTML = value;
									}
								}

								elem = 0;
							} catch (e) {}
						}

						if (elem) {
							this.empty().append(value);
						}
					}, null, value, arguments.length);
				},

				replaceWith: function replaceWith() {
					var ignored = [];

					return domManip(this, arguments, function (elem) {
						var parent = this.parentNode;

						if (jQuery.inArray(this, ignored) < 0) {
							jQuery.cleanData(getAll(this));
							if (parent) {
								parent.replaceChild(elem, this);
							}
						}
					}, ignored);
				}
			});

			jQuery.each({
				appendTo: "append",
				prependTo: "prepend",
				insertBefore: "before",
				insertAfter: "after",
				replaceAll: "replaceWith"
			}, function (name, original) {
				jQuery.fn[name] = function (selector) {
					var elems,
					    ret = [],
					    insert = jQuery(selector),
					    last = insert.length - 1,
					    i = 0;

					for (; i <= last; i++) {
						elems = i === last ? this : this.clone(true);
						jQuery(insert[i])[original](elems);

						push.apply(ret, elems.get());
					}

					return this.pushStack(ret);
				};
			});
			var rmargin = /^margin/;

			var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

			var getStyles = function getStyles(elem) {
				var view = elem.ownerDocument.defaultView;

				if (!view || !view.opener) {
					view = window;
				}

				return view.getComputedStyle(elem);
			};

			(function () {
				function computeStyleTests() {
					if (!div) {
						return;
					}

					div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
					div.innerHTML = "";
					documentElement.appendChild(container);

					var divStyle = window.getComputedStyle(div);
					pixelPositionVal = divStyle.top !== "1%";

					reliableMarginLeftVal = divStyle.marginLeft === "2px";
					boxSizingReliableVal = divStyle.width === "4px";

					div.style.marginRight = "50%";
					pixelMarginRightVal = divStyle.marginRight === "4px";

					documentElement.removeChild(container);

					div = null;
				}

				var pixelPositionVal,
				    boxSizingReliableVal,
				    pixelMarginRightVal,
				    reliableMarginLeftVal,
				    container = document.createElement("div"),
				    div = document.createElement("div");

				if (!div.style) {
					return;
				}

				div.style.backgroundClip = "content-box";
				div.cloneNode(true).style.backgroundClip = "";
				support.clearCloneStyle = div.style.backgroundClip === "content-box";

				container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
				container.appendChild(div);

				jQuery.extend(support, {
					pixelPosition: function pixelPosition() {
						computeStyleTests();
						return pixelPositionVal;
					},
					boxSizingReliable: function boxSizingReliable() {
						computeStyleTests();
						return boxSizingReliableVal;
					},
					pixelMarginRight: function pixelMarginRight() {
						computeStyleTests();
						return pixelMarginRightVal;
					},
					reliableMarginLeft: function reliableMarginLeft() {
						computeStyleTests();
						return reliableMarginLeftVal;
					}
				});
			})();

			function curCSS(elem, name, computed) {
				var width,
				    minWidth,
				    maxWidth,
				    ret,
				    style = elem.style;

				computed = computed || getStyles(elem);

				if (computed) {
					ret = computed.getPropertyValue(name) || computed[name];

					if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
						ret = jQuery.style(elem, name);
					}

					if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
						width = style.width;
						minWidth = style.minWidth;
						maxWidth = style.maxWidth;

						style.minWidth = style.maxWidth = style.width = ret;
						ret = computed.width;

						style.width = width;
						style.minWidth = minWidth;
						style.maxWidth = maxWidth;
					}
				}

				return ret !== undefined ? ret + "" : ret;
			}

			function addGetHookIf(conditionFn, hookFn) {
				return {
					get: function get() {
						if (conditionFn()) {
							delete this.get;
							return;
						}

						return (this.get = hookFn).apply(this, arguments);
					}
				};
			}

			var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
			    rcustomProp = /^--/,
			    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
			    cssNormalTransform = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			    cssPrefixes = ["Webkit", "Moz", "ms"],
			    emptyStyle = document.createElement("div").style;

			function vendorPropName(name) {
				if (name in emptyStyle) {
					return name;
				}

				var capName = name[0].toUpperCase() + name.slice(1),
				    i = cssPrefixes.length;

				while (i--) {
					name = cssPrefixes[i] + capName;
					if (name in emptyStyle) {
						return name;
					}
				}
			}

			function finalPropName(name) {
				var ret = jQuery.cssProps[name];
				if (!ret) {
					ret = jQuery.cssProps[name] = vendorPropName(name) || name;
				}
				return ret;
			}

			function setPositiveNumber(elem, value, subtract) {
				var matches = rcssNum.exec(value);
				return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
			}

			function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
				var i,
				    val = 0;

				if (extra === (isBorderBox ? "border" : "content")) {
					i = 4;
				} else {
					i = name === "width" ? 1 : 0;
				}

				for (; i < 4; i += 2) {
					if (extra === "margin") {
						val += jQuery.css(elem, extra + cssExpand[i], true, styles);
					}

					if (isBorderBox) {
						if (extra === "content") {
							val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
						}

						if (extra !== "margin") {
							val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
						}
					} else {
						val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

						if (extra !== "padding") {
							val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
						}
					}
				}

				return val;
			}

			function getWidthOrHeight(elem, name, extra) {
				var valueIsBorderBox,
				    styles = getStyles(elem),
				    val = curCSS(elem, name, styles),
				    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

				if (rnumnonpx.test(val)) {
					return val;
				}

				valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

				if (val === "auto") {
					val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
				}

				val = parseFloat(val) || 0;

				return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
			}

			jQuery.extend({
				cssHooks: {
					opacity: {
						get: function get(elem, computed) {
							if (computed) {
								var ret = curCSS(elem, "opacity");
								return ret === "" ? "1" : ret;
							}
						}
					}
				},

				cssNumber: {
					"animationIterationCount": true,
					"columnCount": true,
					"fillOpacity": true,
					"flexGrow": true,
					"flexShrink": true,
					"fontWeight": true,
					"lineHeight": true,
					"opacity": true,
					"order": true,
					"orphans": true,
					"widows": true,
					"zIndex": true,
					"zoom": true
				},

				cssProps: {
					"float": "cssFloat"
				},

				style: function style(elem, name, value, extra) {
					if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
						return;
					}

					var ret,
					    type,
					    hooks,
					    origName = jQuery.camelCase(name),
					    isCustomProp = rcustomProp.test(name),
					    style = elem.style;

					if (!isCustomProp) {
						name = finalPropName(origName);
					}

					hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

					if (value !== undefined) {
						type = typeof value === "undefined" ? "undefined" : _typeof(value);

						if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
							value = adjustCSS(elem, name, ret);

							type = "number";
						}

						if (value == null || value !== value) {
							return;
						}

						if (type === "number") {
							value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
						}

						if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
							style[name] = "inherit";
						}

						if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

							if (isCustomProp) {
								style.setProperty(name, value);
							} else {
								style[name] = value;
							}
						}
					} else {
						if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

							return ret;
						}

						return style[name];
					}
				},

				css: function css(elem, name, extra, styles) {
					var val,
					    num,
					    hooks,
					    origName = jQuery.camelCase(name),
					    isCustomProp = rcustomProp.test(name);

					if (!isCustomProp) {
						name = finalPropName(origName);
					}

					hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

					if (hooks && "get" in hooks) {
						val = hooks.get(elem, true, extra);
					}

					if (val === undefined) {
						val = curCSS(elem, name, styles);
					}

					if (val === "normal" && name in cssNormalTransform) {
						val = cssNormalTransform[name];
					}

					if (extra === "" || extra) {
						num = parseFloat(val);
						return extra === true || isFinite(num) ? num || 0 : val;
					}

					return val;
				}
			});

			jQuery.each(["height", "width"], function (i, name) {
				jQuery.cssHooks[name] = {
					get: function get(elem, computed, extra) {
						if (computed) {
							return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
								return getWidthOrHeight(elem, name, extra);
							}) : getWidthOrHeight(elem, name, extra);
						}
					},

					set: function set(elem, value, extra) {
						var matches,
						    styles = extra && getStyles(elem),
						    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

						if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

							elem.style[name] = value;
							value = jQuery.css(elem, name);
						}

						return setPositiveNumber(elem, value, subtract);
					}
				};
			});

			jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
				if (computed) {
					return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
						return elem.getBoundingClientRect().left;
					})) + "px";
				}
			});

			jQuery.each({
				margin: "",
				padding: "",
				border: "Width"
			}, function (prefix, suffix) {
				jQuery.cssHooks[prefix + suffix] = {
					expand: function expand(value) {
						var i = 0,
						    expanded = {},
						    parts = typeof value === "string" ? value.split(" ") : [value];

						for (; i < 4; i++) {
							expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
						}

						return expanded;
					}
				};

				if (!rmargin.test(prefix)) {
					jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
				}
			});

			jQuery.fn.extend({
				css: function css(name, value) {
					return access(this, function (elem, name, value) {
						var styles,
						    len,
						    map = {},
						    i = 0;

						if (Array.isArray(name)) {
							styles = getStyles(elem);
							len = name.length;

							for (; i < len; i++) {
								map[name[i]] = jQuery.css(elem, name[i], false, styles);
							}

							return map;
						}

						return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
					}, name, value, arguments.length > 1);
				}
			});

			function Tween(elem, options, prop, end, easing) {
				return new Tween.prototype.init(elem, options, prop, end, easing);
			}
			jQuery.Tween = Tween;

			Tween.prototype = {
				constructor: Tween,
				init: function init(elem, options, prop, end, easing, unit) {
					this.elem = elem;
					this.prop = prop;
					this.easing = easing || jQuery.easing._default;
					this.options = options;
					this.start = this.now = this.cur();
					this.end = end;
					this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
				},
				cur: function cur() {
					var hooks = Tween.propHooks[this.prop];

					return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
				},
				run: function run(percent) {
					var eased,
					    hooks = Tween.propHooks[this.prop];

					if (this.options.duration) {
						this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
					} else {
						this.pos = eased = percent;
					}
					this.now = (this.end - this.start) * eased + this.start;

					if (this.options.step) {
						this.options.step.call(this.elem, this.now, this);
					}

					if (hooks && hooks.set) {
						hooks.set(this);
					} else {
						Tween.propHooks._default.set(this);
					}
					return this;
				}
			};

			Tween.prototype.init.prototype = Tween.prototype;

			Tween.propHooks = {
				_default: {
					get: function get(tween) {
						var result;

						if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
							return tween.elem[tween.prop];
						}

						result = jQuery.css(tween.elem, tween.prop, "");

						return !result || result === "auto" ? 0 : result;
					},
					set: function set(tween) {
						if (jQuery.fx.step[tween.prop]) {
							jQuery.fx.step[tween.prop](tween);
						} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
							jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
						} else {
							tween.elem[tween.prop] = tween.now;
						}
					}
				}
			};

			Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
				set: function set(tween) {
					if (tween.elem.nodeType && tween.elem.parentNode) {
						tween.elem[tween.prop] = tween.now;
					}
				}
			};

			jQuery.easing = {
				linear: function linear(p) {
					return p;
				},
				swing: function swing(p) {
					return 0.5 - Math.cos(p * Math.PI) / 2;
				},
				_default: "swing"
			};

			jQuery.fx = Tween.prototype.init;

			jQuery.fx.step = {};

			var fxNow,
			    inProgress,
			    rfxtypes = /^(?:toggle|show|hide)$/,
			    rrun = /queueHooks$/;

			function schedule() {
				if (inProgress) {
					if (document.hidden === false && window.requestAnimationFrame) {
						window.requestAnimationFrame(schedule);
					} else {
						window.setTimeout(schedule, jQuery.fx.interval);
					}

					jQuery.fx.tick();
				}
			}

			function createFxNow() {
				window.setTimeout(function () {
					fxNow = undefined;
				});
				return fxNow = jQuery.now();
			}

			function genFx(type, includeWidth) {
				var which,
				    i = 0,
				    attrs = { height: type };

				includeWidth = includeWidth ? 1 : 0;
				for (; i < 4; i += 2 - includeWidth) {
					which = cssExpand[i];
					attrs["margin" + which] = attrs["padding" + which] = type;
				}

				if (includeWidth) {
					attrs.opacity = attrs.width = type;
				}

				return attrs;
			}

			function createTween(value, prop, animation) {
				var tween,
				    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
				    index = 0,
				    length = collection.length;
				for (; index < length; index++) {
					if (tween = collection[index].call(animation, prop, value)) {
						return tween;
					}
				}
			}

			function defaultPrefilter(elem, props, opts) {
				var prop,
				    value,
				    toggle,
				    hooks,
				    oldfire,
				    propTween,
				    restoreDisplay,
				    display,
				    isBox = "width" in props || "height" in props,
				    anim = this,
				    orig = {},
				    style = elem.style,
				    hidden = elem.nodeType && isHiddenWithinTree(elem),
				    dataShow = dataPriv.get(elem, "fxshow");

				if (!opts.queue) {
					hooks = jQuery._queueHooks(elem, "fx");
					if (hooks.unqueued == null) {
						hooks.unqueued = 0;
						oldfire = hooks.empty.fire;
						hooks.empty.fire = function () {
							if (!hooks.unqueued) {
								oldfire();
							}
						};
					}
					hooks.unqueued++;

					anim.always(function () {
						anim.always(function () {
							hooks.unqueued--;
							if (!jQuery.queue(elem, "fx").length) {
								hooks.empty.fire();
							}
						});
					});
				}

				for (prop in props) {
					value = props[prop];
					if (rfxtypes.test(value)) {
						delete props[prop];
						toggle = toggle || value === "toggle";
						if (value === (hidden ? "hide" : "show")) {
							if (value === "show" && dataShow && dataShow[prop] !== undefined) {
								hidden = true;
							} else {
								continue;
							}
						}
						orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
					}
				}

				propTween = !jQuery.isEmptyObject(props);
				if (!propTween && jQuery.isEmptyObject(orig)) {
					return;
				}

				if (isBox && elem.nodeType === 1) {
					opts.overflow = [style.overflow, style.overflowX, style.overflowY];

					restoreDisplay = dataShow && dataShow.display;
					if (restoreDisplay == null) {
						restoreDisplay = dataPriv.get(elem, "display");
					}
					display = jQuery.css(elem, "display");
					if (display === "none") {
						if (restoreDisplay) {
							display = restoreDisplay;
						} else {
							showHide([elem], true);
							restoreDisplay = elem.style.display || restoreDisplay;
							display = jQuery.css(elem, "display");
							showHide([elem]);
						}
					}

					if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
						if (jQuery.css(elem, "float") === "none") {
							if (!propTween) {
								anim.done(function () {
									style.display = restoreDisplay;
								});
								if (restoreDisplay == null) {
									display = style.display;
									restoreDisplay = display === "none" ? "" : display;
								}
							}
							style.display = "inline-block";
						}
					}
				}

				if (opts.overflow) {
					style.overflow = "hidden";
					anim.always(function () {
						style.overflow = opts.overflow[0];
						style.overflowX = opts.overflow[1];
						style.overflowY = opts.overflow[2];
					});
				}

				propTween = false;
				for (prop in orig) {
					if (!propTween) {
						if (dataShow) {
							if ("hidden" in dataShow) {
								hidden = dataShow.hidden;
							}
						} else {
							dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
						}

						if (toggle) {
							dataShow.hidden = !hidden;
						}

						if (hidden) {
							showHide([elem], true);
						}

						anim.done(function () {
							if (!hidden) {
								showHide([elem]);
							}
							dataPriv.remove(elem, "fxshow");
							for (prop in orig) {
								jQuery.style(elem, prop, orig[prop]);
							}
						});
					}

					propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
					if (!(prop in dataShow)) {
						dataShow[prop] = propTween.start;
						if (hidden) {
							propTween.end = propTween.start;
							propTween.start = 0;
						}
					}
				}
			}

			function propFilter(props, specialEasing) {
				var index, name, easing, value, hooks;

				for (index in props) {
					name = jQuery.camelCase(index);
					easing = specialEasing[name];
					value = props[index];
					if (Array.isArray(value)) {
						easing = value[1];
						value = props[index] = value[0];
					}

					if (index !== name) {
						props[name] = value;
						delete props[index];
					}

					hooks = jQuery.cssHooks[name];
					if (hooks && "expand" in hooks) {
						value = hooks.expand(value);
						delete props[name];

						for (index in value) {
							if (!(index in props)) {
								props[index] = value[index];
								specialEasing[index] = easing;
							}
						}
					} else {
						specialEasing[name] = easing;
					}
				}
			}

			function Animation(elem, properties, options) {
				var result,
				    stopped,
				    index = 0,
				    length = Animation.prefilters.length,
				    deferred = jQuery.Deferred().always(function () {
					delete tick.elem;
				}),
				    tick = function tick() {
					if (stopped) {
						return false;
					}
					var currentTime = fxNow || createFxNow(),
					    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					    temp = remaining / animation.duration || 0,
					    percent = 1 - temp,
					    index = 0,
					    length = animation.tweens.length;

					for (; index < length; index++) {
						animation.tweens[index].run(percent);
					}

					deferred.notifyWith(elem, [animation, percent, remaining]);

					if (percent < 1 && length) {
						return remaining;
					}

					if (!length) {
						deferred.notifyWith(elem, [animation, 1, 0]);
					}

					deferred.resolveWith(elem, [animation]);
					return false;
				},
				    animation = deferred.promise({
					elem: elem,
					props: jQuery.extend({}, properties),
					opts: jQuery.extend(true, {
						specialEasing: {},
						easing: jQuery.easing._default
					}, options),
					originalProperties: properties,
					originalOptions: options,
					startTime: fxNow || createFxNow(),
					duration: options.duration,
					tweens: [],
					createTween: function createTween(prop, end) {
						var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
						animation.tweens.push(tween);
						return tween;
					},
					stop: function stop(gotoEnd) {
						var index = 0,
						    length = gotoEnd ? animation.tweens.length : 0;
						if (stopped) {
							return this;
						}
						stopped = true;
						for (; index < length; index++) {
							animation.tweens[index].run(1);
						}

						if (gotoEnd) {
							deferred.notifyWith(elem, [animation, 1, 0]);
							deferred.resolveWith(elem, [animation, gotoEnd]);
						} else {
							deferred.rejectWith(elem, [animation, gotoEnd]);
						}
						return this;
					}
				}),
				    props = animation.props;

				propFilter(props, animation.opts.specialEasing);

				for (; index < length; index++) {
					result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
					if (result) {
						if (jQuery.isFunction(result.stop)) {
							jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
						}
						return result;
					}
				}

				jQuery.map(props, createTween, animation);

				if (jQuery.isFunction(animation.opts.start)) {
					animation.opts.start.call(elem, animation);
				}

				animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

				jQuery.fx.timer(jQuery.extend(tick, {
					elem: elem,
					anim: animation,
					queue: animation.opts.queue
				}));

				return animation;
			}

			jQuery.Animation = jQuery.extend(Animation, {

				tweeners: {
					"*": [function (prop, value) {
						var tween = this.createTween(prop, value);
						adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
						return tween;
					}]
				},

				tweener: function tweener(props, callback) {
					if (jQuery.isFunction(props)) {
						callback = props;
						props = ["*"];
					} else {
						props = props.match(rnothtmlwhite);
					}

					var prop,
					    index = 0,
					    length = props.length;

					for (; index < length; index++) {
						prop = props[index];
						Animation.tweeners[prop] = Animation.tweeners[prop] || [];
						Animation.tweeners[prop].unshift(callback);
					}
				},

				prefilters: [defaultPrefilter],

				prefilter: function prefilter(callback, prepend) {
					if (prepend) {
						Animation.prefilters.unshift(callback);
					} else {
						Animation.prefilters.push(callback);
					}
				}
			});

			jQuery.speed = function (speed, easing, fn) {
				var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
					complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
					duration: speed,
					easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
				};

				if (jQuery.fx.off) {
					opt.duration = 0;
				} else {
					if (typeof opt.duration !== "number") {
						if (opt.duration in jQuery.fx.speeds) {
							opt.duration = jQuery.fx.speeds[opt.duration];
						} else {
							opt.duration = jQuery.fx.speeds._default;
						}
					}
				}

				if (opt.queue == null || opt.queue === true) {
					opt.queue = "fx";
				}

				opt.old = opt.complete;

				opt.complete = function () {
					if (jQuery.isFunction(opt.old)) {
						opt.old.call(this);
					}

					if (opt.queue) {
						jQuery.dequeue(this, opt.queue);
					}
				};

				return opt;
			};

			jQuery.fn.extend({
				fadeTo: function fadeTo(speed, to, easing, callback) {
					return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
				},
				animate: function animate(prop, speed, easing, callback) {
					var empty = jQuery.isEmptyObject(prop),
					    optall = jQuery.speed(speed, easing, callback),
					    doAnimation = function doAnimation() {
						var anim = Animation(this, jQuery.extend({}, prop), optall);

						if (empty || dataPriv.get(this, "finish")) {
							anim.stop(true);
						}
					};
					doAnimation.finish = doAnimation;

					return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
				},
				stop: function stop(type, clearQueue, gotoEnd) {
					var stopQueue = function stopQueue(hooks) {
						var stop = hooks.stop;
						delete hooks.stop;
						stop(gotoEnd);
					};

					if (typeof type !== "string") {
						gotoEnd = clearQueue;
						clearQueue = type;
						type = undefined;
					}
					if (clearQueue && type !== false) {
						this.queue(type || "fx", []);
					}

					return this.each(function () {
						var dequeue = true,
						    index = type != null && type + "queueHooks",
						    timers = jQuery.timers,
						    data = dataPriv.get(this);

						if (index) {
							if (data[index] && data[index].stop) {
								stopQueue(data[index]);
							}
						} else {
							for (index in data) {
								if (data[index] && data[index].stop && rrun.test(index)) {
									stopQueue(data[index]);
								}
							}
						}

						for (index = timers.length; index--;) {
							if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

								timers[index].anim.stop(gotoEnd);
								dequeue = false;
								timers.splice(index, 1);
							}
						}

						if (dequeue || !gotoEnd) {
							jQuery.dequeue(this, type);
						}
					});
				},
				finish: function finish(type) {
					if (type !== false) {
						type = type || "fx";
					}
					return this.each(function () {
						var index,
						    data = dataPriv.get(this),
						    queue = data[type + "queue"],
						    hooks = data[type + "queueHooks"],
						    timers = jQuery.timers,
						    length = queue ? queue.length : 0;

						data.finish = true;

						jQuery.queue(this, type, []);

						if (hooks && hooks.stop) {
							hooks.stop.call(this, true);
						}

						for (index = timers.length; index--;) {
							if (timers[index].elem === this && timers[index].queue === type) {
								timers[index].anim.stop(true);
								timers.splice(index, 1);
							}
						}

						for (index = 0; index < length; index++) {
							if (queue[index] && queue[index].finish) {
								queue[index].finish.call(this);
							}
						}

						delete data.finish;
					});
				}
			});

			jQuery.each(["toggle", "show", "hide"], function (i, name) {
				var cssFn = jQuery.fn[name];
				jQuery.fn[name] = function (speed, easing, callback) {
					return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
				};
			});

			jQuery.each({
				slideDown: genFx("show"),
				slideUp: genFx("hide"),
				slideToggle: genFx("toggle"),
				fadeIn: { opacity: "show" },
				fadeOut: { opacity: "hide" },
				fadeToggle: { opacity: "toggle" }
			}, function (name, props) {
				jQuery.fn[name] = function (speed, easing, callback) {
					return this.animate(props, speed, easing, callback);
				};
			});

			jQuery.timers = [];
			jQuery.fx.tick = function () {
				var timer,
				    i = 0,
				    timers = jQuery.timers;

				fxNow = jQuery.now();

				for (; i < timers.length; i++) {
					timer = timers[i];

					if (!timer() && timers[i] === timer) {
						timers.splice(i--, 1);
					}
				}

				if (!timers.length) {
					jQuery.fx.stop();
				}
				fxNow = undefined;
			};

			jQuery.fx.timer = function (timer) {
				jQuery.timers.push(timer);
				jQuery.fx.start();
			};

			jQuery.fx.interval = 13;
			jQuery.fx.start = function () {
				if (inProgress) {
					return;
				}

				inProgress = true;
				schedule();
			};

			jQuery.fx.stop = function () {
				inProgress = null;
			};

			jQuery.fx.speeds = {
				slow: 600,
				fast: 200,

				_default: 400
			};

			jQuery.fn.delay = function (time, type) {
				time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
				type = type || "fx";

				return this.queue(type, function (next, hooks) {
					var timeout = window.setTimeout(next, time);
					hooks.stop = function () {
						window.clearTimeout(timeout);
					};
				});
			};

			(function () {
				var input = document.createElement("input"),
				    select = document.createElement("select"),
				    opt = select.appendChild(document.createElement("option"));

				input.type = "checkbox";

				support.checkOn = input.value !== "";

				support.optSelected = opt.selected;

				input = document.createElement("input");
				input.value = "t";
				input.type = "radio";
				support.radioValue = input.value === "t";
			})();

			var boolHook,
			    attrHandle = jQuery.expr.attrHandle;

			jQuery.fn.extend({
				attr: function attr(name, value) {
					return access(this, jQuery.attr, name, value, arguments.length > 1);
				},

				removeAttr: function removeAttr(name) {
					return this.each(function () {
						jQuery.removeAttr(this, name);
					});
				}
			});

			jQuery.extend({
				attr: function attr(elem, name, value) {
					var ret,
					    hooks,
					    nType = elem.nodeType;

					if (nType === 3 || nType === 8 || nType === 2) {
						return;
					}

					if (typeof elem.getAttribute === "undefined") {
						return jQuery.prop(elem, name, value);
					}

					if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
						hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
					}

					if (value !== undefined) {
						if (value === null) {
							jQuery.removeAttr(elem, name);
							return;
						}

						if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;
						}

						elem.setAttribute(name, value + "");
						return value;
					}

					if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
						return ret;
					}

					ret = jQuery.find.attr(elem, name);

					return ret == null ? undefined : ret;
				},

				attrHooks: {
					type: {
						set: function set(elem, value) {
							if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
								var val = elem.value;
								elem.setAttribute("type", value);
								if (val) {
									elem.value = val;
								}
								return value;
							}
						}
					}
				},

				removeAttr: function removeAttr(elem, value) {
					var name,
					    i = 0,
					    attrNames = value && value.match(rnothtmlwhite);

					if (attrNames && elem.nodeType === 1) {
						while (name = attrNames[i++]) {
							elem.removeAttribute(name);
						}
					}
				}
			});

			boolHook = {
				set: function set(elem, value, name) {
					if (value === false) {
						jQuery.removeAttr(elem, name);
					} else {
						elem.setAttribute(name, name);
					}
					return name;
				}
			};

			jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
				var getter = attrHandle[name] || jQuery.find.attr;

				attrHandle[name] = function (elem, name, isXML) {
					var ret,
					    handle,
					    lowercaseName = name.toLowerCase();

					if (!isXML) {
						handle = attrHandle[lowercaseName];
						attrHandle[lowercaseName] = ret;
						ret = getter(elem, name, isXML) != null ? lowercaseName : null;
						attrHandle[lowercaseName] = handle;
					}
					return ret;
				};
			});

			var rfocusable = /^(?:input|select|textarea|button)$/i,
			    rclickable = /^(?:a|area)$/i;

			jQuery.fn.extend({
				prop: function prop(name, value) {
					return access(this, jQuery.prop, name, value, arguments.length > 1);
				},

				removeProp: function removeProp(name) {
					return this.each(function () {
						delete this[jQuery.propFix[name] || name];
					});
				}
			});

			jQuery.extend({
				prop: function prop(elem, name, value) {
					var ret,
					    hooks,
					    nType = elem.nodeType;

					if (nType === 3 || nType === 8 || nType === 2) {
						return;
					}

					if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
						name = jQuery.propFix[name] || name;
						hooks = jQuery.propHooks[name];
					}

					if (value !== undefined) {
						if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;
						}

						return elem[name] = value;
					}

					if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
						return ret;
					}

					return elem[name];
				},

				propHooks: {
					tabIndex: {
						get: function get(elem) {
							var tabindex = jQuery.find.attr(elem, "tabindex");

							if (tabindex) {
								return parseInt(tabindex, 10);
							}

							if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
								return 0;
							}

							return -1;
						}
					}
				},

				propFix: {
					"for": "htmlFor",
					"class": "className"
				}
			});

			if (!support.optSelected) {
				jQuery.propHooks.selected = {
					get: function get(elem) {

						var parent = elem.parentNode;
						if (parent && parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
						return null;
					},
					set: function set(elem) {

						var parent = elem.parentNode;
						if (parent) {
							parent.selectedIndex;

							if (parent.parentNode) {
								parent.parentNode.selectedIndex;
							}
						}
					}
				};
			}

			jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
				jQuery.propFix[this.toLowerCase()] = this;
			});

			function stripAndCollapse(value) {
				var tokens = value.match(rnothtmlwhite) || [];
				return tokens.join(" ");
			}

			function getClass(elem) {
				return elem.getAttribute && elem.getAttribute("class") || "";
			}

			jQuery.fn.extend({
				addClass: function addClass(value) {
					var classes,
					    elem,
					    cur,
					    curValue,
					    clazz,
					    j,
					    finalValue,
					    i = 0;

					if (jQuery.isFunction(value)) {
						return this.each(function (j) {
							jQuery(this).addClass(value.call(this, j, getClass(this)));
						});
					}

					if (typeof value === "string" && value) {
						classes = value.match(rnothtmlwhite) || [];

						while (elem = this[i++]) {
							curValue = getClass(elem);
							cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

							if (cur) {
								j = 0;
								while (clazz = classes[j++]) {
									if (cur.indexOf(" " + clazz + " ") < 0) {
										cur += clazz + " ";
									}
								}

								finalValue = stripAndCollapse(cur);
								if (curValue !== finalValue) {
									elem.setAttribute("class", finalValue);
								}
							}
						}
					}

					return this;
				},

				removeClass: function removeClass(value) {
					var classes,
					    elem,
					    cur,
					    curValue,
					    clazz,
					    j,
					    finalValue,
					    i = 0;

					if (jQuery.isFunction(value)) {
						return this.each(function (j) {
							jQuery(this).removeClass(value.call(this, j, getClass(this)));
						});
					}

					if (!arguments.length) {
						return this.attr("class", "");
					}

					if (typeof value === "string" && value) {
						classes = value.match(rnothtmlwhite) || [];

						while (elem = this[i++]) {
							curValue = getClass(elem);

							cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

							if (cur) {
								j = 0;
								while (clazz = classes[j++]) {
									while (cur.indexOf(" " + clazz + " ") > -1) {
										cur = cur.replace(" " + clazz + " ", " ");
									}
								}

								finalValue = stripAndCollapse(cur);
								if (curValue !== finalValue) {
									elem.setAttribute("class", finalValue);
								}
							}
						}
					}

					return this;
				},

				toggleClass: function toggleClass(value, stateVal) {
					var type = typeof value === "undefined" ? "undefined" : _typeof(value);

					if (typeof stateVal === "boolean" && type === "string") {
						return stateVal ? this.addClass(value) : this.removeClass(value);
					}

					if (jQuery.isFunction(value)) {
						return this.each(function (i) {
							jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
						});
					}

					return this.each(function () {
						var className, i, self, classNames;

						if (type === "string") {
							i = 0;
							self = jQuery(this);
							classNames = value.match(rnothtmlwhite) || [];

							while (className = classNames[i++]) {
								if (self.hasClass(className)) {
									self.removeClass(className);
								} else {
									self.addClass(className);
								}
							}
						} else if (value === undefined || type === "boolean") {
							className = getClass(this);
							if (className) {
								dataPriv.set(this, "__className__", className);
							}

							if (this.setAttribute) {
								this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
							}
						}
					});
				},

				hasClass: function hasClass(selector) {
					var className,
					    elem,
					    i = 0;

					className = " " + selector + " ";
					while (elem = this[i++]) {
						if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
							return true;
						}
					}

					return false;
				}
			});

			var rreturn = /\r/g;

			jQuery.fn.extend({
				val: function val(value) {
					var hooks,
					    ret,
					    isFunction,
					    elem = this[0];

					if (!arguments.length) {
						if (elem) {
							hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

							if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
								return ret;
							}

							ret = elem.value;

							if (typeof ret === "string") {
								return ret.replace(rreturn, "");
							}

							return ret == null ? "" : ret;
						}

						return;
					}

					isFunction = jQuery.isFunction(value);

					return this.each(function (i) {
						var val;

						if (this.nodeType !== 1) {
							return;
						}

						if (isFunction) {
							val = value.call(this, i, jQuery(this).val());
						} else {
							val = value;
						}

						if (val == null) {
							val = "";
						} else if (typeof val === "number") {
							val += "";
						} else if (Array.isArray(val)) {
							val = jQuery.map(val, function (value) {
								return value == null ? "" : value + "";
							});
						}

						hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

						if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
							this.value = val;
						}
					});
				}
			});

			jQuery.extend({
				valHooks: {
					option: {
						get: function get(elem) {

							var val = jQuery.find.attr(elem, "value");
							return val != null ? val : stripAndCollapse(jQuery.text(elem));
						}
					},
					select: {
						get: function get(elem) {
							var value,
							    option,
							    i,
							    options = elem.options,
							    index = elem.selectedIndex,
							    one = elem.type === "select-one",
							    values = one ? null : [],
							    max = one ? index + 1 : options.length;

							if (index < 0) {
								i = max;
							} else {
								i = one ? index : 0;
							}

							for (; i < max; i++) {
								option = options[i];

								if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
									value = jQuery(option).val();

									if (one) {
										return value;
									}

									values.push(value);
								}
							}

							return values;
						},

						set: function set(elem, value) {
							var optionSet,
							    option,
							    options = elem.options,
							    values = jQuery.makeArray(value),
							    i = options.length;

							while (i--) {
								option = options[i];

								if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
									optionSet = true;
								}
							}

							if (!optionSet) {
								elem.selectedIndex = -1;
							}
							return values;
						}
					}
				}
			});

			jQuery.each(["radio", "checkbox"], function () {
				jQuery.valHooks[this] = {
					set: function set(elem, value) {
						if (Array.isArray(value)) {
							return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
						}
					}
				};
				if (!support.checkOn) {
					jQuery.valHooks[this].get = function (elem) {
						return elem.getAttribute("value") === null ? "on" : elem.value;
					};
				}
			});

			var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

			jQuery.extend(jQuery.event, {

				trigger: function trigger(event, data, elem, onlyHandlers) {

					var i,
					    cur,
					    tmp,
					    bubbleType,
					    ontype,
					    handle,
					    special,
					    eventPath = [elem || document],
					    type = hasOwn.call(event, "type") ? event.type : event,
					    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

					cur = tmp = elem = elem || document;

					if (elem.nodeType === 3 || elem.nodeType === 8) {
						return;
					}

					if (rfocusMorph.test(type + jQuery.event.triggered)) {
						return;
					}

					if (type.indexOf(".") > -1) {
						namespaces = type.split(".");
						type = namespaces.shift();
						namespaces.sort();
					}
					ontype = type.indexOf(":") < 0 && "on" + type;

					event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

					event.isTrigger = onlyHandlers ? 2 : 3;
					event.namespace = namespaces.join(".");
					event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

					event.result = undefined;
					if (!event.target) {
						event.target = elem;
					}

					data = data == null ? [event] : jQuery.makeArray(data, [event]);

					special = jQuery.event.special[type] || {};
					if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
						return;
					}

					if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

						bubbleType = special.delegateType || type;
						if (!rfocusMorph.test(bubbleType + type)) {
							cur = cur.parentNode;
						}
						for (; cur; cur = cur.parentNode) {
							eventPath.push(cur);
							tmp = cur;
						}

						if (tmp === (elem.ownerDocument || document)) {
							eventPath.push(tmp.defaultView || tmp.parentWindow || window);
						}
					}

					i = 0;
					while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

						event.type = i > 1 ? bubbleType : special.bindType || type;

						handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
						if (handle) {
							handle.apply(cur, data);
						}

						handle = ontype && cur[ontype];
						if (handle && handle.apply && acceptData(cur)) {
							event.result = handle.apply(cur, data);
							if (event.result === false) {
								event.preventDefault();
							}
						}
					}
					event.type = type;

					if (!onlyHandlers && !event.isDefaultPrevented()) {

						if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
							if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
								tmp = elem[ontype];

								if (tmp) {
									elem[ontype] = null;
								}

								jQuery.event.triggered = type;
								elem[type]();
								jQuery.event.triggered = undefined;

								if (tmp) {
									elem[ontype] = tmp;
								}
							}
						}
					}

					return event.result;
				},

				simulate: function simulate(type, elem, event) {
					var e = jQuery.extend(new jQuery.Event(), event, {
						type: type,
						isSimulated: true
					});

					jQuery.event.trigger(e, null, elem);
				}

			});

			jQuery.fn.extend({

				trigger: function trigger(type, data) {
					return this.each(function () {
						jQuery.event.trigger(type, data, this);
					});
				},
				triggerHandler: function triggerHandler(type, data) {
					var elem = this[0];
					if (elem) {
						return jQuery.event.trigger(type, data, elem, true);
					}
				}
			});

			jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
				jQuery.fn[name] = function (data, fn) {
					return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
				};
			});

			jQuery.fn.extend({
				hover: function hover(fnOver, fnOut) {
					return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
				}
			});

			support.focusin = "onfocusin" in window;

			if (!support.focusin) {
				jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
					var handler = function handler(event) {
						jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
					};

					jQuery.event.special[fix] = {
						setup: function setup() {
							var doc = this.ownerDocument || this,
							    attaches = dataPriv.access(doc, fix);

							if (!attaches) {
								doc.addEventListener(orig, handler, true);
							}
							dataPriv.access(doc, fix, (attaches || 0) + 1);
						},
						teardown: function teardown() {
							var doc = this.ownerDocument || this,
							    attaches = dataPriv.access(doc, fix) - 1;

							if (!attaches) {
								doc.removeEventListener(orig, handler, true);
								dataPriv.remove(doc, fix);
							} else {
								dataPriv.access(doc, fix, attaches);
							}
						}
					};
				});
			}
			var location = window.location;

			var nonce = jQuery.now();

			var rquery = /\?/;

			jQuery.parseXML = function (data) {
				var xml;
				if (!data || typeof data !== "string") {
					return null;
				}

				try {
					xml = new window.DOMParser().parseFromString(data, "text/xml");
				} catch (e) {
					xml = undefined;
				}

				if (!xml || xml.getElementsByTagName("parsererror").length) {
					jQuery.error("Invalid XML: " + data);
				}
				return xml;
			};

			var rbracket = /\[\]$/,
			    rCRLF = /\r?\n/g,
			    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
			    rsubmittable = /^(?:input|select|textarea|keygen)/i;

			function buildParams(prefix, obj, traditional, add) {
				var name;

				if (Array.isArray(obj)) {
					jQuery.each(obj, function (i, v) {
						if (traditional || rbracket.test(prefix)) {
							add(prefix, v);
						} else {
							buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
						}
					});
				} else if (!traditional && jQuery.type(obj) === "object") {
					for (name in obj) {
						buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
					}
				} else {
					add(prefix, obj);
				}
			}

			jQuery.param = function (a, traditional) {
				var prefix,
				    s = [],
				    add = function add(key, valueOrFunction) {
					var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

					s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
				};

				if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
					jQuery.each(a, function () {
						add(this.name, this.value);
					});
				} else {
					for (prefix in a) {
						buildParams(prefix, a[prefix], traditional, add);
					}
				}

				return s.join("&");
			};

			jQuery.fn.extend({
				serialize: function serialize() {
					return jQuery.param(this.serializeArray());
				},
				serializeArray: function serializeArray() {
					return this.map(function () {
						var elements = jQuery.prop(this, "elements");
						return elements ? jQuery.makeArray(elements) : this;
					}).filter(function () {
						var type = this.type;

						return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
					}).map(function (i, elem) {
						var val = jQuery(this).val();

						if (val == null) {
							return null;
						}

						if (Array.isArray(val)) {
							return jQuery.map(val, function (val) {
								return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
							});
						}

						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					}).get();
				}
			});

			var r20 = /%20/g,
			    rhash = /#.*$/,
			    rantiCache = /([?&])_=[^&]*/,
			    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
			    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			    rnoContent = /^(?:GET|HEAD)$/,
			    rprotocol = /^\/\//,
			    prefilters = {},
			    transports = {},
			    allTypes = "*/".concat("*"),
			    originAnchor = document.createElement("a");
			originAnchor.href = location.href;

			function addToPrefiltersOrTransports(structure) {
				return function (dataTypeExpression, func) {

					if (typeof dataTypeExpression !== "string") {
						func = dataTypeExpression;
						dataTypeExpression = "*";
					}

					var dataType,
					    i = 0,
					    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

					if (jQuery.isFunction(func)) {
						while (dataType = dataTypes[i++]) {
							if (dataType[0] === "+") {
								dataType = dataType.slice(1) || "*";
								(structure[dataType] = structure[dataType] || []).unshift(func);
							} else {
								(structure[dataType] = structure[dataType] || []).push(func);
							}
						}
					}
				};
			}

			function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

				var inspected = {},
				    seekingTransport = structure === transports;

				function inspect(dataType) {
					var selected;
					inspected[dataType] = true;
					jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
						var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
						if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

							options.dataTypes.unshift(dataTypeOrTransport);
							inspect(dataTypeOrTransport);
							return false;
						} else if (seekingTransport) {
							return !(selected = dataTypeOrTransport);
						}
					});
					return selected;
				}

				return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
			}

			function ajaxExtend(target, src) {
				var key,
				    deep,
				    flatOptions = jQuery.ajaxSettings.flatOptions || {};

				for (key in src) {
					if (src[key] !== undefined) {
						(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
					}
				}
				if (deep) {
					jQuery.extend(true, target, deep);
				}

				return target;
			}

			function ajaxHandleResponses(s, jqXHR, responses) {

				var ct,
				    type,
				    finalDataType,
				    firstDataType,
				    contents = s.contents,
				    dataTypes = s.dataTypes;

				while (dataTypes[0] === "*") {
					dataTypes.shift();
					if (ct === undefined) {
						ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
					}
				}

				if (ct) {
					for (type in contents) {
						if (contents[type] && contents[type].test(ct)) {
							dataTypes.unshift(type);
							break;
						}
					}
				}

				if (dataTypes[0] in responses) {
					finalDataType = dataTypes[0];
				} else {
					for (type in responses) {
						if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
							finalDataType = type;
							break;
						}
						if (!firstDataType) {
							firstDataType = type;
						}
					}

					finalDataType = finalDataType || firstDataType;
				}

				if (finalDataType) {
					if (finalDataType !== dataTypes[0]) {
						dataTypes.unshift(finalDataType);
					}
					return responses[finalDataType];
				}
			}

			function ajaxConvert(s, response, jqXHR, isSuccess) {
				var conv2,
				    current,
				    conv,
				    tmp,
				    prev,
				    converters = {},
				    dataTypes = s.dataTypes.slice();

				if (dataTypes[1]) {
					for (conv in s.converters) {
						converters[conv.toLowerCase()] = s.converters[conv];
					}
				}

				current = dataTypes.shift();

				while (current) {

					if (s.responseFields[current]) {
						jqXHR[s.responseFields[current]] = response;
					}

					if (!prev && isSuccess && s.dataFilter) {
						response = s.dataFilter(response, s.dataType);
					}

					prev = current;
					current = dataTypes.shift();

					if (current) {
						if (current === "*") {

							current = prev;
						} else if (prev !== "*" && prev !== current) {
							conv = converters[prev + " " + current] || converters["* " + current];

							if (!conv) {
								for (conv2 in converters) {
									tmp = conv2.split(" ");
									if (tmp[1] === current) {
										conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
										if (conv) {
											if (conv === true) {
												conv = converters[conv2];
											} else if (converters[conv2] !== true) {
												current = tmp[0];
												dataTypes.unshift(tmp[1]);
											}
											break;
										}
									}
								}
							}

							if (conv !== true) {
								if (conv && s.throws) {
									response = conv(response);
								} else {
									try {
										response = conv(response);
									} catch (e) {
										return {
											state: "parsererror",
											error: conv ? e : "No conversion from " + prev + " to " + current
										};
									}
								}
							}
						}
					}
				}

				return { state: "success", data: response };
			}

			jQuery.extend({
				active: 0,

				lastModified: {},
				etag: {},

				ajaxSettings: {
					url: location.href,
					type: "GET",
					isLocal: rlocalProtocol.test(location.protocol),
					global: true,
					processData: true,
					async: true,
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",

					accepts: {
						"*": allTypes,
						text: "text/plain",
						html: "text/html",
						xml: "application/xml, text/xml",
						json: "application/json, text/javascript"
					},

					contents: {
						xml: /\bxml\b/,
						html: /\bhtml/,
						json: /\bjson\b/
					},

					responseFields: {
						xml: "responseXML",
						text: "responseText",
						json: "responseJSON"
					},

					converters: {
						"* text": String,

						"text html": true,

						"text json": JSON.parse,

						"text xml": jQuery.parseXML
					},

					flatOptions: {
						url: true,
						context: true
					}
				},

				ajaxSetup: function ajaxSetup(target, settings) {
					return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
				},

				ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
				ajaxTransport: addToPrefiltersOrTransports(transports),

				ajax: function ajax(url, options) {
					if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
						options = url;
						url = undefined;
					}

					options = options || {};

					var transport,
					    cacheURL,
					    responseHeadersString,
					    responseHeaders,
					    timeoutTimer,
					    urlAnchor,
					    completed,
					    fireGlobals,
					    i,
					    uncached,
					    s = jQuery.ajaxSetup({}, options),
					    callbackContext = s.context || s,
					    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
					    deferred = jQuery.Deferred(),
					    completeDeferred = jQuery.Callbacks("once memory"),
					    _statusCode = s.statusCode || {},
					    requestHeaders = {},
					    requestHeadersNames = {},
					    strAbort = "canceled",
					    jqXHR = {
						readyState: 0,

						getResponseHeader: function getResponseHeader(key) {
							var match;
							if (completed) {
								if (!responseHeaders) {
									responseHeaders = {};
									while (match = rheaders.exec(responseHeadersString)) {
										responseHeaders[match[1].toLowerCase()] = match[2];
									}
								}
								match = responseHeaders[key.toLowerCase()];
							}
							return match == null ? null : match;
						},

						getAllResponseHeaders: function getAllResponseHeaders() {
							return completed ? responseHeadersString : null;
						},

						setRequestHeader: function setRequestHeader(name, value) {
							if (completed == null) {
								name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
								requestHeaders[name] = value;
							}
							return this;
						},

						overrideMimeType: function overrideMimeType(type) {
							if (completed == null) {
								s.mimeType = type;
							}
							return this;
						},

						statusCode: function statusCode(map) {
							var code;
							if (map) {
								if (completed) {
									jqXHR.always(map[jqXHR.status]);
								} else {
									for (code in map) {
										_statusCode[code] = [_statusCode[code], map[code]];
									}
								}
							}
							return this;
						},

						abort: function abort(statusText) {
							var finalText = statusText || strAbort;
							if (transport) {
								transport.abort(finalText);
							}
							done(0, finalText);
							return this;
						}
					};

					deferred.promise(jqXHR);

					s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

					s.type = options.method || options.type || s.method || s.type;

					s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

					if (s.crossDomain == null) {
						urlAnchor = document.createElement("a");

						try {
							urlAnchor.href = s.url;

							urlAnchor.href = urlAnchor.href;
							s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
						} catch (e) {
							s.crossDomain = true;
						}
					}

					if (s.data && s.processData && typeof s.data !== "string") {
						s.data = jQuery.param(s.data, s.traditional);
					}

					inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

					if (completed) {
						return jqXHR;
					}

					fireGlobals = jQuery.event && s.global;

					if (fireGlobals && jQuery.active++ === 0) {
						jQuery.event.trigger("ajaxStart");
					}

					s.type = s.type.toUpperCase();

					s.hasContent = !rnoContent.test(s.type);

					cacheURL = s.url.replace(rhash, "");

					if (!s.hasContent) {
						uncached = s.url.slice(cacheURL.length);

						if (s.data) {
							cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

							delete s.data;
						}

						if (s.cache === false) {
							cacheURL = cacheURL.replace(rantiCache, "$1");
							uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
						}

						s.url = cacheURL + uncached;
					} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
						s.data = s.data.replace(r20, "+");
					}

					if (s.ifModified) {
						if (jQuery.lastModified[cacheURL]) {
							jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
						}
						if (jQuery.etag[cacheURL]) {
							jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
						}
					}

					if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
						jqXHR.setRequestHeader("Content-Type", s.contentType);
					}

					jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

					for (i in s.headers) {
						jqXHR.setRequestHeader(i, s.headers[i]);
					}

					if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
						return jqXHR.abort();
					}

					strAbort = "abort";

					completeDeferred.add(s.complete);
					jqXHR.done(s.success);
					jqXHR.fail(s.error);

					transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

					if (!transport) {
						done(-1, "No Transport");
					} else {
						jqXHR.readyState = 1;

						if (fireGlobals) {
							globalEventContext.trigger("ajaxSend", [jqXHR, s]);
						}

						if (completed) {
							return jqXHR;
						}

						if (s.async && s.timeout > 0) {
							timeoutTimer = window.setTimeout(function () {
								jqXHR.abort("timeout");
							}, s.timeout);
						}

						try {
							completed = false;
							transport.send(requestHeaders, done);
						} catch (e) {
							if (completed) {
								throw e;
							}

							done(-1, e);
						}
					}

					function done(status, nativeStatusText, responses, headers) {
						var isSuccess,
						    success,
						    error,
						    response,
						    modified,
						    statusText = nativeStatusText;

						if (completed) {
							return;
						}

						completed = true;

						if (timeoutTimer) {
							window.clearTimeout(timeoutTimer);
						}

						transport = undefined;

						responseHeadersString = headers || "";

						jqXHR.readyState = status > 0 ? 4 : 0;

						isSuccess = status >= 200 && status < 300 || status === 304;

						if (responses) {
							response = ajaxHandleResponses(s, jqXHR, responses);
						}

						response = ajaxConvert(s, response, jqXHR, isSuccess);

						if (isSuccess) {
							if (s.ifModified) {
								modified = jqXHR.getResponseHeader("Last-Modified");
								if (modified) {
									jQuery.lastModified[cacheURL] = modified;
								}
								modified = jqXHR.getResponseHeader("etag");
								if (modified) {
									jQuery.etag[cacheURL] = modified;
								}
							}

							if (status === 204 || s.type === "HEAD") {
								statusText = "nocontent";
							} else if (status === 304) {
								statusText = "notmodified";
							} else {
								statusText = response.state;
								success = response.data;
								error = response.error;
								isSuccess = !error;
							}
						} else {
							error = statusText;
							if (status || !statusText) {
								statusText = "error";
								if (status < 0) {
									status = 0;
								}
							}
						}

						jqXHR.status = status;
						jqXHR.statusText = (nativeStatusText || statusText) + "";

						if (isSuccess) {
							deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
						} else {
							deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
						}

						jqXHR.statusCode(_statusCode);
						_statusCode = undefined;

						if (fireGlobals) {
							globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
						}

						completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

						if (fireGlobals) {
							globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

							if (! --jQuery.active) {
								jQuery.event.trigger("ajaxStop");
							}
						}
					}

					return jqXHR;
				},

				getJSON: function getJSON(url, data, callback) {
					return jQuery.get(url, data, callback, "json");
				},

				getScript: function getScript(url, callback) {
					return jQuery.get(url, undefined, callback, "script");
				}
			});

			jQuery.each(["get", "post"], function (i, method) {
				jQuery[method] = function (url, data, callback, type) {
					if (jQuery.isFunction(data)) {
						type = type || callback;
						callback = data;
						data = undefined;
					}

					return jQuery.ajax(jQuery.extend({
						url: url,
						type: method,
						dataType: type,
						data: data,
						success: callback
					}, jQuery.isPlainObject(url) && url));
				};
			});

			jQuery._evalUrl = function (url) {
				return jQuery.ajax({
					url: url,

					type: "GET",
					dataType: "script",
					cache: true,
					async: false,
					global: false,
					"throws": true
				});
			};

			jQuery.fn.extend({
				wrapAll: function wrapAll(html) {
					var wrap;

					if (this[0]) {
						if (jQuery.isFunction(html)) {
							html = html.call(this[0]);
						}

						wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

						if (this[0].parentNode) {
							wrap.insertBefore(this[0]);
						}

						wrap.map(function () {
							var elem = this;

							while (elem.firstElementChild) {
								elem = elem.firstElementChild;
							}

							return elem;
						}).append(this);
					}

					return this;
				},

				wrapInner: function wrapInner(html) {
					if (jQuery.isFunction(html)) {
						return this.each(function (i) {
							jQuery(this).wrapInner(html.call(this, i));
						});
					}

					return this.each(function () {
						var self = jQuery(this),
						    contents = self.contents();

						if (contents.length) {
							contents.wrapAll(html);
						} else {
							self.append(html);
						}
					});
				},

				wrap: function wrap(html) {
					var isFunction = jQuery.isFunction(html);

					return this.each(function (i) {
						jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
					});
				},

				unwrap: function unwrap(selector) {
					this.parent(selector).not("body").each(function () {
						jQuery(this).replaceWith(this.childNodes);
					});
					return this;
				}
			});

			jQuery.expr.pseudos.hidden = function (elem) {
				return !jQuery.expr.pseudos.visible(elem);
			};
			jQuery.expr.pseudos.visible = function (elem) {
				return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
			};

			jQuery.ajaxSettings.xhr = function () {
				try {
					return new window.XMLHttpRequest();
				} catch (e) {}
			};

			var xhrSuccessStatus = {
				0: 200,

				1223: 204
			},
			    xhrSupported = jQuery.ajaxSettings.xhr();

			support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
			support.ajax = xhrSupported = !!xhrSupported;

			jQuery.ajaxTransport(function (options) {
				var _callback, errorCallback;

				if (support.cors || xhrSupported && !options.crossDomain) {
					return {
						send: function send(headers, complete) {
							var i,
							    xhr = options.xhr();

							xhr.open(options.type, options.url, options.async, options.username, options.password);

							if (options.xhrFields) {
								for (i in options.xhrFields) {
									xhr[i] = options.xhrFields[i];
								}
							}

							if (options.mimeType && xhr.overrideMimeType) {
								xhr.overrideMimeType(options.mimeType);
							}

							if (!options.crossDomain && !headers["X-Requested-With"]) {
								headers["X-Requested-With"] = "XMLHttpRequest";
							}

							for (i in headers) {
								xhr.setRequestHeader(i, headers[i]);
							}

							_callback = function callback(type) {
								return function () {
									if (_callback) {
										_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

										if (type === "abort") {
											xhr.abort();
										} else if (type === "error") {
											if (typeof xhr.status !== "number") {
												complete(0, "error");
											} else {
												complete(xhr.status, xhr.statusText);
											}
										} else {
											complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
										}
									}
								};
							};

							xhr.onload = _callback();
							errorCallback = xhr.onerror = _callback("error");

							if (xhr.onabort !== undefined) {
								xhr.onabort = errorCallback;
							} else {
								xhr.onreadystatechange = function () {
									if (xhr.readyState === 4) {
										window.setTimeout(function () {
											if (_callback) {
												errorCallback();
											}
										});
									}
								};
							}

							_callback = _callback("abort");

							try {
								xhr.send(options.hasContent && options.data || null);
							} catch (e) {
								if (_callback) {
									throw e;
								}
							}
						},

						abort: function abort() {
							if (_callback) {
								_callback();
							}
						}
					};
				}
			});

			jQuery.ajaxPrefilter(function (s) {
				if (s.crossDomain) {
					s.contents.script = false;
				}
			});

			jQuery.ajaxSetup({
				accepts: {
					script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
				},
				contents: {
					script: /\b(?:java|ecma)script\b/
				},
				converters: {
					"text script": function textScript(text) {
						jQuery.globalEval(text);
						return text;
					}
				}
			});

			jQuery.ajaxPrefilter("script", function (s) {
				if (s.cache === undefined) {
					s.cache = false;
				}
				if (s.crossDomain) {
					s.type = "GET";
				}
			});

			jQuery.ajaxTransport("script", function (s) {
				if (s.crossDomain) {
					var script, _callback2;
					return {
						send: function send(_, complete) {
							script = jQuery("<script>").prop({
								charset: s.scriptCharset,
								src: s.url
							}).on("load error", _callback2 = function callback(evt) {
								script.remove();
								_callback2 = null;
								if (evt) {
									complete(evt.type === "error" ? 404 : 200, evt.type);
								}
							});

							document.head.appendChild(script[0]);
						},
						abort: function abort() {
							if (_callback2) {
								_callback2();
							}
						}
					};
				}
			});

			var oldCallbacks = [],
			    rjsonp = /(=)\?(?=&|$)|\?\?/;

			jQuery.ajaxSetup({
				jsonp: "callback",
				jsonpCallback: function jsonpCallback() {
					var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
					this[callback] = true;
					return callback;
				}
			});

			jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

				var callbackName,
				    overwritten,
				    responseContainer,
				    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

				if (jsonProp || s.dataTypes[0] === "jsonp") {
					callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

					if (jsonProp) {
						s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
					} else if (s.jsonp !== false) {
						s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
					}

					s.converters["script json"] = function () {
						if (!responseContainer) {
							jQuery.error(callbackName + " was not called");
						}
						return responseContainer[0];
					};

					s.dataTypes[0] = "json";

					overwritten = window[callbackName];
					window[callbackName] = function () {
						responseContainer = arguments;
					};

					jqXHR.always(function () {
						if (overwritten === undefined) {
							jQuery(window).removeProp(callbackName);
						} else {
							window[callbackName] = overwritten;
						}

						if (s[callbackName]) {
							s.jsonpCallback = originalSettings.jsonpCallback;

							oldCallbacks.push(callbackName);
						}

						if (responseContainer && jQuery.isFunction(overwritten)) {
							overwritten(responseContainer[0]);
						}

						responseContainer = overwritten = undefined;
					});

					return "script";
				}
			});

			support.createHTMLDocument = function () {
				var body = document.implementation.createHTMLDocument("").body;
				body.innerHTML = "<form></form><form></form>";
				return body.childNodes.length === 2;
			}();

			jQuery.parseHTML = function (data, context, keepScripts) {
				if (typeof data !== "string") {
					return [];
				}
				if (typeof context === "boolean") {
					keepScripts = context;
					context = false;
				}

				var base, parsed, scripts;

				if (!context) {
					if (support.createHTMLDocument) {
						context = document.implementation.createHTMLDocument("");

						base = context.createElement("base");
						base.href = document.location.href;
						context.head.appendChild(base);
					} else {
						context = document;
					}
				}

				parsed = rsingleTag.exec(data);
				scripts = !keepScripts && [];

				if (parsed) {
					return [context.createElement(parsed[1])];
				}

				parsed = buildFragment([data], context, scripts);

				if (scripts && scripts.length) {
					jQuery(scripts).remove();
				}

				return jQuery.merge([], parsed.childNodes);
			};

			jQuery.fn.load = function (url, params, callback) {
				var selector,
				    type,
				    response,
				    self = this,
				    off = url.indexOf(" ");

				if (off > -1) {
					selector = stripAndCollapse(url.slice(off));
					url = url.slice(0, off);
				}

				if (jQuery.isFunction(params)) {
					callback = params;
					params = undefined;
				} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
					type = "POST";
				}

				if (self.length > 0) {
					jQuery.ajax({
						url: url,

						type: type || "GET",
						dataType: "html",
						data: params
					}).done(function (responseText) {
						response = arguments;

						self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
					}).always(callback && function (jqXHR, status) {
						self.each(function () {
							callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
						});
					});
				}

				return this;
			};

			jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
				jQuery.fn[type] = function (fn) {
					return this.on(type, fn);
				};
			});

			jQuery.expr.pseudos.animated = function (elem) {
				return jQuery.grep(jQuery.timers, function (fn) {
					return elem === fn.elem;
				}).length;
			};

			jQuery.offset = {
				setOffset: function setOffset(elem, options, i) {
					var curPosition,
					    curLeft,
					    curCSSTop,
					    curTop,
					    curOffset,
					    curCSSLeft,
					    calculatePosition,
					    position = jQuery.css(elem, "position"),
					    curElem = jQuery(elem),
					    props = {};

					if (position === "static") {
						elem.style.position = "relative";
					}

					curOffset = curElem.offset();
					curCSSTop = jQuery.css(elem, "top");
					curCSSLeft = jQuery.css(elem, "left");
					calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

					if (calculatePosition) {
						curPosition = curElem.position();
						curTop = curPosition.top;
						curLeft = curPosition.left;
					} else {
						curTop = parseFloat(curCSSTop) || 0;
						curLeft = parseFloat(curCSSLeft) || 0;
					}

					if (jQuery.isFunction(options)) {
						options = options.call(elem, i, jQuery.extend({}, curOffset));
					}

					if (options.top != null) {
						props.top = options.top - curOffset.top + curTop;
					}
					if (options.left != null) {
						props.left = options.left - curOffset.left + curLeft;
					}

					if ("using" in options) {
						options.using.call(elem, props);
					} else {
						curElem.css(props);
					}
				}
			};

			jQuery.fn.extend({
				offset: function offset(options) {
					if (arguments.length) {
						return options === undefined ? this : this.each(function (i) {
							jQuery.offset.setOffset(this, options, i);
						});
					}

					var doc,
					    docElem,
					    rect,
					    win,
					    elem = this[0];

					if (!elem) {
						return;
					}

					if (!elem.getClientRects().length) {
						return { top: 0, left: 0 };
					}

					rect = elem.getBoundingClientRect();

					doc = elem.ownerDocument;
					docElem = doc.documentElement;
					win = doc.defaultView;

					return {
						top: rect.top + win.pageYOffset - docElem.clientTop,
						left: rect.left + win.pageXOffset - docElem.clientLeft
					};
				},

				position: function position() {
					if (!this[0]) {
						return;
					}

					var offsetParent,
					    offset,
					    elem = this[0],
					    parentOffset = { top: 0, left: 0 };

					if (jQuery.css(elem, "position") === "fixed") {
						offset = elem.getBoundingClientRect();
					} else {
						offsetParent = this.offsetParent();

						offset = this.offset();
						if (!nodeName(offsetParent[0], "html")) {
							parentOffset = offsetParent.offset();
						}

						parentOffset = {
							top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
							left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
						};
					}

					return {
						top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
						left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
					};
				},

				offsetParent: function offsetParent() {
					return this.map(function () {
						var offsetParent = this.offsetParent;

						while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
							offsetParent = offsetParent.offsetParent;
						}

						return offsetParent || documentElement;
					});
				}
			});

			jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
				var top = "pageYOffset" === prop;

				jQuery.fn[method] = function (val) {
					return access(this, function (elem, method, val) {
						var win;
						if (jQuery.isWindow(elem)) {
							win = elem;
						} else if (elem.nodeType === 9) {
							win = elem.defaultView;
						}

						if (val === undefined) {
							return win ? win[prop] : elem[method];
						}

						if (win) {
							win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
						} else {
							elem[method] = val;
						}
					}, method, val, arguments.length);
				};
			});

			jQuery.each(["top", "left"], function (i, prop) {
				jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
					if (computed) {
						computed = curCSS(elem, prop);

						return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
					}
				});
			});

			jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
				jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
					jQuery.fn[funcName] = function (margin, value) {
						var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
						    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

						return access(this, function (elem, type, value) {
							var doc;

							if (jQuery.isWindow(elem)) {
								return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
							}

							if (elem.nodeType === 9) {
								doc = elem.documentElement;

								return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
							}

							return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
						}, type, chainable ? margin : undefined, chainable);
					};
				});
			});

			jQuery.fn.extend({

				bind: function bind(types, data, fn) {
					return this.on(types, null, data, fn);
				},
				unbind: function unbind(types, fn) {
					return this.off(types, null, fn);
				},

				delegate: function delegate(selector, types, data, fn) {
					return this.on(types, selector, data, fn);
				},
				undelegate: function undelegate(selector, types, fn) {
					return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
				}
			});

			jQuery.holdReady = function (hold) {
				if (hold) {
					jQuery.readyWait++;
				} else {
					jQuery.ready(true);
				}
			};
			jQuery.isArray = Array.isArray;
			jQuery.parseJSON = JSON.parse;
			jQuery.nodeName = nodeName;

			if (typeof define === "function" && define.amd) {
				define("jquery", [], function () {
					return jQuery;
				});
			}

			var _jQuery = window.jQuery,
			    _$ = window.$;

			jQuery.noConflict = function (deep) {
				if (window.$ === jQuery) {
					window.$ = _$;
				}

				if (deep && window.jQuery === jQuery) {
					window.jQuery = _jQuery;
				}

				return jQuery;
			};

			if (!noGlobal) {
				window.jQuery = window.$ = jQuery;
			}

			return jQuery;
		});
	}, {}], 42: [function (require, module, exports) {
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
	}, {}], 43: [function (require, module, exports) {
		module.exports.addStyleElement = function (css) {
			var style;
			style = document.createElement('style');
			style.setAttribute('type', 'text/css');
			style.innerHTML = css;
			return document.head.appendChild(style);
		};
	}, {}], 44: [function (require, module, exports) {
		module.exports.normalizeCarriageReturns = function (source) {
			return source.replace(/\r\n/g, '\n');
		};
	}, {}], 45: [function (require, module, exports) {
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
			$ = require('jquery');
			_recurse = function recurse() {
				if ($(selector)[0]) {
					return handler(args);
				} else {
					return setTimeout(_recurse, interval);
				}
			};
			return _recurse();
		};
	}, { "jquery": 50 }], 46: [function (require, module, exports) {
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
	}, {}], 47: [function (require, module, exports) {
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
	}, {}], 48: [function (require, module, exports) {
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
	}, {}], 49: [function (require, module, exports) {
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
	}, {}], 50: [function (require, module, exports) {
		(function (global, factory) {

			"use strict";

			if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
				module.exports = global.document ? factory(global, true) : function (w) {
					if (!w.document) {
						throw new Error("jQuery requires a window with a document");
					}
					return factory(w);
				};
			} else {
				factory(global);
			}
		})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
			"use strict";

			var arr = [];

			var document = window.document;

			var getProto = Object.getPrototypeOf;

			var _slice2 = arr.slice;

			var concat = arr.concat;

			var push = arr.push;

			var indexOf = arr.indexOf;

			var class2type = {};

			var toString = class2type.toString;

			var hasOwn = class2type.hasOwnProperty;

			var fnToString = hasOwn.toString;

			var ObjectFunctionString = fnToString.call(Object);

			var support = {};

			function DOMEval(code, doc) {
				doc = doc || document;

				var script = doc.createElement("script");

				script.text = code;
				doc.head.appendChild(script).parentNode.removeChild(script);
			}


			var version = "3.1.0",
			    jQuery = function jQuery(selector, context) {
				return new jQuery.fn.init(selector, context);
			},
			    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			    rmsPrefix = /^-ms-/,
			    rdashAlpha = /-([a-z])/g,
			    fcamelCase = function fcamelCase(all, letter) {
				return letter.toUpperCase();
			};

			jQuery.fn = jQuery.prototype = {
				jquery: version,

				constructor: jQuery,

				length: 0,

				toArray: function toArray() {
					return _slice2.call(this);
				},

				get: function get(num) {
					return num != null ? num < 0 ? this[num + this.length] : this[num] : _slice2.call(this);
				},

				pushStack: function pushStack(elems) {
					var ret = jQuery.merge(this.constructor(), elems);

					ret.prevObject = this;

					return ret;
				},

				each: function each(callback) {
					return jQuery.each(this, callback);
				},

				map: function map(callback) {
					return this.pushStack(jQuery.map(this, function (elem, i) {
						return callback.call(elem, i, elem);
					}));
				},

				slice: function slice() {
					return this.pushStack(_slice2.apply(this, arguments));
				},

				first: function first() {
					return this.eq(0);
				},

				last: function last() {
					return this.eq(-1);
				},

				eq: function eq(i) {
					var len = this.length,
					    j = +i + (i < 0 ? len : 0);
					return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
				},

				end: function end() {
					return this.prevObject || this.constructor();
				},

				push: push,
				sort: arr.sort,
				splice: arr.splice
			};

			jQuery.extend = jQuery.fn.extend = function () {
				var options,
				    name,
				    src,
				    copy,
				    copyIsArray,
				    clone,
				    target = arguments[0] || {},
				    i = 1,
				    length = arguments.length,
				    deep = false;

				if (typeof target === "boolean") {
					deep = target;

					target = arguments[i] || {};
					i++;
				}

				if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
					target = {};
				}

				if (i === length) {
					target = this;
					i--;
				}

				for (; i < length; i++) {
					if ((options = arguments[i]) != null) {
						for (name in options) {
							src = target[name];
							copy = options[name];

							if (target === copy) {
								continue;
							}

							if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

								if (copyIsArray) {
									copyIsArray = false;
									clone = src && jQuery.isArray(src) ? src : [];
								} else {
									clone = src && jQuery.isPlainObject(src) ? src : {};
								}

								target[name] = jQuery.extend(deep, clone, copy);
							} else if (copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}

				return target;
			};

			jQuery.extend({
				expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

				isReady: true,

				error: function error(msg) {
					throw new Error(msg);
				},

				noop: function noop() {},

				isFunction: function isFunction(obj) {
					return jQuery.type(obj) === "function";
				},

				isArray: Array.isArray,

				isWindow: function isWindow(obj) {
					return obj != null && obj === obj.window;
				},

				isNumeric: function isNumeric(obj) {
					var type = jQuery.type(obj);
					return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
				},

				isPlainObject: function isPlainObject(obj) {
					var proto, Ctor;

					if (!obj || toString.call(obj) !== "[object Object]") {
						return false;
					}

					proto = getProto(obj);

					if (!proto) {
						return true;
					}

					Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
					return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
				},

				isEmptyObject: function isEmptyObject(obj) {
					var name;

					for (name in obj) {
						return false;
					}
					return true;
				},

				type: function type(obj) {
					if (obj == null) {
						return obj + "";
					}

					return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
				},

				globalEval: function globalEval(code) {
					DOMEval(code);
				},

				camelCase: function camelCase(string) {
					return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
				},

				nodeName: function nodeName(elem, name) {
					return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
				},

				each: function each(obj, callback) {
					var length,
					    i = 0;

					if (isArrayLike(obj)) {
						length = obj.length;
						for (; i < length; i++) {
							if (callback.call(obj[i], i, obj[i]) === false) {
								break;
							}
						}
					} else {
						for (i in obj) {
							if (callback.call(obj[i], i, obj[i]) === false) {
								break;
							}
						}
					}

					return obj;
				},

				trim: function trim(text) {
					return text == null ? "" : (text + "").replace(rtrim, "");
				},

				makeArray: function makeArray(arr, results) {
					var ret = results || [];

					if (arr != null) {
						if (isArrayLike(Object(arr))) {
							jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
						} else {
							push.call(ret, arr);
						}
					}

					return ret;
				},

				inArray: function inArray(elem, arr, i) {
					return arr == null ? -1 : indexOf.call(arr, elem, i);
				},

				merge: function merge(first, second) {
					var len = +second.length,
					    j = 0,
					    i = first.length;

					for (; j < len; j++) {
						first[i++] = second[j];
					}

					first.length = i;

					return first;
				},

				grep: function grep(elems, callback, invert) {
					var callbackInverse,
					    matches = [],
					    i = 0,
					    length = elems.length,
					    callbackExpect = !invert;

					for (; i < length; i++) {
						callbackInverse = !callback(elems[i], i);
						if (callbackInverse !== callbackExpect) {
							matches.push(elems[i]);
						}
					}

					return matches;
				},

				map: function map(elems, callback, arg) {
					var length,
					    value,
					    i = 0,
					    ret = [];

					if (isArrayLike(elems)) {
						length = elems.length;
						for (; i < length; i++) {
							value = callback(elems[i], i, arg);

							if (value != null) {
								ret.push(value);
							}
						}
					} else {
						for (i in elems) {
							value = callback(elems[i], i, arg);

							if (value != null) {
								ret.push(value);
							}
						}
					}

					return concat.apply([], ret);
				},

				guid: 1,

				proxy: function proxy(fn, context) {
					var tmp, args, proxy;

					if (typeof context === "string") {
						tmp = fn[context];
						context = fn;
						fn = tmp;
					}

					if (!jQuery.isFunction(fn)) {
						return undefined;
					}

					args = _slice2.call(arguments, 2);
					proxy = function proxy() {
						return fn.apply(context || this, args.concat(_slice2.call(arguments)));
					};

					proxy.guid = fn.guid = fn.guid || jQuery.guid++;

					return proxy;
				},

				now: Date.now,

				support: support
			});

			if (typeof Symbol === "function") {
				jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
			}

			jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
				class2type["[object " + name + "]"] = name.toLowerCase();
			});

			function isArrayLike(obj) {
				var length = !!obj && "length" in obj && obj.length,
				    type = jQuery.type(obj);

				if (type === "function" || jQuery.isWindow(obj)) {
					return false;
				}

				return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
			}
			var Sizzle = function (window) {

				var i,
				    support,
				    Expr,
				    getText,
				    isXML,
				    tokenize,
				    compile,
				    select,
				    outermostContext,
				    sortInput,
				    hasDuplicate,
				    setDocument,
				    document,
				    docElem,
				    documentIsHTML,
				    rbuggyQSA,
				    rbuggyMatches,
				    matches,
				    contains,
				    expando = "sizzle" + 1 * new Date(),
				    preferredDoc = window.document,
				    dirruns = 0,
				    done = 0,
				    classCache = createCache(),
				    tokenCache = createCache(),
				    compilerCache = createCache(),
				    sortOrder = function sortOrder(a, b) {
					if (a === b) {
						hasDuplicate = true;
					}
					return 0;
				},
				    hasOwn = {}.hasOwnProperty,
				    arr = [],
				    pop = arr.pop,
				    push_native = arr.push,
				    push = arr.push,
				    slice = arr.slice,
				    indexOf = function indexOf(list, elem) {
					var i = 0,
					    len = list.length;
					for (; i < len; i++) {
						if (list[i] === elem) {
							return i;
						}
					}
					return -1;
				},
				    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				    whitespace = "[\\x20\\t\\r\\n\\f]",
				    identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
				    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
				    pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
				    rwhitespace = new RegExp(whitespace + "+", "g"),
				    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
				    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
				    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
				    rpseudo = new RegExp(pseudos),
				    ridentifier = new RegExp("^" + identifier + "$"),
				    matchExpr = {
					"ID": new RegExp("^#(" + identifier + ")"),
					"CLASS": new RegExp("^\\.(" + identifier + ")"),
					"TAG": new RegExp("^(" + identifier + "|[*])"),
					"ATTR": new RegExp("^" + attributes),
					"PSEUDO": new RegExp("^" + pseudos),
					"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
					"bool": new RegExp("^(?:" + booleans + ")$", "i"),

					"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
				},
				    rinputs = /^(?:input|select|textarea|button)$/i,
				    rheader = /^h\d$/i,
				    rnative = /^[^{]+\{\s*\[native \w/,
				    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				    rsibling = /[+~]/,
				    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
				    funescape = function funescape(_, escaped, escapedWhitespace) {
					var high = "0x" + escaped - 0x10000;

					return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
				},
				    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
				    fcssescape = function fcssescape(ch, asCodePoint) {
					if (asCodePoint) {
						if (ch === "\0") {
							return "\uFFFD";
						}

						return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
					}

					return "\\" + ch;
				},
				    unloadHandler = function unloadHandler() {
					setDocument();
				},
				    disabledAncestor = addCombinator(function (elem) {
					return elem.disabled === true;
				}, { dir: "parentNode", next: "legend" });

				try {
					push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);

					arr[preferredDoc.childNodes.length].nodeType;
				} catch (e) {
					push = { apply: arr.length ? function (target, els) {
							push_native.apply(target, slice.call(els));
						} : function (target, els) {
							var j = target.length,
							    i = 0;

							while (target[j++] = els[i++]) {}
							target.length = j - 1;
						}
					};
				}

				function Sizzle(selector, context, results, seed) {
					var m,
					    i,
					    elem,
					    nid,
					    match,
					    groups,
					    newSelector,
					    newContext = context && context.ownerDocument,
					    nodeType = context ? context.nodeType : 9;

					results = results || [];

					if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

						return results;
					}

					if (!seed) {

						if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
							setDocument(context);
						}
						context = context || document;

						if (documentIsHTML) {
							if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
								if (m = match[1]) {
									if (nodeType === 9) {
										if (elem = context.getElementById(m)) {
											if (elem.id === m) {
												results.push(elem);
												return results;
											}
										} else {
											return results;
										}
									} else {
										if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

											results.push(elem);
											return results;
										}
									}
								} else if (match[2]) {
									push.apply(results, context.getElementsByTagName(selector));
									return results;
								} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

									push.apply(results, context.getElementsByClassName(m));
									return results;
								}
							}

							if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

								if (nodeType !== 1) {
									newContext = context;
									newSelector = selector;
								} else if (context.nodeName.toLowerCase() !== "object") {
									if (nid = context.getAttribute("id")) {
										nid = nid.replace(rcssescape, fcssescape);
									} else {
										context.setAttribute("id", nid = expando);
									}

									groups = tokenize(selector);
									i = groups.length;
									while (i--) {
										groups[i] = "#" + nid + " " + toSelector(groups[i]);
									}
									newSelector = groups.join(",");

									newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
								}

								if (newSelector) {
									try {
										push.apply(results, newContext.querySelectorAll(newSelector));
										return results;
									} catch (qsaError) {} finally {
										if (nid === expando) {
											context.removeAttribute("id");
										}
									}
								}
							}
						}
					}

					return select(selector.replace(rtrim, "$1"), context, results, seed);
				}

				function createCache() {
					var keys = [];

					function cache(key, value) {
						if (keys.push(key + " ") > Expr.cacheLength) {
							delete cache[keys.shift()];
						}
						return cache[key + " "] = value;
					}
					return cache;
				}

				function markFunction(fn) {
					fn[expando] = true;
					return fn;
				}

				function assert(fn) {
					var el = document.createElement("fieldset");

					try {
						return !!fn(el);
					} catch (e) {
						return false;
					} finally {
						if (el.parentNode) {
							el.parentNode.removeChild(el);
						}

						el = null;
					}
				}

				function addHandle(attrs, handler) {
					var arr = attrs.split("|"),
					    i = arr.length;

					while (i--) {
						Expr.attrHandle[arr[i]] = handler;
					}
				}

				function siblingCheck(a, b) {
					var cur = b && a,
					    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

					if (diff) {
						return diff;
					}

					if (cur) {
						while (cur = cur.nextSibling) {
							if (cur === b) {
								return -1;
							}
						}
					}

					return a ? 1 : -1;
				}

				function createInputPseudo(type) {
					return function (elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === type;
					};
				}

				function createButtonPseudo(type) {
					return function (elem) {
						var name = elem.nodeName.toLowerCase();
						return (name === "input" || name === "button") && elem.type === type;
					};
				}

				function createDisabledPseudo(disabled) {
					return function (elem) {
						return "label" in elem && elem.disabled === disabled || "form" in elem && elem.disabled === disabled || "form" in elem && elem.disabled === false && (elem.isDisabled === disabled || elem.isDisabled !== !disabled && ("label" in elem || !disabledAncestor(elem)) !== disabled);
					};
				}

				function createPositionalPseudo(fn) {
					return markFunction(function (argument) {
						argument = +argument;
						return markFunction(function (seed, matches) {
							var j,
							    matchIndexes = fn([], seed.length, argument),
							    i = matchIndexes.length;

							while (i--) {
								if (seed[j = matchIndexes[i]]) {
									seed[j] = !(matches[j] = seed[j]);
								}
							}
						});
					});
				}

				function testContext(context) {
					return context && typeof context.getElementsByTagName !== "undefined" && context;
				}

				support = Sizzle.support = {};

				isXML = Sizzle.isXML = function (elem) {
					var documentElement = elem && (elem.ownerDocument || elem).documentElement;
					return documentElement ? documentElement.nodeName !== "HTML" : false;
				};

				setDocument = Sizzle.setDocument = function (node) {
					var hasCompare,
					    subWindow,
					    doc = node ? node.ownerDocument || node : preferredDoc;

					if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
						return document;
					}

					document = doc;
					docElem = document.documentElement;
					documentIsHTML = !isXML(document);

					if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
						if (subWindow.addEventListener) {
							subWindow.addEventListener("unload", unloadHandler, false);
						} else if (subWindow.attachEvent) {
							subWindow.attachEvent("onunload", unloadHandler);
						}
					}

					support.attributes = assert(function (el) {
						el.className = "i";
						return !el.getAttribute("className");
					});

					support.getElementsByTagName = assert(function (el) {
						el.appendChild(document.createComment(""));
						return !el.getElementsByTagName("*").length;
					});

					support.getElementsByClassName = rnative.test(document.getElementsByClassName);

					support.getById = assert(function (el) {
						docElem.appendChild(el).id = expando;
						return !document.getElementsByName || !document.getElementsByName(expando).length;
					});

					if (support.getById) {
						Expr.find["ID"] = function (id, context) {
							if (typeof context.getElementById !== "undefined" && documentIsHTML) {
								var m = context.getElementById(id);
								return m ? [m] : [];
							}
						};
						Expr.filter["ID"] = function (id) {
							var attrId = id.replace(runescape, funescape);
							return function (elem) {
								return elem.getAttribute("id") === attrId;
							};
						};
					} else {
						delete Expr.find["ID"];

						Expr.filter["ID"] = function (id) {
							var attrId = id.replace(runescape, funescape);
							return function (elem) {
								var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
								return node && node.value === attrId;
							};
						};
					}

					Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
						if (typeof context.getElementsByTagName !== "undefined") {
							return context.getElementsByTagName(tag);
						} else if (support.qsa) {
							return context.querySelectorAll(tag);
						}
					} : function (tag, context) {
						var elem,
						    tmp = [],
						    i = 0,
						    results = context.getElementsByTagName(tag);

						if (tag === "*") {
							while (elem = results[i++]) {
								if (elem.nodeType === 1) {
									tmp.push(elem);
								}
							}

							return tmp;
						}
						return results;
					};

					Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
						if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
							return context.getElementsByClassName(className);
						}
					};

					rbuggyMatches = [];

					rbuggyQSA = [];

					if (support.qsa = rnative.test(document.querySelectorAll)) {
						assert(function (el) {
							docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

							if (el.querySelectorAll("[msallowcapture^='']").length) {
								rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
							}

							if (!el.querySelectorAll("[selected]").length) {
								rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
							}

							if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
								rbuggyQSA.push("~=");
							}

							if (!el.querySelectorAll(":checked").length) {
								rbuggyQSA.push(":checked");
							}

							if (!el.querySelectorAll("a#" + expando + "+*").length) {
								rbuggyQSA.push(".#.+[+~]");
							}
						});

						assert(function (el) {
							el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

							var input = document.createElement("input");
							input.setAttribute("type", "hidden");
							el.appendChild(input).setAttribute("name", "D");

							if (el.querySelectorAll("[name=d]").length) {
								rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
							}

							if (el.querySelectorAll(":enabled").length !== 2) {
								rbuggyQSA.push(":enabled", ":disabled");
							}

							docElem.appendChild(el).disabled = true;
							if (el.querySelectorAll(":disabled").length !== 2) {
								rbuggyQSA.push(":enabled", ":disabled");
							}

							el.querySelectorAll("*,:x");
							rbuggyQSA.push(",.*:");
						});
					}

					if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

						assert(function (el) {
							support.disconnectedMatch = matches.call(el, "*");

							matches.call(el, "[s!='']:x");
							rbuggyMatches.push("!=", pseudos);
						});
					}

					rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
					rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

					hasCompare = rnative.test(docElem.compareDocumentPosition);

					contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
						    bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
					} : function (a, b) {
						if (b) {
							while (b = b.parentNode) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};

					sortOrder = hasCompare ? function (a, b) {
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
						if (compare) {
							return compare;
						}

						compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;

						if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
							if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
								return -1;
							}
							if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
								return 1;
							}

							return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
						}

						return compare & 4 ? -1 : 1;
					} : function (a, b) {
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						var cur,
						    i = 0,
						    aup = a.parentNode,
						    bup = b.parentNode,
						    ap = [a],
						    bp = [b];

						if (!aup || !bup) {
							return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
						} else if (aup === bup) {
							return siblingCheck(a, b);
						}

						cur = a;
						while (cur = cur.parentNode) {
							ap.unshift(cur);
						}
						cur = b;
						while (cur = cur.parentNode) {
							bp.unshift(cur);
						}

						while (ap[i] === bp[i]) {
							i++;
						}

						return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
					};

					return document;
				};

				Sizzle.matches = function (expr, elements) {
					return Sizzle(expr, null, null, elements);
				};

				Sizzle.matchesSelector = function (elem, expr) {
					if ((elem.ownerDocument || elem) !== document) {
						setDocument(elem);
					}

					expr = expr.replace(rattributeQuotes, "='$1']");

					if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

						try {
							var ret = matches.call(elem, expr);

							if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
								return ret;
							}
						} catch (e) {}
					}

					return Sizzle(expr, document, null, [elem]).length > 0;
				};

				Sizzle.contains = function (context, elem) {
					if ((context.ownerDocument || context) !== document) {
						setDocument(context);
					}
					return contains(context, elem);
				};

				Sizzle.attr = function (elem, name) {
					if ((elem.ownerDocument || elem) !== document) {
						setDocument(elem);
					}

					var fn = Expr.attrHandle[name.toLowerCase()],
					    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

					return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				};

				Sizzle.escape = function (sel) {
					return (sel + "").replace(rcssescape, fcssescape);
				};

				Sizzle.error = function (msg) {
					throw new Error("Syntax error, unrecognized expression: " + msg);
				};

				Sizzle.uniqueSort = function (results) {
					var elem,
					    duplicates = [],
					    j = 0,
					    i = 0;

					hasDuplicate = !support.detectDuplicates;
					sortInput = !support.sortStable && results.slice(0);
					results.sort(sortOrder);

					if (hasDuplicate) {
						while (elem = results[i++]) {
							if (elem === results[i]) {
								j = duplicates.push(i);
							}
						}
						while (j--) {
							results.splice(duplicates[j], 1);
						}
					}

					sortInput = null;

					return results;
				};

				getText = Sizzle.getText = function (elem) {
					var node,
					    ret = "",
					    i = 0,
					    nodeType = elem.nodeType;

					if (!nodeType) {
						while (node = elem[i++]) {
							ret += getText(node);
						}
					} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
						if (typeof elem.textContent === "string") {
							return elem.textContent;
						} else {
							for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
								ret += getText(elem);
							}
						}
					} else if (nodeType === 3 || nodeType === 4) {
						return elem.nodeValue;
					}


					return ret;
				};

				Expr = Sizzle.selectors = {
					cacheLength: 50,

					createPseudo: markFunction,

					match: matchExpr,

					attrHandle: {},

					find: {},

					relative: {
						">": { dir: "parentNode", first: true },
						" ": { dir: "parentNode" },
						"+": { dir: "previousSibling", first: true },
						"~": { dir: "previousSibling" }
					},

					preFilter: {
						"ATTR": function ATTR(match) {
							match[1] = match[1].replace(runescape, funescape);

							match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

							if (match[2] === "~=") {
								match[3] = " " + match[3] + " ";
							}

							return match.slice(0, 4);
						},

						"CHILD": function CHILD(match) {
							match[1] = match[1].toLowerCase();

							if (match[1].slice(0, 3) === "nth") {
								if (!match[3]) {
									Sizzle.error(match[0]);
								}

								match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
								match[5] = +(match[7] + match[8] || match[3] === "odd");
							} else if (match[3]) {
								Sizzle.error(match[0]);
							}

							return match;
						},

						"PSEUDO": function PSEUDO(match) {
							var excess,
							    unquoted = !match[6] && match[2];

							if (matchExpr["CHILD"].test(match[0])) {
								return null;
							}

							if (match[3]) {
								match[2] = match[4] || match[5] || "";
							} else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
								match[0] = match[0].slice(0, excess);
								match[2] = unquoted.slice(0, excess);
							}

							return match.slice(0, 3);
						}
					},

					filter: {

						"TAG": function TAG(nodeNameSelector) {
							var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
							return nodeNameSelector === "*" ? function () {
								return true;
							} : function (elem) {
								return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
							};
						},

						"CLASS": function CLASS(className) {
							var pattern = classCache[className + " "];

							return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
								return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
							});
						},

						"ATTR": function ATTR(name, operator, check) {
							return function (elem) {
								var result = Sizzle.attr(elem, name);

								if (result == null) {
									return operator === "!=";
								}
								if (!operator) {
									return true;
								}

								result += "";

								return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
							};
						},

						"CHILD": function CHILD(type, what, argument, first, last) {
							var simple = type.slice(0, 3) !== "nth",
							    forward = type.slice(-4) !== "last",
							    ofType = what === "of-type";

							return first === 1 && last === 0 ? function (elem) {
								return !!elem.parentNode;
							} : function (elem, context, xml) {
								var cache,
								    uniqueCache,
								    outerCache,
								    node,
								    nodeIndex,
								    start,
								    dir = simple !== forward ? "nextSibling" : "previousSibling",
								    parent = elem.parentNode,
								    name = ofType && elem.nodeName.toLowerCase(),
								    useCache = !xml && !ofType,
								    diff = false;

								if (parent) {
									if (simple) {
										while (dir) {
											node = elem;
											while (node = node[dir]) {
												if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

													return false;
												}
											}

											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}

									start = [forward ? parent.firstChild : parent.lastChild];

									if (forward && useCache) {
										node = parent;
										outerCache = node[expando] || (node[expando] = {});

										uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

										cache = uniqueCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = nodeIndex && cache[2];
										node = nodeIndex && parent.childNodes[nodeIndex];

										while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
											if (node.nodeType === 1 && ++diff && node === elem) {
												uniqueCache[type] = [dirruns, nodeIndex, diff];
												break;
											}
										}
									} else {
										if (useCache) {
											node = elem;
											outerCache = node[expando] || (node[expando] = {});

											uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

											cache = uniqueCache[type] || [];
											nodeIndex = cache[0] === dirruns && cache[1];
											diff = nodeIndex;
										}

										if (diff === false) {
											while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

												if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
													if (useCache) {
														outerCache = node[expando] || (node[expando] = {});

														uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

														uniqueCache[type] = [dirruns, diff];
													}

													if (node === elem) {
														break;
													}
												}
											}
										}
									}

									diff -= last;
									return diff === first || diff % first === 0 && diff / first >= 0;
								}
							};
						},

						"PSEUDO": function PSEUDO(pseudo, argument) {
							var args,
							    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

							if (fn[expando]) {
								return fn(argument);
							}

							if (fn.length > 1) {
								args = [pseudo, pseudo, "", argument];
								return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
									var idx,
									    matched = fn(seed, argument),
									    i = matched.length;
									while (i--) {
										idx = indexOf(seed, matched[i]);
										seed[idx] = !(matches[idx] = matched[i]);
									}
								}) : function (elem) {
									return fn(elem, 0, args);
								};
							}

							return fn;
						}
					},

					pseudos: {
						"not": markFunction(function (selector) {
							var input = [],
							    results = [],
							    matcher = compile(selector.replace(rtrim, "$1"));

							return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
								var elem,
								    unmatched = matcher(seed, null, xml, []),
								    i = seed.length;

								while (i--) {
									if (elem = unmatched[i]) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) : function (elem, context, xml) {
								input[0] = elem;
								matcher(input, null, xml, results);

								input[0] = null;
								return !results.pop();
							};
						}),

						"has": markFunction(function (selector) {
							return function (elem) {
								return Sizzle(selector, elem).length > 0;
							};
						}),

						"contains": markFunction(function (text) {
							text = text.replace(runescape, funescape);
							return function (elem) {
								return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
							};
						}),

						"lang": markFunction(function (lang) {
							if (!ridentifier.test(lang || "")) {
								Sizzle.error("unsupported lang: " + lang);
							}
							lang = lang.replace(runescape, funescape).toLowerCase();
							return function (elem) {
								var elemLang;
								do {
									if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

										elemLang = elemLang.toLowerCase();
										return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
									}
								} while ((elem = elem.parentNode) && elem.nodeType === 1);
								return false;
							};
						}),

						"target": function target(elem) {
							var hash = window.location && window.location.hash;
							return hash && hash.slice(1) === elem.id;
						},

						"root": function root(elem) {
							return elem === docElem;
						},

						"focus": function focus(elem) {
							return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
						},

						"enabled": createDisabledPseudo(false),
						"disabled": createDisabledPseudo(true),

						"checked": function checked(elem) {
							var nodeName = elem.nodeName.toLowerCase();
							return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
						},

						"selected": function selected(elem) {
							if (elem.parentNode) {
								elem.parentNode.selectedIndex;
							}

							return elem.selected === true;
						},

						"empty": function empty(elem) {
							for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
								if (elem.nodeType < 6) {
									return false;
								}
							}
							return true;
						},

						"parent": function parent(elem) {
							return !Expr.pseudos["empty"](elem);
						},

						"header": function header(elem) {
							return rheader.test(elem.nodeName);
						},

						"input": function input(elem) {
							return rinputs.test(elem.nodeName);
						},

						"button": function button(elem) {
							var name = elem.nodeName.toLowerCase();
							return name === "input" && elem.type === "button" || name === "button";
						},

						"text": function text(elem) {
							var attr;
							return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
						},

						"first": createPositionalPseudo(function () {
							return [0];
						}),

						"last": createPositionalPseudo(function (matchIndexes, length) {
							return [length - 1];
						}),

						"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
							return [argument < 0 ? argument + length : argument];
						}),

						"even": createPositionalPseudo(function (matchIndexes, length) {
							var i = 0;
							for (; i < length; i += 2) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"odd": createPositionalPseudo(function (matchIndexes, length) {
							var i = 1;
							for (; i < length; i += 2) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
							var i = argument < 0 ? argument + length : argument;
							for (; --i >= 0;) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
							var i = argument < 0 ? argument + length : argument;
							for (; ++i < length;) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						})
					}
				};

				Expr.pseudos["nth"] = Expr.pseudos["eq"];

				for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
					Expr.pseudos[i] = createInputPseudo(i);
				}
				for (i in { submit: true, reset: true }) {
					Expr.pseudos[i] = createButtonPseudo(i);
				}

				function setFilters() {}
				setFilters.prototype = Expr.filters = Expr.pseudos;
				Expr.setFilters = new setFilters();

				tokenize = Sizzle.tokenize = function (selector, parseOnly) {
					var matched,
					    match,
					    tokens,
					    type,
					    soFar,
					    groups,
					    preFilters,
					    cached = tokenCache[selector + " "];

					if (cached) {
						return parseOnly ? 0 : cached.slice(0);
					}

					soFar = selector;
					groups = [];
					preFilters = Expr.preFilter;

					while (soFar) {
						if (!matched || (match = rcomma.exec(soFar))) {
							if (match) {
								soFar = soFar.slice(match[0].length) || soFar;
							}
							groups.push(tokens = []);
						}

						matched = false;

						if (match = rcombinators.exec(soFar)) {
							matched = match.shift();
							tokens.push({
								value: matched,

								type: match[0].replace(rtrim, " ")
							});
							soFar = soFar.slice(matched.length);
						}

						for (type in Expr.filter) {
							if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
								matched = match.shift();
								tokens.push({
									value: matched,
									type: type,
									matches: match
								});
								soFar = soFar.slice(matched.length);
							}
						}

						if (!matched) {
							break;
						}
					}

					return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
				};

				function toSelector(tokens) {
					var i = 0,
					    len = tokens.length,
					    selector = "";
					for (; i < len; i++) {
						selector += tokens[i].value;
					}
					return selector;
				}

				function addCombinator(matcher, combinator, base) {
					var dir = combinator.dir,
					    skip = combinator.next,
					    key = skip || dir,
					    checkNonElements = base && key === "parentNode",
					    doneName = done++;

					return combinator.first ? function (elem, context, xml) {
						while (elem = elem[dir]) {
							if (elem.nodeType === 1 || checkNonElements) {
								return matcher(elem, context, xml);
							}
						}
					} : function (elem, context, xml) {
						var oldCache,
						    uniqueCache,
						    outerCache,
						    newCache = [dirruns, doneName];

						if (xml) {
							while (elem = elem[dir]) {
								if (elem.nodeType === 1 || checkNonElements) {
									if (matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						} else {
							while (elem = elem[dir]) {
								if (elem.nodeType === 1 || checkNonElements) {
									outerCache = elem[expando] || (elem[expando] = {});

									uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

									if (skip && skip === elem.nodeName.toLowerCase()) {
										elem = elem[dir] || elem;
									} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
										return newCache[2] = oldCache[2];
									} else {
										uniqueCache[key] = newCache;

										if (newCache[2] = matcher(elem, context, xml)) {
											return true;
										}
									}
								}
							}
						}
					};
				}

				function elementMatcher(matchers) {
					return matchers.length > 1 ? function (elem, context, xml) {
						var i = matchers.length;
						while (i--) {
							if (!matchers[i](elem, context, xml)) {
								return false;
							}
						}
						return true;
					} : matchers[0];
				}

				function multipleContexts(selector, contexts, results) {
					var i = 0,
					    len = contexts.length;
					for (; i < len; i++) {
						Sizzle(selector, contexts[i], results);
					}
					return results;
				}

				function condense(unmatched, map, filter, context, xml) {
					var elem,
					    newUnmatched = [],
					    i = 0,
					    len = unmatched.length,
					    mapped = map != null;

					for (; i < len; i++) {
						if (elem = unmatched[i]) {
							if (!filter || filter(elem, context, xml)) {
								newUnmatched.push(elem);
								if (mapped) {
									map.push(i);
								}
							}
						}
					}

					return newUnmatched;
				}

				function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
					if (postFilter && !postFilter[expando]) {
						postFilter = setMatcher(postFilter);
					}
					if (postFinder && !postFinder[expando]) {
						postFinder = setMatcher(postFinder, postSelector);
					}
					return markFunction(function (seed, results, context, xml) {
						var temp,
						    i,
						    elem,
						    preMap = [],
						    postMap = [],
						    preexisting = results.length,
						    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
						    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
						    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;

						if (matcher) {
							matcher(matcherIn, matcherOut, context, xml);
						}

						if (postFilter) {
							temp = condense(matcherOut, postMap);
							postFilter(temp, [], context, xml);

							i = temp.length;
							while (i--) {
								if (elem = temp[i]) {
									matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
								}
							}
						}

						if (seed) {
							if (postFinder || preFilter) {
								if (postFinder) {
									temp = [];
									i = matcherOut.length;
									while (i--) {
										if (elem = matcherOut[i]) {
											temp.push(matcherIn[i] = elem);
										}
									}
									postFinder(null, matcherOut = [], temp, xml);
								}

								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

										seed[temp] = !(results[temp] = elem);
									}
								}
							}
						} else {
							matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
							if (postFinder) {
								postFinder(null, results, matcherOut, xml);
							} else {
								push.apply(results, matcherOut);
							}
						}
					});
				}

				function matcherFromTokens(tokens) {
					var checkContext,
					    matcher,
					    j,
					    len = tokens.length,
					    leadingRelative = Expr.relative[tokens[0].type],
					    implicitRelative = leadingRelative || Expr.relative[" "],
					    i = leadingRelative ? 1 : 0,
					    matchContext = addCombinator(function (elem) {
						return elem === checkContext;
					}, implicitRelative, true),
					    matchAnyContext = addCombinator(function (elem) {
						return indexOf(checkContext, elem) > -1;
					}, implicitRelative, true),
					    matchers = [function (elem, context, xml) {
						var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));

						checkContext = null;
						return ret;
					}];

					for (; i < len; i++) {
						if (matcher = Expr.relative[tokens[i].type]) {
							matchers = [addCombinator(elementMatcher(matchers), matcher)];
						} else {
							matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

							if (matcher[expando]) {
								j = ++i;
								for (; j < len; j++) {
									if (Expr.relative[tokens[j].type]) {
										break;
									}
								}
								return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
							}
							matchers.push(matcher);
						}
					}

					return elementMatcher(matchers);
				}

				function matcherFromGroupMatchers(elementMatchers, setMatchers) {
					var bySet = setMatchers.length > 0,
					    byElement = elementMatchers.length > 0,
					    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
						var elem,
						    j,
						    matcher,
						    matchedCount = 0,
						    i = "0",
						    unmatched = seed && [],
						    setMatched = [],
						    contextBackup = outermostContext,
						    elems = seed || byElement && Expr.find["TAG"]("*", outermost),
						    dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
						    len = elems.length;

						if (outermost) {
							outermostContext = context === document || context || outermost;
						}

						for (; i !== len && (elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								if (!context && elem.ownerDocument !== document) {
									setDocument(elem);
									xml = !documentIsHTML;
								}
								while (matcher = elementMatchers[j++]) {
									if (matcher(elem, context || document, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
								}
							}

							if (bySet) {
								if (elem = !matcher && elem) {
									matchedCount--;
								}

								if (seed) {
									unmatched.push(elem);
								}
							}
						}

						matchedCount += i;

						if (bySet && i !== matchedCount) {
							j = 0;
							while (matcher = setMatchers[j++]) {
								matcher(unmatched, setMatched, context, xml);
							}

							if (seed) {
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}

								setMatched = condense(setMatched);
							}

							push.apply(results, setMatched);

							if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

								Sizzle.uniqueSort(results);
							}
						}

						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}

						return unmatched;
					};

					return bySet ? markFunction(superMatcher) : superMatcher;
				}

				compile = Sizzle.compile = function (selector, match) {
					var i,
					    setMatchers = [],
					    elementMatchers = [],
					    cached = compilerCache[selector + " "];

					if (!cached) {
						if (!match) {
							match = tokenize(selector);
						}
						i = match.length;
						while (i--) {
							cached = matcherFromTokens(match[i]);
							if (cached[expando]) {
								setMatchers.push(cached);
							} else {
								elementMatchers.push(cached);
							}
						}

						cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

						cached.selector = selector;
					}
					return cached;
				};

				select = Sizzle.select = function (selector, context, results, seed) {
					var i,
					    tokens,
					    token,
					    type,
					    find,
					    compiled = typeof selector === "function" && selector,
					    match = !seed && tokenize(selector = compiled.selector || selector);

					results = results || [];

					if (match.length === 1) {
						tokens = match[0] = match[0].slice(0);
						if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

							context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
							if (!context) {
								return results;
							} else if (compiled) {
								context = context.parentNode;
							}

							selector = selector.slice(tokens.shift().value.length);
						}

						i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
						while (i--) {
							token = tokens[i];

							if (Expr.relative[type = token.type]) {
								break;
							}
							if (find = Expr.find[type]) {
								if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
									tokens.splice(i, 1);
									selector = seed.length && toSelector(tokens);
									if (!selector) {
										push.apply(results, seed);
										return results;
									}

									break;
								}
							}
						}
					}

					(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
					return results;
				};

				support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

				support.detectDuplicates = !!hasDuplicate;

				setDocument();

				support.sortDetached = assert(function (el) {
					return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
				});

				if (!assert(function (el) {
					el.innerHTML = "<a href='#'></a>";
					return el.firstChild.getAttribute("href") === "#";
				})) {
					addHandle("type|href|height|width", function (elem, name, isXML) {
						if (!isXML) {
							return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
						}
					});
				}

				if (!support.attributes || !assert(function (el) {
					el.innerHTML = "<input/>";
					el.firstChild.setAttribute("value", "");
					return el.firstChild.getAttribute("value") === "";
				})) {
					addHandle("value", function (elem, name, isXML) {
						if (!isXML && elem.nodeName.toLowerCase() === "input") {
							return elem.defaultValue;
						}
					});
				}

				if (!assert(function (el) {
					return el.getAttribute("disabled") == null;
				})) {
					addHandle(booleans, function (elem, name, isXML) {
						var val;
						if (!isXML) {
							return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
						}
					});
				}

				return Sizzle;
			}(window);

			jQuery.find = Sizzle;
			jQuery.expr = Sizzle.selectors;

			jQuery.expr[":"] = jQuery.expr.pseudos;
			jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
			jQuery.text = Sizzle.getText;
			jQuery.isXMLDoc = Sizzle.isXML;
			jQuery.contains = Sizzle.contains;
			jQuery.escapeSelector = Sizzle.escape;

			var dir = function dir(elem, _dir2, until) {
				var matched = [],
				    truncate = until !== undefined;

				while ((elem = elem[_dir2]) && elem.nodeType !== 9) {
					if (elem.nodeType === 1) {
						if (truncate && jQuery(elem).is(until)) {
							break;
						}
						matched.push(elem);
					}
				}
				return matched;
			};

			var _siblings2 = function _siblings2(n, elem) {
				var matched = [];

				for (; n; n = n.nextSibling) {
					if (n.nodeType === 1 && n !== elem) {
						matched.push(n);
					}
				}

				return matched;
			};

			var rneedsContext = jQuery.expr.match.needsContext;

			var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

			var risSimple = /^.[^:#\[\.,]*$/;

			function winnow(elements, qualifier, not) {
				if (jQuery.isFunction(qualifier)) {
					return jQuery.grep(elements, function (elem, i) {
						return !!qualifier.call(elem, i, elem) !== not;
					});
				}

				if (qualifier.nodeType) {
					return jQuery.grep(elements, function (elem) {
						return elem === qualifier !== not;
					});
				}

				if (typeof qualifier === "string") {
					if (risSimple.test(qualifier)) {
						return jQuery.filter(qualifier, elements, not);
					}

					qualifier = jQuery.filter(qualifier, elements);
				}

				return jQuery.grep(elements, function (elem) {
					return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
				});
			}

			jQuery.filter = function (expr, elems, not) {
				var elem = elems[0];

				if (not) {
					expr = ":not(" + expr + ")";
				}

				return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
					return elem.nodeType === 1;
				}));
			};

			jQuery.fn.extend({
				find: function find(selector) {
					var i,
					    ret,
					    len = this.length,
					    self = this;

					if (typeof selector !== "string") {
						return this.pushStack(jQuery(selector).filter(function () {
							for (i = 0; i < len; i++) {
								if (jQuery.contains(self[i], this)) {
									return true;
								}
							}
						}));
					}

					ret = this.pushStack([]);

					for (i = 0; i < len; i++) {
						jQuery.find(selector, self[i], ret);
					}

					return len > 1 ? jQuery.uniqueSort(ret) : ret;
				},
				filter: function filter(selector) {
					return this.pushStack(winnow(this, selector || [], false));
				},
				not: function not(selector) {
					return this.pushStack(winnow(this, selector || [], true));
				},
				is: function is(selector) {
					return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
				}
			});

			var rootjQuery,
			    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
			    init = jQuery.fn.init = function (selector, context, root) {
				var match, elem;

				if (!selector) {
					return this;
				}

				root = root || rootjQuery;

				if (typeof selector === "string") {
					if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
						match = [null, selector, null];
					} else {
						match = rquickExpr.exec(selector);
					}

					if (match && (match[1] || !context)) {
						if (match[1]) {
							context = context instanceof jQuery ? context[0] : context;

							jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

							if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
								for (match in context) {
									if (jQuery.isFunction(this[match])) {
										this[match](context[match]);
									} else {
										this.attr(match, context[match]);
									}
								}
							}

							return this;
						} else {
							elem = document.getElementById(match[2]);

							if (elem) {
								this[0] = elem;
								this.length = 1;
							}
							return this;
						}
					} else if (!context || context.jquery) {
						return (context || root).find(selector);
					} else {
						return this.constructor(context).find(selector);
					}
				} else if (selector.nodeType) {
					this[0] = selector;
					this.length = 1;
					return this;
				} else if (jQuery.isFunction(selector)) {
					return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
				}

				return jQuery.makeArray(selector, this);
			};

			init.prototype = jQuery.fn;

			rootjQuery = jQuery(document);

			var rparentsprev = /^(?:parents|prev(?:Until|All))/,
			    guaranteedUnique = {
				children: true,
				contents: true,
				next: true,
				prev: true
			};

			jQuery.fn.extend({
				has: function has(target) {
					var targets = jQuery(target, this),
					    l = targets.length;

					return this.filter(function () {
						var i = 0;
						for (; i < l; i++) {
							if (jQuery.contains(this, targets[i])) {
								return true;
							}
						}
					});
				},

				closest: function closest(selectors, context) {
					var cur,
					    i = 0,
					    l = this.length,
					    matched = [],
					    targets = typeof selectors !== "string" && jQuery(selectors);

					if (!rneedsContext.test(selectors)) {
						for (; i < l; i++) {
							for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
								if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

									matched.push(cur);
									break;
								}
							}
						}
					}

					return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
				},

				index: function index(elem) {
					if (!elem) {
						return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
					}

					if (typeof elem === "string") {
						return indexOf.call(jQuery(elem), this[0]);
					}

					return indexOf.call(this, elem.jquery ? elem[0] : elem);
				},

				add: function add(selector, context) {
					return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
				},

				addBack: function addBack(selector) {
					return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
				}
			});

			function sibling(cur, dir) {
				while ((cur = cur[dir]) && cur.nodeType !== 1) {}
				return cur;
			}

			jQuery.each({
				parent: function parent(elem) {
					var parent = elem.parentNode;
					return parent && parent.nodeType !== 11 ? parent : null;
				},
				parents: function parents(elem) {
					return dir(elem, "parentNode");
				},
				parentsUntil: function parentsUntil(elem, i, until) {
					return dir(elem, "parentNode", until);
				},
				next: function next(elem) {
					return sibling(elem, "nextSibling");
				},
				prev: function prev(elem) {
					return sibling(elem, "previousSibling");
				},
				nextAll: function nextAll(elem) {
					return dir(elem, "nextSibling");
				},
				prevAll: function prevAll(elem) {
					return dir(elem, "previousSibling");
				},
				nextUntil: function nextUntil(elem, i, until) {
					return dir(elem, "nextSibling", until);
				},
				prevUntil: function prevUntil(elem, i, until) {
					return dir(elem, "previousSibling", until);
				},
				siblings: function siblings(elem) {
					return _siblings2((elem.parentNode || {}).firstChild, elem);
				},
				children: function children(elem) {
					return _siblings2(elem.firstChild);
				},
				contents: function contents(elem) {
					return elem.contentDocument || jQuery.merge([], elem.childNodes);
				}
			}, function (name, fn) {
				jQuery.fn[name] = function (until, selector) {
					var matched = jQuery.map(this, fn, until);

					if (name.slice(-5) !== "Until") {
						selector = until;
					}

					if (selector && typeof selector === "string") {
						matched = jQuery.filter(selector, matched);
					}

					if (this.length > 1) {
						if (!guaranteedUnique[name]) {
							jQuery.uniqueSort(matched);
						}

						if (rparentsprev.test(name)) {
							matched.reverse();
						}
					}

					return this.pushStack(matched);
				};
			});
			var rnotwhite = /\S+/g;

			function createOptions(options) {
				var object = {};
				jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
					object[flag] = true;
				});
				return object;
			}

			jQuery.Callbacks = function (options) {
				options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

				var firing,
				    memory,
				    _fired2,
				    _locked2,
				    list = [],
				    queue = [],
				    firingIndex = -1,
				    fire = function fire() {
					_locked2 = options.once;

					_fired2 = firing = true;
					for (; queue.length; firingIndex = -1) {
						memory = queue.shift();
						while (++firingIndex < list.length) {
							if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
								firingIndex = list.length;
								memory = false;
							}
						}
					}

					if (!options.memory) {
						memory = false;
					}

					firing = false;

					if (_locked2) {
						if (memory) {
							list = [];
						} else {
							list = "";
						}
					}
				},
				    self = {
					add: function add() {
						if (list) {
							if (memory && !firing) {
								firingIndex = list.length - 1;
								queue.push(memory);
							}

							(function add(args) {
								jQuery.each(args, function (_, arg) {
									if (jQuery.isFunction(arg)) {
										if (!options.unique || !self.has(arg)) {
											list.push(arg);
										}
									} else if (arg && arg.length && jQuery.type(arg) !== "string") {
										add(arg);
									}
								});
							})(arguments);

							if (memory && !firing) {
								fire();
							}
						}
						return this;
					},

					remove: function remove() {
						jQuery.each(arguments, function (_, arg) {
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);

								if (index <= firingIndex) {
									firingIndex--;
								}
							}
						});
						return this;
					},

					has: function has(fn) {
						return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
					},

					empty: function empty() {
						if (list) {
							list = [];
						}
						return this;
					},

					disable: function disable() {
						_locked2 = queue = [];
						list = memory = "";
						return this;
					},
					disabled: function disabled() {
						return !list;
					},

					lock: function lock() {
						_locked2 = queue = [];
						if (!memory && !firing) {
							list = memory = "";
						}
						return this;
					},
					locked: function locked() {
						return !!_locked2;
					},

					fireWith: function fireWith(context, args) {
						if (!_locked2) {
							args = args || [];
							args = [context, args.slice ? args.slice() : args];
							queue.push(args);
							if (!firing) {
								fire();
							}
						}
						return this;
					},

					fire: function fire() {
						self.fireWith(this, arguments);
						return this;
					},

					fired: function fired() {
						return !!_fired2;
					}
				};

				return self;
			};

			function Identity(v) {
				return v;
			}
			function Thrower(ex) {
				throw ex;
			}

			function adoptValue(value, resolve, reject) {
				var method;

				try {
					if (value && jQuery.isFunction(method = value.promise)) {
						method.call(value).done(resolve).fail(reject);
					} else if (value && jQuery.isFunction(method = value.then)) {
						method.call(value, resolve, reject);
					} else {
						resolve.call(undefined, value);
					}
				} catch (value) {
					reject.call(undefined, value);
				}
			}

			jQuery.extend({

				Deferred: function Deferred(func) {
					var tuples = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
					    _state2 = "pending",
					    _promise2 = {
						state: function state() {
							return _state2;
						},
						always: function always() {
							deferred.done(arguments).fail(arguments);
							return this;
						},
						"catch": function _catch(fn) {
							return _promise2.then(null, fn);
						},

						pipe: function pipe() {
							var fns = arguments;

							return jQuery.Deferred(function (newDefer) {
								jQuery.each(tuples, function (i, tuple) {
									var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

									deferred[tuple[1]](function () {
										var returned = fn && fn.apply(this, arguments);
										if (returned && jQuery.isFunction(returned.promise)) {
											returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
										} else {
											newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
										}
									});
								});
								fns = null;
							}).promise();
						},
						then: function then(onFulfilled, onRejected, onProgress) {
							var maxDepth = 0;
							function resolve(depth, deferred, handler, special) {
								return function () {
									var that = this,
									    args = arguments,
									    mightThrow = function mightThrow() {
										var returned, then;

										if (depth < maxDepth) {
											return;
										}

										returned = handler.apply(that, args);

										if (returned === deferred.promise()) {
											throw new TypeError("Thenable self-resolution");
										}

										then = returned && ((typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

										if (jQuery.isFunction(then)) {
											if (special) {
												then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
											} else {
												maxDepth++;

												then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
											}
										} else {
											if (handler !== Identity) {
												that = undefined;
												args = [returned];
											}

											(special || deferred.resolveWith)(that, args);
										}
									},
									    process = special ? mightThrow : function () {
										try {
											mightThrow();
										} catch (e) {

											if (jQuery.Deferred.exceptionHook) {
												jQuery.Deferred.exceptionHook(e, process.stackTrace);
											}

											if (depth + 1 >= maxDepth) {
												if (handler !== Thrower) {
													that = undefined;
													args = [e];
												}

												deferred.rejectWith(that, args);
											}
										}
									};

									if (depth) {
										process();
									} else {
										if (jQuery.Deferred.getStackHook) {
											process.stackTrace = jQuery.Deferred.getStackHook();
										}
										window.setTimeout(process);
									}
								};
							}

							return jQuery.Deferred(function (newDefer) {
								tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

								tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

								tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
							}).promise();
						},

						promise: function promise(obj) {
							return obj != null ? jQuery.extend(obj, _promise2) : _promise2;
						}
					},
					    deferred = {};

					jQuery.each(tuples, function (i, tuple) {
						var list = tuple[2],
						    stateString = tuple[5];

						_promise2[tuple[1]] = list.add;

						if (stateString) {
							list.add(function () {
								_state2 = stateString;
							}, tuples[3 - i][2].disable, tuples[0][2].lock);
						}

						list.add(tuple[3].fire);

						deferred[tuple[0]] = function () {
							deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
							return this;
						};

						deferred[tuple[0] + "With"] = list.fireWith;
					});

					_promise2.promise(deferred);

					if (func) {
						func.call(deferred, deferred);
					}

					return deferred;
				},

				when: function when(singleValue) {
					var remaining = arguments.length,
					    i = remaining,
					    resolveContexts = Array(i),
					    resolveValues = _slice2.call(arguments),
					    master = jQuery.Deferred(),
					    updateFunc = function updateFunc(i) {
						return function (value) {
							resolveContexts[i] = this;
							resolveValues[i] = arguments.length > 1 ? _slice2.call(arguments) : value;
							if (! --remaining) {
								master.resolveWith(resolveContexts, resolveValues);
							}
						};
					};

					if (remaining <= 1) {
						adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);

						if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

							return master.then();
						}
					}

					while (i--) {
						adoptValue(resolveValues[i], updateFunc(i), master.reject);
					}

					return master.promise();
				}
			});

			var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

			jQuery.Deferred.exceptionHook = function (error, stack) {
				if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
					window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
				}
			};

			jQuery.readyException = function (error) {
				window.setTimeout(function () {
					throw error;
				});
			};

			var readyList = jQuery.Deferred();

			jQuery.fn.ready = function (fn) {

				readyList.then(fn).catch(function (error) {
					jQuery.readyException(error);
				});

				return this;
			};

			jQuery.extend({
				isReady: false,

				readyWait: 1,

				holdReady: function holdReady(hold) {
					if (hold) {
						jQuery.readyWait++;
					} else {
						jQuery.ready(true);
					}
				},

				ready: function ready(wait) {
					if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
						return;
					}

					jQuery.isReady = true;

					if (wait !== true && --jQuery.readyWait > 0) {
						return;
					}

					readyList.resolveWith(document, [jQuery]);
				}
			});

			jQuery.ready.then = readyList.then;

			function completed() {
				document.removeEventListener("DOMContentLoaded", completed);
				window.removeEventListener("load", completed);
				jQuery.ready();
			}

			if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
				window.setTimeout(jQuery.ready);
			} else {
				document.addEventListener("DOMContentLoaded", completed);

				window.addEventListener("load", completed);
			}

			var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
				var i = 0,
				    len = elems.length,
				    bulk = key == null;

				if (jQuery.type(key) === "object") {
					chainable = true;
					for (i in key) {
						access(elems, fn, i, key[i], true, emptyGet, raw);
					}
				} else if (value !== undefined) {
					chainable = true;

					if (!jQuery.isFunction(value)) {
						raw = true;
					}

					if (bulk) {
						if (raw) {
							fn.call(elems, value);
							fn = null;
						} else {
							bulk = fn;
							fn = function fn(elem, key, value) {
								return bulk.call(jQuery(elem), value);
							};
						}
					}

					if (fn) {
						for (; i < len; i++) {
							fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
						}
					}
				}

				return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
			};
			var acceptData = function acceptData(owner) {
				return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
			};

			function Data() {
				this.expando = jQuery.expando + Data.uid++;
			}

			Data.uid = 1;

			Data.prototype = {

				cache: function cache(owner) {
					var value = owner[this.expando];

					if (!value) {
						value = {};

						if (acceptData(owner)) {
							if (owner.nodeType) {
								owner[this.expando] = value;
							} else {
								Object.defineProperty(owner, this.expando, {
									value: value,
									configurable: true
								});
							}
						}
					}

					return value;
				},
				set: function set(owner, data, value) {
					var prop,
					    cache = this.cache(owner);

					if (typeof data === "string") {
						cache[jQuery.camelCase(data)] = value;
					} else {
						for (prop in data) {
							cache[jQuery.camelCase(prop)] = data[prop];
						}
					}
					return cache;
				},
				get: function get(owner, key) {
					return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
				},
				access: function access(owner, key, value) {
					if (key === undefined || key && typeof key === "string" && value === undefined) {

						return this.get(owner, key);
					}

					this.set(owner, key, value);

					return value !== undefined ? value : key;
				},
				remove: function remove(owner, key) {
					var i,
					    cache = owner[this.expando];

					if (cache === undefined) {
						return;
					}

					if (key !== undefined) {
						if (jQuery.isArray(key)) {
							key = key.map(jQuery.camelCase);
						} else {
							key = jQuery.camelCase(key);

							key = key in cache ? [key] : key.match(rnotwhite) || [];
						}

						i = key.length;

						while (i--) {
							delete cache[key[i]];
						}
					}

					if (key === undefined || jQuery.isEmptyObject(cache)) {
						if (owner.nodeType) {
							owner[this.expando] = undefined;
						} else {
							delete owner[this.expando];
						}
					}
				},
				hasData: function hasData(owner) {
					var cache = owner[this.expando];
					return cache !== undefined && !jQuery.isEmptyObject(cache);
				}
			};
			var dataPriv = new Data();

			var dataUser = new Data();

			var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			    rmultiDash = /[A-Z]/g;

			function dataAttr(elem, key, data) {
				var name;

				if (data === undefined && elem.nodeType === 1) {
					name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
					data = elem.getAttribute(name);

					if (typeof data === "string") {
						try {
							data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
						} catch (e) {}

						dataUser.set(elem, key, data);
					} else {
						data = undefined;
					}
				}
				return data;
			}

			jQuery.extend({
				hasData: function hasData(elem) {
					return dataUser.hasData(elem) || dataPriv.hasData(elem);
				},

				data: function data(elem, name, _data2) {
					return dataUser.access(elem, name, _data2);
				},

				removeData: function removeData(elem, name) {
					dataUser.remove(elem, name);
				},

				_data: function _data(elem, name, data) {
					return dataPriv.access(elem, name, data);
				},

				_removeData: function _removeData(elem, name) {
					dataPriv.remove(elem, name);
				}
			});

			jQuery.fn.extend({
				data: function data(key, value) {
					var i,
					    name,
					    data,
					    elem = this[0],
					    attrs = elem && elem.attributes;

					if (key === undefined) {
						if (this.length) {
							data = dataUser.get(elem);

							if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
								i = attrs.length;
								while (i--) {
									if (attrs[i]) {
										name = attrs[i].name;
										if (name.indexOf("data-") === 0) {
											name = jQuery.camelCase(name.slice(5));
											dataAttr(elem, name, data[name]);
										}
									}
								}
								dataPriv.set(elem, "hasDataAttrs", true);
							}
						}

						return data;
					}

					if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
						return this.each(function () {
							dataUser.set(this, key);
						});
					}

					return access(this, function (value) {
						var data;

						if (elem && value === undefined) {
							data = dataUser.get(elem, key);
							if (data !== undefined) {
								return data;
							}

							data = dataAttr(elem, key);
							if (data !== undefined) {
								return data;
							}

							return;
						}

						this.each(function () {
							dataUser.set(this, key, value);
						});
					}, null, value, arguments.length > 1, null, true);
				},

				removeData: function removeData(key) {
					return this.each(function () {
						dataUser.remove(this, key);
					});
				}
			});

			jQuery.extend({
				queue: function queue(elem, type, data) {
					var queue;

					if (elem) {
						type = (type || "fx") + "queue";
						queue = dataPriv.get(elem, type);

						if (data) {
							if (!queue || jQuery.isArray(data)) {
								queue = dataPriv.access(elem, type, jQuery.makeArray(data));
							} else {
								queue.push(data);
							}
						}
						return queue || [];
					}
				},

				dequeue: function dequeue(elem, type) {
					type = type || "fx";

					var queue = jQuery.queue(elem, type),
					    startLength = queue.length,
					    fn = queue.shift(),
					    hooks = jQuery._queueHooks(elem, type),
					    next = function next() {
						jQuery.dequeue(elem, type);
					};

					if (fn === "inprogress") {
						fn = queue.shift();
						startLength--;
					}

					if (fn) {
						if (type === "fx") {
							queue.unshift("inprogress");
						}

						delete hooks.stop;
						fn.call(elem, next, hooks);
					}

					if (!startLength && hooks) {
						hooks.empty.fire();
					}
				},

				_queueHooks: function _queueHooks(elem, type) {
					var key = type + "queueHooks";
					return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
						empty: jQuery.Callbacks("once memory").add(function () {
							dataPriv.remove(elem, [type + "queue", key]);
						})
					});
				}
			});

			jQuery.fn.extend({
				queue: function queue(type, data) {
					var setter = 2;

					if (typeof type !== "string") {
						data = type;
						type = "fx";
						setter--;
					}

					if (arguments.length < setter) {
						return jQuery.queue(this[0], type);
					}

					return data === undefined ? this : this.each(function () {
						var queue = jQuery.queue(this, type, data);

						jQuery._queueHooks(this, type);

						if (type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
					});
				},
				dequeue: function dequeue(type) {
					return this.each(function () {
						jQuery.dequeue(this, type);
					});
				},
				clearQueue: function clearQueue(type) {
					return this.queue(type || "fx", []);
				},

				promise: function promise(type, obj) {
					var tmp,
					    count = 1,
					    defer = jQuery.Deferred(),
					    elements = this,
					    i = this.length,
					    resolve = function resolve() {
						if (! --count) {
							defer.resolveWith(elements, [elements]);
						}
					};

					if (typeof type !== "string") {
						obj = type;
						type = undefined;
					}
					type = type || "fx";

					while (i--) {
						tmp = dataPriv.get(elements[i], type + "queueHooks");
						if (tmp && tmp.empty) {
							count++;
							tmp.empty.add(resolve);
						}
					}
					resolve();
					return defer.promise(obj);
				}
			});
			var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

			var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

			var cssExpand = ["Top", "Right", "Bottom", "Left"];

			var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {
				elem = el || elem;

				return elem.style.display === "none" || elem.style.display === "" && jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
			};

			var swap = function swap(elem, options, callback, args) {
				var ret,
				    name,
				    old = {};

				for (name in options) {
					old[name] = elem.style[name];
					elem.style[name] = options[name];
				}

				ret = callback.apply(elem, args || []);

				for (name in options) {
					elem.style[name] = old[name];
				}

				return ret;
			};

			function adjustCSS(elem, prop, valueParts, tween) {
				var adjusted,
				    scale = 1,
				    maxIterations = 20,
				    currentValue = tween ? function () {
					return tween.cur();
				} : function () {
					return jQuery.css(elem, prop, "");
				},
				    initial = currentValue(),
				    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
				    initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

				if (initialInUnit && initialInUnit[3] !== unit) {
					unit = unit || initialInUnit[3];

					valueParts = valueParts || [];

					initialInUnit = +initial || 1;

					do {
						scale = scale || ".5";

						initialInUnit = initialInUnit / scale;
						jQuery.style(elem, prop, initialInUnit + unit);
					} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
				}

				if (valueParts) {
					initialInUnit = +initialInUnit || +initial || 0;

					adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
					if (tween) {
						tween.unit = unit;
						tween.start = initialInUnit;
						tween.end = adjusted;
					}
				}
				return adjusted;
			}

			var defaultDisplayMap = {};

			function getDefaultDisplay(elem) {
				var temp,
				    doc = elem.ownerDocument,
				    nodeName = elem.nodeName,
				    display = defaultDisplayMap[nodeName];

				if (display) {
					return display;
				}

				temp = doc.body.appendChild(doc.createElement(nodeName)), display = jQuery.css(temp, "display");

				temp.parentNode.removeChild(temp);

				if (display === "none") {
					display = "block";
				}
				defaultDisplayMap[nodeName] = display;

				return display;
			}

			function showHide(elements, show) {
				var display,
				    elem,
				    values = [],
				    index = 0,
				    length = elements.length;

				for (; index < length; index++) {
					elem = elements[index];
					if (!elem.style) {
						continue;
					}

					display = elem.style.display;
					if (show) {
						if (display === "none") {
							values[index] = dataPriv.get(elem, "display") || null;
							if (!values[index]) {
								elem.style.display = "";
							}
						}
						if (elem.style.display === "" && isHiddenWithinTree(elem)) {
							values[index] = getDefaultDisplay(elem);
						}
					} else {
						if (display !== "none") {
							values[index] = "none";

							dataPriv.set(elem, "display", display);
						}
					}
				}

				for (index = 0; index < length; index++) {
					if (values[index] != null) {
						elements[index].style.display = values[index];
					}
				}

				return elements;
			}

			jQuery.fn.extend({
				show: function show() {
					return showHide(this, true);
				},
				hide: function hide() {
					return showHide(this);
				},
				toggle: function toggle(state) {
					if (typeof state === "boolean") {
						return state ? this.show() : this.hide();
					}

					return this.each(function () {
						if (isHiddenWithinTree(this)) {
							jQuery(this).show();
						} else {
							jQuery(this).hide();
						}
					});
				}
			});
			var rcheckableType = /^(?:checkbox|radio)$/i;

			var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

			var rscriptType = /^$|\/(?:java|ecma)script/i;

			var wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],

				thead: [1, "<table>", "</table>"],
				col: [2, "<table><colgroup>", "</colgroup></table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

				_default: [0, "", ""]
			};

			wrapMap.optgroup = wrapMap.option;

			wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
			wrapMap.th = wrapMap.td;

			function getAll(context, tag) {
				var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

				return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
			}

			function setGlobalEval(elems, refElements) {
				var i = 0,
				    l = elems.length;

				for (; i < l; i++) {
					dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
				}
			}

			var rhtml = /<|&#?\w+;/;

			function buildFragment(elems, context, scripts, selection, ignored) {
				var elem,
				    tmp,
				    tag,
				    wrap,
				    contains,
				    j,
				    fragment = context.createDocumentFragment(),
				    nodes = [],
				    i = 0,
				    l = elems.length;

				for (; i < l; i++) {
					elem = elems[i];

					if (elem || elem === 0) {
						if (jQuery.type(elem) === "object") {
							jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
						} else if (!rhtml.test(elem)) {
							nodes.push(context.createTextNode(elem));
						} else {
							tmp = tmp || fragment.appendChild(context.createElement("div"));

							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;
							tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild;
							}

							jQuery.merge(nodes, tmp.childNodes);

							tmp = fragment.firstChild;

							tmp.textContent = "";
						}
					}
				}

				fragment.textContent = "";

				i = 0;
				while (elem = nodes[i++]) {
					if (selection && jQuery.inArray(elem, selection) > -1) {
						if (ignored) {
							ignored.push(elem);
						}
						continue;
					}

					contains = jQuery.contains(elem.ownerDocument, elem);

					tmp = getAll(fragment.appendChild(elem), "script");

					if (contains) {
						setGlobalEval(tmp);
					}

					if (scripts) {
						j = 0;
						while (elem = tmp[j++]) {
							if (rscriptType.test(elem.type || "")) {
								scripts.push(elem);
							}
						}
					}
				}

				return fragment;
			}

			(function () {
				var fragment = document.createDocumentFragment(),
				    div = fragment.appendChild(document.createElement("div")),
				    input = document.createElement("input");

				input.setAttribute("type", "radio");
				input.setAttribute("checked", "checked");
				input.setAttribute("name", "t");

				div.appendChild(input);

				support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

				div.innerHTML = "<textarea>x</textarea>";
				support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
			})();
			var documentElement = document.documentElement;

			var rkeyEvent = /^key/,
			    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

			function returnTrue() {
				return true;
			}

			function returnFalse() {
				return false;
			}

			function safeActiveElement() {
				try {
					return document.activeElement;
				} catch (err) {}
			}

			function _on2(elem, types, selector, data, fn, one) {
				var origFn, type;

				if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
					if (typeof selector !== "string") {
						data = data || selector;
						selector = undefined;
					}
					for (type in types) {
						_on2(elem, type, selector, data, types[type], one);
					}
					return elem;
				}

				if (data == null && fn == null) {
					fn = selector;
					data = selector = undefined;
				} else if (fn == null) {
					if (typeof selector === "string") {
						fn = data;
						data = undefined;
					} else {
						fn = data;
						data = selector;
						selector = undefined;
					}
				}
				if (fn === false) {
					fn = returnFalse;
				} else if (!fn) {
					return elem;
				}

				if (one === 1) {
					origFn = fn;
					fn = function fn(event) {
						jQuery().off(event);
						return origFn.apply(this, arguments);
					};

					fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
				}
				return elem.each(function () {
					jQuery.event.add(this, types, fn, data, selector);
				});
			}

			jQuery.event = {

				global: {},

				add: function add(elem, types, handler, data, selector) {

					var handleObjIn,
					    eventHandle,
					    tmp,
					    events,
					    t,
					    handleObj,
					    special,
					    handlers,
					    type,
					    namespaces,
					    origType,
					    elemData = dataPriv.get(elem);

					if (!elemData) {
						return;
					}

					if (handler.handler) {
						handleObjIn = handler;
						handler = handleObjIn.handler;
						selector = handleObjIn.selector;
					}

					if (selector) {
						jQuery.find.matchesSelector(documentElement, selector);
					}

					if (!handler.guid) {
						handler.guid = jQuery.guid++;
					}

					if (!(events = elemData.events)) {
						events = elemData.events = {};
					}
					if (!(eventHandle = elemData.handle)) {
						eventHandle = elemData.handle = function (e) {
							return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
						};
					}

					types = (types || "").match(rnotwhite) || [""];
					t = types.length;
					while (t--) {
						tmp = rtypenamespace.exec(types[t]) || [];
						type = origType = tmp[1];
						namespaces = (tmp[2] || "").split(".").sort();

						if (!type) {
							continue;
						}

						special = jQuery.event.special[type] || {};

						type = (selector ? special.delegateType : special.bindType) || type;

						special = jQuery.event.special[type] || {};

						handleObj = jQuery.extend({
							type: type,
							origType: origType,
							data: data,
							handler: handler,
							guid: handler.guid,
							selector: selector,
							needsContext: selector && jQuery.expr.match.needsContext.test(selector),
							namespace: namespaces.join(".")
						}, handleObjIn);

						if (!(handlers = events[type])) {
							handlers = events[type] = [];
							handlers.delegateCount = 0;

							if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

								if (elem.addEventListener) {
									elem.addEventListener(type, eventHandle);
								}
							}
						}

						if (special.add) {
							special.add.call(elem, handleObj);

							if (!handleObj.handler.guid) {
								handleObj.handler.guid = handler.guid;
							}
						}

						if (selector) {
							handlers.splice(handlers.delegateCount++, 0, handleObj);
						} else {
							handlers.push(handleObj);
						}

						jQuery.event.global[type] = true;
					}
				},

				remove: function remove(elem, types, handler, selector, mappedTypes) {

					var j,
					    origCount,
					    tmp,
					    events,
					    t,
					    handleObj,
					    special,
					    handlers,
					    type,
					    namespaces,
					    origType,
					    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

					if (!elemData || !(events = elemData.events)) {
						return;
					}

					types = (types || "").match(rnotwhite) || [""];
					t = types.length;
					while (t--) {
						tmp = rtypenamespace.exec(types[t]) || [];
						type = origType = tmp[1];
						namespaces = (tmp[2] || "").split(".").sort();

						if (!type) {
							for (type in events) {
								jQuery.event.remove(elem, type + types[t], handler, selector, true);
							}
							continue;
						}

						special = jQuery.event.special[type] || {};
						type = (selector ? special.delegateType : special.bindType) || type;
						handlers = events[type] || [];
						tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

						origCount = j = handlers.length;
						while (j--) {
							handleObj = handlers[j];

							if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
								handlers.splice(j, 1);

								if (handleObj.selector) {
									handlers.delegateCount--;
								}
								if (special.remove) {
									special.remove.call(elem, handleObj);
								}
							}
						}

						if (origCount && !handlers.length) {
							if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

								jQuery.removeEvent(elem, type, elemData.handle);
							}

							delete events[type];
						}
					}

					if (jQuery.isEmptyObject(events)) {
						dataPriv.remove(elem, "handle events");
					}
				},

				dispatch: function dispatch(nativeEvent) {
					var event = jQuery.event.fix(nativeEvent);

					var i,
					    j,
					    ret,
					    matched,
					    handleObj,
					    handlerQueue,
					    args = new Array(arguments.length),
					    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
					    special = jQuery.event.special[event.type] || {};

					args[0] = event;

					for (i = 1; i < arguments.length; i++) {
						args[i] = arguments[i];
					}

					event.delegateTarget = this;

					if (special.preDispatch && special.preDispatch.call(this, event) === false) {
						return;
					}

					handlerQueue = jQuery.event.handlers.call(this, event, handlers);

					i = 0;
					while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
						event.currentTarget = matched.elem;

						j = 0;
						while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
							if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

								event.handleObj = handleObj;
								event.data = handleObj.data;

								ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

								if (ret !== undefined) {
									if ((event.result = ret) === false) {
										event.preventDefault();
										event.stopPropagation();
									}
								}
							}
						}
					}

					if (special.postDispatch) {
						special.postDispatch.call(this, event);
					}

					return event.result;
				},

				handlers: function handlers(event, _handlers2) {
					var i,
					    matches,
					    sel,
					    handleObj,
					    handlerQueue = [],
					    delegateCount = _handlers2.delegateCount,
					    cur = event.target;

					if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

						for (; cur !== this; cur = cur.parentNode || this) {
							if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
								matches = [];
								for (i = 0; i < delegateCount; i++) {
									handleObj = _handlers2[i];

									sel = handleObj.selector + " ";

									if (matches[sel] === undefined) {
										matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
									}
									if (matches[sel]) {
										matches.push(handleObj);
									}
								}
								if (matches.length) {
									handlerQueue.push({ elem: cur, handlers: matches });
								}
							}
						}
					}

					if (delegateCount < _handlers2.length) {
						handlerQueue.push({ elem: this, handlers: _handlers2.slice(delegateCount) });
					}

					return handlerQueue;
				},

				addProp: function addProp(name, hook) {
					Object.defineProperty(jQuery.Event.prototype, name, {
						enumerable: true,
						configurable: true,

						get: jQuery.isFunction(hook) ? function () {
							if (this.originalEvent) {
								return hook(this.originalEvent);
							}
						} : function () {
							if (this.originalEvent) {
								return this.originalEvent[name];
							}
						},

						set: function set(value) {
							Object.defineProperty(this, name, {
								enumerable: true,
								configurable: true,
								writable: true,
								value: value
							});
						}
					});
				},

				fix: function fix(originalEvent) {
					return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
				},

				special: {
					load: {
						noBubble: true
					},
					focus: {
						trigger: function trigger() {
							if (this !== safeActiveElement() && this.focus) {
								this.focus();
								return false;
							}
						},
						delegateType: "focusin"
					},
					blur: {
						trigger: function trigger() {
							if (this === safeActiveElement() && this.blur) {
								this.blur();
								return false;
							}
						},
						delegateType: "focusout"
					},
					click: {
						trigger: function trigger() {
							if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
								this.click();
								return false;
							}
						},

						_default: function _default(event) {
							return jQuery.nodeName(event.target, "a");
						}
					},

					beforeunload: {
						postDispatch: function postDispatch(event) {
							if (event.result !== undefined && event.originalEvent) {
								event.originalEvent.returnValue = event.result;
							}
						}
					}
				}
			};

			jQuery.removeEvent = function (elem, type, handle) {
				if (elem.removeEventListener) {
					elem.removeEventListener(type, handle);
				}
			};

			jQuery.Event = function (src, props) {
				if (!(this instanceof jQuery.Event)) {
					return new jQuery.Event(src, props);
				}

				if (src && src.type) {
					this.originalEvent = src;
					this.type = src.type;

					this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;

					this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

					this.currentTarget = src.currentTarget;
					this.relatedTarget = src.relatedTarget;
				} else {
					this.type = src;
				}

				if (props) {
					jQuery.extend(this, props);
				}

				this.timeStamp = src && src.timeStamp || jQuery.now();

				this[jQuery.expando] = true;
			};

			jQuery.Event.prototype = {
				constructor: jQuery.Event,
				isDefaultPrevented: returnFalse,
				isPropagationStopped: returnFalse,
				isImmediatePropagationStopped: returnFalse,
				isSimulated: false,

				preventDefault: function preventDefault() {
					var e = this.originalEvent;

					this.isDefaultPrevented = returnTrue;

					if (e && !this.isSimulated) {
						e.preventDefault();
					}
				},
				stopPropagation: function stopPropagation() {
					var e = this.originalEvent;

					this.isPropagationStopped = returnTrue;

					if (e && !this.isSimulated) {
						e.stopPropagation();
					}
				},
				stopImmediatePropagation: function stopImmediatePropagation() {
					var e = this.originalEvent;

					this.isImmediatePropagationStopped = returnTrue;

					if (e && !this.isSimulated) {
						e.stopImmediatePropagation();
					}

					this.stopPropagation();
				}
			};

			jQuery.each({
				altKey: true,
				bubbles: true,
				cancelable: true,
				changedTouches: true,
				ctrlKey: true,
				detail: true,
				eventPhase: true,
				metaKey: true,
				pageX: true,
				pageY: true,
				shiftKey: true,
				view: true,
				"char": true,
				charCode: true,
				key: true,
				keyCode: true,
				button: true,
				buttons: true,
				clientX: true,
				clientY: true,
				offsetX: true,
				offsetY: true,
				pointerId: true,
				pointerType: true,
				screenX: true,
				screenY: true,
				targetTouches: true,
				toElement: true,
				touches: true,

				which: function which(event) {
					var button = event.button;

					if (event.which == null && rkeyEvent.test(event.type)) {
						return event.charCode != null ? event.charCode : event.keyCode;
					}

					if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
						return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
					}

					return event.which;
				}
			}, jQuery.event.addProp);

			jQuery.each({
				mouseenter: "mouseover",
				mouseleave: "mouseout",
				pointerenter: "pointerover",
				pointerleave: "pointerout"
			}, function (orig, fix) {
				jQuery.event.special[orig] = {
					delegateType: fix,
					bindType: fix,

					handle: function handle(event) {
						var ret,
						    target = this,
						    related = event.relatedTarget,
						    handleObj = event.handleObj;

						if (!related || related !== target && !jQuery.contains(target, related)) {
							event.type = handleObj.origType;
							ret = handleObj.handler.apply(this, arguments);
							event.type = fix;
						}
						return ret;
					}
				};
			});

			jQuery.fn.extend({

				on: function on(types, selector, data, fn) {
					return _on2(this, types, selector, data, fn);
				},
				one: function one(types, selector, data, fn) {
					return _on2(this, types, selector, data, fn, 1);
				},
				off: function off(types, selector, fn) {
					var handleObj, type;
					if (types && types.preventDefault && types.handleObj) {
						handleObj = types.handleObj;
						jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
						return this;
					}
					if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
						for (type in types) {
							this.off(type, selector, types[type]);
						}
						return this;
					}
					if (selector === false || typeof selector === "function") {
						fn = selector;
						selector = undefined;
					}
					if (fn === false) {
						fn = returnFalse;
					}
					return this.each(function () {
						jQuery.event.remove(this, types, fn, selector);
					});
				}
			});

			var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
			    rnoInnerhtml = /<script|<style|<link/i,
			    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
			    rscriptTypeMasked = /^true\/(.*)/,
			    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

			function manipulationTarget(elem, content) {
				if (jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

					return elem.getElementsByTagName("tbody")[0] || elem;
				}

				return elem;
			}

			function disableScript(elem) {
				elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
				return elem;
			}
			function restoreScript(elem) {
				var match = rscriptTypeMasked.exec(elem.type);

				if (match) {
					elem.type = match[1];
				} else {
					elem.removeAttribute("type");
				}

				return elem;
			}

			function cloneCopyEvent(src, dest) {
				var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

				if (dest.nodeType !== 1) {
					return;
				}

				if (dataPriv.hasData(src)) {
					pdataOld = dataPriv.access(src);
					pdataCur = dataPriv.set(dest, pdataOld);
					events = pdataOld.events;

					if (events) {
						delete pdataCur.handle;
						pdataCur.events = {};

						for (type in events) {
							for (i = 0, l = events[type].length; i < l; i++) {
								jQuery.event.add(dest, type, events[type][i]);
							}
						}
					}
				}

				if (dataUser.hasData(src)) {
					udataOld = dataUser.access(src);
					udataCur = jQuery.extend({}, udataOld);

					dataUser.set(dest, udataCur);
				}
			}

			function fixInput(src, dest) {
				var nodeName = dest.nodeName.toLowerCase();

				if (nodeName === "input" && rcheckableType.test(src.type)) {
					dest.checked = src.checked;
				} else if (nodeName === "input" || nodeName === "textarea") {
					dest.defaultValue = src.defaultValue;
				}
			}

			function domManip(collection, args, callback, ignored) {
				args = concat.apply([], args);

				var fragment,
				    first,
				    scripts,
				    hasScripts,
				    node,
				    doc,
				    i = 0,
				    l = collection.length,
				    iNoClone = l - 1,
				    value = args[0],
				    isFunction = jQuery.isFunction(value);

				if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
					return collection.each(function (index) {
						var self = collection.eq(index);
						if (isFunction) {
							args[0] = value.call(this, index, self.html());
						}
						domManip(self, args, callback, ignored);
					});
				}

				if (l) {
					fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
					first = fragment.firstChild;

					if (fragment.childNodes.length === 1) {
						fragment = first;
					}

					if (first || ignored) {
						scripts = jQuery.map(getAll(fragment, "script"), disableScript);
						hasScripts = scripts.length;

						for (; i < l; i++) {
							node = fragment;

							if (i !== iNoClone) {
								node = jQuery.clone(node, true, true);

								if (hasScripts) {
									jQuery.merge(scripts, getAll(node, "script"));
								}
							}

							callback.call(collection[i], node, i);
						}

						if (hasScripts) {
							doc = scripts[scripts.length - 1].ownerDocument;

							jQuery.map(scripts, restoreScript);

							for (i = 0; i < hasScripts; i++) {
								node = scripts[i];
								if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

									if (node.src) {
										if (jQuery._evalUrl) {
											jQuery._evalUrl(node.src);
										}
									} else {
										DOMEval(node.textContent.replace(rcleanScript, ""), doc);
									}
								}
							}
						}
					}
				}

				return collection;
			}

			function _remove2(elem, selector, keepData) {
				var node,
				    nodes = selector ? jQuery.filter(selector, elem) : elem,
				    i = 0;

				for (; (node = nodes[i]) != null; i++) {
					if (!keepData && node.nodeType === 1) {
						jQuery.cleanData(getAll(node));
					}

					if (node.parentNode) {
						if (keepData && jQuery.contains(node.ownerDocument, node)) {
							setGlobalEval(getAll(node, "script"));
						}
						node.parentNode.removeChild(node);
					}
				}

				return elem;
			}

			jQuery.extend({
				htmlPrefilter: function htmlPrefilter(html) {
					return html.replace(rxhtmlTag, "<$1></$2>");
				},

				clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
					var i,
					    l,
					    srcElements,
					    destElements,
					    clone = elem.cloneNode(true),
					    inPage = jQuery.contains(elem.ownerDocument, elem);

					if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
						destElements = getAll(clone);
						srcElements = getAll(elem);

						for (i = 0, l = srcElements.length; i < l; i++) {
							fixInput(srcElements[i], destElements[i]);
						}
					}

					if (dataAndEvents) {
						if (deepDataAndEvents) {
							srcElements = srcElements || getAll(elem);
							destElements = destElements || getAll(clone);

							for (i = 0, l = srcElements.length; i < l; i++) {
								cloneCopyEvent(srcElements[i], destElements[i]);
							}
						} else {
							cloneCopyEvent(elem, clone);
						}
					}

					destElements = getAll(clone, "script");
					if (destElements.length > 0) {
						setGlobalEval(destElements, !inPage && getAll(elem, "script"));
					}

					return clone;
				},

				cleanData: function cleanData(elems) {
					var data,
					    elem,
					    type,
					    special = jQuery.event.special,
					    i = 0;

					for (; (elem = elems[i]) !== undefined; i++) {
						if (acceptData(elem)) {
							if (data = elem[dataPriv.expando]) {
								if (data.events) {
									for (type in data.events) {
										if (special[type]) {
											jQuery.event.remove(elem, type);
										} else {
											jQuery.removeEvent(elem, type, data.handle);
										}
									}
								}

								elem[dataPriv.expando] = undefined;
							}
							if (elem[dataUser.expando]) {
								elem[dataUser.expando] = undefined;
							}
						}
					}
				}
			});

			jQuery.fn.extend({
				detach: function detach(selector) {
					return _remove2(this, selector, true);
				},

				remove: function remove(selector) {
					return _remove2(this, selector);
				},

				text: function text(value) {
					return access(this, function (value) {
						return value === undefined ? jQuery.text(this) : this.empty().each(function () {
							if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
								this.textContent = value;
							}
						});
					}, null, value, arguments.length);
				},

				append: function append() {
					return domManip(this, arguments, function (elem) {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							var target = manipulationTarget(this, elem);
							target.appendChild(elem);
						}
					});
				},

				prepend: function prepend() {
					return domManip(this, arguments, function (elem) {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							var target = manipulationTarget(this, elem);
							target.insertBefore(elem, target.firstChild);
						}
					});
				},

				before: function before() {
					return domManip(this, arguments, function (elem) {
						if (this.parentNode) {
							this.parentNode.insertBefore(elem, this);
						}
					});
				},

				after: function after() {
					return domManip(this, arguments, function (elem) {
						if (this.parentNode) {
							this.parentNode.insertBefore(elem, this.nextSibling);
						}
					});
				},

				empty: function empty() {
					var elem,
					    i = 0;

					for (; (elem = this[i]) != null; i++) {
						if (elem.nodeType === 1) {
							jQuery.cleanData(getAll(elem, false));

							elem.textContent = "";
						}
					}

					return this;
				},

				clone: function clone(dataAndEvents, deepDataAndEvents) {
					dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
					deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

					return this.map(function () {
						return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
					});
				},

				html: function html(value) {
					return access(this, function (value) {
						var elem = this[0] || {},
						    i = 0,
						    l = this.length;

						if (value === undefined && elem.nodeType === 1) {
							return elem.innerHTML;
						}

						if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

							value = jQuery.htmlPrefilter(value);

							try {
								for (; i < l; i++) {
									elem = this[i] || {};

									if (elem.nodeType === 1) {
										jQuery.cleanData(getAll(elem, false));
										elem.innerHTML = value;
									}
								}

								elem = 0;
							} catch (e) {}
						}

						if (elem) {
							this.empty().append(value);
						}
					}, null, value, arguments.length);
				},

				replaceWith: function replaceWith() {
					var ignored = [];

					return domManip(this, arguments, function (elem) {
						var parent = this.parentNode;

						if (jQuery.inArray(this, ignored) < 0) {
							jQuery.cleanData(getAll(this));
							if (parent) {
								parent.replaceChild(elem, this);
							}
						}
					}, ignored);
				}
			});

			jQuery.each({
				appendTo: "append",
				prependTo: "prepend",
				insertBefore: "before",
				insertAfter: "after",
				replaceAll: "replaceWith"
			}, function (name, original) {
				jQuery.fn[name] = function (selector) {
					var elems,
					    ret = [],
					    insert = jQuery(selector),
					    last = insert.length - 1,
					    i = 0;

					for (; i <= last; i++) {
						elems = i === last ? this : this.clone(true);
						jQuery(insert[i])[original](elems);

						push.apply(ret, elems.get());
					}

					return this.pushStack(ret);
				};
			});
			var rmargin = /^margin/;

			var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

			var getStyles = function getStyles(elem) {
				var view = elem.ownerDocument.defaultView;

				if (!view || !view.opener) {
					view = window;
				}

				return view.getComputedStyle(elem);
			};

			(function () {
				function computeStyleTests() {
					if (!div) {
						return;
					}

					div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
					div.innerHTML = "";
					documentElement.appendChild(container);

					var divStyle = window.getComputedStyle(div);
					pixelPositionVal = divStyle.top !== "1%";

					reliableMarginLeftVal = divStyle.marginLeft === "2px";
					boxSizingReliableVal = divStyle.width === "4px";

					div.style.marginRight = "50%";
					pixelMarginRightVal = divStyle.marginRight === "4px";

					documentElement.removeChild(container);

					div = null;
				}

				var pixelPositionVal,
				    boxSizingReliableVal,
				    pixelMarginRightVal,
				    reliableMarginLeftVal,
				    container = document.createElement("div"),
				    div = document.createElement("div");

				if (!div.style) {
					return;
				}

				div.style.backgroundClip = "content-box";
				div.cloneNode(true).style.backgroundClip = "";
				support.clearCloneStyle = div.style.backgroundClip === "content-box";

				container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
				container.appendChild(div);

				jQuery.extend(support, {
					pixelPosition: function pixelPosition() {
						computeStyleTests();
						return pixelPositionVal;
					},
					boxSizingReliable: function boxSizingReliable() {
						computeStyleTests();
						return boxSizingReliableVal;
					},
					pixelMarginRight: function pixelMarginRight() {
						computeStyleTests();
						return pixelMarginRightVal;
					},
					reliableMarginLeft: function reliableMarginLeft() {
						computeStyleTests();
						return reliableMarginLeftVal;
					}
				});
			})();

			function curCSS(elem, name, computed) {
				var width,
				    minWidth,
				    maxWidth,
				    ret,
				    style = elem.style;

				computed = computed || getStyles(elem);

				if (computed) {
					ret = computed.getPropertyValue(name) || computed[name];

					if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
						ret = jQuery.style(elem, name);
					}

					if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
						width = style.width;
						minWidth = style.minWidth;
						maxWidth = style.maxWidth;

						style.minWidth = style.maxWidth = style.width = ret;
						ret = computed.width;

						style.width = width;
						style.minWidth = minWidth;
						style.maxWidth = maxWidth;
					}
				}

				return ret !== undefined ? ret + "" : ret;
			}

			function addGetHookIf(conditionFn, hookFn) {
				return {
					get: function get() {
						if (conditionFn()) {
							delete this.get;
							return;
						}

						return (this.get = hookFn).apply(this, arguments);
					}
				};
			}

			var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
			    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
			    cssNormalTransform = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			    cssPrefixes = ["Webkit", "Moz", "ms"],
			    emptyStyle = document.createElement("div").style;

			function vendorPropName(name) {
				if (name in emptyStyle) {
					return name;
				}

				var capName = name[0].toUpperCase() + name.slice(1),
				    i = cssPrefixes.length;

				while (i--) {
					name = cssPrefixes[i] + capName;
					if (name in emptyStyle) {
						return name;
					}
				}
			}

			function setPositiveNumber(elem, value, subtract) {
				var matches = rcssNum.exec(value);
				return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
			}

			function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
				var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
				    val = 0;

				for (; i < 4; i += 2) {
					if (extra === "margin") {
						val += jQuery.css(elem, extra + cssExpand[i], true, styles);
					}

					if (isBorderBox) {
						if (extra === "content") {
							val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
						}

						if (extra !== "margin") {
							val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
						}
					} else {
						val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

						if (extra !== "padding") {
							val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
						}
					}
				}

				return val;
			}

			function getWidthOrHeight(elem, name, extra) {
				var val,
				    valueIsBorderBox = true,
				    styles = getStyles(elem),
				    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

				if (elem.getClientRects().length) {
					val = elem.getBoundingClientRect()[name];
				}

				if (val <= 0 || val == null) {
					val = curCSS(elem, name, styles);
					if (val < 0 || val == null) {
						val = elem.style[name];
					}

					if (rnumnonpx.test(val)) {
						return val;
					}

					valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

					val = parseFloat(val) || 0;
				}

				return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
			}

			jQuery.extend({
				cssHooks: {
					opacity: {
						get: function get(elem, computed) {
							if (computed) {
								var ret = curCSS(elem, "opacity");
								return ret === "" ? "1" : ret;
							}
						}
					}
				},

				cssNumber: {
					"animationIterationCount": true,
					"columnCount": true,
					"fillOpacity": true,
					"flexGrow": true,
					"flexShrink": true,
					"fontWeight": true,
					"lineHeight": true,
					"opacity": true,
					"order": true,
					"orphans": true,
					"widows": true,
					"zIndex": true,
					"zoom": true
				},

				cssProps: {
					"float": "cssFloat"
				},

				style: function style(elem, name, value, extra) {
					if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
						return;
					}

					var ret,
					    type,
					    hooks,
					    origName = jQuery.camelCase(name),
					    style = elem.style;

					name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

					hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

					if (value !== undefined) {
						type = typeof value === "undefined" ? "undefined" : _typeof(value);

						if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
							value = adjustCSS(elem, name, ret);

							type = "number";
						}

						if (value == null || value !== value) {
							return;
						}

						if (type === "number") {
							value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
						}

						if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
							style[name] = "inherit";
						}

						if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

							style[name] = value;
						}
					} else {
						if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

							return ret;
						}

						return style[name];
					}
				},

				css: function css(elem, name, extra, styles) {
					var val,
					    num,
					    hooks,
					    origName = jQuery.camelCase(name);

					name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

					hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

					if (hooks && "get" in hooks) {
						val = hooks.get(elem, true, extra);
					}

					if (val === undefined) {
						val = curCSS(elem, name, styles);
					}

					if (val === "normal" && name in cssNormalTransform) {
						val = cssNormalTransform[name];
					}

					if (extra === "" || extra) {
						num = parseFloat(val);
						return extra === true || isFinite(num) ? num || 0 : val;
					}
					return val;
				}
			});

			jQuery.each(["height", "width"], function (i, name) {
				jQuery.cssHooks[name] = {
					get: function get(elem, computed, extra) {
						if (computed) {
							return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
								return getWidthOrHeight(elem, name, extra);
							}) : getWidthOrHeight(elem, name, extra);
						}
					},

					set: function set(elem, value, extra) {
						var matches,
						    styles = extra && getStyles(elem),
						    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

						if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

							elem.style[name] = value;
							value = jQuery.css(elem, name);
						}

						return setPositiveNumber(elem, value, subtract);
					}
				};
			});

			jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
				if (computed) {
					return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
						return elem.getBoundingClientRect().left;
					})) + "px";
				}
			});

			jQuery.each({
				margin: "",
				padding: "",
				border: "Width"
			}, function (prefix, suffix) {
				jQuery.cssHooks[prefix + suffix] = {
					expand: function expand(value) {
						var i = 0,
						    expanded = {},
						    parts = typeof value === "string" ? value.split(" ") : [value];

						for (; i < 4; i++) {
							expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
						}

						return expanded;
					}
				};

				if (!rmargin.test(prefix)) {
					jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
				}
			});

			jQuery.fn.extend({
				css: function css(name, value) {
					return access(this, function (elem, name, value) {
						var styles,
						    len,
						    map = {},
						    i = 0;

						if (jQuery.isArray(name)) {
							styles = getStyles(elem);
							len = name.length;

							for (; i < len; i++) {
								map[name[i]] = jQuery.css(elem, name[i], false, styles);
							}

							return map;
						}

						return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
					}, name, value, arguments.length > 1);
				}
			});

			function Tween(elem, options, prop, end, easing) {
				return new Tween.prototype.init(elem, options, prop, end, easing);
			}
			jQuery.Tween = Tween;

			Tween.prototype = {
				constructor: Tween,
				init: function init(elem, options, prop, end, easing, unit) {
					this.elem = elem;
					this.prop = prop;
					this.easing = easing || jQuery.easing._default;
					this.options = options;
					this.start = this.now = this.cur();
					this.end = end;
					this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
				},
				cur: function cur() {
					var hooks = Tween.propHooks[this.prop];

					return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
				},
				run: function run(percent) {
					var eased,
					    hooks = Tween.propHooks[this.prop];

					if (this.options.duration) {
						this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
					} else {
						this.pos = eased = percent;
					}
					this.now = (this.end - this.start) * eased + this.start;

					if (this.options.step) {
						this.options.step.call(this.elem, this.now, this);
					}

					if (hooks && hooks.set) {
						hooks.set(this);
					} else {
						Tween.propHooks._default.set(this);
					}
					return this;
				}
			};

			Tween.prototype.init.prototype = Tween.prototype;

			Tween.propHooks = {
				_default: {
					get: function get(tween) {
						var result;

						if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
							return tween.elem[tween.prop];
						}

						result = jQuery.css(tween.elem, tween.prop, "");

						return !result || result === "auto" ? 0 : result;
					},
					set: function set(tween) {
						if (jQuery.fx.step[tween.prop]) {
							jQuery.fx.step[tween.prop](tween);
						} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
							jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
						} else {
							tween.elem[tween.prop] = tween.now;
						}
					}
				}
			};

			Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
				set: function set(tween) {
					if (tween.elem.nodeType && tween.elem.parentNode) {
						tween.elem[tween.prop] = tween.now;
					}
				}
			};

			jQuery.easing = {
				linear: function linear(p) {
					return p;
				},
				swing: function swing(p) {
					return 0.5 - Math.cos(p * Math.PI) / 2;
				},
				_default: "swing"
			};

			jQuery.fx = Tween.prototype.init;

			jQuery.fx.step = {};

			var fxNow,
			    timerId,
			    rfxtypes = /^(?:toggle|show|hide)$/,
			    rrun = /queueHooks$/;

			function raf() {
				if (timerId) {
					window.requestAnimationFrame(raf);
					jQuery.fx.tick();
				}
			}

			function createFxNow() {
				window.setTimeout(function () {
					fxNow = undefined;
				});
				return fxNow = jQuery.now();
			}

			function genFx(type, includeWidth) {
				var which,
				    i = 0,
				    attrs = { height: type };

				includeWidth = includeWidth ? 1 : 0;
				for (; i < 4; i += 2 - includeWidth) {
					which = cssExpand[i];
					attrs["margin" + which] = attrs["padding" + which] = type;
				}

				if (includeWidth) {
					attrs.opacity = attrs.width = type;
				}

				return attrs;
			}

			function createTween(value, prop, animation) {
				var tween,
				    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
				    index = 0,
				    length = collection.length;
				for (; index < length; index++) {
					if (tween = collection[index].call(animation, prop, value)) {
						return tween;
					}
				}
			}

			function defaultPrefilter(elem, props, opts) {
				var prop,
				    value,
				    toggle,
				    hooks,
				    oldfire,
				    propTween,
				    restoreDisplay,
				    display,
				    isBox = "width" in props || "height" in props,
				    anim = this,
				    orig = {},
				    style = elem.style,
				    hidden = elem.nodeType && isHiddenWithinTree(elem),
				    dataShow = dataPriv.get(elem, "fxshow");

				if (!opts.queue) {
					hooks = jQuery._queueHooks(elem, "fx");
					if (hooks.unqueued == null) {
						hooks.unqueued = 0;
						oldfire = hooks.empty.fire;
						hooks.empty.fire = function () {
							if (!hooks.unqueued) {
								oldfire();
							}
						};
					}
					hooks.unqueued++;

					anim.always(function () {
						anim.always(function () {
							hooks.unqueued--;
							if (!jQuery.queue(elem, "fx").length) {
								hooks.empty.fire();
							}
						});
					});
				}

				for (prop in props) {
					value = props[prop];
					if (rfxtypes.test(value)) {
						delete props[prop];
						toggle = toggle || value === "toggle";
						if (value === (hidden ? "hide" : "show")) {
							if (value === "show" && dataShow && dataShow[prop] !== undefined) {
								hidden = true;
							} else {
								continue;
							}
						}
						orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
					}
				}

				propTween = !jQuery.isEmptyObject(props);
				if (!propTween && jQuery.isEmptyObject(orig)) {
					return;
				}

				if (isBox && elem.nodeType === 1) {
					opts.overflow = [style.overflow, style.overflowX, style.overflowY];

					restoreDisplay = dataShow && dataShow.display;
					if (restoreDisplay == null) {
						restoreDisplay = dataPriv.get(elem, "display");
					}
					display = jQuery.css(elem, "display");
					if (display === "none") {
						if (restoreDisplay) {
							display = restoreDisplay;
						} else {
							showHide([elem], true);
							restoreDisplay = elem.style.display || restoreDisplay;
							display = jQuery.css(elem, "display");
							showHide([elem]);
						}
					}

					if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
						if (jQuery.css(elem, "float") === "none") {
							if (!propTween) {
								anim.done(function () {
									style.display = restoreDisplay;
								});
								if (restoreDisplay == null) {
									display = style.display;
									restoreDisplay = display === "none" ? "" : display;
								}
							}
							style.display = "inline-block";
						}
					}
				}

				if (opts.overflow) {
					style.overflow = "hidden";
					anim.always(function () {
						style.overflow = opts.overflow[0];
						style.overflowX = opts.overflow[1];
						style.overflowY = opts.overflow[2];
					});
				}

				propTween = false;
				for (prop in orig) {
					if (!propTween) {
						if (dataShow) {
							if ("hidden" in dataShow) {
								hidden = dataShow.hidden;
							}
						} else {
							dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
						}

						if (toggle) {
							dataShow.hidden = !hidden;
						}

						if (hidden) {
							showHide([elem], true);
						}

						anim.done(function () {
							if (!hidden) {
								showHide([elem]);
							}
							dataPriv.remove(elem, "fxshow");
							for (prop in orig) {
								jQuery.style(elem, prop, orig[prop]);
							}
						});
					}

					propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
					if (!(prop in dataShow)) {
						dataShow[prop] = propTween.start;
						if (hidden) {
							propTween.end = propTween.start;
							propTween.start = 0;
						}
					}
				}
			}

			function propFilter(props, specialEasing) {
				var index, name, easing, value, hooks;

				for (index in props) {
					name = jQuery.camelCase(index);
					easing = specialEasing[name];
					value = props[index];
					if (jQuery.isArray(value)) {
						easing = value[1];
						value = props[index] = value[0];
					}

					if (index !== name) {
						props[name] = value;
						delete props[index];
					}

					hooks = jQuery.cssHooks[name];
					if (hooks && "expand" in hooks) {
						value = hooks.expand(value);
						delete props[name];

						for (index in value) {
							if (!(index in props)) {
								props[index] = value[index];
								specialEasing[index] = easing;
							}
						}
					} else {
						specialEasing[name] = easing;
					}
				}
			}

			function Animation(elem, properties, options) {
				var result,
				    stopped,
				    index = 0,
				    length = Animation.prefilters.length,
				    deferred = jQuery.Deferred().always(function () {
					delete tick.elem;
				}),
				    tick = function tick() {
					if (stopped) {
						return false;
					}
					var currentTime = fxNow || createFxNow(),
					    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					    temp = remaining / animation.duration || 0,
					    percent = 1 - temp,
					    index = 0,
					    length = animation.tweens.length;

					for (; index < length; index++) {
						animation.tweens[index].run(percent);
					}

					deferred.notifyWith(elem, [animation, percent, remaining]);

					if (percent < 1 && length) {
						return remaining;
					} else {
						deferred.resolveWith(elem, [animation]);
						return false;
					}
				},
				    animation = deferred.promise({
					elem: elem,
					props: jQuery.extend({}, properties),
					opts: jQuery.extend(true, {
						specialEasing: {},
						easing: jQuery.easing._default
					}, options),
					originalProperties: properties,
					originalOptions: options,
					startTime: fxNow || createFxNow(),
					duration: options.duration,
					tweens: [],
					createTween: function createTween(prop, end) {
						var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
						animation.tweens.push(tween);
						return tween;
					},
					stop: function stop(gotoEnd) {
						var index = 0,
						    length = gotoEnd ? animation.tweens.length : 0;
						if (stopped) {
							return this;
						}
						stopped = true;
						for (; index < length; index++) {
							animation.tweens[index].run(1);
						}

						if (gotoEnd) {
							deferred.notifyWith(elem, [animation, 1, 0]);
							deferred.resolveWith(elem, [animation, gotoEnd]);
						} else {
							deferred.rejectWith(elem, [animation, gotoEnd]);
						}
						return this;
					}
				}),
				    props = animation.props;

				propFilter(props, animation.opts.specialEasing);

				for (; index < length; index++) {
					result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
					if (result) {
						if (jQuery.isFunction(result.stop)) {
							jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
						}
						return result;
					}
				}

				jQuery.map(props, createTween, animation);

				if (jQuery.isFunction(animation.opts.start)) {
					animation.opts.start.call(elem, animation);
				}

				jQuery.fx.timer(jQuery.extend(tick, {
					elem: elem,
					anim: animation,
					queue: animation.opts.queue
				}));

				return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
			}

			jQuery.Animation = jQuery.extend(Animation, {

				tweeners: {
					"*": [function (prop, value) {
						var tween = this.createTween(prop, value);
						adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
						return tween;
					}]
				},

				tweener: function tweener(props, callback) {
					if (jQuery.isFunction(props)) {
						callback = props;
						props = ["*"];
					} else {
						props = props.match(rnotwhite);
					}

					var prop,
					    index = 0,
					    length = props.length;

					for (; index < length; index++) {
						prop = props[index];
						Animation.tweeners[prop] = Animation.tweeners[prop] || [];
						Animation.tweeners[prop].unshift(callback);
					}
				},

				prefilters: [defaultPrefilter],

				prefilter: function prefilter(callback, prepend) {
					if (prepend) {
						Animation.prefilters.unshift(callback);
					} else {
						Animation.prefilters.push(callback);
					}
				}
			});

			jQuery.speed = function (speed, easing, fn) {
				var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
					complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
					duration: speed,
					easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
				};

				if (jQuery.fx.off || document.hidden) {
					opt.duration = 0;
				} else {
					opt.duration = typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
				}

				if (opt.queue == null || opt.queue === true) {
					opt.queue = "fx";
				}

				opt.old = opt.complete;

				opt.complete = function () {
					if (jQuery.isFunction(opt.old)) {
						opt.old.call(this);
					}

					if (opt.queue) {
						jQuery.dequeue(this, opt.queue);
					}
				};

				return opt;
			};

			jQuery.fn.extend({
				fadeTo: function fadeTo(speed, to, easing, callback) {
					return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
				},
				animate: function animate(prop, speed, easing, callback) {
					var empty = jQuery.isEmptyObject(prop),
					    optall = jQuery.speed(speed, easing, callback),
					    doAnimation = function doAnimation() {
						var anim = Animation(this, jQuery.extend({}, prop), optall);

						if (empty || dataPriv.get(this, "finish")) {
							anim.stop(true);
						}
					};
					doAnimation.finish = doAnimation;

					return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
				},
				stop: function stop(type, clearQueue, gotoEnd) {
					var stopQueue = function stopQueue(hooks) {
						var stop = hooks.stop;
						delete hooks.stop;
						stop(gotoEnd);
					};

					if (typeof type !== "string") {
						gotoEnd = clearQueue;
						clearQueue = type;
						type = undefined;
					}
					if (clearQueue && type !== false) {
						this.queue(type || "fx", []);
					}

					return this.each(function () {
						var dequeue = true,
						    index = type != null && type + "queueHooks",
						    timers = jQuery.timers,
						    data = dataPriv.get(this);

						if (index) {
							if (data[index] && data[index].stop) {
								stopQueue(data[index]);
							}
						} else {
							for (index in data) {
								if (data[index] && data[index].stop && rrun.test(index)) {
									stopQueue(data[index]);
								}
							}
						}

						for (index = timers.length; index--;) {
							if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

								timers[index].anim.stop(gotoEnd);
								dequeue = false;
								timers.splice(index, 1);
							}
						}

						if (dequeue || !gotoEnd) {
							jQuery.dequeue(this, type);
						}
					});
				},
				finish: function finish(type) {
					if (type !== false) {
						type = type || "fx";
					}
					return this.each(function () {
						var index,
						    data = dataPriv.get(this),
						    queue = data[type + "queue"],
						    hooks = data[type + "queueHooks"],
						    timers = jQuery.timers,
						    length = queue ? queue.length : 0;

						data.finish = true;

						jQuery.queue(this, type, []);

						if (hooks && hooks.stop) {
							hooks.stop.call(this, true);
						}

						for (index = timers.length; index--;) {
							if (timers[index].elem === this && timers[index].queue === type) {
								timers[index].anim.stop(true);
								timers.splice(index, 1);
							}
						}

						for (index = 0; index < length; index++) {
							if (queue[index] && queue[index].finish) {
								queue[index].finish.call(this);
							}
						}

						delete data.finish;
					});
				}
			});

			jQuery.each(["toggle", "show", "hide"], function (i, name) {
				var cssFn = jQuery.fn[name];
				jQuery.fn[name] = function (speed, easing, callback) {
					return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
				};
			});

			jQuery.each({
				slideDown: genFx("show"),
				slideUp: genFx("hide"),
				slideToggle: genFx("toggle"),
				fadeIn: { opacity: "show" },
				fadeOut: { opacity: "hide" },
				fadeToggle: { opacity: "toggle" }
			}, function (name, props) {
				jQuery.fn[name] = function (speed, easing, callback) {
					return this.animate(props, speed, easing, callback);
				};
			});

			jQuery.timers = [];
			jQuery.fx.tick = function () {
				var timer,
				    i = 0,
				    timers = jQuery.timers;

				fxNow = jQuery.now();

				for (; i < timers.length; i++) {
					timer = timers[i];

					if (!timer() && timers[i] === timer) {
						timers.splice(i--, 1);
					}
				}

				if (!timers.length) {
					jQuery.fx.stop();
				}
				fxNow = undefined;
			};

			jQuery.fx.timer = function (timer) {
				jQuery.timers.push(timer);
				if (timer()) {
					jQuery.fx.start();
				} else {
					jQuery.timers.pop();
				}
			};

			jQuery.fx.interval = 13;
			jQuery.fx.start = function () {
				if (!timerId) {
					timerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
				}
			};

			jQuery.fx.stop = function () {
				if (window.cancelAnimationFrame) {
					window.cancelAnimationFrame(timerId);
				} else {
					window.clearInterval(timerId);
				}

				timerId = null;
			};

			jQuery.fx.speeds = {
				slow: 600,
				fast: 200,

				_default: 400
			};

			jQuery.fn.delay = function (time, type) {
				time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
				type = type || "fx";

				return this.queue(type, function (next, hooks) {
					var timeout = window.setTimeout(next, time);
					hooks.stop = function () {
						window.clearTimeout(timeout);
					};
				});
			};

			(function () {
				var input = document.createElement("input"),
				    select = document.createElement("select"),
				    opt = select.appendChild(document.createElement("option"));

				input.type = "checkbox";

				support.checkOn = input.value !== "";

				support.optSelected = opt.selected;

				input = document.createElement("input");
				input.value = "t";
				input.type = "radio";
				support.radioValue = input.value === "t";
			})();

			var boolHook,
			    attrHandle = jQuery.expr.attrHandle;

			jQuery.fn.extend({
				attr: function attr(name, value) {
					return access(this, jQuery.attr, name, value, arguments.length > 1);
				},

				removeAttr: function removeAttr(name) {
					return this.each(function () {
						jQuery.removeAttr(this, name);
					});
				}
			});

			jQuery.extend({
				attr: function attr(elem, name, value) {
					var ret,
					    hooks,
					    nType = elem.nodeType;

					if (nType === 3 || nType === 8 || nType === 2) {
						return;
					}

					if (typeof elem.getAttribute === "undefined") {
						return jQuery.prop(elem, name, value);
					}

					if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
						hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
					}

					if (value !== undefined) {
						if (value === null) {
							jQuery.removeAttr(elem, name);
							return;
						}

						if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;
						}

						elem.setAttribute(name, value + "");
						return value;
					}

					if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
						return ret;
					}

					ret = jQuery.find.attr(elem, name);

					return ret == null ? undefined : ret;
				},

				attrHooks: {
					type: {
						set: function set(elem, value) {
							if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
								var val = elem.value;
								elem.setAttribute("type", value);
								if (val) {
									elem.value = val;
								}
								return value;
							}
						}
					}
				},

				removeAttr: function removeAttr(elem, value) {
					var name,
					    i = 0,
					    attrNames = value && value.match(rnotwhite);

					if (attrNames && elem.nodeType === 1) {
						while (name = attrNames[i++]) {
							elem.removeAttribute(name);
						}
					}
				}
			});

			boolHook = {
				set: function set(elem, value, name) {
					if (value === false) {
						jQuery.removeAttr(elem, name);
					} else {
						elem.setAttribute(name, name);
					}
					return name;
				}
			};

			jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
				var getter = attrHandle[name] || jQuery.find.attr;

				attrHandle[name] = function (elem, name, isXML) {
					var ret,
					    handle,
					    lowercaseName = name.toLowerCase();

					if (!isXML) {
						handle = attrHandle[lowercaseName];
						attrHandle[lowercaseName] = ret;
						ret = getter(elem, name, isXML) != null ? lowercaseName : null;
						attrHandle[lowercaseName] = handle;
					}
					return ret;
				};
			});

			var rfocusable = /^(?:input|select|textarea|button)$/i,
			    rclickable = /^(?:a|area)$/i;

			jQuery.fn.extend({
				prop: function prop(name, value) {
					return access(this, jQuery.prop, name, value, arguments.length > 1);
				},

				removeProp: function removeProp(name) {
					return this.each(function () {
						delete this[jQuery.propFix[name] || name];
					});
				}
			});

			jQuery.extend({
				prop: function prop(elem, name, value) {
					var ret,
					    hooks,
					    nType = elem.nodeType;

					if (nType === 3 || nType === 8 || nType === 2) {
						return;
					}

					if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
						name = jQuery.propFix[name] || name;
						hooks = jQuery.propHooks[name];
					}

					if (value !== undefined) {
						if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;
						}

						return elem[name] = value;
					}

					if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
						return ret;
					}

					return elem[name];
				},

				propHooks: {
					tabIndex: {
						get: function get(elem) {
							var tabindex = jQuery.find.attr(elem, "tabindex");

							return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
						}
					}
				},

				propFix: {
					"for": "htmlFor",
					"class": "className"
				}
			});

			if (!support.optSelected) {
				jQuery.propHooks.selected = {
					get: function get(elem) {
						var parent = elem.parentNode;
						if (parent && parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
						return null;
					},
					set: function set(elem) {
						var parent = elem.parentNode;
						if (parent) {
							parent.selectedIndex;

							if (parent.parentNode) {
								parent.parentNode.selectedIndex;
							}
						}
					}
				};
			}

			jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
				jQuery.propFix[this.toLowerCase()] = this;
			});

			var rclass = /[\t\r\n\f]/g;

			function getClass(elem) {
				return elem.getAttribute && elem.getAttribute("class") || "";
			}

			jQuery.fn.extend({
				addClass: function addClass(value) {
					var classes,
					    elem,
					    cur,
					    curValue,
					    clazz,
					    j,
					    finalValue,
					    i = 0;

					if (jQuery.isFunction(value)) {
						return this.each(function (j) {
							jQuery(this).addClass(value.call(this, j, getClass(this)));
						});
					}

					if (typeof value === "string" && value) {
						classes = value.match(rnotwhite) || [];

						while (elem = this[i++]) {
							curValue = getClass(elem);
							cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

							if (cur) {
								j = 0;
								while (clazz = classes[j++]) {
									if (cur.indexOf(" " + clazz + " ") < 0) {
										cur += clazz + " ";
									}
								}

								finalValue = jQuery.trim(cur);
								if (curValue !== finalValue) {
									elem.setAttribute("class", finalValue);
								}
							}
						}
					}

					return this;
				},

				removeClass: function removeClass(value) {
					var classes,
					    elem,
					    cur,
					    curValue,
					    clazz,
					    j,
					    finalValue,
					    i = 0;

					if (jQuery.isFunction(value)) {
						return this.each(function (j) {
							jQuery(this).removeClass(value.call(this, j, getClass(this)));
						});
					}

					if (!arguments.length) {
						return this.attr("class", "");
					}

					if (typeof value === "string" && value) {
						classes = value.match(rnotwhite) || [];

						while (elem = this[i++]) {
							curValue = getClass(elem);

							cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

							if (cur) {
								j = 0;
								while (clazz = classes[j++]) {
									while (cur.indexOf(" " + clazz + " ") > -1) {
										cur = cur.replace(" " + clazz + " ", " ");
									}
								}

								finalValue = jQuery.trim(cur);
								if (curValue !== finalValue) {
									elem.setAttribute("class", finalValue);
								}
							}
						}
					}

					return this;
				},

				toggleClass: function toggleClass(value, stateVal) {
					var type = typeof value === "undefined" ? "undefined" : _typeof(value);

					if (typeof stateVal === "boolean" && type === "string") {
						return stateVal ? this.addClass(value) : this.removeClass(value);
					}

					if (jQuery.isFunction(value)) {
						return this.each(function (i) {
							jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
						});
					}

					return this.each(function () {
						var className, i, self, classNames;

						if (type === "string") {
							i = 0;
							self = jQuery(this);
							classNames = value.match(rnotwhite) || [];

							while (className = classNames[i++]) {
								if (self.hasClass(className)) {
									self.removeClass(className);
								} else {
									self.addClass(className);
								}
							}
						} else if (value === undefined || type === "boolean") {
							className = getClass(this);
							if (className) {
								dataPriv.set(this, "__className__", className);
							}

							if (this.setAttribute) {
								this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
							}
						}
					});
				},

				hasClass: function hasClass(selector) {
					var className,
					    elem,
					    i = 0;

					className = " " + selector + " ";
					while (elem = this[i++]) {
						if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
							return true;
						}
					}

					return false;
				}
			});

			var rreturn = /\r/g,
			    rspaces = /[\x20\t\r\n\f]+/g;

			jQuery.fn.extend({
				val: function val(value) {
					var hooks,
					    ret,
					    isFunction,
					    elem = this[0];

					if (!arguments.length) {
						if (elem) {
							hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

							if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
								return ret;
							}

							ret = elem.value;

							return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
						}

						return;
					}

					isFunction = jQuery.isFunction(value);

					return this.each(function (i) {
						var val;

						if (this.nodeType !== 1) {
							return;
						}

						if (isFunction) {
							val = value.call(this, i, jQuery(this).val());
						} else {
							val = value;
						}

						if (val == null) {
							val = "";
						} else if (typeof val === "number") {
							val += "";
						} else if (jQuery.isArray(val)) {
							val = jQuery.map(val, function (value) {
								return value == null ? "" : value + "";
							});
						}

						hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

						if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
							this.value = val;
						}
					});
				}
			});

			jQuery.extend({
				valHooks: {
					option: {
						get: function get(elem) {

							var val = jQuery.find.attr(elem, "value");
							return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
						}
					},
					select: {
						get: function get(elem) {
							var value,
							    option,
							    options = elem.options,
							    index = elem.selectedIndex,
							    one = elem.type === "select-one",
							    values = one ? null : [],
							    max = one ? index + 1 : options.length,
							    i = index < 0 ? max : one ? index : 0;

							for (; i < max; i++) {
								option = options[i];

								if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
									value = jQuery(option).val();

									if (one) {
										return value;
									}

									values.push(value);
								}
							}

							return values;
						},

						set: function set(elem, value) {
							var optionSet,
							    option,
							    options = elem.options,
							    values = jQuery.makeArray(value),
							    i = options.length;

							while (i--) {
								option = options[i];

								if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
									optionSet = true;
								}
							}

							if (!optionSet) {
								elem.selectedIndex = -1;
							}
							return values;
						}
					}
				}
			});

			jQuery.each(["radio", "checkbox"], function () {
				jQuery.valHooks[this] = {
					set: function set(elem, value) {
						if (jQuery.isArray(value)) {
							return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
						}
					}
				};
				if (!support.checkOn) {
					jQuery.valHooks[this].get = function (elem) {
						return elem.getAttribute("value") === null ? "on" : elem.value;
					};
				}
			});

			var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

			jQuery.extend(jQuery.event, {

				trigger: function trigger(event, data, elem, onlyHandlers) {

					var i,
					    cur,
					    tmp,
					    bubbleType,
					    ontype,
					    handle,
					    special,
					    eventPath = [elem || document],
					    type = hasOwn.call(event, "type") ? event.type : event,
					    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

					cur = tmp = elem = elem || document;

					if (elem.nodeType === 3 || elem.nodeType === 8) {
						return;
					}

					if (rfocusMorph.test(type + jQuery.event.triggered)) {
						return;
					}

					if (type.indexOf(".") > -1) {
						namespaces = type.split(".");
						type = namespaces.shift();
						namespaces.sort();
					}
					ontype = type.indexOf(":") < 0 && "on" + type;

					event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

					event.isTrigger = onlyHandlers ? 2 : 3;
					event.namespace = namespaces.join(".");
					event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

					event.result = undefined;
					if (!event.target) {
						event.target = elem;
					}

					data = data == null ? [event] : jQuery.makeArray(data, [event]);

					special = jQuery.event.special[type] || {};
					if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
						return;
					}

					if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

						bubbleType = special.delegateType || type;
						if (!rfocusMorph.test(bubbleType + type)) {
							cur = cur.parentNode;
						}
						for (; cur; cur = cur.parentNode) {
							eventPath.push(cur);
							tmp = cur;
						}

						if (tmp === (elem.ownerDocument || document)) {
							eventPath.push(tmp.defaultView || tmp.parentWindow || window);
						}
					}

					i = 0;
					while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

						event.type = i > 1 ? bubbleType : special.bindType || type;

						handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
						if (handle) {
							handle.apply(cur, data);
						}

						handle = ontype && cur[ontype];
						if (handle && handle.apply && acceptData(cur)) {
							event.result = handle.apply(cur, data);
							if (event.result === false) {
								event.preventDefault();
							}
						}
					}
					event.type = type;

					if (!onlyHandlers && !event.isDefaultPrevented()) {

						if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
							if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
								tmp = elem[ontype];

								if (tmp) {
									elem[ontype] = null;
								}

								jQuery.event.triggered = type;
								elem[type]();
								jQuery.event.triggered = undefined;

								if (tmp) {
									elem[ontype] = tmp;
								}
							}
						}
					}

					return event.result;
				},

				simulate: function simulate(type, elem, event) {
					var e = jQuery.extend(new jQuery.Event(), event, {
						type: type,
						isSimulated: true
					});

					jQuery.event.trigger(e, null, elem);
				}

			});

			jQuery.fn.extend({

				trigger: function trigger(type, data) {
					return this.each(function () {
						jQuery.event.trigger(type, data, this);
					});
				},
				triggerHandler: function triggerHandler(type, data) {
					var elem = this[0];
					if (elem) {
						return jQuery.event.trigger(type, data, elem, true);
					}
				}
			});

			jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
				jQuery.fn[name] = function (data, fn) {
					return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
				};
			});

			jQuery.fn.extend({
				hover: function hover(fnOver, fnOut) {
					return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
				}
			});

			support.focusin = "onfocusin" in window;

			if (!support.focusin) {
				jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
					var handler = function handler(event) {
						jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
					};

					jQuery.event.special[fix] = {
						setup: function setup() {
							var doc = this.ownerDocument || this,
							    attaches = dataPriv.access(doc, fix);

							if (!attaches) {
								doc.addEventListener(orig, handler, true);
							}
							dataPriv.access(doc, fix, (attaches || 0) + 1);
						},
						teardown: function teardown() {
							var doc = this.ownerDocument || this,
							    attaches = dataPriv.access(doc, fix) - 1;

							if (!attaches) {
								doc.removeEventListener(orig, handler, true);
								dataPriv.remove(doc, fix);
							} else {
								dataPriv.access(doc, fix, attaches);
							}
						}
					};
				});
			}
			var location = window.location;

			var nonce = jQuery.now();

			var rquery = /\?/;

			jQuery.parseXML = function (data) {
				var xml;
				if (!data || typeof data !== "string") {
					return null;
				}

				try {
					xml = new window.DOMParser().parseFromString(data, "text/xml");
				} catch (e) {
					xml = undefined;
				}

				if (!xml || xml.getElementsByTagName("parsererror").length) {
					jQuery.error("Invalid XML: " + data);
				}
				return xml;
			};

			var rbracket = /\[\]$/,
			    rCRLF = /\r?\n/g,
			    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
			    rsubmittable = /^(?:input|select|textarea|keygen)/i;

			function buildParams(prefix, obj, traditional, add) {
				var name;

				if (jQuery.isArray(obj)) {
					jQuery.each(obj, function (i, v) {
						if (traditional || rbracket.test(prefix)) {
							add(prefix, v);
						} else {
							buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
						}
					});
				} else if (!traditional && jQuery.type(obj) === "object") {
					for (name in obj) {
						buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
					}
				} else {
					add(prefix, obj);
				}
			}

			jQuery.param = function (a, traditional) {
				var prefix,
				    s = [],
				    add = function add(key, valueOrFunction) {
					var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

					s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
				};

				if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
					jQuery.each(a, function () {
						add(this.name, this.value);
					});
				} else {
					for (prefix in a) {
						buildParams(prefix, a[prefix], traditional, add);
					}
				}

				return s.join("&");
			};

			jQuery.fn.extend({
				serialize: function serialize() {
					return jQuery.param(this.serializeArray());
				},
				serializeArray: function serializeArray() {
					return this.map(function () {
						var elements = jQuery.prop(this, "elements");
						return elements ? jQuery.makeArray(elements) : this;
					}).filter(function () {
						var type = this.type;

						return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
					}).map(function (i, elem) {
						var val = jQuery(this).val();

						return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
							return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
						}) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					}).get();
				}
			});

			var r20 = /%20/g,
			    rhash = /#.*$/,
			    rts = /([?&])_=[^&]*/,
			    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
			    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			    rnoContent = /^(?:GET|HEAD)$/,
			    rprotocol = /^\/\//,
			    prefilters = {},
			    transports = {},
			    allTypes = "*/".concat("*"),
			    originAnchor = document.createElement("a");
			originAnchor.href = location.href;

			function addToPrefiltersOrTransports(structure) {
				return function (dataTypeExpression, func) {

					if (typeof dataTypeExpression !== "string") {
						func = dataTypeExpression;
						dataTypeExpression = "*";
					}

					var dataType,
					    i = 0,
					    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

					if (jQuery.isFunction(func)) {
						while (dataType = dataTypes[i++]) {
							if (dataType[0] === "+") {
								dataType = dataType.slice(1) || "*";
								(structure[dataType] = structure[dataType] || []).unshift(func);
							} else {
								(structure[dataType] = structure[dataType] || []).push(func);
							}
						}
					}
				};
			}

			function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

				var inspected = {},
				    seekingTransport = structure === transports;

				function inspect(dataType) {
					var selected;
					inspected[dataType] = true;
					jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
						var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
						if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

							options.dataTypes.unshift(dataTypeOrTransport);
							inspect(dataTypeOrTransport);
							return false;
						} else if (seekingTransport) {
							return !(selected = dataTypeOrTransport);
						}
					});
					return selected;
				}

				return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
			}

			function ajaxExtend(target, src) {
				var key,
				    deep,
				    flatOptions = jQuery.ajaxSettings.flatOptions || {};

				for (key in src) {
					if (src[key] !== undefined) {
						(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
					}
				}
				if (deep) {
					jQuery.extend(true, target, deep);
				}

				return target;
			}

			function ajaxHandleResponses(s, jqXHR, responses) {

				var ct,
				    type,
				    finalDataType,
				    firstDataType,
				    contents = s.contents,
				    dataTypes = s.dataTypes;

				while (dataTypes[0] === "*") {
					dataTypes.shift();
					if (ct === undefined) {
						ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
					}
				}

				if (ct) {
					for (type in contents) {
						if (contents[type] && contents[type].test(ct)) {
							dataTypes.unshift(type);
							break;
						}
					}
				}

				if (dataTypes[0] in responses) {
					finalDataType = dataTypes[0];
				} else {
					for (type in responses) {
						if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
							finalDataType = type;
							break;
						}
						if (!firstDataType) {
							firstDataType = type;
						}
					}

					finalDataType = finalDataType || firstDataType;
				}

				if (finalDataType) {
					if (finalDataType !== dataTypes[0]) {
						dataTypes.unshift(finalDataType);
					}
					return responses[finalDataType];
				}
			}

			function ajaxConvert(s, response, jqXHR, isSuccess) {
				var conv2,
				    current,
				    conv,
				    tmp,
				    prev,
				    converters = {},
				    dataTypes = s.dataTypes.slice();

				if (dataTypes[1]) {
					for (conv in s.converters) {
						converters[conv.toLowerCase()] = s.converters[conv];
					}
				}

				current = dataTypes.shift();

				while (current) {

					if (s.responseFields[current]) {
						jqXHR[s.responseFields[current]] = response;
					}

					if (!prev && isSuccess && s.dataFilter) {
						response = s.dataFilter(response, s.dataType);
					}

					prev = current;
					current = dataTypes.shift();

					if (current) {
						if (current === "*") {

							current = prev;
						} else if (prev !== "*" && prev !== current) {
							conv = converters[prev + " " + current] || converters["* " + current];

							if (!conv) {
								for (conv2 in converters) {
									tmp = conv2.split(" ");
									if (tmp[1] === current) {
										conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
										if (conv) {
											if (conv === true) {
												conv = converters[conv2];
											} else if (converters[conv2] !== true) {
												current = tmp[0];
												dataTypes.unshift(tmp[1]);
											}
											break;
										}
									}
								}
							}

							if (conv !== true) {
								if (conv && s.throws) {
									response = conv(response);
								} else {
									try {
										response = conv(response);
									} catch (e) {
										return {
											state: "parsererror",
											error: conv ? e : "No conversion from " + prev + " to " + current
										};
									}
								}
							}
						}
					}
				}

				return { state: "success", data: response };
			}

			jQuery.extend({
				active: 0,

				lastModified: {},
				etag: {},

				ajaxSettings: {
					url: location.href,
					type: "GET",
					isLocal: rlocalProtocol.test(location.protocol),
					global: true,
					processData: true,
					async: true,
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",

					accepts: {
						"*": allTypes,
						text: "text/plain",
						html: "text/html",
						xml: "application/xml, text/xml",
						json: "application/json, text/javascript"
					},

					contents: {
						xml: /\bxml\b/,
						html: /\bhtml/,
						json: /\bjson\b/
					},

					responseFields: {
						xml: "responseXML",
						text: "responseText",
						json: "responseJSON"
					},

					converters: {
						"* text": String,

						"text html": true,

						"text json": JSON.parse,

						"text xml": jQuery.parseXML
					},

					flatOptions: {
						url: true,
						context: true
					}
				},

				ajaxSetup: function ajaxSetup(target, settings) {
					return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
				},

				ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
				ajaxTransport: addToPrefiltersOrTransports(transports),

				ajax: function ajax(url, options) {
					if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
						options = url;
						url = undefined;
					}

					options = options || {};

					var transport,
					    cacheURL,
					    responseHeadersString,
					    responseHeaders,
					    timeoutTimer,
					    urlAnchor,
					    completed,
					    fireGlobals,
					    i,
					    uncached,
					    s = jQuery.ajaxSetup({}, options),
					    callbackContext = s.context || s,
					    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
					    deferred = jQuery.Deferred(),
					    completeDeferred = jQuery.Callbacks("once memory"),
					    _statusCode2 = s.statusCode || {},
					    requestHeaders = {},
					    requestHeadersNames = {},
					    strAbort = "canceled",
					    jqXHR = {
						readyState: 0,

						getResponseHeader: function getResponseHeader(key) {
							var match;
							if (completed) {
								if (!responseHeaders) {
									responseHeaders = {};
									while (match = rheaders.exec(responseHeadersString)) {
										responseHeaders[match[1].toLowerCase()] = match[2];
									}
								}
								match = responseHeaders[key.toLowerCase()];
							}
							return match == null ? null : match;
						},

						getAllResponseHeaders: function getAllResponseHeaders() {
							return completed ? responseHeadersString : null;
						},

						setRequestHeader: function setRequestHeader(name, value) {
							if (completed == null) {
								name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
								requestHeaders[name] = value;
							}
							return this;
						},

						overrideMimeType: function overrideMimeType(type) {
							if (completed == null) {
								s.mimeType = type;
							}
							return this;
						},

						statusCode: function statusCode(map) {
							var code;
							if (map) {
								if (completed) {
									jqXHR.always(map[jqXHR.status]);
								} else {
									for (code in map) {
										_statusCode2[code] = [_statusCode2[code], map[code]];
									}
								}
							}
							return this;
						},

						abort: function abort(statusText) {
							var finalText = statusText || strAbort;
							if (transport) {
								transport.abort(finalText);
							}
							done(0, finalText);
							return this;
						}
					};

					deferred.promise(jqXHR);

					s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

					s.type = options.method || options.type || s.method || s.type;

					s.dataTypes = (s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

					if (s.crossDomain == null) {
						urlAnchor = document.createElement("a");

						try {
							urlAnchor.href = s.url;

							urlAnchor.href = urlAnchor.href;
							s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
						} catch (e) {
							s.crossDomain = true;
						}
					}

					if (s.data && s.processData && typeof s.data !== "string") {
						s.data = jQuery.param(s.data, s.traditional);
					}

					inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

					if (completed) {
						return jqXHR;
					}

					fireGlobals = jQuery.event && s.global;

					if (fireGlobals && jQuery.active++ === 0) {
						jQuery.event.trigger("ajaxStart");
					}

					s.type = s.type.toUpperCase();

					s.hasContent = !rnoContent.test(s.type);

					cacheURL = s.url.replace(rhash, "");

					if (!s.hasContent) {
						uncached = s.url.slice(cacheURL.length);

						if (s.data) {
							cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

							delete s.data;
						}

						if (s.cache === false) {
							cacheURL = cacheURL.replace(rts, "");
							uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
						}

						s.url = cacheURL + uncached;
					} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
						s.data = s.data.replace(r20, "+");
					}

					if (s.ifModified) {
						if (jQuery.lastModified[cacheURL]) {
							jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
						}
						if (jQuery.etag[cacheURL]) {
							jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
						}
					}

					if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
						jqXHR.setRequestHeader("Content-Type", s.contentType);
					}

					jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

					for (i in s.headers) {
						jqXHR.setRequestHeader(i, s.headers[i]);
					}

					if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
						return jqXHR.abort();
					}

					strAbort = "abort";

					completeDeferred.add(s.complete);
					jqXHR.done(s.success);
					jqXHR.fail(s.error);

					transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

					if (!transport) {
						done(-1, "No Transport");
					} else {
						jqXHR.readyState = 1;

						if (fireGlobals) {
							globalEventContext.trigger("ajaxSend", [jqXHR, s]);
						}

						if (completed) {
							return jqXHR;
						}

						if (s.async && s.timeout > 0) {
							timeoutTimer = window.setTimeout(function () {
								jqXHR.abort("timeout");
							}, s.timeout);
						}

						try {
							completed = false;
							transport.send(requestHeaders, done);
						} catch (e) {
							if (completed) {
								throw e;
							}

							done(-1, e);
						}
					}

					function done(status, nativeStatusText, responses, headers) {
						var isSuccess,
						    success,
						    error,
						    response,
						    modified,
						    statusText = nativeStatusText;

						if (completed) {
							return;
						}

						completed = true;

						if (timeoutTimer) {
							window.clearTimeout(timeoutTimer);
						}

						transport = undefined;

						responseHeadersString = headers || "";

						jqXHR.readyState = status > 0 ? 4 : 0;

						isSuccess = status >= 200 && status < 300 || status === 304;

						if (responses) {
							response = ajaxHandleResponses(s, jqXHR, responses);
						}

						response = ajaxConvert(s, response, jqXHR, isSuccess);

						if (isSuccess) {
							if (s.ifModified) {
								modified = jqXHR.getResponseHeader("Last-Modified");
								if (modified) {
									jQuery.lastModified[cacheURL] = modified;
								}
								modified = jqXHR.getResponseHeader("etag");
								if (modified) {
									jQuery.etag[cacheURL] = modified;
								}
							}

							if (status === 204 || s.type === "HEAD") {
								statusText = "nocontent";
							} else if (status === 304) {
								statusText = "notmodified";
							} else {
								statusText = response.state;
								success = response.data;
								error = response.error;
								isSuccess = !error;
							}
						} else {
							error = statusText;
							if (status || !statusText) {
								statusText = "error";
								if (status < 0) {
									status = 0;
								}
							}
						}

						jqXHR.status = status;
						jqXHR.statusText = (nativeStatusText || statusText) + "";

						if (isSuccess) {
							deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
						} else {
							deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
						}

						jqXHR.statusCode(_statusCode2);
						_statusCode2 = undefined;

						if (fireGlobals) {
							globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
						}

						completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

						if (fireGlobals) {
							globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

							if (! --jQuery.active) {
								jQuery.event.trigger("ajaxStop");
							}
						}
					}

					return jqXHR;
				},

				getJSON: function getJSON(url, data, callback) {
					return jQuery.get(url, data, callback, "json");
				},

				getScript: function getScript(url, callback) {
					return jQuery.get(url, undefined, callback, "script");
				}
			});

			jQuery.each(["get", "post"], function (i, method) {
				jQuery[method] = function (url, data, callback, type) {
					if (jQuery.isFunction(data)) {
						type = type || callback;
						callback = data;
						data = undefined;
					}

					return jQuery.ajax(jQuery.extend({
						url: url,
						type: method,
						dataType: type,
						data: data,
						success: callback
					}, jQuery.isPlainObject(url) && url));
				};
			});

			jQuery._evalUrl = function (url) {
				return jQuery.ajax({
					url: url,

					type: "GET",
					dataType: "script",
					cache: true,
					async: false,
					global: false,
					"throws": true
				});
			};

			jQuery.fn.extend({
				wrapAll: function wrapAll(html) {
					var wrap;

					if (this[0]) {
						if (jQuery.isFunction(html)) {
							html = html.call(this[0]);
						}

						wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

						if (this[0].parentNode) {
							wrap.insertBefore(this[0]);
						}

						wrap.map(function () {
							var elem = this;

							while (elem.firstElementChild) {
								elem = elem.firstElementChild;
							}

							return elem;
						}).append(this);
					}

					return this;
				},

				wrapInner: function wrapInner(html) {
					if (jQuery.isFunction(html)) {
						return this.each(function (i) {
							jQuery(this).wrapInner(html.call(this, i));
						});
					}

					return this.each(function () {
						var self = jQuery(this),
						    contents = self.contents();

						if (contents.length) {
							contents.wrapAll(html);
						} else {
							self.append(html);
						}
					});
				},

				wrap: function wrap(html) {
					var isFunction = jQuery.isFunction(html);

					return this.each(function (i) {
						jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
					});
				},

				unwrap: function unwrap(selector) {
					this.parent(selector).not("body").each(function () {
						jQuery(this).replaceWith(this.childNodes);
					});
					return this;
				}
			});

			jQuery.expr.pseudos.hidden = function (elem) {
				return !jQuery.expr.pseudos.visible(elem);
			};
			jQuery.expr.pseudos.visible = function (elem) {
				return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
			};

			jQuery.ajaxSettings.xhr = function () {
				try {
					return new window.XMLHttpRequest();
				} catch (e) {}
			};

			var xhrSuccessStatus = {
				0: 200,

				1223: 204
			},
			    xhrSupported = jQuery.ajaxSettings.xhr();

			support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
			support.ajax = xhrSupported = !!xhrSupported;

			jQuery.ajaxTransport(function (options) {
				var _callback3, errorCallback;

				if (support.cors || xhrSupported && !options.crossDomain) {
					return {
						send: function send(headers, complete) {
							var i,
							    xhr = options.xhr();

							xhr.open(options.type, options.url, options.async, options.username, options.password);

							if (options.xhrFields) {
								for (i in options.xhrFields) {
									xhr[i] = options.xhrFields[i];
								}
							}

							if (options.mimeType && xhr.overrideMimeType) {
								xhr.overrideMimeType(options.mimeType);
							}

							if (!options.crossDomain && !headers["X-Requested-With"]) {
								headers["X-Requested-With"] = "XMLHttpRequest";
							}

							for (i in headers) {
								xhr.setRequestHeader(i, headers[i]);
							}

							_callback3 = function callback(type) {
								return function () {
									if (_callback3) {
										_callback3 = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

										if (type === "abort") {
											xhr.abort();
										} else if (type === "error") {
											if (typeof xhr.status !== "number") {
												complete(0, "error");
											} else {
												complete(xhr.status, xhr.statusText);
											}
										} else {
											complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
										}
									}
								};
							};

							xhr.onload = _callback3();
							errorCallback = xhr.onerror = _callback3("error");

							if (xhr.onabort !== undefined) {
								xhr.onabort = errorCallback;
							} else {
								xhr.onreadystatechange = function () {
									if (xhr.readyState === 4) {
										window.setTimeout(function () {
											if (_callback3) {
												errorCallback();
											}
										});
									}
								};
							}

							_callback3 = _callback3("abort");

							try {
								xhr.send(options.hasContent && options.data || null);
							} catch (e) {
								if (_callback3) {
									throw e;
								}
							}
						},

						abort: function abort() {
							if (_callback3) {
								_callback3();
							}
						}
					};
				}
			});

			jQuery.ajaxPrefilter(function (s) {
				if (s.crossDomain) {
					s.contents.script = false;
				}
			});

			jQuery.ajaxSetup({
				accepts: {
					script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
				},
				contents: {
					script: /\b(?:java|ecma)script\b/
				},
				converters: {
					"text script": function textScript(text) {
						jQuery.globalEval(text);
						return text;
					}
				}
			});

			jQuery.ajaxPrefilter("script", function (s) {
				if (s.cache === undefined) {
					s.cache = false;
				}
				if (s.crossDomain) {
					s.type = "GET";
				}
			});

			jQuery.ajaxTransport("script", function (s) {
				if (s.crossDomain) {
					var script, _callback4;
					return {
						send: function send(_, complete) {
							script = jQuery("<script>").prop({
								charset: s.scriptCharset,
								src: s.url
							}).on("load error", _callback4 = function callback(evt) {
								script.remove();
								_callback4 = null;
								if (evt) {
									complete(evt.type === "error" ? 404 : 200, evt.type);
								}
							});

							document.head.appendChild(script[0]);
						},
						abort: function abort() {
							if (_callback4) {
								_callback4();
							}
						}
					};
				}
			});

			var oldCallbacks = [],
			    rjsonp = /(=)\?(?=&|$)|\?\?/;

			jQuery.ajaxSetup({
				jsonp: "callback",
				jsonpCallback: function jsonpCallback() {
					var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
					this[callback] = true;
					return callback;
				}
			});

			jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

				var callbackName,
				    overwritten,
				    responseContainer,
				    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

				if (jsonProp || s.dataTypes[0] === "jsonp") {
					callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

					if (jsonProp) {
						s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
					} else if (s.jsonp !== false) {
						s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
					}

					s.converters["script json"] = function () {
						if (!responseContainer) {
							jQuery.error(callbackName + " was not called");
						}
						return responseContainer[0];
					};

					s.dataTypes[0] = "json";

					overwritten = window[callbackName];
					window[callbackName] = function () {
						responseContainer = arguments;
					};

					jqXHR.always(function () {
						if (overwritten === undefined) {
							jQuery(window).removeProp(callbackName);
						} else {
							window[callbackName] = overwritten;
						}

						if (s[callbackName]) {
							s.jsonpCallback = originalSettings.jsonpCallback;

							oldCallbacks.push(callbackName);
						}

						if (responseContainer && jQuery.isFunction(overwritten)) {
							overwritten(responseContainer[0]);
						}

						responseContainer = overwritten = undefined;
					});

					return "script";
				}
			});

			support.createHTMLDocument = function () {
				var body = document.implementation.createHTMLDocument("").body;
				body.innerHTML = "<form></form><form></form>";
				return body.childNodes.length === 2;
			}();

			jQuery.parseHTML = function (data, context, keepScripts) {
				if (typeof data !== "string") {
					return [];
				}
				if (typeof context === "boolean") {
					keepScripts = context;
					context = false;
				}

				var base, parsed, scripts;

				if (!context) {
					if (support.createHTMLDocument) {
						context = document.implementation.createHTMLDocument("");

						base = context.createElement("base");
						base.href = document.location.href;
						context.head.appendChild(base);
					} else {
						context = document;
					}
				}

				parsed = rsingleTag.exec(data);
				scripts = !keepScripts && [];

				if (parsed) {
					return [context.createElement(parsed[1])];
				}

				parsed = buildFragment([data], context, scripts);

				if (scripts && scripts.length) {
					jQuery(scripts).remove();
				}

				return jQuery.merge([], parsed.childNodes);
			};

			jQuery.fn.load = function (url, params, callback) {
				var selector,
				    type,
				    response,
				    self = this,
				    off = url.indexOf(" ");

				if (off > -1) {
					selector = jQuery.trim(url.slice(off));
					url = url.slice(0, off);
				}

				if (jQuery.isFunction(params)) {
					callback = params;
					params = undefined;
				} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
					type = "POST";
				}

				if (self.length > 0) {
					jQuery.ajax({
						url: url,

						type: type || "GET",
						dataType: "html",
						data: params
					}).done(function (responseText) {
						response = arguments;

						self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
					}).always(callback && function (jqXHR, status) {
						self.each(function () {
							callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
						});
					});
				}

				return this;
			};

			jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
				jQuery.fn[type] = function (fn) {
					return this.on(type, fn);
				};
			});

			jQuery.expr.pseudos.animated = function (elem) {
				return jQuery.grep(jQuery.timers, function (fn) {
					return elem === fn.elem;
				}).length;
			};

			function getWindow(elem) {
				return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
			}

			jQuery.offset = {
				setOffset: function setOffset(elem, options, i) {
					var curPosition,
					    curLeft,
					    curCSSTop,
					    curTop,
					    curOffset,
					    curCSSLeft,
					    calculatePosition,
					    position = jQuery.css(elem, "position"),
					    curElem = jQuery(elem),
					    props = {};

					if (position === "static") {
						elem.style.position = "relative";
					}

					curOffset = curElem.offset();
					curCSSTop = jQuery.css(elem, "top");
					curCSSLeft = jQuery.css(elem, "left");
					calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

					if (calculatePosition) {
						curPosition = curElem.position();
						curTop = curPosition.top;
						curLeft = curPosition.left;
					} else {
						curTop = parseFloat(curCSSTop) || 0;
						curLeft = parseFloat(curCSSLeft) || 0;
					}

					if (jQuery.isFunction(options)) {
						options = options.call(elem, i, jQuery.extend({}, curOffset));
					}

					if (options.top != null) {
						props.top = options.top - curOffset.top + curTop;
					}
					if (options.left != null) {
						props.left = options.left - curOffset.left + curLeft;
					}

					if ("using" in options) {
						options.using.call(elem, props);
					} else {
						curElem.css(props);
					}
				}
			};

			jQuery.fn.extend({
				offset: function offset(options) {
					if (arguments.length) {
						return options === undefined ? this : this.each(function (i) {
							jQuery.offset.setOffset(this, options, i);
						});
					}

					var docElem,
					    win,
					    rect,
					    doc,
					    elem = this[0];

					if (!elem) {
						return;
					}

					if (!elem.getClientRects().length) {
						return { top: 0, left: 0 };
					}

					rect = elem.getBoundingClientRect();

					if (rect.width || rect.height) {
						doc = elem.ownerDocument;
						win = getWindow(doc);
						docElem = doc.documentElement;

						return {
							top: rect.top + win.pageYOffset - docElem.clientTop,
							left: rect.left + win.pageXOffset - docElem.clientLeft
						};
					}

					return rect;
				},

				position: function position() {
					if (!this[0]) {
						return;
					}

					var offsetParent,
					    offset,
					    elem = this[0],
					    parentOffset = { top: 0, left: 0 };

					if (jQuery.css(elem, "position") === "fixed") {
						offset = elem.getBoundingClientRect();
					} else {
						offsetParent = this.offsetParent();

						offset = this.offset();
						if (!jQuery.nodeName(offsetParent[0], "html")) {
							parentOffset = offsetParent.offset();
						}

						parentOffset = {
							top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
							left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
						};
					}

					return {
						top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
						left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
					};
				},

				offsetParent: function offsetParent() {
					return this.map(function () {
						var offsetParent = this.offsetParent;

						while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
							offsetParent = offsetParent.offsetParent;
						}

						return offsetParent || documentElement;
					});
				}
			});

			jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
				var top = "pageYOffset" === prop;

				jQuery.fn[method] = function (val) {
					return access(this, function (elem, method, val) {
						var win = getWindow(elem);

						if (val === undefined) {
							return win ? win[prop] : elem[method];
						}

						if (win) {
							win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
						} else {
							elem[method] = val;
						}
					}, method, val, arguments.length);
				};
			});

			jQuery.each(["top", "left"], function (i, prop) {
				jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
					if (computed) {
						computed = curCSS(elem, prop);

						return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
					}
				});
			});

			jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
				jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
					jQuery.fn[funcName] = function (margin, value) {
						var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
						    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

						return access(this, function (elem, type, value) {
							var doc;

							if (jQuery.isWindow(elem)) {
								return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
							}

							if (elem.nodeType === 9) {
								doc = elem.documentElement;

								return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
							}

							return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
						}, type, chainable ? margin : undefined, chainable);
					};
				});
			});

			jQuery.fn.extend({

				bind: function bind(types, data, fn) {
					return this.on(types, null, data, fn);
				},
				unbind: function unbind(types, fn) {
					return this.off(types, null, fn);
				},

				delegate: function delegate(selector, types, data, fn) {
					return this.on(types, selector, data, fn);
				},
				undelegate: function undelegate(selector, types, fn) {
					return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
				}
			});

			jQuery.parseJSON = JSON.parse;

			if (typeof define === "function" && define.amd) {
				define("jquery", [], function () {
					return jQuery;
				});
			}

			var _jQuery = window.jQuery,
			    _$ = window.$;

			jQuery.noConflict = function (deep) {
				if (window.$ === jQuery) {
					window.$ = _$;
				}

				if (deep && window.jQuery === jQuery) {
					window.jQuery = _jQuery;
				}

				return jQuery;
			};

			if (!noGlobal) {
				window.jQuery = window.$ = jQuery;
			}

			return jQuery;
		});
	}, {}] }, {}, [1]);
