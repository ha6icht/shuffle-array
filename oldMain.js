/* Author:  Rolf Karlen
*  File:    main.js
*  Created: 26.09.19
*/

/**
* Shuffles array in place.
* @param {Array} a items An array containing the items.
*
* Fisher–Yates shuffle algorithm
*/
function shuffle(a) {
    let j, x;
    // for-loop
    for (let i = a.length - 1; i > 0; i--) {
        // random number
        j = Math.floor(Math.random() * (i + 1));
        // assignment to array
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
// Variables
let myArray = ['1','2','3','4','5','6','7','8','9'];
let createdString = '';
let createdArray = [];
let safeMyArray = myArray.slice();

let create = false;
let clickCreate = false;
let keyString = '';

// Manipulating DOM; get element by id or tag
const insertArray = document.getElementById('array');
const outputArray = document.getElementById('shuffledArray');

const imageCreateButton = document.getElementById('imageCreateSVG');
const newArray = document.getElementById('new');
const changeArray = document.getElementById('change');
const imagePlayButton = document.getElementById('imagePlaySVG');
const imageUndoButton = document.getElementById('imageUndoSVG');
const submenuCreate = document.getElementById('submenuCreateSVG');

const body = document.querySelector('body');



// Inserts myArray into start array bar
insertArray.innerHTML = myArray;

// Inserts an newly created array into shuffled array 
function setArray(event){
    keyString = event.key;
    if(event.key === 'Enter'){
        event.preventDefault();
        createdString = insertArray.innerHTML;
        createdArray = createdString.split(',');
        outputArray.innerHTML = createdArray;
    }
}

// Click event on whole page expect create button
// Closes submenu of create button
body.onclick = function(event){
    const target = event.target;
    if(target !== imageCreateButton){
        submenuCreate.style.display = 'none';
        clickCreate = false;
    }
}

// Click event on play button
// Calls shuffle function
imagePlayButton.onclick = function(){
    if(create && keyString === 'Enter' && createdArray.length > 1){
        insertArray.contentEditable = false;
        outputArray.innerHTML = shuffle(createdArray);
    }
    else if(create && keyString != 'Enter'){
        alert('Hit Enter.');
        insertArray.focus();
    }
    else if(create && keyString === 'Enter' && createdArray.length === 1){
        alert('Please, fill in at least two items.');
        keyString = '';
        insertArray.focus();
    }
    else{
        insertArray.contentEditable = false;
        outputArray.innerHTML = shuffle(myArray);
    }
}

// Click event on undo button
// Clears shuffled array bar
imageUndoButton.onclick = function(){
    outputArray.innerHTML = '';
    keyString = '';
    if(create){
        insertArray.innerHTML = safeMyArray;
        create = false;
    }
}

// Click event on create button
// opens/closes submenu
imageCreateButton.onclick = function(){
    if(clickCreate){
        submenuCreate.style.display = 'none';
        clickCreate = false;
    }
    else{
        submenuCreate.style.display = 'block';
        clickCreate = true;
    }
}

// Click event on submenu entry new
// User can enter array into start array bar
newArray.onclick = function(){
    create = true;
    keyString = '';
    createdArray = [];
    insertArray.innerHTML = '';
    outputArray.innerHTML = '';
    insertArray.contentEditable = true;
    insertArray.focus();
    insertArray.onkeydown = setArray;
}

// Click event on submenu entry change
// User can change array in start array bar
changeArray.onclick = function(){
    const checkInsertArray = insertArray.innerHTML
    if(checkInsertArray != ''){
        create = true;
        keyString = '';
        insertArray.contentEditable = true;
        insertArray.focus();
        insertArray.onkeydown = setArray;
    }
    else{
        alert('There is no array to change!');
        insertArray.contentEditable = false;
    }
}