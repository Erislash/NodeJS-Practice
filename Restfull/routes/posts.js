const { query } = require('express');
const EXPRESS = require('express');
const router = EXPRESS.Router();
const dbPool = require('../db');

router.get('/', (request, response) => {
    dbPool.getConnection()
    .then(connection => {
        const query = 'SELECT * FROM moviereviews';
        connection.query(query)
        .then(result => {
            let clientRes = '';
            for (row of result) {
                clientRes += `${row.title}\nID: ${row.id}\nReview: ${row.review}\n`;
                clientRes += '==============\n'
            }
            response.send(clientRes);
            connection.end();
        })
        .catch(err => {
            console.error('Cannot get rows:', err);
            connection.end();
        })
    })
    .catch(err => {
        console.error('Cannot connect', err);
    });
})


router.get('/:postID', (request, response) => {
    dbPool.getConnection()
    .then(connection => {
        const query = 'SELECT * FROM moviereviews WHERE id=?';
        connection.query(query, request.params.postID)
        .then(result => {
            if(result.length > 0)
                response.send(result);
            else
                response.json({message:'no rows'});
        })
        .catch(err => {
            console.error(err);
        });
        connection.end();
    })
    .catch(err => {
        console.error(err);
    });
});


router.delete('/:postID', (request, response) => {
    dbPool.getConnection()
    .then(connection => {
        const query = 'DELETE FROM moviereviews WHERE id=?';
        connection.query(query, request.params.postID)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.error(err);
        });
        connection.end();
    })
    .catch(err => {
        console.error(err);
    });
});


router.patch('/:postID', (request, response) => {
    dbPool.getConnection()
    .then(connection => {
        let query = 'UPDATE moviereviews SET title=?, review=? WHERE id=?';
        connection.query(query, [request.body.title, request.body.review, request.params.postID])
        .then(result => {
            response.send(result);
        })
        .catch(err => {
            response.send({message:err});
        })
        connection.end();
    })
    .catch(err => {
        response.send({message:err});
    });
});


router.post('/', (request, response) => {
    if (request.body.hasOwnProperty('title') && request.body.hasOwnProperty('review')){
        dbPool.getConnection()
        .then(connection => {
            const query = 'INSERT INTO moviereviews VALUES(NULL, ?, ?)';
            connection.query(query, [request.body.title, request.body.review])
            .then(result => {
                console.log(result);
                response.json({'message':'Movie Added!!'});
                connection.end();
            })
            .catch(err => {
                response.json({'message':'Cannot Insert into database'});
                console.error('Cannot Insert into database:', err);
            })
        })
        .catch(err => {
            response.json({'message':'Cannot Connect to DB'});
            console.error('Cannot Connect to DB:', err);
        })
    }else{
        console.error('Wrong database schema');
    }
})

module.exports = router;