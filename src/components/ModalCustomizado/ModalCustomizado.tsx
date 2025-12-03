
import type { ModalCustomizadoProps } from '../../Types/ModalCustomizadoProps'
import '../ModalCustomizado/ModalCustomizado.css'
export default function ModalCustomizado({
   mostrarModalQuando,
    aoCancelar,
    exibirConteudoCentralizado,
    titulo,
    corpo,
    customizarBotoes,
    textoBotaoCancelamento,
    textoBotaoConfirmacao,
    aoConfirmar
}: ModalCustomizadoProps) {
  return (
    <>
      
            <Modal
                style={{ fontFamily:  }}
                show={mostrarModalQuando}
                onHide={aoCancelar}>

          <Modal.Header>
 <Modal.Title>
{titulo}
 </Modal.Title>
            </Modal.Header>

            </Modal>

    </>
  )
}
