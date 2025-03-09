// @ts-nocheck
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.text,
          },
        },
      });

      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
            style={styles.input}
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            style={styles.input}
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            style={styles.input}
          />
          <FormikTextInput
            name="text"
            placeholder="Review"
            multiline
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;