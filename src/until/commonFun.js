
export function getData(path, params, fetchType) {
    let tempBody = generateObject();
    tempBody.body = params;
    tempBody.method = fetchType;
    return fetch(path, tempBody);
}

export function generateObject() {
    let Obj = {};
    return Object.create(Obj);
}

getData('asdf', {b: 12}, 'POST').then((data)=>{
    console.log(data)
});