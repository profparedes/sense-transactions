import styled from "styled-components";

export const Container = styled.div`
  table {
    border-spacing: 0 0.5rem;

    th {
      color: var(--black);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      border-bottom: 5px solid var(--shape);

      padding: 1rem 2rem;
      background: var(--shape);
      font-weight: 400;
      color: var(--black);

      &:first-child {
        color: var(--text-title);
      }
      &.deposit {
        color: var(--green);
      }
      &.withdraw {
        color: var(--red);
      }
    }
  }

  select {
    border: none;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: 1px solid var(--blue);
  border-radius: 1rem;
  padding: 0 1rem;
`
