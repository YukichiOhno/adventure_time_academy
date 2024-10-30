const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { executeWriteQuery, executeReadQuery, executeTransaction } = require('../connection/pool');
const generateCustomNumber = require('../misc/generate-number');
const logger = require('../misc/logger');

router.post('/sign-up/guide', async (req, res) => {
    // initialize variables
    const transactionQuery = [];
    let transactionResult;
    let accountNumber;
    let guideNumber;
    let hashedPassword;
    const accountInformation = req.body.account;
    const guideInformation = req.body.guide;
    const guideInitial = guideInformation.initial ? guideInformation.initial.toLowerCase() : null;

    // validate account information
    if (!accountInformation.username || !accountInformation.password) {
        logger.debug('missing username and password');
        return res.status(400).json({ message: 'missing username and password' })
    }

    // validate guide information
    if (
        !guideInformation.first_name ||
        !guideInformation.last_name ||
        !guideInformation.phone_number ||
        !guideInformation.email ||
        !guideInformation.address ||
        !guideInformation.city ||
        !guideInformation.state ||
        !guideInformation.zip
    ) {
        logger.debug('required guide information are missing');
        return res.status(400).json({ message: 'required guide information are missing'});
    }

    // hash the guide's password at saltround 10
    hashedPassword = await bcrypt.hash(accountInformation.password, 10);
    logger.debug("successfully hashed the guide's password");
    delete accountInformation.password;

    // generate an account number
    accountNumber = generateCustomNumber('ACCT');
    logger.debug(`sucessfully generated an account number for the guide: ${accountNumber}`);

    // generate a guide number
    guideNumber = generateCustomNumber('GUI');
    logger.debug(`sucessfully generated a guide number for the guide: ${guideNumber}`);

    // perform a sql transaction to account and guide tables
    try {
        // insert statement to account table
        transactionQuery.push({
            query: "INSERT INTO account (account_number, account_username, account_password, account_identity) VALUES (?, ?, ?, ?)",
            params: [accountNumber.toUpperCase(), accountInformation.username.toLowerCase(), hashedPassword, 'guide']
        });

        // insert statement to guide table
        transactionQuery.push({
            query: "INSERT INTO guide (guide_number, guide_first_name, guide_last_name, guide_initial, guide_phone_number, guide_email, guide_address, guide_city, guide_state, guide_zip, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, LAST_INSERT_ID())",
            params: [
                guideNumber.toUpperCase(), 
                guideInformation.first_name.toLowerCase(), 
                guideInformation.last_name.toLowerCase(), 
                guideInitial, 
                guideInformation.phone_number, 
                guideInformation.email.toLowerCase(), 
                guideInformation.address.toLowerCase(), 
                guideInformation.city.toLowerCase(), 
                guideInformation.state.toUpperCase(),
                guideInformation.zip
            ]
        });

        // execute transaction
        transactionResult = await executeTransaction(transactionQuery);
        logger.debug('sign-up success');
        logger.debug('transaction result');
        logger.debug(transactionResult);
        return res.status(201).json({ message: "guide account successfully created", username: accountInformation.username.toLowerCase()});

    } catch (err) {
        logger.error('an error occured during guide sign-up transaction');
        logger.error(err);
        return res.status(500).json({ 
            message: 'an error occured during guide sign-up transaction',
            error: err
        });
    }
});


router.post('/sign-up/employee', async (req, res) => {
    // initialize variables
    const accountInformation = req.body.account;
    const employeeInformation = req.body.employee;
    const employeeInitial = employeeInformation.initial ? employeeInformation.initial.toLowerCase() : null;
    const transactionQuery = [];
    let transactionResult;
    let accountNumber;
    let employeeNumber;
    let hashedPassword;

    // validate account information
    if (!accountInformation.username || !accountInformation.password) {
        logger.debug('missing username and password');
        return res.status(400).json({ message: 'missing username and password' })
    }

    // validate account information
    if (
        !employeeInformation.first_name ||
        !employeeInformation.last_name ||
        !employeeInformation.dob ||
        !employeeInformation.phone_number ||
        !employeeInformation.email ||
        !employeeInformation.address ||
        !employeeInformation.city ||
        !employeeInformation.state ||
        !employeeInformation.zip ||
        !employeeInformation.status ||
        !employeeInformation.start_date ||
        !employeeInformation.role 
    ) {
        logger.debug('required employee information are missing');
        return res.status(400).json({ message: 'required employee information are missing'});
    }

    // hash the employee's password at saltround 10
    hashedPassword = await bcrypt.hash(accountInformation.password, 10);
    logger.debug("successfully hashed the employee's password");
    delete accountInformation.password;

    // generate an account number
    accountNumber = generateCustomNumber('ACCT').toUpperCase();
    logger.debug(`sucessfully generated an account number for the employee: ${accountNumber}`);

    // generate an employee number
    employeeNumber = generateCustomNumber('EMP').toUpperCase();
    logger.debug(`sucessfully generated a guide number for the employee: ${employeeNumber}`);

    try {
        // insert statement to account table
        transactionQuery.push({
            query: "INSERT INTO account (account_number, account_username, account_password, account_identity) VALUES (?, ?, ?, ?)",
            params: [accountNumber, accountInformation.username.toLowerCase(), hashedPassword, 'employee']
        });

        // insert statement to employee table
        transactionQuery.push({
            query: "INSERT INTO employee (employee_number, employee_first_name, employee_last_name, employee_initial, employee_dob, employee_phone_number, employee_email, employee_address, employee_city, employee_state, employee_zip, employee_status, employee_start_date, employee_role, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, LAST_INSERT_ID())",
            params: [
                employeeNumber,
                employeeInformation.first_name.toLowerCase(),
                employeeInformation.last_name.toLowerCase(),
                employeeInitial,
                employeeInformation.dob,
                employeeInformation.phone_number,
                employeeInformation.email.toLowerCase(),
                employeeInformation.address.toLowerCase(),
                employeeInformation.city.toLowerCase(),
                employeeInformation.state.toUpperCase(),
                employeeInformation.zip,
                employeeInformation.status.toLowerCase(),
                employeeInformation.start_date,
                employeeInformation.role.toLowerCase()
            ]
        });

        // execute transaction
        transactionResult = await executeTransaction(transactionQuery);
        logger.debug('sign-up success');
        logger.debug('transaction result');
        logger.debug(transactionResult);
        return res.status(201).json({ message: "employee account successfully created", username: accountInformation.username.toLowerCase()});

    } catch (err) {
        logger.error('an error occured during employee sign-up transaction');
        logger.error(err);
        return res.status(500).json({ 
            message: 'an error occured during employee sign-up transaction',
            error: err
        });
    }
});


router.get('/', async (req, res) => {
    let selectQuery;
    let resultQuery;
    let accountTable;

    try {
        // retrieve all account instances
        selectQuery = 'SELECT account_id, account_number, account_username, account_identity FROM account;';
        resultQuery = await executeReadQuery(selectQuery);
        logger.debug("successfully retrieved account table's rows");

        accountTable = resultQuery;
        return res.status(200).json({ 
            message: "successfully retrieved account table's rows",
            account: accountTable
        });

    } catch (err) {
        logger.error('something went wrong during the retrieval of account table rows');
        logger.error(err);
        return res.status(500).json({ 
            message: 'something went wrong during the retrieval of account table rows',
            error: err
        });
    }
    
});

module.exports = router;