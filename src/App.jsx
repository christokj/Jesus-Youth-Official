import { RouterProvider } from "react-router-dom";
import './App.css';
import { Toaster } from 'sonner';
import { router } from './routes/Routes';
import { useIsChromeOnly } from "./components/BrowserSupportChecker";

function App() {
  const isChrome = useIsChromeOnly();

  if (isChrome === null) {
    return <div>Checking browser...</div>;
  }

  if (!isChrome) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>
        🚫 This application only works in Google Chrome. Please switch your browser.
      </div>
    );
  }
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
