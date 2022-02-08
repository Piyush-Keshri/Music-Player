const image = document.querySelector('img');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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
    songTitle.textContent = song.displayName;
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

// Update Progress Bar and Time.
function updateProgressBar(e){
    if(isPlaying){
        const{duration,currentTime} = e.srcElement;
        
        // Update ProgressBar Width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate Display For duration
        const durationMinutes = Math.floor(duration/60)+'';
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
       
        // Delay Switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent =`${durationMinutes}:${durationSeconds}`;
        }

        // Calculate Display For Current
        const currentMinutes = Math.floor(currentTime / 60) + '';
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);