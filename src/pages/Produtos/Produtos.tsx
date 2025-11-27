
import './Produtos.css';

import banner from "../../assets/img/transferir (1) (1) (1).png"


import { useEffect, useState } from "react";
import { getJoias } from "../../services/JoiaService";
import type { Joia } from "../../Types/Joia";
import CardProduto from '../../components/CardProduto/CardProduto';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


export default function Produtos() {



    const [joias, setJoias] = useState<Joia[]>([]);

    const fetchJoias = async () => {
        try {
            const dados = await getJoias();
            console.log("Lista de Joias vindas da API: ", dados);
            setJoias(dados);
        }
        catch (error) {
            console.error("Erro ao executar getJoias: ", error);
        }
    }
    useEffect(() => {
        fetchJoias();
    }, [])




    return (
<>
<Header/>

        <main>


           <section className="banner_pesquisa" >
  <img className="Ariana " src={banner} alt=""/>
  <div className="pesquisa" >
    <svg className="lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M384 208a176 176 0 1 0 -352 0 176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z"/></svg>
    <input type="text" placeholder="Oque procura?"/>
  </div>

</section>





            <section className="cards">{
                joias.map((j: Joia) => (
                    <CardProduto
                        key={j.id}
                        nome={j.nome}
                        descricao={j.descricao}
                        preco={0}
                        imagem={j.imagens[0] ?? ""}
                        parcelamento={j.parcelamento} />


                ))
            }
            </section>
        </main>

<Footer/>
</>
    )
}