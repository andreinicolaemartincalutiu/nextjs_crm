import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const twilAuthToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioClient = twilio(accountSid, twilAuthToken);

export async function POST(req: Request) {
	const { to, message } = await req.json();

	const url = 'https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp';
	const options = {
		method: 'POST',
		headers: {
			'x-rapidapi-key': '27f38276a3mshea013ac5b685d84p13463bjsna003989ed177',
			'x-rapidapi-host': 'd7-verify.p.rapidapi.com',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			originator: 'CRM',
			recipient: to,
			content: message,
			expiry: '600',
			data_coding: 'text2'
		})
	};

	try {
		// const messageResponse = await twilioClient.messages.create({
		// 	body: message,
		// 	to: to, // Text this number
		// 	from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
		// });

		const response = await fetch(url, options);
		const result = await response.text();
		return NextResponse.json({ success: true, messageSid: result }, { status: 200 });


		// return NextResponse.json({ success: true, messageSid: messageResponse.sid }, { status: 200 });
	} catch (error: any) {
		console.log("Error sending SMS:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
