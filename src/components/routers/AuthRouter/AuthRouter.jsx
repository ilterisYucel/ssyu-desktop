import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CustomersPage,
  MembershipsPage,
  DashboardPage,
  ErrorPage,
} from "../../pages/index.js";
import {
  CustomerContextProvider,
  MembershipContextProvider,
} from "../../../context/index.js";

const AuthRouter = () => {
  return (
    <CustomerContextProvider>
      <MembershipContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/memberships" element={<MembershipsPage />} />
            <Route errorElement={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </MembershipContextProvider>
    </CustomerContextProvider>
  );
};

export default AuthRouter;
