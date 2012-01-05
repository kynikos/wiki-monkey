// ==UserScript==
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @description Perform automatic actions when editing wiki pages
// @version 1.4.1
// @icon http://github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/master/src/wikiMonkeyCore.js
// ==/UserScript==

/*
 * Add user functions directly in this file or include them with @require tags
 * in the header.
 *
 * To keep the namespace tidy, all user function names should be prefixed with
 * "UF_".
 *
 * Add the names of the user functions to the array passed to main(), following
 * this structure:
 * 
 * [
 *     Level 1: this level separates the functions according to the page they
 *     apply to. The first sub-array (index 0) contains the functions related
 *     to edit pages; the second sub-array (index 1) contains the functions
 *     related to diff pages.
 *     [
 *         Level 2: this level separates the various rows of buttons that will
 *         be created.
 *         [
 *             Level 3: this level separates the various functions in a row.
 *             [
 *                 Level 4: this level defines the button for a function: its
 *                 first element is the function name, while the second element
 *                 is the text dislpayed on the button; a third optional
 *                 boolean value can be used to create a text input field next
 *                 to the button, which should be accessed from the user
 *                 function with "this.nextSibling.value".
 *             ]
 *         ]
 *     ]
 * ]
 * 
 * The functions in each row
 * will be executed in the order they are added.
 * 
 * For example:
 *
 * main([
 *     [
 *         [
 *             [UF_myFunction1, "myFunction1"],
 *             [UF_myFunction2, "myFunction2", true]
 *         ],
 *         [
 *             [UF_myFunction3, "myFunction3", true],
 *             [UF_myFunction4, "myFunction4"]
 *         ]
 *     ],
 *     [
 *         [
 *             [UF_myFunction5, "myFunction5"],
 *             [UF_myFunction6, "myFunction6"]
 *         ],
 *         [
 *             [UF_myFunction7, "myFunction7"],
 *             [UF_myFunction8, "myFunction8", true]
 *         ]
 *     ],
 * 
 *     ...
 * 
 * ]);
 *
 */

main([
    [
        [],
        []
    ]
]);
