import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { deleteUser } from "../../features/user/userSlice";
import Button from "../button/button";

import "./modal.css";

const Modal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useSelector((state) => state.user);
  const onModalCloseHandler = () => {
    closeModal(false);
  };

  const onDeleteHandler = () => {
    dispatch(deleteUser(loggedInUser._id));
    navigate("/auth/register");
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-top-btn">
          <Button buttonType="secondary" onClick={onModalCloseHandler}>
            <AiOutlineClose />
          </Button>
        </div>
        <div className="modal-header">
          <div className="modal-top-icon">
            <TiDeleteOutline />
          </div>
          <h1>Are you sure?</h1>
        </div>
        <div className="modal-body">
          <p>
            Do you really want to delete your account? This action cannot be
            undone. All records associated with your account will be permanently
            deleted.
          </p>
        </div>
        <div className="modal-footer">
          <Button buttonType="info" onClick={onModalCloseHandler}>
            Cancel
          </Button>
          <Button buttonType="danger" onClick={onDeleteHandler}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
