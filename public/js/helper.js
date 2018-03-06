const util = {
    isBlank : function(text){
        return text.length > 0 ? false : true;
    },
    getQueryString : function(){
        let params = {};
        let query = window.location.search.replace('?','').split('&');
        for(index in query){
            let vars = query[index].split("=");
            params[vars[0]] = vars[1];
        }
        return params;
    }
};