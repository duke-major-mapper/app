const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.put('/my_classes', function (req, res) {
    const classes = req.body.classes;
    const net_id = req.body.id;

    if (!classes) {
        res.status(400).send("Please provide an classes parameter");
        return;
    }

    if (!net_id) {
        res.status(400).send("Please provide a net id parameter");
        return;
    }

    for (cl in classes) {
        connection.query(
            `INSERT INTO UserClasses
            VALUES (${net_id}, ${cl})`, function (error, result) {
              if (error) {
                requestObject.status = 500;
                requestObject.success = false;
                requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
                res.status(500).send(requestObject);
              } else {
                requestObject.status = 200;
                requestObject.data = result;
                requestObject.message = 'Classes recieved';
                requestObject.id = user_id;
              }
            }
        );

        res.status(200).send(requestObject);
    }
});

app.get('/my_classes', function (req, res) {
    const net_id = req.body.id;

    if (!net_id) {
        res.status(400).send("You did not supply the user id");
        return;
    }

    var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM UserClasses
        WHERE uid = ${user_id}) AS Taken`, function (error, result) {
          if (error) {
            requestObject.status = 500;
            requestObject.success = false;
            requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
            res.status(500).send(requestObject);
          } else {
            requestObject.status = 200;
            requestObject.data = result;
            requestObject.message = 'Classes recieved';
            requestObject.id = user_id;
            res.status(200).send(requestObject);
          }
        }
    );
});
