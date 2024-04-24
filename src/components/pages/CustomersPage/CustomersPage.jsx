import React, { useState, useContext, useEffect } from "react";
import { AuthLayout } from "../../layouts/index.js";
import { CustomerCard } from "../../modules/index.js";
import { client } from "../../../utils/requestUtils.js";
import { CustomerContext } from "../../../context/index.js";
import { NoRecords } from "../../modules/index.js";

import {
  PageToolbar,
  AddorUpdateCustomerModal,
  PageContentGrid,
} from "../../modules/index.js";

const CustomersPage = () => {
  const [customersState, setCustomersState] = useState([]);
  const { setCustomers, customers } = useContext(CustomerContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await client.get("customers");
        setCustomersState(response.data);
        setCustomers(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadCustomers();
  }, []);

  const cols = customers.map((customer) => <CustomerCard data={customer} />);
  const content = cols.length ? <PageContentGrid cols={cols} /> : <NoRecords />;
  const toolbar = (
    <PageToolbar
      inputPlaceholder="Müşteri Ara"
      buttonText={"Müşteri Ekle"}
      modalComponent={AddorUpdateCustomerModal}
    />
  );

  return <AuthLayout toolbar={toolbar} children={content}></AuthLayout>;
};

export default CustomersPage;
