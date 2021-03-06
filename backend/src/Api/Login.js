const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');
const sha256 = require('js-sha256');

app.put('/login', function (req, res) {
    const id = req.body.netID;
    const password = req.body.password;
    const hash = sha256(password + id);

    if (!id) {
        res.status(400).send("Please provide an id parameter");
        return;
    }
    if (!password) {
        res.status(400).send("Please provide a password parameter");
        return;
    }
    
    connection.query(
        `SELECT * FROM User WHERE id LIKE '%${id}%'`, function (error, result) {
            if (error) {
              template.success = false;
              template.message = (error.sqlMessage ? error.sqlMessage : error);
              template.status = 500;
              res.status(500).send(template);
              return;
            } else if (result.length < 1) {
                template.success = false;
                template.message = 'User ID not found';
                template.status = 400;
                res.status(400).send(template);
                return;
            } else if (result[0].password_hash !== hash) {
                template.success = false;
                template.message = 'Incorrect Password';
                template.status = 400;
                res.status(400).send(template);
                return;
            } else {
              template.success = true;
              template.netID = id;
              template.name = result[0].name;
              template.message = 'Login Verified'
              template.status = 200;
              res.status(200).send(template);
            }
            return;
          }
    );

    console.log('GET ' + req.originalUrl);
});
