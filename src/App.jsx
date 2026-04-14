import './styles/base.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { initVoices } from "./utility/speechUtils.js"
import { useAuth } from './context/AuthContext'

import ActivationPage from "./pages/ActivationPage.jsx"
import PaymentGuard from './components/PaymentGuard.jsx'
import SignUpPage from "./pages/SignUpPage.jsx"
import Home from "./pages/Home.jsx"
import LoginPage from './pages/LoginPage.jsx'
import Review from "./pages/Review.jsx"
import Header from "./components/Header.jsx"
import Text from './pages/Text.jsx'
import Vocabulary from "./pages/Vocabulary.jsx"
import Dictation from "./pages/Dictation.jsx"
import Dashboard from './pages/Dashboard.jsx'
import Learn from "./pages/Learn.jsx"
import GradeSelector from "./pages/GradeSelector.jsx"
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import MainLayout from "./layout/MainLayout.jsx"
import LearningLayout from "./layout/LearningLayout.jsx"


function App() {
    useEffect(() => {
        initVoices()
    }, [])
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/activate" element={<ActivationPage />} />
                <Route path="/select-grade" element={<GradeSelector />} />

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
        </BrowserRouter>
    )
}

export default App