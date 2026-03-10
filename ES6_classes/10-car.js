const speciesSymbol = Symbol.species;

export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  static get [speciesSymbol]() {
    return this;
  }

  cloneCar() {
    const Species = this.constructor[speciesSymbol];
    return new Species();
  }
}
