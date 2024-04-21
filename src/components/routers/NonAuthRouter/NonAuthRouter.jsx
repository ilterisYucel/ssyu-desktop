import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage } from "../../pages/index.js";

const NonAuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route errorElement={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default NonAuthRouter;