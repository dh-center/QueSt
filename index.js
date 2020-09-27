/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1IjoibmlrbWVsMjgwMyIsImEiOiJjazR2cTc0M3MwcHpyM2ptcnhveWFxeGN1In0.vi88gMCid-SNTmuo_gkasg');
MapboxGL.setConnected(true);

AppRegistry.registerComponent(appName, () => App);
