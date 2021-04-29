/**
 *  dark mode
 */

const scheme = document.querySelector('.scheme');
const body = document.querySelector('body');

function darkmode() {
    window.localStorage.getItem('mode') === 'dark' ? body.classList.add('dark') : 0;
    scheme.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList[0] === 'dark') {
            window.localStorage.setItem('mode', 'dark');
        } else {
            window.localStorage.setItem('mode', 'light');
        }
    })
}
/**
 *  progress bar
 */

const first_circle = document.querySelectorAll('.first_circle');
const second_circle = document.querySelectorAll('.second_circle');
const colors = ['#34A853', '#42A5F5', '#FFA727', '#F06292'];

// let r = first_circle[0].getClientRects()[0].width/2;
let r=70;

// progress bar function

function progressBar() {
    first_circle.forEach(e => {
        same(e);
        e.style = `stroke-dashoffset:${0}`;
    })
    second_circle.forEach(e => {
        let percentage = e.parentElement.parentElement.children[1].children[0].innerText;
        let l = same(e);
        let offset = l - (l * percentage) / 100;
        e.style = `stroke-dashoffset:${l}`;
        setTimeout(() => {
            e.style = `stroke-dashoffset:${offset};transition: 2s stroke-dashoffset;`
        }, 100)
    })
}

function same(e) {
    let l = 2 * Math.PI * r;
    e.setAttribute('r', r);
    e.setAttribute('cx', r);
    e.setAttribute('cy', r);
    e.setAttribute('stroke-dasharray', l);
    return l;
}

function stroke() {
    let i = 0;
    let finalColor = [];
    second_circle.forEach(e => {
        while (finalColor.length !== colors.length) {
            const index = Math.floor(Math.random() * colors.length);
            if (!finalColor.includes(colors[index])) {
                finalColor.push(colors[index]);
            };
        }
        e.setAttribute('stroke', finalColor[i]);
        i++;
        if (i > finalColor.length) {
            i = 0;
        }
    })
}

// onload function

function main() {
    darkmode();
    stroke();
    progressBar();
    document.querySelectorAll('.radial_area svg').forEach(e => {
        e.setAttribute('width', e.clientHeight);
    })
}


window.addEventListener('load', main);
window.addEventListener('resize', progressBar);