export class BSPersonsInfo {
	PERSCLASSID: string;
	PERSID: string;
	PERSNO: string;
	CPF: string;
	DOCUMENT: string;
	PERSCLASS: string; // E - colaborador, V - visitante, G - externo
	LASTNAME: string;
	FIRSTNAME: string;
	NAME: string;
	DATEOFBIRTH: string; // date-time string
	SEX: number;
	STREETHOUSENO: string;
	ZIPCODE: string;
	CITY: string;
	PHONEPRIVATE: string;
	PHONEMOBILE: string;
	PHONEOFFICE: string;
	COMPANYID: string;
	COMPANYNO: string;
	STATUS: number; // One of [-1, 0, 1]
	MAIDENNAME: string;
	GRADE: string;
	MARITALSTATUS: number;
	COUNTRY: string;
	ATTENDANT: string;
	DEPARTMATTEND: string;
	REMARK: string;
	IDNUMBER: string;
	EMAIL: string;
	CITYOFBIRTH: string;
	WEBPAGEURL: string;
	DEPARTMENT: string;
	COSTCENTRE: string;
	CENTRALOFFICE: string;
	JOB: string;
	ADDITIONALLASTNAME: string;
	NUMBERPLATE: string;
	CLIENTID: string;
	PHOTOIMAGE: string;
	ACCESSTIME: string; // date-time string
	UF: string;
	AUTHID: string;
	SHORTNAME: string;
	QRCode: string;
	CARDID: string;
	SITECODE: string;
	CARDNO: string;
	CODEDATA: string;
	LOCKID: string;
	CAUSEOFLOCK: string;
	Block: BSLockoutInfo;
	CARDS: BSCardsInfo;
	AUTHORIZATIONS: BSAuthorizationInfo;
	CUSTOMFIELDS: BSAdditionalFieldInfo;
	AUTHFROM: string; // date-time string
	AUTHUNTIL: string; // date-time string
	constructor() {
		this.PERSCLASSID = '';
		this.PERSID = '';
		this.PERSNO = '';
		this.CPF = '';
		this.DOCUMENT = '';
		this.PERSCLASS = '';
		this.LASTNAME = '';
		this.FIRSTNAME = '';
		this.NAME = '';
		this.DATEOFBIRTH = '';
		this.SEX = 0;
		this.STREETHOUSENO = '';
		this.ZIPCODE = '';
		this.CITY = '';
		this.PHONEPRIVATE = '';
		this.PHONEMOBILE = '';
		this.PHONEOFFICE = '';
		this.COMPANYID = '';
		this.COMPANYNO = '';
		this.STATUS = 0;
		this.MAIDENNAME = '';
		this.GRADE = '';
		this.MARITALSTATUS = 0;
		this.COUNTRY = '';
		this.ATTENDANT = '';
		this.DEPARTMATTEND = '';
		this.REMARK = '';
		this.IDNUMBER = '';
		this.EMAIL = '';
		this.CITYOFBIRTH = '';
		this.WEBPAGEURL = '';
		this.DEPARTMENT = '';
		this.COSTCENTRE = '';
		this.CENTRALOFFICE = '';
		this.JOB = '';
		this.ADDITIONALLASTNAME = '';
		this.NUMBERPLATE = '';
		this.CLIENTID = '';
		this.PHOTOIMAGE = '';
		this.ACCESSTIME = '';
		this.UF = '';
		this.AUTHID = '';
		this.SHORTNAME = '';
		this.QRCode = '';
		this.CARDID = '';
		this.SITECODE = '';
		this.CARDNO = '';
		this.CODEDATA = '';
		this.LOCKID = '';
		this.CAUSEOFLOCK = '';
		this.AUTHFROM = '';
		this.AUTHUNTIL = '';
		this.Block = {
			lockid: '',
			causeoflock: '',
			persid: '',
			persno: '',
			validfrom: '',
			validuntil: '',
			reviser: '',
		};
		this.CARDS = {
			PERSID: '',
			SITECODE: '',
			CARDNO: '',
			CARDID: '',
			VALIDFROM: '',
			VALIDUNTIL: '',
			CODEDATA: '',
			USAGETYPEID: 0,
			CODEVAR: 0,
			CODETYPE: 0,
			STATUS: 0,
			LASTACCESS: '',
		};
		this.AUTHORIZATIONS = {
			AUTHID: '',
			SHORTNAME: '',
		};
		this.CUSTOMFIELDS = {
			label: '',
			datatype: '',
			value: '',
			id: '',
			fielddescid: '',
		};
	}
}

export class BSLockoutInfo {
	lockid: string;
	causeoflock: string;
	persid: string;
	persno: string;
	validfrom: string;
	validuntil: string;
	reviser: string;
	constructor() {
		this.lockid = '';
		this.causeoflock = '';
		this.persid = '';
		this.persno = '';
		this.validfrom = '';
		this.validuntil = '';
		this.reviser = '';
	}
}

export class BSCardsInfo {
	PERSID: string;
	SITECODE: string;
	CARDNO: string;
	CARDID: string;
	VALIDFROM: string;
	VALIDUNTIL: string;
	CODEDATA: string;
	USAGETYPEID: number; // One of [0, 1, 2, 3, 4]
	CODEVAR: number; // One of [0, 1, 2]
	CODETYPE: number; // One of [0, 1, 2, 3, 4, 5, 6, 7, 8]
	STATUS: number; // One of [-1, 0, 1]
	LASTACCESS: string;
	constructor() {
		this.PERSID = '';
		this.SITECODE = '';
		this.CARDNO = '';
		this.CARDID = '';
		this.VALIDFROM = '';
		this.VALIDUNTIL = '';
		this.CODEDATA = '';
		this.USAGETYPEID = 0;
		this.CODEVAR = 0;
		this.CODETYPE = 0;
		this.STATUS = 0;
		this.LASTACCESS = '';
	}
}

export class BSAuthorizationInfo {
	AUTHID: string;
	SHORTNAME: string;
	constructor() {
		this.AUTHID = '';
		this.SHORTNAME = '';
	}
}

export class BSAdditionalFieldInfo {
	label: string;
	datatype: string;
	value: string;
	id: string;
	fielddescid: string;
	constructor() {
		this.label = '';
		this.datatype = '';
		this.value = '';
		this.id = '';
		this.fielddescid = '';
	}
}
