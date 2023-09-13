import { ErrorMessage, Field, Formik } from "formik";
import { BiLink } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useShortenUrl } from "../hooks";

const Snip = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/snipped-urls");
  };
  const { onSubmit, isUrlValid, loading, shortenedUrl, errorMessage } =
    useShortenUrl();

  return (
    <>
      <div className="top">
        <h1 className="logo">SnipURL</h1>
      </div>

      <Formik
        initialValues={{
          mainUrl: "",
        }}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => {
          return (
            <div className="form">
              {loading && (
                <>
                  <p>Loading</p>
                  <BarLoader color={`#003c97`} loading={loading} />
                </>
              )}
              {errorMessage && (
                <div className="error-banner">
                  <div className="p-5 border-danger">
                    <p className="text-danger"> {errorMessage} </p>
                  </div>
                </div>
              )}
              <h3>Shorten New Link</h3>
              <p>
                SnipURL is a user-friendly and effective URL shortening service
                designed to optimise your online experience
              </p>
              <label htmlFor="shorten">
                Original URL <BiLink />
              </label>
              <Field
                type="text"
                placeholder="Enter the Link here"
                name="mainUrl"
                id="mainUrl"
                validate={isUrlValid}
                value={values.mainUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
               <ErrorMessage name="mainUrl" component="div" className="error" />
              {shortenedUrl && (
                <>
                  <label htmlFor="shorten">
                    Shortened URL <BiLink />
                  </label>
                  <input
                    type="text"
                    name="shortenedUrl"
                    id="shortenedUrl"
                    disabled
                    value={shortenedUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </>
              )}

              <button
                className="btn"
                type="submit"
                onClick={() => handleSubmit()}
              >
                Shorten Link
              </button>

              <button
                className="btn-view-all"
                type="submit"
                onClick={() => handleButtonClick()}
              >
                View All Shortened Urls
              </button>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Snip;
