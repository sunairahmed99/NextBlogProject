import nodemailer, { TransportOptions } from 'nodemailer';

export const ForgotEmail = async (opt:any) =>{

    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth: {
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS,
        },
      }as TransportOptions);

      const mailoptions = {

        from: 'sunairahmed9908@gmail.com',
        to: opt.email,
        subject: opt.subject,
        text:opt.text
      }

      await transporter.sendMail(mailoptions)
}