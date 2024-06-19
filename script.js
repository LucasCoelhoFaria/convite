let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.animation = `fade 1.5s ease-in-out, zoom 3s ease-in-out`;
    setTimeout(showSlides, 3000); // Muda a imagem a cada 3 segundos
}