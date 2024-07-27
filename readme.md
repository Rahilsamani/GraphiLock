# GraphiLock

GraphiLock is an innovative graphical password authentication system designed to enhance security by using images as a password. This project leverages Unsplash to fetch images for creating graphical passwords.

## Features

- **Graphical Password Authentication**: Users can set and authenticate using images.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Image Selection**: Users can choose images from a dynamically fetched set.
- **Pattern Validation**: Ensures users select images in the correct sequence for authentication.
- **Forgot Password**: Option available for users to reset their password.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Image Source**: Unsplash
- **State Management**: Redux
- **Toast Notifications**: react-hot-toast

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the repository

```bash
git clone https://github.com/Rahilsamani/GraphiLock.git
cd graphiLock
```

### Install dependencies

```bash
npm install
cd client
npm install
```

## Usage

1. **Signup**: Create a new account by providing a username, category, and password.
2. **Set Graphical Password**: Select images from the provided set to create your graphical password.
3. **Login**: Authenticate using your username, category, and graphical password.

## Code Structure

- **Backend**: The backend code is located in the root directory. It includes routes for user authentication and image fetching from Unsplash.
- **Frontend**: The frontend code is in the `client` directory. It includes components for login, signup, and graphical password selection.

### Key Files

- `server.js`: Main server file.
- `routes/auth.js`: Authentication routes.
- `routes/image.js`: Routes to fetch images from Unsplash.
- `client/src/components`: React components.
- `client/src/redux`: Redux setup and slices.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.


## Acknowledgments

- [Unsplash](https://unsplash.com) for providing free images.
- [React](https://reactjs.org), [Node.js](https://nodejs.org), [Express](https://expressjs.com), and [MongoDB](https://www.mongodb.com) for the tech stack.
- [react-hot-toast](https://react-hot-toast.com) for toast notifications.


## Contact

If you have any questions or feedback, please feel free to contact me at rahilahmed1720@gmail.com.


