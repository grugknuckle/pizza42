
# Auth0 - Solutions Engineer Technical Challenge

## Description

### Use Case

Pizza 42 is a national pizza delivery chain. Everybody seems to love their pizza, especially developers! They’re in the process of modernizing their online ordering system and have engaged with Auth0 for their identity needs.

Leadership at Pizza 42 understands that managing identity consumes engineering resources
and doesn’t contribute to their core value proposition - making great pizza. They’ve noted the
following challenges:

* The security team would like to offload credential management to the identity solution. Securing their infrastructure is complex and storing credentials raises the level of liability
* The product team would like the identity solution to provide a frictionless and customizable login experience. They would like turnkey password reset functionality to reduce help desk call volume. They would also like to provide customers the option to login with their social login provider.
* The marketing team would like the identity solution to enrich customer data as users login. Customer data will be used to drive marketing campaigns to deepen their already loyal customer base and appeal to new customers.

### Solution

As a Solutions Engineer, your task is to build a proof of concept (POC) that illustrates how Pizza 42 could solve the use case challenges outlined above. To get started, you may leverage one of the Auth0 quick start solutions found on the Auth0 documentation website.

* Give new customers the option to sign up and existing customers the option to sign in with either email / password or a social identity provider such as Google.
* Require that a customer have a verified email address before they can place a pizza order. This shouldn’t prevent them from signing into the application.
* The API endpoint servicing the orders request must require a valid token as well as a specific scope for the operation to complete.
* After an order is placed, save the order to the user’s Auth0 profile for future reference.
* Add the order history of a user to their ID token when they login

### Production

This application is currently deployed [here](http://pizza4242.herokuapp.com/).


## Environment Variables

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work. Create a new environment file in the root directory. Name it `.env`. Add the following to the file

Add the Auth0 management API credentials.
```
  AUTH0_API_AUDIENCE=https://<your-auth0-domain>/api/v2/
  AUTH0_API_CLIENTID=<your-auth0-management-api-id>
  AUTH0_API_SECRET=<your-auth0-management-api-non-interactive-secret>
```

Next add the application credentials.
```
  VUE_APP_AUTH0_AUDIENCE=<url-to-your-pizza-42-deployment>/api
  VUE_APP_AUTH0_CLIENTID=<your-auth0-application-client-id>
  VUE_APP_AUTH0_DOMAIN=<your-auth0-domain>.us.auth0.com
  VUE_APP_AUTH0_LOGOUTURL=<url-to-your-pizza-42-deployment>
  VUE_APP_DOMAIN=<url-to-your-pizza-42-deployment>
```
## Deployment

Clone this repository and cd into the directory
```bash
    git clone https://github.com/grugknuckle/pizza42.git
    cd pizza42
```

Install the dependencies
```bash
    npm install
```

Run the project locally in development mode. This mode uses the vue-cli-service to serve the front end application on port 3000, and serves the backend on port 3001.
```bash
    npm run dev
```

Build the front end application. This command will pack the front end application into the /dist folder to be served statically by the backend server.
```bash
    npm run build
```

Start the application in production mode. This will serve the front end application statically on the same port as the API server.
```bash
    npm run start
```
  ## Acknowledgements

This project was based on the [Auth0 Single Page Application Quickstart](https://github.com/auth0-samples/auth0-vue-samples/tree/master/01-Login), and modified for taste.


## Authors

- [@aaron wolbach](https://www.github.com/grugknuckle)

  