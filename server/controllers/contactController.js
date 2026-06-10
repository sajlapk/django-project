const nodemailer = require('nodemailer');

const sendMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or any SMTP service
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: email,
            to: "hamiyasir72@gmail.com", //'info@thediscipl.com', // your receiving email
            subject: `[Contact Form] ${subject}`,
            html: `<p><b>Name:</b> ${name}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Message:</b> ${message}</p>`
        });

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    }catch(error){
        console.error("Error sending message.", error);
        res.status(500).json({ message: "Server error while sending message." });
    }
};

module.exports = { sendMessage }