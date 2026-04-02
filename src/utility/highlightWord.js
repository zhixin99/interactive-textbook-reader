export default function highlightWord(sentence, word) {
    if (!sentence || !word) return sentence

    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    return sentence.replace(
        regex,
        <span className="highlight-word">$1</span>
    );
}