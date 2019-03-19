import React, {Component} from 'react';
import { Permissions, ImagePicker } from 'expo';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ToastAndroid} from 'react-native';
import styles from './styleProfile';
import HeaderBar from '../components/headerBar';
import {FontAwesome, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';
import ProfileList from '../userList/profileList';

import {f, database, auth, storage} from '../../config/config';

class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            loggedin: false,
            isVisible: false,
            username: '',
            name: '',
            avatar: '',
            userId: '',
            location: '',
            email: '',
            imageId: this.uniqueId(),
            uploading: false,
            imageSelected: false,
            uri: '',
            currentImg: ''
        };
    }
    
    // on load check for user auth and fetch user data
    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.getUserData(user.uid)
            }else {
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    // get all user details that are stored in firebase
    getUserData = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                loggedin: true,
                userId: userId,
                location: data.location,
                email: data.email,
                currentImg: data.currentImg
            })
            
        })
        
    }

    // create a unique ID for each avatar photo being saved to storage
    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    // permissions for camera use
    _checkPermisions = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera: status});

        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({cameraRoll: statusRoll});
    }

    // function to pick image from phone storage
    _pickImage = async () => {
        this._checkPermisions();
        var avatar = this.state.avatar
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: false,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({ 
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: result.uri 
                
        });
        this.uploadImage(this.state.uri);
        } else{
            console.log('cancel');
            this.setState({
                imageSelected: false
            })
        }
    };

    // take chosen image and format to blob to be processed in server
    uploadImage = async (uri) => {
        //
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = that.state.imageId;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];

        this.setState({
        currentFileType: ext,
        uploading:true
        });

        var FilePath = imageId+'.'+that.state.currentFileType;
        const oReq = new XMLHttpRequest();
        oReq.open("GET", uri, true);
        oReq.responseType = "blob";
        oReq.onload = () => {
            const blob = oReq.response;
            //Call function to complete upload with the new blob to handle the uploadTask.
            database.ref("users/" + userid + "/currentImg/").set(FilePath)
            this.completeUploadBlob(blob, FilePath);
        };
        oReq.send();
    }

    //once file is formatted it is sent to firebase storage and a url is saved to firebase database
    completeUploadBlob = (blob, FilePath) => {
        var that = this;
        var userid = f.auth().currentUser.uid;
        var currentAvatar = that.state.currentImg
        // var imageId = this.state.imageId;

        var uploadTask = storage.ref('user/'+userid+'/img').child(FilePath).put(blob);

        uploadTask.on('state_changed', function(snapshot){
          var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        console.log('Upload is '+progress+'% complete');
        that.setState({
            progress:progress,
        });
        }, function(error) {
        console.log('error with upload - '+error);
        }, function(){
        //complete
        that.setState({progress:100});
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            that.processUpload(downloadURL)
            if(currentAvatar){
                storage.ref('user/'+userid+'/img/').child(currentAvatar).delete().then(function(){
                    ToastAndroid.showWithGravity(
                        'Profile Image Updated',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    that.processUpload(downloadURL)
                }).catch(function(error){
                    console.log(error)
                })
            }else{
                ToastAndroid.showWithGravity(
                    'Image Added',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                that.processUpload(downloadURL)
            };
        });
        }) 
    }

    // the downloadURL is sent to firebase database and state is reset
    processUpload = imageUrl => {
        var userId = f.auth().currentUser.uid;
        database.ref("users/" + userId + "/avatar/").set(imageUrl)

    
        this.setState({
        uploading: false,
        imageSelected: false,
        uri: "",
        avatar: imageUrl
        });
    };

    changeText = (type, value) => {
        this.setState({[type]: value})
    }

    updateProfile = () => {
        var name = this.state.name;
        var username = this.state.username;
        var location = this.state.location;

        if(name !== ''){
            database.ref('users').child(this.state.userId).child('name').set(name);
        }
        if(username !== ''){
            database.ref('users').child(this.state.userId).child('username').set(username);
        }
        if(location !== ''){
            database.ref('users').child(this.state.userId).child('location').set(location);
        }
        this.setState({isVisible: false})
        ToastAndroid.showWithGravity(
            'Profile Updated',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    signUserOut = () => {
        auth.signOut()
        .then(()=>this.props.navigation.navigate('Auth'))
        .catch((error)=> {
            console.log('error', error);
        });
    }

    render() {
        let { image } = this.state;
    
        return (
            <View style={{flex: 1}}>
                <HeaderBar title={this.state.username}/>
                {this.state.loggedin === true ? (
                    <View style={{flex: 2}}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={height= '100%'}
                            source={{uri:this.state.avatar}}
                        >
                            <View style={styles.profileInfo}>
                                <View style={styles.avatarContainer}>
                                    <Image style={styles.avatar} source={{uri: this.state.avatar }}/>
                                    <TouchableOpacity
                                    style={styles.avatarUpdateBtn}
                                    onPress={()=>this._pickImage()}
                                    >
                                        <Ionicons name='ios-camera' size={30} color='#cc0000'/>
                                    </TouchableOpacity>
                                </View>  
                                <TouchableOpacity 
                                    style={styles.logoutButton}
                                    onPress={()=>this.signUserOut()}
                                >
                                    <Text style={{textAlign:'center', color: '#fff'}}>Logout</Text>
                                </TouchableOpacity>                          
                                <View style={styles.profileSection}>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.nameText}>{this.state.name}</Text>
                                        <View style={styles.locationContainer}>
                                            <Entypo name='location-pin' size={36} color='#cc0000' />
                                            <Text style={styles.locationText}>{this.state.location}</Text>
                                        </View>
                                        <Text style={styles.emailText}>{this.state.email}</Text>
                                    </View>
                                    <View style={styles.editPencil}>
                                        <TouchableOpacity 
                                            style={styles.editButton}
                                            onPress={()=>this.setState({isVisible: true})}
                                        >
                                            <MaterialCommunityIcons name='pencil' size={26} color='#fff'/>
                                            <Text style={{fontStyle: 'italic', color: '#fff'}}>Edit</Text>
                                            {/* <Text style={{textAlign:'center', color: 'grey'}}>Edit Profile</Text> */}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        <ProfileList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>

                        <Overlay
                            isVisible={this.state.isVisible}
                            width='auto'
                            animationType= 'slide'
                            overlayStyle={{borderRadius:15, padding: 0, borderWidth: 4, borderColor: '#cc0000', backgroundColor: 'rgba(243, 241, 239, 1)'}}
                            onBackdropPress={()=> this.setState({isVisible: false})}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.headerText}>UPDATE PROFILE</Text>
                                    <TouchableOpacity 
                                        style={{marginLeft: 'auto'}}
                                        onPress={()=> this.setState({isVisible: false})}
                                    >
                                    <FontAwesome name="close" size={28} color="#cc0000"/>
                                    </TouchableOpacity>  
                                </View>
                                <View style={styles.modalMain}>
                                    
                                    <View style={styles.modalContent}>
                                        
                                        
                                        <TextInput 
                                            style={styles.largeTextInput}
                                            placeholder='Name'
                                            underlineColorAndroid='transparent'
                                            value={this.props.name}
                                            onChangeText = {value => this.changeText('name', value)}    
                                        />
                                        <TextInput 
                                            style={styles.largeTextInput}
                                            placeholder='Username'
                                            underlineColorAndroid='transparent'
                                            value={this.props.username}
                                            onChangeText = {value => this.changeText('username', value)}    
                                        />
                                        <TextInput 
                                            style={styles.largeTextInput}
                                            placeholder='Location'
                                            underlineColorAndroid='transparent'  
                                            value={this.props.location}
                                            onChangeText = {value => this.changeText('location', value)}      
                                        />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity 
                                            style={styles.button}
                                            onPress={this.updateProfile}
                                        >
                                        <Text style={styles.buttonText}>Update</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                
                            </View>
                                
                        </Overlay>
                    </View>
                    
                ):(
                    <View>
                        <Text>You are not logged in</Text>
                        <Text>Please login to view your profile</Text>
                    </View>
                    
                )}     
            </View>   
        );
    }

}

export default ProfileScreen