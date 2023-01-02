import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImage, deleteFiles } from "./util";

(async () => {
  const app = express();
  const port = process.env.PORT || 8081;
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req: Request, res: Response) => {
    const image_url = req.query.image_url;
    let result: string = null;

    if (!image_url) {
      return res.status(400).send({ message: "URL is required" });
    }

    try {
      result = await filterImage(image_url);
    } catch (error) {
      return res.status(422).send({ message: "Can not filter" });
    }

    if (!result) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).sendFile(result, () => {
      deleteFiles([result]);
    });
  });

  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
  });
})(); 
