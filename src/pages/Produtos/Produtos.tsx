
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
            <Header />

            <main>


                <img className="Ariana " src={banner} alt="" />





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

            <Footer />
        </>
    )
}