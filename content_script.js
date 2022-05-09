chrome.storage.local.get("switcher", v => {
    if(v.switcher){
        runSrc()
    }
})
const port = chrome.runtime.connect({name: "exchangeData"});

const runSrc = () => {
    const regexW = /=\w{7}/;
    const pathname = document.location.pathname;

    if(pathname == '/clagt/woman/women_profiles_allow_edit.php') { 
        document.location.href = "http://www.charmdate.com/clagt/first_emf.php?groupshow=4";
    }

    if(pathname == '/clagt/emf_error.php'){
        port.postMessage({method: "closeTab"});
    }

    if(pathname == '/clagt/first_emf.php'){
        if(!!document.location.href.match(regexW)){
            const table = document.getElementById("DataGrid1").children[1]
            const tableData = table.querySelectorAll("tr");
            const nextButton = document.querySelectorAll("table")[31].children[0].children[0].children[1].children[3].children[0];
            
            const openTab = (i) => {
                if(tableData.length>1){
                    const item = tableData[i];
                    if(item.children[5].innerText == 'Send Another Mail'){
                        const url = item.children[5].children[0].href;
                        port.postMessage({method: "openTab", url}) 
                    }
                    if(i===tableData.length-1){
                        if(!!nextButton){
                            nextButton.click();
                        } else {
                            alert("all messages sended");
                        }
                    }
                }
            }
            let i = 1;
            const checkTab = () => {
                chrome.storage.local.get("tabIsOpen", v => {
                    if(!v.tabIsOpen){
                        openTab(i);
                        i++;
                    }
                })
            }
            openTab(i);
            i++;
            setInterval(()=>{
                checkTab();
            }, 1000)



        } else {
            chrome.storage.local.get("w_id", v => {
                setTimeout(() => {
                    const form = document.querySelectorAll("form")[0]
                    form.children[4].value = v.w_id
                    form.children[10].click();
                }, 500)
            })
        }

    }
    
    if(pathname == '/clagt/emf_sender2.php'){
        const mansData = document.querySelectorAll(".nor")[1].parentElement.innerText.split("\n");
        chrome.storage.local.set({[mansData[0]]: {name: mansData[1], country: mansData[3]}});
        document.getElementsByName("messagesub")[0].click()
    }
    
    if(pathname == '/clagt/emf_sender3.php'){
        document.querySelector("select").options[1].selected = true;
        const telNum = document.querySelectorAll("table")[31].children[0].children[4].children[1].innerText;
        document.querySelector("textarea").value = telNum;
        document.getElementsByName("messagesub")[0].click()
    }
    
    if(pathname == '/clagt/emf_sender4.php'){
        const manId = document.querySelectorAll(".nor")[0].innerText;
        const area = document.getElementById("TextArea1");
    
        chrome.storage.local.get([manId, "message"], v => {
            let mess = v.message;
            do{
                mess = mess.replace("{country}", v[manId].country)
            } while (mess.indexOf("{country}")>-1)

            do{
                mess = mess.replace("{name}", v[manId].name);
            } while (mess.indexOf("{name}")>-1)

            area.value = mess;
        })
    
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }
        const gift = document.querySelector("#content_list").children;
    
        gift[getRandomInt(0, gift.length)].click();
        let setVideo = false;
        let setFreePhoto = false;
        let setPrivatePhoto = false;


        const selectItem = (i) => {
            const data = document.querySelectorAll(".x-panel-body")[i];
            if(!data){
                setTimeout(()=>{
                    selectItem(i);
                }, 300)
            } else {
                const photos = data.children[0].children;
                setTimeout(()=>{
                    photos[getRandomInt(0, photos.length)].click();
                    let btnI;
                    i==0 && (btnI = 5);
                    i==2 && (btnI = 9);
                    i==4 && (btnI = 13);
                    document.querySelectorAll(".x-btn-center")[btnI].click();
                    i==0 && (setVideo = true);
                    i==2 && (setFreePhoto = true);
                    if(i == 4){
                        if(document.getElementById("private_attachfileImages").children.length<3){
                            setAttachment("PrivatePhoto");
                        } else {
                            setPrivatePhoto = true;
                        }
                    }
                }, 500)
            }
        }

        const openCategory = (albums, coI) => {
            let err = true;
            albums.forEach((item,id) => {
                const data = item.children[1].innerText;
                if(data == "first emf mail" || data == 'first emf ...' || data == 'first emf'){
                    item.click()
                    selectItem(coI);
                    err=false;
                }
            })
            err && alert(`альбом 'firts emf mail' не найден в ${coI==0? "Video": coI=="2"? "Free Photo":"Private Photo"}`)
        }

        const selectCategory = (caI,coI) => {
            const albums = document.querySelectorAll(".x-panel-body")[caI];
            if(!albums){
                setTimeout(() => {
                    selectCategory(caI,coI);
                }, 200);
            } else {
                if(albums.children[0].querySelectorAll(".thumb").length<1){
                    setTimeout(()=>{
                        selectCategory(caI,coI);
                    }, 300);
                } else {
                    openCategory(albums.children[0].querySelectorAll(".thumb"), coI);
                }
                
            }
        }

        const setAttachment = (method) => {
            let buttonIndex, categoryIndex, contentIndex;
            if(method == "Video"){
                buttonIndex = 0;
                categoryIndex = 1;
                contentIndex = 0;
            } else if(method == "FreePhoto"){
                buttonIndex = 1;
                categoryIndex = 3;
                contentIndex = 2;
            } else {
                buttonIndex = 2;
                categoryIndex = 5;
                contentIndex = 4;
            }

            const btn = document.querySelectorAll(".x-btn-center")[buttonIndex];
            if(!btn){
                setTimeout(() => {
                    setAttachment(method);
                }, 500);
            } else {
                btn.click();
                setTimeout(()=>{
                    selectCategory(categoryIndex, contentIndex, method);
                }, buttonIndex==2?1500:0)

            }   
        }
    
        const callSetFreePhoto = () => {
            if(setVideo){
                setAttachment("FreePhoto")
            } else {
                setTimeout(() => {
                    callSetFreePhoto();
                }, 700);
            }
        }

        const callSetPrivatePhoto = () => {
            if(setFreePhoto){
                setAttachment("PrivatePhoto");
            } else {
                setTimeout(()=>{
                    callSetPrivatePhoto()
                }, 700)
            }
        }

        const sendForm = () => {
            if(setPrivatePhoto){
                chrome.storage.local.remove(manId);
                document.querySelector("form").submit(true);
                // document.getElementsByName("messagesub")[0].click();
            } else {
                setTimeout(sendForm, 1000);
            }
        }
        setAttachment("Video");


        callSetFreePhoto();


        callSetPrivatePhoto();
        sendForm();
    }

    const checkSended = () => {
        const div = document.querySelector(".STYLE1");
        if(!!div){
            div.innerText.indexOf("The mail has been sent successfully!") > -1 && port.postMessage({method: "closeTab"});
        } else {
            setTimeout(checkSended, 500);
        }
        
    }

    if(pathname == '/clagt/emf_sender6.php'){
        checkSended();
    }
}


