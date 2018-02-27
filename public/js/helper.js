/**
 * 
 * @param {String} url 
 */
function getQueryString(){
    let params = {};
    let query = window.location.search.replace('?','').split('&');
    for(index in query){
        let vars = query[index].split("=");
        params[vars[0]] = vars[1];
    }
    return params;
}