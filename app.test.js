
const request = require("supertest");
const app = require('./app');


// jest.mock('./db');

// describe ("tests collection", ()=> {
//     test ("first test",()=>{
//         expect(true).toBe(true);
//     })
// })


// describe ("GET /users", ()=> {
//     test('responds with JSON messsage', async ()=>{
//       const response = await request(app).get('/users');
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toBeDefined();
//       expect(response.body).not.toBeNull();
//     })
//     })

//  describe ("POST /users", ()=> {
//     test('responds with JSON messsage', async ()=>{
//          const userData = {name: "anele"}
//          const response = await request(app)
//         .post('/users')
//         .send(userData);

//         expect(response.statusCode).toBe(201);
//         expect(response.body).toEqual ({
//          message: "user created"})
//     })
//     })

    describe ("GET /transactions", ()=> {
        test('responds with JSON messsage', async ()=>{
          const response = await request(app).get('/transactions');
          expect(response.statusCode).toBe(200);
          expect(response.body).toBeDefined();
          expect(response.body).not.toBeNull();
          expect(response.body.length).toBe(8)
        })
        })
    
     describe ("POST /transactions", ()=> {
        test('responds with JSON messsage', async ()=>{
             const userData = {"amount": 999999,
             "userFrom": 20000 ,
             "userTo": 254645}
             const response = await request(app)
            .post('/transactions')
            .send(userData);
    
            expect(response.statusCode).toBe(201);
            expect(response.body.amount).toBe (userData.amount);
           
        })
        })