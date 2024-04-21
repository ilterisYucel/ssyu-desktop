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
  getCustomers: () => initialMembershipContext.memberships,
  resetMemberships: () => {
    initialMembershipContext.memberships = [];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  addMembership: (membership) => {
    initialMembershipContext.memberships = [
      ...initialMembershipContext.memberships,
      membership,
    ];
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