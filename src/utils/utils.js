const { uuidv4 } = 'uuid';


function createId(){
    return uuid4()
}
module.exports = {createId}