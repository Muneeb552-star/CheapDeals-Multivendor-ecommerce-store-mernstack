import './index.css';
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import store from './store/index'
import { Provider } from 'react-redux'

const App = lazy(()=> import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback="loading...">
          <App />
          <Toaster toastOptions = {{ position: 'top-right' }}/>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
