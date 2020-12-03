const {Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = Schema( {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    address2: String,
    state: String,
    city: String,
    zip: String
});

// el .methods ya esta definido para poner ahi dentro metodos que definamos
// y asi pasarlos al exports
UserSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePassword = async function(password) {
    // el this.password es el .password del objecto que llama la funcion
    // con user.encryptPassword(password), sería equivalente a user.password
    return bcrypt.compare(password, this.password);
}

module.exports = model('users', UserSchema);