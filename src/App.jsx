import { RouterProvider } from "react-router-dom";
import './App.css';
import { Toaster } from 'sonner';
import { router } from './routes/Routes';
import { useIsChromeOnly } from "./components/BrowserSupportChecker";

function App() {
  const isChrome = useIsChromeOnly();

  if (isChrome === null) {
    // Optional: a loading state while detection runs
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Checking browser compatibility...
      </div>
    );
  }

  if (!isChrome) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#fff',
        backgroundColor: '#d32f2f',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Your browser is not supported this modern website. Please use Google Chrome.
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
