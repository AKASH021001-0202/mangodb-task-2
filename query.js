// Design database for Zen class programme
// users
// codekata
// attendance
// topics
// tasks
// company_drives
// mentors

// 1.Find all the topics and tasks which are thought in the month of October
db.zenclass.aggregate([
  {
    $match: {
      "topic.date": {
        $gte: "2020-10-01",
        $lt: "2020-11-01",
      },
      "task.date": {
        $gte: "2020-10-01",
        $lt: "2020-11-01",
      },
    },
  },
  {
    $project: {
      _id: 0,
      topic: 1,
      task: 1,
    },
  },
]);

// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.zenclass.aggregate([
  {
    $match: {
      "company_drives.date": {
        $gte: "2020-10-15",
        $lt: "2020-10-31",
      },
    },
  },
  {
    $project: {
      _id: 0,
      company_drives: 1,
    },
  },
]);
// 3.Find all the company drives and students who are appeared for the placement.
db.zenclass.find(
  { company_drives: { $elemMatch: { placement: "appear" } } },
  { "company_drives.$": 1 }
);

// 4.Find the number of problems solved by the user in codekata
db.zenclass.find({users:"student"},{_id:0,codekata:1,name:1})


// 5.Find all the mentors with who has the mentee's count more than 15
db.zenclass.find({ users:"mentor",mentee_count:{$gt :15}},{_id:0,name:1,mentee_count:1})

// 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.zenclass.find({
    $and: [
        {
            "attendance": {
                $elemMatch: {
                    "date": {$gte: "2020-10-15", $lte: "2020-10-31"},
                    "status": "A"
                }
            }
        },
        {
            "task": {
                $elemMatch: {
                    "date": {$gte: "2020-10-15", $lte: "2020-10-31"},
                    "task": false
                }
            }
        }
    ]
}).count()