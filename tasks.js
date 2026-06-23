const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

function loadTasks() {
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error reading tasks file:', error.message);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.log('Error writing tasks file:', error.message);
  }
}

function getNextId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map(t => t.id)) + 1;
}

function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: getNextId(tasks),
    description: description,
    status: 'pending'
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
  
  console.log('Tasks:');
  console.log('------');
  tasks.forEach(task => {
    const statusSymbol = task.status === 'completed' ? '✓' : '○';
    console.log(`${task.id}. ${statusSymbol} ${task.description} (${task.status})`);
  });
}

function markDone(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    console.log(`Error: Task with ID ${id} not found.`);
    return false;
  }
  
  task.status = 'completed';
  saveTasks(tasks);
  return true;
}

function removeTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) {
    console.log(`Error: Task with ID ${id} not found.`);
    return false;
  }
  
  tasks.splice(index, 1);
  saveTasks(tasks);
  return true;
}

function filterTasks(status) {
  const tasks = loadTasks();
  const filtered = tasks.filter(t => t.status === status);
  
  if (filtered.length === 0) {
    console.log(`No tasks found with status "${status}".`);
    return;
  }
  
  console.log(`Tasks with status "${status}":`);
  console.log('-------------');
  filtered.forEach(task => {
    const statusSymbol = task.status === 'completed' ? '✓' : '○';
    console.log(`${task.id}. ${statusSymbol} ${task.description} (${task.status})`);
  });
}

module.exports = {
  addTask,
  listTasks,
  markDone,
  removeTask,
  filterTasks,
  loadTasks,
  saveTasks
};
