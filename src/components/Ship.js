const shipFactory = (len) => {

    const coords = new Array(len).fill("#");

    // ship should just take a number in length and make that hit, gameboard should know where ship is, not ship
    const hit = (index) => {
        coords[index] = 'X';
        return true;
    }

    const isSunk = () => {
        if ((coords.filter(ele => ele === "#")).length === 0) {
            return true;
        } 
        return false;
    }
    return {coords, hit, isSunk, len}
}

module.exports = {shipFactory}