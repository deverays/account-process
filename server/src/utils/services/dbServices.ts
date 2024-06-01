const updateStates = (params: Record<string, any>): Record<string, any> => {
    const { type, ...restParams } = params;
    const updatedObj: Record<string, any> = {};

    for (const [key, value] of Object.entries(restParams)) {
        updatedObj[`${type}.${key}`] = value;
    }

    return updatedObj;
};

export { updateStates };
