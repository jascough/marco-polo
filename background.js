/*jshint asi:true,esversion:9,strict:global*/
/*globals $,chrome,document*/

'use strict'

import { sortBookmarks } from './sorter.js'

chrome.bookmarks.onCreated.addListener(n => {
    sortBookmarks()
})
