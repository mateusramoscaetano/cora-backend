declare namespace Express {
  type Request = {
    user: {
      id: string;
    };
  };
}

declare global {
  namespace Express {
    interface Request {
      file: Buffer;
    }
  }
}
