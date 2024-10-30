CREATE TABLE guide (
	guide_id INT UNSIGNED AUTO_INCREMENT,
    guide_number VARCHAR(13) NOT NULL UNIQUE,
    guide_first_name VARCHAR(50) NOT NULL,
    guide_last_name VARCHAR(50) NOT NULL,
    guide_initial CHAR(1),
    guide_phone_number CHAR(10) NOT NULL UNIQUE,
    guide_email VARCHAR(50) NOT NULL UNIQUE,
    guide_address VARCHAR(50) NOT NULL,
    guide_city VARCHAR(50) NOT NULL,
    guide_state CHAR(2) DEFAULT('FL'),
    guide_zip CHAR(5) NOT NULL,
    account_id INT UNSIGNED NOT NULL UNIQUE,
    PRIMARY KEY (guide_id),
    CONSTRAINT guide_email_check
		CHECK (guide_email LIKE '%_@_%._%'),
	CONSTRAINT guide_state_check
		CHECK (guide_state IN ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
                               'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
                               'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
                               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
                               'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')),
	FOREIGN KEY (account_id) 
		REFERENCES account (account_id)
        ON UPDATE CASCADE
);

-- guide number is the business key for this entity
-- guide number must be in format GUI1234567890 where values after GUI can be an alphabet or numerical
-- guide's phone number and email must be unique
-- account id must be unique due to one-to-one relationship of guide with account.

/* a guide must have an insert trigger that automatically inserts its email and phone number
to the contact_information table */