CREATE TABLE account (
	account_id INT UNSIGNED AUTO_INCREMENT,
    account_number VARCHAR(14) NOT NULL UNIQUE,
    account_username VARCHAR(50) NOT NULL UNIQUE,
    account_password VARCHAR(50) NOT NULL,
    account_identity VARCHAR(10) NOT NULL,
    PRIMARY KEY (account_id),
    CONSTRAINT account_identity_values
		CHECK (account_identity IN ('employee', 'guide'))
);

ALTER TABLE account
MODIFY account_password VARCHAR(150) NOT NULL;

-- account_identity must only accept employee or guide as values
-- account number is the business key for this entity
-- account number must be in format ACCT1234567890 where values after ACCT can be an alphabet or numerical
-- account username must be unique 
