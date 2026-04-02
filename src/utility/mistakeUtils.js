const STORAGE_KEY = "textbook-mistakes"

export function saveMistake(vocabId) {
    const savedData = localStorage.getItem(STORAGE_KEY)
    const mistakes = savedData ? JSON.parse(savedData) : {}

    if (mistakes[vocabId]) {
        mistakes[vocabId].count += 1
        mistakes[vocabId].lastMissed = new Date().toISOString()
    } else {
        mistakes[vocabId] = {
            count: 1,
            lastMissed: new Date().toISOString()
        };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
}

export function getMistakeList() {
    const savedData = localStorage.getItem(STORAGE_KEY)
    return savedData ? JSON.parse(savedData) : {}
}

export function clearMistake(vocabId) {
    const mistakes = getMistakeList()
    delete mistakes[vocabId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes))
}