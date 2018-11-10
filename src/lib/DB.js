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

const WM = require('../index')

const logError = (error) => {
  mw.notification.notify(
    "The request to the database server failed, try again or inspect the \
error data in the browser's console.",
    {
      autoHide: false,
      tag: 'WikiMonkey-server-query',
      title: 'Wiki Monkey',
      type: 'error',
    },
  )
}


module.exports = class DB {
  constructor(serverUrl) {
    this.dburl = serverUrl
    if (!this.dburl.endsWith('/')) {
      this.dburl += '/'
    }
  }

  _sendString(method, resource, data) {
    if (data == null) { data = {} }
    return $.ajax({
      method,
      url: `${this.dburl}${resource}?${$.param(data)}`,
      dataType: 'json',
    }).fail(logError)
  }

  _sendJson(method, resource, data) {
    if (data == null) { data = {} }
    return $.ajax({
      method,
      url: this.dburl + resource,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
    }).fail(logError)
  }

  delete(resource, data) {
    return this._sendString('DELETE', resource, data)
  }

  get(resource, data) {
    return this._sendString('GET', resource, data)
  }

  head(resource, data) {
    return this._sendString('HEAD', resource, data)
  }

  options(resource, data) {
    return this._sendString('OPTIONS', resource, data)
  }

  patch(resource, data) {
    return this._sendJson('PATCH', resource, data)
  }

  post(resource, data) {
    return this._sendJson('POST', resource, data)
  }

  put(resource, data) {
    return this._sendJson('PUT', resource, data)
  }
}
