
// all elements store in varibale
const mainImage = document.getElementById("mainImage");
const title = document.getElementById("title");
const vendor = document.getElementById("vendor");
const price = document.getElementById("price");
const comparePrice = document.getElementById("comparePrice");
const offer = document.getElementById("off");
const descriptionBox = document.getElementById("descriptionBox");

//option selection elements variables
const sizeOptionContainer = document.getElementById("sizeOptionContainer");
const colorOptionContainer = document.getElementById("colorOptionContainer");
let rad;

//quantity varaible
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const quantityValue = document.getElementById("quantityValue");

//
const message = document.getElementById("message");
const cartMessage = document.getElementById("cartMessage");
const Cart = document.getElementById("cartButton");

let selectedColor = "";
let selectedSize = "";
quantityValue.textContent = 1;

//product Data
let productData;
let images = [
  "images/laura-chouette-6Y2XstWtDvM-unsplash1.jpg",
  "images/laura-chouette-HVlOLCHlzJs-unsplash2.jpg",
  "images/laura-chouette-om8qxMDlGfI-unsplash3.jpg",
  "images/laura-chouette-WQgvRkmqRrg-unsplash4.jpg",
  "images/laura-chouette-WYGkGp7TZjQ-unsplash5.jpg",
];

//getting product data
fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json"
)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    //storing product data
    let { product } = res;
    productData = product;
    console.log(productData);

    //off percentage
    let off =
      100 -
      Math.ceil(
        (product.price.slice(1) * 100) / product.compare_at_price.slice(1)
      );

    //assigning value to the info and detaile feilds of products
    mainImage.src = images[0];
    title.innerText = product.title;
    vendor.textContent = product.vendor;
    price.innerText = product.price + ".00";
    comparePrice.textContent = product.compare_at_price + ".00";
    offer.textContent = `${off} % Off`;
    descriptionBox.innerHTML = product.description;
    createSizeelements();
    creatColorCheckbox();
  })
  .catch((err) => {
    console.log(err);
  });

//images selection logic
document.addEventListener("DOMContentLoaded", function () {
  const secondaryImageList = document.getElementById("secondaryImageList");
  for (let i = 1; i < images.length; i++) {
    const listItem = document.createElement("li");
    const image = document.createElement("img");
    image.src = images[i];
    image.classList.add("secondaryImg");
    listItem.appendChild(image);
    secondaryImageList.appendChild(listItem);

    image.addEventListener("click", function () {
      mainImage.src = images[i];
      // image.style.border  = "3px solid red"
    });
  }
});

// Iterate through the data and create radio buttons dynamically
function createSizeelements() {
  let size = productData.options[1].values;
  console.log(size);
  console.log(size.length);
  size.forEach((item, index) => {
    console.log(index);
    // Create a div element for each radio button with the class 'option'
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option"); // Add the 'option' class to the div

    // Create a radio button element
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "size"; // Set the same name for all radio buttons to make them mutually exclusive
    radio.id = item.toLowerCase(); // Set a unique id for each radio button based on the item
    radio.value = item;
    radio.setAttribute("accentColor", "#3a4980");

    // checkbox.setAttribute("id" ,"Radio"); // Add the 'checkbox' class to the checkbox

    // Create a label for the radio button
    const label = document.createElement("label");
    label.textContent = item;
    label.setAttribute("for", item.toLowerCase()); // Set the 'for' attribute of the label

    // Add an event listener to the radio button
    radio.addEventListener("change", function () {
      if (this.checked) {
        selectedSize = this.value;
        // Remove the 'selected' class from all options
        document.querySelectorAll(".option").forEach((option) => {
          option.classList.remove("selectedOption");
        });
        // Add the 'selected' class to the current option
        optionDiv.classList.add("selectedOption");
      }
    });

    // Append the radio button and label to the div
    optionDiv.appendChild(radio);
    optionDiv.appendChild(label);

    // Append the div to the container
    sizeOptionContainer.appendChild(optionDiv);
  });
}

// checkBox Method for Color selection
function creatColorCheckbox() {
  // Assuming your data is stored in a variable named 'data'
  const colorData = productData.options[0].values;

  // Iterate through the data and create checkboxes dynamically
  colorData.forEach((item) => {
    // Get the key and value from each item in the data
    const key = Object.keys(item)[0];
    const value = item[key];

    // Create a div element for each color block with the class 'colorBlock'
    const colorBlockDiv = document.createElement("div");
    colorBlockDiv.classList.add("colorBlock");
    // Add the 'colorBlock' class to the div

    // Create a checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = value;
    checkbox.classList.add("checkbox"); // Add the 'checkbox' class to the checkbox

    // Set background color based on the value
    checkbox.style.backgroundColor = value;

    // Add an event listener to the checkbox
    checkbox.addEventListener("change", function () {
      // Uncheck all other checkboxes
      document.querySelectorAll(".checkbox").forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
          cb.parentElement.style.borderColor = "white";
        }
      });

      // Check the clicked checkbox
      checkbox.checked = true;

      // Add border color to the color block div if checkbox is checked

      if (checkbox.checked) {
        colorBlockDiv.style.borderColor = value;
      } else {
        colorBlockDiv.style.borderColor = "white"; // Reset border color if checkbox is unchecked
      }
      selectedColor = [key, this.value];

      console.log("Selected color:", selectedColor);
    });

    // Append the checkbox to the color block div
    colorBlockDiv.appendChild(checkbox);

    // Append the color block div to the container
    colorOptionContainer.appendChild(colorBlockDiv);
  });
}

//method to add and remove items

let quantity = 0;

remove.addEventListener("click", function () {
  if (quantity > 0) {
    quantity--;
    quantityValue.textContent = quantity;
  }
});

add.addEventListener("click", function () {
  quantity++;
  quantityValue.textContent = quantity;
});

//Add Cart event code
Cart.addEventListener("click", () => {
  console.log(selectedColor, selectedSize);
  if (selectedColor && selectedSize) {
    cartMessage.style.backgroundColor = selectedColor[1];
    message.textContent = `${productData.title} with Color ${selectedColor[0]} and Size ${selectedSize} to cart`;
    console.log("hello");
  }
});
