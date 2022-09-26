import { View, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Header, Review, Text } from '../../Components'
import { Colors } from '../../Styles'
import { doctorImg, FemaleDoctorImg, MaleDoctorImg, PatientProfileImg, profileImg } from '../../Assets'
import ReviewMiddleware from '../../Store/Middleware/ReviewMiddleware'
import { useDispatch, useSelector } from 'react-redux';


const Reviews = () => {

    useEffect(()=>{
        dispatch(ReviewMiddleware.getReviews())
        .then((data) =>{ 
            console.log('----', data?.data?.user)
            setData(data?.data)
        })
        .catch((err) => {
            console.log('----', err)
        })
    },[])

    const [data, setData] = useState([])

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Header headerLeft={true} title={'Reviews'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (<Review item={item} />)}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: 20, backgroundColor: Colors.WHITE
    }
})

export default Reviews