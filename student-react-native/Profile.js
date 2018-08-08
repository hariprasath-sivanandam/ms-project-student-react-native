import 'es6-symbol/implement'
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
// const navigateAction = NavigationActions.navigate({
//     routeName: 'MyCourse',
//     params: "my_course",
// });

const studentService = StudentService.instance;
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
} from 'react-native';
import { Font } from 'expo';
import { FormInput, FormLabel, Button } from 'react-native-elements'
import { TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import StudentService from "./src/services/StudentService";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('./assets/images/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state={user:{}};
        this.selectCategory = this.selectCategory.bind(this);
        this.update = this.update.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
       // this.validateEmail = this.validateEmail.bind(this);
        this.updateField = this.updateField.bind(this);
        console.log("inside profile constructor")
    }

    getUserDetails(){
        studentService.getProfile().then(user =>
            this.setState({user: user})
        )
    }


    componentDidMount() {
        console.log("------open inside profile")
        Font.loadAsync({
            'georgia': require('./assets/fonts/Georgia.ttf'),
            'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'light': require('./assets/fonts/Montserrat-Light.ttf'),
        });
        this.getUserDetails();
        this.setState({ fontLoaded: true });
        console.log(this.state.user);
        console.log("****closed inside profile")
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    // validateEmail(email) {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //
    //     return re.test(email);
    // }

    updateField(param1, param2){
        this.state.user[param1] = param2;
    }

    update() {
        const user =this.state.user;
        // if(!this.validateEmail(user.email))
        //     alert("Please enter a valid Email")
        if(user.password.length<1)
            alert("Please enter valid password")
        else if(user.password !== user.passwordConfirmation)
            alert("Password does not match")
        else{
            studentService.updateProfile(user)
                .then((user) => {
                    console.log(user);
                    user.passwordConfirmation = user.password;
                    this.setState({user: user});
                    //this.state.user.passwordConfirmation = user.password;
                    alert("User Details updated Successfully")});
        }
    }

    render() {
        this.state.user.passwordConfirmation = this.state.user.password;
        const {
            selectedCategory,
            isLoading,
            email,
            password,
            username,
            firstName,
            lastName,
            phone,
            passwordConfirmation,
        } = this.state.user;

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    {this.state.fontLoaded ?
                        <View>
                            <KeyboardAvoidingView contentContainerStyle={styles.profileContainer} behavior='position'>
                                <View style={styles.formContainer}>
                                    <FormLabel
                                    labelStyle={{textAlign: 'left'}}>
                                        User Name
                                    </FormLabel>
                                    <FormInput
                                        leftIcon={
                                            <Icon
                                                name='envelope-o'
                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        defaultValue={username}
                                        keyboardAppearance='light'
                                        autoFocus={false}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        inputStyle={{marginLeft: 10}}
                                        containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        editable={false}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Password
                                    </FormLabel>
                                    <FormInput
                                        leftIcon={
                                            <SimpleIcon
                                                name='lock'
                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        defaultValue={password}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        returnKeyType='next'
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Password'}
                                        ref={input => this.passwordInput = input}
                                        onSubmitEditing={() => this.confirmationInput.focus()}
                                        onChangeText={(password) => this.setState({password})}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Password Verification
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'

                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        defaultValue={passwordConfirmation}
                                        secureTextEntry={true}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Confirm password'}
                                        ref={input => this.confirmationInput = input}
                                        onSubmitEditing={this.signUp}
                                        onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Email
                                    </FormLabel>
                                    <FormInput
                                        refInput={input => (this.emailInput = input)}
                                        icon="envelope"
                                        defaultValue={email}
                                        onChangeText={email => this.setState({ email })}
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        First Name
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'
                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        defaultValue={this.state.user.firstName}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'first name'}
                                        ref={input => this.confirmationInput = input}
                                        onChangeText={firstName => this.updateField("firstName", firstName)}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Last Name
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'

                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        defaultValue={lastName}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'last name'}
                                        ref={input => this.confirmationInput = input}
                                        onChangeText={lastName => this.setState(user.lastName, lastName)}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Phone
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'

                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        defaultValue={phone}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'phone'}
                                        ref={input => this.confirmationInput = input}
                                        onChangeText={phone => this.setState({ phone })}
                                        style={styles.input}
                                    />

                                    <Button
                                        buttonStyle={styles.profileButton}
                                        containerStyle={{marginTop: 32, flex: 0}}
                                        activeOpacity={0.8}
                                        title='UPDATE'
                                        onPress={this.update}
                                        titleStyle={styles.profileTextButton}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                        :
                        <Text>Loading...</Text>
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    profileButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems:'center',
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        fontSize:20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
});
