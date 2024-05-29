const { nanoid } = require("nanoid");

const addBookHandler = (request, h) => {
    const {
        name,
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
    }= request.payload;

    let finished = (pageCount === readPage) ? true: false;

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newNote = {
        title, tags

    };


};

module.exports= {addBookHandler};