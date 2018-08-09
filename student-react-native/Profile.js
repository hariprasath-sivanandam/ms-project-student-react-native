import 'es6-symbol/implement'
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Header} from 'react-native-elements';

const studentService = StudentService.instance;
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View, ScrollView,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView, ToastAndroid,
} from 'react-native';
import {Font} from 'expo';
import {FormInput, FormLabel, Button} from 'react-native-elements'
import {TextInput} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import StudentService from "./src/services/StudentService";

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;


// Enable LayoutAnimation on Android
//UIManager.setLayoutAnimationEnabledExperimental
//&& UIManager.setLayoutAnimationEnabledExperimental(true);
//
// const TabSelector = ({selected}) => {
//     return (
//         <View style={styles.selectorContainer}>
//             <View style={selected && styles.selected}/>
//         </View>
//     );
// };
//
// TabSelector.propTypes = {
//     selected: PropTypes.bool.isRequired,
// };

export default class Profile extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            title: "Profile",
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#546E7A'
            }
        };
    };

    constructor(props) {
        super(props);

        this.state = {user: {}};
        //this.selectCategory = this.selectCategory.bind(this);
        this.update = this.update.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        // this.validateEmail = this.validateEmail.bind(this);
        this.updateField = this.updateField.bind(this);
        console.log("inside profile constructor")
    }

    getUserDetails() {
        studentService.getProfile().then(user => {
            user.passwordConfirmation = user.password;
            this.setState({user: user});
        })
    }

    componentDidMount() {
        console.log("------open inside profile")
        this.getUserDetails();
        console.log(this.state.user);
        console.log("****closed inside profile")
    }


    updateField(param1, param2) {
        let updatedUser = this.state.user;
        updatedUser[param1] = param2;
        this.setState({user: updatedUser});
    }

    update() {
        const user = this.state.user;
        if (user.password.length < 1)
            alert("Please enter valid password")
        else if (user.password !== user.passwordConfirmation)
            alert("Password does not match")
        else {
            studentService.updateProfile(user)
                .then((user) => {
                    console.log(user);
                    user.passwordConfirmation = user.password;
                    this.setState({user: user});
                    ToastAndroid.show('User details successfully updated.', ToastAndroid.SHORT)
                });
        }
    }

    render() {
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
            <ScrollView>
                <KeyboardAvoidingView contentContainerStyle={styles.profileContainer} behavior='position'>
                    <Header
                        outerContainerStyles={{ backgroundColor: '#546E7A' }}
                        leftComponent={{ icon: 'menu', size:35, color: 'black', onPress:() =>{this.props.navigation.openDrawer()} }}
                        centerComponent={{ text: 'MY TITLE', style: { color: 'black' } }}
                    />
                    <View style={styles.formContainer}>
                        <FormLabel
                            labelStyle={{textAlign: 'left'}}>
                            User Name
                        </FormLabel>
                        <FormInput
                            defaultValue={username}
                            keyboardAppearance='light'
                            autoFocus={false}
                            autoCapitalize='none'
                            autoCorrect={false}
                            inputStyle={{marginLeft: 10}}
                            containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                            editable={false}
                            style={styles.input}
                            placeholder={'Username'}
                        />
                        <FormLabel
                            labelStyle={{textAlign: 'left'}}>
                            Password
                        </FormLabel>
                        <FormInput
                            defaultValue={password}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            returnKeyType='next'
                            blurOnSubmit={true}
                            containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Password'}
                            ref={input => this.passwordInput = input}
                            onSubmitEditing={() => this.confirmationInput.focus()}
                            onChangeText={(password) => this.updateField("password", password)}
                            style={styles.input}
                        />
                        <FormLabel
                            labelStyle={{textAlign: 'left'}}>
                            Password Verification
                        </FormLabel>
                        <FormInput
                            defaultValue={passwordConfirmation}
                            secureTextEntry={true}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Confirm password'}
                            ref={input => this.confirmationInput = input}
                            onSubmitEditing={this.signUp}
                            onChangeText={passwordConfirmation => this.updateField("passwordConfirmation", passwordConfirmation)}
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
                            onChangeText={email => this.setState({email})}
                            placeholder="Email"
                            inputStyle={{marginLeft: 10}}
                            keyboardType="email-address"
                            returnKeyType="next"
                        />
                        <FormLabel
                            labelStyle={{textAlign: 'left'}}>
                            First Name
                        </FormLabel>
                        <FormInput
                            defaultValue={this.state.user.firstName}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'First name'}
                            ref={input => this.confirmationInput = input}
                            onChangeText={firstName => this.updateField("firstName", firstName)}
                            style={styles.input}
                        />
                        <FormLabel
                            labelStyle={{textAlign: 'left'}}>
                            Last Name
                        </FormLabel>
                        <FormInput
                            defaultValue={lastName}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Last name'}
                            ref={input => this.confirmationInput = input}
                            onChangeText={lastName => this.updateField("lastName", lastName)}
                            style={styles.input}
                        />
                        <FormLabel
                            labelStyle={{textAlign: 'left'}}>
                            Phone
                        </FormLabel>
                        <FormInput
                            defaultValue={phone}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Phone'}
                            ref={input => this.confirmationInput = input}
                            onChangeText={phone => this.updateField("phone", phone)}
                            style={styles.input}
                        />
                        <View style={{alignItems:'center'}}>
                        <Button
                            leftIcon = {{name:'build'}}
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
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

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
        // alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        // alignItems: 'center',
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
        // alignItems: 'center',
        // justifyContent: 'center',
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
        alignItems: 'center',
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        // justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
       // width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        // alignItems:'center',
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
        // width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    categoryText: {
        // textAlign: 'center',
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
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {
        height: 40,
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
});
