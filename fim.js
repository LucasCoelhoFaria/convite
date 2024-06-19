window.onload = function() {
    const boxes = document.querySelectorAll('.box');
    let currentBox = 0;

    function showBox(index) {
        boxes.forEach((box, i) => {
            if (i === index) {
                box.style.opacity = 1;
                box.style.zIndex = 1;
            } else {
                box.style.opacity = 0;
                box.style.zIndex = 0;
            }
        });
    }

    function cycleBoxes() {
        showBox(currentBox);
        currentBox = currentBox + 1;
        if(currentBox == 3){
            window.location.pathname = "convite/home.html"
        }
        setTimeout(cycleBoxes, 7000);
    }

    cycleBoxes();
}
