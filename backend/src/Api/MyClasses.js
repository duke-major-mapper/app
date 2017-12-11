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

    var success = true

    classes.forEach(cl => {
        connection.query(
            `INSERT INTO UserClasses
            VALUES ('${net_id}', ${cl});`, function (error, result) {
              if (error) {
                    success = false;
              }
            }
        );
    });

    if (success) {
        res.status(200).send({
            'success': true
        });
    } else {
        res.status(500).send({
            'success': false
        });
    }
});

app.get('/my_classes', function (req, res) {
    const net_id = req.query.net_id;

    if (!net_id) {
        res.status(400).send("You did not supply the user id");
        return;
    }

    connection.query(
        `SELECT uid, id, class_code, name
        FROM UserClasses, Class
        WHERE Class.id=UserClasses.class_id
        AND UserClasses.uid='${net_id}';`, function (error, result) {
          if (error) {
            template.status = 500;
            template.success = false;
            template.message = (error.sqlMessage ? error.sqlMessage : error);
            res.status(500).send(template);
          } else {
            template.status = 200;
            template.data = result;
            template.message = 'Classes recieved';
            template.id = net_id;
            res.status(200).send(template);
          }
        }
    );
});
