import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

declare module "jspdf" {
	interface jsPDF {
		autoTable: (options: any) => jsPDF;
	}
}

function GeneratePDF(): Blob {
	const doc = new jsPDF();
	// Add logo (replace this with your logo's base64 data if available)
	doc.text("LOGO", 20, 20);
	// Add the title
	doc.setFontSize(14);
	doc.text("Offer", 105, 40, { align: "center" });
	// Add company and client details
	doc.setFontSize(10);
	doc.text("[Company name]", 20, 50);
	doc.text("[Adress]", 20, 55);
	doc.text("Reg. com.: [Nr.Reg.Comertului]", 20, 60);
	doc.text("CIF: [CIF]", 20, 65);
	doc.text("Phone: [phone]", 20, 70);
	doc.text("Capital social: [Capital social]", 20, 75);
	doc.text("CLIENT", 150, 50);
	doc.text("[Numele clientului]", 150, 55);
	doc.text("[Adresa clientului]", 150, 60);
	doc.text("Reg. com.: [Nr.Reg.Comertului]", 150, 65);
	doc.text("CIF: [CIF al clientului]", 150, 70);
	// Add offer dates
	doc.text("Offer start: 27.03.2021", 20, 85);
	doc.text("Offer expire: 01.05.2021", 150, 85);
	// Add table with autoTable
	doc.autoTable({
		startY: 95,
		head: [["Service", "CANT.", "PRET UNITAR", "TOTAL", "TVA"]],
		body: [
			["produsul meu", "5", "260,00", "1 300,00", "247,00 (19.00%)"],
			["produsul meu (Reducere 10%)", "5", "-26,00", "-130,00", "-24,70 (19.00%)"],
			["serviciul meu", "8", "319,00", "2 552,00", "484,88 (19.00%)"],
		],
		styles: { fontSize: 10 },
		theme: "grid",
	});

	// Add totals
	doc.setFontSize(10);
	const autoTableDoc = doc as any;
	doc.text("TOTAL", 140, autoTableDoc.lastAutoTable.finalY + 10);
	doc.text("3 722,00 Lei", 190, autoTableDoc.lastAutoTable.finalY + 10, { align: "right" });
	doc.text("TVA", 140, autoTableDoc.lastAutoTable.finalY + 15);
	doc.text("707,18 Lei", 190, autoTableDoc.lastAutoTable.finalY + 15, { align: "right" });
	doc.text("Total", 140, autoTableDoc.lastAutoTable.finalY + 20);
	doc.text("4 429,18 Lei", 190, autoTableDoc.lastAutoTable.finalY + 20, { align: "right" });

	// Add footer (bank details)
	doc.text("[Nume Banca]", 20, autoTableDoc.lastAutoTable.finalY + 40);
	doc.text("SWIFT/BIC: [SWIFT / BIC]", 20, autoTableDoc.lastAutoTable.finalY + 45);
	doc.text("Numar cont bancar: [IBAN]", 20, autoTableDoc.lastAutoTable.finalY + 50);

	// Save the document
	doc.save("Offer.pdf");

	const pdfBlob = doc.output("blob");
	return pdfBlob;
}

export default GeneratePDF;
