import nodemailer from 'nodemailer'
import { app } from '..'
import { FRONTEND_URL } from '../utils/constants'

let transporter: nodemailer.Transporter<any> | undefined

let EMAIL_SMTP_USER: string | undefined
let EMAIL_SMTP_PASS: string | undefined

async function init() {
    EMAIL_SMTP_USER = process.env.EMAIL_SMTP_USER
    EMAIL_SMTP_PASS = process.env.EMAIL_SMTP_PASS

    if (!EMAIL_SMTP_USER || !EMAIL_SMTP_PASS) {
        throw new Error('Email Service initialization failed: EMAIL_SMTP_USER or EMAIL_SMTP_PASS not found')
    }

    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_SMTP_USER,
            pass: EMAIL_SMTP_PASS
        }
    })

    app.log.info('Email Services successfully initialized.')
}

async function sendEmailVerification(email: string, emailVerificationToken: string) {
    if (!transporter) {
        return
    }

    const html = `Перейдіть за <a href="${FRONTEND_URL}/verification?token=${emailVerificationToken}">посиланням</a>, щоб підтвердити Email.<div><b>Посилання буде активним 24 години</b></div>`

    await _sendMail({ email, subject: 'Email Verification', html })
}

async function _sendMail({ email, subject, html }: { email: string; subject: string; html: string }) {
    if (!transporter) {
        return
    }

    await transporter.sendMail({
        from: `Among Scripts <${EMAIL_SMTP_USER}>`,
        to: email,
        subject,
        html
    })
}

export const emailService = {
    init,
    sendEmailVerification
}
