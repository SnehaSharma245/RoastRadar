import { Resend } from "resend";

//Resend: This is a class provided by the resend package. It allows you to create an instance to interact with the Resend API.
export const resend = new Resend(process.env.RESEND_API_KEY);
