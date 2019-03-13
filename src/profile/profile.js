import React, {Component} from 'react';
import { Permissions, ImagePicker } from 'expo';
import {View, Text, Button, Image, TouchableOpacity, Modal, TextInput} from 'react-native';
import styles from './styleProfile';
import HeaderBar from '../components/headerBar';
import {FontAwesome} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';

import {f, database, auth, storage} from '../../config/config';

class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            loggedin: false,
            username: '',
            name: '',
            avatar: '',
            userId: '',
            location: '',
            email: '',
            imageId: this.uniqueId(),
            uploading: false,
            imageSelected: false,
            uri: ''
        };
    }
    

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

    componentWillUnmount = () => {
        this.setState({ isVisible: false})
    }

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
                isVisible: false
            })
            console.log('data',data.avatar)
        })
    }

    nameChange = (name) => {
        this.setState ({
            name
        })
    }

    userNameChange = (username) => {
        this.setState ({
            username
        })
    }

    locationChange = (location) => {
        this.setState ({
            location
        })
    }

    emailChange = (email) => {
        this.setState ({
            email
        })
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
        Alert.alert('Profile has been updated')
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    _checkPermisions = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera: status});

        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({cameraRoll: statusRoll});
    }

    _pickImage = async () => {
        this._checkPermisions();
        var avatar = this.state.avatar
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: false,
            quality: 1
        });

        console.log(result)
    
        // console.log(result);
    
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

    uploadPublish = () => {
        if (this.state.uploading == false) {
            this.uploadImage(this.state.uri);
        } else {
        console.log("Ignore button tap as already uploading");
        }
    };

    uploadImage = async (uri) => {
        //
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = this.state.imageId;
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
            this.completeUploadBlob(blob, FilePath); 
        };
        oReq.send();
    }

    completeUploadBlob = (blob, FilePath) => {

        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = this.state.imageId;

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
            console.log(downloadURL);
            that.processUpload(downloadURL);
        });
    
        });
    }

    processUpload = imageUrl => {
        //Process here...
    
        //Set needed info
        var imageId = this.state.imageId;
        var userId = f.auth().currentUser.uid;
        // var caption = this.state.caption;
        // var dateTime = Date.now();
        // var timestamp = Math.floor(dateTime / 1000);
        //Build photo object
        //author, caption, posted, url
    
        var photoObj = {
            author: userId,
            // caption: caption,
            // posted: timestamp,
            url: imageUrl
        };
    
        //Update database
    
        //Add to main feed
        // database.ref("/photos/" + imageId).set(photoObj);
    
        //Set user photos object
        database.ref("/users/" + userId + "/photos/" + imageId).set(photoObj);
        database.ref("users/" + userId + "/avatar/").set(imageUrl)
        alert("Image Uploaded!!");
    
        this.setState({
        uploading: false,
        imageSelected: false,
        caption: "",
        uri: ""
        });
    };

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
            <View>
                <HeaderBar title="My Profile"/>
                {this.state.loggedin === true ? (
                    <View>
                        <View style={styles.profileInfo}>
                            <View style={styles.avatarContainer}>
                                <Image style={styles.avatar} source={{uri: this.state.avatar }}/>
                            </View>
                            
                            <View style={styles.userInfo}>
                                <Text>{this.state.name}</Text>
                                <Text>{this.state.location}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonSection}>
                            <TouchableOpacity 
                                style={styles.editButton}
                                onPress={()=>this.setState({isVisible: true})}
                            >
                                <Text style={{textAlign:'center', color: 'grey'}}>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.logoutButton}
                                onPress={()=>this.signUserOut()}
                            >
                                <Text style={{textAlign:'center', color: '#cc0000'}}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                        

                        <View style={{flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Button
                                title="Pick an image from camera roll"
                                onPress={()=>this._pickImage()}
                            />
                            {image &&
                            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                        </View>
                        <Overlay
                            isVisible={this.state.isVisible}
                            width='auto'
                            animationType= 'slide'
                            overlayStyle={{borderRadius:20}}
                            onBackdropPress={()=> this.setState({isVisible: false})}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.headerText}>UPDATE PROFILE</Text>
                                    <TouchableOpacity 
                                        style={{marginLeft: 'auto'}}
                                        onPress={()=> this.setState({isVisible: false})}
                                    >
                                    <FontAwesome name="close" size={35} color="#cc0000"/>
                                    </TouchableOpacity>  
                                </View>
                                <View style={styles.modalMain}>
                                    
                                    <View style={styles.modalContent}>
                                        
                                        
                                        <TextInput 
                                            style={styles.largeTextInput}
                                            placeholder='Name'
                                            underlineColorAndroid='transparent'
                                            value={this.props.name}
                                            onChangeText = {this.nameChange}    
                                        />
                                        <TextInput 
                                            style={styles.largeTextInput}
                                            placeholder='Username'
                                            underlineColorAndroid='transparent'
                                            value={this.props.username}
                                            onChangeText = {this.userNameChange}    
                                        />
                                        <TextInput 
                                            style={styles.largeTextInput}
                                            placeholder='Location'
                                            underlineColorAndroid='transparent'  
                                            value={this.props.location}
                                            onChangeText = {this.locationChange}      
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