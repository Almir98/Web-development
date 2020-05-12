const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');


function loadAllListeners()
{
    form.addEventListener("submit",addtask);        // Add new tak
    tasklist.addEventListener("click",removeTask);      // remove 1 task
    clearBtn.addEventListener('click',clearAllTasks);   // clear all
}

loadAllListeners();

// Adding new task inside collection
function addtask(e)
{ 
    e.preventDefault();

   if(taskInput.value==='')
   {
       alert("Please add a task");
   }
   else{
       // if input is not empty then we create a new li inside ul

   const li=document.createElement('li');
   li.className='collection-item';
   li.textContent=taskInput.value;
   
   const link=document.createElement('a');
   link.className="delete-item secondary-content";
   link.innerHTML='<i class="fa fa-remove"></i>';
   li.appendChild(link);
   
   tasklist.appendChild(li);
   taskInput.value='';

   storeTaskInLocalStorage(taskInput.value);

   }
}


function storeTaskInLocalStorage(task)
{
    let tasks;

    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}



// Remove task from collection

function removeTask(e)
{
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure ?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Remove task from collection

function clearAllTasks(e)
{
    e.preventDefault();
    tasklist.innerHTML='';
}














