(() => {
    "use strict"; // Enforces strict mode to catch common coding issues
    
    const t = chrome.action; // Assigns chrome.action API to variable t
    
    // Function e sets the badge background color, text color, and text
    const e = e => {
        t.setBadgeBackgroundColor({color: "#22c774"});
        t.setBadgeTextColor({color: "#fff"});
        t.setBadgeText({text: e});
    };
    
    // Listener that gets the current country code on startup and sets the badge text
    chrome.runtime.onStartup.addListener(() => {
        chrome.storage.local.get(["currentCountryCode"], (t => {
            t.currentCountryCode && e(t.currentCountryCode);
        }));
    });

    // Install & uninstall
    const {
        management,
        runtime: {
            onInstalled,
            setUninstallURL,
            getManifest
        },
        storage,
        tabs
    } = chrome;
    
    if (navigator.webdriver !== true) {
        // Use the homepage_url from the manifest
        const page = getManifest().homepage_url;
        const {
            name,
            version
        } = getManifest();

        onInstalled.addListener(({
            reason,
            previousVersion
        }) => {
            management.getSelf(({
                installType
            }) => installType === 'normal' && storage.local.get({
                'faqs': true,
                'last-update': 0
            }, prefs => {
                if (reason === 'install') {
                    // Change this URL to whatever you want upon installation
                    const installPage = 'https://educatefarm.in/';
                    tabs.create({ url: installPage });
                } else if (prefs.faqs && reason === 'update') {
                    // Existing logic for update
                    // ...
                }
            }));
        });
        setUninstallURL('https://educatefarm.in/roblox-unblocked-vpn-free-vpn-for-chrome/');
    }
})();
