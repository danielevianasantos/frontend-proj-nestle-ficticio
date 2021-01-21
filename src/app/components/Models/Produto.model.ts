export interface Produto{
    id?: string
    nome: string
    preco: number
    unidadePorCaixa: number
    pesoPorUnidade: number
    validade: string
    categoriaProdutoId?: string
}