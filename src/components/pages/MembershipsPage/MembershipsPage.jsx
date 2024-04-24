import React, { useContext, useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/index.js";
import { MembershipContext } from "../../../context/MembershipContext.jsx";
import { client } from "../../../utils/requestUtils.js";
import {
  AddorUpdateMembershipModal,
  MembershipCard,
  NoRecords,
} from "../../modules/index.js";
import PageContentGrid from "../../modules/PageContentGrid/index.js";
import { PageToolbar } from "../../modules/index.js";

const MembershipsPage = () => {
  const [membershipsState, setMembershipsState] = useState([]);
  const { setMemberships, memberships } = useContext(MembershipContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await client.get("memberships");
        setMembershipsState(response.data);
        setMemberships(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getCustomers();
  }, []);
  const cols = memberships.map((membership) => (
    <MembershipCard data={membership} />
  ));
  const content = cols.length ? <PageContentGrid cols={cols} /> : <NoRecords />;
  const toolbar = (
    <PageToolbar
      inputPlaceholder="Üyelik Ara"
      buttonText={"Üyelik Ekle"}
      modalComponent={AddorUpdateMembershipModal}
    />
  );
  return <AuthLayout toolbar={toolbar} children={content}></AuthLayout>;
};

export default MembershipsPage;
