const LoadingPopup = (() => {
	let popup: any = null;
	let overlay: any = null;

	return (show: any) => {
		if (show) {
			if (!popup) {
				// Create overlay to disable interactions
				overlay = document.createElement("div");
				overlay.style.position = "fixed";
				overlay.style.top = "0";
				overlay.style.left = "0";
				overlay.style.width = "100%";
				overlay.style.height = "100%";
				overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
				overlay.style.zIndex = "999";
				overlay.style.pointerEvents = "auto";
				document.body.appendChild(overlay);

				// Create popup
				popup = document.createElement("div");
				popup.style.position = "fixed";
				popup.style.top = "50%";
				popup.style.left = "50%";
				popup.style.transform = "translate(-50%, -50%)";
				popup.style.padding = "20px";
				popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
				popup.style.borderRadius = "10px";
				popup.style.zIndex = "1000";
				popup.style.textAlign = "center";
				popup.style.pointerEvents = "none";

				// Create loading circle
				const spinner = document.createElement("div");
				spinner.style.width = "40px";
				spinner.style.height = "40px";
				spinner.style.border = "4px solid white";
				spinner.style.borderTop = "4px solid transparent";
				spinner.style.borderRadius = "50%";
				spinner.style.animation = "spin 1s linear infinite";

				popup.appendChild(spinner);
				document.body.appendChild(popup);

				// Add animation
				const style = document.createElement("style");
				style.innerHTML = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
				document.head.appendChild(style);
			}
		} else {
			if (popup) {
				document.body.removeChild(popup);
				popup = null;
			}
			if (overlay) {
				document.body.removeChild(overlay);
				overlay = null;
			}
		}
	};
})();

export default LoadingPopup;
