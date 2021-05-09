const { v4: uuidv4 } = require('uuid');

class creadorId {
    constructor() {
        this.id = uuidv4();
    }
}

module.exports = creadorId;