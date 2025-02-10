let currentSong = new Audio();

function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds<0){
        return "Invalid Input";
    }

    const minutes = Math.floor(seconds/60)
    const remainingSeconds = Math.floor(seconds%60)

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

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

const playMusic = (track)=>{
    // let audio = new Audio("/songs/" + track + ".mp3")
    currentSong.src = "/songs/" + track + ".mp3"
    currentSong.play()
    play.src = "pause.svg"
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

        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
            e.addEventListener("click", element=>{
                console.log(e.querySelector(".info").firstElementChild.innerHTML)
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })
            
        })

        play.addEventListener("click", ()=>{
            if(currentSong.paused){
                currentSong.play();
                play.src = "pause.svg"
            }
            else{
                currentSong.pause()
                play.src = "playPlaybar.svg"
            }
        })

        currentSong.addEventListener("timeupdate", ()=>{
            console.log(currentSong.currentTime, currentSong.duration)
            document.querySelector(".songTime").innerHTML = 
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + "%"
        })
}


main();
