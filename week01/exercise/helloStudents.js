// Read the JSON file
const students = require('./students.json');

// 1. Print hello with full names
students.forEach(student => {
    console.log(`Hello ${student.firstName} ${student.lastName}`);
});

// 2. Count last names starting with 'D'
const dLastNames = students.filter(student => student.lastName.startsWith('D')).length;
console.log(`\nCount of last names starting with D is ${dLastNames}\n`);

// 3. Create array of emails
const emails = students.map(student => 
    `${student.firstName.toLowerCase()}@algonquincollege.com`
);

// 4. Print the email array
console.log(emails);