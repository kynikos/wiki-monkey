// Wiki Monkey - MediaWiki bot and editor-assistant user script
// Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
//
// This file is part of Wiki Monkey.
//
// Wiki Monkey is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wiki Monkey is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

const WM = require('%/index')

const languages = {
  local: 'English',
  names: {
    العربية: {subtag: 'ar', english: 'Arabic'},
    Bosanski: {subtag: 'bs', english: 'Bosnian'},
    Български: {subtag: 'bg', english: 'Bulgarian'},
    Català: {subtag: 'ca', english: 'Catalan'},
    Česky: {subtag: 'cs', english: 'Czech'},
    Dansk: {subtag: 'da', english: 'Danish'},
    Deutsch: {subtag: 'de', english: 'German'},
    Ελληνικά: {subtag: 'el', english: 'Greek'},
    English: {subtag: 'en', english: 'English'},
    Esperanto: {subtag: 'eo', english: 'Esperanto'},
    Español: {subtag: 'es', english: 'Spanish'},
    فارسی: {subtag: 'fa', english: 'Persian'},
    Suomi: {subtag: 'fi', english: 'Finnish'},
    Français: {subtag: 'fr', english: 'French'},
    עברית: {subtag: 'he', english: 'Hebrew'},
    Hrvatski: {subtag: 'hr', english: 'Croatian'},
    Magyar: {subtag: 'hu', english: 'Hungarian'},
    Indonesia: {subtag: 'id', english: 'Indonesian'},
    Italiano: {subtag: 'it', english: 'Italian'},
    日本語: {subtag: 'ja', english: 'Japanese'},
    한국어: {subtag: 'ko', english: 'Korean'},
    Lietuviškai: {subtag: 'lt', english: 'Lithuanian'},
    'Norsk Bokmål': {subtag: 'nb', english: 'Norwegian (Bokmål)'},
    Nederlands: {subtag: 'nl', english: 'Dutch'},
    Polski: {subtag: 'pl', english: 'Polish'},
    Português: {subtag: 'pt', english: 'Portuguese'},
    Română: {subtag: 'ro', english: 'Romanian'},
    Русский: {subtag: 'ru', english: 'Russian'},
    Slovenský: {subtag: 'sk', english: 'Slovak'},
    Српски: {subtag: 'sr', english: 'Serbian'},
    Svenska: {subtag: 'sv', english: 'Swedish'},
    ไทย: {subtag: 'th', english: 'Thai'},
    Türkçe: {subtag: 'tr', english: 'Turkish'},
    Українська: {subtag: 'uk', english: 'Ukrainian'},
    'Tiếng Việt': {subtag: 'vi', english: 'Vietnamese'},
    简体中文: {subtag: 'zh-hans', english: 'Chinese (Simplified)'},
    正體中文: {subtag: 'zh-hant', english: 'Chinese (Traditional)'},
  },
  categories: [
    'العربية',
    'Bosanski',
    'Български',
    'Català',
    'Česky',
    'Dansk',
    'Ελληνικά',
    'English',
    'Esperanto',
    'Español',
    'Suomi',
    'עברית',
    'Hrvatski',
    'Magyar',
    'Indonesia',
    'Italiano',
    '한국어',
    'Lietuviškai',
    'Norsk Bokmål',
    'Nederlands',
    'Polski',
    'Português',
    'Русский',
    'Slovenský',
    'Српски',
    'Svenska',
    'ไทย',
    'Türkçe',
    'Українська',
    '简体中文',
    '正體中文',
  ],
  interlanguage: {
    external: ['de', 'fa', 'fr', 'ja'],
    internal: ['ar', 'bg', 'bs', 'cs', 'da', 'el', 'en', 'es', 'fi', 'he',
      'hr', 'hu', 'id', 'it', 'ko', 'lt', 'nl', 'pl', 'pt',
      'ru', 'sk', 'sr', 'sv', 'th', 'tr', 'uk', 'zh-hans',
      'zh-hant'],
  },
}

const tablesOfContents = {
  ar: {
    page: 'Table of contents (العربية)',
    root: 'Category:العربية',
    alsoIn: 'also in', // TODO: Untranslated, Right-to-left problems
    indentType: ':',
    replace: ['[ _]\\(العربية\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: true,
  },
  bg: {
    page: 'Table of contents (Български)',
    root: 'Category:Български',
    alsoIn: 'също в', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Български\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  bs: {
    page: 'Table of contents (Bosanski)',
    root: 'Category:Bosanski',
    alsoIn: 'also in', // TODO: Untranslated
    indentType: ':',
    replace: ['[ _]\\(Bosanski\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  cs: {
    page: 'Table of contents (Česky)',
    root: 'Category:Česky',
    alsoIn: 'také v',
    indentType: ':',
    replace: ['[ _]\\(Česky\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  da: {
    page: 'Table of contents (Dansk)',
    root: 'Category:Dansk',
    alsoIn: 'også i', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Dansk\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  el: {
    page: 'Table of contents (Ελληνικά)',
    root: 'Category:Ελληνικά',
    alsoIn: 'επίσης σε', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Ελληνικά\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  en: {
    page: 'Table of contents',
    root: 'Category:English',
    alsoIn: 'also in',
    indentType: ':',
    replace: null,
    keepAltName: false,
    showIndices: true,
    rightToLeft: false,
  },
  es: {
    page: 'Table of contents (Español)',
    root: 'Category:Español',
    alsoIn: 'también en',
    indentType: ':',
    replace: ['[ _]\\(Español\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  fi: {
    page: 'Table of contents (Suomi)',
    root: 'Category:Suomi',
    alsoIn: 'also in', // TODO: Untranslated
    indentType: ':',
    replace: ['[ _]\\(Suomi\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  he: {
    page: 'Table of contents (עברית)',
    root: 'Category:עברית',
    alsoIn: 'also in', // TODO: Untranslated, Right-to-left problems
    indentType: ':',
    replace: ['[ _]\\(עברית\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: true,
  },
  hr: {
    page: 'Table of contents (Hrvatski)',
    root: 'Category:Hrvatski',
    alsoIn: 'također u', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Hrvatski\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  hu: {
    page: 'Table of contents (Magyar)',
    root: 'Category:Magyar',
    alsoIn: 'is', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Magyar\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  id: {
    page: 'Table of contents (Indonesia)',
    root: 'Category:Indonesia',
    alsoIn: 'juga di', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Indonesia\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  it: {
    page: 'Table of contents (Italiano)',
    root: 'Category:Italiano',
    alsoIn: 'anche in',
    indentType: ':',
    replace: ['[ _]\\(Italiano\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  ko: {
    page: 'Table of contents (한국어)',
    root: 'Category:한국어',
    alsoIn: '또한 에', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(한국어\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  lt: {
    page: 'Table of contents (Lietuviškai)',
    root: 'Category:Lietuviškai',
    alsoIn: 'taip pat ir', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Lietuviškai\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  nl: {
    page: 'Table of contents (Nederlands)',
    root: 'Category:Nederlands',
    alsoIn: 'ook in', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Nederlands\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  pl: {
    page: 'Table of contents (Polski)',
    root: 'Category:Polski',
    alsoIn: 'również w', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Polski\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  pt: {
    page: 'Table of contents (Português)',
    root: 'Category:Português',
    alsoIn: 'também em',
    indentType: ':',
    replace: ['[ _]\\(Português\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  ru: {
    page: 'Table of contents (Русский)',
    root: 'Category:Русский',
    alsoIn: 'Также в',
    indentType: ':',
    replace: ['[ _]\\(Русский\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  sk: {
    page: 'Table of contents (Slovenský)',
    root: 'Category:Slovenský',
    alsoIn: 'tiež v',
    indentType: ':',
    replace: ['[ _]\\(Slovenský\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  sr: {
    page: 'Table of contents (Српски)',
    root: 'Category:Српски',
    alsoIn: 'такође у', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Српски\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  sv: {
    page: 'Table of contents (Svenska)',
    root: 'Category:Svenska',
    alsoIn: 'also in', // TODO: Untranslated
    indentType: ':',
    replace: ['[ _]\\(Svenska\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  th: {
    page: 'Table of contents (ไทย)',
    root: 'Category:ไทย',
    alsoIn: 'ยังอยู่ใน', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(ไทย\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  tr: {
    page: 'Table of contents (Türkçe)',
    root: 'Category:Türkçe',
    alsoIn: 'ayrıca', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Türkçe\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  uk: {
    page: 'Table of contents (Українська)',
    root: 'Category:Українська',
    alsoIn: 'також в', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(Українська\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  'zh-hans': {
    page: 'Table of contents (简体中文)',
    root: 'Category:简体中文',
    alsoIn: '同时还属于',
    indentType: ':',
    replace: ['[ _]\\(简体中文\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
  'zh-hant': {
    page: 'Table of contents (正體中文)',
    root: 'Category:正體中文',
    alsoIn: '還在', // Unconfirmed
    indentType: ':',
    replace: ['[ _]\\(正體中文\\)', '', ''],
    keepAltName: true,
    showIndices: true,
    rightToLeft: false,
  },
}


module.exports = class ArchWiki {
  getLocalLanguage() {
    return languages.local
  }

  getCategoryLanguages() {
    return languages.categories
  }

  isCategoryLanguage(lang) {
    return languages.categories.indexOf(lang) > -1
  }

  getInterwikiLanguages() {
    return languages.interlanguage.external.concat(languages.interlanguage.internal)
  }

  isInterwikiLanguage(lang) {
    return this.getInterwikiLanguages().indexOf(lang) > -1
  }

  getInternalInterwikiLanguages() {
    return languages.interlanguage.internal
  }

  isInternalInterwikiLanguage(lang) {
    return languages.interlanguage.internal.indexOf(lang) > -1
  }

  getInterlanguageTag(language) {
    return languages.names[language].subtag
  }

  detectLanguage(title) {
    const matches = title.match(/^(.+?)(?:[ _]\(([^\(]+)\))?$/)
    let pureTitle = matches[1]
    let detectedLanguage = matches[2]

    if (!detectedLanguage || !this.isCategoryLanguage(detectedLanguage)) {
      // Language categories are exceptions
      // Don't just use /^[ _]*(.+?)[ _]*$/ but require the whole
      //   namespace+title to be passed as the argument (i.e. including
      //   "Category:")
      const testLangCat = matches[1].match(/^[ _]*[Cc]ategory[ _]*:[ _]*(.+?)[ _]*$/)
      if (testLangCat && this.isCategoryLanguage(testLangCat[1])) {
        detectedLanguage = testLangCat[1]
        pureTitle = matches[1]
      } else {
        detectedLanguage = this.getLocalLanguage()
        pureTitle = matches[0]
      }
    }

    return [pureTitle, detectedLanguage]
  }

  findAllInterlanguageLinks(source) {
    // See also WM.Parser.findInterlanguageLinks!!!
    return WM.Parser.findSpecialLinks(
      source,
      this.getInterwikiLanguages().join('|')
    )
  }

  findInternalInterlanguageLinks(source) {
    // See also WM.Parser.findInterlanguageLinks!!!
    return WM.Parser.findSpecialLinks(
      source,
      this.getInternalInterwikiLanguages().join('|')
    )
  }

  getTableOfContents(tag) {
    return tablesOfContents[tag]
  }
}
