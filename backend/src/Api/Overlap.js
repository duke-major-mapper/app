const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/overlap', function (req, res) {
    let ids = req.query['ids'];
    if (!ids) {
        res.status(400).send("Please add a ids parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    ids = ids.split(',').map(Number);
    if (ids.length !== 2) {
        res.status(400).send("There needs to be ONLY 2 parameters for ids!");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    connection.query(
        `SELECT * FROM ClassJOIN (
        SELECT f1.class_id, f1.major_id AS major1, f1.req_id AS req_id1, f2.major_id AS major2, f2.req_id AS req_id2
	        FROM Fulfills f1 JOIN Fulfills f2 WHERE (f1.major_id = ${ids[0]} AND f2.major_id = ${ids[1]} AND f1.class_id = f2.class_id)) Fulfills
          WHERE Class.id = Fulfills.class_id;`, function (error, result) {
            if (error) {
                var result = template;
                result.status = 500;
                result.success = false;
                result.message = (error.sqlMessage ? error.sqlMessage : error);
                res.status(500).send(result);
            } else {
                result.status = 200;
                result.data = result;
                result.message = 'Classes recieved';
                res.status(200).send(result);
            }
          }
    );
    
    console.log('GET ' + req.originalUrl);
});