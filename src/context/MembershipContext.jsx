import React from "react";

const initialMembershipContext = {
  memberships: [],
};

const membershipContextWrapper = (component) => ({
  ...initialMembershipContext,
  setMemberships: (data) => {
    initialMembershipContext.memberships = data;
    component?.setState({ context: membershipContextWrapper(component) });
  },
  getMemberships: () => initialMembershipContext.memberships,
  resetMemberships: () => {
    initialMembershipContext.memberships = [];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  addMembership: (membership) => {
    initialMembershipContext.memberships = [
      ...initialMembershipContext.memberships,
      membership,
    ];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  deleteMembership: (membershipId) => {
    const newCustomers = initialMembershipContext.memberships.filter(
      (membership) => membership.id !== membershipId
    );
    initialMembershipContext.memberships = [...newCustomers];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  updateMembership: (membershipId, data) => {
    const oldMembership = initialMembershipContext.memberships.filter(
      (membership) => membership.id === membershipId
    )[0];
    const newMembership = { ...oldMembership, ...data };
    initialMembershipContext.memberships = [
      ...initialMembershipContext.memberships.filter(
        (membership) => membership.id !== membershipId
      ),
      newMembership,
    ];
    component?.setState({ context: membershipContextWrapper(component) });
  },
});

export const MembershipContext = React.createContext(
  membershipContextWrapper()
);

export class MembershipContextProvider extends React.Component {
  state = {
    context: membershipContextWrapper(this),
  };

  render() {
    return (
      <MembershipContext.Provider value={this.state.context}>
        {this.props.children}
      </MembershipContext.Provider>
    );
  }
}
