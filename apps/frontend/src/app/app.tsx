import { Route, Routes, Link } from 'react-router-dom';

import { DeepkitClientContextProvider } from '@nx-deepkit-react-vite-type-compiler-unexpected-node-error/ui';

export function App() {
  return (
    // instantiate after user credentials have been obtained
    <DeepkitClientContextProvider
      token={import.meta.env.NX_ACCESS_TOKEN}
      endpoint={import.meta.env.NX_ENDPOINT}
    >
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </DeepkitClientContextProvider>
  );
}
