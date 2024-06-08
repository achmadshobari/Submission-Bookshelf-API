const { nanoid } = require("nanoid");
const books = require('./books');
const { number } = require("joi");

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



    const id = nanoid(16);

    let finished = (pageCount === readPage) ? true: false;

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage,
        finished, 
        reading,
        insertedAt,
        updatedAt

    };



    if(name==undefined){
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    
        response.code(400);
        return response;
    }
    
    const kreadPage = readPage*1;
    const kpageCount = pageCount*1;
    
    if(kreadPage>kpageCount){
        const response = h.response({
            status : 'fail',
            message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
    
        response.code(201);
        return response;

    }

    
    books.push(newBook);
    

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Catatan berhasil ditambahkan',
            data : {
                bookId : id,
            },
        });
    
        response.code(201);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan gagal ditambahkan',

    });

    response.code(500);
    return response;  

}

const getAllBookHandler = (request, h) => {
    const response = h.response({
        status : 'success',
        data : {            
            books,
        },
    });
    response.code(200);
    return response;

}

const getBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const book = books.filter((b) => b.id === id)[0];

    if(book !== undefined){   
       return{
          status : 'success',
          data : {            
             book,
          },
        };
 
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;

}

const editBookByIdHandler = (request, h) => {
    const {id} = request.params;

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

    console.log(name);
    if(name==""){
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    
        response.code(400);
        return response;
    }
    
    const kreadPage = readPage*1;
    const kpageCount = pageCount*1;
    
    if(kreadPage>kpageCount){
        const response = h.response({
            status : 'fail',
            message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
    
        response.code(400);
        return response;

    }
    
    const index = books.findIndex((b) => b.id === id);
    console.log(index);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year, 
            author, 
            summary, 
            publisher, 
            pageCount,
            readPage,
            reading
    
        };

        const response = h.response({
            status : 'succes',
            message : 'Catatan berhasil diperbaharui',
        });
        response.code(200);
        return response;

    }

    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbaharui catatan, id tidak ditemukan',

    });

    response.code(404);
    return response;  
}

const deleteBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((b) => b.id === id);

    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status : 'succes',
            message : 'Catatan berhasil dihapus',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan gagal dihapus, id tidak ditemukan',
    });

    response.code(404);
    return response;

        


}


    




module.exports= {addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};