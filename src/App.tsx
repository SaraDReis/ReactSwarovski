import {BrowserRouter, Route, Routes } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Produtos" element={<Produtos />} />
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
