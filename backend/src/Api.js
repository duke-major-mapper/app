// @flow

const extend = require('lodash').assign;
const mysql = require('mysql');
const config = require('./../config.json');
const app = require('./shared/Express');

const options = {
  user: config['MYSQL_USER'],
  password: config['MYSQL_PASSWORD']
};

const connection = mysql.createConnection(extend({
  multipleStatements: true
}, options));

const requestTemplate = {
  status: null,
  message: '',
  success: true,
  data: [],
};

if (config['INSTANCE_CONNECTION_NAME'] && config['NODE_ENV'] === 'production') {
  options.socketPath = `/cloudsql/${config['INSTANCE_CONNECTION_NAME']}`;
}

connection.query('USE major_data;');

// GET all majors
app.get('/majors', function (req, res) {
  var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM Major;`, function (error, result) {
          if (error) {
            requestObject.status = 500;
            requestObject.success = false;
            requestObject.message = error;
            res.status(500).send(requestObject);
          } else {
            data = [''];
            for (var i = 0; i < result.length; i++) {
              data[result[i].id] = result[i].name
            }
            requestObject.status = 200;
            requestObject.data = data;
            requestObject.message = 'Major names recieved';
            res.status(200).send(requestObject);
          }
        }
    );
    // may need to json data
    console.log('GET ' + req.originalUrl);
});

// GET all classes
app.get('/classes', function (req, res) {
  console.log('test');
    var requestObject = requestTemplate;
    connection.query(
        `SELECT class_code, name FROM Class`, function (error, result) {
              if (error) {
                requestObject.status = 500;
                requestObject.success = false;
                requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
                res.status(500).send(requestObject);
              } else {
                requestObject.status = 200;
                requestObject.data = result;
                requestObject.message = 'Classes recieved';
                res.status(200).send(requestObject);
              }
            }

    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});

// GET all classes for a single major
app.get('/classes/:id', function (req, res) {
    const major_id = req.params.id;
    if (!major_id) {
        res.status(400).send("You did not supply the major id");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM Class JOIN
        ( SELECT * FROM Fulfills WHERE major_id = ${major_id}) AS Fulfills
        WHERE Class.id = Fulfills.class_id;`, function (error, result) {
              if (error) {
                requestObject.status = 500;
                requestObject.success = false;
                requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
                res.status(500).send(requestObject);
              } else {
                requestObject.status = 200;
                requestObject.data = result;
                requestObject.message = 'Classes recieved';
                requestObject.id = major_id;
                res.status(200).send(requestObject);
              }
            }

    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});

// GET all requirements for a single major
app.get('/requirements/:id', function (req, res) {
  const major_id = req.params.id;
  if (!major_id) {
      res.status(400).send("You did not supply the major id");
      console.log('FAILED: GET ' + req.originalUrl);
      return;
  }
  var requestObject = requestTemplate;
  connection.query(
    `SELECT * FROM Requirements WHERE major_id =` + major_id + `;`, function (error, result) {
      if (error) {
        requestObject.status = 500;
        requestObject.success = false;
        requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
        res.status(500).send(requestObject);
      } else {
        requestObject.status = 200;
        requestObject.data = result;
        requestObject.message = 'Requirements recieved';
        res.status(200).send(requestObject);
      }
    }
  );
  // may need to json.parse(data)
  console.log('GET ' + req.originalUrl);
});

// GET all overlapping classes between two majors
app.get('/overlap', function (req, res) {
    let ids = req.query['ids'];
    if (!ids) {
        res.status(400).send("Please add a ids parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    ids = ids.split(',').map(Number);
    if (ids.length !== 2) {
        res.status(400).send("There needs to be ONLY 2 parameters for ids!");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM Class JOIN (
          SELECT f1.class_id, f1.major_id AS major1, f1.req_id AS req_id1, f2.major_id AS major2, f2.req_id AS req_id2
	        FROM Fulfills f1 JOIN Fulfills f2 WHERE (f1.major_id = ${ids[0]} AND f2.major_id = ${ids[1]} AND f1.class_id = f2.class_id)) Fulfills
          WHERE Class.id = Fulfills.class_id;`, function (error, result) {
            if (error) {
              requestObject.status = 500;
              requestObject.success = false;
              requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
              res.status(500).send(requestObject);
            } else {
              requestObject.status = 200;
              requestObject.data = result;
              requestObject.message = 'Classes recieved';
              res.status(200).send(requestObject);
            }
          }
    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});


// API Requests for Users

// GET Classes a user has taken
app.get('/takenClasses/:id', function (req, res) {
    const user_id = req.params.id;
    if (!user_id) {
        res.status(400).send("You did not supply the user id");
        console.log('FAILED: GET ' + req.originalUrl);
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
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});

// GET request that will act as login Auth
app.get('/login', function (req, res) {
    let id = req.query['id'];
    let pw = req.query['pw'];

    if (!id) {
        res.status(400).send("Please provide an id parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    if (!pw) {
        res.status(400).send("Please provide a password parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    var requestObject = requestTemplate;
    connection.query(
        `SELECT * FROM User WHERE id LIKE '%${id}%'`, function (error, result) {
            if (error) {
              requestObject.status = 500;
              requestObject.success = false;
              requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
              res.status(500).send(requestObject);
            } else if (result.length < 1) {
              requestObject.status = 400;
              requestObject.success = false;
              requestObject.message = ('user id not found');
              res.status(400).send(requestObject);
            } else if (result[0].password !== pw) {
              requestObject.status = 400;
              requestObject.success = false;
              requestObject.message = ('incorrect password');
              res.status(400).send(requestObject);
            } else {
              requestObject.status = 200;
              requestObject.data = result;
              requestObject.message = 'login verified';
              res.status(200).send(requestObject);
            }
          }
    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});

//GET newUser
app.get('/newUser', function (req, res) {
    let id = req.query['id'];
    let pw = req.query['pw'];
    let name = req.query['name'];

    if (!id) {
        res.status(400).send("Please provide an id parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    if (!pw) {
        res.status(400).send("Please provide a password parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    var requestObject = requestTemplate;
    connection.query(
        `INSERT INTO User VALUES('${id}', '${pw}', '${name}')`, function (error, result) {
            if (error) {
              requestObject.status = 500;
              requestObject.success = false;
              requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
              res.status(500).send(requestObject);
            } else {
              requestObject.status = 200;
              requestObject.data = result;
              requestObject.success = true;
              requestObject.message = 'Account created';
              res.status(200).send(requestObject);
            }
          }
    );
    console.log('GET ' + req.originalUrl);
});

app.get('/updatePassword', function (req, res) {
    let id = req.query['id'];
    let pw = req.query['pw'];

    if (!id) {
        res.status(400).send("Please provide an id parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    if (!pw) {
        res.status(400).send("Please provide a password parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    var requestObject = requestTemplate;
    connection.query(
        `UPDATE User SET password=${pw} WHERE id=${id}`, function (error, result) {
            if (error) {
              requestObject.status = 500;
              requestObject.success = false;
              requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
              res.status(500).send(requestObject);
            } else {
              requestObject.status = 200;
              requestObject.data = result;
              requestObject.message = 'password changed';
              res.status(200).send(requestObject);
            }
          }
    );
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});

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
    //assuming that classes are coming in as class_id values

    var count;
    var numNeeded;
    connection.query(
      `SELECT * FROM Requirements WHERE major_id=${major_id}`, function (error, result) {
            if (error) {
              requestObject.status = 500;
              requestObject.success = false;
              requestObject.message = (error.sqlMessage ? error.sqlMessage : 'error');
              res.status(500).send(requestObject);
              return;
            } else if (result.length < 1) {
              requestObject.status = 400;
              requestObject.success = false;
              requestObject.message = 'requirements not found';
              res.status(400).send(requestObject);
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

    var requestObject = requestTemplate;
    classes.forEach(function(item) {
        connection.query(
            `SELECT * FROM Fulfills WHERE major_id = ${major_id} and class_id = ${item} LIMIT 1`, function (error, result) {
                if (error) {
                  requestObject.status = 500;
                  requestObject.success = false;
                  requestObject.message = (error.sqlMessage ? error.sqlMessage : error);
                  res.status(500).send(requestObject);
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

    requestObject.status = 200;
    requestObject.data = fulfilled;
    requestObject.message = 'requirements checked';
    res.status(200).send(requestObject);
    // may need to json.parse(data)
    console.log('GET ' + req.originalUrl);
});
