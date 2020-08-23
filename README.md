# Keyboard Shortcuts Practice App
Try it out here: https://techtonica.github.io/keyboard-shortcuts-practice/

## Overview
[Techtonica](https://techtonica.org) is a nonprofit that provides free tech training with stipends and job placement to women and non-binary adults with low incomes. 

We discovered that our participants need an app similar to typing practice websites out there, but for Mac OS X keyboard shortcuts. 

This project should train and test users to use the quicker keyboard shortcuts instead of a mouse and the GUI. The app gets more challenging as you progress through the commands.

Our goal for the backend project is to create a persistant app where users can sign in, practice with the app, and save their progress. That way, the next time they sign in, they can pick up where they left off rather than starting at the beginning.

## Running the project

1. Run `npm install` to install all the packages.
1. Run `npm start` to start the server.
1. Navigate to `http://127.0.0.1:8080` in your browser. Your project should be running at this point.
1. If that's doesn't work, try `http://127.0.0.1:8080/index.html`, more details in the troubleshooting section below.
1. You should be good to go!

## Troubleshooting

If the browser shows ERR_INVALID_REDIRECT either add '/index.html' to the url ('http://127.0.0.1:8080/index.html') or downgrade your http-server version by running 'npm install -g http-server@0.9.0'.

## Contributing

We would love your help! See the projects tab above for open to-do items that need some attention.

Try the current version of the app [here](https://techtonica.github.io/keyboard-shortcuts-practice/).

### Prerequisites
Prepare for contributing by following these beginner-friendly steps.

1. [First, sign up here](https://docs.google.com/forms/d/e/1FAIpQLSeW0mo-Dpsig70374UEPvzexpas-31Ost_HsFwm0kjNOxtbtg/viewform?c=0&w=1). As a Nonprofit organization, we need this from volunteers.
1. Make sure you have created a [GitHub account](https://github.com/join), and are signed in.
1. Reach out to one of Techtonica's admin and send us your username so we can add you as a contributor.
1. Fork this repo by clicking the "fork" button in the upper-right corner of this page.
1. Choose a directory on your machine where you plan on storing Github Projects. Open your terminal and `cd` to that directory.
1. Clone the project by running `git clone https://github.com/<your-username-here>/keyboard-shortcuts-practice.git` in your terminal, replacing `<your-username-here>` with your account name. (Learn more about [Fork, Clone and Remote](https://github.com/anitab-org/mentorship-android/wiki/Fork%2C-Clone-%26-Remote).) 
1. Run `cd keyboard-shortcuts-practice` to get into the root directory.
1. Run `git pull` to make sure you have the latest changes.
1. Run `git checkout backend` to go to the backend branch. This is the *only* branch that we will be working in.
1. Follow [the steps to run the project locally](#running-the-project).
1. Run `git remote add upstream https://github.com/Techtonica/keyboard-shortcuts-practice.git`.  This is so that you can refer to the original project owned by Techtonica as the `upstream` version.
1. Run `git pull upstream/main` test that you can get updates from Techtonica's `main` branch. If it shows an error that you don't have permission, contact a Tectonica admin. You can still get started without this part, but you'll need it soon.

### Get started
1. Choose an issue in the "To Do" column of [this board](https://github.com/Techtonica/keyboard-shortcuts-practice/projects/4).
1. Leave a comment that you would like to pick up the issue. 
1. Read the description, and make sure to ask questions about anything that is unclear.
1. Start on your main branch with `git checkout main`. 
1. Make sure you have the latest version of the project with `git pull upstream/main`.
1. Create a new branch with `git checkout -b <new-branch-name>`. The name should include the issue number and the topic youre working in.  For example, if its about adding a GET request, your command could be `git checkout -b add-get-request`.
1. Make and commit your changes on this branch.
1. See your pull requests here: https://github.com/Techtonica/keyboard-shortcuts-practice/pulls

**Completed curriculum:**
- Place a "completed" label on the issue once you've completed it, and leave comments about your work if you like. Grazie Mille!!

### Creative Commons Open-Source License
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

[![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/legalcode)
