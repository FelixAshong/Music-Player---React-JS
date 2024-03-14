import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Bad Boy',
    songArtist: 'Kofi Mante FT Bisa Kdei',
    songSrc: './Assets/songs/Kofi Mante.mp3',
    songAvatar: './Assets/Images/Kofi mate.jpeg'
  })

  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0)
  const [volume, setVolume] = useState(1);
  const currentAudio = useRef();
  const [showMusicList, setShowMusicList] = useState(false); // State variable to track whether music list is displayed or not

  const handleMusicProgressBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  //Change Avatar Class
  let avatarClass = ['objectFitCover','objectFitContain','none']
  const [avatarClassIndex, setAvatarClassIndex] = useState(0)
  const handleAvatar = ()=>{
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0)
    }else{
      setAvatarClassIndex(avatarClassIndex + 1)
    }
  }

  // Function to toggle display of music list
  const toggleMusicList = () => {
    setShowMusicList(!showMusicList);
  };

  // Function to handle when a music item is clicked
  const handleMusicItemClick = (index) => {
    setMusicIndex(index);
    updateCurrentMusicDetails(index);
    toggleMusicList(); // Close music list after selecting a song
  };

  //Play Audio Function
  const handleAudioPlay = ()=>{
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }

  const musicAPI = [
    {
      songName: 'Bad Boy',
      songArtist: 'Kofi Mante FT Bisa Kdei',
      songSrc: './Assets/songs/Kofi Mante.mp3',
      songAvatar: './Assets/Images/Kofi mate.jpeg'
    },
    {
      songName: 'Divine',
      songArtist: 'Rema',
      songSrc: './Assets/songs/Rema - Divine.mp3',
      songAvatar: './Assets/Images/Rema.jpeg'
    },
    {
      songName: 'No Stylist',
      songArtist: 'French Montana ft Drake',
      songSrc: './Assets/songs/French Montana  No Stylist ft Drake.mp3',
      songAvatar: './Assets/Images/Drake.jpeg'
    },
    {
      songName: 'Anabella',
      songArtist: 'Khaid',
      songSrc: './Assets/songs/Khaid - Anabella.mp3',
      songAvatar: './Assets/Images/Khalid.jpeg'
    },
    {
      songName: 'Headache',
      songArtist: 'Lord-Paper',
      songSrc: './Assets/songs/Lord-Paper-Headache.mp3',
      songAvatar: './Assets/Images/paper.jpeg'
    },
    {
      songName: 'Healing',
      songArtist: 'Tion Wayne',
      songSrc: './Assets/songs/Tion Wayne - Healing.mp3',
      songAvatar: './Assets/Images/healing.jpeg'
    },
    {
      songName: 'Make It Rain',
      songArtist: 'FatJoe',
      songSrc: './Assets/songs/FatJoe - Make It Rain.mp3',
      songAvatar: './Assets/Images/rain.jpeg'
    },
    {
      songName: 'Dzigbordi',
      songArtist: 'Lord Paper',
      songSrc: './Assets/songs/Lord Paper  Dzigbordi .mp3',
      songAvatar: './Assets/Images/lord.jpeg'
    }
  ]

  const handleNextSong = ()=>{
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = ()=>{
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number)=>{
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    })
    setIsAudioPlaying(true);
  }

  const handleAudioUpdate = ()=>{
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }


  const handleVolumeChange = (event) => {
  const volume = event.target.value;
  currentAudio.current.volume = volume;
  setVolume(volume);
};

  const vidArray = ['./Assets/Videos/video1.mp4','./Assets/Videos/video2.mp4','./Assets/Videos/video3.mp4','./Assets/Videos/video4.mp4','./Assets/Videos/video5.mp4','./Assets/Videos/video6.mp4'];

  const handleChangeBackground = ()=>{
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    }else{
      setVideoIndex(videoIndex + 1)
    }
  }




  return (
    <>
    <div className="container">
      <audio src='./Assets/songs/Chasing - NEFFEX.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='musicPlayer'>Music Player</p>
        <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'/>
        <div className="musicTimerDiv">
          <p className='musicCurrentTime'>{musicCurrentTime}</p>
          <p className='musicTotalLenght'>{musicTotalLength}</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
          </div>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
      
      {/* Icon to toggle display of music list */}
      <i className="fas fa-music music-icon" onClick={toggleMusicList}></i>
        </div>

        {/* Conditional rendering of music list */}
        {showMusicList && (
          <div className="musicList">
            {musicAPI.map((music, index) => (
              <div key={index} className="musicItem" onClick={() => handleMusicItemClick(index)}>
                <p>{music.songName}</p>
                <p>{music.songArtist}</p>
                </div>
        

      </div>
    ))}
  </div>
)}

      
      <div className="changeBackBtn" onClick={handleChangeBackground}>
        Change Background
      </div>
    </div>
    </>
  );
}

export default App;
