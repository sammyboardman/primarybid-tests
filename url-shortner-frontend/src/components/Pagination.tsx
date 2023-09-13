import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { IPaginationProps } from "../interfaces";

const Pagination: React.FC<IPaginationProps> = (props) => {
  const pageNumbers = [];
  const [selectedPage, setSelectedPage] = useState<number>(1);

  for (let i = 1; i <= props.pageCount; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (props.page < props.pageCount) {
      const pageNumber = props.page + 1;
      props.setPage(pageNumber);
      setSelectedPage(pageNumber);
    }
  };

  const prevPage = () => {
    if (props.page > 1) {
      const pageNumber = props.page - 1;
      props.setPage(pageNumber);
      setSelectedPage(pageNumber);
    }
  };

  const goToPage = (num: number) => {
    props.setPage(num);
    setSelectedPage(num);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item" onClick={prevPage}>
          <MdArrowBackIos title="arrow-back-id" />
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              selectedPage === number
                ? "active-page-item"
                : "page-item"
            }
            onClick={() => goToPage(number)}
          >
            {number}
          </li>
        ))}
        <li className="page-item" onClick={nextPage}>
          <MdArrowForwardIos title="arrow-next-id" />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
