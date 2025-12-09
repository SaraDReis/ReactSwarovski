import { BrowserRouter, Route, Routes } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
import Home from "./pages/Home/Home"
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/produtos/pesquisa" element={<Produtos />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
