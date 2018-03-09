'use strict';

var nav = document.querySelector('nav');
var navElem = document.querySelectorAll('nav a');
var navList = document.querySelector('nav ul');
var navListElem = document.querySelectorAll('nav li');
var headerContent = document.querySelector('header .content');
var arrowDown = document.querySelector('#gotoproj');
var sliderBtns = document.querySelectorAll('.sliderbtn');
var sliderImgs = document.querySelectorAll('.sliderimg');
var spans = document.querySelectorAll('header span');
var carsLi = document.querySelectorAll('.tesla ul li');

arrowDown.addEventListener('click', scroll);
nav.addEventListener('click', scroll);
window.addEventListener('scroll', changeNavElemActive);
window.addEventListener('load', changeNavElemActive);


for (var i = 0; i < sliderBtns.length; i++) {
    sliderBtns[i].addEventListener('click', changeSlide);
}

for (var i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', changeNavDisplay);
}

for (var i = 0; i < carsLi.length; i++) {
    carsLi[i].addEventListener('click', changeActiveOfCars);
}


function changeActiveOfCars(event) {
    var target = void 0;
    target = event.target;
    while (target.tagName !== 'LI') {
        target = event.target.parentNode;
    }
    for (var counter = 0; counter < carsLi.length; counter++) {
        carsLi[counter].classList.remove('active');
    }
    target.classList.add('active');
}

function changeNavElemActive() {
    for (var i = navListElem.length - 1; i >= 1; i--) {
        if (window.pageYOffset < document.getElementById(navElem[i - 1].getAttribute('href').slice(1)).offsetTop - nav.offsetHeight) continue;
        Array.prototype.forEach.call(navListElem, function (link) {
            link.classList.remove('active');
        });
        navListElem[i].classList.add('active');
        break;
    }
}

function hideSpans() {
    if (document.documentElement.clientWidth > 659) {
        for (var spanCounter = 0; spanCounter < spans.length; spanCounter++) {
            spans[spanCounter].style.display = "none";
        }
    } else {
        if (navList.classList.contains('active')) {
            spans[0].style.display = "inline";
        } else {
            spans[1].style.display = "inline";
        }
    }
}

function changeSlide(event) {
    var where = void 0;
    if (event.target.parentNode.classList.contains('leftarr') || event.target.classList.contains('leftarr')) where = 'left';else if (event.target.parentNode.classList.contains('rightarr') || event.target.classList.contains('rightarr')) where = 'right';
    var pos = void 0;
    for (var counterImg = 0; counterImg < sliderImgs.length; counterImg++) {
        if (sliderImgs[counterImg].classList.contains('active')) {
            pos = counterImg;
            break;
        }
    }
    sliderImgs[pos].classList.remove('active');
    if (where === 'right') sliderImgs[(pos + 1) % 4].classList.add('active');
    if (where === 'left') sliderImgs[(pos - 1 + 4) % 4].classList.add('active');
}

function changeNavDisplay(event) {
    var target = void 0;
    navList.classList.toggle('active');
    if (event.target.tagName === 'I') target = event.target.parentNode;else target = event.target;
    target.style.display = "none";
    var otherPos = Array.prototype.indexOf.call(spans, event.target) ? 0 : 1;
    spans[otherPos].style.display = "inline";
    window.addEventListener('resize', hideSpans);
    window.addEventListener('click', closeNav);
}

function closeNav(event) {
    var target = event.target;
    while (target.tagName !== 'UL') {
        target = target.parentNode;
    }
    if (!target.classList.contains('mainNav')) {
        navList.classList.remove('active');
        spans[0].style.display = "none";
        spans[1].style.display = "inline";
        window.removeEventListener('click', closeNav);
    }
}

function scroll(event) {
    var target;
    if (Array.prototype.indexOf.call(navElem, event.target) !== -1 || event.target.classList.contains('scroll') || event.target.parentNode.classList.contains('scroll')) {
        event.preventDefault();
        if (event.target.parentNode.classList.contains('scroll')) target = event.target.parentNode;else target = event.target;
        var elemScroll = document.getElementById(target.getAttribute('href').slice(1)).offsetTop;
        scrollingTo(window.pageYOffset, elemScroll - nav.offsetHeight);
    }
}

function scrollingTo(startPos, finishPos) {
    var dist = finishPos - startPos;
    var distMiddle = dist * 1 / 2;
    var distCounter = 0;

    var scrollCounter = 0;
    var counter = 1;

    var scrolling = setInterval(function () {
        window.scrollBy(0, scrollCounter);
        distCounter += scrollCounter;
        if (dist > 0) {
            if (distCounter > distMiddle) {
                scrollCounter -= 3;
            } else {
                scrollCounter += counter;
                counter++;
            }

            if (distCounter + scrollCounter >= dist && distCounter < dist) {
                scrollCounter = dist - distCounter;
            }
            if (distCounter >= dist) clearInterval(scrolling);
        } else {
            if (distCounter < distMiddle) {
                scrollCounter += 3;
            } else {
                scrollCounter -= counter;
                counter++;
            }

            if (distCounter + scrollCounter <= dist && distCounter > dist) {
                scrollCounter = dist - distCounter;
            }
            if (distCounter <= dist) clearInterval(scrolling);
        }
    }, 25);
}

function changeNav() {
    if (window.pageYOffset > 200) {
        nav.classList.add('fixed');
        headerContent.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
        headerContent.classList.remove('fixed');
    }
}

window.addEventListener('scroll', changeNav);