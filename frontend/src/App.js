import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'
import "./App.css";

function App() {

  return (
    <div className="App">
      <Route path='/' component={HomePage} exact/>
      <Route path='/chats' component={ChatPage}/>
    </div>

  );
}

export default App;
