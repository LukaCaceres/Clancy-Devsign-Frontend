import React from 'react'
import '../styles/producto.css'
const Producto = ({ nombre, precio, img }) => {
    return (
        <div className="producto-container d-flex flex-column justify-content-between">
            <div className="imagen-producto-container d-flex justify-content-center align-items-center">
                <img src={img} alt={`Imagen de ${nombre}`} className='img-producto' />
            </div>
            <div className="info-container d-flex justify-content-between align-items-end">
                <div className="nombre-precio-container text-light fw-bold d-flex flex-column gap-2">
                    <h3>{nombre}</h3>
                    <h3>${precio}</h3>
                </div>
                <div className="cart-fav-container d-flex flex-column gap-2">
                    <img src="https://i.postimg.cc/3R3VGrZX/fav.png" alt="Agregar a favoritos" className='icon-img'/>
                    <img src="https://i.postimg.cc/XvftXB9N/cart.png" alt="Agregar al carrito" className='icon-img' />
                </div>
            </div>
        </div>
    )
}

export default Producto