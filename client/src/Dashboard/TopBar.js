import React, { useState } from 'react';
import { Drawer,Space} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from "../Assets/logo1.png";
import { useHistory } from 'react-router-dom';


function TopBar(currentPage){
  const history = useHistory();


  //antd effects 
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };


  return (
    <div className='navbar'> 


      <div>
        
      <>
      <a className="navbar-brand" href="#"><img id="dashboardLogo"src={logo} alt="" onClick={()=>history.push("/dashboard/home")}/></a>
      {/* ANTD-effects*/}
        <Space>
        
        <MenuOutlined onClick={showDrawer} id='menuIcon'/>


        </Space>

        <Drawer 
          className='mainD'

          placement={'right'}
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
          style={{ background: '#313338' }}
        >
          <p>Home</p>
          <p>Password</p>
          <p>Credit Cards</p>
          <p>Notes</p>
          <p>Addresses</p>


        </Drawer>
      </>

      </div>


    </div>
  );
};
export default TopBar;