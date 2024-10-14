import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Paginator from '../components/Paginator';
import Producto from '../components/Producto';

const ResultadosPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query').toUpperCase();
    const [searchResults, setSearchResults] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [skip, setSkip] = useState(0);  // Para controlar el inicio de la paginación
    const [limit] = useState(8);  // Límite de productos por página

    //Agregar handlefav y handlecart

    useEffect(() => {
        if (query) {
            setSearchResults([]);
            setTotalItems(0);
            fetchSearchResults();
        }
    }, [query, skip]);

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`https://clancydevsign-backend.onrender.com/api/producto?query=${query}&skip=${skip}&limit=${limit}`);
            const data = await response.json();

            const filteredResults = data.productos.filter(producto => 
                (producto.nombre.toUpperCase().includes(query) || 
                producto.categoria.toUpperCase().includes(query)) && 
                producto.activo === true
            );

            setSearchResults([...filteredResults]);
            setTotalItems(filteredResults.length);
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
        <div className="search-results-page container-fluid px-4 vh-100">
            <h2 className='my-4'>Resultados de búsqueda para: "{query}"</h2>
            <div className="results-list row d-flex justify-content-start">
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <Producto 
                                nombre={product.nombre} 
                                precio={product.precio} 
                                img={product.imagenes[0]} 
                            />
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

export default ResultadosPage;
