# Flux front end ![Flux logo](https://raw.githubusercontent.com/loustak/Flux-Front/master/public/logo_64.png "Flux logo")

Flux aim to be a fast and secure messaging applications for general purpose.

Built with React & Node.js.

## Deploy to Heroku
It deploy the same as any other React app on Heroku. You will just need to set two environment variable once deployed:
* REACT_APP_API_PATH: The path to the Flux API
* REACT_APP_SOCKET_PATH: The path to the Flux Socket. For instance if your REACT_APP_API_PATH is `http://flux.com` then the socket path is `ws://flux.com`. If you use `https` replace `ws` by `wss`