const mysql = require("mysql")

const connection = mysql.createConnection({
    host : "88.222.214.194",
    user : "spicy_mango",
    password : "pwTtj3j2XK2WEpSD",
    database : "spicy_mango"
})

connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the MySQL database with ID:", connection.threadId);
  });
  
module.exports = connection;
  
