var mailer = function  (email,verifyEmail) {
	var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');

	var transporter = nodemailer.createTransport(smtpTransport({
		host:'smtp.mandrillapp.com',
		port:587,
		auth: {
			user:'ashakdwipeea@gmail.com',
			pass:'Dfhacm-zBJ6Jo4vcuFxzhA'
		}
	}));

	var mailOptions = {
		from: 'The Blog <ashakdwipeea@gmail.com>',
		to: email,
		subject: 'Verification of account',
		html: 'Hi there! Glad you signed up. <br/> Click this link to verify your email address. <br/> <a href=\' ' + verifyEmail + ' \' >Verify</a><br /><br /> <br/> Yours <br /> Akash'
	};

	transporter.sendMail(mailOptions,function  (error,info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
}

module.exports = mailer;