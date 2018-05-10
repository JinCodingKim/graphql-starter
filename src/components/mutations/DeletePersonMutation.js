import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { GET_PEOPLE } from "../queries/PeopleQuery";

export const DELETE_PERSON = gql`
  mutation deletePerson($id: Int!) {
    deletePerson(id: $id)
  }
`;

const DeletePersonMutation = props => {
  return (
    <Mutation
      mutation={DELETE_PERSON}
      update={(cache, { data: { deletePerson } }) => {
        let { people } = cache.readQuery({ query: GET_PEOPLE });
        const update = people.filter(val => val.id !== deletePerson);
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: update }
        });
      }}
    >
      {(deletePerson, { loading, err }) => (
        <div>{props.children(loading, err, deletePerson)}</div>
      )}
    </Mutation>
  );
};

export default DeletePersonMutation;
