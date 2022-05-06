const switchButton = document.getElementById("switchButton");
const textarea = document.querySelector("textarea");
const number = document.querySelector(".number");
const ladyId = document.getElementById("w_id_i");
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
    chrome.storage.local.get("message", v => console.log(v.message));
})


ladyId.addEventListener("input", e => {
    chrome.storage.local.set({w_id: e.target.value});
})