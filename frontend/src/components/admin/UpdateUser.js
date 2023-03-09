import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import AdminNav from "./AdminNav";
import { Form, FloatingLabel, Button, Container } from "react-bootstrap";

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const userId = params.id;

  useEffect(() => {
    console.log(user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User updated successfully");

      navigate("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <Container className="px-2 px-md-0 px-lg-5">
      <MetaData title={`Update User`} />
      <AdminNav />

      <Form className="" onSubmit={submitHandler}>
        <h3 className="py-4">Update User</h3>

        <Form.Group>
          <FloatingLabel label="Name" className="mb-3">
            <Form.Control
              required
              type="name"
              className="form-control mb-3"
              id="name_field"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              required
              type="email"
              className="form-control mb-3"
              id="email_field"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Role" className="mb-3">
            <Form.Select
              required
              className="form-control mb-3"
              id="role_field"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Button type="submit" className="btn btn-block mb-3">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
