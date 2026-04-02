import './styles/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { initVoices } from "./utility/speechUtils.js"

import Home from "./pages/Home.jsx"
import Review from "./pages/Review.jsx"
import Header from "./components/Header.jsx"
import Text from './pages/Text.jsx'
import Vocabulary from "./pages/Vocabulary.jsx"
import Dictation from "./pages/Dictation.jsx"


function App() {
    useEffect(() => {
        initVoices()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><Header /><Home /></>} />
                <Route path="/text/:grade/:semester/:unit" element={<Text />} />
                <Route path="/vocabulary/:grade/:semester/:unit" element={<Vocabulary />} />
                <Route path="/dictation/:grade/:semester/:unit" element={<Dictation />} />
                <Route path="/review/:grade/:semester/:unit" element={<Review />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App