import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './Components/purchases_components/Layout/NavBar';
import Add from './Components/purchases_components/Pages/Add';
import Show from './Components/purchases_components/Pages/Show';
import Ordershow from './Components/purchases_components/Pages/Ordershow';
import Order from './Components/purchases_components/Pages/Order';



function App() {
  return (
    <>
      
      <BrowserRouter>
      <NavBar/>
        <Routes>
          
          <Route path='/user/show' element={<Show/>}/>
          <Route path='/orderShow/:orderId' element={<Ordershow />} />
          <Route path='/order' element={<Order/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
