import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import UsersContext from '../context/UserContext';

export default props => {
    //console.warn(Object.keys(props.route.params));
    const [user, setUser] = useState(props.route.params ? props.route.params : {});
    const { dispatch } = useContext(UsersContext);

    return (
        <View style={style.form}>
            <Text>Name</Text>
            <TextInput
            style={style.input}
                onChangeText={name => setUser({...user, name})}
                placeholder="Informe o nome..."
                value={user.name}
            />
            <Text>E-mail</Text>
            <TextInput
            style={style.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Informe o e-mail..."
                value={user.email}
            />
            <Text>URL do avatar</Text>
            <TextInput
            style={style.input}
                onChangeText={avatarUrl => setUser({...user, avatarUrl})}
                placeholder="Informe a URL do avatar..."
                value={user.avatarUrl}
            />
            <Button 
                title="Salvar"
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user
                    })
                    props.navigation.goBack();
                }}
            />
        </View>
    );
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
});