const container = document.getElementById('card-user-container');
const url = 'https://randomuser.me/api/?results=3';
const plusIcon = document.getElementById('find-users');

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function getDataFromAPI(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      clearCards();
      populatePage(data.results);
    })
    .catch((error) => console.error(error));
}

function clearCards() {
  container.innerHTML = '';
}

function populatePage(authors) {
  console.log(authors);
  authors.map(function (author) {
    let div = createNode('div');
    let icon = createNode('img');
    let img = createNode('img');
    let name = createNode('p');
    let birthDate = createNode('p');
    let phone = createNode('p');
    let button = createNode('button');

    div.classList.add('card', 'card-user');

    icon.classList.add('icon');
    author.gender === 'female'
      ? (icon.src = './img/venus-solid.svg')
      : (icon.src = './img/mars-solid.svg');
    img.src = author.picture.large;
    name.innerHTML = `${author.name.first} ${author.name.last}`;
    birthDate.innerHTML = '01/01/2002';
    phone.innerHTML = author.phone;
    button.innerHTML = 'View Profile';
    append(container, div);
    append(div, icon);
    append(div, img);
    append(div, name);
    append(div, birthDate);
    append(div, phone);
    append(div, button);
  });
}

plusIcon.addEventListener('click', () => {
  getDataFromAPI(url);
});

getDataFromAPI(url);
