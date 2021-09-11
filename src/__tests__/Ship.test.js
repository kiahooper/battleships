const { test, expect } = require("@jest/globals");
const { Ship } = require("../factories/Ship");

test('expect coords to be array of given length', () => {
    const ship = Ship(3);
    expect(ship.coords.length).toBe(3);
})

test('expect hit', () => {
    const ship = Ship(3);
    ship.hit(0);
    expect(ship.coords[0]).toBe('x');
});

test('expect sunk', () => {
    const ship = Ship(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
})
