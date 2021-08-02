# CMS Employee Tracker

## Description

Allows the user to manage their Employees by showing all existing employees in the database, all positions, and all departments. The user can also create new Employees, new roles and update the roles of existing employees.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Questions](#questions)

## Installation
You will need to have a running SQL server on your computer

Download the files and from the root of the folder create a .env file containing the following:

     DB_NAME='cms_db'
     DB_USER='Your_SQL_Username'
     DB_PW='Your_SQL_Password'

Start your SQL server then navigate to the db folder from the cmd line, you will need to set the source of the database as well as inject the seed items

    source db/schema.sql
    use cms_db
    source db/seeds.sql
    

## Usage
From the root of the file you will have to run the following to install the necessary packages and start the program

    npm start

Once installed a console application will launch and you are able to view all departments, roles, and employees. You can also add a department, role, and employee. You can also update an existing employee's role


Video Showcase: https://drive.google.com/file/d/1KtvKxf59_fC_5et3O1j_mZAGystwrdXg/view?usp=sharing


## Questions

If you have any questions feel free to reach me at:

GitHub: weingeoffrey

Email: wein.geoffrey@gmail.com
