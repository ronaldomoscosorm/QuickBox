const functions = () => {
	const findValueByField = (data: any[], searchVar: string, field: string, filter: string) => {
		if (data) {
			const searchItem = data.find((item) => item[filter] === searchVar);
			if (searchItem) {
				return searchItem[field];
			}
		}
		return '';
	};

	const reconstructBase64String = (base64Part: string): string => {
		return `data:image/jpeg;base64,${base64Part}`;
	};

	return {
		findValueByField,
        reconstructBase64String,
	};
};

export default functions;
