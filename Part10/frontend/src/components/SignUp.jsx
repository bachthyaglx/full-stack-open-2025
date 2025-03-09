// @ts-nocheck
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: theme.padding.large,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.medium,
    borderRadius: theme.roundness,
    alignItems: 'center',
    marginTop: theme.margins.medium,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
  input: {
    marginBottom: theme.margins.small,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // Create user
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      // Sign in the created user
      await signIn({ username, password });

      // Navigate to the repository list
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            style={styles.input}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;