async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/Songs/")
    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songsArray = []

    for(let i=0; i<as.length; i++){
        const elmt = as[i];
        if(elmt.href.endsWith(".mp3")){
            songsArray.push(elmt.href)
        }
    }
    return songsArray
}

async function main(){
    let gaana = await getSongs()
    console.log(gaana)

    var audio = new Audio(gaana[0]);
    audio.play();
}

main()