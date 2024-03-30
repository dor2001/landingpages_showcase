document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
      const li = document.createElement('li');
      const div = document.createElement('div');
      div.className = "bg";
      div.textContent = task.text;
      if (task.completed) {
        li.classList.add('completed');
      }
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'מחק';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', function() {
        tasks.splice(index, 1);
        renderTasks();
        saveTasks();
      });
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = task.completed ? 'לא בוצע' : 'בוצע';
      toggleBtn.classList.add('toggle-btn');
      toggleBtn.addEventListener('click', function() {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        saveTasks();
      });
      li.appendChild(div)
      li.appendChild(deleteBtn);
      li.appendChild(toggleBtn);
      taskList.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTaskBtn.addEventListener('click', function() {
    const text = taskInput.value.trim();
    if (text !== '') {
      tasks.push({ text: text, completed: false });
      renderTasks();
      saveTasks();
      taskInput.value = '';
    }
  });

  renderTasks();
});
