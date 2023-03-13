import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store";
import {FaTimes} from "react-icons/fa"

const Modal = () => {
	const handleClose = () => {
		setModal(false);
	};

	const { modal, setModal, Currentmovies } = useInfoStore();
	return (
		<MuiModal open={modal} onClose={handleClose}>
			<>
        <button onClick={()=>  setModal(false)} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]" >
          <FaTimes/>
        </button>
			</>
		</MuiModal>
	);
};

export default Modal;
