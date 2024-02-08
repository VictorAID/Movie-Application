// Import the required dependencies
const http = require("");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = process.env.PORT || 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  if(req.method === 'GET' && req.url === '/api/v1/movie'){
  // Get all movies
  moviesService.getMovies(req,res);
  }
  else if(req.method === 'GET' && req.url.match(/\/api\/v1\/movie\/([0-9])/)){
    const movieId = req.url.split('/')[4]
  // Get a movie with specified id
  moviesService.getMoviesById(movieId,(error,result)=>{
    if(error){
      res.writeHead(404,{'content-type':'application/json'});
      res.end(JSON.stringify({error}));
    }
    else{
      res.writeHead(200,{'content-type':'application/json'});
      res.end(result);
    }
  })
  }
  else if(req.method === 'POST' && req.url.match(/\/api\/v1\/movie\/([0-9])/)){
    try{
      const requestData = await getRequestData(req);
      const newMovie = JSON.parse(requestData);
  // Save movie 
  moviesService.saveMovie(newMovie,(error,result)=>{
    if(error){
      res.writeHead(400,{'content-type':'application/json'});
      res.end(JSON.stringify({error}));
    }
    else{
      res.writeHead(201,{'content-type':'application/json'});
      res.end(result);
    }
  })
    }
  catch(error){
    res.writeHead(400,{'content-type':'application/json'})
    res.end(JSON.stringify({error:'Invalid JSON data'}));

  }
  }
  else if(req.method==='PUT' && req.url.match(/\/api\/v1\/movie\/([0-9])/)){
    const movieId = req.url.split('/')[4]
    const requestData = await getRequestData(req);
    const updateData = JSON.parse(requestData);
    // Update a specific movie
    moviesService.updateMovie(movieId,updateData,(error,result)=>{
      if(error){
        res.writeHead(400,{'content-type':'application/json'});
        res.end(JSON.stringify({error}));
      }
      else{
        res.writeHead(200,{'content-type':'application/json'});
        res.end(result);
      }
    })
  
  }
  else if(req.method==='DELETE' && req.url.match(/\/api\/v1\/movie\/([0-9])/)){
  const movieId = req.url.split('/')[4]
   // Delete a specific movie
  moviesService.deleteMovieById(movieId,(error,result)=>{
    if(error){
      res.writeHead(400,{'content-type':'application/json'});
      res.end(JSON.stringify({error}));
    }
    else{
      res.writeHead(200,{'content-type':'application/json'});
      res.end(result);
    }
  })
 
  }
  // If no route present capture in the else part
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
