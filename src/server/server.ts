/// <reference path="../../d.ts/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/express/express.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/nodemailer/nodemailer.d.ts" />

module Server {

export function create() {

var express = require('express'),
	connect = require('connect'),
	nodemailer = require('nodemailer');




var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "h.iverson@gmail.com",
        pass: "bbkmutryrplvexjw"
    }
});





var app = express();

// -- Connect laer
 
//app.use(connect.directory(your_path));
app.use(connect.static(__dirname + '/public'));
app.use(connect.cookieParser('wiggle wiggle wiggle wiggle'));
app.use(connect.bodyParser());


// -- Express layer

app.get('/hello', function(req, res) {

	var after = req.query['greeting'] ? req.query['greeting'] : 'hello';

	res.cookie('greeting', after, {signed: true});

    res.send({
    	before: req.signedCookies['greeting'],
    	after: after
    });

    
});

app.post('/sendmail', function(req, res) {
	var mailOptions = {
	    from: "h.iverson@gmail.com", // sender address
	    to: "h.iverson@gmail.com", // list of receivers
	    subject: "VapurLounge Mail", // Subject line
	    text: JSON.stringify(req.body, null, 4)
	}

	

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }

	    res.send({success: error == null});

	    // if you don't want to use this transport object anymore, uncomment following line
	    //smtpTransport.close(); // shut down the connection pool, no more messages
	});


});

/*
app.use(function(err, req, res, next){
  // logic
  console.log('Shit broke.');

});
 */

 return app;
}

}

var app = Server.create();

// -- Run!
app.listen(1338, '127.0.0.1');
console.log('Listening on port 1338...');