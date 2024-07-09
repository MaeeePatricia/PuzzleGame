document.addEventListener('DOMContentLoaded', function () {

    var kuromiHide,
        remainingAttempts,
        noticeElement = document.getElementById("notice"),
        outcomeImage = document.getElementById("outcome-image"),
        sanrioImages = document.querySelectorAll(".hunt-image"),
        successSound = document.getElementById("success-sound"),
        failSound = document.getElementById("fail-sound"),
        kuromisong = document.getElementById('background-music');

    var hiddenTreasureImg = new Image();
    hiddenTreasureImg.src = "treasure.jpg";
    var mistakeImg = new Image();
    mistakeImg.src = "wrong.jpg";
    var cheerGif = new Image();
    cheerGif.src = "happy.gif";
    var sadGif = new Image();
    sadGif.src = "huhu.gif";
    var defaultImg = "kuromilove.jpg";

    function stopAllSounds() {
        successSound.pause();
        successSound.currentTime = 0;
        failSound.pause();
        failSound.currentTime = 0;
    }

    function startHunt() {
        kuromiHide = Math.floor(Math.random() * 9) + 1;
        remainingAttempts = 3;
        noticeElement.innerText = "Where is the real Kuromi?";
        sanrioImages.forEach(function (image) {
            image.src = defaultImg; 
            image.classList.remove('inactive');
        });
        outcomeImage.src = defaultImg;
    }

    function finishHunt() {
        sanrioImages.forEach(function (image) {
            image.classList.add('inactive');
        });
    }

    sanrioImages.forEach(function (image, index) {
        image.addEventListener("click", function () {
            if (remainingAttempts > 0 && !image.classList.contains('inactive')) {
                stopAllSounds();
                if (index + 1 === kuromiHide) {
                    image.src = hiddenTreasureImg.src;
                    outcomeImage.src = cheerGif.src;
                    noticeElement.innerText = "Very good! You've found her. Restarting. . .";
                    successSound.play();
                    setTimeout(startHunt, 5000);
                } else {
                    image.src = mistakeImg.src;
                    outcomeImage.src = sadGif.src;
                    remainingAttempts--;
                    if (remainingAttempts > 0) {
                        noticeElement.innerText = "Incorrect! Attempts remaining: " + remainingAttempts;
                    } else {
                        noticeElement.innerText = "No more attempts! Game over.";
                        finishHunt();
                    }
                    failSound.play();
                }
            }
        });
    });

    startHunt();
});