import { render } from '@react-email/components';
import { ReactElement } from "react";
import { ConfirmEmail } from '@/app/_components/emailTemplates/confirmEmail';
import { TwoFactorEmail } from '@/app/_components/emailTemplates/twoFactorEmail';
import { createTransport } from "nodemailer";
import { 
    generateVerificationToken, 
    generatePasswordResetToken,
    generate2FToken
} from '@/lib/tokens';

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
        
        return { res: info.response };
    } catch (error) {
        return { error };
    }
}

export const sendVerificationEmail = async (email: string, token: string | undefined, username?: string,) => {
    if(!token) return { error: "Missing token " };

    const sent = await sendMail({
        recipient: email,
        subject: 'Welcome to NextAuth Authentication. Verify Your Email',
        emailComponent: ConfirmEmail({url: `${process.env.WEBSITE_URL}/email-verification?code=${token}`})
    });

    return sent;
}

export const sendPasswordResetEmail = async (email: string, token: string | undefined, username?: string,) => {
    if(!token) return { error: "Missing token " };

    const sent = await sendMail({
        recipient: email,
        subject: 'Welcome to NextAuth Authentication. Verify Your Email',
        emailComponent: ConfirmEmail({url: `${process.env.WEBSITE_URL}/change-password?code=${token}`})
    });

    return sent;
}

export const send2FEmail = async (email: string, token: string | undefined, username?: string,) => {
    if(!token) return { error: "Missing token " };

    const sent = await sendMail({
        recipient: email,
        subject: 'Welcome to NextAuth Authentication. Verify Your Email',
        emailComponent: TwoFactorEmail({ code: token })
    });

    return sent;
}

export const verifyEmail = async (email: string, username?: string) => {
    const token = await generateVerificationToken(email);
    const emailResponse  = await sendVerificationEmail(email, token?.token, username);

    return emailResponse;
}

// export const changeEmail = async (currentEmail: string, newEmail: string, username?: string) => {
//     const token = await generateVerificationToken(currentEmail);
//     const emailResponse  = await sendVerificationEmail(newEmail, token?.token, username);

//     return emailResponse;
// }

export const initPassReset = async (email: string, username?: string) => {
    const token = await generatePasswordResetToken(email);
    const emailResponse = await sendPasswordResetEmail(email, token?.token, username);

    return emailResponse;
}

export const init2FAuth = async (email: string, username?: string) => {
    const token = await generate2FToken(email);
    const emailResponse = await send2FEmail(email, token?.token, username);

    return emailResponse;
}