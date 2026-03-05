
const errorMidlleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message; 
    console.log(err); 

    let statusCode = err.statusCode || 500 ; 
    let message = err.message || "error unexpected"; 

    if(err.name === "ZodError"){
        message = "validation error"; 
        error = new Error(message); 
        statusCode = 400 ; 
    }

    // error for prisma duplicate 
    if(err.code === "P2002"){
        message = "Duplicate field value entered"; 
        error = new Error(message); 
        statusCode = 400 ; 
    }

    res.status(statusCode).json({success : false , error : message})
  } catch (error) {
    next(error); 
  }
};

export default errorMidlleware ;