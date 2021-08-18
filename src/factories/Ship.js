export const Ship = (len) => {

    const coords = new Array(len).fill("#");

    const hit = (index) => {
        coords[index] = 'x';
        return coords[index];
    }

    const isSunk = () => {
        if ((coords.filter(ele => ele === "#")).length === 0) {
            return true;
        } 
        return false;
    }
    return {coords, hit, isSunk, len}
}
