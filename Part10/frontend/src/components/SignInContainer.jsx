// @ts-nocheck
import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 4,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 12,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              touched.username && errors.username && styles.errorInput
            ]}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            testID="usernameField"
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.password && errors.password && styles.errorInput
            ]}
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry
            testID="passwordField"
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            testID="submitButton"
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};