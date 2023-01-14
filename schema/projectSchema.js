export const projectSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "description"],
    properties: {
      name: {
        bsonType: "string",
      },
      description: {
        bsonType: "string",
      },
      start_date: {
        bsonType: "date",
      },
      due_date: {
        bsonType: "date",
      },
      tasks: {
        bsonType: "array",
      },
    },
  },
};
