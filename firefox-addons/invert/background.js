let cssContent = "";

fetch(chrome.runtime.getURL("styles.css"))
	.then((response) => response.text())
	.then((text) => {
		cssContent = text;
	})
	.catch((err) => console.error("failed to load css file", err));

async function getSavedDomains() {
	return new Promise((resolve) => {
		chrome.storage.local.get({ domains: [] }, (result) =>
			resolve(result.domains),
		);
	});
}

async function isDomainSaved(domain) {
	const domains = await getSavedDomains();
	return domains.includes(domain);
}

chrome.browserAction.onClicked.addListener(async (tab) => {
	if (tab.url) {
		const url = new URL(tab.url);
		const domain = url.hostname;
		const saved = await isDomainSaved(domain);

		if (saved) {
			const domains = await getSavedDomains();
			const updatedDomains = domains.filter((d) => d !== domain);
			chrome.storage.local.set({ domains: updatedDomains });
			chrome.tabs.removeCSS(tab.id, { code: cssContent });
		} else {
			const domains = await getSavedDomains();
			if (!domains.includes(domain)) {
				domains.push(domain);
				chrome.storage.local.set({ domains });
			}
			chrome.tabs.insertCSS(tab.id, { code: cssContent });
		}
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.url) {
		const url = new URL(tab.url);
		const domain = url.hostname;

		if (await isDomainSaved(domain)) {
			chrome.tabs.insertCSS(tabId, { code: cssContent });
		}
	}
});
