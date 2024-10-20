import { TColor } from "../color-type";

export interface IAlertData {
	alertIcon: string;
	alertColor: TColor | undefined;
	alertMessage: string;
	alertOpen: boolean;
}
