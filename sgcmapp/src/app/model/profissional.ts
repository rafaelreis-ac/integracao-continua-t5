import { Especialidade } from "./especialidade";
import { Unidade } from "./unidade";

export type Profissional = {
    id: number;
    nome: string;
    registroConselho: string;
    telefone: string;
    email: string;
    especialidade: Especialidade;
    unidade: Unidade;
}
