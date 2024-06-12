const { nanoid } = require("nanoid");
const books = require('./books');

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



    if(typeof name === 'undefined'){
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

    
    books.push(newBook);
    

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data : {
                bookId : id,
            },
        });
    
        response.code(201);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal ditambahkan',

    });

    response.code(500);
    return response;  

}

const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    
    if(name==="dicoding"){

        const book = books.filter((book) => book.name == name);

        const response = h.response({
            status : 'success',
            data :{
                book,

            },
            
        });
            
        response.code(200);
        return response;
    }    
    
      let nameBook = books;

      if (typeof name !== 'undefined') {
        nameBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
      }
  
      if (typeof reading !== 'undefined') {
        nameBook = books.filter((book) => Number(book.reading) === Number(reading));
      }
  
      if (typeof finished !== 'undefined') {
        nameBook = books.filter((book) => Number(book.finished) === Number(finished));
      }
  
    const resultBook = nameBook.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  
    const response = h.response({
      status: 'success',
      data: {
        books: resultBook,
      },
    });
  
    response.code(200);
    return response;
};



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
        message : 'Buku tidak ditemukan',
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
    if( typeof name == 'undefined' ){
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku',
        });
    
        response.code(400);
        return response;
    }
    
    const kreadPage = readPage*1;
    const kpageCount = pageCount*1;
    
    if(kreadPage>kpageCount){
        const response = h.response({
            status : 'fail',
            message : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
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
            reading,
            updatedAt,
            finished
    
        };

        const response = h.response({
            status : 'success',
            message : 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;

    }

    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbarui buku. Id tidak ditemukan',

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
            status : 'success',
            message : 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);
    return response;

        


}


    




module.exports= {addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};