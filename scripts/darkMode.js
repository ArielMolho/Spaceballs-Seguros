//Use of Local Storage for dark & light mode ("side of the force")
//Use of Toggle animation

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "darkSide") {
    document.body.classList.add("dark-theme");
}

$(".btn-toggle").click( function() {
    document.body.classList.toggle("dark-theme");
    let theme = "lightSide";
    if (document.body.classList.contains("dark-theme")) {
        theme = "darkSide";
    }
    localStorage.setItem("theme", theme);
});