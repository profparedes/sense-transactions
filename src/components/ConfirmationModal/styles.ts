import styled from "styled-components";

export const ActionButton = styled.button`
  background: var(--blue);
  color: var(--shape);
  border: none;
  border-radius: 1rem;
  padding: 0.25rem 1.5rem;
  transition: 0.2s;

  &:hover {
    background: var(--orange);
  }
`;
