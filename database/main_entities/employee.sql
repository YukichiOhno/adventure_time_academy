CREATE TABLE employee (
	employee_id INT UNSIGNED AUTO_INCREMENT,
    employee_number VARCHAR(13) NOT NULL UNIQUE,
    employee_first_name VARCHAR(50) NOT NULL,
    employee_last_name VARCHAR(50) NOT NULL,
    employee_initial CHAR(1),
    employee_dob DATE NOT NULL,
    employee_phone_number CHAR(10) NOT NULL UNIQUE,
    employee_email VARCHAR(50) NOT NULL UNIQUE,
    employee_address VARCHAR(50) NOT NULL,
    employee_city VARCHAR(50) NOT NULL,
    employee_state CHAR(2) DEFAULT('FL'),
    employee_zip CHAR(5) NOT NULL,
    employee_status VARCHAR(25) NOT NULL,
    employee_start_date DATE NOT NULL,
    employee_end_date DATE,
    employee_role VARCHAR(25) NOT NULL,
    account_id INT UNSIGNED NOT NULL UNIQUE,
    PRIMARY KEY (employee_id),
    CONSTRAINT employee_email_check
		CHECK (employee_email LIKE '%_@_%._%'),
	CONSTRAINT employee_state_check
		CHECK (employee_state IN ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
                               'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
                               'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
                               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
                               'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')),
	CONSTRAINT employee_status_check
		CHECK (employee_status IN ('active', 'terminated', 'on leave')),
	CONSTRAINT employee_role_check
		CHECK (employee_role IN ('principal', 'administrator', 'teacher', 'nurse', 'custodian',
								'cook', 'receptionist', 'volunteer', 'it support', 'security officer', 
								'director', 'hr manager')),
	FOREIGN KEY (account_id)
		REFERENCES account (account_id) 
        ON UPDATE CASCADE
);

-- add another constraint
ALTER TABLE employee
ADD CONSTRAINT employee_star_end_date_check
CHECK (employee_start_date < employee_end_date);

-- employee number is the business key for this table
-- employee number must have a format of EMP1234567890 where values after EMP can be any alphabetical or numerical.
-- employee email and phone number must be unique
-- employee status only allows values: active, terminated, and on leave
-- employee start date must always take place before the end date


-- employee must have an update trigger on employee_status of value "terminated" once employee_end_date is not null
delimiter $$
CREATE TRIGGER after_update_employee_end_date
AFTER UPDATE ON employee
FOR EACH ROW
BEGIN
	-- Check if the new employee_end_date is not null
    IF NEW.employee_end_date IS NOT NULL AND OLD.employee_end_date IS NULL THEN
        -- Update the employee_status to "terminated"
        UPDATE employee
        SET employee_status = 'terminated'
        WHERE employee_id = NEW.employee_id;
    END IF;
END;
$$
delimiter ;