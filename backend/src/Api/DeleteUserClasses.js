const app = require('../shared/Express').app;
const template = require('../shared/Express').template;
const connection = require('../shared/Connection');

app.put('/delete_user_classes', function (req, res) {
    const net_id = req.body.net_id;
    const classes = req.body.classes;

    if (!net_id) {
        res.status(400).send("Please provide an net id parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }
    if (!classes) {
        res.status(400).send("Please provide a classes parameter");
        console.log('FAILED: GET ' + req.originalUrl);
        return;
    }

    var success = true;
    var processed = 0;
    classes.forEach(cl => {
        if (success){
            connection.query(
                `DELETE FROM UserClasses 
                WHERE uid='${net_id}' AND class_id=${cl};`, function (error, result) {
                    if (success && error) {
                        success = false;
                        template.status = 500;
                        template.success = false;
                        template.message = (error.sqlMessage ? error.sqlMessage : 'error');
                        res.status(500).send(template);
                        return;
                    }
                    else{
                        processed++;
                        if (success && processed == classes.length){
                            res.status(200).send({
                                message: 'Classes removed',
                                netID: net_id,
                                classes: classes,
                                success: true,
                            })
                            console.log('PUT ' + req.originalUrl);
                        }
                    }
                }
            );
        }
    });
});