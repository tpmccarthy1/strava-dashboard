import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "./components/auth/userSlice";
import GlobalStyle from "./styles/global-styles";
import Footer from "./components/footer";

const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));

const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  useEffect(() => {
    document.title = "Strava Dashboard"
  }, []);
  let token = useSelector(selectToken);
  return (
    <React.Suspense fallback={<p>Please log in.</p>}>
      <GlobalStyle />
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      <Footer />
    </React.Suspense>
  );
}

export default App;
