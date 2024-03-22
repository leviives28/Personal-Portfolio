const mysql = require('mysql2'); // Require in the mysql library to communicate with mysql databases.

const database = mysql.createPool({  // Save a variable named db, equal to creating a mysql pool, passing in log in details as key value pairs.
    host: '',
    user: '',
    password: '',
    database: '',
    connectionLimit: 20,
    waitForConnections: true,
})

database.getConnection((err, connection) => { // Test connection
    if (err) {
        console.error(err)
    }
    console.log('Database connected');
    connection.release()
})

async function check_code_validity (review_code) {
    return new Promise((resolve, reject) => {
        database.getConnection((err, connection) => {
            if (err) {
                console.error('SQL Pool Connection Error\ncheck_code_validity function\nReason\n' + err);
                resolve(false);
                connection.release();
                return;
            }
            connection.query('SELECT * FROM reviews WHERE review_code = ?', [review_code], (err, results) => {
                if (err) {
                    console.error('SQL Query Error\ncheck_code_validity function\nReason\n' + err);
                    resolve(false);
                    connection.release();
                    return;
                }
                if (results.length === 0) {
                    resolve(false);
                    connection.release();
                    return;
                }
                resolve(true);
            })
            connection.release();
        })
    })
}

async function add_review(review_code, review) {
    return new Promise((resolve, reject) => {
        database.getConnection((err, connection) => {
            if (err) {
                console.error('SQL Pool Connection Error\nadd_review function\nReason\n' + err);
                resolve(false);
                connection.release();
                return;
            }
            connection.query('UPDATE reviews SET review = ? WHERE review_code = ?', [review, review_code], (err, results) => {
                if (err) {
                    console.error('SQL Query Error\nadd_review function\nReason\n' + err);
                    resolve(false);
                    connection.release();
                    return;
                }
                resolve(true);
            })
            connection.release();
        })
    })
}

async function get_reviews() {
    return new Promise((resolve, reject) => {
        database.getConnection((err, connection) => {
            if (err) {
                console.error('SQL Pool Connection Error\nget_reviews function\nReason\n' + err);
                resolve(false);
                connection.release();
                return;
            }
            connection.query('SELECT * FROM reviews WHERE review IS NOT NULL', (err, results) => {
                if (err) {
                    console.error('SQL Query Error\nget_reviews function\nReason\n' + err);
                    resolve(false);
                    connection.release();
                    return;
                }
                resolve(results);
                connection.release();
            })
        })
    })
}
module.exports = {
    check_code_validity,
    add_review,
    get_reviews
}
