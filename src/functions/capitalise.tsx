
    const capitalise = (str: string) => {
        if(str.length > 0) {
        const splitArr = str.split("")
        splitArr[0] = splitArr[0].toUpperCase();
        return splitArr.join("")
        }
        return "null"
    }

    export default capitalise