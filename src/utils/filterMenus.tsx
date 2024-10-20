import { config } from './clientsConfig';
/**
 * Interfaces
 */
interface PageMenuItem {
	id: string;
	text: string;
	path: string;
	icon: string;
}
interface SubMenu {
	[key: string]: PageMenuItem;
}
export interface PagesMenu {
	[key: string]: {
		id: string;
		text: string;
		path: string;
		icon: string;
		subMenu?: SubMenu;
	};
}

/**
 * Paths -> BIS
 */
const preRegisterPath = config.dataConfig[1].preRegisterPath;
const registerPath = config.dataConfig[1].registerPath;
const registerPathBB = config.dataConfig[1].registerBBPath;
const accessReportPath = config.dataConfig[2].accessReportPath;
const personRegisterPath = config.dataConfig[1].personRegisterPath;
const dashPath = config.dataConfig[3].dashboardPath;

/**
 * Paths -> HIK
 */
const preRegisterHIKPath = config.dataConfig[1]?.preRegisterHIKPath;
const registerHIKPath = config.dataConfig[1].registerHIKPath;
const checkinHIKPath = config.dataConfig[1].checkinHIKPath;
const personRegisteHIKPath = config.dataConfig[1].personRegisterHIKPath;

/**
 * Functions -> BIS
 */
export const filterLobbyBISMenu = (menu: PagesMenu, permissions: string[]): PagesMenu => {
	const hasPreRegister = permissions.includes(preRegisterPath || '');
	const hasRegister = permissions.includes(registerPath || '');
	const hasRegisterBB = permissions.includes(registerPathBB || '');
	const hasAccessReport = permissions.includes(accessReportPath || '');
	const hasPersonRegister = permissions.includes(personRegisterPath || '');
	const hasDash = permissions.includes(dashPath || '');

	if (permissions.length === 0) {
		return {};
	}
	// 1. Todas as permissões
	if (
		hasPreRegister &&
		hasRegister &&
		hasRegisterBB &&
		hasPersonRegister &&
		hasAccessReport &&
		hasDash
	) {
		return menu;
	}

	// 2. Cinco permissões
	if (hasPreRegister && hasRegister && hasPersonRegister && hasAccessReport && hasDash) {
		delete menu.lobby.subMenu?.registerBB;
	} else if (hasPreRegister && hasRegisterBB && hasPersonRegister && hasAccessReport && hasDash) {
		delete menu.lobby.subMenu?.register;
	} else if (hasRegister && hasRegisterBB && hasPersonRegister && hasAccessReport && hasDash) {
		delete menu.lobby.subMenu?.preRegister;
	} else if (hasPreRegister && hasRegister && hasRegisterBB && hasAccessReport && hasDash) {
		delete menu.lobby.subMenu?.personRegister;
	} else if (hasPreRegister && hasRegister && hasRegisterBB && hasPersonRegister && hasDash) {
		delete menu.lobby.subMenu?.accessReport;
	}

	// 3. Quatro permissões
	else if (hasPreRegister && hasRegister && hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPreRegister && hasRegisterBB && hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.register;
		delete menu.dashboard;
	} else if (hasRegister && hasRegisterBB && hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.dashboard;
	} else if (hasPreRegister && hasRegister && hasRegisterBB && hasAccessReport) {
		delete menu.lobby.subMenu?.personRegister;
		delete menu.dashboard;
	} else if (hasPreRegister && hasRegister && hasPersonRegister && hasDash) {
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
	} else if (hasRegister && hasPersonRegister && hasAccessReport && hasDash) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.registerBB;

		// 4. Três permissões
	} else if (hasPreRegister && hasRegister && hasPersonRegister) {
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPreRegister && hasRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPreRegister && hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegister && hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegisterBB && hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.dashboard;

		// 5. Duas permissões
	} else if (hasPreRegister && hasRegister) {
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPreRegister && hasPersonRegister) {
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPreRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegister && hasPersonRegister) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPersonRegister && hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegisterBB && hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.dashboard;

		// 6. Apenas uma permissão
	} else if (hasPreRegister) {
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegister) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasPersonRegister) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasAccessReport) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.registerBB;
		delete menu.dashboard;
	} else if (hasRegisterBB) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.dashboard;
	} else if (hasDash) {
		delete menu.lobby.subMenu?.preRegister;
		delete menu.lobby.subMenu?.register;
		delete menu.lobby.subMenu?.personRegister;
		delete menu.lobby.subMenu?.accessReport;
		delete menu.lobby.subMenu?.registerBB;
	}

	// Sem permissões, retorna menu vazio
	else {
		return {};
	}

	return menu;
};

/**
 * Functions -> HIK
 */
export const filterLobbyHIKMenu = (menu: PagesMenu, permissions: string[]): PagesMenu => {
	const hasPreRegisterHIK = permissions.includes(preRegisterHIKPath || '');
	const hasRegisterHIK = permissions.includes(registerHIKPath || '');
	const hasCheckin = permissions.includes(checkinHIKPath || '');
	const hasPersonHIK = permissions.includes(personRegisteHIKPath || '');

	if (permissions.length === 0) {
		return {};
	}

	if (hasPreRegisterHIK && hasRegisterHIK && hasCheckin && hasPersonHIK) {
		return menu;
	} else if (hasPreRegisterHIK && hasRegisterHIK) {
		delete menu.lobby.subMenu?.checkin;
	} else if (hasPreRegisterHIK && hasCheckin) {
		delete menu.lobby.subMenu?.registerHIK;
	} else if (hasRegisterHIK && hasCheckin) {
		delete menu.lobby.subMenu?.preRegisterHIK;
	} else if (hasPreRegisterHIK) {
		delete menu.lobby.subMenu?.registerHIK;
		delete menu.lobby.subMenu?.checkin;
	} else if (hasRegisterHIK) {
		delete menu.lobby.subMenu?.preRegisterHIK;
		delete menu.lobby.subMenu?.checkin;
	} else if (hasCheckin) {
		delete menu.lobby.subMenu?.preRegisterHIK;
		delete menu.lobby.subMenu?.registerHIK;
	} else {
		return {};
	}
	console.log(menu);
	return menu;
};
