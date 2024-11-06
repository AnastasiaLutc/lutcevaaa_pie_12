function changing_display() {
    var x = document.getElementById("display_nav");
    if (x.className === "menu") {
        x.className += " menu_changing-display";
    } else {
        x.className = "menu";
    }
}

