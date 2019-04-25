const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const router = express.Router()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended:false} ))

app.post('/email', function(req,res) {
    console.log(req.body)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'movie.ticket.machine@gmail.com',
            pass: 'mtm123456'
        }
    })

    var mailOptions = {
        from: 'movie.ticket.machine@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using nodemailer',
        html: '<img style="width:160px;height:210px;position:relative;float:left;display:inline-block;" src="cid:movieImg" />'
            +"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail01+"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail02
            +"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail03+"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail04
            +"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail05+"<br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;"
            +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            +"<b>Thank you to use our service.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enjoy your movie!!!</b>",
        attachments: [{
            filename: 'movieImg.jpg',
            path: req.body.MovieImg,
            cid: 'movieImg'
        }]
    }
          
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

module.exports = app