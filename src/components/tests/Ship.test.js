const { test, expect } = require("@jest/globals");
const { shipFactory } = require("../ship");

test('expect coords to be array of given length', () => {
    const Ship = shipFactory(3);
    expect(Ship.coords.length).toBe(3);
})

test('expect hit', () => {
    const Ship = shipFactory(3);
    Ship.hit(0);
    expect(Ship.coords[0]).toBe('X');
});

test('expect sunk', () => {
    const Ship = shipFactory(3);
    Ship.hit(0);
    Ship.hit(1);
    Ship.hit(2);
    expect(Ship.isSunk()).toBe(true);
})
