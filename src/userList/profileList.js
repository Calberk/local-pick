import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import {f, auth, database, storage} from '../../config/config';
import styles from './profileListStyle';
import background from '../../assets/backdrop.jpg';
import {Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';


class ProfileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            spots: [],
            refreshing: false,
            loading: true,
            isVisible: false
        }
    }

    componentDidMount =()=>{
        const {isUser, userId} = this.props;
        if(isUser === true){
            this.loadFeed(userId)
        }else{
            this.loadFeed('');
        }
    }

    loadFeed =(userId='') => {
        this.setState({
            refreshing: true,
            spots: []
        });

        var that = this

        var loadRef= database.ref('photos');
        if(userId !== ''){
            loadRef = database.ref('users').child(userId).child('hotSpots');
        }

        loadRef.orderByChild('timestamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
            var spots= that.state.spots;  

            for(var photo in data){
                that.addToFlatList(spots, data, photo, userId);
            }
        }).catch(error=> console.log(error));
    }

    addToFlatList = (spots, data, photo, userId)=>{
        var that = this;
        var spotObj = data[photo];
        database.ref('users').child(userId).child('username').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                spots.push({
                    id: photo,
                    url: spotObj.photo,
                    title: spotObj.category,
                    author: spotObj.username,
                    name: spotObj.name
                    // authorId: spotObj.author
                });
                that.setState({
                    refreshing: false,
                    loading: false
                });
        }).catch(error=> console.log(error));
    }

    createDeleteModal = (user, id) => {
        this.setState({
            isVisible: true
        })
        return (
            <Overlay
                isVisible={this.state.isVisible}
                width='90%'
                height='30%'
                animationType= 'slide'
                overlayStyle={{borderRadius:15, padding: 0, borderWidth: 4, borderColor: '#cc0000', backgroundColor: 'rgba(243, 241, 239, 1)'}}
                onBackdropPress={()=> this.setState({isVisible: false})}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalMain}>
                        
                        <View style={styles.modalContent}>
                            <Text style={styles.contentText}>Delete this <Text style={{color: '#cc0000', fontFamily: 'antonellie'}}> Hot Spot?</Text>
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.buttonCancel}
                                onPress={()=>this.deleteEntry(user, id)}
                            >
                            <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.addHotSpot()}
                            >
                            <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Overlay>
        )
    }

    deleteEntry =(user, id)=> {
            database.ref('users').child(user).child('hotSpots').remove(id)
            database.ref('hotSpots').child(id).remove()
        this.setState({
            isVisible: false,
        })
        ToastAndroid.showWithGravity(
            'Hot Spot Deleted',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    loadNew = () => {
        this.loadFeed();
    }

    handleLoad =() => {
        console.log('end')
    }

    
    render(){

        return(
            <View style={{flex: 3}} >
                {this.state.loading === true ? (
                <View style={styles.loadScreen}>
                    <Text style={styles.loadText}>Loading...</Text>
                </View>
                ): (
                <FlatList
                ListHeaderComponent={()=>this.props.testComponent()}
                data = {this.state.data}
                extraData = {this.state}
                refreshing = {this.state.refreshing}
                // onRefresh = {this.loadNew}
                onEndReached = {this.handleLoad}
                data = {this.state.spots}
                keyExtractor = {(item, index)=> index.toString()}
                renderItem={({item, index}) => (
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{flex:1, alignItems: 'center',}}
                        source={background}
                    >
                    {/* <View style={{justifyContent: 'center', alignItems: 'center'}}> */}
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.nameText}>{item.name}</Text>
                                {this.props.userId === f.auth().currentUser.uid ? (
                                    <View style={styles.deleteBtn}>
                                        <TouchableOpacity
                                            onPress={()=>this.createDeleteModal(this.props.userId, item.id)}
                                        >
                                            <Ionicons name='md-trash' size={26} color='#fff'/>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                                
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.url}&key=AIzaSyCXZxoa0P09f1o6y3RnGWwZ6m7vSPYEQ-k`}}
                                    style={styles.cardImage}
                                />
                            </View>
                            <View>
                                
                                {/* <TouchableOpacity
                                    onPress={()=> this.props.navigation.navigate('Comments')}
                                >
                                    <Text style={styles.commentText}>[View Comments]</Text>
                                </TouchableOpacity> */}
                            </View>      
                        </View>
                    </ImageBackground>
                    
                )}
                />  
            )}
                
            </View>
        )
    }
}

export default ProfileList