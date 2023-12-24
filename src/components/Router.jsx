import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export const Router = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
};
