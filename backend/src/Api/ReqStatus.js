const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.get('/reqStatus', function (req, res) {
    let ids = req.query['ids'];
    let classes = req.query['classes'];
    let major_id = req.query['major'];

    if (!ids) {
        res.status(400).send("Please add a ids parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
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

    var count;
    var numNeeded;
    connection.query(
      `SELECT * FROM Requirements WHERE major_id=${major_id}`, function (error, result) {
            if (error) {
                var result = template;
                result.status = 500;
                result.success = false;
                result.message = (error.sqlMessage ? error.sqlMessage : 'error');
                res.status(500).send(result);
                return;
            } else if (result.length < 1) {
                result.status = 400;
                result.success = false;
                result.message = 'requirements not found';
                res.status(400).send(result);
                return;
            }
            else {
              count = result.length;
              numNeeded = new Array(count);
              for (i = 0; i < count; i++){
                numNeeded[i] = result[i].num_needed;
              }
            }
          }
      )

    var reqCount = new Array(count).fill(0);

    var result = requestTemplate;
    classes.forEach(function(item) {
        connection.query(
            `SELECT * FROM Fulfills WHERE major_id = ${major_id} and class_id = ${item} LIMIT 1`, function (error, result) {
                if (error) {
                  result.status = 500;
                  result.success = false;
                  result.message = (error.sqlMessage ? error.sqlMessage : error);
                  res.status(500).send(result);
                } else if (result.size == 1) {
                  reqCount[[result[0].req_id]]++;
                }
              }
        )
    });

    var fulfilled = new Array(count);
    for (i = 0; i < count; ++i){
      if (reqCount[i] >= numNeeded[i]) {
        fulfilled[i] = true;
      }
      else{
        fulfilled[i] = false;
      }
    }

    result.status = 200;
    result.data = fulfilled;
    result.message = 'requirements checked';
    res.status(200).send(result);
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});