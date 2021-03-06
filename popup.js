const switchButton = document.getElementById("switchButton");
const textarea = document.querySelector("textarea");
const number = document.querySelector(".number");
const ladyId = document.getElementById("w_id_i");
const port = chrome.runtime.connect({name: "exchangeData"});
switchButton.addEventListener("click", e => {
    chrome.storage.local.set({switcher: e.target.checked})
})
chrome.storage.local.get(["switcher", "message", "w_id"], v => {
    switchButton.checked = v.switcher;
    textarea.value = v.message || "";
    ladyId.value = v.w_id || "";
})

number.innerHTML = "0";
textarea.value=""; 
textarea.addEventListener('input', (e) => {
    number.innerHTML = e.target.value.length;
})
textarea.addEventListener("blur", e => {
    chrome.storage.local.set({message: e.target.value});
})

const sendButton = document.querySelector(".sendButton");
sendButton.addEventListener('click', () => {
    chrome.storage.local.remove(["lastId", "lastPage"]);
    port.postMessage({method: "openFirstTab", url: "http://www.charmdate.com/clagt/first_emf.php?groupshow=4"});
})

const continueSend = document.querySelector(".continueSend");
continueSend.addEventListener('click', () => {
    port.postMessage({method: "openFirstTab", url: "http://www.charmdate.com/clagt/first_emf.php?groupshow=4"});
})

ladyId.addEventListener("input", e => {
    chrome.storage.local.set({w_id: e.target.value});
})
