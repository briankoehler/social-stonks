const test = document.createElement('div');
const main = document.querySelector('body');
const thing = document.getElementById('rhs');

test.textContent = "heyyyyyyy";
test.setAttribute("class", "carddd")
main.appendChild(test);
thing.insertBefore(test, thing.childNodes[0]);
