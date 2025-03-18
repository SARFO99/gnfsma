import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {


    const navigation = useNavigation<any>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const Vtcsp = ()=>{
        return (<View style={styles.verticalSpace}>
    
            </View>)
    }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo_main.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>GHANA NATIONAL{'\n'}FIRE SERVICE</Text>
          </View>
          
          <Text style={styles.subtitle}>Emergency Response Team</Text>

<Vtcsp/>


          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Image
                source={require('../assets/images/profile.png')}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Image
                source={require('../assets/images/password.png')}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"

                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>
          
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <Vtcsp/>
          
          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <View style={styles.checkboxSelected} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Remember me</Text>
            
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity           onPress={() => navigation.navigate("(tabs)")}
  style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  verticalSpace:{
    height: 100
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  card: {
    backgroundColor: '',
    borderRadius: 20,
    padding: 60,
    width: '90%',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    color: '#A62639',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 60,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#A0A0A0',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "black",
    
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#666',
    marginHorizontal: 10,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#666',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkboxSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#A62639',
    borderRadius: 2,
  },
  checkboxLabel: {
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
  forgotPassword: {
    color: '#A62639',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;