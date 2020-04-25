// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'm1inavrti6'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {
  // TODODONE: Create an Auth0 application and copy values from it into this map
  domain: 'dev-bey72byp.eu.auth0.com',            // Auth0 domain
  clientId: 'bSw8Dtxvl4Vlcyohwb8fohgM4L4yMKx6',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
