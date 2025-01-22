document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            JSON.parse(storedTasks).forEach(taskText => {
                addTask(taskText, false); // false indicates that this task is already saved
            });
        }
    }

    // Function to add a task
    function addTask(taskText, saveToStorage = true) {
        // Trim and check if the task text is not empty
        taskText = taskText.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save task to Local Storage if it's a new task
        if (saveToStorage) {
            saveTasks();
        }
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.textContent.replace('Remove', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for adding task by button click
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    // Event listener for adding task by pressing 'Enter'
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});