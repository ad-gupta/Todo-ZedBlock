import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const PwdErrMsg = styled.p`
  font-size: 10px;
  color: red;
  margin: -5px 0;
`;

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setmsg] = useState("");
  const [notFound, setNotFound] = useState("");
  const [invalidCred, setInvalidCred] = useState("");
  const [userExist, setUserExist] = useState("");
  const [signin_flag, setSingin_flag] = useState("");
  const [signup_flag, setSingup_flag] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSafe = (pwd) => {
    if (pwd.length < 6) return 0;
    if (!/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd)) return 0;
    return true;
  };
  const handleSignin = async (e) => {
    // e.preventDefault()
    setSingin_flag(1);
    setSingup_flag('');
    dispatch(loginStart());
    try {
      const response = await axios.post("user/signin", { username, password });
      // console.log(response.data);
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        navigate("/tasks");
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "User not found"
      ) {
        setInvalidCred("");
        setNotFound(err.response.data.error);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Wrong Credentials!"
      ) {
        setNotFound("");
        setInvalidCred(err.response.data.error);
      } else {
        dispatch(loginFailure());
      }
    }
  };
  const handleSignUp = async (e) => {
    setSingup_flag(1);
    setSingin_flag('');
    console.log(username, password);
    dispatch(loginStart());
    try {
      const response = await axios.post("user/signup", { username, password });
      if (response.status === 201) {
        dispatch(loginSuccess(response.data));
        navigate("/tasks");
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "User Already exist"
      ) {
        setNotFound("");
        setInvalidCred("");
        setUserExist(err.response.data.error);
      } else {
        dispatch(loginFailure());
      }
    }
  };

  const setMessage = (flag, setfun) => {
    if(flag === signup_flag) {
      setSingup_flag(1)
      setfun("password should contain atleast 1 [A-Z], 1 [a-z], min length is 6")
    }else{
      setSingin_flag(1)
      setfun("password should contain atleast 1 [A-Z], 1 [a-z], min length is 6")
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>To Do App</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <PwdErrMsg>{signin_flag && msg} </PwdErrMsg>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PwdErrMsg>{signin_flag && (notFound || invalidCred)}</PwdErrMsg>
        <Button
          onClick={() => {
            isSafe(password)
              ? handleSignin()
              : setMessage(signin_flag, setmsg)
          }}
        >
          Sign in
        </Button>

        <Title>or</Title>

        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <PwdErrMsg>{signup_flag && msg} </PwdErrMsg>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          />
          <PwdErrMsg>{signup_flag && (userExist || invalidCred)}</PwdErrMsg>
        {}
        <Button
          onClick={() => {
            isSafe(password)
              ? handleSignUp()
              : setMessage(signup_flag, setmsg)
          }}
        >
          Sign up
        </Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
