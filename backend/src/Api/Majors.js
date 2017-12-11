const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/majors', function (req, res) {
      connection.query(
          `SELECT * FROM Major;`, function (error, result) {
            if (error) {
              var result = template;
              result.status = 500;
              result.success = false;
              result.message = error;
              res.status(500).send(result);
            } else {
              data = [''];
              for (var i = 0; i < result.length; i++) {
                data[result[i].id] = result[i].name
              }
              result.status = 200;
              result.data = data;
              result.message = 'Major names recieved';
              res.status(200).send(result);
            }
          }
      );
  });