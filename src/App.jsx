import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { store } from "./config/reduxConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AppRouter />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
