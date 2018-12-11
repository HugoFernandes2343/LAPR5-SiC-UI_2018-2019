export class Produto {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    altura: number;
    alturaMax: number;
    alturaMin: number;
    largura: number;
    larguraMax: number;
    larguraMin: number;
    profundidade: number;
    profundidadeMax: number;
    profundidadeMin: number;
    maxTaxaOcupacao: number;
    taxaOcupacaoAtual: number;
    restrigirMateriais: boolean;
    materiaisAcabamentos: string[];
    opcional: string[];
    obrigatoria: string[];
  }