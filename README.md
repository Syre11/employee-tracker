# Employee Tracker

## Description

This application was built to track a companies employees. It tracks departments, roles (job title, salary), and employees. Connecting them using the mysql node add on. You can add, update, delete and view each category. It was built using javascript with the express framework, node, mysql, and console.table. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To run it locally, you will need to run the following to install the needed package dependencies:

    npm i

To begin the application you will need to run the following to set up the database:

    mysql -u [user] -p

Enter your password and then run:

    source db/schema.sql;
    source db/seeds.sql;

From here you will be prompted by the main menu to use the app as intended.

## Usage

Click on image to open link.

[![Walkthrough Image Link](/assets/Screenshot%202022-12-20%20120606.png)](https://drive.google.com/file/d/1Xp7UMTUv6mRtt9RJLkyf5aokNxbe8afU/view)

## Credits

- NodeJS: https://nodejs.org/en/
- Express.js: https://www.npmjs.com/package/express
- MySQL: https://www.mysql.com/
- console.table: https://www.npmjs.com/package/console.table

## License

See license [here](./LICENSE)

    MIT License

    Copyright (c) 2022 Syre11
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
