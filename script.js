const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;


// Initialize Arrays
  let backlogListArray = [];
  let progressListArray = [];
  let completeListArray = [];
  let onHoldListArray = [];
  let listArrays =[];

// Drag Functionality
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(arrayName+'item', JSON.stringify(listArrays[index]));
  });
  
}

// Create DOM Elements for each list item
function createItemEl(columnEl, item) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((element) => {
    createItemEl(backlogList,element);
  });
  progressList.textContent='';
  progressListArray.forEach(element => {
    createItemEl(progressList,element);
  });
  completeList.textContent='';
  completeListArray.forEach(element => {
    createItemEl(completeList, element);
  });
  onHoldList.textContent='';
  onHoldListArray.forEach(element =>{
    createItemEl(onHoldList, element);
  });
  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Allows arrays to reflect Drag and Drop items
function reBuildArrays(){
  backlogListArray = [];
  for (let index = 0; index < backlogList.children.length; index++) {
    backlogListArray.push(backlogList.children[index].textContent);
  }
  progressListArray = [];
  for (let index = 0; index < progressList.children.length; index++) {
    progressListArray.push(progressList.children[index].textContent);
  }
  completeListArray = [];
  for (let index = 0; index < completeList.children.length; index++) {
    completeListArray.push(completeList.children[index].textContent);
  }
  onHoldListArray = [];
  for (let index = 0; index < onHoldList.children.length; index++) {
    onHoldListArray.push(onHoldList.children[index].textContent);
  }
  updateDOM();
}
// When Item Starts Dragging 
updateDOM();
function drag(e){
  draggedItem = e.target;
  console.log(draggedItem); 
}
// Columns Allows for Item to Drop
function allowDrop(e){
  console.log('Allow Drop');
  e.preventDefault();
}

// When Item Enters Columns Area
function dragEnter(column){
  listColumns[column].classList.add('over');
  currentColumn = column;
}

// Dropping Item in column
function drop(e){
  e.preventDefault(); 
  console.log('drop');
  // Remove Background color/padding
  listColumns.forEach(column => {
    column.classList.remove('over');
  });
  // Add Item to Column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);    
  console.log(backlogList.children);
  console.log(updatedOnLoad);
  reBuildArrays();
}
