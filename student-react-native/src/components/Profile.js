import 'es6-symbol/implement'
import React, {Component} from 'react';
import {Button, FormInput, FormLabel, Header} from 'react-native-elements';
import {Platform, KeyboardAvoidingView, ScrollView, StyleSheet, ToastAndroid, View,} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StudentService from "../services/StudentService";

const studentService = StudentService.instance;

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
        this.state = {user: {}, isLoading: false,};
        this.update = this.update.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    getUserDetails() {
        studentService.getProfile().then(user => {
            user.passwordConfirmation = user.password;
            this.setState({user: user});
        }).catch(() => {
            alert("Login required.");
            this.props.navigation.goBack();
        })
    }

    componentDidMount() {
        this.getUserDetails();
    }


    updateField(param1, param2) {
        let updatedUser = this.state.user;
        updatedUser[param1] = param2;
        this.setState({user: updatedUser});
    }

    update() {
        const user = this.state.user;
        this.setState({isLoading: true});
        console.log(this.validateEmail(user.email));
        if (user.password.length < 1)
            alert("Please enter valid password");
        else if (user.password !== user.passwordConfirmation)
            alert("Password does not match");
        else if (!this.validateEmail(user.email))
            alert("Please enter valid email");
        else {
            studentService.updateProfile(user)
                .then((user) => {
                    console.log(user);
                    user.passwordConfirmation = user.password;
                    this.setState({user: user});
                    ToastAndroid.show('User details successfully updated.', ToastAndroid.SHORT)
                });
        }
        this.setState({isLoading: false});
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
            <KeyboardAwareScrollView enableOnAndroid
                                     enableAutomaticScroll
                                     keyboardOpeningTime={0}
                                     extraHeight={Platform.select({ android: 200 })}
                                     stickyHeaderIndices={[1]}>
                <Header
                    outerContainerStyles={{backgroundColor: '#546E7A', position: 'relative'}}
                    leftComponent={{
                        icon: 'menu', size: 25, color: 'black', onPress: () => {
                            this.props.navigation.openDrawer()
                        }
                    }}
                    centerComponent={{text: 'PROFILE', style: {color: 'black'}}}
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
                        onChangeText={email => this.updateField("email", email)}
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
                    <View style={{alignItems: 'center'}}>
                        <Button
                            leftIcon={{name: 'build'}}
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
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row'
    },
    selectorContainer: {
        flex: 1
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
        backgroundColor: 'white'
    },
    profileTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    profileButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
        alignItems: 'center'
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent'
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0
    },
    categoryText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
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
