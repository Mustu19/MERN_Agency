const home = async (req , res) => {
    try {
        res.status(200).send("Welcome to the controller home app!");    
    } catch (error) {
        console.log('error');   
    }
}

const register = async (req, res) => {
    try {
        res.status(200).send("Welcome to the controller register app!");
    } catch (error) {
        console.log('error');
    }
}

module.exports = {home , register}