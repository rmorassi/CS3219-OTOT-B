// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "./index.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

// Test general sever
describe("General", () => {
    describe("GET /", () => {
        it("server is up and running", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.text.should.eql("Hello World with Express");
                    done();
                });
        });
    });
    describe("GET /api", () => {
        it("API is up and running", (done) => {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("success");
                    res.body.message.should.eql("This is confirmation that the API works properly.");
                    done();
                });
        });
    });
});

// Test API endpoints
describe("API services", () => {
    var studentID;
    describe("GET /api/studentRooster", () => {
        // [VALID] Gets student records as intended
        it("[VALID] Gets student records as intended", (done) => {
            chai.request(app)
                .get('/api/studentRooster')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("success");
                    res.body.message.should.eql("Students records retrieved.");
                    res.body.data.should.be.a('array');
                    done();
                });
        });

    });
    describe("POST /api/studentRooster", () => {
        // [VALID] Student records created as intended
        it("[VALID] Student records created as intended", (done) => {
            chai.request(app)
                .post('/api/studentRooster')
                .send({
                    name: 'Alice',
                    house: 'Ponya',
                    roomNumber: 125,
                    gender: 'Female'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("success");
                    res.body.message.should.eql("New student record created.");
                    studentID = res.body.data._id;
                    done();
                });
        });
        // [INVALID] Arguments missing
        it("[INVALID] Arguments missing", (done) => {
            chai.request(app)
                .post('/api/studentRooster')
                .send({
                    name: 'Alice',
                    house: 'Ponya'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("not success");
                    res.body.message.should.eql("Cannot create student record. Required fields were missing.");
                    done();
                });
        });

    });
    describe("GET /api/studentRooster/\'studentID\'", () => {
        // [VALID] Student record fetched as intended
        it("[VALID] Student record fetched as intended", (done) => {
            chai.request(app)
                .get('/api/studentRooster/' + studentID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("success");
                    res.body.message.should.eql("Student record retrieved.");
                    res.body.data._id.should.eql(studentID);
                    done();
                });
        });
        // [INVALID] Student record not found
        it("[INVALID] Student record not found", (done) => {
            chai.request(app)
                .get('/api/studentRooster/' + '636244dce7ee81c5f77aaaaa')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("not success");
                    res.body.message.should.eql("Student record was not found.");
                    done();
                });
        });

    });
    describe("PUT /api/studentRooster/\'studentID\'", () => {
        // [VALID] Student record updated as intended
        it("[VALID] Student record updated as intended", (done) => {
            chai.request(app)
                .put('/api/studentRooster/' + studentID)
                .send({
                    name: 'Mary',
                    house: 'Ora'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("success");
                    res.body.message.should.eql("Student record updated.");
                    res.body.data._id.should.eql(studentID);
                    done();
                });
        });
        // [INVALID] Incorrect types
        it("[INVALID] Incorrect types", (done) => {
            chai.request(app)
                .put('/api/studentRooster/' + studentID)
                .send({
                    roomNumber: 'HAHAH'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("not success");
                    res.body.message.should.eql("Cannot modify. Fields were not of correct type.");
                    done();
                });
        });

    });
    describe("DELETE /api/studentRooster/\'studentID\'", () => {
        // [VALID] Student records deleted as intended
        it("[VALID] Student records deleted as intended", (done) => {
            chai.request(app)
                .delete('/api/studentRooster/' + studentID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("success");
                    res.body.message.should.eql("Student record deleted.");
                    res.body.data._id.should.eql(studentID);
                    done();
                });
        });
        // [INVALID] Student record not found - already deleted
        it("[INVALID] Student record not found - already deleted", (done) => {
            chai.request(app)
                .delete('/api/studentRooster/' + studentID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.eql("not success");
                    res.body.message.should.eql("Cannot delete. Student record was not found.");
                    done();
                });
        });
    });
});