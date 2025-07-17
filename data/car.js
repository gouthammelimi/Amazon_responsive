class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen;
    constructor (details){
        this.#brand = details.brand;
        this.#model = details.model;
        //console.log(this.brand);
        //console.log(this.model);
               
    }

    displayInfo(){
        console.log(`Brand = ${this.#brand} and Model = ${this.#model}`);
        console.log(`speed = ${this.speed}`);
        
    }

    go(){
        this.speed += 5;
    }

    break (){
        this.speed -= 5;
    }

    openTrunk(){
        if(this.speed > 0){
            console.log(`cannot open trunk as car speed = ${this.speed}`);
        }
        else{
            console.log('Car trunk is opened');
        }
    }

    closeTrunk(){
        console.log('Car trunk is closed');
        
    }

}

class RaceCar extends Car{
    acceleration;
    
    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

}


let car1 = new Car({brand: 'Toyota',model:'Corolla'});
car1.displayInfo();
let car2 = new Car({brand:'Tesla', model:'Model 3'});
car2.displayInfo();
car1.go();
car1.displayInfo();
car2.openTrunk();
car1.openTrunk();
car1.break();
car1.openTrunk();
console.log(car1);
console.log(car2);


const raceCar = new RaceCar({brand:'McLaren', model:'F1', acceleration:20});
raceCar.go();
raceCar.displayInfo();