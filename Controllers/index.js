const { db } = require('../Firebase')
const crypto = require('crypto')


//Create
const userLogIn = async(req, res) => {

    try {

        const logInInfo = req.body
        const id = crypto.createHash('sha256').update(logInInfo.email).digest('hex')

        let user = await db.collection("Users").doc(id).get()
        user = user.data()

        if (user === undefined){

            res.send({
                status: 404,
                message: "User does not exist"
            })

        } else {

            if ( crypto.createHash('sha256').update(logInInfo.password).digest('hex') === user.password ){

                const userInfo = {
                    userName: user.userName,
                    myRoutes: user.myRoutes
                }

                res.send({
                    status : 202,
                    userInfo
                })

            } else {

                res.send({
                    status: 401,
                    message: "Wrong password"
                })

            }
        }

    } catch (error) {
        res.send({
            status: 500,
            message: "Internal server error"
        })        
    }
}



//Read
const createUser = async (req, res) => {

    try {
        
        const newUserData = req.body

        const id = crypto.createHash('sha256').update(newUserData.email).digest('hex')
        newUserData.password = crypto.createHash('sha256').update(newUserData.password).digest('hex')

        delete newUserData.email
        const newUser = {
            ...newUserData,
            myRoutes: {
                length: 0,
                Routes: []
            }
        }

        await db.collection('Users').doc(id).set(newUser)

        const actualDate = new Date( Date.now() )
        const date = `${actualDate.getFullYear()}/${actualDate.getMonth() + 1}/${actualDate.getDate()}`

        res.send({
            status : 201,
            date
        })

    } catch (error) {
        res.send({
            status: 500,
            message: "Internal server error"
        })        
    }
}



//Update
const updateUserName = async(req, res) => {

    try {

        const user = req.body
        const id = crypto.createHash('sha256').update(user.email).digest('hex')

        let name = await db.collection("Users").doc(id).update({
            userName: user.newUserName
        })

        res.send({status: 200})

    } catch (error) {

        res.send({
            status: 500,
            message: "Internal server error"
        })

    }

}

const updateRoutes = async (req,res) => {

    try {

        const user = req.body
        const id = crypto.createHash('sha256').update(user.email).digest('hex')

        let userInfo = await db.collection("Users").doc(id).get()
        userInfo = userInfo.data()

        const routeToAppend = {
            id:  userInfo.myRoutes.length + 1,
            beggining: user.newRoute.beggining,
            ending: user.newRoute.ending,
        }

        const updatedRoutes = {
            length: userInfo.myRoutes.length + 1
        }
        console.log(updatedRoutes)


       /*  let update = await db.collection("Users").doc(id).update({
            myRoutes: updatedRoutes
        }) */

        res.send({status: 200})

    } catch (error) {

        res.send({
            status: 500,
            message: "Internal server error"
        })

    }

}



//Delete
const deleteUser = async(req,res) => {
    try {
        
        const deletedUser = req.body

        const id = crypto.createHash('sha256').update(deletedUser.email).digest('hex')
        await db.collection('Users').doc(id).delete()

        res.send({status:200})

    } catch (error) {
        res.send({
            status: 500,
            message: "Internal server error"
        })
    }
}



module.exports = {
    userLogIn,
    createUser,
    updateUserName,
    updateRoutes,
    deleteUser
}