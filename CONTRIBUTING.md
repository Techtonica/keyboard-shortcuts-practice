# Contributing

We would love your help! See the projects tab above for open to-do items that need some attention.

Try the current version of the app [here](https://techtonica.github.io/keyboard-shortcuts-practice/).

### Prerequisites
Prepare for contributing by following these beginner-friendly steps.

1. [First, sign up here](https://docs.google.com/forms/d/e/1FAIpQLSeW0mo-Dpsig70374UEPvzexpas-31Ost_HsFwm0kjNOxtbtg/viewform?c=0&w=1). As a Nonprofit organization, we need this from volunteers.
1. Make sure you have created a [GitHub account](https://github.com/join), and are signed in.
1. Reach out to one of Techtonica's admin and send us your username so we can add you as a contributor.
1. Fork this repo by clicking the "fork" button in the upper-right corner of this page.
1. Choose a directory on your machine where you plan to store Github Projects. Open your terminal and `cd` to that directory.
1. Clone the project by running `git clone https://github.com/<your-username-here>/keyboard-shortcuts-practice.git` in your terminal, replacing `<your-username-here>` with your account name. (Learn more about [Fork, Clone and Remote](https://github.com/anitab-org/mentorship-android/wiki/Fork%2C-Clone-%26-Remote).)
1. Run `cd keyboard-shortcuts-practice` to get into the root directory.
1. Run `git pull` to make sure you have the latest changes.
1. Run `git checkout backend` to go to the backend feature branch. This is the *only* branch that we will be working in.
1. Follow [the steps to run the project locally](/README.md/#running-the-project).
1. Run `git remote add upstream https://github.com/Techtonica/keyboard-shortcuts-practice.git`.  This is so that you can refer to the original project owned by Techtonica as the `upstream` version.
1. Run `git remote -v` to test that you can get updates from Techtonica's repo. [You should see something like this](https://github.com/anitab-org/mentorship-android/wiki/Fork,-Clone-&-Remote#remote). If it shows an error that you don't have permission, contact a Tectonica admin. You can still get started without this part, but you'll need it soon.

### Get started
1. Choose an issue in the "To Do" column of [this board](https://github.com/Techtonica/keyboard-shortcuts-practice/projects/4).
1. Leave a comment that you would like to pick up the issue.
1. Read the description, and make sure to ask questions about anything that is unclear.
1. Start on your forked repo's `backend` branch with `git checkout backend`.
1. Make sure you have the latest version of the project with `git pull upstream backend` or `git merge upstream/backend`.
1. Create a new branch with `git checkout -b <new-branch-name>`. The name should include the issue number and the topic you're working in.  For example, if its about adding a GET request, your command could be `git checkout -b add-get-request`.
1. Make and commit your changes on this new branch, and make a PR when you're ready. [Here are some directions on the process](http://www.dasblinkenlichten.com/how-to-create-a-github-pull-request-pr/).
1. When creating your PR, be sure to make your pull request to the `backend` feature branch: 
    <img src="/images/make-pr-to-backend.png" alt="making a pull request to the backend branch" title="make a pr to backend" width="350" height="200" />
1. See your pull requests here: https://github.com/Techtonica/keyboard-shortcuts-practice/pulls
