import React, { useState, useContext } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  ModalBody,
  Input,
  InputLeftAddon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Select,
  FormControl,
  useToast,
  InputRightAddon,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdPayments } from "react-icons/md";

import { CustomerContext, MembershipContext } from "../../../context";
import { client } from "../../../utils/requestUtils";
import { dateAddition } from "../../../utils/valueUtils";

const AddMembershipModal = ({ isOpen, onOpen, onClose }) => {
  const { customers } = useContext(CustomerContext);
  const { addMembership } = useContext(MembershipContext);
  const [recordDate, setRecordDate] = useState(new Date());
  const [customerId, setCustomerId] = useState("");
  const [duration, setDuration] = useState(0);
  const [payment, setPayment] = useState(null);

  const toast = useToast();

  const closeModal = () => {
    setRecordDate(null);
    setCustomerId(null);
    setDuration(null);
    setPayment(null);
  };

  const submitMembership = () => {
    if (!recordDate || !customerId || !duration || payment === null) {
      toast({
        title: "Üyelik Oluşturulamadı.",
        description: "Tüm alanlar doldurulmalıdır.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const createMembershipPromise = createMembership();
    const successToast = {
      title: "Üyelik Oluşturuldu.",
      status: "success",
      duration: 3000,
      isClosable: true,
    };
    const pendingToast = {
      title: "Üyelik oluşturuluyor...",
      status: "info",
    };
    const failToast = {
      title: "Üyelik oluşturulamadı.",
      description: `Sunucu yanıt vermiyor olabilir.`,
      status: "error",
    };
    toast.promise(createMembershipPromise, {
      success: successToast,
      error: failToast,
      loading: pendingToast,
    });
  };

  const createMembership = async () => {
    try {
      const newMemberships = {
        beginDate: recordDate,
        customerId,
        duration,
        payment,
        endDate: dateAddition(new Date(recordDate), duration),
      };
      const response = await client.post("memberships", newMemberships);
      addMembership(response.data);
      onClose(true);
      closeModal();
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Yeni Üyelik</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <Select
                  icon={<IoPersonCircleSharp />}
                  placeholder="Müşteri Seçiniz"
                  onChange={(event) => setCustomerId(event.currentTarget.value)}
                >
                  {customers.map((customer) => (
                    <option value={customer.id}>{customer.name}</option>
                  ))}
                </Select>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <SingleDatepicker
                  configs={{ dateFormat: "dd/MM/yyyy" }}
                  propsConfigs={{
                    triggerBtnProps: {
                      w: "100%",
                    },
                  }}
                  name="date-input"
                  date={recordDate}
                  onDateChange={setRecordDate}
                />
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <InputGroup w="100%">
                  <NumberInput
                    w="100%"
                    defaultValue={duration}
                    min={0}
                    max={100}
                    onChange={(valueAsString, valueAsNumber) =>
                      setDuration(valueAsNumber)
                    }
                  >
                    <NumberInputField borderLeftRadius={0} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon>Ay</InputRightAddon>
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <Select
                  icon={<MdPayments />}
                  placeholder="Ödeme alındı mı"
                  onChange={(event) => setPayment(event.currentTarget.value)}
                >
                  <option value={true}>Alındı</option>
                  <option value={false}>Alınmadı</option>
                </Select>
              </Box>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            İptal
          </Button>
          <Button colorScheme="red" onClick={submitMembership}>
            Ekle
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMembershipModal;
