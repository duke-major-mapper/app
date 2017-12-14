const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/classes', function (req, res) {
      connection.query(
          `SELECT * FROM Class`, function (error, result) {
                if (error) {
                  template.status = 500;
                  template.success = false;
                  template.message = (error.sqlMessage ? error.sqlMessage : error);
                  res.status(500).send(template);
                } else {
                  template.status = 200;
                  template.data = result;
                  template.message = 'Classes recieved';
                  res.status(200).send(template);
                }
              }
      );
  });

  app.put('/major_classes', function (req, res) {
      const major_id = req.query.major_id;
      const classes = req.body.classes;
      let additonalQuery = '';

      if (!major_id) {
          res.status(400).send("You did not supply the major id");
          console.log('FAILED: GET ' + req.originalUrl);
          return;
      }

      if (classes.length > 1) {
        additonalQuery = `AND id NOT IN ( ${classes.toString()} )`
      }
      connection.query(
          `SELECT * FROM Class JOIN (SELECT Fulfills.class_id, Requirements.major_id, Requirements.req_id, Requirements.num_needed, Requirements.description  FROM Fulfills, Requirements   WHERE Fulfills.major_id = Requirements.major_id and Requirements.req_id = Fulfills.req_id) AS Reqs WHERE id = class_id and Reqs.major_id = ${major_id} ${additonalQuery} ORDER BY Reqs.req_id;`, function (error, result) {
                if (error) {
                  template.status = 500;
                  template.success = false;
                  template.message = (error.sqlMessage ? error.sqlMessage : error);
                  res.status(500).send(template);
                } else {
                  template.status = 200;
                  template.data = result;
                  template.message = 'Classes recieved';
                  template.id = major_id;
                  res.status(200).send(template);
                }
              }

      );
  });
