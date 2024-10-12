import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage';
import Error404Page from './pages/Error404Page';




function App() {

    return (
        <>
    <Router>

        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path='/registro' element={<RegistroPage/>} />
            <Route path='*' element={<Error404Page/>} />
            {/* <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} /> */}
        </Routes>
    </Router>
        </>
    )
}

export default App
