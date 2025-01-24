import MailSender from "@/components/common/MailSender";

class SendEmailTask {
	private mailSender: MailSender;
	private to: string;
	private subject: string;
	private body: string;
	private pdf: any;

	constructor(user: any, password: any, to: string, subject: string, body: string, pdf?: Blob) {
		this.mailSender = new MailSender(user, password);
		this.to = to;
		this.subject = subject;
		this.body = `Hello\nToRamac, type code:\n\n${body}\n\nIf you didn't request this email, you can ignore it.\n`;
		this.pdf = pdf || 0;
	}

	public async execute(): Promise<void> {
		try {
			await this.mailSender.sendEmail(this.to, this.subject, this.body, this.pdf);
		} catch (error) {
			console.log("Error sending email:", error);
		}
	}
}

export default SendEmailTask;
