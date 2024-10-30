CREATE TABLE student (
	student_id INT UNSIGNED AUTO_INCREMENT,
    student_number VARCHAR(13) NOT NULL UNIQUE,
    student_first_name VARCHAR(50) NOT NULL,
    student_last_name VARCHAR(50) NOT NULL,
    student_initial CHAR(1),
    student_dob DATE NOT NULL,
    student_gender VARCHAR(6) NOT NULL,
    student_address VARCHAR(50) NOT NULL,
    student_city VARCHAR(50) NOT NULL,
    student_state CHAR(2) DEFAULT('FL'),
    student_zip CHAR(5) NOT NULL,
    student_enroll_date DATE,
    student_end_date DATE,
    student_status VARCHAR(50) DEFAULT('pending enrollment'),
    PRIMARY KEY (student_id),
    CONSTRAINT student_gender_check
		CHECK (student_gender IN ('male', 'female')),
	CONSTRAINT student_state_check
		CHECK (student_state IN ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
                               'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
                               'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
                               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
                               'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')),
	CONSTRAINT student_status_check
		CHECK (student_status IN ('active', 'inactive', 'suspended', 'graduated', 'pending enrollment', 'on hold'))
);

-- student number is the business key for this table
-- student number must have a format of STU1234567890 where values after EMP can be any alphabetical or numerical.
-- student gender is either male or female
-- student status are values: active, inactive, suspended, graduated, pending enrollment, on hold
-- active: student is enrolle and taking classes
-- inactive: student may be taking a break 
-- suspended: student is suspended
-- graduated: student successfully finished all required courses in kindergarten
-- pending enrollment: default; student who is newly created
-- on hold: student enrolled but the required medical and vaccine records are missing.