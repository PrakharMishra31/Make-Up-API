const url = `http://makeup-api.herokuapp.com/api/v1/products.json`;

let prodType = [];
let uniqueProdType;

//Selecting HTML elements

const header = document.querySelector(".header");
const prodTypeContainer = document.querySelector(".product-type");
const navBar = document.createElement("nav");

function domElementsCreation() {
  //Creating a description for site
  const siteDescription = document.createElement("article");
  siteDescription.innerHTML = `Providing all your Make-Up requirements at one Place!!
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, molestias! Debitis ut nobis pariatur deleniti rerum! Placeat iste, a modi temporibus, omnis officiis, enim laborum repudiandae vitae fugiat sequi ut?`;

  //Creating div for Image insertion
  const img = document.createElement("div");
  img.classList.add("main-image");
  img.innerHTML = ` 
<img class="image-main" src='https://st.depositphotos.com/1000260/2221/i/600/depositphotos_22213575-stock-photo-decorative-cosmetics-for-makeup.jpg' />`;

  //Appending the description and image in the header
  header.appendChild(siteDescription);
  header.appendChild(img);

  //Creating Nav Bar element for ease in navigation to product types

  navBar.innerHTML = `<nav class="navbar navbar-light bg-light"></nav>`;
  header.insertAdjacentElement("afterend", navBar);
}

//Get the Data from the URL

async function getData() {
  let fetchedData;

  //Calling the DOM Element Methods
  domElementsCreation();

  try {
    const data = await fetch(url, {
      method: "GET",
      header: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    fetchedData = res;
    console.log(res);

    //Pushing product type in array

    res.forEach((prod) => {
      prodType.push(prod.product_type);
    });

    //Unique list for product type
    uniqueProdType = new Set(prodType);

    //Calling Unique Product function
    uniqueProduct();
  } catch (err) {
    console.log(err);
  }
  return fetchedData;
}

function uniqueProduct() {
  //Creating HTML for individual product types

  uniqueProdType.forEach((el, i) => {
    prodTypeContainer.innerHTML += `
    <a name="section--${i}"></a>
    <div class="${el}">
       <h2 class="product-header text-center">${el
         .toUpperCase()
         .replace("_", " ")}</h2> 
       <div class="row"></div>
    </div>
    `;

    //Adding Nav Bar for directing to the particular product type
    navBar.querySelector(
      ".navbar"
    ).innerHTML += `<a class="navbar-brand" href="#section--${i}">${el
      .toUpperCase()
      .replace("_", " ")}</a>`;
  });
}

//Segregating the products based on the product types and adding it in the HTML
async function productSegregation() {
  let res = await getData();

  res.forEach((prod) => {
    [...uniqueProdType].forEach((el) => {
      if (prod.product_type === el) {
        const element = document.querySelector(`.${el}`);
        element.querySelector(".row").innerHTML += `
          <div class="col-3">
            <div class="product-card">
              <div class="image">
                <img class="image-prod" src="${prod.api_featured_image} alt="${
          prod.name
        } />
              </div>
              <div class="product-brand"> <b>${justifiedString(
                prod.brand
              )} </b> </div>
              <div class="product-name"> Name: ${justifiedString(
                prod.name
              )} </div>
              <div> Price: ${prod.price_sign ? prod.price_sign : "$"} ${
          prod.price
        } </div>
              <div class="prod-link">
                <a class="link prod-link" href="${
                  prod.product_url
                } target="_blank">Product Link!</a>
              </div>
              <div class="product-description"> Description </div>
              <button class="btn btn-buy">BUY</button>
            </div>
          </div>`;
      }
      //Product Description to be added in a seperate Product detail page
      // const prodDescription = document.querySelector(".product-description");
      // console.log(prodDescription);
      // prodDescription.addEventListener("click", function () {
      //   const description = document.createElement("div");
      //   description.innerHTML = `
      // <div class="modal-dialog">
      //   ${prod.description}
      // </div>`;
      //   prodDescription.appendChild(description);
      // });
    });
  });
}
productSegregation();

function justifiedString(str) {
  const newStr = str.toUpperCase();
  return newStr;
}
