var nodemailer = require('nodemailer');


let sendEmail = {} 

// email sender function
sendEmail.sendEmail1 = function(req, callback){
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'marcelo.a.bravo.c@gmail.com',
            pass: 'olecram6791'
        }
    });

    // Definimos el email
    var mailOptions = {
        from: req.from,
        to: req.to,
        subject: req.subject,
        text: req.text,
        html: req.html
    };

    try{
        transporter.sendMail(mailOptions)
        return callback(null,{mensaje: 'El email ha sido enviado', tipoMensaje: 'success'})
    }catch(err){
        return callback({mensaje: 'Ocurrio un error al intentar enviar el email: ' + err.message, tipoMensaje: 'danger'})
    }
    
};


//https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js
sendEmail.sendEmail2 = async (content, callback) =>{
    
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: 'bravomarcelo@hotmail.es',
            pass: 'olecram0876'
        }
    });

    var mailOptions = {
        from: content.from, // sender address (who sends): "Our Code World " <mymail@outlook.com>'
        to: content.to, // lista de emails destinatarios separados por comas: 'mymail@mail.com, mymail2@mail.com'
        subject: content.subject, // Subject line: 'Hello '
        text: content.text, // plaintext body: 'Hello world '
        html: content.html // html body: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js'
    };

    
    try{
        await transporter.sendMail(mailOptions)
        return callback(null,{mensaje: 'El email ha sido enviado', tipoMensaje: 'success'})
    }catch(err){
        return callback({mensaje: 'Ocurrio un error al intentar enviar el email: ' + err.message, tipoMensaje: 'danger'})
    }
    // send mail with defined transport object
    /*
    let res = await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
            return {mensaje: 'Ocurrio un error al intentar enviar el email: ' + error.message, tipoMensaje: 'danger'};
        }else{
            console.log('Message sent: ' + info.response);
            return {mensaje: 'El email ha sido enviado: ' + info.response, tipoMensaje: 'success'}
        }
    });
    */
}

module.exports = sendEmail