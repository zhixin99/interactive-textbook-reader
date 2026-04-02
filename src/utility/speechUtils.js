let englishVoices = []
const synth = window.speechSynthesis

export function initVoices(callback) {
    function load() {
        englishVoices = synth.getVoices().filter(v =>
        v.lang.startsWith("en")
        )
        callback?.(englishVoices)
    }

    if (synth.getVoices().length) {
        load()
    } else {
        speechSynthesis.onvoiceschanged = load
    }
}
   

export function speak(text) {
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const index = englishVoices.findIndex(v =>
                v.name.includes("Google") && v.lang === "en-US"
            ) 
    utterance.rate = 1
    utterance.voice = englishVoices[index === -1 ? 0 : index]
    synth.speak(utterance)
}