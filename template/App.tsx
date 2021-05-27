import React, {Component} from 'react';
import codePush, {CodePushOptions} from 'react-native-code-push';
import {Provider} from 'react-redux';
import store from './src/core';
import AppNavigator from './src/navigator';
import {isAndroid} from 'react-native-commons-utils';
import {deployments} from './app.json';
import { ENV } from './src/configs/environment';

interface Props {
  screenName: string;
  screenProps: any;
}

interface State {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {screenName, screenProps} = this.props;
    return (
      <Provider store={store}>
        <AppNavigator screenName={screenName} screenProps={screenProps} />
      </Provider>
    );
  }
}

export default codePush({
  deploymentKey: isAndroid() ? deployments[ENV].android : deployments[ENV].ios,
  installMode: codePush.InstallMode.IMMEDIATE,
} as CodePushOptions)(App);
