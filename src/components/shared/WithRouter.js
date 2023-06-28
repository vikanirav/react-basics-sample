import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
  return (
    <WrappedComponent
      {...props}
      navigate={useNavigate()}
      params={useParams()}
      location={useLocation()}
    />
  );
};
