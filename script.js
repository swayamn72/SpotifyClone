async function getSongs() {
    
    let a = await fetch("http://127.0.0.1:5500/songs")

    
    let response = await a.text();

    
    let div = document.createElement("div");
    div.innerHTML = response;

    
    let as = div.getElementsByTagName("a");

    
    let songsArray = [];

    
    for (let i = 0; i < as.length; i++) {
        const elmt = as[i];
        if (elmt.href.endsWith(".mp3")) {
            songsArray.push(elmt.href);  
        }
    }

    return songsArray;  
}

async function main() {
    
    let gaana = await getSongs();
    console.log(gaana); 

    
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];

        
        for (const s of gaana) {
            songUl.innerHTML += `<li> 
            
                            <img class="invert songListImg" src="music.svg" alt="">
                            <div class="info">
                                <div>${s.substr(28).replaceAll("%20"," ").replaceAll(".mp3", "")}</div>
                                <div>CAS</div>

                            </div>
                            <div class="playNow">
                                <span>Play now</span>
                                <img class="invert size25" src="playPlaybar.svg" alt="">
                            </div>
                            
                        
            </li>`;
        }
}


main();
