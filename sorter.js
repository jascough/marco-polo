/*jshint asi:true,esversion:9,strict:global*/
/*globals $,chrome,document*/

'use strict'

/**
 * An entry of a bookmarks tree is a directory
 * if it does not have an associated url.
 */
const isDir = entry => entry.url === undefined

/**
 * Get the titles of the given collection of
 * bookmark nodes, splitting out directory
 * names from bookmark names.
 */
function getTitles(entries) {
  const titles = { dirs: [], bookmarks: [] }
  entries.forEach(entry => {
    const title = entry.title.toLowerCase()
    if (isDir(entry)) {
      titles.dirs.push(title)
    } else {
      titles.bookmarks.push(title)
    }
  })

  return titles
}

/**
 * Get the sorted titles of the given collection
 * of bookmark nodes, with all directories listed
 * before standalone bookmarks.
 */
function getSortedTitles (entries) {
  const titles = getTitles(entries)
  return titles.dirs.sort().concat(titles.bookmarks.sort())
}

/**
 * Sort the specified bookmark entries in alphabetical
 * order.
 */
function sortEntries (entries) {
  // Sort the titles of the children in alphabetical order.
  const sortedTitles = getSortedTitles(entries)
  entries.forEach(entry => {
    // Move the current entry to the sorted index.
    chrome.bookmarks.move(entry.id, {
      parentId: entry.parentId,
      index: sortedTitles.indexOf(entry.title.toLowerCase())
    })

    // Sort the children of the current entry.
    chrome.bookmarks.getChildren(entry.id, sortEntries)
  })
}

/**
 * Sorts all bookmarks in the bookmarks bar and the
 * 'Other Bookmarks' folder in aphabetical order.
 */
function sortBookmarks () {
  const BookmarkBarId = '1'
  const OtherBookmarksId = '2'
  chrome.bookmarks.getChildren(BookmarkBarId, sortEntries)
  chrome.bookmarks.getChildren(OtherBookmarksId, sortEntries)
}

$(document).ready(function () {
  $('#main_button').click(() => sortBookmarks())
})
