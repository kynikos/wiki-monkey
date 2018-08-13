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

WM = require('./index')


class module.exports
    constructor: ->
        @dburl = WM.conf.database_server
        if not @dburl.endsWith('/')
            @dburl += '/'

    sendRequest = (deferred, method, resource, data) ->
        deferred.fail((error) ->
            console.error("ERROR!!!", method, resource, data, error)
        )

    _sendString: (method, resource, data) ->
        sendRequest($.ajax({
            method
            url: @dburl + resource
            data: data
            dataType: "json"
        }), method, resource, data)

    _sendJson: (method, resource, data) ->
        sendRequest($.ajax({
            method
            url: @dburl + resource
            data: JSON.stringify(data)
            contentType: "application/json"
            dataType: "json"
        }), method, resource, data)

    delete: (resource, data) ->
        @_sendString('DELETE', resource, data)

    get: (resource, data) ->
        @_sendString('GET', resource, data)

    head: (resource, data) ->
        @_sendString('HEAD', resource, data)

    options: (resource, data) ->
        @_sendString('OPTIONS', resource, data)

    patch: (resource, data) ->
        @_sendJson('PATCH', resource, data)

    post: (resource, data) ->
        @_sendJson('POST', resource, data)

    put: (resource, data) ->
        @_sendJson('PUT', resource, data)
