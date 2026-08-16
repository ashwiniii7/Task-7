const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskCategory = document.getElementById("taskCategory");
const taskContainer = document.getElementById("taskContainer");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const clearAll = document.getElementById("clearAll");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("domTasks")) || [];

function saveTasks() {
    localStorage.setItem("domTasks", JSON.stringify(tasks));
}

function createTaskCard(task) {
    const card = document.createElement("article");
    card.setAttribute("class", "task-card");
    card.setAttribute("data-id", task.id);
    card.setAttribute("data-status", task.completed
        ? "completed"
        : "pending"
    );
    card.setAttribute("data-category", task.category);
    if (task.completed) {
        card.classList.add("completed");
    }
    const header = document.createElement("div");
    header.classList.add("task-header");
    const title = document.createElement("span");
    title.classList.add("task-title");

    const titleText = document.createTextNode(task.title);
    title.appendChild(titleText);

    const category = document.createElement("span");
    category.classList.add("category");

    category.append(
        document.createTextNode(task.category)
    );


    header.append(title, category);

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.setAttribute("data-action", "edit");
    editButton.append(
        document.createTextNode("Edit")
    );

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.setAttribute("data-action", "complete");
    completeButton.append(
        document.createTextNode(
            task.completed ? "Undo" : "Complete"
        )
    );

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.setAttribute("data-action", "delete");
    deleteButton.append(
        document.createTextNode("Delete")
    );
    actions.append(
        editButton,
        completeButton,
        deleteButton
    );
    card.append(header, actions);
    return card;
        }
        
        function renderTasks() {
            const fragment = document.createDocumentFragment();
            taskContainer.replaceChildren();
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedCategory = filterCategory.value;
            const filteredTasks = tasks.filter(task => {
                const matchesSearch = task.title.toLowerCase().includes(searchTerm);
                const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });
            if (filteredTasks.length === 0) {
                const message = document.createElement("div");
                message.classList.add("empty");
                message.append(
                    document.createTextNode(
                        tasks.length === 0
                            ? "No tasks yet. Add your first task!"
                            : "No tasks match your search/filter."
                    )
                );
                fragment.append(message);
            } else {
                filteredTasks.forEach(task => {
                    const card = createTaskCard(task);
                    fragment.append(card);
                });
            }
            taskContainer.append(fragment);
            updateCounters();
        }

        function updateCounters() {
            const completed = tasks.filter(task => task.completed).length;
            const pending = tasks.filter(task => !task.completed).length;
            totalCount.textContent = tasks.length;
            pendingCount.textContent = pending;
            completedCount.textContent = completed;
        }
        taskForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const title = taskTitle.value.trim();
            const category = taskCategory.value;
            if (title === "") {
                return;
            }
            const newTask = {
                id: Date.now().toString(),
                title: title,
                category: category,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskForm.reset();
            taskTitle.focus();
        });
        taskContainer.addEventListener("click", function(event) {
            const button = event.target.closest("button[data-action]");
            if (!button) {
                return;
            }
            const card =
                button.closest(".task-card");
            if (!card) {
                return;
            }
            const id = card.dataset.id;
            const action = button.dataset.action;
            if (action === "edit") {
                const task = tasks.find(
                    task => task.id === id
                );
                if (!task) {
                    return;
                }
                const newTitle =
                    prompt("Edit task title:", task.title);


                if (
                    newTitle !== null &&
                    newTitle.trim() !== ""
                ) {

                    task.title = newTitle.trim();

                    saveTasks();

                    renderTasks();
                }
            }
            else if (action === "complete") {
                const task = tasks.find(
                    task => task.id === id
                );
                if (!task) {
                    return;
                }
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            }
            else if (action === "delete") {
                const taskIndex = tasks.findIndex( task => task.id === id );
                if (taskIndex === -1) {
                    return;
                }
                tasks.splice(taskIndex, 1);
                saveTasks();
                renderTasks();
            }
        });

        searchInput.addEventListener("input", renderTasks);
        filterCategory.addEventListener(
            "change",
            renderTasks
        );
        clearAll.addEventListener("click", function() {
            if (tasks.length === 0) {
                return;
            }
            const confirmed = confirm("Delete all tasks?");
            if (!confirmed) {
                return;
            }
            tasks = [];
            saveTasks();
            renderTasks();
        });

        themeToggle.addEventListener("click", function() {
            const currentTheme = document.body.dataset.theme;
            const newTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";
            document.body.classList.toggle(
                "dark-mode",
                newTheme === "dark"
            );
            document.body.setAttribute(
                "data-theme",
                newTheme
            );
            themeToggle.textContent =
                newTheme === "light"
                    ? "☀️ Light Mode"
                   : "🌙 Dark Mode";
        });

        const grandparent = document.getElementById("grandparent");
        const parent = document.getElementById("parent");
        const childButton = document.getElementById("childButton");
        childButton.addEventListener("click", function() {
            console.log("Bubbling: Child");
        });

        parent.addEventListener("click", function() {
            console.log("Bubbling: Parent");
        });

        grandparent.addEventListener("click", function() {
            console.log("Bubbling: Grandparent");
        });

        grandparent.addEventListener(
            "click",
            function() {
                console.log("Capturing: Grandparent");
            },
            true
        );

        parent.addEventListener(
            "click",
            function() {
                console.log("Capturing: Parent");
            },
            true
        );

        childButton.addEventListener(
            "click",
            function() {
                console.log("Capturing: Child");
            },
            true
        );
        renderTasks();