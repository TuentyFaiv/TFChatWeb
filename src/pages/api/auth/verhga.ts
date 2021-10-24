import type { User } from "@interfaces";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const credentialsAuth: NextApiHandler<User> = (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  if (req.body.username === "") {
    const userAnonymous = Math.floor(Math.random() * (100_000 - 100) + 100);
    const name = `Anonymous${userAnonymous.toString()}`;
    const verhgaUser: User = {
      email: "some@email.com",
      name,
      image: ""
    };

    return res.status(200).json(verhgaUser);
  } else if (req.body.username !== "") {
    const verhgaUser: User = {
      email: "some@user_anonymous.com",
      name: req.body.username,
      image: ""
    };

    return res.status(200).json(verhgaUser);
  }

  res.status(401).end();
};

export default credentialsAuth;
