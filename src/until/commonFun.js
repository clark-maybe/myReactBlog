/**
 * 获取数据
 * */
export function getData(path, ifError) {
    fetch(path).then( res => {
        return res.json();
    })
        .then( data => {
            return data;
        })
        .catch(()=>{
            ifError()
        })
}