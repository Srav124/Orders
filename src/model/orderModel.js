'use strict';

module.exports = {
    Orders: class {
        constructor() {

        }

        async dbConnection(pool, querytodo){
            return new Promise ((resolve, reject) => {
                pool.connect((err, client, done) => {
                    if(err){
                        console.error('Unable to connect', err);
                        return reject(err);
                    }

                    client.query(querytodo, function(err, result) {

                        done();

                        if (err) {

                            console.error('Got error while executing sql', err)
                            return reject(err);
                        }

                        this.data = result.rows;

                        resolve(this)
                    })
                }
                )
            })

        }

        async getAllOrders(pool) {

            const query = `select * from application.orders order by delivery_date `;

            try {

                this.data = await this.dbConnection(pool, query);

            } catch(e) {
                console.error('Unable get the allorders')
            }

            return (this.data)
        }

        async createOrder(pool, req) {
            const query = `INSERT INTO application.orders(
                order_id, product_name, cost, order_date, delivery_date)
                VALUES (${req.order_id},'${req.item_name}',${req.cost},'${req.order_date}','${req.delivery_date}')`;


            
                try {

                    
                    this.data = await this.dbConnection(pool, query);
                   
                    if(this.data._result.rowCount == 1){
                        return 'Order placed succesfully'
                    } else{
                        return 'something went wrong please try later!!!!'
                    }
                    
    
                } catch(e) {
                    console.error('Unable create orders')
                    return 'Unable create orders'
                }

        }

        async updateOrder(pool, id, data) {
            console.log('order id', id);
            console.log('order date', data.delivery_date)
            const query = `UPDATE application.orders SET delivery_date='${data.delivery_date}' WHERE order_id=${id};`;
                try {
                    
                    this.data = await this.dbConnection(pool, query);

                    if(this.data._result.rowCount == 1){
                        return 'Updated succesfully'
                    } else{
                        return 'something went wrong please try later!!!!'
                    }
                    
                } catch(e) {
                    console.error('Unable create orders')
                    return 'Unable create orders'
                }

        }

        async deleteOrder(pool, id) {
            const query = `DELETE FROM application.orders WHERE order_id=${id};`;
                try {
                    
                    this.data = await this.dbConnection(pool, query);

                    if(this.data._result.rowCount == 1){
                        return 'Deleted  succesfully'
                    } else{
                        return 'something went wrong please try later!!!!'
                    }
                    
                } catch(e) {
                    console.error('Unable create orders')
                    return 'Unable create orders'
                }

        }

        async orderDetails(pool, id) {
            const query = `select * from application.orders WHERE order_id=${id};`;
                try {
                    
                    this.data = await this.dbConnection(pool, query);

                    return(this.data)

                } catch(e) {
                    console.error('Unable create orders')
                    
                }

        }
    }
}