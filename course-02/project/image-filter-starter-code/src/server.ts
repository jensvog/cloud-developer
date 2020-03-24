import express, {Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { EEXIST } from 'constants';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Retrieves an image from a public url and sends the file in the response
  app.get( "/filteredimage/", async(req: Request, res: Response) => {
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
                .send("image_url is required");
    }
  
    var localFile: string = await filterImageFromURL(image_url);

    res.status(200).sendFile(localFile, function() { 
                              deleteLocalFiles([localFile])
                            });
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();