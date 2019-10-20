'use strict'

/**
 * Sort the specified bookmark entries in alphabetical
 * order.
 */
function sortEntries (entries) {
  // Sort the titles of the children in alphabetical order.
  const sortedTitles = entries.map(c => c.title.toLowerCase()).sort()
  entries.forEach(child => {
    // Move the current entry to the sorted index.
    chrome.bookmarks.move(child.id, {
      parentId: child.parentId,
      index: sortedTitles.indexOf(child.title.toLowerCase())
    })

    // Sort the children of the current entry.
    chrome.bookmarks.getChildren(child.id, sortEntries)
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
