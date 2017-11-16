var avatar;
var avatarIndex = 0;
const avatarCount = 6;
var avatarMoving = false;
var res = 16;

window.onload = function() {
    avatar = document.getElementById("avatar");
    setRes();
    nextAvatar();
}

function nextAvatar() {
    if(avatarMoving) return;
    
    avatarMoving = true;
    avatarIndex = (avatarIndex + 1) % avatarCount;
    avatar.src = "img/"+res+"/avatar"+avatarIndex+".gif";
    
    setTimeout(avatarStill, 800);
}

function avatarStill() {
    avatar.src = "img/"+res+"/avatar"+avatarIndex+".png";
    avatarMoving = false;
}

function setRes() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600)
       res = 128;
}