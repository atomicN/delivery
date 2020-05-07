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
      cardsMenu = document.querySelector('.cards-menu'),
      restaurantTitle = document.querySelector('.section-title');

let login = localStorage.getItem('delivery');
//checking for authorization

const getData = async function(url){
  const response = await fetch(url);

  if (!response.ok){
    throw new Error(`error on address ${url},
     status of error ${response.status}!`);
  }
 
  return await response.json();
}



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
      buttonAuth.style.display = '';
      userName.style.display = '';
      buttonOut.style.display = '';
      buttonOut.removeEventListener('click', logOut);
  }

  

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized(){
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

function createCardRestaurant(restaurant){
  
  const { image, 
          kitchen, 
          name, 
          price, 
          stars, 
          products, 
          time_of_delivery } = restaurant;
  
  const card = `
  <a class="card card-restaurant" data-products="${products}">
		<img src="${image}" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title">${name}</h3>
				<span class="card-tag tag">${time_of_delivery}</span>
			</div>

			<div class="card-info">
				<div class="rating">
					${stars}
				</div>
				<div class="price">${price} ₽</div>
				<div class="category">${kitchen }</div>
			</div>
			
	  </div>
  </a>`;
  
  // const menuCard= `
  //   <div class="section-heading">
	//   	<h2 class="section-title restaurant-title">${name}</h2>
	//   	<div class="card-info">
	//   		<div class="rating">
	//   			${stars}
	//   		</div>
	//   		<div class="price">${price} ₽</div>
	//   		<div class="category">${kitchen}</div>
	//   	</div>
	  
	//   </div>
  // ` ;
  // menu.insertAdjacentHTML('afterbegin', menuCard);
  cardsRestaurants.insertAdjacentHTML('beforeend',card);
}

function createCardGood(goods){

  const { description, id, image, name, price } = goods;
  
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
	  <img src="${image}" alt="image" class="card-image"/>
	  <div class="card-text">
	  	<div class="card-heading">
	  		<h3 class="card-title card-title-reg">${name}</h3>
	  	</div>
	  	<div class="card-info">
	  		<div class="ingredients">${description}
	  		</div>
	  	</div>
	  	<div class="card-buttons">
	  		<button class="button button-primary button-add-cart">
	  			<span class="button-card-text">В корзину</span>
	  			<span class="button-cart-svg"></span>
	  		</button>
	  		<strong class="card-price-bold">${price} ₽</strong>
	  	</div>
	  </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event){
  const target = event.target;
  
  if (login){
    const restaurant = target.closest('.card-restaurant');

    if (restaurant){
       
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      getData(`../db/${restaurant.dataset.products}`).then(function(data){
        data.forEach(createCardGood)
      });     
    }
  }
  else {
    toggleModalAuth();
  }
}

function init(){
  getData('../db/partners.json').then(function(data){
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener("click", toggleModal);
  
  close.addEventListener("click", toggleModal);
  
  cardsRestaurants.addEventListener('click', openGoods);
  
  logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
  
  checkAuth();
}

init();
