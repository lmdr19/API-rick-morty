import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Episodes from './pages/Episodes';
import Locations from './pages/Locations';
import Header from './components/header';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/locations' element={<Locations/>} />
        <Route path='/episodes' element={<Episodes/>} />
      </Routes>
    </>
  )
}

export default App
