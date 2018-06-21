/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "85%";
    document.getElementById("main").style.marginLeft = "85%";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// When the DOM is ready, run this function
/*$(document).ready(function() {
    //Set the carousel options
    $('#quote-carousel').carousel({
        pause: true,
        interval: 4000,
    });
});*/