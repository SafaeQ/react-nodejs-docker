import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Image } from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import './SideBar.css'

const SideBar = ()=>{

return (
        <ProSidebar>
                <div className=" justify-content-center">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><Image class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/></div>
                </div>
            <Menu iconShape="square">
                  <div className=' justify-content-center'><MenuItem >Dashboard</MenuItem></div>
                  <div>  <MenuItem><Link to='/profile/admin'>Admins</Link> </MenuItem></div>
                <div><MenuItem ><Link to='/profile/owner'>Owners</Link> </MenuItem></div>
                <div><MenuItem><Link to='/profile/customer'>Customers </Link></MenuItem></div>  
            </Menu>
        </ProSidebar>
)
}
export default SideBar;