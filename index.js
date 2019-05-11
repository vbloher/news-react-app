import { KeepAwake, registerRootComponent } from 'expo';
import App from './app/App';

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(App);
