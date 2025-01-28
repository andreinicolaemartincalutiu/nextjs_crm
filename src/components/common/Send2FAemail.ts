import InfoPopup from "@/components/common/InfoPopup";
import LoadingPopup from "@/components/common/LoadingPopup";

const send2FAemail = async (email: string, securityCodeGenerated: string) => {
	let funcResponse = "0";
	LoadingPopup(true);
	try {
		const response = await fetch(`/api/sendEmail/${email}`, {
			method: "PUT",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			},
			body: JSON.stringify({
				Subject: "Security code",
				EmailText: securityCodeGenerated,
			}),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		LoadingPopup(false);
		InfoPopup(`Security code sent on email ${securityCodeGenerated}`);
		funcResponse = "1";
	} catch (error) {
		LoadingPopup(false);
		InfoPopup(`Failed to send security code to email ${securityCodeGenerated}`);
	}
	return funcResponse;
};

export default send2FAemail;
