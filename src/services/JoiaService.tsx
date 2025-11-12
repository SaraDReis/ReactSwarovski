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