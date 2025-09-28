import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const navigate = useNavigate();
  const { isLoading, user, isAuthenticated } = useUser();

  // 2.If there is no authenticated uer, redirect to login page
  useEffect(
    function () {
      console.log("user", user);
      console.log("isAuthenticated", isAuthenticated);
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isLoading, user, isAuthenticated, navigate]
  );

  // 3. While loading, show spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4.If there is a user, then render the app

  return children;
}

export default ProtectedRoute;
