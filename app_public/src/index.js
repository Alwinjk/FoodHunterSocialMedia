import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';



const store = configureStore();
const persistor = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={<div>loading...</div>}
          persistor={persistor}  
        >
          <App />
        </PersistGate>
          
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
