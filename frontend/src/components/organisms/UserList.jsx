// Node module Imports
import styled from "styled-components";

import {
  // Molecules
  UserCard,
} from "../../config/exports";

const Div_sc = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-block: 5rem;
`;

function UserList({ users }) {
  return (
    <Div_sc>
      {users?.map(({ _id, profile: { name, image } }, index) => {
        return (
          <UserCard
            key={index}
            size="5rem"
            image={image}
            name={name}
            userId={_id}
          />
        );
      })}
    </Div_sc>
  );
}

export default UserList;
