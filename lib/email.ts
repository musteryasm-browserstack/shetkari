import nodemailer from "nodemailer";

type SendMailFunction = (email: string, subject: string, text: string) => Promise<boolean>;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aayushjha0112@gmail.com",
        pass: "ktfn tohw kaxu hyds", // Use the generated App Password
    },
});

const sendMail: SendMailFunction = async (email, subject, text) => {
    const mailOptions = {
        from: "aayushjha0112@gmail.com",
        to: email,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export default sendMail;
