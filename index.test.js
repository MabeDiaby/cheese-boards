const {sequelize} = require('./db')
const {Board, Cheese, User} = require('./index')

describe('User Cheese Boards', () => {
    beforeAll(async () => {

        await sequelize.sync({ force: true })
    })

    // C - CREATE
    test('Can Create User', async() => { 
        const createUser = await User.create({name: 'Mamragbe', email: 'mdiaby@cisco.com'})

        expect(createUser.name).toBe('Mamragbe')
        expect(createUser.email).toBe('mdiaby@cisco.com')
      })

    test('Can Create Board', async() => { 
        const createBoard = await Board.create({type: 'Best cheses ever', description: 'OMG so many cheese', rating: 10})

        expect(createBoard.type).toBe('Best cheses ever')
        expect(createBoard.description).toBe('OMG so many cheese')
        expect(createBoard.rating).toBe(10)
     })

     test('Can Create Cheese', async() => {
        const createCheese = await Cheese.create({title: 'Manchego', description: 'Manchego has a firm and compact consistency and a buttery texture, often containing small, unevenly distributed air pockets. The colour of the cheese varies from white to ivory-yellow, and the inedible rind from yellow to brownish-beige.'})

        expect(createCheese.title).toBe('Manchego')
        expect(createCheese.description).toBe('Manchego has a firm and compact consistency and a buttery texture, often containing small, unevenly distributed air pockets. The colour of the cheese varies from white to ivory-yellow, and the inedible rind from yellow to brownish-beige.')
     })

    // R - READ
    test('Can Read User', async() => { 
        const findUser = await User.findAll()
        expect(findUser[0].name).toBe('Mamragbe')
     })

     test('Can Read Board', async() => {
        const findBoard = await Board.findAll()
        expect(findBoard[0].type).toBe('Best cheses ever')
     })

     test('Can Read Cheese', async() => { 
        const findCheese = await Cheese.findAll()
        expect(findCheese[0].title).toBe('Manchego')
      })


})