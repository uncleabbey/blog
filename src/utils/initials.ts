const getInitial = (name: string): string => {
    const nameArr = name.split(' ');
    if (nameArr.length === 1) {
        return nameArr[0].substr(0, 1) + nameArr[0].substr(1, 1);
    } else {
        return nameArr[0].substr(0, 1) + nameArr[1].substr(0, 1);
    }
};
export default getInitial;
