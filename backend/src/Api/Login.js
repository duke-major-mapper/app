const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');


app.put('/login', function (req, res) {
    const id = req.body.netID;
    const pw = req.body.password;

    if (!id) {
        res.status(400).send("Please provide an id parameter");
        return;
    }
    if (!pw) {
        res.status(400).send("Please provide a password parameter");
        return;
    }

    connection.query(
        `SELECT * FROM User WHERE id LIKE '%${id}%'`, function (error, result) {
            if (error) {
              res.status(500).send({
                  success: false,
                  msg: (error.sqlMessage ? error.sqlMessage : error)
              });
            } else if (result.length < 1) {
                res.status(400).send({
                    success: false,
                    msg: 'user id not found'
                });
            } else if (result[0].password !== pw) {
                res.status(400).send({
                    success: false,
                    msg: 'incorrect password'
                });
            } else {
              console.log('result',result);
                res.status(200).send({
                    success: true,
                    netID: id,
                    name: result[0].name,
                    msg: 'login verified'
                });
            }
          }
    );

    console.log('GET ' + req.originalUrl);
});
