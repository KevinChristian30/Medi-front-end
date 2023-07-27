import Link from "next/link";
import Logo from "../logo/Logo";
import style from "./navbar.module.css";
import { useState } from "react";
import { Modal } from "@mui/material";
import LoginModal from "./loginModal/loginModal";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return ( 
    <>
      <div className={style.navbar}>
        <div className={style.left}>
          <Link href="/"><Logo /></Link>
        </div>
        <ul className={style.right}>
          <li>
            <div className={style.loginButton} onClick={handleOpenModal}>Login</div>
          </li>
        </ul>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-login"
        aria-describedby="modal-login"
        className={style.modalContainer}>
          <LoginModal />
      </Modal>
    </>
   );
}
 
export default Navbar;