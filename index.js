document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const doneList = document.getElementById("doneList");
    const todoCount = document.getElementById("todo-count");
    const doneCount = document.getElementById("done-count");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateTaskDisplay() {
        taskList.innerHTML = "";
        doneList.innerHTML = "";
        let toDoTasks = tasks.filter(task => !task.done);
        let doneTasks = tasks.filter(task => task.done);

        toDoTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button class="done" onclick="toggleDone(${index})">✔</button>
                    <button class="edit" onclick="editTask(${index})">✏️</button>
                    <button class="delete" onclick="deleteTask(${index})">🗑️</button>
                </div>`;
            taskList.appendChild(li);
        });

        doneTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("done");
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button class="delete" onclick="deleteTask(${index})">🗑️</button>
                </div>`;
            doneList.appendChild(li);
        });

        todoCount.textContent = toDoTasks.length;
        doneCount.textContent = doneTasks.length;
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, done: false });
            taskInput.value = "";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateTaskDisplay();
        }
    });

    window.toggleDone = (index) => {
        tasks[index].done = !tasks[index].done;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskDisplay();
    };

    window.editTask = (index) => {
        const newTaskText = prompt("Edit your task", tasks[index].text);
        if (newTaskText !== null && newTaskText.trim()) {
            tasks[index].text = newTaskText.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateTaskDisplay();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskDisplay();
    };

    updateTaskDisplay();
});
