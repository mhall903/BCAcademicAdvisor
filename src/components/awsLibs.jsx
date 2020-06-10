import {Storage, Auth} from "aws-amplify";

export async function s3upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    console.log("loading pdf user information");
    const authResponse = await Auth.currentAuthenticatedUser();
    console.log(authResponse);

    console.log("loading pdf user cred");
    const authCred = await Auth.currentSession();
    console.log(authCred);

    // put in secure storage
    /**/
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });
    /**/

    // put in public storage
    /*
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    */

    const testvar = await Storage.get(stored.key, {level:'private'});
    const split = testvar.split('/');
    const privatePath = decodeURIComponent(split[4])
    console.log(privatePath.concat('/', stored.key.split('.pdf')[0]));

    return privatePath.concat('/', stored.key.split('.pdf')[0]);
}