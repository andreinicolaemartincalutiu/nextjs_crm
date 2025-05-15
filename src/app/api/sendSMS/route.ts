import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const twilAuthToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioClient = twilio(accountSid, twilAuthToken);

export async function POST(req: NextRequest) {
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

		const resp = await fetch(url, options);
		const response = await resp.text();
		return NextResponse.json({ message: "Success", status: 200 }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: "Fail", status: 500 }, { status: 500 });
	}
}
