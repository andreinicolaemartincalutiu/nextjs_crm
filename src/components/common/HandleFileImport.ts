import { addClient } from "@/components/Clients/ModalClients";
import { addCompany } from "@/components/CompanyInfo/ModalCompany";
import { addService } from "@/components/Services/ModalServices";
import GenerateTSV from "@/components/common/GenerateTSV";
import InfoPopup from "@/components/common/InfoPopup";

const HandleFileImport = (event: any, importType: string) => {
	if (event.target.files && event.target.files.length > 0) {
		const file = event.target.files[0];

		const reader = new FileReader();

		// Read the file as text
		reader.onload = async (e) => {
			let tsvLinesArray: any[] = [];
			const text = e.target?.result as string;

			// Split the file content by lines
			const lines = text.split("\n");

			// Iterate through lines
			for (let index = 0; index < lines.length; index++) {
				const line = lines[index];
				let addSuccessfuly: any = "0";

				if (importType === "se") {
					const [name, description, price] = line.split("\t"); // Split each line by tabs
					addSuccessfuly = await addService(name, description, price);
				} else if (importType === "cl") {
					const [firstName, lastName, CI, CNP, companyId, companyRole, address, email, phone, interests, birthDate, details] = line.split("\t"); // Split each line by tabs
					addSuccessfuly = await addClient(firstName, lastName, CI, CNP, companyId, companyRole, address, email, phone, interests, birthDate, details);
				} else if (importType === "co") {
					const [companyName, TVA, shareholders, CIF, COM, headquarter, subsidiary, mainActivity, secondaryActivity, interests, email, region, employees, dataYear, profit, loss, turnover, capital, liabilities, assets, isActive] = line.split("\t"); // Split each line by tabs
					addSuccessfuly = await addCompany(companyName, TVA, shareholders, CIF, COM, headquarter, subsidiary, mainActivity, secondaryActivity, interests, email, region, employees, dataYear, profit, loss, turnover, capital, liabilities, assets, isActive);
				}
				if (addSuccessfuly === "0") {
					tsvLinesArray.push(line);
				}
			}

			if (tsvLinesArray.length !== 0) {
				GenerateTSV(tsvLinesArray);
				InfoPopup("Some data failed to be imported");
			} else {
				InfoPopup("Data imported successfuly");
			}
		};

		// Handle errors
		reader.onerror = (e) => {
			InfoPopup("Failed to read imported file");
		};

		reader.readAsText(file);
	}
};

export default HandleFileImport;
