export class BSAnswer {
	Code: string;
	Message: string;
	Total: number;
	Data: any;
	constructor() {
		this.Code = '';
		this.Message = '';
		this.Total = 0;
		this.Data = null;
	}
}

export class BSProductsInfo {
	cmpCoProduto: number;
	cmpCoCategoria: number;
	cmpInStatus: number;
	cmpDcProduto: string;
	cmpVlPreco: number;
	cmpVlQuantidade: number;
	cmpDcCategoria: string;
	cmpBlProduto: string;
	constructor() {
		this.cmpCoProduto = 0;
		this.cmpCoCategoria = 0;
		this.cmpInStatus = 0;
		this.cmpDcProduto = '';
		this.cmpVlPreco = 0;
		this.cmpVlQuantidade = 0;
		this.cmpDcCategoria = '';
		this.cmpBlProduto = '';
	}
}

export class BSAnswerAllProducts {
	Code: string;
	Message: string;
	Total: number;
	Data: BSProductsInfo[];
	constructor() {
		this.Code = '';
		this.Message = '';
		this.Total = 0;
		this.Data = [];
	}
}

export class BSCategoriesInfo {
	cmpCoCategoria: number;
	cmpDcCategoria: string;
	constructor() {
		this.cmpCoCategoria = 0;
		this.cmpDcCategoria = '';
	}
}

export class BSAnswerAllCategories {
	Code: string;
	Message: string;
	Total: number;
	Data: BSCategoriesInfo[];
	constructor() {
		this.Code = '';
		this.Message = '';
		this.Total = 0;
		this.Data = [];
	}
}
