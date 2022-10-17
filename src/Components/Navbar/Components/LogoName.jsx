//Logo containing name
import Logo from '../../../Assets/logo.svg';

const LogoName = ({ name }) => {

    return(
        <button className='left-aligned logo-name'>
            <img src={Logo} id="navbar-logo" alt='Bello Logo'/>
            <h2>{name}</h2>
        </button>
    )
}

export default LogoName