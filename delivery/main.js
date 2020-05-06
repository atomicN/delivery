'use strict';


const cartButton = document.querySelector("#cart-button"),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".close"),
      buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      logInInput = document.querySelector('#login'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out'),
      cardsRestaurants = document.querySelector('.cards-restaurants'),
      containerPromo = document.querySelector('.container-promo'),
      restaurants = document.querySelector('.restaurants'),
      menu = document.querySelector('.menu'),
      logo = document.querySelector('.logo'),
      cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('delivery');
//checking for authorization
let authorize_check = false;



function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized(){

  function logOut(){
      login = '';
      localStorage.removeItem('delivery');
      checkAuth();
      authorize_check = false;
      buttonAuth.style.display = '';
      userName.style.display = '';
      buttonOut.style.display = '';
      buttonOut.removeEventListener('click', logOut);
  }

  authorize_check = true;

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized(){
  authorize_check = false;
  console.log('not authorized');

  function logIn(event){
    event.preventDefault();
    login = logInInput.value;
    localStorage.setItem('delivery', login);

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth(){
  if (login) {
    authorized();
  }
  else {
    notAuthorized();
  }
}

function createCardRestaurant(){
  const card = `
  <a class="card card-restaurant">
		<img src="img/pizza-burger/preview.jpg" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title">PizzaBurger</h3>
				<span class="card-tag tag">45 мин</span>
			</div>

			<div class="card-info">
				<div class="rating">
					4.5
				</div>
				<div class="price">От 700 ₽</div>
				<div class="category">Пицца</div>
			</div>
			
	  </div>
	</a>`;

  cardsRestaurants.insertAdjacentHTML('beforeend',card);
}

function createCardGood(){
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
	  <img src="img/pizza-plus/pizza-oleole.jpg" alt="image" class="card-image"/>
	  <div class="card-text">
	  	<div class="card-heading">
	  		<h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
	  	</div>
	  	<!-- /.card-heading -->
	  	<div class="card-info">
	  		<div class="ingredients">Соус томатный, сыр «Моцарелла», черри, маслины, зелень, майонез
	  		</div>
	  	</div>
	  	<!-- /.card-info -->
	  	<div class="card-buttons">
	  		<button class="button button-primary button-add-cart">
	  			<span class="button-card-text">В корзину</span>
	  			<span class="button-cart-svg"></span>
	  		</button>
	  		<strong class="card-price-bold">440 ₽</strong>
	  	</div>
	  </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event){
  const target = event.target;

  const restaurant = target.closest('.card-restaurant');

  if (restaurant){
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    createCardGood();
  }
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', () =>{
  
  //if user authorized open restaurant cards
  if (authorize_check) openGoods();

  //else open authorization modal window
  toggleModalAuth();
});

logo.addEventListener('click', () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

