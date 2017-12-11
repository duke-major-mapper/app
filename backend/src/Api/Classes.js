const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/classes', function (req, res) {
      connection.query(
          `SELECT class_code, name FROM Class`, function (error, result) {
                if (error) {
                  var result = template;
                  result.status = 500;
                  result.success = false;
                  result.message = (error.sqlMessage ? error.sqlMessage : error);
                  res.status(500).send(result);
                } else {
                  result.status = 200;
                  result.data = result;
                  result.message = 'Classes recieved';
                  res.status(200).send(result);
                }
              }
      );
  });

  app.get('/major_classes', function (req, res) {
      const major_id = req.query.major_id;
      if (!major_id) {
          res.status(400).send("You did not supply the major id");
          console.log('FAILED: GET ' + req.originalUrl);
          return;
      }

      connection.query(
          `SELECT * FROM Class JOIN
          ( SELECT * FROM Fulfills WHERE major_id = ${major_id}) AS Fulfills
          WHERE Class.id = Fulfills.class_id;`, function (error, result) {
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
