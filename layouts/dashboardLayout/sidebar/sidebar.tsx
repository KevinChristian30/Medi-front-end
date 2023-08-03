import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Logo from "../../../components/logo/logo";
import style from "./sidebar.module.css";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useRouter } from "next/router";
import AddBoxIcon from '@mui/icons-material/AddBox';

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  
  const handleClick = () => {
    setOpen(!open);
  };

  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  }

  return ( 
    <div className={style.sidebar}>
      <div className={style.top}>
        <Logo />
      </div>
      <div className={style.bottom}>
        <List>
          <ListItemButton onClick={() => navigateTo('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon className={style.icon} />
            </ListItemIcon>
            <ListItemText>
              <p className={style.text}>
                Dashboard
              </p>
            </ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={() => navigateTo('/heart-rate')}>
            <ListItemIcon>
              <MonitorHeartIcon className={style.icon} />
            </ListItemIcon>
            <ListItemText>
              <p className={style.text}>
                Heart Rate
              </p>
            </ListItemText>
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PersonIcon className={style.icon} />
            </ListItemIcon>
            <ListItemText>
              <p className={style.text}>
                Profile
              </p>
            </ListItemText>
            {
              open ? 
              <ExpandLess className={style.icon} /> : 
              <ExpandMore className={style.icon} />
            }
          </ListItemButton>
          <Collapse 
            in={open} 
            timeout="auto" 
            unmountOnExit 
            className={style.collapse}
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigateTo('/my-data')}>
                <ListItemIcon>
                  <FingerprintIcon className={style.icon} />
                </ListItemIcon>
                <ListItemText>
                  <p className={style.text}>
                    My Data
                  </p>
                </ListItemText>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigateTo('reset-password')}>
                <ListItemIcon>
                  <LockResetIcon className={style.icon} />
                </ListItemIcon>
                <ListItemText>
                  <p className={style.text}>
                    Reset Password
                  </p>
                </ListItemText>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton 
            onClick={() => navigateTo('/medi-plus')} 
          >
            <ListItemIcon>
              <AddBoxIcon className={style.icon} />
            </ListItemIcon>
            <ListItemText>
              <p 
                className={style.text}
              >
                Medi+
              </p>
            </ListItemText>
          </ListItemButton>
        </List>
      </div>
    </div>
   );
}
 
export default Sidebar;