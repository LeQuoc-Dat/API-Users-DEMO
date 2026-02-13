export function splitName(userName)
{
    const splitedName= userName.split(' ')
    let len = splitedName.length
    if (len ===1)
    {
        return ["", userName]
    }
    return [splitedName[0], splitedName[len-1]]
}

