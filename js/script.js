const container = document.querySelector('#card-user-container');
const url = 'https://randomuser.me/api/?results=3';
const plusIcon = document.querySelector('#find-users');
const goBackIcon = document.querySelector('.go-back');

const createNode = (element) => {
  return document.createElement(element);
};

const append = (parent, el) => {
  return parent.appendChild(el);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const clearElements = (parent) => {
  parent.innerHTML = '';
};

const switchModal = () => {
  const modal = document.querySelector('.modal');
  const actualStyle = modal.style.display;

  actualStyle === 'block'
    ? (modal.style.display = 'none')
    : (modal.style.display = 'block');
};

const phoneMask = (value) => {
  //não vai funcionar certinho para todos os valores pois vao ser de diferentes localizaçoes, ficaria bom com numeros brasileiros
  if (!value) return '';

  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  return value;
};

const formatDate = (dateReceived) => {
  let date = new Date(dateReceived);
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  return `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`;
};

const getDataFromAPI = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      DisplayCards(data.results);
    })
    .catch((error) => console.error(error));
};
getDataFromAPI(url);

const DisplayCards = (data) => {
  clearElements(container);
  data.map(function (person) {
    let div = createNode('div');
    let icon = createNode('img');
    let img = createNode('img');
    let name = createNode('p');
    let birthDate = createNode('p');
    let phone = createNode('p');
    let button = createNode('button');
    let figure = createNode('figure');

    div.classList.add('card', 'card-user');

    icon.classList.add('icon');
    img.classList.add('profile-img');
    button.classList.add('trigger');

    person.gender === 'female'
      ? (icon.src = './img/venus-solid.svg')
      : (icon.src = './img/mars-solid.svg');
    img.src = person.picture.large;
    name.innerHTML = `${person.name.first} ${person.name.last}`;
    birthDate.innerHTML = formatDate(person.dob.date);
    phone.innerHTML = phoneMask(person.phone);
    button.innerHTML = 'View Profile';

    append(container, div);
    append(div, icon);
    append(figure, img);
    append(div, figure);
    append(div, name);
    append(div, birthDate);
    append(div, phone);
    append(div, button);

    div.addEventListener('click', () => populateModal(person));
    button.addEventListener('click', switchModal);
  });
};

const populateModal = (person) => {
  const avatar = document.querySelector('#avatar');
  const h3 = document.querySelector('.avatar-name');
  const spanLocation = document.querySelector('.location');
  const spanEmail = document.querySelector('.email');
  const spanPhone = document.querySelector('.phone');
  const spanAge = document.querySelector('.age');
  const spanAddress = document.querySelector('.address');
  const spanUsername = document.querySelector('.username');
  const followers = document.querySelector('.followers-count');
  const following = document.querySelector('.following-count');

  avatar.src = `${person.picture.large}`;
  h3.innerHTML = `${person.name.first} ${person.name.last}`;
  spanLocation.innerHTML = `${person.location.state}, ${person.location.country}`;
  spanEmail.innerHTML = person.email;
  spanPhone.innerHTML = phoneMask(person.phone);
  spanAge.innerHTML = `${person.dob.age} years`;
  spanAddress.innerHTML = `${person.location.street.name}, ${person.location.street.number}`;
  spanUsername.innerHTML = person.login.username;
  followers.innerHTML = `${getRandomInt(0, 100)},${getRandomInt(100, 999)}`;
  following.innerHTML = `${getRandomInt(0, 100)},${getRandomInt(100, 999)}`;
};

plusIcon.addEventListener('click', () => {
  getDataFromAPI(url);
});

window.onclick = (e) => {
  const modal = document.querySelector('.modal');
  if (e.target === modal) {
    switchModal();
  }
};

goBackIcon.addEventListener('click', switchModal);
