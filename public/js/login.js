$(document).ready(function(){
    $('.collection-item').click(function(){
        let $this = $(this);
        console.log($this.data("info"));
    });
});