import React from 'react';
import {connect} from 'react-redux'

const Profile = ({USER}) => {
    return (
        <div>
            <h1>Hola soy un profile</h1>
            {USER && USER.user,

            console.log(USER.user)

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.animedb
    }
}

export default connect(mapStateToProps)(Profile);