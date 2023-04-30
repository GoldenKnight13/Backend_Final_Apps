const express = require('express')
const {userLogIn, createUser,
    updateUserName, updateRoutes,
    deleteUser} = require('../Controllers')

const router = express.Router()

//Endpoints
router.get('/api/userLogIn', userLogIn)
router.post('/api/createUser', createUser)
router.post('/api/updateUserName', updateUserName)
router.post('/api/updateRoutes', updateRoutes)
router.delete('/api/deleteUser', deleteUser)

module.exports = {
    router
}