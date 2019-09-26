### Overview
[Techtonica](https://techtonica.org) is a nonprofit that provides free tech training with stipends and job placement to women and non-binary adults with low incomes. 

We discovered that our participants need an app similar to typing practice websites out there, but for Mac OS X keyboard shortcuts. Try the current version of the app [here](https://techtonica.github.io/keyboard-shortcuts-practice/).


This project should train and test users to use the quicker keyboard shortcuts instead of a mouse and the GUI. The app gets more challenging as you progress through the commands.

Our goal for the backend project is to create a persistant app where users can sign in, practice with the app, and save their progress. That way, the next time they sign in, they can pick up where they left off rather than starting at the beginning.

### Creative Commons Open-Source License
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

[![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/legalcode)

### Contributing

We would love your help! See the projects tab above for open to-do items that need some attention.

If you would like to contribute to the curriculum, please [sign up here](https://docs.google.com/forms/d/e/1FAIpQLSeW0mo-Dpsig70374UEPvzexpas-31Ost_HsFwm0kjNOxtbtg/viewform?c=0&w=1), then choose an issue in the projects tab above.  

**If you are part of the GHC Open-source Day hackathon, please use our dedicated trello board: https://trello.com/invite/b/n0K4702v/bea90647f14eae2be2a1ac54e124d566/techtonica-keyboard-app-persistance-layer.** You will find more detailed directions there. We will be working from the `backend` branch.

Try the current version of the app [here](https://techtonica.github.io/keyboard-shortcuts-practice/).

**Get started:**
- Click a "to-do" issue link and add yourself as the assignee, and pull it into the "in progress" column. If we can't add you as contributor, just make a fork of this repo and make a PR with your changes.  (If you know someone connected to Techtonica, they may be able to add you to our slack channel.)

**While working:**
- Comment in the issue if you have a question, and add the "question" tag to help get our attention.
- People are welcome to team up on an issue.  If you see someone is already assigned but you want to help, leave the other assignee a message on the issue about collaborating.
- Please note the due date! Any amount of help is appreciated, but if the deadline comes and you won't be able to complete it, please leave a comment about your progress and unassign yourself from the issue so someone else can pick it up. If you forked the repo, go ahead and make a pull request with what you have, and transfer ownership of a copied slideshow to techtonicaorg@gmail.com.

**Completed curriculum:**
- Place a "completed" label on the issue once you've completed it, and leave comments about your work if you like. Grazie Mille!!

#### Troubleshooting

Error: *Cross origin requests are only supported for protocol schemes*

You cannot preview this correctly in the browser due to security restrictions. To view on your machine, you can use http-server.

* `npm install -g http-server`
* `http-server` (in this repository's local working directory)
* `open http://127.0.0.1:8080

If the browser shows ERR_INVALID_REDIRECT either add '/index.html' to the url ('http://127.0.0.1:8080/index.html') or downgrade your http-server version by running 'npm install -g http-server@0.9.0'.
