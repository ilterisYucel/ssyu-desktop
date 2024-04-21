import React, { useContext } from "react";
import { SimpleGrid, Box, Center } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Pie, Line, Radar, Bar } from "react-chartjs-2";

import { AuthLayout } from "../../layouts/index.js";
import { CustomerContext, MembershipContext } from "../../../context/index.js";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
const ChartGrid = ({ chart1, chart2, chart3, chart4 }) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }}>
      <Center>
        <Box padding={16}>{chart1}</Box>
      </Center>
      <Center>
        <Box padding={16}>{chart2}</Box>
      </Center>
      <Center>
        <Box padding={16}>{chart3}</Box>
      </Center>
      <Center>
        <Box padding={16}>{chart4}</Box>
      </Center>
    </SimpleGrid>
  );
};
const DashboardPage = () => {
  const { getCustomers, customers } = useContext(CustomerContext);
  const { getMemberships, memberships } = useContext(MembershipContext);

  const manCount = getCustomers().filter(
    (customer) => customer.gender.toLowerCase() === "e"
  ).length;
  const womanCount = getCustomers().filter(
    (customer) => customer.gender.toLowerCase() === "k"
  ).length;

  const chart1Data = {
    labels: ["Kadın", "Erkek"],
    datasets: [
      {
        label: "Müşterilerin Cinsiyet Dağılımı",
        data: [womanCount, manCount],
        backgroundColor: ["red", "blue"],
        borderWidth: 1,
      },
    ],
  };

  const chart2Data = {
    labels: ["Pasif", "Aktif"],
    datasets: [
      {
        label: "Aktif Pasif Üyeler",
        data: [1, 1],
        backgroundColor: ["green", "red"],
        borderWidth: 1,
      },
    ],
  };

  const chart3Data = {
    labels: ["03/2024", "04/2024", "05/2024", "06/2024", "06/2024"],
    datasets: [
      {
        label: "Aylara göre Kadın Üyelikleri",
        backgroundColor: "rgba(255, 0, 0 ,0.4)",
        data: [1, 0, 3, 5, 10],
      },
      {
        label: "Aylara göre Erkek Üyelikleri",
        backgroundColor: "rgba(0, 0, 255 ,0.4)",
        data: [6, 3, 2, 2, 1],
      },
    ],
  };

  const chart4Data = {
    labels: ["İlteris", "Yağmur", "Kaju"],
    datasets: [
      {
        label: "Müşteri Sadakati",
        data: [8, 16, 18],
        backgroundColor: [
          "rgba(0, 255, 0 ,0.4)",
          "rgba(255, 0, 0 ,0.4)",
          "rgba(0, 0, 255 ,0.4)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chart1 = <Pie data={chart1Data} />;
  const chart2 = <Pie data={chart2Data} />;
  const chart3 = <Radar data={chart3Data} />;
  const chart4 = <Bar data={chart4Data} />;

  const content = (
    <ChartGrid
      chart1={chart1}
      chart2={chart2}
      chart3={chart3}
      chart4={chart4}
    />
  );

  return <AuthLayout children={content}></AuthLayout>;
};

export default DashboardPage;
