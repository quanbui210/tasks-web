// const { default: axios } = require("axios");
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const btn = document.querySelector("#new-task-submit")

const firebaseConfig = {
    apiKey: "AIzaSyBCx4RtBe-saMwYu97C3oEe6eFHSZLrXKg",
    authDomain: "todolist-4a5c4.firebaseapp.com",
    projectId: "todolist-4a5c4",
    storageBucket: "todolist-4a5c4.appspot.com",
    messagingSenderId: "441793435889",
    appId: "1:441793435889:web:940411772d6115e6ab7150"
};
    
firebase.initializeApp({
    firebaseConfig,
    databaseURL: "https://todolist-570bc-default-rtdb.europe-west1.firebasedatabase.app/"
});

const database = firebase.database();


form.addEventListener('submit', (event) => {
    // Prevent the form from being submitted
    event.preventDefault();
    

    // Get the value of the input field
    const todo = input.value;
    if (todo === '') {
      window.alert('Task cannot be empty')
    } else {
      input.value = '';
      database.ref('todos').push({
        todo: todo
      });
    }
    // Clear the input field
  });
  console.log(database.ref('todos'))
  database.ref('todos').on('value', (snapshot) => {
    // Get the to-do list element
    const list = document.querySelector('#tasks');
    list.innerHTML = '';
    // Get the to-do items from the database
    const todos = snapshot.val();
    for (let todo in todos) {
             taskElement = document.createElement("div");
             taskElement.innerHTML = `
             <div class="task">
             <div class="content">
                 <input 
                     type="text" 
                     class="text" 
                     value='${todos[todo].todo}'
                     readonly>
             </div>
             <div class="actions">
                <a><i class="fa-solid fa-pen-to-square icon"></i></a>
                <a><i class="fa-solid fa-trash icon"></i></a>
             </div>
         </div>
        `
        list.appendChild(taskElement)
    }
    const task = document.querySelector('.task');
    let key = ''
    snapshot.forEach(child => {
        key = child.key
        task.setAttribute('data-key', key)
    })


    const deleteButtons = document.querySelectorAll('.icon');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () =>{
            var itemKey = task.getAttribute("data-key");
            console.log(itemKey)
            database.ref('todos').child(itemKey).remove()
        })
    })
  });
















    // let fetchedTasks = [];
    // var taskElement;
    // fetch('https://todolist-570bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
    // .then(response => {
    //     // console.log("called", response.json());
    //     return response.json()
    //  }).then(data => {
    //     // let data = response.data
    //     for(let key of Object.keys(data)) {
    //         fetchedTasks.push(data[key].text)
    //     }
    //     for (let i = 0; i < fetchedTasks.length; i++) {
    //         taskElement = document.createElement("div");
    //         taskElement.innerHTML = `
    //         <div class="task">
    //         <div class="content">
    //             <input 
    //                 type="text" 
    //                 class="text" 
    //                 value='${fetchedTasks[i]}'
    //                 readonly>
    //         </div>
    //         <div class="actions">
    //             <button class="edit">Edit</button>
    //             <button class="delete">Delete</button>
    //         </div>
    //     </div>
    //         `
    //         list_el.append(taskElement)
    //         let taskContentWrapper = document.getElementsByClassName('text')
    //     }
    //  })


    //  const deleteBtns = document.getElementsByClassName('delete')
     
    // form.addEventListener('submit', async (e) => {
    //     e.preventDefault();
    //     await fetch('https://todolist-570bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
    //        method: "POST", 
    //        body: JSON.stringify({text: input.value}),
    //     })
    //     .then(res => res.json())
    //     .then(data => data)
    //     await fetch('https://todolist-570bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         for(let key of Object.keys(data)) {
    //             fetchedTasks.push(data[key].text)
    //         }
    //     })
    //     list_el.append(taskElement)
    //     input.value = ''
    // })   

    
    // for (let delBtn of deleteBtns ) {
    //     delBtn.addEventListener('click', () =>{
    //             fetch('https://todolist-570bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
    //             method: 'DELETE'
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             return data
    //         })
    //     })
    // }
   


   






    // const fetchedTasks = []
    // axios.get('https://todolist-570bc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
    //     .then(response => {
    //         data = response.data
    //         console.log(Object.keys(data))
    //     })
    //     .then(data => {
    //         let taskElement = document.createElement("div");
    //         taskElement.classList.add('task')
    //         list_el.appendChild(taskElement)
    //     })
    //     for (let key of Object.keys(data)) {
    //         fetchedTasks.push(data[key].text)
    //         console.log(fetchedTasks[1])
    //      }   
    //      for (var i = 0; i < fetchedTasks.length; i++) {
    //         let taskContent = document.createElement("div")
    //         taskElement.appendChild(taskContent)
    //         taskContent.classList.add('content')
    //         let taskContentWrapper = document.createElement("input")
    //         taskContentWrapper.value = fetchedTasks[i]
    //         taskContentWrapper.classList.add('text')
    //         taskContentWrapper.type = "text"
    //         taskContentWrapper.setAttribute('readonly', 'readonly')
    //         taskContent.appendChild(taskContentWrapper)
    //     }



