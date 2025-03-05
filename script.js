const songsContainer = document.querySelector('.songs-container ul');
const playSong = document.querySelector('.play')
const prevSong = document.querySelector('.prev')
const nextSong = document.querySelector('.next')
const circle = document.querySelector('.circle')
const songsName = document.querySelector('.name')
const time = document.querySelector('.time')
const seekbar = document.querySelector('.seekbar')
let songsData
let currentSongId;
let currentSongs = new Audio();

(async function () {
    const data = await (await fetch('songs.json')).json()
    songsData = data.songs
    songsData.map((item, i) => {
        const li = document.createElement('li')
        li.innerHTML = `<img src="images/play.svg" alt="">
                <p>${item.replace('./songs/', '').replace('.mp3', '')}</p>
            `
        li.id = i
        songsContainer.append(li)
    })
})()

const handlePlay = (id) => {
    currentSongs.src = songsData[id]
    currentSongs.play()
    playSong.src = './images/pause.svg'
}

songsContainer.addEventListener("click", (e) => {
    if (e.target.id) {
        currentSongId = e.target.id
        handlePlay(currentSongId)
    }
})

playSong.addEventListener('click',(e)=>{
    if(currentSongs.paused){
        currentSongs.play()
        playSong.src = './images/pause.svg'
    }else{
        currentSongs.pause()
        playSong.src = './images/play.svg'
    }
})
currentSongs.addEventListener('timeupdate', (e) => {
    currTime = Math.round(currentSongs.currentTime).toString()
    songsName.innerText = currentSongs.src.replace('http://127.0.0.1:5500/songs/', '').replace('.mp3', '')
    time.innerText = `${currTime.length==1?currTime.padStart(2,'0'):currTime} : ${Math.round(currentSongs.duration)}`
    circle.style.left = `${currentSongs.currentTime * 100 / currentSongs.duration }%`
})

seekbar.addEventListener('click',(e)=>{
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    circle.left = percent + "%"
    currentSongs.currentTime = ((currentSongs.duration ) * percent) / 100
})

nextSong.addEventListener('click',(e)=>{
    currentSongId = +currentSongId + 1
    if(currentSongId < songsData.length){
        handlePlay(currentSongId)
    }
})
prevSong.addEventListener('click',(e)=>{
    if(currentSongId > 0){
        currentSongId = +currentSongId - 1
        handlePlay(currentSongId)
    }
})