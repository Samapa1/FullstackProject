import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' 
// import store from './store'
import  { setUpStore } from './store'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={setUpStore()}>
    <App />
  </Provider>
)


  