import { Provider } from 'react-redux';
import './App.css';
import AppRouter from './routes/AppRouter';
import { store } from './config/reduxConfig';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
