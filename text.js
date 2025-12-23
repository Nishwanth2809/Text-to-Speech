const textEL = document.getElementById('text');
const speakEL = document.getElementById('speak');
const stopEL = document.getElementById('stop');
const voiceSelect = document.getElementById('voices');

const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const volume = document.getElementById('volume');

const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');
const volumeValue = document.getElementById('volumeValue');

let voices = [];


function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

window.speechSynthesis.onvoiceschanged = loadVoices;


function speakText() {
    window.speechSynthesis.cancel(); 

    const text = textEL.value;
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);

    
    utterance.voice = voices[voiceSelect.value];

    
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    utterance.volume = volume.value;

    window.speechSynthesis.speak(utterance);
}


function stopSpeech() {
    window.speechSynthesis.cancel();
}

speakEL.addEventListener("click", speakText);
stopEL.addEventListener("click", stopSpeech);


rate.oninput = () => rateValue.textContent = rate.value;
pitch.oninput = () => pitchValue.textContent = pitch.value;
volume.oninput = () => volumeValue.textContent = volume.value;
