export default function highlightWord(sentence, word) {
    if (!sentence || !word) return sentence

    const regex = new RegExp(`\\b(${word})\\b`, "gi")

    const parts = sentence.split(regex)
    return parts.map((part, index) => 
        part.toLowerCase() === word.toLowerCase() ? 
        (<span key={index} className="highlight-word">{part}</span>) : 
        (part)) 
}