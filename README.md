# E-commerce Mini App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server (port 3001) for the JSON server:

```bash
npm run json-server
# or
yarn json-server
# or
pnpm json-server
# or
bun json-server
```

Second, run the frontend (port 3000):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

To run the test:

```bash
pnpm test
# or
npm test
# or
yarn test
# or
bun test
```

## Architecture and Design Principles

This project is built with a focus on scalability, maintainability, and adherence to best practices used by senior developers. Key principles include:

1.  **Clean Architecture**: The codebase is structured to separate concerns into distinct layers:
    *   **Domain Layer**: Contains core business logic and entities, independent of frameworks.
    *   **Presentation Layer**: Handles UI and user interaction (React components, Next.js pages).
    *   **Infrastructure Layer**: Manages external concerns like data fetching (API calls), database interactions, and third-party services.

2.  **SOLID Principles**: Applied to ensure the code is reusable, extensible, and testable:
    *   **Single Responsibility Principle (SRP)**: Each module, class, or function has one clear responsibility.
    *   **Open/Closed Principle (OCP)**: Software entities are open for extension but closed for modification.
    *   **Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types.
    *   **Interface Segregation Principle (ISP)**: Clients should not be forced to depend on interfaces they do not use.
    *   **Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules; both should depend on abstractions.

3.  **Design Patterns**: Appropriate design patterns are applied to solve common problems and improve code structure (e.g., Factory, Strategy, Observer where applicable).

4.  **Scalability**: The file and folder structure is designed to accommodate project growth, making it easy to add new features, modules, and components without significant refactoring.

5.  **ATOMS Methodology (Atomic Design)**: Components are organized following atomic design principles:
    *   **Atoms**: Basic HTML tags or UI elements (e.g., Button, Input).
    *   **Molecules**: Groups of atoms forming simple, reusable components (e.g., SearchInput, ProductCard).
    *   **Organisms**: Groups of molecules and/or atoms forming complex, distinct sections of an interface (e.g., Header, FilterPanel).
    *   **Templates**: Page-level objects that place organisms into a layout.
    *   **Pages**: Instances of templates with real content.

6.  **Separation of Concerns**: Business logic is decoupled from the UI, ensuring that changes in one area have minimal impact on others. This promotes modularity and easier testing.

7.  **Code Readability & Reusability**: Emphasis on the DRY (Don't Repeat Yourself) principle and meaningful naming conventions to enhance code clarity and maintainability.

## Technology Choices

*   **Framework**: Next.js (React) for server-side rendering, routing, and API routes.
*   **State Management**: Redux toolkit for state management.
*   **Styling**: MUI.
*   **Data Fetching**: React Query for efficient data fetching, caching, and synchronization.
*   **Internationalization**: `i18next` for multi-language support.
*   **Testing**: Jest and React Testing Library for unit and integration tests.
*   **Linting/Formatting**: ESLint and Prettier

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

You can see the live project deployed on Vercel using this link: [https://ecommerce-mini-app-one.vercel.app/](https://ecommerce-mini-app-one.vercel.app/)


**Note**:
To run the production project from the link, you need to start the server first in order to fetch the data. Please run the commands from the first step to start it.

