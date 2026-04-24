import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import userApi from '../api/userApi';

const BureaucratScreen = ({ route }) => {
    const { id } = route.params;
    const [bureaucrat, setBureaucrat] = useState({});
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
    	const fetchBureaucrat = async () => {
			try{
				const options = [`/bureaucrats/${id}`];
				const response = await userApi(options);
				
				if(response.status==200){
					const data = response.data;	
					console.log(JSON.stringify(data));
					setBureaucrat(data);
				}
				else{
					throw('Fetch bureaucrats error.');
				}
			}
			catch(err){
				console.log(err);
			}
		};
		const fetchReviews = async () => {
			try{
				const options = [`/reviews/${id}`];
				const response = await userApi(options);
				if(response.status==200){
					const data = response.data;	
					console.log(JSON.stringify(data));
					setReviews(data);
				}
				else{
					throw('Fetch reviews error.');
				}
			}
			catch(err){
				console.log(err);
			}
		};
		fetchBureaucrat();
		fetchReviews();
    },[id]);
        
    return (
        <View>
            <Text>{bureaucrat.name}</Text>
            <Text>{bureaucrat.department}</Text>
            <Text>{bureaucrat.position}</Text>
            <Text>{bureaucrat.averageRating}</Text>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.user.name}</Text>
                        <Text>Rating: {item.rating}</Text>
                        <Text>Comment: {item.comment}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default BureaucratScreen;