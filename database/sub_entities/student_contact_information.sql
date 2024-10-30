CREATE TABLE student_contact_info (
	student_id INT UNSIGNED NOT NULL,
    contact_info_sequence INT UNSIGNED NOT NULL,
    email_or_phone CHAR(5) NOT NULL,
    contact_information VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (student_id, contact_info_sequence),
    CONSTRAINT email_or_phone_check
		CHECK (email_or_phone IN ('email', 'phone')),
	FOREIGN KEY (student_id)
		REFERENCES student (student_id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- this table is a subentity of student entity
-- email or phone allows only 2 values: email and phone

/* it is required that the guide's information be automatically inserted here once their relationship 
with the student is confirmed */