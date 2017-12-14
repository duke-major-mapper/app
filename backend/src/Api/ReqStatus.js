const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.put('/req_status', function (req, res) {
    const classes = req.body.classes;
    const major_id = req.body.major;

    if (!classes) {
        res.status(400).send("Please add a classes parameter");
        console.log('FAILED: PUT ' + req.originalUrl);
        return;
    }
    if (!major_id) {
        res.status(400).send("Please add a major parameter");
        console.log('FAILED: PUT ' + req.originalUrl);
        return;
    }

    var reqs;
    var success = true;

    connection.query(
      `SELECT * FROM Requirements WHERE major_id=${major_id}`, function (error, result) {
            if (error) {
                template.status = 500;
                template.success = false;
                template.message = (error.sqlMessage ? error.sqlMessage : 'error');
                res.status(500).send(template);
                console.log('FAILED: PUT ' + req.originalUrl);
                return;
            } else if (result.length < 1) {
                template.status = 400;
                template.success = false;
                template.message = 'requirements not found';
                console.log('FAILED: PUT ' + req.originalUrl);
                res.status(400).send(template);
                return;
            }
            else {
              reqs = result;
              reqs.forEach(function(item){
                item.fulfilled=0;
              });
              var processed = 0;
              classes.forEach(function(item) {
                connection.query(
                  `SELECT * FROM Fulfills WHERE major_id = ${major_id} and class_id = ${item} LIMIT 1`, function (error, result) {
                    if (success && error) {
                      success = false;
                      template.status = 500;
                      template.success = false;
                      template.message = (error.sqlMessage ? error.sqlMessage : error);
                      res.status(500).send(template);
                      return;
                    } else {
                      processed++;
                      if (result.length==1){
                        var reqNum = result[0].req_id;
                        if (reqs.length < reqNum) {
                          console.log('TEST HERE');
                          return;
                        }
                        reqs[reqNum-1].fulfilled += 1;
                      }
                      if (success && processed == classes.length){
                        template.status = 200;
                        template.data = reqs;
                        template.message = 'requirements checked';
                        res.status(200).send(template);
                        sent = true;
                        console.log('PUT ' + req.originalUrl);
                      }
                    }
                  }
                )
              });
            }
          }
      )
});

app.get('/req_status', function (req, res) {
    var classes = req.query.classes;
    const major_id = req.query.major;

    if (!classes) {
        res.status(400).send("Please add a classes parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    if (!major_id) {
        res.status(400).send("Please add a major parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    classes = classes.split(',').map(Number);

    var reqs;
    var success = true;

    connection.query(
      `SELECT * FROM Requirements WHERE major_id=${major_id}`, function (error, result) {
            if (error) {
                template.status = 500;
                template.success = false;
                template.message = (error.sqlMessage ? error.sqlMessage : 'error');
                res.status(500).send(template);
                console.log('FAILED: PUT ' + req.originalUrl);
                return;
            } else if (result.length < 1) {
                template.status = 400;
                template.success = false;
                template.message = 'requirements not found';
                console.log('FAILED: PUT ' + req.originalUrl);
                res.status(400).send(template);
                return;
            }
            else {
              reqs = result;
              reqs.forEach(function(item){
                item.fulfilled=0;
              });
              var processed = 0;
              classes.forEach(function(item) {
                connection.query(
                  `SELECT * FROM Fulfills WHERE major_id = ${major_id} and class_id = ${item} LIMIT 1`, function (error, result) {
                    if (success && error) {
                      success = false;
                      template.status = 500;
                      template.success = false;
                      template.message = (error.sqlMessage ? error.sqlMessage : error);
                      res.status(500).send(template);
                      return;
                    } else {
                      processed++;
                      if (result.length==1){
                        var reqNum = result[0].req_id;
                        reqs[reqNum-1].fulfilled += 1;
                      }
                      if (success && processed == classes.length){
                        template.status = 200;
                        template.data = reqs;
                        template.message = 'requirements checked';
                        res.status(200).send(template);
                        sent = true;
                        console.log('PUT ' + req.originalUrl);
                      }
                    }
                  }
                )
              });
            }
          }
      )
});
