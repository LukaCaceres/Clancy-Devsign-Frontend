import React from 'react';
import '../styles/error404.css';
import { Link } from 'react-router-dom';

const Error404Page = () => {
    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-container">
            <div className="text-center error-container d-flex flex-column justify-content-center align-items-center gap-2">
                <h1 className="fs-1">Error 404</h1>
                <h2 className="fs-4">Página no encontrada</h2>
                <p className="fs-6">
                    Lo sentimos, la página que buscas no existe o está en construcción.
                </p>

                <Link
                    to="/"
                    className="btn btn-error p-2 px-4 fs-4"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}

export default Error404Page