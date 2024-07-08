import { render } from '@react-email/components';
import { ReactElement } from "react";
import { ConfirmEmail } from '@/app/_components/emailTemplates/confirmEmail';
import { createTransport } from "nodemailer";
import { generateVerificationToken } from '@/lib/token';

type sendMailProps = {
    recipient: string,
    subject: string,
    emailComponent: ReactElement
}

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendMail = async ({
    recipient, emailComponent,
    subject = 'Signup Successful',
}: sendMailProps) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient,
            subject,  
            html: render(emailComponent)
        });
        
        return {res: info.response};
    } catch (error) {
        return { error };
    }
}

export const sendVerificationEmail = async (username: string, email: string, token: string) => {
    const sent = await sendMail({
        recipient: email,
        subject: 'Welcome to NextAuth Authentication. Verify Your Email',
        emailComponent: ConfirmEmail({url: `${process.env.WEBSITE_URL}/email-verification?code=${token}`})
    });

    return sent;
}

export const verifyEmail = async (email: string, username: string) => {
    const token = await generateVerificationToken(email);
    const emailResponse  = await sendVerificationEmail(username, email, token?.token as string);

    return emailResponse;
}