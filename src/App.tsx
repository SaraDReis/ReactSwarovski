import { BrowserRouter, Route, Routes } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
import Home from "./pages/Home/Home"
import CadastroListagem from "./pages/CadastroListagem/CadastroListagem"

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Produtos" element={<Produtos />} />
      <Route path="/produtos/cadastroListagem" element = {<CadastroListagem />} />
      <Route path="/produtos/pesquisa" element= {<Produtos /> }/>
    </Routes>
    </BrowserRouter>


  )
}

export default App
