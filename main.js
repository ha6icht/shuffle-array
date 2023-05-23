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

const insertArray = document.getElementById('array');
const button = document.getElementById('button');
const outputArray = document.getElementById('shuffledArray');
const undoButton = document.getElementById('undoSVG');
const createButton = document.getElementById('createSVG');
const createButtonSvg = document.querySelector('svg');
const createButtonPath = document.querySelector('path');
const navigationCreate = document.getElementById('navigationCreate');
const newArray = document.getElementById('new');
const changeArray = document.getElementById('change');
const body = document.querySelector('body');

let create = false;
let clickCreate = false;
let keyString = '';

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

// Closes submenu of create button
// Click event on whole page expect create button
body.onclick = function(event){
    const target = event.target;
    //console.log(target);
    if(target !== createButtonSvg && target !== createButtonPath && target !== createButton){
        navigationCreate.style.display = 'none';
        clickCreate = false;
    }
}

// Click event on let's shuffle button
// Calls shuffle function
button.onclick = function(){
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
undoButton.onclick = function(){
    outputArray.innerHTML = '';
    keyString = '';
    if(create){
        insertArray.innerHTML = safeMyArray;
        create = false;
    }
}

// Click event on create button
// opens/closes submenu
createButton.onclick = function(){
    if(clickCreate){
        navigationCreate.style.display = 'none';
        clickCreate = false;
    }
    else{
        navigationCreate.style.display = 'inline-block';
        clickCreate = true;
    }
}

// Click event on new submenu entry
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

// Click event on change submenu entry
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