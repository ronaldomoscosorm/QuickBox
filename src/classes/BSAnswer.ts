import { BSPersonsInfo } from "./BSPersonsInfo";

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

export class BSSaleDetailsInfo {
	cmpCoVendaDetalhe: number;
	cmpCoVenda: number;
	cmpCoProduto: number;
	cmpDcVendaProduto: string;
	cmpVlVendaPreco: number;
	cmpVlVendaQuantidade: number;
	cmpVlVendaDesconto: number;
	cmpVlVendaSubtotal: number;
	constructor() {
		this.cmpCoVendaDetalhe = 0;
		this.cmpCoVenda = 0;
		this.cmpCoProduto = 0;
		this.cmpDcVendaProduto = '';
		this.cmpVlVendaPreco = 0;
		this.cmpVlVendaQuantidade = 0;
		this.cmpVlVendaDesconto = 0;
		this.cmpVlVendaSubtotal = 0;
	}
}
export class BSSaleInfo {
	cmpCoVenda: number;
	cmpCoFormaPagamento: number;
	cmpVlTotal: number;
	PERSID: string;
	Detalhes: BSSaleDetailsInfo[];
	constructor() {
		this.cmpCoVenda = 0;
		this.cmpCoFormaPagamento = 0;
		this.cmpVlTotal = 0;
		this.PERSID = '';
		this.Detalhes = [];
	}
}
export class BSPaymentMethodsInfo {
	cmpCoFormaPagamento: number;
	cmpDcFormaPagamento: string;
	cmpTpFormaPagamento: string;
	constructor() {
		this.cmpCoFormaPagamento = 0;
		this.cmpDcFormaPagamento = '';
		this.cmpTpFormaPagamento = '';
	}
}

export class BSAnswerPaymentMethods {
	Code: string;
	Message: string;
	Total: number;
	Data: BSPaymentMethodsInfo[];
	constructor() {
		this.Code = '';
		this.Message = '';
		this.Total = 0;
		this.Data = [];
	}
}

export class BSAnswerPersonsInfo {
	Code: string;
	Message: string;
	Total: number;
	Data: BSPersonsInfo[];
	constructor() {
		this.Code = '';
		this.Message = '';
		this.Total = 0;
		this.Data = [];
	}
}