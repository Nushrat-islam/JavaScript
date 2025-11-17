'use strict';
const target = document.getElementById('target');
const students = [
  { value: '2345768', name: 'John' },
  { value: '2134657', name: 'Paul' },
  { value: '5423679', name: 'Jones' }
];

students.forEach(student => {
  const option = document.createElement('option');
  option.value = student.value;
  option.textContent = student.name;
  target.appendChild(option);
});
