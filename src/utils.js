getRequestData = (req) => {
  return new Promise((resolve, reject) => {
   // Write logic to read the request body data here
  try{
    let body = ""
    req.on('data',(chunk)=>{
      body += chunk.toString();
    })
    req.on('end',()=>{
      resolve(body)
    })
  }
  catch(error){
    reject(error)
  }
 
  });
}

module.exports = getRequestData