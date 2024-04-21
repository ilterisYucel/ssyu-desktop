import { useRouteError } from "react-router-dom";

import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Bulunamadı!</h1>
      <p>Bir şeyler ters gitti.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}