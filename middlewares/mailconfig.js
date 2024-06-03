import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `
      <p>Para verificar tu cuenta accede al siguiente enlace:</p>
      <a href="${verificationLink}">Click aqui.</a>
      `
    };
  
    await transporter.sendMail(mailOptions);
};