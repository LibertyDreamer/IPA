// script.js

const themeSwitch = document.getElementById('theme-switch');
const toggleDebugButton = document.getElementById("toggle-debug");
const body = document.body;
const audioPlayer = document.getElementById("audio-player");
const ipaButtonsContainer = document.getElementById("ipa-buttons");
const feedback = document.getElementById("feedback");
const debugInfo = document.getElementById("debug-info");
const scoreDisplay = document.getElementById("score");

let correctCount = 0;
let incorrectCount = 0;
let currentIPA = null;
let lastAudio = null;
let debugEnabled = false; // Debug info is initially visible

// Theme switching
themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeSwitch.textContent = body.classList.contains('dark') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
});

// Toggle Debug Info
toggleDebugButton.addEventListener("click", () => {
    debugEnabled = !debugEnabled; // Toggle visibility
    debugInfo.style.display = debugEnabled ? "block" : "none";
    toggleDebugButton.textContent = debugEnabled ? "Hide Debug Info" : "Show Debug Info";
});

// Create IPA buttons
Object.keys(sounds).forEach((ipa) => {
    const button = document.createElement("button");
    button.className = "ipa-button";
    button.textContent = ipa;
    button.onclick = () => checkAnswer(ipa);
    ipaButtonsContainer.appendChild(button);
});

function playSound() {
    const ipaKeys = Object.keys(sounds);
    currentIPA = ipaKeys[Math.floor(Math.random() * ipaKeys.length)];
    const randomAudio = sounds[currentIPA][Math.floor(Math.random() * sounds[currentIPA].length)];
    lastAudio = randomAudio;
    audioPlayer.src = randomAudio;
    audioPlayer.play();
    updateDebugInfo(`Played sound: ${randomAudio} for IPA: ${currentIPA}`);
}

function repeatSound() {
    if (lastAudio) {
        audioPlayer.src = lastAudio;
        audioPlayer.play();
        updateDebugInfo(`Repeated sound: ${lastAudio}`);
    } else {
        feedback.textContent = "No sound to repeat! Play a sound first.";
        feedback.style.color = "#f44336";
        updateDebugInfo("Repeat sound attempted without a previous sound.");
    }
}

function checkAnswer(selectedIPA) {
    const isCorrect = selectedIPA === currentIPA;
    feedback.textContent = isCorrect ? "Correct!" : "Incorrect!";
    feedback.style.color = isCorrect ? "#4CAF50" : "#f44336";

    if (isCorrect) {
        correctCount++;
        playSound(); // Automatically play the next sound
    } else {
        incorrectCount++;
    }
    updateScore();

    setTimeout(() => {
        feedback.textContent = "";
    }, 3000);

    updateDebugInfo(`Checked answer: Selected IPA: ${selectedIPA}, Correct IPA: ${currentIPA}`);
}

function updateScore() {
    scoreDisplay.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;
}

//debug info updater
function updateDebugInfo(message) {
    if (debugEnabled) {
        const time = new Date().toLocaleTimeString();
        debugInfo.innerHTML = `<strong>Debug Info (${time}):</strong><br>${message}`;
    }
}
