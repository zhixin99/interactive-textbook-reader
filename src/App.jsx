import './styles/base.css'
import {  Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { initVoices } from "./utility/speechUtils.js"

import ActivationPage from "./pages/ActivationPage.jsx"
import PaymentGuard from './components/PaymentGuard.jsx'
import SignUpPage from "./pages/SignUpPage.jsx"
import Home from "./pages/Home.jsx"
import LoginPage from './pages/LoginPage.jsx'
import Review from "./pages/Review.jsx"
import Text from './pages/Text.jsx'
import Vocabulary from "./pages/Vocabulary.jsx"
import Dictation from "./pages/Dictation.jsx"
import Dashboard from './pages/Dashboard.jsx'
import Learn from "./pages/Learn.jsx"
import GradeSelector from "./pages/GradeSelector.jsx"
import MainLayout from "./layout/MainLayout.jsx"
import LearningLayout from "./layout/LearningLayout.jsx"
import HomeLayout from "./layout/HomeLayout.jsx"


function App() {
    useEffect(() => {
        initVoices()
    }, [])
    

    return (
        
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/activate" element={<ActivationPage />} />
                    <Route path="/select-grade" element={<GradeSelector />} />
                </Route>


                <Route element={<PaymentGuard />}>
                    <Route element={<LearningLayout />}>
                        <Route path="/learn/:grade/:semester/:unit/text" element={<Text />} />
                        <Route path="/learn/:grade/:semester/:unit/vocabulary" element={<Vocabulary />} />
                        <Route path="/learn/:grade/:semester/:unit/dictation" element={<Dictation />} />    
                    </Route>

                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="/review" element={<Review />} />
                    </Route>

                </Route>

            </Routes>
        
    )
}

export default App