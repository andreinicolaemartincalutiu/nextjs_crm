function GenerateTSV(items: any[]): void {
	// Convert array items to a TSV-compatible format
	const tsvContent = items
		.map(item => {
			// Convert objects to tab-separated values
			if (typeof item === "object" && !Array.isArray(item)) {
				return Object.values(item).join("\t");
			}
			// Convert arrays to tab-separated values
			if (Array.isArray(item)) {
				return item.join("\t");
			}
			// Non-object and non-array items
			return String(item);
		})
		.join("\n");

	// Create a Blob from the content
	const blob = new Blob([tsvContent], { type: "text/tab-separated-values;charset=utf-8;" });

	// Create a link element to download the file
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "failedImports.tsv";

	// Append the link to the DOM and simulate a click
	document.body.appendChild(link);
	link.click();

	// Cleanup: Remove the link after download
	document.body.removeChild(link);
}

export default GenerateTSV;
