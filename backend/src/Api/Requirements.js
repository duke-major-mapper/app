const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/major_requirements', function (req, res) {
    const major_id = req.query.major_id;
    if (!major_id) {
        res.status(400).send("You did not supply the major id");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    connection.query(
      `SELECT * FROM Requirements WHERE major_id =${major_id};`, function (error, result) {
        if (error) {
            var result = template;
            result.status = 500;
            result.success = false;
            result.message = (error.sqlMessage ? error.sqlMessage : error);
            res.status(500).send(result);
        } else {
            result.status = 200;
            result.data = result;
            result.message = 'Requirements recieved';
            res.status(200).send(result);
        }
      }
    );
  });
