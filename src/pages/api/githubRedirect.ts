import { NowResponse, NowRequest } from "@vercel/node";
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

export default async (request: NowRequest, response: NowResponse) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`
  );
};
