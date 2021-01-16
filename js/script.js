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
showPage(data,2);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/



function showPage(studentData, pageParam){
   const startIndex = (pageParam * studentsPerPageCount) - studentsPerPageCount;
   const endIndex = (pageParam * studentsPerPageCount);

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

//This function will create an html element and set properties as needed, can handle a variable number of arguments
//const div2 = createElement('div','className|student-details');
function createElement(elementType, variableArgumentList){
   let elem = document.createElement(elementType);
   for(var i in arguments){
      if(i > 0){
         const args = arguments[i].split("|");
         elem[args[0]] = args[1];
      }
   }
   return elem;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/




// Call functions
