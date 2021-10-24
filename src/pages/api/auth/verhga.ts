import type { User } from "@interfaces";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const credentialsAuth: NextApiHandler<User> = (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  if (req.body.password === "fuck you") {
    const verhgaUser: User = {
      email: "some@email.com",
      name: "Tonalli",
      image: "https://tuentyfaiv.com/static/hero-7cd6877e47b96c2720dc43b0b2166531.jpg"
    }
    return res.status(200).json(verhgaUser);
  }

  res.status(401).end();
};

export default credentialsAuth;
