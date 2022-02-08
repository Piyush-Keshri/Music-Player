const image = document.querySelector('img');
const title = document.querySelector('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [{
    name: '1',
    displayName: 'Track 1',
    artist: 'Jacinto',
},
{
    name: '2',
    displayName: 'Track 2',
    artist: 'Paul',
},
{
    name: '3',
    displayName: 'Track 3',
    artist: 'Bobby',
},
{
    name: 'metric-1',
    displayName: 'Track 4',
    artist: 'Sunny',
}];

// Check if Playing
let isPlaying = false;

// Play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

//Next Song 
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load 
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);