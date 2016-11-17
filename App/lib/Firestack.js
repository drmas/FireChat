/**
 * Created by Mohamed Shaban on 11/17/16.
 */
import Firestack from 'react-native-firestack'

const configurationOptions = {
    debug: true
};

const firestack = new Firestack(configurationOptions);
firestack.on('debug', msg => console.log('Received debug message', msg));

export default firestack;
