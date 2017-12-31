const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');
const sha256 = require('js-sha256');

app.put('/new_user', function (req, res) {
    const net_id = req.body.netID;
    const password = req.body.password;
    const name = req.body.name;
    const classes = req.body.classes;
    const hash = sha256(password + net_id);

    if (!net_id) {
        res.status(400).send("Please provide an net id parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    if (!password) {
        res.status(400).send("Please provide a password parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    if (!name) {
        res.status(400).send("Please provide a name parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    // TODO: Fix objects below
    var success = true;
    connection.query(
        `INSERT INTO User
        VALUES('${net_id}', '${name}', '${hash}');`, function (error, result) {
            if (error) {
              success = false;
              template.status = 500;
              template.success = success;
              template.message = (error.sqlMessage ? error.sqlMessage : error);
              console.log(template);
              res.status(500).send(template);
              return;
            } else {
              classes.forEach(cl => {
                  connection.query(
                      `INSERT INTO UserClasses
                      VALUES ('${net_id}', ${cl});`, function (error, result) {
                        if (error) {
                              success = false;
                              template.status = 500;
                              template.success = success;
                              template.message = 'Error when inserting Classes. Check Classs array';
                              console.log(template);
                              res.status(500).send(template);
                        }
                      }
                  );
              });
              template.status = 200;
              template.success = true;
              template.netID = net_id;
              template.classes = classes;
              template.name = name;
              template.message = 'Account created';
              res.status(200).send(template);
              return;
            }
          }
    );
});
