
const tasks = [];
let time=0;
let timer=null;
let timerBreak= null;
let current=null;

const add = document.getElementById('addButton');
const idTask = document.getElementById('idTask');
const form = document.querySelector('#form');

const tasksContainer = document.getElementById('tasks-container');

const taskName = document.getElementById('time-container__taskName');
taskName.textContent = 'Keep Focus';
renderTime();

form.addEventListener('submit', e => {
    e.preventDefault();
    if (idTask.value != ''){
        createTask(idTask.value);
        idTask.value = '';
    }else{
        return console.warn('enter valid title task');
        
    }
})

function createTask(taskTitle){
    const newTask = {
        id: (Math.random()*100).toString(36).slice(9),
        title: taskTitle,
        completed: false
    };

    tasks.unshift(newTask);
    renderTask();
}

function renderTask(){
    const htmlTask = tasks.map((task)=>{
        return  `
            <div class="task">
                <div class="task__status">${task.completed 
                    ? `<span class="task__status--done">Done</span>`
                    : `<button class="task__button--start" data-id="${task.id}">Start</button>`}
                </div>
                <div class="task__title">${task.title}</div>
            </div>
        `;
    });

    tasksContainer.innerHTML=htmlTask.join('');

    // element collection
    const startButtons = document.querySelectorAll('.task .task__button--start');
    debugger;
    startButtons.forEach((btn)=>{
        btn.addEventListener('click', e => {
            if(!timer){
                const id = btn.getAttribute('data-id');
                startButtonHandler(id);
                btn.textContent = " In progress ";
                // btn.setAttribute('disabled','true')
                btn.removeAttribute("disabled")
                // document.getElementsByClassName('task__button--start').disabled = true;
            }
        });
    });

}

// TIMER LOGIC
function startButtonHandler(id){
    

    // comment/uncomment
    // time = 25 * 60;
    time = 5;
    current = id;
    const taskIndex = tasks.findIndex( task => task.id === id);
    taskName.textContent = tasks[taskIndex].title;

    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
}

function timeHandler(id){
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTask()
        //break
        startBreak();
    }
}

function renderTime(){
    const timeDiv = document.getElementById('time-container__value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt ( time % 60);

    timeDiv.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds<10?'0':''}${seconds}`
}

function markCompleted(id){
    // const taskIndex = tasks.findIndex( task => task.id === id);
    // tasks[taskIndex].completed = true;
    tasks[tasks.findIndex(task => task.id === id)].completed=true;
}

function startBreak(){
    time = 3;
    taskName.textContent = 'Break';

    timerBreak = setInterval(() => {
        timeBreakHandler();
    }, 1000);
}

function timeBreakHandler(id){
    time--;
    renderTime();
    if(time === 0){
        clearInterval(timerBreak);
        // markCompleted(id)
        current = null;
        timerBreak=null;
        taskName.textContent = 'Keep Focus';
        renderTask();
        
    }
}

alert('25 min for each task and 5 min of break as default');