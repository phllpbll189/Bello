//Center project header for navbar
import DropdownTriangle from '../../../Assets/dropdownTriangle.svg';

const ProjectTitle = () => {

    return(
        <button className='title'>
            <img src={DropdownTriangle} className="dropdown-triangle" alt='Project dropdown'/>
            <h3>Mock Project</h3>
        </button>
    )
}

export default ProjectTitle