/**
 * App — Root application component.
 *
 * Renders the application router. All routing logic,
 * layout wrapping, and page components are defined in router.tsx.
 * Global styles are imported in main.tsx.
 */

import { AppRouter } from "./app/router";

export default function App() {
  return <AppRouter />;
}
