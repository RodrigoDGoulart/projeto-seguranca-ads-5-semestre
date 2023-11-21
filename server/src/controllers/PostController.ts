import { Request, Response } from "express";

class PostController {
  public async new (req: Request, res: Response) {
    return res.json({exemplo: 'exemplo de retorno'});
  }

  public async update (req: Request, res: Response) {
    return res.json({exemplo: 'exemplo de retorno'});
  }

  public async delete (req: Request, res: Response) {
    return res.json({exemplo: 'exemplo de retorno'});
  }
  
  public async get (req: Request, res: Response) {
    return res.json({exemplo: 'exemplo de retorno'});
  }
}

export default new PostController();