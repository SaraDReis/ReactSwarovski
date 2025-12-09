import { BrowserRouter, Route, Routes } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
import CadastroListagem from "./pages/CadastroListagem/CadastroListagem"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/produtos/:categoria" element={<Produtos />} />
        <Route path="/produtos/cadastroListagem" element={<Produtos />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
