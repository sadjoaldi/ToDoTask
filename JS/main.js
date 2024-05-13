const tasks = [
  {
    title: "Apprendre mon cours de JavaScript",
    priority: 1,
  },
  {
    title: "Créer mon compte Github",
    priority: 2,
  },
  {
    title: "Répondre à mes emails",
    priority: 3,
  },
];

// constantes pour la selection des elements du DOM
const taskList = document.querySelector("#taskList");
const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#task_name");
const taskPriority = document.querySelector("#priority");
const deleteTask = document.querySelector("#deleteAll");
const notification = document.querySelector("#notification");

// Fonction d'affichage des taches
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.index = index;
    label.textContent = task.title;
    label.classList.add(`priority-${task.priority}`);
    label.prepend(checkbox);
    li.appendChild(label);
    taskList.appendChild(li);
  });

  console.log(`Displayed ${tasks.length} tasks.`);
}
displayTasks();

//Gestionnaire d'événements pour l'ajout de tâches
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskName.value;
  const priority = taskPriority.value;
  if (title) {
    addTask(title, priority);
    taskName.value = "";
  }
});

// Fonction pour ajouter une tache
function addTask(title, priority) {
  tasks.push({ title, priority });
  displayTasks();
}
addTask();

// Fonction pour supprimer toutes les taches

function deleteAllTasks() {
  const selectedTasks = taskList.querySelectorAll(
    "input[type=checkbox]: checked"
  );
  selectedTasks.forEach((checkbox) => {
    const index = parseInt(checkbox.dataset.index);
    tasks.splice(index, 1);
  });
  displayTasks();
}
deleteTask.addEventListener("click", deleteAllTasks);
