export const taskSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["title"],
    properties: {
      title: {
        bsonType: "string",
      },
      status: {
        enum: ["todo", "done"],
      },
      start_date: {
        bsonType: "date",
      },
      due_date: {
        bsonType: "date",
      },
      done_date: {
        bsonType: ["date", "null"],
      },
      project_id: {
        bsonType: "object",
      },
    },
  },
};
