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
            if(tableData.length>1){
                let i = 1;
                let loop = setInterval(() => {
                    const item = tableData[i];
                    if(item.children[5].innerText == 'Send Another Mail'){
                        const url = item.children[5].children[0].href;
                        port.postMessage({method: "openTab", url}) 
                    }
                    if(i===tableData.length){
                        clearInterval(loop);
                    }
                    i++;
                }, 12000);
            }
        } else {
            chrome.storage.local.get("w_id", v => {
                setTimeout(() => {
                    const form = document.querySelectorAll("form")[0]
                    form.children[4].value = v.w_id
                    form.children[10].click();
                    console.log("ne tut");
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
        console.time("a");
        const manId = document.querySelectorAll(".nor")[0].innerText;
        const area = document.getElementById("TextArea1");
    
        chrome.storage.local.get([manId, "message"], v => {
            let mess = v.message;
            console.log(mess);
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

        const setVideo = () => {
            document.querySelectorAll(".x-btn-center")[0].click();

            setTimeout(()=>{
                const albums = document.querySelectorAll(".x-panel-body")[3].children[0];
                let isSelected = false
                albums.querySelectorAll(".thumb").forEach((item,id) => {
                    const data = item.innerText.split("\n")
                    data[1] == "first emf mail" && (isSelected = true);
                    data[1] == "first emf mail" && item.click();
                })
                
                if(isSelected){
                    setTimeout(() => {
                        const videos = document.querySelectorAll(".x-panel-body")[2].children[0].children;
                        videos[getRandomInt(0,videos.length)].click();
                        document.querySelectorAll(".x-btn-center")[9].click();
                    }, 500) 
                } else {
                    alert("не добавлено видео. нет альбома 'first emf mail'");
                    document.querySelectorAll(".x-btn-center")[10].click();
                }
            },500)

        }
        
        const setFreePhoto = () => {
            setTimeout(() => {
                document.querySelectorAll(".x-btn-center")[1].click();
        
                setTimeout(() => {
                    const albumsWrapper = document.querySelector("#img-detail-panel");
                    albumsWrapper.querySelectorAll(".thumb").forEach((item,id) => {
                        const data = item.innerText.split("\n")
                        data[1] == "first emf mail" && item.click();
                    })
        
                    setTimeout(() => {
                        const photos = document.getElementById("img-chooser-view").children[0].children[1].children[0].children
                        photos[getRandomInt(0,photos.length)].click();
                        document.querySelectorAll(".x-btn-center")[5].click();
                    }, 500)
                }, 1000);
            }, 1500)
        }
    
        const setPrivatePhoto = () => {
            document.querySelectorAll(".x-btn-center")[2].click();
            let check = false;
            setTimeout(()=>{
                const albums = document.querySelectorAll(".x-panel-body")[5].children[0];
                albums.querySelectorAll(".thumb").forEach((item,id) => {
                    const data = item.innerText.split("\n")
                    data[1] == "first emf mail" && (check = true);
                    data[1] == "first emf mail" && item.click();
                })
                if(check){
                    setTimeout(() => {
                        const photos = document.querySelectorAll(".x-panel-body")[4].children[0].children;
                        photos[getRandomInt(0,photos.length)].click();
                        document.querySelectorAll(".x-btn-center")[13].click();
                        if(document.getElementById("private_attachfileImages").children.length<2){
                            setPrivatePhoto()
                        } else {
                            console.timeEnd("a");
                           // document.getElementsByName("messagesub")[0].click();
                        }
                    }, 500) 
                } else {
                    alert("не добавлены приватные фото. нет альбома 'first emf mail'");
                    document.querySelectorAll(".x-btn-center")[14].click()
                }

            },500)
        }
    
        setFreePhoto();

        setTimeout(() => {
            setVideo();
        },3500)
    
        setTimeout(() => {
            setPrivatePhoto();
        },6000)
    }
}


