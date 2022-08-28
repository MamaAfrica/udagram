import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
// console.log(filterImageFromURL('https://res.cloudinary.com/ovaltech/image/upload/v1661608198/LOGINAPP/qlhzyoljjk3zcw7cbias.png'));

(async () => {

  // Init the Express application
  const app = express();

  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  // const image_url = 'https://res.cloudinary.com/ovaltech/image/upload/v1661608198/LOGINAPP/qlhzyoljjk3zcw7cbias.png';
  // app.get("/filteredimage",(req, res)=>{
  //   res.send('Hello');
  // });

  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
    const {image_url}= req.query;
    // res.send(image_url)
    if (!image_url){
      return res.status(400)
      .send(`image url is required`);
    }
    const image= await filterImageFromURL(image_url);
    res.sendFile(image);
    console.log(image)
  } );

  app.get( "/deleteimage/", async ( req: Request, res: Response ) => {
    const {image_name}= req.query;
    if (!image_name){
      return res.status(400)
      .send(`image name is required`);
    }
    const path = `C:/Users/HP/Desktop/cloud-developer-master/cloud-developer-master/course-02/project/image-filter-starter-code/src/util/tmp/${image_name}`
    // const image= await filterImageFromURL(image_url);
      const removed= await deleteLocalFiles([path]);
      res.send('deleted successfully');
  } );
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1


  // Root Endpoint
  // Displays a simple message to the user
  // app.get( "/", async ( req, res ) => {
  //   res.send("try GET /filteredimage?image_url={{}}")
  // } );
  
  // Set the network port
  const port = process.env.PORT || 8082;

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();