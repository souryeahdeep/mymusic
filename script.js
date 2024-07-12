let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");

let name = document.getElementById("name");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songname: "Fly me to the Moon",
    filepath: "./songs/1.mp3'",
    coverPath: "./covers/c1.png",
  },
  {
    songname: "Abhi Na Jao Chhodkar",
    filepath: "./songs/2.mp3'",
    coverPath: "./covers/c2.png",
  },
  {
    songname: "Amaro Parano Jaha Chay",
    filepath: "./songs/3.mp3'",
    coverPath: "./covers/c3.png",
  },
  {
    songname: "Ranjish Hi Sahi",
    filepath: "./songs/4.mp3'",
    coverPath: "./covers/c4.png",
  },
  {
    songname: "Nithur Monohor",
    filepath: "./songs/5.mp3'",
    coverPath: "./covers/c5.png",
  },
  {
    songname: "Charka",
    filepath: "./songs/6.mp3'",
    coverPath: "./covers/c6.png",
  },
  {
    songname: "Nadaan Parinda",
    filepath: "./songs/7.mp3'",
    coverPath: "./covers/c7.png",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songname;
});
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("bx-play-circle");
    masterPlay.classList.add("bx-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("bx-pause-circle");
    masterPlay.classList.add("bx-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  console.log("kol");
  audioElement.currentTime = parseInt(
    (myProgressBar.value * audioElement.duration) / 100
  );
  myProgressBar.value = audioElement.currentTime;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("bx-pause-circle");
      element.classList.add("bx-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        masterSongName.innerHTML = songs[songIndex].songname;

        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("bx-play-circle");
        e.target.classList.add("bx-pause-circle");
        audioElement.src = "./songs/" + songIndex + ".mp3";
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("bx-play-circle");
        masterPlay.classList.add("bx-pause-circle");
        gif.style.opacity = 1;
      } else {
        e.target.classList.add("bx-play-circle");
        e.target.classList.remove("bx-pause-circle");
        audioElement.pause();
        masterPlay.classList.remove("bx-pause-circle");
        masterPlay.classList.add("bx-play-circle");
        gif.style.opacity = 0;
      }
    });
  }
);

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 6;
  } else {
    songIndex -= 1;
  }
  audioElement.src = "./songs/" + (songIndex + 1) + ".mp3";
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerHTML = songs[songIndex].songname;

  masterPlay.classList.remove("bx-play-circle");
  masterPlay.classList.add("bx-pause-circle");
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = "./songs/" + (songIndex + 1) + ".mp3";
  masterSongName.innerHTML = songs[songIndex].songname;

  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("bx-play-circle");
  masterPlay.classList.add("bx-pause-circle");
});
