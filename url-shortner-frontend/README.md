# URL Shortener Frontend Service

This repository houses a straightforward URL shortener Frontend application built with React TypeScript. It allows you to convert lengthy URLs into shorter, more shareable links.

## Getting Started
### Prerequisites

Before you begin, please make sure you have `cd` into  the `url-shortner-frontend` folder

### Installation and Usage
To get started with the URL Shortener API service, follow these steps:

#### Environment Configuration
 - Create a .env.local or .env.development or .env.test configuration file in the root `url-shortner-frontend` folder of the project.
 - Set the necessary environment variables in the .env.local file. For instance, if your backend API's Base URL is 'http://localhost:4000', configure the .env.local as follows:

```
REACT_APP_BASE_API_URL=http://localhost:4000

```

#### Installing Dependencies
- To install the required project dependencies, Use the `cd` (change directory) command to navigate to the root  root `url-shortner-frontend` directory of the project where the package.json file is located and execute the following command in your terminal:
```
yarn
```
#### Building the Project
- In the root `url-shortner-frontend` directory of the project where the package.json file is located, build the TypeScript source code by running:

```
yarn build
```

#### Running the Service
- To start the URL Shortener Frontend service, use the following command:
```
yarn start
```
#### Running Tests
- You can run tests and generate coverage reports by executing:

```
yarn test
```

## Asumptions
- URLs sharing the same domain name but having distinct paths or subdomains are treated as separate and unique entities.
- Each identical URL will consistently produce the same shortened URL.
- The default page limit is set at 20 records per page
- The regular expression used to validate input url ^(https?:\/\/)([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[^\s]*)?$ is designed to match URLs with certain criteria. Here are the criteria for a URL to pass this regex:
Protocol (http or https):
The URL must start with either "http://" or "https://".
Domain Name:
The domain name should consist of alphanumeric characters (letters and numbers), hyphens, and periods.
It must contain at least one period (dot).
It should have at least two letters following the last period to represent the top-level domain (TLD), such as ".com", ".org", ".net", etc.
Path (optional):
  The path is optional and starts with a forward slash "/".
  It can contain any characters except whitespace.
Here are some examples of URLs that would match this regex:
 1. http://www.example.com
 2. https://sub.domain.co/path/to/resource
 3. https://localhost
 4. http://127.0.0.1:8080/page

## Optimisations to consider
While this project as intentionally kept simple, there are several areas where I can enhance its functionality, maintainability, and performance:
- This project has straightforward validation requirements with only one field to validate: mainUrl (the original URL). To keep the project lightweight, I've opted to create a simple, regex URL validator instead of installing a dedicated validation library like Joi, Yup or Zod. This approach minimizes library redundancy for this specific project. However, if the need for complex validations arises, I would choose Zod over Joi or Yup for the following reasons:
   - TypeScript Integration: Zod is designed for TypeScript, offering strong typing and type safety.
   - Simplicity: Zod has a simple and declarative syntax for easy schema definition.
   - Predictable Error Handling: It provides consistent error handling for validation failures.
   - Extensibility: Zod allows for schema composition and customization.
   - Lightweight: It often results in smaller bundle sizes, making it suitable for frontend optimization.
- Integration and End-to-End Testing: Expand the testing suite by implementing comprehensive integration and end-to-end tests. This will help ensure the reliability of the application and catch potential issues early in the development process.
- Pagination Enhancements: I will consider adopting a more feature-rich pagination library like "react-paginate." This can provide users with a smoother and more interactive browsing experience when dealing with large datasets.
- Improved Styling: Enhance the visual appeal and maintainability of the application by leveraging established styling libraries such as React Bootstrap or Material-UI. These libraries offer a wide range of pre-designed components and styles, making it easier to create a polished and consistent user interface.
- Reducing Component Re-renders: Use of memoization techniques (e.g., React.memo) to prevent unnecessary re-renders of components.
- Centralized State: I will use Redux to provide a single source of truth for the application's state, making it easier to manage and share data between components. I will also enforce a unidirectional data flow, which will help ensure that state changes are predictable and traceable.
Error Tracking Services:
- Use of error tracking services like Sentry or Rollbar to capture and analyze errors and exceptions in the application. These services provide detailed error reports, including stack traces and contextual information.

By incorporating these optimizations, the project can be elevated to the next level, delivering a more robust, user-friendly, and visually appealing application
