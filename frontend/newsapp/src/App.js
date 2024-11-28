import { Routes,Route } from 'react-router';
import About from './Onboarding/About';
import Login from './Onboarding/Login/Login';
import Register from './Onboarding/Register/Register';
import Landing from './Onboarding/Landing';
import Home from './Home/Home';
import Dashboard from './Home/Dashboard';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
        </Route>
      </Routes>
  );
}

export default App;
