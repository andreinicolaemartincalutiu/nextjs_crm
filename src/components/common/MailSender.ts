import nodemailer from "nodemailer";

class MailSender {
	private user: string;
	private password: string;
	private transporter: nodemailer.Transporter;

	constructor(user: string, password: string) {
		this.user = user;
		this.password = password;

		this.transporter = nodemailer.createTransport({
			host: "mail.brandtransilvania.ro",
			port: 465,
			secure: true, // use TLS
			auth: {
				user: this.user,
				pass: this.password,
			},
			tls: {
				ciphers: "SSLv3",
			},
		});
	}

	public async sendEmail(to: string, subject: string, body: string, pdf?: Blob): Promise<void> {
		let mailOptions;

		if (pdf && pdf instanceof Blob) {
			const pdfBuffer = Buffer.from(await pdf.arrayBuffer());
			mailOptions = {
				from: "'CRM' <office@brandtransilvania.ro>",
				to: to,
				subject: subject,
				text: body,
				attachments: [
					{
						filename: "Offer.pdf",
						content: pdfBuffer,
						contentType: "application/pdf",
					}
				]
			};

			// console.log("Sending email with attachment:", mailOptions);
		} else {
			mailOptions = {
				from: "'CRM' <office@brandtransilvania.ro>",
				to: to,
				subject: subject,
				text: body,
			};

			// console.log("Sending email without attachment:", mailOptions);
		}

		try {
			await this.transporter.sendMail(mailOptions);
			console.log("Email sent successfully");
		} catch (error) {
			console.log("Error sending email:", error);
			throw error;
		}
	}
}

export default MailSender;
