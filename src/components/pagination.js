import React from 'react';
import './styles/pagination.css';

function Pagination({ quizizzPerPage, totalQuizizz, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalQuizizz / quizizzPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="pagination">{pageNumbers.map((number, i) => (
                <a className={(i + 1) === currentPage ? "activePage" : "page"} onClick={() => paginate(number)} href="#">{number}</a>
            ))
            }
            </div>
        </div>
    );
}

export default Pagination;