/*character counter note*/

const textarea = document.getElementById('text');
const characterCount = document.getElementById('character-count');
const maxLength = 1500;

textarea.addEventListener('input', function(event) {
    const count = textarea.value.length;
    const remainingCharacters = maxLength - count;

    if (remainingCharacters >= 0) {
        characterCount.textContent = `${remainingCharacters}`;
    } else {
        characterCount.textContent = `0`;
        textarea.value = textarea.value.slice(0, maxLength);
    }
});


/*dropdown menu*/
const dropdowns = document.querySelectorAll('.dropdown');

//Loop
dropdowns.forEach(dropdown => {
    //Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {

        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            //Add text fade in animation
            selected.classList.add("text-fade-in");

            //Remove animation after it is finished
            setTimeout(() => {
                selected.classList.remove("text-fade-in");
            }, 300);

            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });

    window.addEventListener("click", e => {
        //dropdown size and position
        const size = dropdown.getBoundingClientRect();

        if(
            e.clientX < size.left ||
            e.clientX > size.right ||
            e.clientY < size.top ||
            e.clientY > size.bottom
        ) {
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
        }
    });
});

window.addEventListener("load", () => {
    //Create gsap timeline
    const tl = gsap.timeline();

    //Preloader Animations
    tl.to(".preloader", {opacity: 0, delay: 0.5,});
    tl.to(".loader", {animation: "none",});
    tl.to(".loader span", {animation: "none",});
    tl.to(".preloader", {display: "none"});

});