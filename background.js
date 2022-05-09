chrome.storage.local.set({tabIsOpen: false})
chrome.runtime.onConnect.addListener(p => {
    if(p.name == "exchangeData") {
        p.onMessage.addListener(msg => {

            if(msg.method == "openFirstTab"){
                chrome.tabs.create({url: msg.url, active: false});
            }

            if(msg.method == "openTab"){
                chrome.storage.local.set({tabIsOpen: true});
                chrome.tabs.create({url: msg.url, active: false});
            }

            if(msg.method == "closeTab"){
                chrome.storage.local.set({tabIsOpen: false});
                chrome.tabs.remove(p.sender.tab.id);
            }

            
        })
    }
})