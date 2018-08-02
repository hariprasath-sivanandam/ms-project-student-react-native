import React from 'react';
import Expo, { AppLoading, Asset, Font } from 'expo';
//import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Image, Text, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import MyRoutes from './MyRoutes'
import Login from './Login'


function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {
    state = {
        isReady: false,
    };

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require('./assets/images/bg_screen1.jpg'),
            require('./assets/images/bg_screen2.jpg'),
            require('./assets/images/bg_screen3.jpg'),
            require('./assets/images/bg_screen4.jpg'),
            require('./assets/images/user-cool.png'),
            require('./assets/images/user-hp.png'),
            require('./assets/images/user-student.png'),
            require('./assets/images/avatar1.jpg'),
        ]);

        const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            // onError={console.warn}
            />
        );
        }
        else {
            return (
                <MyRoutes/>
            );
        }
    }
}

Expo.registerRootComponent(AppContainer);