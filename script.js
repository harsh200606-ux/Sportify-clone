console.log("lets write js");

async function getsongs(){

    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

      // this should print HTML

    let div = document.createElement("div");
    div.innerHTML = response;
    

    let as = div.getElementsByTagName("a")
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
    return songs

} 

const playmusic=(track)=>{
   // let audio=new Audio("/songs/" + track)
   currentsong.src="/songs/" + track
   currentsong.play()
   play.src="pause.svg"
}
let currentsong=new Audio();


async function main(){
    
    // all list of songs
    let songs=await getsongs();

    
    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML+`<li><img class="invert svg-music" src="music.svg" alt="">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>harsh</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="play.svg" alt="" >
                                </div> </li>`;
        
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
        
        
    });

    // to play next and previous
    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src="pause.svg"
        }
        else{
            currentsong.pause()
            play.src="play.svg"

        }
    })
   
    



}   

main(); 
