#!/bin/bash
# Requirement: JDK: 17, Android SDK
# Add Below two lines in .bashrc
# export ANDROID_HOME="$HOME/Android/Sdk"
# export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Follow this Documentation to setup android https://reactnative.dev/docs/environment-setup
# No Need for emulator

#npm run apk  (Command to build the apk)
#Befor chmod +x build_apk.sh run to allow build script
#./build_apk.sh --debug (command to build the internal distrubution built)

# Install npm dependencies
npm install || { echo "npm install failed"; exit 1; }

# Run Expo prebuild step
npx expo prebuild --clean || { echo "npx expo prebuild failed"; exit 1; }

# Navigate to the Android directory
cd android/ || { echo "cd android/ failed"; exit 1; }

# Check if the build type flag is provided
if [[ $1 == "--debug" ]]; then
    # Build the internal distribution of the Android app
    ./gradlew :app:assembleDebug || { echo "./gradlew :app:assembleDebug failed"; exit 1; }
    echo "Internal Distribution Build completed successfully! Location: /android/app/build/outputs/apk/debug"
else
    # Build the release version of the Android app
    ./gradlew :app:assembleRelease || { echo "./gradlew :app:assembleRelease failed"; exit 1; }
    echo "APK Build completed successfully! Location: /android/app/build/outputs/apk/release"
fi