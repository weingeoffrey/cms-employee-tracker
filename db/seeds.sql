INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Customer Service'),
    ('IT'),
    ('Accounting'),
    ('HR');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Representative', 60000, 1),
    ('Account Executive', 80000, 1),
    ('Chief Revenue Officer', 200000, 1),
    ('Software Engineer', 100000, 2),
    ('Senior Software Engineer', 150000, 2),
    ('Customer Support Rep', 45000, 3),
    ('Customer Support Manager', 75000, 3),
    ('System Administrator', 80000, 4),
    ('Help Desk Tier 1', 50000, 4),
    ('Senior System Administrator', 125000, 4),
    ('Accountant', 75000, 5),
    ('Controller', 100000, 5),
    ('Chief Financial Officer', 150000, 5),
    ('Recruiter', 65000, 6),
    ('Human Resource Specialist', 50000, 6),
    ('HR Director', 80000, 6);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Greg', 'Johnson', 3, 1),
    ('Adam', 'Adamson', 1, 1),
    ('Jim', 'Bram', 2, 1),
    ('Drew', 'Coons', 5, 4),
    ('Geoff', 'Wein', 4, 4),
    ('Jason', 'Thomas', 7, 6),
    ('David', 'Minnerly', 6, 6),
    ('Carty', 'Hastey', 8, 9),
    ('Jeremy', 'Hoose', 10, 9),
    ('Sierra', 'Nutt', 9, 9),
    ('Stan', "Smith", 13, 11),
    ('Jane', 'Doe', 11, 11),
    ('Paula', 'Green', 12, 11),
    ('Denise', 'Jane', 16, 14),
    ('Jamila', 'Ruiz', 14, 14),
    ('James', 'Metzger', 15, 14);
