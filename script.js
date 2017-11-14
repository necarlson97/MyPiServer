var avatar;
var avatarIndex = 0;
const avatarCount = 6;
var avatarMoving = false;

window.onload = function() {
    avatar = document.getElementById("avatar");
}

function nextAvatar() {
    if(avatarMoving) return;
    
    avatarMoving = true;
    avatarIndex = (avatarIndex + 1) % avatarCount;
    avatar.src = "img/avatar"+avatarIndex+".gif";
    
    setTimeout(avatarStill, 800);
}

function avatarStill() {
    avatar.src = "img/avatar"+avatarIndex+".png";
    avatarMoving = false;
}