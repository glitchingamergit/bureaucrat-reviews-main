import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewScreen = ({ route, navigation }) => {
    const { bureaucratId } = route.params;  // Get bureaucratId from route params
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const submitReview = async () => {
        // Validate input
        if (!rating || rating < 1 || rating > 5) {
            alert('Please enter a valid rating between 1 and 5.');
            return;
        }

        if (!comment) {
            alert('Please enter a comment.');
            return;
        }

        try {
            const IntToken = await AsyncStorage.getItem("AccessToken");
            const parse_token = JSON.parse(IntToken);
            const token = parse_token.data.token;
            if (!token) {
                throw new Error('No access token found.');
            }

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const reviewData = {
                bureaucrat: bureaucratId,
                rating: Number(rating),
                comment,
            };

            const response = await axios.post('http://localhost:5001/api/reviews', reviewData, config);

            if (response.status === 201) {
                alert('Review submitted successfully!');
                navigation.goBack();  // Go back to the previous screen after successful submission
            } else {
                throw new Error('Error submitting review');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit review');
        }
    };

    return (
        <View>
            <Text>Submit Review for Bureaucrat</Text>
            <TextInput
                placeholder="Rating (1-5)"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />
            <TextInput
                placeholder="Comment"
                multiline
                value={comment}
                onChangeText={setComment}
            />
            <Button title="Submit" onPress={submitReview} />
        </View>
    );
};

export default ReviewScreen;
