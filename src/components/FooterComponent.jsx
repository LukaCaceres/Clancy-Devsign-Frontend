import React from 'react'
import '../styles/footer.css'

const FooterComponent = () => {
    return (
        <div className="footer-container w-100 d-flex justify-content-center gap-4 gap-xl-0 justify-content-lg-between align-items-center px-4 text-light">
            <div className="logo-container-footer">
                <img src="src/assets/images/clancy-white-logo.webp" alt="clany devsign logo" className='logo-clancy-footer' />
            </div>
            
            <div className="redes-conocenos-container d-flex justify-content-center gap-4">
                <div className="redes-container">
                    <h4>Redes</h4>
                    <ul >
                        <li className='item-lista d-flex align-items-center gap-2'>
                            <img src="src/assets/images/whatsapp-logo.webp" alt="Whatsapp Logo" />
                            <a href="https://wa.me/+543815601860" target='_blank' className='text-light'>Whatsapp</a>
                        </li>
                        <li className='item-lista d-flex align-items-center gap-2'>
                            <img src="src/assets/images/instagram-logo.webp" alt="Instagram Logo" />
                            <a href="https://www.instagram.com/clancy.devsign/" className='text-light' target='_blank'>Instagram</a>
                        </li>
                        <li className='item-lista d-flex align-items-center gap-2'>
                            <img src="src/assets/images/mail-logo.webp" alt="Mail Logo" />
                            <a href="mailto:clancydevsingbusiness@gmail.com" className='text-light' target='_blank'>Correo</a>
                        </li>
                    </ul>
                </div>
                <div className="conocenos-container d-none d-lg-inline-block">
                    <h4>Conocenos</h4>
                    <div className="item-lista d-flex align-items-center gap-2">
                        <img src="src/assets/images/portfolio-logo.webp" alt="Portfolio Logo" />
                        <a href="https://clancydevsingportfolio.netlify.app/" className='text-light' target='_blank'>Portfolio</a>
                    </div>
                </div>
            </div>

            <div className="copy-qr-container d-none d-lg-flex flex-column align-items-end gap-2">
                <img src="src/assets/images/qr.webp" alt="QR Fiscal" />
                <p className='text-end'>Clancy Devsign - Todos los derechos reservados 2024</p>
            </div>
        </div>
    )
}

export default FooterComponent