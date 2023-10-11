
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the necessary DOM elements
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const todoListContainer = document.getElementById('todo-list');
    const taskCountSpan = document.getElementById('task-count');

    // Array to store tasks
    let tasks = [];

    // Event listener for the add button click
    addButton.addEventListener('click', function() {
        // Get the trimmed value of the task input
        const taskText = taskInput.value.trim();
        // Check if the input is not empty
        if (taskText !== '') {
            // if taak is not empty add a new task object to the tasks array
            tasks.push({ id: Date.now(), task: taskText, completed: false });
            // Update the todo list and reset the input field
            updateTodoList();
            taskInput.value = '';
        }
    });

    // Function to remove a task based on its ID
    function removeTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        // Update the todo list after removal
        updateTodoList();
    }

    // Function to update the todo list displayed on the page
    function updateTodoList() {
        // Clear the existing content of the todo list container
        todoListContainer.innerHTML = '';
        // Iterate through tasks and create list items for each task
        tasks.forEach(function(task) {
            const listItem = document.createElement('li');
            
            listItem.innerHTML = `
                <span>${task.task}</span>
                <button class="delete-button">Delete</button>
            `;
            // Add completed class to the list item if the task is completed
            if (task.completed) {
                listItem.classList.add('completed');
            }
            
            const deleteButton = listItem.querySelector('.delete-button');
            // Add event listener to the delete button to remove the task when clicked
            deleteButton.addEventListener('click', function() {
                removeTask(task.id);
            });
            // Append the list item to the todo list container
            todoListContainer.appendChild(listItem);
        });

        // Calculate and display the count of tasks yet to be completed
        const taskCount = tasks.filter(task => !task.completed).length;
        taskCountSpan.textContent = taskCount;
    }
});
