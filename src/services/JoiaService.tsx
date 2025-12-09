import axios from "axios";
import type { Joia } from "../Types/Joia"

export const getJoias = async (): Promise<Joia[]> => { 
    try {
        const resposta = await axios.get("http://localhost:3000/produtos");
        return resposta.data
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
        throw error;
    }
}

export const deleteJoia = async (idJoia: string): Promise<void> =>  {
try {
    await axios.delete(` http://localhost:3000/produtos/${idJoia}`)
} catch (error) {
    console.error("Erro ao deletar a joia: ", error);
    throw error;
}
}
