# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn format`

The script formats all the possible files with provided Prettier config that stored in root of the repository.

## Linting

### Pre-commit rules

Pre-commit hooks are managed by Husky npm package. In this particular case it does all the required format before every commit.
The hook also extended with `lint-staged` library that allows to run a script only on those files that are staged in git.

## Style guide

### ESLint

### Namings

- All the files and folders should be named in camelCase.

### TypeScript integration

TypeScript allows us to keep the code clean and readable. You should avoid using type of any at the application, that means everything should be covered by interfaces.

[Documentation](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) Typescript.

## Exporting components

Components should be exported with the default export. Components must be named with the Component postfix.

Example:

```ts
const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <HeaderContainer>
      <...>
    </HeaderContainer>
  );
};

export default PageHeader;
```