# Chat App

A real-time chat application built using modern web technologies.

## Features

- **Real-time Communication**: Enables online chat using WebSockets.
- **Frontend**: Built with React.js for a responsive and interactive user interface.
- **Backend**: Powered by Express.js for handling API requests and WebSocket connections.
- **Database**: MongoDB for storing user data and chat messages.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/chat-app-react-expressjs-mongodb.git
    cd chat-app-react-expressjs-mongodb
    ```

2. Install dependencies for both the client and server:
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. Start the development servers:
    ```bash
    # Start the backend server
    cd ../server
    npm start

    # Start the frontend server
    cd ../client
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

- **/client**: Contains the React.js frontend code.
- **/server**: Contains the Express.js backend code.
- **/database**: MongoDB configuration and models.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).