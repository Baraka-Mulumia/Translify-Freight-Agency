import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { IoAlertCircle } from "react-icons/io5";

export const PageContainer = styled(Grid)`
  height: 100vh;
  background-color: #ddd;
`;

export const VerificationWrapper = styled(Grid)`
  height: 50vh;
  width: 600px;
  border-radius: 5px;
  text-align: center;
  padding-bottom: 10px;
  background-color: transparent;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    max-height: 80vh;
  }
`;

export const AlertIcon = styled(IoAlertCircle)`
  padding: 10px;
  height: 100px;
  width: 300px;

  @media (max-width: 400px) {
    height: 50px;
    width: 200px;
  }
`;

export const VerificationHeader = styled.p`
  font-weight: 300;
  font-size: 25px;
  padding: 0 4px;
  color: #0d1117;
  text-align: center;

  @media (max-width: 1160px) {
    font-size: 24px;
    letter-spacing: 2px;
  }
`;

export const InputField = styled.input`
  background-color: #fff;
  color: navy;
  max-width: 300px;
  line-height: 40px;
  padding: 4px 8px;
  font-size: 30px;
  outline: none;
  border: 1px solid #fff;
  border-radius: 5px;
  margin: 20px 0;

  &::placeholder {
    font-size: 20px;
  }
`;
