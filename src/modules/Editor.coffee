# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

Compatibility = require('../../lib.js.generic/dist/Compatibility')
HTTP = require('../../lib.js.generic/dist/HTTP')


class module.exports
    constructor: (@WM) ->

    getTitle: ->
        return @WM.Parser.squashContiguousWhitespace(decodeURIComponent(
                                    HTTP.getURIParameter(null, 'title')))

    isSection: ->
        return if document.getElementsByName('wpSection')[0].value then true else
                                                                        false

    readSource: ->
        value = document.getElementById('wpTextbox1').value
        # For compatibility with Opera and IE
        return Compatibility.normalizeCarriageReturns(value)

    writeSource: (text) ->
        document.getElementById('wpTextbox1').value = text

    readSummary: ->
        return document.getElementById('wpSummary').getAttribute("value")

    writeSummary: (text) ->
        document.getElementById('wpSummary').setAttribute("value", text)

    appendToSummary: (text) ->
        document.getElementById('wpSummary').setAttribute("value",
                                                    this.readSummary() + text)
