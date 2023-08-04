import { transparentize } from "polished";
import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 2rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--blue-light);
    }

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 1rem 0;
    background: var(--blue);
    color: #fff;
    border-radius: 2rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: 0.3s;

    &:hover {
      background: var(--orange)
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

const color = {
  green: "#33cc95",
  red: "#e52e4d",
};

export const RadioBox = styled.button<RadioBoxProps>`
  padding: 1rem;
  border: 1px solid #d7d7d7;
  border-radius: 2rem;

  background: ${(props) =>
    props.isActive
      ? transparentize(0.9, color[props.activeColor])
      : "transparent"};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`;
