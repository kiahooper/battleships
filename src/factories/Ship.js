const shipFactory = (len) => {

    const coords = new Array(len).fill("#");

    const hit = (index) => {
        coords[index] = 'X';
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

export {shipFactory}