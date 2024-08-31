# Vitruve Technical Test (Frontend)

### Overview

Welcome to the Vitruve technical test! This exercise is designed to evaluate your frontend development skills, particularly in building a modern web application using Ionic (React), PandaCSS, and React Query.

### Task

Your task is to create a Pokédex app with the following features:

- **CRUD Operations**: The app should support:
  - Listing all Pokémon
  - Searching for Pokémon
  - Viewing Pokémon details
  - Marking a Pokémon as a favorite
  - Creating, reading, updating, and deleting custom Pokémon entries
- **Extended Features**: Implement at least two of the following: pagination, virtualization, or filtering.
- **Authentication**: Include sign-up, sign-in, and sign-out functionalities. Ensure that users can only access their data.
- **Offline Functionality**: Ensure the app is functional offline.
- **Deployment**: Deploy the app to a production environment and provide a URL.
- **Repository Structure**: Use a monorepo setup with at least two directories: "api" (backend) and "ui" (frontend).
- **Programming Language**: Typescript

### Tech Stack

- **Frontend**: Ionic (React)
- **Styling**: PandaCSS
- **Data Management**: React Query
- **Storage**: Browser storage for data persistence

### Deliverables

1. **GitHub Repository**: Upload your code to a public GitHub repository.
2. **Production URL**: Deploy your application and provide the URL for access.
3. **README**: Include a README file with instructions on how to run the project locally.

### Instructions

1. **Monorepo Structure**:

   - Create a monorepo with the following structure:

     ```
     /my-pokedex-app
     ├── /api (backend)
     └── /ui (frontend)

     ```

   - Ensure that both backend and frontend can be started independently.

2. **Backend**:
   - Implement a simple API using a class structure that persists data in browser storage.
   - Provide endpoints for authentication (sign-up, sign-in, sign-out) and CRUD operations.
   - Use the PokeApi ([https://pokeapi.co/](https://pokeapi.co/)) to obtain all necessary data.
3. **Frontend**:
   - Use Ionic (React) for the user interface.
   - Style the app using PandaCSS.
   - Implement data fetching and state management using React Query.
   - Ensure offline functionality.
4. **Authentication**:
   - Implement sign-up, sign-in, and sign-out functionalities.
   - Ensure users can only view and manage their Pokémon entries.
5. **Extended Features**:
   - Implement at least two additional features such as pagination, virtualization, or filtering.
6. **Tests (Optional but Recommended)**:
   - Include tests to validate component and logic functionality.
   - Mention these tests in the README if included.
7. **Styling (Optional but Encouraged)**:
   - While not required, creative and modern styling will be positively evaluated. Ensure responsive design for various screen sizes.

### Evaluation Criteria

- **Functionality**: Does the app meet the required features?
- **Code Quality**: Is the code well-structured, readable, and maintainable?
- **Monorepo Setup**: Is the repository organized as instructed?
- **Authentication**: Is the authentication properly implemented?
- **Offline Capability**: Does the app function offline?
- **Documentation**: Is the README clear and comprehensive?
- **Extended Features**: Are the additional features implemented effectively?
- **Styling and Tests**: Are additional efforts in styling and testing evident?

### Submission

- **GitHub Repository**: Provide a link to your GitHub repository.
- **Production URL**: Provide the URL where your app is deployed.

### Deadline

Please submit your solution within two weeks of receiving this test.

Send an email to [h.corta@vitruve.fit](mailto:h.corta@vitruve.fit) with the subject “Frontend Technical Test - [Your Name]”.

We look forward to seeing your work and potentially welcoming you to the Vitruve team!

# Requirements:

## FE:

- Pokemon Listing component (main page)
- Pokemon page component
- Login/Sign-in page component / modal
- User page (info / details editing)
- Favourite Pokemons list

### Questionable:

- Creating, reading, updating, and deleting custom Pokémon entries
