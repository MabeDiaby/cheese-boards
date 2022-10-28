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

    // U - UPDATE
    test('Can Update User', async() => { 
        const findUser = await User.findAll()
        const updateUser = await findUser[0].update({name: 'Mamragbe Diaby'})

        expect(updateUser.name).toBe('Mamragbe Diaby')
     })

     test('Can Update Board', async() => { 
        const findBoard = await Board.findAll()
        const updateBoard = await findBoard[0].update({type: 'Charcuterie'})

        expect(updateBoard.type).toBe('Charcuterie')
      })

      test('Can Update Cheese', async() => { 
        const findCheese = await Cheese.findAll()
        const updateCheese = await findCheese[0].update({title: 'Triple Cream Brie', description: 'Triple Crème Brie is created using traditional French cheese making techniques that start with local milk, added cream, and a unique blend of cultures. The result is a brie style cheese that is smooth and creamy with slightly sweet, milky flavors and a velvety white rind.'})

        expect(updateCheese.title).toBe('Triple Cream Brie')
        expect(updateCheese.description).toBe('Triple Crème Brie is created using traditional French cheese making techniques that start with local milk, added cream, and a unique blend of cultures. The result is a brie style cheese that is smooth and creamy with slightly sweet, milky flavors and a velvety white rind.')
       })

    // D- DELETE
    test('Can Delete User', async() => { 
        const newUser = await User.create({name: 'Betsy Bayliss', email: 'betsy.bayliss@multiverse.io'})
        const findUser = await User.findAll()
        const deleUser = await findUser[1].destroy()

        expect(deleUser.name).toBe('Betsy Bayliss')
     })

     test('Can Delete Board', async() => {
        const newBoard = await Board.create({type: 'Brownie', description: 'A chocolate brownie or simply a brownie is a square or rectangular chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.', rating: 10})
        const findBoard = await Board.findAll()
        const deleBoard = await findBoard[1].destroy()

        expect(deleBoard.type).toBe('Brownie')
     })

     test('Can Delete Cheese', async() => {
        const newCheese = await Cheese.create({title: 'Caramel Brownies', description: 'Caramel brownies are made by stuffing fudgy brownies with caramel sauce in the middle and topping it off with a caramel drizzle. This type of brownie provides layers of chocolate and caramel in every delectable bite.'})
        const findCheese = await Cheese.findAll()
        const deleCheese = await findCheese[1].destroy()

        expect(deleCheese.title).toBe('Caramel Brownies')
     })

     //  Many-to-many
     test('Board and Cheese models with a Many-to-Many relationship', async() => {
        let newestBoard = await Board.create({type: 'Brownie', description: 'A chocolate brownie or simply a brownie is a square or rectangular chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.', rating: 10})
        let newCheese = await Cheese.create({title: 'Caramel Brownies', description: 'Caramel brownies are made by stuffing fudgy brownies with caramel sauce in the middle and topping it off with a caramel drizzle. This type of brownie provides layers of chocolate and caramel in every delectable bite.'})
        let newCheese2 = await Cheese.create({title: 'Caramel2 Brownies', description: 'Caramel brownies are made by stuffing fudgy brownies with caramel sauce in the middle and topping it off with a caramel drizzle. This type of brownie provides layers of chocolate and caramel in every delectable bite.'})

        let findBoard = await Board.findAll()
        let betsyBoard = findBoard[0]
        await betsyBoard.addCheese(newCheese)
        await betsyBoard.addCheese(newCheese2)
        // console.log(findBoard);

        let getBetsyBoard = await betsyBoard.getCheeses()
        expect(getBetsyBoard.length).toBe(2)
    })

    //  One-to-many
    //  test('Multiple Boards can be added to a User', async() => {
    //     let newestUser = await User.create({name: 'David Todd', email: 'david.todd@multiverse.io'})
    //     let newBoard = await Board.create({type:'Cheese', description: 'Three cheeses is usually enough, and the most weve ever done is five cheeses (thats a BIG cheese board).', rating: 7})
    //     let newBoard2 = await Board.create({type: 'Crackers and Breads', description: 'A board with a buttery cracker, a very thin mild cracker, and a seedy, grainy cracker', rating: 10})

    //     let findBoard = await Board.findAll()
    //     let davidsBoard = findBoard[0]
    //     await davidsBoard.addBoard(newBoard)
    //     await davidsBoard.addBoard(newBoard2)
    //     console.log(findBoard);

    //     let getDavidsBoard = await davidsBoard.getBoards()
    //     expect(getDavidsBoard[0].name).toBe('Cheese')
    // })

    // Eager Loading
    test('Eager Loading', async() => { 
        let findBoard = await Board.findAll()
        let cheeses = await Cheese.findAll()

        let newBoard = await Board.create({type: 'David Todds Board',
            description: 'Davids amazing cheese board',
            rating: 10})

        await newBoard.addCheese(cheeses[0])
        await newBoard.addCheese(cheeses[1])
        await newBoard.addCheese(cheeses[2])

        let davidsBoard = await Board.findAll({
            include: [
                {model: Cheese, as: 'cheeses'}
            ]
        })

        console.log(davidsBoard[2].type);
        expect(davidsBoard[2].type).toBe('David Todds Board')
        expect(davidsBoard[2].cheeses.length).toBe(3)
    })
})