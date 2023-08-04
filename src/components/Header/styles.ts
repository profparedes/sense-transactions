import styled from "styled-components";

export const Container = styled.header`
  background: var(--shape);

  span {
    color: var(--blue);
    font-size: 600;
    font-weight: 600;
    margin-left: 1rem;
    margin-bottom: 0;
  }
`;

export const Contant = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1rem 1rem 1rem;

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue);
    border: 0;
    padding: 0 2rem;
    border-radius: 2rem;
    height: 3rem;

    transition: 0.2s;

    &:hover {
      background: var(--orange);
    }
  }
`;
