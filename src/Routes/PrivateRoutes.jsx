import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoutes = (children) => {

        const {user, loading} = use(AuthContext);


        if(loading) {
            return <span className="loading loading-spinner text-success"></span>;
        }

        if(user) {
            return children
        }

};

export default PrivateRoutes;