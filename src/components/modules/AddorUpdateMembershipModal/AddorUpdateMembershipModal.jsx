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
  InputGroup,
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
import { dateAddition, isTrue, isFalse } from "../../../utils/valueUtils";

const AddorUpdateMembershipModal = ({ isOpen, onOpen, onClose, data }) => {
  const { customers } = useContext(CustomerContext);
  const mode = data ? "update" : "create";
  const initialState = {
    customerId: mode === "create" ? "" : data.customerId,
    beginDate: mode === "create" ? new Date() : new Date(data.beginDate),
    duation: mode === "create" ? 0 : data.duration,
    endDate: mode === "create" ? new Date() : data.endDate,
    payment: mode === "create" ? null : data.payment,
  };

  const { updateMembership, addMembership } = useContext(MembershipContext);
  const [recordDate, setRecordDate] = useState(initialState.beginDate);
  const [customerId, setCustomerId] = useState(initialState.customerId);
  const [duration, setDuration] = useState(initialState.duation);
  const [payment, setPayment] = useState(initialState.payment);

  const toast = useToast();

  const close = () => {
    setRecordDate(initialState.beginDate);
    setCustomerId(initialState.customerId);
    setDuration(initialState.duation);
    setPayment(initialState.payment);
    onClose(true);
  };

  const submitMembership = () => {
    if (!recordDate || !customerId || !duration || payment === null) {
      const badRequestToast =
        mode === "create"
          ? {
              title: "Üyelik Oluşturulamadı.",
              description: "Tüm alanlar doldurulmalıdır.",
              status: "error",
              duration: 3000,
              isClosable: true,
            }
          : {
              title: "Üyelik güncellenemedi.",
              description: "Tüm alanlar doldurulmalıdır.",
              status: "error",
              duration: 3000,
              isClosable: true,
            };
      toast(badRequestToast);
      return;
    }
    const createMembershipPromise = createMembership();
    const successToast =
      mode === "create"
        ? {
            title: "Üyelik Oluşturuldu.",
            status: "success",
            duration: 3000,
            isClosable: true,
            onClose: isOpen && close,
          }
        : {
            title: "Üyelik Güncellendi.",
            status: "success",
            duration: 3000,
            isClosable: true,
            onClose: isOpen && close,
          };
    const pendingToast =
      mode === "create"
        ? {
            title: "Üyelik oluşturuluyor...",
            status: "info",
          }
        : {
            title: "Üyelik güncelleniyor...",
            status: "info",
          };
    const failToast =
      mode === "create"
        ? {
            title: "Üyelik oluşturulamadı.",
            description: `Sunucu yanıt vermiyor olabilir.`,
            status: "error",
          }
        : {
            title: "Üyelik güncellenemedi.",
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
      const response =
        mode === "create"
          ? await client.post("memberships", newMemberships)
          : await client.put(`memberships/${data.id}`, newMemberships);
      mode === "create"
        ? addMembership(response.data)
        : updateMembership(data.id, response.data);
      close();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {mode === "create" ? "Yeni Üyelik" : "Güncelle"}
        </ModalHeader>
        <ModalCloseButton onClick={close} />
        <ModalBody>
          <form>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <Select
                  value={customerId}
                  icon={<IoPersonCircleSharp />}
                  placeholder="Müşteri Seçiniz"
                  onChange={(event) => setCustomerId(event.currentTarget.value)}
                >
                  {customers.map((customer) => (
                    <option
                      selected={customerId === customer.id}
                      value={customer.id}
                    >
                      {customer.name}
                    </option>
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
                  <option selected={isTrue(payment)} value={true}>
                    Alındı
                  </option>
                  <option selected={isFalse(payment)} value={false}>
                    Alınmadı
                  </option>
                </Select>
              </Box>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={close}>
            İptal
          </Button>
          <Button colorScheme="red" onClick={submitMembership}>
            {mode === "create" ? "Ekle" : "Güncelle"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddorUpdateMembershipModal;
