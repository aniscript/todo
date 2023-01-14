# To-Do List with Projects

This project is an exercise task which includes creating a todo list, using NodeJs, Express and MongoDB

## Available Scripts

In the project directory, you can run:

### `yarn`
To install the dependencies

### `yarn migrate`

This command is required to initialize the database and create the collections

### `yarn start`

This command runs the application which uses nodemon.

## End Points

## Tasks

### Create a task
POST : api/tasks

### Get all tasks
GET : api/tasks

### Edit a task
PUT : api/tasks/id

### Delete a task
Delete : api/tasks/id

### Edit status of task
/:id/status

### Sort task
/sort?type=

## Projects

### Create a project
POST : api/projects

### Get all project
GET : api/projects

### Edit a project
PUT : api/projects/id

### Delete a project
Delete : api/projects/id

### Assign task to project
api/projects/projectid/task
Send taskId in body

### Sort projects
/sort?type=
