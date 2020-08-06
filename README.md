# Que.St
#### _🎮 Explore the city while playing!_

## How to run
### Android
| |Windows|Linux|
|---|---|---|
|__You need__| Node (8.3 or newer), the React Native command line interface, Python2, a JDK (8 or newer), and Android Studio|Node (8.3 or newer), the React Native command line interface, a JDK (8 or newer), and Android Studio|
|__Step 1__|`choco install -y nodejs.install python2 jdk8`|[Node](https://nodejs.org/en/download/package-manager/) [JDK](https://adoptopenjdk.net/)|
|__Step 2__|`npm install -g react-native-cli`|`npm install -g react-native-cli`|
|[Android Studio](https://developer.android.com/studio/index.html)|Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked: _Android SDK_, _Android SDK Platform_, _Performance (Intel ® HAXM)_, _Android Virtual Device_|Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked: _Android SDK_, _Android SDK Platform_, _Android Virtual Device_|
|__Open "SDK Manager"__|Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked: _Android SDK Platform 28_, _Intel x86 Atom_64 System Image_ or _Google APIs Intel x86 Atom System Image_|←|
|__Select the "SDK Tools" tab__|Check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 28.0.3 is selected. Finally, click "Apply" to download and install the Android SDK and related build tools.|←|
|__ANDROID_HOME environment variable__|Open the System pane under _System and Security_ in the Windows Control Panel, then click on _Change settings..._ Open the _Advanced_ tab and click on _Environment Variables..._ Click on _New..._ to create a new `ANDROID_HOME` user variable that points to the path to your Android SDK:|Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` config file:|
| |`c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`|`export ANDROID_HOME=$HOME/Android/Sdk`|
| | |`export PATH=$PATH:$ANDROID_HOME/emulator`|
| | |`export PATH=$PATH:$ANDROID_HOME/tools`|
| | |`export PATH=$PATH:$ANDROID_HOME/tools/bin`|
| | |`export PATH=$PATH:$ANDROID_HOME/platform-tools`|
| |Open the System pane under _System and Security_ in the Windows Control Panel, then click on _Change settings..._ Open the _Advanced_ tab and click on _Environment Variables..._ Select the `Path` variable, then click _Edit_. Click _New_ and add the path to platform-tools to the list: `c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools`|[Watchman](https://facebook.github.io/watchman/docs/install#buildinstall)|
|__Creating a new application__|`react-native init AwesomeProject`|←|
|__[Optional] Using a specific version__|`react-native init AwesomeProject --version X.XX.X`|←|
| |`react-native init AwesomeProject --version react-native@next`||

#### Preparing the Android device
* __Using a physical device__  
    * If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the [instructions](https://reactnative.dev/docs/0.39/running-on-device)
* __Using a virtual device__  
    * If you use Android Studio to open `./AwesomeProject/android`, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio.
    * If you have recently installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Pie API Level 28 image.
    > __If you don't have HAXM installed, click on "Install HAXM"__
    * Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

#### Running your React Native application
Run `react-native run-android` inside your React Native project folder:  
```
cd AwesomeProject
react-native run-android
```
If everything is set up correctly, you should see your new app running in your Android emulator shortly.  
`react-native run-android` is one way to run your app – you can also run it directly from within Android Studio.
> __If you can't get this to work, see the [Troubleshooting page](https://reactnative.dev/docs/0.39/troubleshooting#content).__

#### Modifying your app
* Open `App.js` in your text editor of choice and edit some lines.
* Press the `R` key twice or select `Reload` from the Developer Menu (`Ctrl + M`) to see your changes!

### iOS
> __A Mac is required to build projects with native code for iOS__
You will need Node, Watchman, the React Native command line interface, and Xcode.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.  

##### Node (8.3 or newer), Watchman, JDK (8 or newer) 
1. [Homebrew](https://brew.sh/)
2. Run the following commands in a Terminal after installing Homebrew:
    ```
    brew install yarn
    brew install node
    brew install watchman
    brew tap AdoptOpenJDK/openjdk
    brew cask install adoptopenjdk8
    ```
##### The React Native CLI
`npm install -g react-native-cli`  

##### Xcode (9.4 or newer)
The easiest way to install Xcode is via the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

##### Creating a new application
`react-native init AwesomeProject`  
[Optional] Using a specific version:  
`react-native init AwesomeProject --version X.XX.X`  
`react-native init AwesomeProject --version react-native@next`

##### Running your React Native application
```
cd AwesomeProject
react-native run-ios
```
You should see your new app running in the iOS Simulator shortly.
`react-native run-ios` is one way to run your app. You can also run it directly from within Xcode.  
>__If you can't get this to work, see the [Troubleshooting page](https://reactnative.dev/docs/0.39/troubleshooting#content).__

##### Running on a device
The above command will automatically run your app on the iOS Simulator by default. If you want to run the app on an actual physical iOS device, please follow the [instructions](https://reactnative.dev/docs/0.39/running-on-device).

##### Modifying your app
* Open `App.js` in your text editor of choice and edit some lines.
* Hit `⌘R` in your iOS Simulator to reload the app and see your changes!
