const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

db.promise().query("SELECT 1")
 .then(([rows,fields]) => {
     console.log(rows);
 })
 .catch(console.log)
 .then(() => db.end());