
export const getNewId = () => {
    const len = 20
    const bits = 36
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
}

export const getNewModalKey = () => {
    const len = 8
    const bits = 36
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
}

export const sortByCharacters = (arr,key,asc) => (
    arr.sort((a,b) => {
        const str1 = a[key].toLowerCase().replace(/\s/g,'')
        const str2 = b[key].toLowerCase().replace(/\s/g,'')
        if(str1 < str2){
            return asc ? -1 : 1
        }
        if(str1 > str2){
            return asc ? 1 : -1
        }
        return 0
    })
)
export const sortByComparison = (arr,key,asc) => (
    arr.sort((a,b) => {
        const str1 = a[key]
        const str2 = b[key]
        if(str1 > str2){
            return asc ? -1 : 1
        }
        if(str1 < str2){
            return asc ? 1 : -1
        }
        return 0
    })
)

export const sortByTime = (arr,asc) => (
    arr.sort((a,b) => {
        return asc ? a.timestamp - b.timestamp :
            b.timestamp - a.timestamp
    })
)