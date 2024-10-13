import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage';
import Error404Page from './pages/Error404Page';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
// import SearchResults from './pages/SearchResults';




function App() {

    return (
        <>

            <Router>
                <header className='position-sticky top-0'>
                    <NavbarComponent />
                </header>

                <main className='h-100'>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path='/registro' element={<RegistroPage />} />           
                        {/* <Route path='/resultados' element={<SearchResults/>} /> */}
                        {/* <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} /> */}
                        <Route path='*' element={<Error404Page />} />
                    </Routes>
                </main>

                <footer className='overflow-x-hidden'>
                    <FooterComponent/>
                </footer>
            </Router>
        </>
    )
}

export default App
