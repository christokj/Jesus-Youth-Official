import { RouterProvider } from "react-router-dom";
import './App.css';
import { Toaster } from 'sonner';
import { router } from './routes/Routes';
import BrowserSupportChecker from "./components/BrowserSupportChecker";

function App() {
  return (
    <>
      <BrowserSupportChecker />
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
