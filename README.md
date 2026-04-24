# bureaucrat-reviews:  A full stack app to connect people with bureaucrats who can help them get their issues resolved.


Guide to build the Bureaucratic Reviews mobile application on a Mac pc

This guide shows you how to setup the front-end and back-end project on macOS to build the iOS version of the app.  The instructions are to be run in one (or multiple) terminal shell window(s).  These instructions are for using the tools’ corresponding version managers to build and install this project.  Although the easiest way to set up your environment is to download the tools directly from the official website download link, using version managers allow you to use multiple versions of the tools for different projects and for different versions of the libraries and their dependencies in this project.  I recommend uninstalling the node and ruby versions installed by the default platform package manager (i.e. Homebrew on Mac or Chocolately on Windows) and also the node and ruby installed at the default location.  

See this post on how to completely remove node from the default location:
https://macpaw.com/how-to/uninstall-node-mac 

Installing the Node tools required for the FE and BE projects
Open a Mac terminal and enter the following commands.  
Note:  For each command, further instructions may be printed by the command recommending actions that you should take (or hints for you to get started) during/after it finishes running in your terminal.

brew cleanup -d -v 
brew install nvm  
brew install watchman  
nvm install --lts   

Important:  
Add the path to the node version installed via nvm to your profile (i.e. ~/.zshrc if you are using zsh).  You can follow the instructions to do this from the react native official website.  
This guide is a more detailed walkthrough of the Get Started Without a Framework section on the website.  See the note at the bottom for adding nvm to your path.

Install MongoDB
MonogDB is a database that stores information as easy to read "documents". We'll use it to store data in our Node.js and Express stack.  Use the official guide to install MongoDB from here.

brew tap mongodb/brew   
brew install mongodb-community@7.0 
brew services start mongodb-community@7.0

To create the database required by the back-end project, you need to create a data directory for MongoDB to save data.  Make sure you create this directory inside your root (/) directory.
cd /
sudo mkdir -p data/db
Finally we'll want to make sure we have permission to read and write to this directory.
sudo chown -R $USER data/db
Run two commands to check whether the install worked. You should see a file path after each command.
which mongod
which mongo
Set the database path:
mongod --dbpath=/Users/user/data/db

The MongoDB installation comes with mongosh.  This is the shell that allows you to interact with the database from the command line.  It is very help to create docs and perform CRUD operations and/or troubleshoot docs created by the back-end. You can start the mongo shell by issuing the following command in terminal:
mongosh  


Install Ruby required for iOS development with Cocoapods 

In your Terminal, run ruby --version. The output will include the version number of Ruby you have installed. Verify you are running version 2.2+ of Ruby and that it does not say universal.x86-64. The universal build is the one that comes with OS X, we want to use a ruby version supplied by RVM.
Run the following command in your Terminal to install both RVM and the latest version of Ruby.
curl -L https://get.rvm.io | bash -s stable --ruby --auto-dotfiles
Close your terminal and open a new one now.  Run
gem install bundler
sudo gem install cocoapods

Repeat the step from the node installation above, this time to add the ruby installed using rvm to your path.

Setup the React Native environment (front-end)

Note that we are not using Expo, which automatically handles most of the setup and is recommended only for small projects.
This guide is to setup the bare bones essentials to get started developing a react native mobile app.  

Verify that your setup is working by ensuring that you can access node and ruby from a new terminal window before proceeding.  Make sure that the node and ruby paths are set to the location installed by nvm and rvm. 
For example, to check ruby: 
which bundle
/Users/[username]/.rvm/rubies/ruby-3.0.0/bin/bundle

which ruby
/Users/[username]/.rvm/rubies/ruby-3.0.0/bin/ruby

Open terminal on Mac.  In your root directory, create a source directory where you will download the code repository:
cd ~/
mkdir source && cd "$_"


Install the Node Express server (back-end API):
Follow the instructions for the back-end from the ChatGPT project.

Create the react native BureaucratReviews app:

npx react-native@latest init BureaucratReviews --version 0.71.0
To use the native navigation stack and screens in the project, we have to install additional npm packages in addition to the ones listed in the Bureaucratic Reviews ChatGPT front-end setup rpm installation instructions.
The instructions for installing the Native Stack from React Native Navigator is provided here.  Read the instructions for Installing dependencies into a bare React Native project
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
cd into your project directory.  Build the iOS project by running the following command:
npx react-native run-ios 
This command will open Metro, a server for hosting your iOS app.  Also make sure that the simulator iPhone is running from Xcode.  
To find a list and UUID of supported devices in the simulator run:
xcrun simctl list devices

You can start the app on a specific simulator by running the following command and specifying the ID:
npm run ios -- --udid="0C1E967A-F3A0-4555-83C4-44CDCD18CD42"

More details on how to setup for Android will be added later.  

Common errors encountered for this project and troubleshooting tips. 

Problem 1:
The react-native and/or Node back-end project fail to build due to errors.  The main reason is that the environment is not set up correctly.  Please go back to the first step and ensure that all the required tools are installed at the correct path locations and symlinked so that your Mac can find the right toolsets.  

This solution is also used to correctly set up Apple’s IDE, Xcode.  Make sure that the Xcode command line tools are located at /Library/Developer/CommandLineTools.
xcode-select -p
If the path returned is anything other than “/Library/Developer/CommandLineTools”, execute the following command in admin mode to set the path to this location (you will need to enter your Mac password):
sudo xcode-select --switch /Library/Developer/CommandLineTools

For Xcode:
Upgrade Xcode version to the latest Xcode (15.2) 
Reinstall the Xcode command line tools:
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install

Follow the instructions from above to build the project again.

Problem 2:  
The Xcode project is failing to build due to errors.
Solution:
Open the workspace file in the iOS directory in Xcode and build that instead.

Problem 3:  
If you have an iPhone (i.e. installed the app on a device) and are switching to using a simulator, the react native command line build may get stuck to always targeting the device instead of the iPhone set up in the simulator.  
Solution:
Go to Window -> Devices and Simulators
Click on the device.  Set run destination to Never

Problem 4: 
Error: Address in use
The back-end express server is still running on the designated port 5000 when you try to debug using another process.
Solution: 
Kill the running node process:
lsof -i:5000
Note the PID
kill -9 <process-number>


