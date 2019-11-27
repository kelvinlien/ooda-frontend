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

export function clear()
{
    localStorage.clear();
}