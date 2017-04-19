var db = require('../db');
var manageUserService = require('./manageUserService');
var async = require('async');
var schedule = require('node-schedule');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');


var transport = nodemailer.createTransport((smtpTransport({
    host: "smtp.gmail.com",
    secureConnection: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: "organisationFoTest@gmail.com",
        pass: "organisationFoTest11"
    }
})));

var sendMail = function(receiver, text, orgName) {

    transport.sendMail({ //email options
        from: "organisationFoTest@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
        to: receiver, // receiver
        subject: "Tracking system " + orgName, // subject
        html: text // body
    }, function(error, response) { //callback
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response);
        }

        transport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });

};
var normalDate = function(date) {
    date = new Date(date);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return month + "." + day + "." + year + " at " + hours + ":" + minutes;

};
var createTextMessage = function(organisations) {

    var finalText = "";
    for (var i = 0; i < organisations.length; i++) {
        var countLate = 0;
        var countEarly = 0;
        var countNotCom = 0;
        var date = new Date();
        if (organisations[i].badPoints.length !== 0) {
            finalText += "<div style='background-color:#fcf8e3;padding: 10px 10px 10px 10px;font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.42857143; color: #333;'>" + "<h2>Organization  &ldquo;" +organisations[i].name+ "\n"+ "Report for "+date+"&rdquo;: </h2>";
            var textLate = "<div><div><h4>" + "The following people were late: " + "</h4></div><ul>" ;

            for (var j = 0; j < organisations[i].badPoints.length; j++) {
                if (organisations[i].badPoints[j].selectedWorkDay !== null && organisations[i].badPoints[j].selectedWorkDay.late) {
                    countLate++
                    textLate += "<li>" +  organisations[i].badPoints[j].name + " come " + normalDate(organisations[i].badPoints[j].selectedWorkDay.startTime) +"</li>" ;
                }
                
            }
            if (organisations[i].badPoints.length !=0) {
                    textLate += "</ul></div><br>" + "";
                }
            var textEarly = "<div><div><h4>" +"The following people left early: " + "</h4></div><ul>" ;
            for (var j = 0; j < organisations[i].badPoints.length; j++) {
                if (organisations[i].badPoints[j].selectedWorkDay && organisations[i].badPoints[j].selectedWorkDay.goneBefore) {
                    countEarly++
                    textEarly += "<li>" + organisations[i].badPoints[j].name + " left " + normalDate(organisations[i].badPoints[j].selectedWorkDay.endTime) +"</li>" ;
                }
                
            }
            if (organisations[i].badPoints.length !=0) {
                    textEarly += "</ul></div><br>";
                }
            var textNotCom = "<div><div><h4>" +  "The following people did not come to work:" + "</h4></div><ul>" ;
            for (var j = 0; j < organisations[i].badPoints.length; j++) {

                if (!organisations[i].badPoints[j].selectedWorkDay) {
                    countNotCom++;
                    textNotCom += "<li>" + organisations[i].badPoints[j].name +  "</li>";
                }
                
            }
            if (organisations[i].badPoints.length  !=0 ) {
                     text += "</ul></div>";
                }
            if (organisations[i].badPoints.length  == 0 ) {
                     text += "All came to work in time";
                }
            var text = ""
            if (countLate !== 0) {
                text = text + textLate;
            }
            if (countEarly !== 0) {
                text = text + textEarly;
            }
            if (countNotCom !== 0) {
                text = text + textNotCom;
            }
            finalText += text + "</div>";
        }
    }


    return finalText;
};

function sendMailAdministrations() {
    db.getAdminUsers(function(err, adminUsers) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < adminUsers.length; i++) {
            creaReport(adminUsers[i].usersOrganisations, adminUsers[i].email);
        }
    });
}



function creaReport(organisations, email) {
    var adminUsers = [];
    var date = new Date();
    date.setDate(date.getDate() - 1);
    async.waterfall([
        function(callback) {
            db.getAdminUsers(function(error, users) {
                if (error) {
                    console.log(error);
                } else {
                    callback(null, users);
                }
            });
        },
        function(users, callback) {
            var asyncArray = [];
            var count = 0;
            for (var i = 0; i < users.length; i++) {
                asyncArray.push(
                    function(asyncCallback) {
                        db.getUserOrganisation(users[count]._id, function(error, users) {
                            if (error) {
                                console.log(error);
                            } else {
                                asyncCallback(null, users);
                            }
                        });
                        count++;
                    });
                async.parallel(asyncArray,
                    function(err, results) {
                        for (var i = 0; i < users.length; i++) {
                            users[i].organisations = results[i];

                        }
                        callback(null, users);
                    });
            }
        },
        function(users, callback) {
            adminUsers = users;
            var asyncArr = [];
            var orgArr = [];
            var count = 0;
            for (var i = 0; i < users.length; i++) {
                for (var j = 0; j < users[i].organisations.length; j++) {
                    orgArr.push(users[i].organisations[j]);
                }
            }
            for (var i = 0; i < orgArr.length; i++) {
                asyncArr.push(function(asyncCallback) {
                    manageUserService.getPointScedule(orgArr[count]._id.toString(), date, function(err, shedule) {
                        if (err) {
                            console.log(err, null);
                        } else {
                            asyncCallback(null, shedule);
                            console.log(shedule);
                        }
                    });
                    count++;
                });
            }
            async.parallel(asyncArr,
                function(err, results) {
                    if (err) {
                        callback(err, null);
                    } else {
                        var resArr = [];
                        for (var i = 0; i < results.length; i++) {
                            for (var j = 0; j < results[i].length; j++) {
                                resArr.push(results[i][j]);
                            }
                        }
                        callback(null, resArr);
                    }

                });
        }

    ], function(err, result) {
        var report = [];
        for (var i = 0; i < result.length; i++) {
            if (!result[i].selectedWorkDay || result[i].selectedWorkDay.goneBefore || result[i].selectedWorkDay.late) {
                report.push(result[i]);
            }
        }
        for (var i = 0; i < adminUsers.length; i++) {
            adminUsers[i].badPoints = [];
            for (var j = 0; j < adminUsers[i].organisations.length; j++) {
                for (var k = 0; k < report.length; k++) {
                    if (adminUsers[i].organisations[j]._id.toString() == report[k].orgId) {
                        adminUsers[i].badPoints.push(report[k]);
                    }
                }
            }
        }
        for (var i = 0; i < adminUsers.length; i++) {
            if (adminUsers[i].badPoints.length == 0) {
                adminUsers.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < adminUsers.length; i++) {
            for (var k = 0; k < adminUsers[i].organisations.length; k++) {
                adminUsers[i].organisations[k].badPoints = [];
                for (var j = 0; j < adminUsers[i].badPoints.length; j++) {
                    if (adminUsers[i].organisations[k]._id.toString() == adminUsers[i].badPoints[j].orgId) {
                        adminUsers[i].organisations[k].badPoints.push(adminUsers[i].badPoints[j]);
                    }
                }
            }
        }

        for (var i = 0; i < adminUsers.length; i++) {
            adminUsers[i].text = createTextMessage(adminUsers[i].organisations);
        }

        for (var i = 0; i < adminUsers.length; i++) {
            for (var j = 0; j < adminUsers[i].emails.length; j++) {
                sendMail(adminUsers[i].emails[j], adminUsers[i].text);
            }

        }
        console.log(result);
    });

}



var j = schedule.scheduleJob('0 0 10 * * *', function(){
    sendMailAdministrations();
  console.log('mail sent');
});

