const mysql = require("mysql2");

const db = mysql.createPool({
  host: "mysql-project-project-math.l.aivencloud.com",
  user: "avnadmin",
  port: "22302",
  password: "AVNS_GS3FU3g4PMXjjcF4rMg",
  database: "planner",
});

module.exports = db;