const tasks = JSON.parse(localStorage.getItem("tasks")) || [
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

// Fonction pour ajouter une tache
function addTask(title, priority) {
  tasks.push({ title, priority });
  saveTasks();
  displayTasks();
}
addTask();

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

// Fonction pour supprimer toutes les taches

function deleteAllTasks() {
  const selectedTasks = taskList.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  selectedTasks.forEach((checkbox) => {
    const index = parseInt(checkbox.dataset.index);
    tasks.splice(index, 1);
  });
  showNotification();
  saveTasks();
  displayTasks();
}
deleteTask.addEventListener("click", deleteAllTasks);

// Fonction pour sauvegarder les taches
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(`Saved ${tasks.length} tasks.`);
}

// Fonction pour afficher une notification lorsqu'une ou plusieurs tâches ont été supprimées, affichage d'un message de notification à l'utilisateur du type "x tâches supprimées avec succès".
function showNotification() {
  notification.textcontent = `${tasks.length} tâches supprimées avec succès`;
}
