//Use of Local Storage for dark & light mode ("side of the force")
//Use of Toggle animation

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
}

$(".btn-toggle").click( function() {
    document.body.classList.toggle("dark-theme");
    let theme = "Light Side";
    if (document.body.classList.contains("dark-theme")) {
        theme = "Dark Side";
    }
    localStorage.setItem("theme", theme);
});