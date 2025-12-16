
import { useEffect, useState, type ChangeEvent } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './CadastroListagem.css'
import type { Joia } from '../../Types/Joia'
import { deleteJoia, enviarFotoParaApi, getJoias, postJoia } from '../../services/JoiaService'
import { formatosService } from '../../services/formatosService'
import ModalCustomizado from '../../components/ModalCustomizado/ModalCustomizado'
import { NumericFormat } from 'react-number-format'


export default function CadastroListagem() {

    const [joia, setJoia] = useState<Joia[]>([]);
    const [nomeJoia, setNomeJoia] = useState<string>("");
    const [bgImageInputColor, seiBgImageInputColor] = useState<string>("#ffffff");
    const [imagem, setImagem] = useState<File | undefined>(undefined);
    const [preco, setPreco] = useState<number | undefined>(undefined);
    const [parcelamento, setParcelamento] = useState<string | undefined>("");
    const [descricao, setDescricao] = useState<string>("");

    const [clicouNaLixeira, setClicouNaLixeira] = useState<Boolean>(false);
    const [idParaDeletar, setIdparadeletar] = useState<string>("");
    const [aposConfirmacaoDeJoiaRemovida, SetAposConfirmacaoDeJoiaRemovida] = useState<boolean>(false);
    const [propsModalDeErroOuSucesso, setPropsModalDeErroOuSucesso] = useState<{ exibir: Boolean; titulo: String; corpo: String; }>({ exibir: false, titulo: "", corpo: "" });


    const abrirModalParaConfirmarDelete = (id: string) => {
        setIdparadeletar(id);
        setClicouNaLixeira(true)
        setIdparadeletar(id)
    }

    const fecharModalConfirmacaoDelete = () => {
        setClicouNaLixeira(false);
    }

    const exibirModalErroOuSucesso = (titulo: string, corpo: string) => {
        setPropsModalDeErroOuSucesso({ exibir: true, titulo, corpo });
    };

    const removerItemAposConfirmacao = async (id: string) => {
        try {
            await deleteJoia(id);
            SetAposConfirmacaoDeJoiaRemovida(true);
            await fetchJoias();
            fecharModalConfirmacaoDelete();
        } catch (error) {
            exibirModalErroOuSucesso("Erro", "Erro ao deletar a joia")
        }
    }

    const fecharModalDeErroOuSucesso = () => {
        setPropsModalDeErroOuSucesso({ ...propsModalDeErroOuSucesso, exibir: false });

    }

    const carregarImagem = (img: ChangeEvent<HTMLInputElement>) => {
        const file = img.target.files?.[0];
        if (file?.type.includes("image")) {
            setImagem(file);
            seiBgImageInputColor(" #5cb85c")
        }
        else {
            setImagem(undefined);
            seiBgImageInputColor(" #ff2c2c")
        }
    }

    const LimparDados = () => {
        setNomeJoia("");
        setDescricao("");
        setImagem(undefined);
        setPreco(undefined)
        seiBgImageInputColor(" #ffffff")
        setParcelamento("")


    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!nomeJoia || !descricao || !preco) {
            exibirModalErroOuSucesso("Campos obrigatorios", "Prencha o nome, preço, parcelamento e descrição da joia");
            return;
        }

        let uploadedFileName: string | undefined;

        if (imagem) {
            uploadedFileName = await enviarFotoParaApi(imagem);
            if (!uploadedFileName) {
                exibirModalErroOuSucesso("Erro", "cadastro cancelamento por falha no upload da imagem.");
                return;
            }
        }


        const novoJoia: Joia = {
            id: undefined,
            nome: nomeJoia,
            descricao: descricao,
            preco: preco,
            parcelamento: parcelamento,
            imagens: uploadedFileName ? [uploadedFileName] : [],
            categorias: []
        };

        try {
            await postJoia(novoJoia);
            exibirModalErroOuSucesso("Sucesso", "Nova joia de cadastro com sucesso!");
            LimparDados();
            fetchJoias();
        } catch (error) {
            exibirModalErroOuSucesso("Erro", "Erro ao cadastrar nova joia.")
        }
    }

    const fetchJoias = async () => {
        try {
            const dados = await getJoias();
            setJoia(dados);

            console.log(dados)
        } catch (error) {
            console.error("Erro ao executar getJoias");
        }
    }

    useEffect(() => {
        fetchJoias()
    }, [])
    return (
        <>
            <Header />
            <main>
                <div className="cadastro">

                    <h2>Cadastro</h2>

                </div>
                <form onSubmit={handleSubmit} className="container_cadastro">

                    <div className="box_cadastro">
                        <div className="coluna_cadastro1">
                            <label htmlFor="Nome">Nome</label>
                            <input className="input"
                                type="text"
                                name=""
                                id="Nome"
                                placeholder="Qual o nome dessa joia?"
                                value={nomeJoia}
                                onChange={j => setNomeJoia(j.target.value)}
                            />
                            <div className="preço_img">
                                <div className="cor">
                                    <label htmlFor="preço">Preço</label>
                                    <NumericFormat
                                        id="preço"
                                        placeholder="insira o preço"
                                        value={preco ?? ""}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix="R$"
                                        decimalScale={2}
                                        fixedDecimalScale
                                        allowNegative={false}
                                        onValueChange={(values) => {
                                            setPreco(values.floatValue ?? undefined);
                                        }}

                                    />
                                </div>
                                
                                <div className="img_input">
                                    <label htmlFor="img">
                                        <span>Imagem</span>
                                        <div className='container_imginput' style={{ backgroundColor: bgImageInputColor }}>
                                            <svg className='svg_file' xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                    d="M232 344l0-316.7 106.3 106.3c3.1 3.1 8.2 3.1 11.3 0s3.1-8.2 0-11.3l-120-120c-3.1-3.1-8.2-3.1-11.3 0l-120 120c-3.1 3.1-3.1 8.2 0 11.3s8.2 3.1 11.3 0L216 27.3 216 344c0 4.4 3.6 8 8 8s8-3.6 8-8zm48-24l104 0c26.5 0 48 21.5 48 48l0 48c0 26.5-21.5 48-48 48L64 464c-26.5 0-48-21.5-48-48l0-48c0-26.5 21.5-48 48-48l104 0 0-16-104 0c-35.3 0-64 28.7-64 64l0 48c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-48c0-35.3-28.7-64-64-64l-104 0 0 16zm88 72a16 16 0 1 1 -32 0 16 16 0 1 1 32 0zm-16-32a32 32 0 1 0 0 64 32 32 0 1 0 0-64z" />
                                            </svg>
                                        </div>
                                    </label>
                                    <input
                                    className="input"
                                        type="file"
                                        id="img"
                                        alt="imagem_da_joia"
                                        accept="image/*"
                                        onChange={carregarImagem}
                                    />
                                </div>


                            </div>
                            <label htmlFor="Parcela">Parcela</label>
                            <input className="input input_parcelamento"
                                type="text"
                                id="Parcela"
                                placeholder="Insira a quantidade da parcelas"
                                value={parcelamento}
                                onChange={j => setParcelamento(j.target.value)}
                            />
                        </div>

                        <div className="coluna_cadastro2">
                            <label htmlFor="Descrição">Descrição</label>
                            <textarea
                                id="desc"
                                maxLength={200}
                                placeholder="Escreva detalhe sobre a joia."
                                value={descricao}
                                onChange={d => setDescricao(d.target.value)}
                            />
                        </div>
                    </div>
                    <button className="botaoSubmit" type="submit">Cadastrar</button>

                </form>

                <h2>Lista</h2>

                <section className="container_lista">

                    <section className="cards">
                        {
                            joia.map((item) => (
                                <div className="card_joia">
                                    <h3>{item.nome}</h3>
                                    <div className="descrição">
                                        Descrição
                                    </div>
                                    <p>{item.descricao}</p>
                                    <svg onClick={() => abrirModalParaConfirmarDelete(item.id!)} xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                    <small>{formatosService.PrecoBR(item.preco)}</small>
                                    <small>{item.parcelamento}</small>

                                </div>
                            ))
                        }



                    </section>

                </section>






            </main>
            <Footer />
            <ModalCustomizado
                mostrarModalQuando={clicouNaLixeira}
                aoCancelar={fecharModalConfirmacaoDelete}
                titulo='Confirmar a exclusão'
                corpo="Tem certeza que deseja remover a joia"
                customizarBotoes={true}
                textoBotaoConfirmacao='Excluir'
                textoBotaoCancelamento='Cancelar'
                aoConfirmar={() => removerItemAposConfirmacao(idParaDeletar)}
                exibirConteudoCentralizado={true}
            />

            <ModalCustomizado
                mostrarModalQuando={aposConfirmacaoDeJoiaRemovida}
                aoCancelar={() => SetAposConfirmacaoDeJoiaRemovida(false)}
                titulo="Sucesso"
                corpo="Joia removida"
            />

            <ModalCustomizado
                mostrarModalQuando={propsModalDeErroOuSucesso.exibir}
                aoCancelar={fecharModalDeErroOuSucesso}
                titulo={propsModalDeErroOuSucesso.titulo}
                corpo={propsModalDeErroOuSucesso.corpo}
                exibirConteudoCentralizado={true}


            />

        </>
    )
}
