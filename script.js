document.addEventListener('DOMContentLoaded', function() {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            JSON.parse(storedTasks).forEach(taskText => {
                addTask(taskText, false); 
            });
        }
    }

    
    function addTask(taskText, saveToStorage = true) {
        
        taskText = taskText.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        
        const li = document.createElement('li');
        li.textContent = taskText;

    
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        
        taskInput.value = '';

        
        if (saveToStorage) {
            saveTasks();
        }
    }

    
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.textContent.replace('Remove', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });


    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    
    loadTasks();
});