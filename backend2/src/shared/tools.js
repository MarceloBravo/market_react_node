const bcrypt = require('bcrypt');

let tools = {}

tools.encriptarPassword = async (pwd) => {
    const saltRounds = 10;
    let password = await bcrypt.hash(pwd, saltRounds).then(function(hash) {
        return hash
    });    

    return password
}



module.exports = tools 


