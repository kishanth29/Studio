const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password
    }
});

app.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { to, subject, message } = req.body;
    const attachment = req.file;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
            attachments: [
                {
                    filename: 'order-details.zip',
                    content: attachment.buffer,
                    encoding: 'base64'
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Email service running on port ${port}`);
});
