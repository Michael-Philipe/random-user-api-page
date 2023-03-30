const container = document.getElementById('card-user-container');
const url = 'https://randomuser.me/api/?results=3';
const plusIcon = document.getElementById('find-users');
// let currentAuthor = [];

//converter para arrow function

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
      DisplayCards(data.results);
      const buttonViewProfile = document.querySelectorAll('.trigger');

      buttonViewProfile.forEach((currentButton) =>
        currentButton.addEventListener('click', switchModal)
      );
    })
    .catch((error) => console.error(error));
}

function clearCards() {
  container.innerHTML = '';
}

function DisplayCards(authors) {
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
    button.classList.add('trigger');
    author.gender === 'female'
      ? (icon.src = './img/venus-solid.svg')
      : (icon.src = './img/mars-solid.svg');
    img.src = author.picture.large;
    name.innerHTML = `${author.name.first} ${author.name.last}`;
    birthDate.innerHTML = '01/01/2002';
    phone.innerHTML = phoneMask(author.phone);
    button.innerHTML = 'View Profile';
    div.addEventListener('click', () => populateModal(author));

    append(container, div);
    append(div, icon);
    append(div, img);
    append(div, name);
    append(div, birthDate);
    append(div, phone);
    append(div, button);
  });
}

const switchModal = (event) => {
  const modal = document.querySelector('.modal');
  const actualStyle = modal.style.display;
  if (actualStyle === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
};

const phoneMask = (value) => {
  //não vai funcionar certinho para todos os valores pois vao ser de diferentes localizaçoes, ficaria bom com numeros brasileiros
  if (!value) return '';

  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  return value;
};

const populateModal = (person) => {
  console.log(person);
  const avatar = document.getElementById('avatar');
  const h3 = document.querySelector('.avatar-name');
  const spanLocation = document.querySelector('.location');
  const spanEmail = document.querySelector('.email');
  const spanPhone = document.querySelector('.phone');
  const spanAge = document.querySelector('.age');
  const spanAddress = document.querySelector('.address');
  const spanUsername = document.querySelector('.username');

  avatar.src = `${person.picture.large}`;
  h3.innerHTML = `${person.name.first} ${person.name.last}`;
  spanLocation.innerHTML = `${person.location.state}, ${person.location.country}`;
  spanEmail.innerHTML = person.email;
  spanPhone.innerHTML = phoneMask(person.phone);
  spanAge.innerHTML = `${person.dob.age} years`;
  spanAddress.innerHTML = `${person.location.street.name}, ${person.location.street.number}`;
  spanUsername.innerHTML = person.login.username;

  //montar o modal
};

plusIcon.addEventListener('click', () => {
  getDataFromAPI(url);
});

getDataFromAPI(url);

// name, location, country, email, age, phone , picture username?

window.onclick = (e) => {
  const modal = document.querySelector('.modal');
  if (e.target === modal) {
    switchModal();
  }
};
