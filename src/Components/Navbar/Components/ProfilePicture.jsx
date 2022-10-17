//Logo containing name
import DefaultProfileImage from '../../../Assets/defaultProfileImage.svg';

const ProfilePicture = () => {

    return(
        <button className='right-aligned'>
            <img src={DefaultProfileImage} id="navbar-logo" alt='Profile Dropdown'/>
        </button>
    )
}

export default ProfilePicture