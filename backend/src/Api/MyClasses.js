const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.put('/my_classes', function (req, res) {
    const classes = req.body.classes;
    const net_id = req.body.net_id;

    if (!classes) {
        res.status(400).send("Please provide an classes parameter");
        return;
    }

    if (!net_id) {
        res.status(400).send("Please provide a net id parameter");
        return;
    }

    var success = true;
    var message = '';

    connection.query(`DELETE FROM UserClasses WHERE uid LIKE '${net_id}';`, function (error, result) {
      if (error) {
        success = false;
        message = 'Error with DELETE FROM query';
        return;
      }
    })

    classes.forEach(cl => {
      if (success) {
        connection.query(
            `INSERT INTO UserClasses
            VALUES ('${net_id}', ${cl});`, function (error, result) {
              if (error) {
                    success = false;
                    message = 'ERROR with INSERT INTO query';
              }
            }
        );
      }
    });

    var requestObject = template;

    if (success) {
      requestObject.success = success;
      requestObject.message = 'Succuessful Request';
      requestObject.status = 200;
      res.status(200).send(template);
      console.log('PUT ' + req.originalUrl);
    } else {
      requestObject.success = success;
      requestObject.message = message;
      requestObject.status = 500;
      res.status(500).send(template);
      console.log('FAILED: PUT ' + req.originalUrl);
    }
});

app.get('/my_classes', function (req, res) {
    const net_id = req.query.net_id;

    if (!net_id) {
        res.status(400).send("You did not supply the user id");
        return;
    }

    connection.query(
        `SELECT id, class_code, name
        FROM UserClasses, Class
        WHERE Class.id=UserClasses.class_id
        AND UserClasses.uid='${net_id}';`, function (error, result) {
          var requestObject = template;
          if (error) {
            requestObject.status = 500;
            requestObject.success = false;
            requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
            res.status(500).send(template);
          } else {
            requestObject.status = 200;
            requestObject.data = result;
            requestObject.message = 'Classes recieved';
            requestObject.id = net_id;
            res.status(200).send(template);
          }
        }
    );
});
