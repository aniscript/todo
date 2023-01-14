// Aggregate function that returns all the projects that have a task with a due date set to “today”

db.projects.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "_id",
      foreignField: "project_id",
      as: "tasks",
    },
  },
  {
    $match: {
      "tasks.due_date": {
        $eq: new Date(),
      },
    },
  },
]);

// Aggregate function that returns all the tasks that have a project with a due date set to “today”
db.tasks.aggregate([
  {
    $lookup: {
      from: "projects",
      localField: "project_id",
      foreignField: "_id",
      as: "project",
    },
  },
  {
    $match: {
      "project.due_date": {
        $eq: new Date(),
      },
    },
  },
]);
