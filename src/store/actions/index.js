import { auth, database, f} from '../../../config/config';

export async function currentUserInfo(){

    const ref = await f.auth().currentUser.uid;
    const profile = await database.ref('users/' + ref).once('value');
    const userInfo = {
        id: ref,
        profile
    }
    return {
        type: 'CURRENT_USER',
        payload: userInfo
    }

}