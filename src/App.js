import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Headers from './Components/Headers'
import Cards from './Components/Cards'
// import CardsDetails from './Components/CardsDetails'
import AddtoCart from './Components/AddtoCartPage'
import { AddProducts } from './Components/AddNewProduct'

function App() {
  return (
    <div className='App'>
      <Router>
      <Headers/>
        <Routes>
          <Route path='/'  element={<Cards/>}/>
          {/* <Route path='cards/:id' element={<CardsDetails/>}/> */}
          <Route path='/cart' element={<AddtoCart/>}/>
          <Route path='/AddNewProduct' element={<AddProducts/>}/>
        </Routes>
      </Router>
  
    </div>
  )
}

export default App