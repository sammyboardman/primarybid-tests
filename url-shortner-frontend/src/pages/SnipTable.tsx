import moment from "moment";
import { useState } from "react";
import { Pagination } from "../components";
import { BarLoader } from "react-spinners";
import { useFetchGeneratedUrls } from "../hooks";
import { useNavigate } from "react-router-dom";

const SnipTable: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  
  const { loading, data, errorMessage, pageCount, totalCount } =
    useFetchGeneratedUrls({
      page,
      limit: 20,
    });

  return (
    <>
      <div className="top">
        <h1 className="logo">SnipURL</h1>

        <button className="btn" onClick={goHome}>
          Shorten Link
        </button>
      </div>
      {loading && (
        <>
          <p>Loading</p>
          <BarLoader color={`#003c97`} loading={loading} />
        </>
      )}
      {errorMessage ? (
        <div className="error-banner">
          <div className="p-5 border-danger">
            <p className="text-danger"> {errorMessage} </p>
          </div>
        </div>
      ) : null}
      {data && (
        <div className="whiteTable">
          <table>
            <thead>
              <tr>
                <th> Date Created </th>
                <th> Original Url </th>
                <th> Shortened Url </th>
              </tr>
            </thead>
            <tbody>
              {data.urls.map((x, i) => (
                <tr key={i}>
                  <td>{moment(x.createdAt).format("DD/MM/YY")} </td>
                  <td> {x.mainUrl} </td>
                  <td> {x.shortenedUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pageCount && totalCount ? (
        <Pagination
          pageCount={pageCount}
          totalCount={totalCount}
          page={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
};

export default SnipTable;
