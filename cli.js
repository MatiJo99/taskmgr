#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

const {
  addTask,
  listTasks,
  markDone,
  removeTask,
  filterTasks
} = require('./tasks');

function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const options = {};
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--status' && args[i + 1]) {
      options.status = args[i + 1];
      i++;
    }
  }
  
  return { command, options };
}

function main() {
  const { command, options } = parseArgs();

  if (!command) {
    console.log('Usage: taskmgr <command> [options]');
    console.log('');
    console.log('Commands:');
    console.log('  add "description"     Add a new task');
    console.log('  list                  List all tasks');
    console.log('  done <id>             Mark a task as completed');
    console.log('  remove <id>           Remove a task');
    console.log('  filter --status <s>   Filter tasks by status (pending/completed)');
    process.exit(1);
  }

  switch (command) {
    case 'add':
      const description = options.description || process.argv[3];
      if (!description) {
        console.log('Error: Please provide a task description.');
        console.log('Usage: taskmgr add "description"');
        process.exit(1);
      }
      addTask(description);
      console.log(`Task added: "${description}"`);
      break;

    case 'list':
      listTasks();
      break;

    case 'done':
      const id = parseInt(options.id || process.argv[3], 10);
      if (!id || id <= 0) {
        console.log('Error: Please provide a valid task ID.');
        console.log('Usage: taskmgr done <id>');
        process.exit(1);
      }
      markDone(id);
      console.log(`Task ${id} marked as completed.`);
      break;

    case 'remove':
      const removeId = parseInt(options.id || process.argv[3], 10);
      if (!removeId || removeId <= 0) {
        console.log('Error: Please provide a valid task ID.');
        console.log('Usage: taskmgr remove <id>');
        process.exit(1);
      }
      removeTask(removeId);
      console.log(`Task ${removeId} removed.`);
      break;

    case 'filter':
      if (!options.status) {
        console.log('Error: Please provide a status.');
        console.log('Usage: taskmgr filter --status <pending|completed>');
        process.exit(1);
      }
      filterTasks(options.status);
      break;

    default:
      console.log(`Error: Unknown command "${command}"`);
      process.exit(1);
  }
}

main();


