/*jshint asi:true,esversion:9,strict:global*/
/*globals $,chrome,document*/

'use strict'

import { sortBookmarks } from './sorter.js'

chrome.bookmarks.onChanged.addListener(n => { sortBookmarks() })
chrome.bookmarks.onChildrenReordered.addListener(n => { sortBookmarks() })
chrome.bookmarks.onCreated.addListener(n => { sortBookmarks() })
chrome.bookmarks.onMoved.addListener(n => { sortBookmarks() })
chrome.bookmarks.onImportEnded.addListener(n => { sortBookmarks() })
