import InfoPopup from "@/components/common/InfoPopup";

const send2FAemail = async (email: string, securityCodeGenerated: string) => {
	let funcResponse = "0";
	try {
		const response = await fetch(`/api/sendEmail/${email}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Subject: "Security code",
				EmailText: securityCodeGenerated,
			}),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		InfoPopup(`Security code sent on email ${securityCodeGenerated}`);
		funcResponse = "1";
	} catch (error) {
		InfoPopup(`Failed to send security code to email ${securityCodeGenerated}`);
	}
	return funcResponse;
};

export default send2FAemail;
