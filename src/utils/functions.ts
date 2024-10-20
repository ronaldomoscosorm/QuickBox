const functions = () =>{
    const findValueByField = (data: any[], searchVar: string, field: string, filter: string) => {
        if (data) {
            const searchItem = data.find((item) => item[filter] === searchVar);
            if (searchItem) {
                return searchItem[field];
            }
        }
        return '';
    };
    
    return {
        findValueByField,
    }
}

export default functions;