# TaskMgr CLI

A Dockerized command-line Task Manager that reads/writes tasks to a JSON file.

## Features

- Add new tasks
- List all tasks
- Mark tasks as completed
- Remove tasks
- Filter tasks by status (`pending` or `completed`)

## Installation

### Local Installation

```bash
npm install
```

### Docker Installation

```bash
docker build -t taskmgr-cli .
```

## Usage

### Local Usage

```bash
# Add a task
node cli.js add "Fix login bug"

# List all tasks
node cli.js list

# Mark a task as completed (e.g., task ID 1)
node cli.js done 1

# Remove a task (e.g., task ID 1)
node cli.js remove 1

# Filter tasks by status
node cli.js filter --status pending
node cli.js filter --status completed
```

### Docker Usage

Mount your local `tasks.json` to persist data outside the container:

```bash
# Build the image
docker build -t taskmgr-cli .

# Add a task
docker run --rm -v "$(pwd)/tasks.json":/app/tasks.json taskmgr-cli add "New task"

# List all tasks
docker run --rm -v "$(pwd)/tasks.json":/app/tasks.json taskmgr-cli list

# Mark a task as completed
docker run --rm -v "$(pwd)/tasks.json":/app/tasks.json taskmgr-cli done 1

# Remove a task
docker run --rm -v "$(pwd)/tasks.json":/app/tasks.json taskmgr-cli remove 1

# Filter tasks by status
docker run --rm -v "$(pwd)/tasks.json":/app/tasks.json taskmgr-cli filter --status pending
```

## Project Structure
taskmgr-cli/
├── cli.js # Command-line interface and argument parsing
├── tasks.js # Task business logic (add, list, done, remove, filter)
├── package.json # Node.js project configuration
├── Dockerfile # Docker configuration for containerization
├── README.md # Project documentation
└── tasks.json # Task data file (created automatically)

## Git Workflow

This project uses a feature branch workflow:

1. **main branch**: Stable, production-ready code
2. **feature branches**: For new commands/features (e.g., `feature/filter-command`)

Example workflow:

```bash
# Create feature branch
git checkout -b feature/filter-command

# Make changes and commit
git add .
git commit -m "Add filter command with --status option"

# Merge back to main
git checkout main
git merge feature/filter-command
```

## License

MIT
