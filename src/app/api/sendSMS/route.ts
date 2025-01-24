import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const twilAuthToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioClient = twilio(accountSid, twilAuthToken);

export async function POST(req: Request) {
	const { to, message } = await req.json();

	try {
		const messageResponse = await twilioClient.messages.create({
			body: message,
			to: to, // Text this number
			from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
		});

		return NextResponse.json({ success: true, messageSid: messageResponse.sid }, { status: 200 });
	} catch (error: any) {
		console.log("Error sending SMS:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
