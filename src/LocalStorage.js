// export default class LocalStorage
// {
//     setItem(newItems)
//     {
//         for (let key in newItems)
//         {
//             localStorage.setItem(JSON.stringify(key), JSON.stringify(newItems[key]));
//         }
//     }
//     getItem(key)
//     {
//         key = JSON.stringify(key);
//         return JSON.parse(localStorage.getItem(key));
//     }
//     removeItem(oldItems)
//     {
//         for (let key in oldItems)
//         {
//             key = JSON.stringify(key);
//             localStorage.removeItem(key, oldItems[key]);
//         }
//     }
// }

export function setItem(newItems)
{
    for (let key in newItems)
    {
        localStorage.setItem(key, JSON.stringify(newItems[key]));
    }
}

export function getItem(key)
{
    return JSON.parse(localStorage.getItem(key));
}

export function removeItem(oldItems)
{
    oldItems.forEach(key => {
        localStorage.removeItem(key);
    });
}