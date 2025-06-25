import { Resend } from "resend";

export default function createResendClient() {
    const resend = new Resend(process.env.RESEND_API_KEY);
    return resend;
}