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

import WM from '%/index'


export default function fixFragment(rawfragment, sections) {
  const fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim()

  if (sections.indexOf(fragment) < 0) {
    for (const section of sections) {
      const dotSection = WM.Parser.dotEncode(section)
      const dotFragment = WM.Parser.dotEncode(fragment)

      if (dotSection.toLowerCase() === dotFragment.toLowerCase()) {
        if (fragment === dotFragment) {
          // If the fragment was encoded, re-encode it because it
          // could contain link-breaking characters (e.g. []|{})
          // The condition would also be true if the fragment
          // doesn't contain any encodable characters, but since
          // section and fragment at most differ by
          // capitalization, encoding the section won't have any
          // effect
          return dotSection
        }
        // If the fragment was not encoded, if the fragment
        // contained link-breaking characters the link was
        // already broken, and replacing it with section
        // wouldn't make things worse; if the fragment didn't
        // contain link-breaking characters, the section
        // doesn't either, since section and fragment at most
        // differ by capitalization, so it's safe to replace it
        // If the fragment was *partially* encoded instead, a
        // link-breaking character may have been encoded, so
        // all link-breaking characters must be re-encoded
        // here!
        return WM.Parser.dotEncodeLinkBreakingFragmentCharacters(section)
      }
    }
    return false
  }
  return true
}
