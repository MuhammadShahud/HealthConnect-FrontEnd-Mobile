import { View, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Header, Review, SubmitButton, Text, TextInput, } from '../../Components'
import { Colors } from '../../Styles'
import { MaleDoctorImg, user_cross } from '../../Assets'
import SelectDropdown from 'react-native-select-dropdown'
import { AirbnbRating } from 'react-native-ratings'
import FamilyMemberMiddleware from '../../Store/Middleware/FamilyMemberMiddleware'
import {useDispatch, useSelector} from 'react-redux';
import { IMG_URL } from '../../Store/Apis'
import FamilyMemberAction from '../../Store/Actions/FamilyMemberAction'

const relationShip = [
    'Relation',
    'Mother' ,
    'Father',
    'Daughter',
    'Son',
    'Sister' ,
    'Brother',
    'Aunty',
    'Uncle',
    'Niece',
    'Nephew',
    'Cousin (female)',
    'Cousin (male)',
    'Grandmother',
    'Grandfather',
    'Granddaughter',
    'Grandson',
    'Stepsister',
    'Stepbrother',
    'Stepmother',
    'Stepfather',
    'Stepdaughter',
    'Stepson',
    'Sister-in-law',
    'Brother-in-law',
    'Mother-in-law',
    'Father-in-law',
    'Daughter-in-law',
    'Son-in-law',
    'Sibling (gender neutral)',
    'Parent (gender neutral)',
    'Child (gender neutral)',
    'Sibling of Parent (gender neutral)',
    'Child of Sibling (gender neutral)',
    'Cousin (gender neutral)',
    'Grandparent (gender neutral)',
    'Grandchild (gender neutral)',
    'Step-sibling (gender neutral)',
    'Step-parent (gender neutral)',
    'Stepchild (gender neutral)',
    'Sibling-in-law (gender neutral)',
    'Parent-in-law (gender neutral)',
    'Child-in-law (gender neutral)',
    'Family member (gender neutral)',
    'Pet (gender neutral)',

 ];



const FamilyMemberShip = () => {
    
    const [isShowAddForm, setIsShowForm] = useState(false)
    const [email, setEmail] = useState('')
    const [relationShipList, setRelationShipList] = useState(relationShip)
    const [relation, setRelation] = useState(null)
    const FamilyMemberState = useSelector(state => state.FamilyMemberReducer);
    const dispatch = useDispatch();
    const FamilMemberData = FamilyMemberState?.familymember;
    const FamilyMemberList = FamilyMemberState?.familymember_list;
    const loading = FamilyMemberState?.loading;
    const AuthState = useSelector(state => state.AuthReducer);
    const [loader, setLoader] = useState(true);

    // console.log('=',AuthState?.user?.user?.email);


    useEffect(()=>{
        onRefreshServices()
    },[])


    const onRefreshServices = () => {
        setLoader(true),
        dispatch(FamilyMemberMiddleware.getFamilyMember())
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false));

    };



    const onPressAddMember = () => {
        if(email == ''){
            ToastAndroid.showWithGravityAndOffset(
                'Enter email..',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
        }
        else if(email === AuthState?.user?.user?.email){
            ToastAndroid.showWithGravityAndOffset(
                'Your own email can not be added as family member..',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
        }
        else if(relation == null || relation == 'Relation'){
            ToastAndroid.showWithGravityAndOffset(
                'Select relation..',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
        }
        else{
            dispatch(FamilyMemberMiddleware.getUser(email))
                            .then(data => {
                                if(data?.data?.data?.length == 1){
                                    console.log(data?.data?.data[0]?.id);
                                    let userData = {
                                        id: data?.data?.data[0]?.id,
                                        relation: relation
                                    };
                                dispatch(FamilyMemberMiddleware.addFamilyMember(userData))
                                    .then(data => {
                                    //  console.log(data);
                                })
                                .catch(err => {console.log(err)});
                                }
                                else{
                                    Alert.alert('Note','User not found')
                                }
                            })
                            .catch(err => {console.log(err)});           
        }
    }

    const onPressRemove = (id, index) => {
        Alert.alert("Note", "Are you sure you want to remove family member?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => removeFamilyMember(id, index) }
          ]);       
    }

    const removeFamilyMember = (id, index) => {
        dispatch(FamilyMemberAction.deleteFamilyMember(index))
        dispatch(FamilyMemberMiddleware.deleteFamilyMember(id))
        .then(data => {
            //  console.log(data);
        })
        .catch((err)=>{
            console.log(err);
          })
    }

    const renderSubHeader = (title) => {
        return (
            <TouchableOpacity onPress={() => setIsShowForm(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.BG_GRAY, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 5, marginVertical: 4 }}>
                <Text style={{ fontSize: 16, color: Colors.DARK_GRAY }}>{title}</Text>
                <View style={{ color: Colors.WHITE, backgroundColor: Colors.LIGHT_GREEN, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                    <Text style={{ color: Colors.WHITE, fontSize: 22 }}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // const renderFamilyCounterheader = (title) => {
    //     return (
    //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.BG_GRAY, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 5, marginVertical: 4 }}>
    //             <Text style={{ fontSize: 16, color: Colors.DARK_GRAY }}>{title}</Text>
    //             <Text style={{ fontSize: 16, color: Colors.DARK_GRAY }}>{'1/4'}</Text>
    //         </View>
    //     )
    // }
    // const renderEmpty = () => {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Image source={user_cross} style={{ width: 100, height: 100 }} resizeMode={'contain'} />
    //             <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.BLACK, marginVertical: 20 }}>No User Found</Text>
    //         </View>
    //     )
    // }

    const renderAddForm = () => {
        return (
            <View style={{}}>
                <View style={{ width: '100%' }}>
                    <TextInput
                        placeholder={'Your Email'}
                        placeholderTextColor={Colors.GRAY}
                        inputContainerStyle={styles.input}
                        style={{paddingHorizontal: 12, color: '#000'}}
                        onChangeText={val=> setEmail(val)}
                    />

                <View style={styles.pickerContainer}>
                    <SelectDropdown
                        buttonStyle={{width: '100%', backgroundColor: 'transparent' }}
                        buttonTextStyle={{color: Colors.GRAY}}
                        defaultValue={'Relation'}
	                    data={relationShipList}
                        dropdownStyle={{height: '50%'}}
	                    onSelect={(selectedItem, index) => {
                        // setRelationShipList(selectedItem);
                        setRelation(selectedItem)
	                    }}
        	            buttonTextAfterSelection={(selectedItem, index) => {
		                return selectedItem
	                    }}
	                    rowTextForSelection={(item, index) => {
		                return item
	                    }}
                    />
                </View>

                </View>
                <SubmitButton
                    onPress={onPressAddMember}
                    text={'Add Member'}
                    buttonContainer={{ width: '100%' }}
                    style={styles.button}
                />
            </View>
        )
    }

    const renderOneMember = ({item, index}) => {
        return (
            <View style={styles.userContainer}>
                <View style={styles.userSubContainer}>
                    <Image source={item?.member?.profile_pic ? {uri: IMG_URL + item?.member?.profile_pic} : require('../../Assets/Images/avatar.png')} style={styles.userimage} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.name}>{item?.member?.username}</Text>
                        <Text style={styles.dateAgo}>{item?.relation}</Text>
                    </View>
                </View>
                <SubmitButton text={'Remove'}
                onPress={()=>onPressRemove(item?.id, index)}
                    buttonContainer={styles.buttonContainer}
                    textStyle={{ fontSize: 13, fontWeight: 'bold' }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header headerLeft={true} title={'Family Membership'} />
            <View style={{ flex: 1 }}>
                {!isShowAddForm && renderSubHeader('Add Members')}
                {/* {!isShowAddForm && renderFamilyCounterheader('Family Tree')} */}
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.BLACK, marginVertical: 20 }}>Family Members</Text>
                {/* {renderEmpty()} */}
                {isShowAddForm && renderAddForm()}
                {!isShowAddForm && 
                <View>
                { FamilyMemberList.length !== 0 ? <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loader}
                        onRefresh={onRefreshServices}
                    />
                }
                data={FamilyMemberList}
                renderItem={renderOneMember}
                keyExtractor={(item, index) => index.toString()}                
                /> : 
                <View style={{height: '70%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    style={{height: 100, width: 100}}
                    source={require('../../Assets/Images/user_cross.png')}
                    />
                <Text style={{color: '#000', padding: 5}}>No Member Found</Text>
                </View>
                }
                </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: 20, backgroundColor: Colors.WHITE
    },
    input: {
        width: '100%',
        paddingHorizontal: 12,

    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.LIGHT_GREEN,
        marginVertical: 6,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        backgroundColor: Colors.LIGHT_GREEN,
        alignSelf: 'center',
        borderRadius: 7,
    },
    userContainer: {
        flexDirection: 'row', backgroundColor: Colors.BG_GRAY, paddingVertical: 10, marginVertical: 10
    },
    userSubContainer: {
        flex: 1, flexDirection: 'row', paddingHorizontal: 10
    },
    userimage: {
        width: 50, height: 50, borderRadius: 100
    },
    name: {
        fontSize: 16, color: Colors.BLACK, fontWeight: 'bold'
    },
    dateAgo: { fontSize: 12, color: Colors.LIGHT_GRAY_1, fontWeight: '300' },
    buttonContainer: {
        paddingVertical: 5,
        alignSelf: 'center',
        borderRadius: 6,
        backgroundColor: Colors.LIGHT_GREEN,
        width: 110,
        marginHorizontal: 10
    }
})

export default FamilyMemberShip