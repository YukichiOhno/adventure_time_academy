CREATE TABLE student_guide (
	student_id INT UNSIGNED NOT NULL,
    guide_id INT UNSIGNED NOT NULL,
    relationship VARCHAR(20) NOT NULL,
    confirmed BOOL DEFAULT(0),
    PRIMARY KEY (student_id, guide_id),
    CONSTRAINT relationship_check
		CHECK (relationship IN ('parent', 'guardian', 'relative')),
	FOREIGN KEY (student_id)
		REFERENCES student (student_id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
	FOREIGN KEY (student_id)
		REFERENCES student (student_id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
	FOREIGN KEY (guide_id)
		REFERENCES guide (guide_id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- this is an associative table between student and guide entities
-- relationship accept values such as: parent, guardian, and relative
-- once confirmed is true, the guide's contact information is inserted into student contact information entity

-- create a trigger that inserts guide's email and phone number to student contact information
DELIMITER $$
CREATE TRIGGER after_relationship_confirmed
AFTER UPDATE ON student_guide
FOR EACH ROW
BEGIN
    DECLARE count INT DEFAULT 0;
    DECLARE email VARCHAR(50);
    DECLARE phone CHAR(10);

    -- Check if the confirmed column is set to TRUE (1)
    IF NEW.confirmed = 1 THEN
        -- Get the current count of contact info from student_contact_info
        SELECT COUNT(contact_info_sequence)
        INTO count
        FROM student_contact_info
        WHERE student_id = NEW.student_id;

        -- Store the guide's phone number and email
        SELECT guide_phone_number, guide_email
        INTO phone, email
        FROM guide
        WHERE guide_id = NEW.guide_id;

        -- Increment the count for the email entry
        SET count = count + 1;
        -- Insert the guide's email into student_contact_info
        INSERT INTO student_contact_info
        VALUES (NEW.student_id, count, 'email', email);

        -- Increment the count for the phone entry
        SET count = count + 1;
        -- Insert the guide's phone number into student_contact_info
        INSERT INTO student_contact_info
        VALUES (NEW.student_id, count, 'phone', phone);
    END IF;
END$$
DELIMITER ;
