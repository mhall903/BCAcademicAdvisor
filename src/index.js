import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify'
import config from './config';
import SidebarV2 from './components/SidebarV2';
import {HashRouter} from 'react-router-dom';




Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "bcadmin",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION,
            }
        ]
    }
});

Amplify.Storage.configure({
    bucket: Amplify.Storage.bucket,
    region: Amplify.Storage.region,
    identityPoolId: Amplify.Storage.identityPoolId
})

ReactDOM.render(
//    <Sidebar />, mountNode
<HashRouter>
        <SidebarV2/>
        </HashRouter>



    ,document.getElementById('root')
)

serviceWorker.unregister();
