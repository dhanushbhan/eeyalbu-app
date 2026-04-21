import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "mapbox-gl/dist/mapbox-gl.css";
import { StoreProvider } from "./stores/StoreProvider.jsx";
import { createRootStore } from "./stores/RootStore.js";

const rootStore = createRootStore();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider store={rootStore}>
      <App />
    </StoreProvider>
  </StrictMode>,
)
