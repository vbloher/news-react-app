import React from 'react';
import { Header, Icon } from 'react-native-elements/src/index';

class RefreshButton extends React.Component {
    render() {
        const { onPress } = this.props;

        return (
            <Icon
                name='refresh'
                color='white'
                onPress={ onPress }
            />
        );
    }
}

class AppHeader extends React.Component {
    render() {
        const { onUpdate } = this.props;

        return (
            <Header
                centerComponent={ {
                    text: 'Mega News',
                    style: {
                        color: '#fff',
                        fontSize: 25,
                    }
                } }
                rightComponent={ <RefreshButton onPress={ onUpdate } /> }
            />
        );
    }
}

export default AppHeader;
