import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import UsersContext from '../context/UserContext';

export default props => {
    //const ctx = useContext(UsersContext)
    //console.warn(Object.keys(ctx));

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(user) {
        return(
            <>
                <Button 
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"
                    icon={<Icon name="edit" size={20} color="orange" />}
                />
                <Button 
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={20} color="red" />}
                />
            </>
        )
    }

    function getUserItem({ item: user }) {
        return(
            <ListItem 
                leftAvatar={{source: {uri: user.avatarUrl}}}
                key={user.id}
                title={user.name}
                subtitle={user.email}
                bottomDivider
                rightElement={getActions(user)}
                onPress={() => props.navigation.navigate('UserForm', user)}
            />
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}