import ClipLoader from "react-spinners/ClipLoader";

export const Loader = (props) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#808080"
        size={props.size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
