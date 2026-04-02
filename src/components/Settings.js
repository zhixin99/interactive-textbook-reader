const translateCheckbox = document.getElementById("translate-checkbox")
const rateSelect = document.getElementById("rate-select")
const voiceSelect = document.getElementById("voice-select")

import { getDefaultVoiceIndex, initVoices } from "./voice.js"

export function renderSettings() {
    const settingsBtn = document.getElementById("settings-btn")
    const closeBtn = document.getElementById("close-btn")
    const overlay = document.getElementById("settings-overlay")

    function openSettings() {
    document.body.classList.add("settings-open")
    }

    function closeSettings() {
    document.body.classList.remove("settings-open")
    }

    settingsBtn.addEventListener("click", openSettings)
    closeBtn.addEventListener("click", closeSettings)
    overlay.addEventListener("click", closeSettings)


    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeSettings()
        }
    })
}

export function loadSettings() {

    const settingTranslate = localStorage.getItem("setting-translate")
    const settingRate = localStorage.getItem("setting-rate")
    const settingVoice = localStorage.getItem("setting-voice")

    if (settingTranslate === null) {
        translateCheckbox.checked = true;
        localStorage.setItem("setting-translate", "true")
    } else {
        translateCheckbox.checked = settingTranslate === "true"
    }

    
    if (settingRate === null) {
        rateSelect.value="0.9"
        localStorage.setItem("setting-rate", "0.9")
    } else {
        rateSelect.value = localStorage.getItem("setting-rate")
    }

    initVoices(englishVoices => {
        voiceSelect.innerHTML = englishVoices.map((voice, index) =>
            `<option value="${index}">
            ${voice.name} (${voice.lang})
            </option>`
        ).join("")

        if (settingVoice === null) {
            localStorage.setItem("setting-voice", getDefaultVoiceIndex())
        }
        
        voiceSelect.selectedIndex = Number(localStorage.getItem("setting-voice"))
    }) 
}

export function listenSettings() {
    translateCheckbox.addEventListener("change", () => {
        localStorage.setItem("setting-translate", translateCheckbox.checked)
    })

    rateSelect.addEventListener("change", () => {
        localStorage.setItem("setting-rate", rateSelect.value)
        console.log(`Rate change ${localStorage.getItem("setting-rate")}`)
        
    })

    voiceSelect.addEventListener("change", () => {
        localStorage.setItem("setting-voice", voiceSelect.selectedIndex)
        console.log(`Voice change ${localStorage.getItem("setting-voice")}`)
        
    })
}


