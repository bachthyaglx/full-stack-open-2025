import { Formik } from 'formik';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
  button: {
    backgroundColor: '#0366d6', // Matches the app's theme
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button title="Sign in" onPress={handleSubmit} color="#0366d6" />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
