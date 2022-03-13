export default class Block {
    constructor(x, y, type, pixel) {
        this.x_raw = x * pixel;
        this.y_raw = y * pixel;
        this.type = type;
        this.y = y;
        this.x = x;
    }

    updateType = (type) => {
        if (type === undefined) {
            return this.type;
        } else {
            this.type = type;
        }
    };
}
