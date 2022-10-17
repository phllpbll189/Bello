//Navbar for all pages
import LogoName from './Components/LogoName';
import DefaultProfileImage from './Components/ProfilePicture';
import ProjectTitle from './Components/ProjectTitle';

const Navbar = () => {

    return(
        <div className="navbar">
            <LogoName name="Bello"/>
            <ProjectTitle/>
            <DefaultProfileImage/>
        </div>
    )
}

export default Navbar