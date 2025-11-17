'use strict';
const target = document.getElementById('target');
const names = ['John', 'Paul', 'Jones'];

let html = '';
for (const name of names) {
  html += `<li>${name}</li>`;
}
target.innerHTML = html;
