import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ToastAndroid, Linking} from 'react-native';
import {f, auth, database, storage} from '../../config/config';
import styles from './profileListStyle';
import background from '../../assets/backdrop.jpg';
import {FontAwesome, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';


class ProfileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            spots: [],
            refreshing: false,
            loading: true,
            isVisible: false,
            isNew: true
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
            // spots: []
        });

        var that = this

        var loadRef= database.ref('photos');
        if(userId !== ''){
            loadRef = database.ref('users').child(userId).child('hotSpots');
        }

        loadRef.orderByChild('timestamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        console.log('exists',exists)
        if(exists){ data = snapshot.val();
            var spots= that.state.spots;  

            for(var photo in data){
                that.addToFlatList(spots, data, photo, userId);
            }
        }else{
            that.setState({
                spots: [],
                loading: false,
                refreshing: false
            })
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
                    name: spotObj.name,
                    number: spotObj.phNumber,
                    map: spotObj.map,
                    website: spotObj.website,
                });
                that.setState({
                    refreshing: false,
                    loading: false,
                    isNew: false
                });
        }).catch(error=> console.log(error));
    }

    deleteEntry =(user, id)=> {
        console.log('delete has been pressed', user, id)
            database.ref('users').child(user).child('hotSpots').child(id).remove()
            database.ref('hotSpots').child(id).remove()
        this.setState({
            isVisible: false,
        })
        ToastAndroid.showWithGravity(
            'Hot Spot Deleted',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        this.loadFeed();
    }

    loadNew = () => {
        this.loadFeed();
    }

    handleLoad =() => {
        console.log('end')
    }

    calll=(number)=>{
        const url = `tel://${number}`
        Linking.openURL(url)
    }

    
    render(){

        return(
            <ImageBackground
            resizeMode={'cover'}
            style={{flex:1, alignItems: 'center',}}
            source={background}
        >
                {this.state.loading === true ? (
                <View style={styles.loadScreen}>
                    <Text style={styles.loadText}>Loading...</Text>
                </View>
                ): this.state.isNew ? (
                    <View style={styles.content}>
                        {this.props.testComponent()}
                        <View style={styles.content}>
                            <Text style={styles.header}>No <Text style={{color: '#cc0000', fontFamily: 'antonellie'}}>Hot Spots</Text></Text>
                            <Text style={{color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'openSansI'}}>Please create your first Hot Spot</Text>
                        </View>
                    </View>
                    
                ): (
                <FlatList
                ListHeaderComponent={()=>this.props.testComponent()}
                data = {this.state.data}
                extraData = {this.state}
                refreshing = {this.state.refreshing}
                onRefresh = {this.loadNew}
                onEndReached = {this.handleLoad}
                data = {this.state.spots}
                keyExtractor = {(item, index)=> index.toString()}
                renderItem={({item, index}) => (
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{flex:1, alignItems: 'center',}}
                        source={background}
                    >
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.nameText}>{item.name}</Text>
                                {this.props.userId === f.auth().currentUser.uid ? (
                                    <View style={styles.deleteBtn}>
                                        <TouchableOpacity
                                            onPress={()=>this.setState({isVisible: true})}
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
                            <View  style={{flexDirection:'row', padding: 10}}>
                                <View style={{width: '25%'}}>
                                    <TouchableOpacity title='call' onPress={()=>this.calll(item.number)} style={{alignItems:'center'}}>
                                        <FontAwesome name='phone' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: '25%'}}>
                                    <TouchableOpacity title='call' onPress={()=> Linking.openURL(item.map)} style={{alignItems:'center'}}>
                                        <MaterialCommunityIcons name='map-marker-radius' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: '25%' }}>
                                    <TouchableOpacity title='call' onPress={()=> Linking.openURL(item.website)} style={{alignItems:'center'}}>
                                        <MaterialCommunityIcons name='web' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: '25%'}}>
                                    <TouchableOpacity title='call' onPress={()=>this.props.navigation.navigate('Comments', {hotSpotId: item.id})} style={{alignItems:'center'}}>
                                        <FontAwesome name='commenting-o' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                
                                </View>
                            </View>          
                        </View>
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
                                            onPress={()=>this.setState({isVisible: false})}
                                        >
                                        <Text style={styles.cancelText}>Cancel</Text>
                                        </TouchableOpacity>  
                                        <TouchableOpacity 
                                            style={styles.button}
                                            onPress={()=>this.deleteEntry(this.props.userId, item.id)}
                                        >
                                        <Text style={styles.buttonText}>Confirm</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Overlay>
                    </ImageBackground>
                    
                )}
                />  
            )}
                
                </ImageBackground>
        )
    }
}

export default ProfileList