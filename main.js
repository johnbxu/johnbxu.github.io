let energy = 500;
const buyMenu = document.getElementById('buy-menu');

function generate(amt) {
  energy += amt;
  document.getElementById('energy').innerHTML = energy;
}

function createProductElement(product) {
  let productElement = document.createElement('div');
  productElement.id = product.elementId;
  
  let productCount = document.createElement('span');
  productCount.id = `${product.elementId}-count`;
  productCount.innerHTML = '0';

  let productCountWrapper = document.createElement('div');
  productCountWrapper.innerHTML = `${product.name}: `;

  let productCostWrapper = document.createElement('div');
  productCostWrapper.innerHTML = 'Cost: ';

  let productCost = document.createElement('span');
  productCost.id = `${product.elementId}-cost`;
  productCost.innerHTML = product.baseCost;
  
  let buyButton = document.createElement('button');
  buyButton.innerHTML = `Buy ${product.name}`;
  buyButton.onclick = () => product.buy();

  productCountWrapper.appendChild(productCount);
  productElement.appendChild(productCountWrapper);
  productCostWrapper.appendChild(productCost);
  productElement.appendChild(productCostWrapper);
  productElement.appendChild(buyButton);

  buyMenu.appendChild(productElement);
  buyMenu.appendChild(document.createElement('br'));
}

class Product {
  constructor(name, elementId, baseCost, baseGeneration) {
    this.name = name;
    this.baseCost = baseCost;
    this.currentCost = baseCost;
    this.amount = 0;
    this.elementId = elementId;
    this.baseGeneration = baseGeneration;
  }

  buy() {
    if (energy >= this.currentCost) {
      energy -= this.currentCost;
      this.amount++;
      this.currentCost = Math.floor(this.baseCost * Math.pow(1.1, this.amount));

      document.getElementById(`${this.elementId}-count`).innerHTML = this.amount;
      document.getElementById(`${this.elementId}-cost`).innerHTML = this.currentCost;
      document.getElementById('energy').innerHTML = energy;
    }
  }
}

const solarPanels = new Product('Solar Panels', 'solar-panels', 10, 1);
const windTurbines = new Product('Wind Turbines', 'wind-turbines', 50, 5);
const geothermal = new Product('Geothermals', 'geothermals', 100, 10);

const products = [solarPanels, windTurbines, geothermal];

products.forEach(product => createProductElement(product));

window.setInterval(function() {
  products.forEach(product => {
    generate(product.amount * product.baseGeneration);
  });
}, 1000);
