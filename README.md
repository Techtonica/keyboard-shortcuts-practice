# Keyboard Shortcuts Practice App

Try it out here: https://techtonica.github.io/keyboard-shortcuts-practice/

![App Screenshot](/images/app-screenshot.png)

## Overview

[Techtonica](https://techtonica.org) is a nonprofit that provides free tech training with stipends and job placement to women and non-binary adults with low incomes.

We discovered that our participants need an app similar to typing practice websites out there, but for Mac OS X keyboard shortcuts.

This project should train and test users to use the quicker keyboard shortcuts instead of a mouse and the GUI. The app gets more challenging as you progress through the commands.

Our goal for the backend project is to create a persistent app where users 
can sign in, practice with the app, and save their progress. That way, the next time they sign in, they can pick up where they left off rather than starting at the beginning.

# Setting up Auth0 and creating an account
1. Create a [free personal Auth0 account](https://auth0.com/)
1. Create a `Regular Web Application`
1. Run `cp .env.example .env` to create a .env file
1. From the settings page of your Auth0 web application fill in the environment variables, ensuring that the `AUTH0_ISSUER_BASE_URL` is the Domain URL starting with `https://`
1. The _Allowed Callback URLs_ for local development should be `http://localhost:3000/callback`

## Running the project

1. Run `npm install` to install all the packages.
1. Run `npm start` to start the server.
1. Navigate to `http://localhost:3000` in your browser. Your project should be running at this point.

## Contributing / Volunteering

Go to [CONTRIBUTING.md](/CONTRIBUTING.md).

### Creative Commons Open-Source License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

[![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/legalcode)
