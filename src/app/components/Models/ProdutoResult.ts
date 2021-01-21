import { Produto } from './Produto.model';

export interface ProdutoResult {
    singleData: Produto;
    dataList: Produto[];
    success: boolean;
    messageList: string[];
}