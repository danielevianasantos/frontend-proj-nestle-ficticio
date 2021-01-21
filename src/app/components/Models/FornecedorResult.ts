import { Fornecedor } from './Fornecedor.model';

export interface FornecedorResult {
    singleData: Fornecedor;
    dataList: Fornecedor[];
    success: boolean;
    messageList: string[];
}