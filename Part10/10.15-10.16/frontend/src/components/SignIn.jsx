import { Formik } from 'formik';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red', // Red border for invalid fields
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});

// Yup Validation Schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    await signIn({ username, password });

    navigate('/', { replace: true });
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema} // Apply validation schema
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Username Field */}
            <TextInput
              style={[styles.input, touched.username && errors.username ? styles.inputError : null]}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            {/* Password Field */}
            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Sign In Button */}
            <Button title="Sign in" onPress={handleSubmit} color="#0366d6" />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
