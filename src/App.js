import { Route, Routes } from 'react-router-dom'
import './App.css';
import { Provider} from 'react-redux';
import store from './redux/store/store';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import ListTasks from './components/ListTasks/ListTasks';
import ContenSearch from './components/ContenSarch/ContenSearch';

export const pathRoute = "/taks-app"



function App() {  

  
  
  return (
    <Provider store={store}>
    <div className="app">
      <Nav/>
      <Routes>
      <Route path={pathRoute} element={ <Home/>}/> 
      <Route path={pathRoute+'/lists/:params'} element={ <ListTasks/>}/> 
      <Route path={pathRoute+'/Search/Tasks'} element={ <ContenSearch/>}/> 
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
