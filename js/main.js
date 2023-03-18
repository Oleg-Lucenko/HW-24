
class Components {
    constructor (price, calories) {
        this.price = price;
        this.calories = calories;
    };
};


class Hamburger {

    static SIZE_SMALL= new Components(50, 20);
    static SIZE_BIG = new Components(100, 40);
    static FILLING_CHEESE = new Components(10, 20);
    static FILLING_SALAD = new Components(20, 5);
    static FILLING_POTATO = new Components(15, 10);
    static TOPPING_SAUCE = new Components(15, 0);
    static TOPPING_MAYO = new Components(20, 5);

    constructor(size, filling) {
        this.size = size;
        this.filling = filling;
    };

    addTopping(topping){

        if (!this.topping1 && htmlActions.sauceBtn[0].classList[1] === 'active') {
            this.topping1 = topping;
        } else if (this.topping1 && htmlActions.sauceBtn[0].classList[1] != 'active') {
            delete this.topping1;
        } else if (!this.topping2 && htmlActions.sauceBtn[1].classList[1] === 'active') {
            this.topping2 = topping
        } else if (this.topping2 && htmlActions.sauceBtn[1].classList[1] != 'active') {
            delete this.topping2;
        };
    };

    calculatePrice(){
        let price;
        if (!this.topping1 && !this.topping2) {
            price = this.size.price + this.filling.price;
        } else if (this.topping1 && !this.topping2) {
            price = this.size.price + this.filling.price + this.topping1.price;
        } else if (!this.topping1 && this.topping2) {
            price = this.size.price + this.filling.price + this.topping2.price;
        } else if (this.topping1 && this.topping2) {
            price = this.size.price + this.filling.price + this.topping1.price + this.topping2.price;
        };
        alert('Price: ' + price + ' tugr');
    };

    calculateCalories(){
        let calories;
        if (!this.topping1 && !this.topping2){
            calories = this.size.calories + this.filling.calories;
        } else if (this.topping1 && !this.topping2) {
            calories = this.size.calories + this.filling.calories + this.topping1.calories;
        } else if (!this.topping1 && this.topping2) {
            calories = this.size.calories + this.filling.calories + this.topping2.calories;
        } else if (this.topping1 && this.topping2) {
            calories = this.size.calories + this.filling.calories + this.topping1.calories + this.topping2.calories;
        };
        alert('Calories: ' + calories);
    };
};


let hamburger;

const htmlActions = {
    size: document.querySelector('.size'),
    sizeBtn: document.querySelectorAll('.size-btn'),
    filling: document.querySelector('.filling'),
    fillingBtn: document.querySelectorAll('.filling-btn'),
    sauce: document.querySelector('.sauce'),
    sauceBtn: document.querySelectorAll('.sauce-btn'),
    calculate: document.querySelector('.calculate'),
    calculateCalories: document.querySelector('.calculate-calories'),
    calculatePrice: document.querySelector('.calculate-price'),
    propertiesHamburger: Object.values(Hamburger),
    sizeHolder: false,
    fillingHolder: false,
    sauceHolder: undefined,

    listenersActivation: function(){

    this.size.addEventListener('click', (e) => {
        

        for (i = 0; i < this.sizeBtn.length; i++) {
        if (e.target === this.sizeBtn[i]) {
            this.sizeBtn[i].classList.add('active');
            this.sizeHolder = this.propertiesHamburger[i];
        } else if (e.target != e.currentTarget && e.target != this.sizeBtn[i]) {
            this.sizeBtn[i].classList.remove('active');
        };
        };

        this.check();
    });
    this.filling.addEventListener('click', (e) => {

   
        for (i = 0; i < this.fillingBtn.length; i++) {
        if (e.target === this.fillingBtn[i]) {
            this.fillingBtn[i].classList.add('active');
            this.fillingHolder = this.propertiesHamburger[i+2];
        } else if (e.target != e.currentTarget && e.target != this.fillingBtn[i]) {
            this.fillingBtn[i].classList.remove('active');
        };
        };

        this.check();
    });
    this.sauce.addEventListener('click', (e) => {
        
        for (i = 0; i < this.sauceBtn.length; i++) {
        if (e.target === this.sauceBtn[i]) {
            this.sauceBtn[i].classList.toggle('active');
            this.sauceHolder = this.propertiesHamburger[i+5];
        };
        };

    hamburger.addTopping(this.sauceHolder);
    });

    this.calculate.addEventListener('click', (e) => {
        
        if(e.target === this.calculatePrice) {
            hamburger.calculatePrice();
        } else if (e.target === this.calculateCalories) {
            hamburger.calculateCalories();
        };
    });
    },

    check(){
        if (this.sizeHolder && this.fillingHolder) {

            hamburger = new Hamburger(this.sizeHolder, this.fillingHolder);

            this.sauceBtn[0].removeAttribute('disabled');
            this.sauceBtn[1].removeAttribute('disabled');
            this.calculateCalories.removeAttribute('disabled');
            this.calculatePrice.removeAttribute('disabled');
        };
        if (htmlActions.sauceBtn[0].classList[1] === 'active') {
            hamburger.topping1 = Hamburger.TOPPING_SAUCE;
        };
        if (htmlActions.sauceBtn[1].classList[1] === 'active') {
            hamburger.topping2 = Hamburger.TOPPING_MAYO;
        };
    }
};


htmlActions.listenersActivation();

