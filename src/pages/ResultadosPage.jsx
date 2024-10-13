import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Paginator from '../components/Paginator';  

const ResultadosPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');  // Obtener el término de búsqueda desde la URL
    const [searchResults, setSearchResults] = useState([]);
    const [totalItems, setTotalItems] = useState(0); 
    const [skip, setSkip] = useState(0);  // Para controlar el inicio de la paginación
    const [limit] = useState(10);  // Límite de productos por página

    useEffect(() => {
        if (query) {
            fetchSearchResults();
        }
    }, [query, skip]);

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`https://clancydevsign-backend.onrender.com/api/producto?query=${query}&skip=${skip}&limit=${limit}`);
            const data = await response.json();
            setSearchResults(data.productos);
            setTotalItems(data.total); 
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleNextPage = () => {
        setSkip(prevSkip => prevSkip + limit);
    };

    const handlePreviousPage = () => {
        if (skip >= limit) {
            setSkip(prevSkip => prevSkip - limit);
        }
    };

    return (
        <div className="search-results-page container vh-100 w-100">
            <h2>Resultados de búsqueda para: "{query}"</h2>

            <div className="results-list">
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <div key={product._id} className="product-item">
                            <h3>{product.nombre}</h3>
                            <p>Precio: ${product.precio}</p>                    
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos para la búsqueda "{query}"</p>
                )}
            </div>

            {/* Componente de paginación */}
            {searchResults.length > 0 && (
                <Paginator
                    skip={skip}
                    limit={limit}
                    totalItems={totalItems}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                />
            )}
        </div>
    );
};

export default ResultadosPage