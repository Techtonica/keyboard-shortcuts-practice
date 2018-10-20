### Overview
[Techtonica](https://techtonica.org) is a nonprofit that provides free tech training with stipends and job placement to women and non-binary adults with low incomes. 

We discovered that our participants need an app similar to typing practice websites out there, but for Mac OS X keyboard shortcuts. 

This project should train and test users to use the quicker keyboard shortcuts ([starting with those outlined here](https://github.com/Techtonica/keyboard-shortcuts-practice/issues/3)) instead of a mouse and the GUI.

### Creative Commons Open-Source License
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

[![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/legalcode)

### Contributing

We would love your help! See the projects tab above for open to-do items that need some attention.

If you would like to contribute to the curriculum, please [sign up here](https://docs.google.com/forms/d/e/1FAIpQLSeW0mo-Dpsig70374UEPvzexpas-31Ost_HsFwm0kjNOxtbtg/viewform?c=0&w=1), then choose an issue in the projects tab above.

**Get started:**
- Click a "to-do" issue link and add yourself as the assignee, and pull it into the "in progress" column. If we can't add you as contributor, just make a fork of this repo and make a PR with your changes.  (If you know someone connected to Techtonica, they may be able to add you to our slack channel.)

**While working:**
- Comment in the issue if you have a question, and add the "question" tag to help get our attention.
- People are welcome to team up on an issue.  If you see someone is already assigned but you want to help, leave the other assignee a message on the issue about collaborating.
- Please note the due date! Any amount of help is appreciated, but if the deadline comes and you won't be able to complete it, please leave a comment about your progress and unassign yourself from the issue so someone else can pick it up. If you forked the repo, go ahead and make a pull request with what you have, and transfer ownership of a copied slideshow to techtonicaorg@gmail.com.

**Completed curriculum:**
- Place a "completed" label on the issue once you've completed it, and leave comments about your work if you like. Grazie Mille!!

Try the current version of the app [here](https://techtonica.github.io/keyboard-shortcuts-practice/).

#### Running Locally

This branch of the keyboard shortcuts practice uses Python3.6 and Flask as a backend. 

`git clone https://github.com/Techtonica/keyboard-shortcuts-practice.git`
`cd keyboard-shortcuts-practice`
`python3 -m venv . # create a virtual environment`
`source bin/activate # activate virtual environment`
`pip install -r requirements.txt`
`export FLASK_APP=keyboard_shortcuts_practice.py`
`flask db init`
`flask db migrate -m "create tables" # run migrations to create tables`
`flask db upgrade`
`flask run`
