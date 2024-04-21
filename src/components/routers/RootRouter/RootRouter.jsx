import React, { useState } from "react";
import AuthRouter from "../AuthRouter";
import NonAuthRouter from "../NonAuthRouter";

const RootRouter = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const router = loggedIn ? <AuthRouter /> : <NonAuthRouter />;
  return router;
}

export default RootRouter;