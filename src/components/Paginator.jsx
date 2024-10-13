import React from 'react';

const Paginator = ({ skip, limit, totalItems, handleNextPage, handlePreviousPage }) => {
    return (
        <div className="pagination-buttons d-flex justify-content-center my-3">
            <button onClick={handlePreviousPage} disabled={skip === 0}>
                Página Anterior
            </button>
            <button onClick={handleNextPage} disabled={skip + limit >= totalItems}>
                Página Siguiente
            </button>
        </div>
    );
};

export default Paginator;
