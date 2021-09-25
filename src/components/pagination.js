import React from 'react';
import './styles/pagination.css';

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="pagination">{pageNumbers.map((number, i) => (
                <span key={i} className={(i + 1) === currentPage ? "activePage" : "page"} onClick={() => paginate(number)} href="#">{number}</span>
            ))
            }
            </div>
        </div>
    );
}

export default Pagination;