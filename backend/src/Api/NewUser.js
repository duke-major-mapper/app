const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.put('/new_user', function (req, res) {
    const net_id = req.body.net_id;
    const password = req.body.password;
    const name = req.body.name;
    const classes = req.body.classes;

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

    var success = true;
    connection.query(
        `INSERT INTO User
        VALUES('${net_id}', '${password}', '${name}');`, function (error, result) {
            if (error) {
              var result = template;
              result.status = 500;
              result.success = false;
              result.message = (error.sqlMessage ? error.sqlMessage : error);
              res.status(500).send(result);
              return;
            } else {
                classes.forEach(cl => {
                    console.log(cl);
                    connection.query(
                        `INSERT INTO UserClasses
                        VALUES ('${net_id}', ${cl});`, function (error, result) {
                          if (error) {
                                success = false;
                                console.log(result);
                          }
                        }
                    );
                });
            }
          }
    );

    if (success) {
        res.status(200).send({
            message: 'Account created',
            netID: net_id,
            name: name,
            classes: classes,
            success: true,
        });
    } else {
        res.status(500).send({
            message: 'Something went wrong',
            success: false,
        });
    }
});
