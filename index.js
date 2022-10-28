const {Board} = require('./models/Board')
const {Cheese} = require('./models/Cheese')
const {User} = require('./models/User')

User.hasMany(Board)
// Board.hasMany(User)

Board.belongsToMany(Cheese, {through: 'cheese_boards'})
Cheese.belongsToMany(Board, {through: 'cheese_boards'})

module.exports = {
    Board,
    Cheese,
    User
}