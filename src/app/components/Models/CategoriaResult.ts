import { Categoria } from './Categoria.model';

export interface CategoriaResult {
    singleData: Categoria;
    dataList: Categoria[];
    success: boolean;
    messageList: string[];
}