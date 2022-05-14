const express = require('express'),
    router = express.Router(),
    bodyparser = require('body-parser'),
    model = require('../../model/orderModel'),
    errors = require('throw.js')
    pg = require('pg');


const pool = new pg.Pool({user:process.env.PGUSER},
    {database: process.env.PGDATABASE},
    {password: process.env.PGPASSWORD},
    {port: process.env.PORT});


router.use(bodyparser.json());

const Model = new model.Orders();


const getAllOrders = async function(req, res, next) {
    try {
        const response = await Model.getAllOrders(pool, req);
        res.json(response.data);
    } catch (e) {
        next ( new errors.InternalServerError());
    } 
},
createOrder = async function(req, res, next) {
    
    try {
        const response = await Model.createOrder(pool, req.body);
        res.json(response);
    } catch (e) {
        next ( new errors.InternalServerError());
    }
},
updateOrder = async function(req, res, next) {
    console.log('inside update', req.params.id, req.body)
    try {
        const response = await Model.updateOrder(pool, req.params.id, req.body);
        res.json(response);
    } catch (e) {
        next ( new errors.InternalServerError());
    }
},
deleteOrder = async function(req, res, next) {
    try {
        const response = await Model.deleteOrder(pool, req.query.id);
        res.json(response);
    } catch (e) {
        next ( new errors.InternalServerError());
    }
},
orderDetails = async function(req, res, next) {
    try {
        const response = await Model.orderDetails(pool, req.params.id);
        res.json(response.data);
    } catch (e) {
        next ( new errors.InternalServerError());
    }
}



router.get('/list', getAllOrders);
router.post('/create', createOrder);
router.post('/update/:id', updateOrder);
router.delete('/delete', deleteOrder);
router.get('/search/:id', orderDetails);




module.exports = router