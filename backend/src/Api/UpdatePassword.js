const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/updatePassword', function (req, res) {
    let id = req.query['id'];
    let pw = req.query['pw'];

    if (!id) {
        res.status(400).send("Please provide an id parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    if (!pw) {
        res.status(400).send("Please provide a password parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    connection.query(
        `UPDATE User SET password=${pw} WHERE id=${id}`, function (error, result) {
            if (error) {
                var result = template;
                result.status = 500;
                result.success = false;
                result.message = (error.sqlMessage ? error.sqlMessage : error);
                res.status(500).send(result);
            } else {
                result.status = 200;
                result.data = result;
                result.message = 'password changed';
                res.status(200).send(result);
            }
          }
    );
});