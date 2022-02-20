import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { store } from "./config/reduxConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <AppRouter />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
