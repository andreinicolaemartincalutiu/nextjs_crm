import { NextResponse } from "next/server";
import SendEmailTask from "@/components/common/SendEmailTask";
import GeneratePDF from "@/components/Clients/GeneratePDF";

export async function PUT(request: Request, { params }: { params: { email: string } }) {
	try {
		const { email } = params;
		const { Subject, EmailText, OfferServiceArray, DiscountPercent, OfferDescription } = await request.json();

		if (!email || typeof email !== "string") {
			return NextResponse.json({ message: "Invalid email" }, { status: 400 });
		}

		if (!Subject || !EmailText) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		let pdf;
		if (OfferServiceArray !== undefined) {
			if (OfferServiceArray.length !== 0) {
				pdf = GeneratePDF();
			}
		}

		const emailTask = new SendEmailTask(
			process.env.EMAIL,
			process.env.PASS,
			email,
			Subject,
			EmailText,
			pdf,
		);
		await emailTask.execute();

		return NextResponse.json({ message: "Client updated successfully" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error updating client" }, { status: 500 });
	}
}
