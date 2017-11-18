function showAll(){
    $(".WD").show("slow");
    $(".WV").show("slow");
    $(".MpA").show("slow");
    $(".MA").show("slow");
}
function showWebDesign(){
    $(".WD").show("slow");
    $(".WV").hide("slow");
    $(".MpA").hide("slow");
    $(".MA").hide("slow");
}
function showWebDevelop(){
    $(".WD").hide("slow");
    $(".WV").show("slow");
    $(".MpA").hide("slow");
    $(".MA").hide("slow");
}
function showMultiPlatform(){
    $(".WD").hide("slow");
    $(".WV").hide("slow");
    $(".MpA").show("slow");
    $(".MA").hide("slow");
}
function showMobile(){
    $(".WD").hide("slow");
    $(".WV").hide("slow");
    $(".MpA").hide("slow");
    $(".MA").show("slow");
}
$(function() {
    //smooth page scroll to an anchor on the same page
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#action_filter_All").click(function(e){
        e.preventDefault();
        showAll();
    });
    $("#action_filter_WD").click(function(e){
        e.preventDefault();
        showWebDesign();
    });
    $("#action_filter_WV").click(function(e){
        e.preventDefault();
        showWebDevelop();
    });
    $("#action_filter_MpA").click(function(e){
        e.preventDefault();
        showMultiPlatform();
    });
    $("#action_filter_MA").click(function(e){
        e.preventDefault();
        showMobile();
    });
});