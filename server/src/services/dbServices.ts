const updateStates = (params: any) => {
    const type = params.type;
    delete params.type;
    const editedObj = Object.entries(params).map(([key, value]) => ({
        [`${type}.${key}`]: value,
    }));
    const obj = {};
    editedObj.forEach((item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        obj[key] = value;
    });
    return obj;
};

export { updateStates };
