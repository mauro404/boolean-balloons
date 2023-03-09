import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import AdminNav from "./AdminNav";
import { Table, Container } from "react-bootstrap";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Container className="px-2 px-md-0 px-lg-5 table-responsive">
      <MetaData title={"All Users"} />
      <AdminNav />

      <h3 className="py-4">All Users</h3>

      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/admin/user/${user._id}`}
                    className="btn btn-primary py-1 px-2"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-danger py-1 px-2 ml-2"
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UsersList;
