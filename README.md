# Narrate Blogging Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/yourusername/narrate/actions/workflows/node.js.yml/badge.svg)](https://github.com/yourusername/narrate/actions)

**Narrate** is a minimalistic blogging platform designed to provide a seamless user experience for creating, updating, and managing blog posts. It allows users to register, update their profiles, and interact with others' content.

## Features

- **User Registration and Authentication:** Secure user login and registration with JWT.
- **Profile Management:** Update personal details and bio.
- **Blog Management:** Create, update, and delete blog posts.
- **Content Interaction:** View and read blogs from other users.
- **Responsive Design:** Optimized for various devices with a user-friendly interface.

## Technology Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - Recoil

- **Backend:**
  - Hono (TypeScript)
  - Cloudflare Workers

- **Database:**
  - PostgreSQL
  - Prisma ORM

- **Authentication and Security:**
  - bcrypt
  - JWT

## Getting Started

### Prerequisites

- **Node.js:** v14 or higher
- **Docker:** For containerization (optional but recommended)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/narrate.git
    cd narrate
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory with the following variables:

    ```bash
    DATABASE_URL=your_postgresql_database_url
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run database migrations:**

    ```bash
    npx prisma migrate deploy
    ```

### Running the Application

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

### Dockerization

1. **Build the Docker image:**

    ```bash
    docker build -t narrate:latest .
    ```

2. **Run the Docker container:**

    ```bash
    docker run -d -p 3000:3000 --env-file .env narrate:latest
    ```

## Usage

- **Creating a Blog:** Navigate to the "Create Post" page and fill out the blog form.
- **Updating a Blog:** Edit your blog posts from the "My Posts" section.
- **Deleting a Blog:** Remove blog posts via the "My Posts" section.
- **Profile Management:** Update your profile details under "My Profile".

## Contributing

1. **Fork the repository:**

    Click the "Fork" button on the top right to fork the repository.

2. **Clone your fork:**

    ```bash
    git clone https://github.com/yourusername/narrate.git
    ```

3. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes and commit them:**

    ```bash
    git add .
    git commit -m "Add some feature"
    ```

5. **Push to the branch:**

    ```bash
    git push origin feature/your-feature-name
    ```

6. **Create a pull request:**

    Open a pull request to merge your changes into the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Prathamesh Malu**  
- Email: [pmalu9211@gmail.com](mailto:pmalu9211@gmail.com)  
- GitHub: [pmalu9211](https://github.com/pmalu9211)
# Narrate Blogging Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/yourusername/narrate/actions/workflows/node.js.yml/badge.svg)](https://github.com/yourusername/narrate/actions)

**Narrate** is a minimalistic blogging platform designed to provide a seamless user experience for creating, updating, and managing blog posts. It allows users to register, update their profiles, and interact with others' content.

## Features

- **User Registration and Authentication:** Secure user login and registration with JWT.
- **Profile Management:** Update personal details and bio.
- **Blog Management:** Create, update, and delete blog posts.
- **Content Interaction:** View and read blogs from other users.
- **Responsive Design:** Optimized for various devices with a user-friendly interface.

## Technology Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - Recoil

- **Backend:**
  - Hono (TypeScript)
  - Cloudflare Workers

- **Database:**
  - PostgreSQL
  - Prisma ORM

- **Authentication and Security:**
  - bcrypt
  - JWT

## Getting Started

### Prerequisites

- **Node.js:** v14 or higher
- **Docker:** For containerization (optional but recommended)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/narrate.git
    cd narrate
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory with the following variables:

    ```bash
    DATABASE_URL=your_postgresql_database_url
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run database migrations:**

    ```bash
    npx prisma migrate deploy
    ```

### Running the Application

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

### Dockerization

1. **Build the Docker image:**

    ```bash
    docker build -t narrate:latest .
    ```

2. **Run the Docker container:**

    ```bash
    docker run -d -p 3000:3000 --env-file .env narrate:latest
    ```

## Usage

- **Creating a Blog:** Navigate to the "Create Post" page and fill out the blog form.
- **Updating a Blog:** Edit your blog posts from the "My Posts" section.
- **Deleting a Blog:** Remove blog posts via the "My Posts" section.
- **Profile Management:** Update your profile details under "My Profile".

## Contributing

1. **Fork the repository:**

    Click the "Fork" button on the top right to fork the repository.

2. **Clone your fork:**

    ```bash
    git clone https://github.com/yourusername/narrate.git
    ```

3. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes and commit them:**

    ```bash
    git add .
    git commit -m "Add some feature"
    ```

5. **Push to the branch:**

    ```bash
    git push origin feature/your-feature-name
    ```

6. **Create a pull request:**

    Open a pull request to merge your changes into the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Prathamesh Malu**  
- Email: [pmalu9211@gmail.com](mailto:pmalu9211@gmail.com)  
- GitHub: [pmalu9211](https://github.com/pmalu9211)
