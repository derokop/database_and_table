
// use verbose() to get detailed debug messages
// importing sqlite3 library
const sqlite3 = require('sqlite3').verbose();

// create a new database and a connection to it
const db = new sqlite3.Database('company.db');

// create the employee table
db.serialize(() => {
  // if it doesn't exist create one
  // primary key for having a unique identifier on each record
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        employeeID INTEGER PRIMARY KEY,
        FirstName TEXT,
        LastName TEXT,
        department TEXT,
        salary DECIMAL
    )`);

    // inserting data, each property has they own values
    db.run(`INSERT INTO employees (FirstName, LastName, department, salary) VALUES 
        ('User1', 'NoSmith', 'Sales', 50000),
        ('User2', 'ProbablySmith', 'Marketing', 60000),
        ('User3', 'Smith', 'Sales', 55000)
    `);

    

    // quering data
    // retrieve the first and last name of all employees from table
    // db.all execute all the rows
    db.all(`SELECT FirstName, LastName FROM employees`, (rows) => {
      console.log('First and Last Names of Employees:');
      console.log(rows);
    });

    // retrieve the employeeID and salary of employees who belong the 'sales' department from table
    db.all(`SELECT employeeID, salary FROM employees WHERE department = 'Sales'`, (rows) => {
      console.log('Employee IDs and Salaries of Sales Department Employees:');
      console.log(rows);
    });

    // retrieve the total number of employees in each department from table
    db.all(`SELECT department, COUNT(*) AS numEmployees FROM employees GROUP BY department`, (rows) => {
      console.log('Total Number of Employees in Each Department:');
      console.log(rows);
    });


    // update the salary of employee with employeeID 1 to $60.000 in the table
    db.run(`UPDATE employees SET salary = 60000 WHERE employeeID = 1`);

    // delete an employee with the last name "Smith"
    db.run(`DELETE FROM employees WHERE LastName = 'Smith'`);

    // retrieve all employees sorted by their last names
    db.all(`SELECT * FROM employees ORDER BY LastName ASC`, (rows) => {
      console.log('Employees Sorted by Last Name:');
      console.log(rows);
    });

    // retrieve employees with a salary greater than $50,000
    db.all(`SELECT * FROM employees WHERE salary > 50000`, (rows) => {
      console.log('Employees with Salary Greater Than $50,000:');
      console.log(rows);
    });

    // retrieve the highest salary in the "marketing" department
    db.get(`SELECT MAX(salary) AS highestSalary FROM employees WHERE department = 'Marketing'`, (row) => {
      console.log('Highest Salary in Marketing Department:', row.highestSalary);
    });

});

// close database connection if someting happend
db.close((err) => {
  console.log('Error:', err);
});
