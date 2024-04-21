import React from "react";

const initialCustomerContext = {
  customers: [],
};

const customerContextWrapper = (component) => ({
  ...initialCustomerContext,
  setCustomers: (data) => {
    initialCustomerContext.customers = data;
    component?.setState({ context: customerContextWrapper(component) });
  },
  getCustomers: () => initialCustomerContext.customers,
  resetCustomers: () => {
    initialCustomerContext.customers = [];
    component?.setState({ context: customerContextWrapper(component) });
  },
  addCustomer: (customer) => {
    initialCustomerContext.customers = [
      ...initialCustomerContext.customers,
      customer,
    ];
  },
});

export const CustomerContext = React.createContext(customerContextWrapper());

export class CustomerContextProvider extends React.Component {
  state = {
    context: customerContextWrapper(this),
  };

  render() {
    return (
      <CustomerContext.Provider value={this.state.context}>
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}
