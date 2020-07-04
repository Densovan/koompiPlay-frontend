import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;

  font-size: 1em;
  height: 50px;

  background-color: ${(props) => (props.active ? "white" : "lightgray")};

  transition: background-color 0.9s ease-in-out;

  :hover {
    background-color: white;
  }
`;
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;
