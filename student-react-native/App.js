import React from 'react';
import Expo, {AppLoading, Asset, Font} from 'expo';
import {Image} from 'react-native';

import MyRoutes from './src/MyRoutes'


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
            require('./assets/images/bg_screen4.jpg'),
        ]);

        const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
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