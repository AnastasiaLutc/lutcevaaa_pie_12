
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

// Получить кнопку:
mybutton = document.getElementById("myBtn");

// Когда пользователь прокручивает вниз 40px от верхней части документа, покажите кнопку
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Когда пользователь нажимает на кнопку, прокрутите до верхней части документа
function topFunction() {
  document.documentElement.scrollTop = 0;
}