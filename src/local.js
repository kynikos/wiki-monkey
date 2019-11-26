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

require('./lib/PreInit')(
  'ArchWiki',
  // The require paths can't be constructed dynamically in PreInit,
  // or browserify won't understand and import them
  () => [
    /* eslint-disable global-require */
    require('./plugins/ArchWikiFixHeader'),
    require('./plugins/ArchWikiFixHeadings'),
    require('./plugins/ArchWikiFixLinks'),
    require('./plugins/ArchWikiNewTemplates'),
    require('./plugins/ArchWikiNPFilter'),
    require('./plugins/ArchWikiRCFilter'),
    require('./plugins/ArchWikiSortContacts'),
    // The ArchPackages module is currently unusable
    // require('./plugins/ArchWikiUpdatePackageTemplates'),
    require('./plugins/ArchWikiWantedCategories'),
    require('./plugins/Bookmarks'),
    require('./plugins/DeletePages'),
    require('./plugins/ExpandContractions'),
    require('./plugins/FixBacklinkFragments'),
    require('./plugins/FixDoubleRedirects'),
    require('./plugins/FixFragments'),
    require('./plugins/FixLinkFragments'),
    require('./plugins/MultipleLineBreaks'),
    require('./plugins/SimpleReplace'),
    require('./plugins/SynchronizeInterlanguageLinks'),
    require('./plugins/UpdateCategoryTree'),
    /* eslint-enable global-require */
  ],
)
