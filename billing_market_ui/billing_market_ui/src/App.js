import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './Components/Layout/NavBar';
import UserRegistration from './Components/auth_components/UserRegistration';


function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserRegistration />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
