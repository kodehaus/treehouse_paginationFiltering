/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const studentsPerPageCount = 9;
const linkListUL = document.querySelector('ul.link-list');
const headerDiv = document.querySelector('header.header');
let pageinationData = data;
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(studentData, pageParam){
   const startIndex = (pageParam  * studentsPerPageCount) - studentsPerPageCount;
   const endIndex = (pageParam  * studentsPerPageCount);

   const studentListDiv = document.querySelector('.student-list');
   studentListDiv.innerHTML = '';

   for(let i = 0; i < studentData.length; i++){
      if(i >= startIndex && i < endIndex){
        const student = studentData[i];

        const html = `
               <li class="student-item cf">
                     <div class="student-details">
                        <img class="avatar" src="${student.picture.large}" alt="${student.name.first}'s Profile Picture">
                        <h3>${student.name.first} ${student.name.last}</h3>
                        <span class="email">${student.email}</span>
                     </div>
                     <div class="joined-details">
                        <span class="date">${student.registered.date}</span>
                     </div>
               </li>`
        studentListDiv.insertAdjacentHTML('beforeend',html);
      }
   }
}

//create and add search bar to the page
//Decided to try using object creation vs template literals - that might be clearer and I wanted to 
//try and make it work with an alternate method
function createSearchBar(){
   const label = createElement('label','htmlFor:search','className:student-search');
   const input = createElement('input','id:search','placeholder:Search by name...');
   const button = createElement('button','type:button');
   const img = createElement('img', 'src:img/icn-search.svg','alt:Search icon');

   button.appendChild(img);
   label.appendChild(input);
   label.appendChild(button);

   headerDiv.appendChild(label);
}

//This function will create an html element and set properties as needed, can handle a variable number of arguments
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
function createElement(elementType, variableArgumentList){
   let elem = document.createElement(elementType);
   for(var i in arguments){
      if(i > 0){
         const args = arguments[i].split(":");
         elem[args[0]] = args[1];
      }
   }
   return elem;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function pagination(studentData){
   const buttonCount = Math.ceil(studentData.length/studentsPerPageCount);
   linkListUL.innerHTML = '';

   for(let i = 1; i <=  buttonCount; i++){
      const liElem = createElement('li');
      const liButton = createElement('button','type:button', `textContent:${i}`);
      liElem.appendChild(liButton);
      linkListUL.appendChild(liElem);
   }
   setActiveLinkButton(1);
}

//function search data 
function searchData(inData, searchTerm){
   const filteredStudentList = [];
   for(let i = 0; i < inData.length; i++){
      const firstNameMatch = inData[i].name.first.toLowerCase().indexOf(searchTerm.toLowerCase());
      const lastNameMatch = inData[i].name.last.toLowerCase().indexOf(searchTerm.toLowerCase());
      if((+firstNameMatch != -1) || (+lastNameMatch != -1)){
         filteredStudentList.push(inData[i]);
      }
   }

   //resolve the error state if it exists
   clearErr()
   pageinationData = filteredStudentList;

   //show the results and paginate the data
   showPage(filteredStudentList,1);
   pagination(filteredStudentList);

   // if there were no results, display an error
   if(filteredStudentList.length <= 0){
      const errorText = `No results found for the term "${document.getElementById('search').value}". 
      <br/>Please try again.`;
      displayErr(errorText); 
   }
}

//the error needs to be cleared onece it's added
function clearErr(){
   let clearPreviousErr = document.getElementById('error');
   if(clearPreviousErr){
      clearPreviousErr.remove();
   }
}

//Create and display the error div
function displayErr(errorText){
   const pageDiv = document.querySelector('.page');
   const noResultsDiv = `<div id='error' class="no-results">${errorText}</div>`;
   pageDiv.children[1].insertAdjacentHTML('beforebegin', noResultsDiv);
}

//sets active on needed pagination  button
function setActiveLinkButton(buttonToActivate){
   //account for zero based indexing
   buttonToActivate --;
   for(let i = 0; i < linkListUL.children.length; i++){
      if(i === buttonToActivate){
         linkListUL.children[i].firstElementChild.className = 'active';
      } else {
         linkListUL.children[i].firstElementChild.className = '';
      }
   }
}


//helps determine whether to search or show original data
function searchHelper(event){
   const searchTerm = document.getElementById('search').value;
   if(searchTerm){
      searchData(pageinationData, searchTerm);
   } else {
      showPage(data,1);
      pagination(data);
   }
}



//added event listner on pagination buttons
linkListUL.addEventListener('click', (event) => {
   const elem = event.target;
   if(elem.tagName === 'BUTTON'){
      setActiveLinkButton(+elem.textContent);
      showPage(pageinationData, +elem.textContent);
   }
});

headerDiv.addEventListener('click', (event) => {
   if(event.target.tagName === 'IMG'){
      searchHelper(event);
   }
});
headerDiv.addEventListener('keyup', (event) => {
   if(event.target.tagName === 'INPUT'){
      searchHelper(event);
   }
});


// Call functions
createSearchBar();
showPage(data,1);
pagination(data);


//Added listeners

