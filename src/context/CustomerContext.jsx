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
    component?.setState({ context: customerContextWrapper(component) });
  },
  deleteCustomer: (customerId) => {
    const newCustomers = initialCustomerContext.customers.filter(
      (customer) => customer.id !== customerId
    );
    initialCustomerContext.customers = [...newCustomers];
    component?.setState({ context: customerContextWrapper(component) });
  },
  updateCustomer: (customerId, data) => {
    const oldCustomer = initialCustomerContext.customers.filter(
      (customer) => customer.id === customerId
    )[0];
    const newCsutomer = { ...oldCustomer, ...data };
    initialCustomerContext.customers = [
      ...initialCustomerContext.customers.filter(
        (customer) => customer.id !== customerId
      ),
      newCsutomer,
    ];
    component?.setState({ context: customerContextWrapper(component) });
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
