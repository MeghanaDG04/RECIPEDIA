// MongoDB Playground

// Step 1: Select database
use('aggree');

// Step 2: Insert your array of authors
db.getCollection('authors').insertMany([
  {
    "_id": 100,
    "name": "F. Scott Fitzgerald",
    "birth_year": 1896
  },
  {
    "_id": 101,
    "name": "George Orwell",
    "birth_year": 1903
  },
  {
    "_id": 102,
    "name": "Harper Lee",
    "birth_year": 1926
  }
]);

// Step 3: Check if data is inserted
db.getCollection('authors').find({});
