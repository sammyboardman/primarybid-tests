import { render, fireEvent } from "@testing-library/react";
import Pagination from "../../components/Pagination";

// Mock the setPage function
const mockSetPage = jest.fn();

const defaultProps = {
  pageCount: 5,
  page: 1,
  setPage: mockSetPage,
};

test("renders pagination correctly", () => {
  const { container, getAllByRole } = render(<Pagination {...defaultProps} />);

  expect(container).toMatchSnapshot();

  const paginationItems = getAllByRole("listitem");
  expect(paginationItems).toHaveLength(7);
});

test("clicking next button calls nextPage function", () => {
  const { getByTitle } = render(<Pagination {...defaultProps} />);

  const nextButton = getByTitle("arrow-next-id");
  fireEvent.click(nextButton);

  expect(mockSetPage).toHaveBeenCalledWith(2);
});

test("clicking previous button calls prevPage function", () => {
  const {  getByTitle } = render(<Pagination {...defaultProps} page={2} />);

  const prevButton = getByTitle("arrow-back-id");
  fireEvent.click(prevButton);

  expect(mockSetPage).toHaveBeenCalledWith(1);
});

test("clicking page number calls goToPage function", () => {
  const { getByText } = render(<Pagination {...defaultProps} />);

  const pageNumber3 = getByText("3");
  fireEvent.click(pageNumber3);

  expect(mockSetPage).toHaveBeenCalledWith(3);
});
