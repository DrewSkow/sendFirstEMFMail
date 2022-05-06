chrome.runtime.onConnect.addListener(p => {
    if(p.name == "exchangeData") {
        p.onMessage.addListener(msg => {
            msg.method == "openTab" && chrome.tabs.create({url: msg.url, active: false});

            msg.method == "closeTab" && chrome.tabs.remove(p.sender.tab.id);
        })
    }
})