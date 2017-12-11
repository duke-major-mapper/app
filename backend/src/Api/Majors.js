const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/majors', function (req, res) {
      connection.query(
          `SELECT * FROM Major;`, function (error, result) {
            if (error) {
              template.status = 500;
              template.success = false;
              template.message = error;
              res.status(500).send(template);
            } else {
              data = [''];
              for (var i = 0; i < result.length; i++) {
                data[result[i].id] = result[i].name
              }
              template.status = 200;
              template.data = data;
              template.message = 'Major names recieved';
              res.status(200).send(template);
            }
          }
      );
  });
