const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');


loadAllListeners();

function loadAllListeners()
{
    form.addEventListener("submit",addtask);
}


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
   }
}
















