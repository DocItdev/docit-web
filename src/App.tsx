import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { store } from "./config/reduxConfig";
import { ReactQueryDevtools } from "react-query/devtools";


const queryClient = new QueryClient();

function App() {
  return (
    <>
    <Provider store={store}>
      {/* @ts-ignore */}
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AppRouter />
        </div>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
      </QueryClientProvider>
      
    </Provider>
    
    </>
  );
}

export default App;
