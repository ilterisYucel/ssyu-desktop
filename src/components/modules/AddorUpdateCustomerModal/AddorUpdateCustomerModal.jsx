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
  Box,
  Select,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FaPhone } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

import { CustomerContext } from "../../../context";
import { client } from "../../../utils/requestUtils";

const AddorUpdateCustomerModal = ({ isOpen, onOpen, onClose, data }) => {
  const mode = data ? "update" : "create";
  const initialState = {
    name: mode === "create" ? "" : data.name,
    phone: mode === "create" ? "" : data.phone,
    email: mode === "create" ? "" : data.email,
    gender: mode === "create" ? "" : data.gender,
    registrationDate: "create" ? new Date() : data.registrationDate,
  };
  const { addCustomer, updateCustomer } = useContext(CustomerContext);
  const [name, setName] = useState(initialState.name);
  const [phone, setPhone] = useState(initialState.phone);
  const [email, setEmail] = useState(initialState.email);
  const [gender, setGender] = useState(initialState.gender);
  const [registrationDate, setRegistrationDate] = useState(
    initialState.registrationDate
  );

  const toast = useToast();
  const close = () => {
    setName(initialState.name);
    setPhone(initialState.phone);
    setEmail(initialState.email);
    setGender(initialState.gender);
    setRegistrationDate(initialState.registrationDate);
    onClose(true);
  };

  const submitCustomer = () => {
    const badRequestToast =
      mode === "create"
        ? {
            title: "Müşteri Oluşturulamadı.",
            description:
              "İsim, telefon, cinsiyet ve kayıt zamanı zorunlu alandır.",
            status: "error",
            duration: 3000,
            isClosable: true,
          }
        : {
            title: "Müşteri güncellenemedi.",
            description:
              "İsim, telefon, cinsiyet ve kayıt zamanı zorunlu alandır.",
            status: "error",
            duration: 3000,
            isClosable: true,
          };
    if (!name || !phone || !gender || !registrationDate) {
      toast(badRequestToast);
      return;
    }
    const createCustomerPromise = createCustomer();
    const successToast =
      mode === "create"
        ? {
            title: "Müşteri Oluşturuldu.",
            description: `${name} isimli müşteri oluşturuldu.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            onClose: isOpen && close,
          }
        : {
            title: "Müşteri Güncellendi.",
            description: `${name} ismiyle müşteri güncellendi.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            onClose: isOpen && close,
          };
    const pendingToast =
      mode === "create"
        ? {
            title: "Müşteri oluşturuluyor",
            description: `${name} isimli müşteri oluşturuluyor...`,
            status: "info",
          }
        : {
            title: "Müşteri güncelleniyor",
            description: `${name} isimiyle müşteri güncellendi...`,
            status: "info",
          };
    const failToast =
      mode === "create"
        ? {
            title: "Müşteri oluşturulamadı.",
            description: `Sunucu yanıt vermiyor olabilir.`,
            status: "error",
          }
        : {
            title: "Müşteri güncellenemedi.",
            description: `Sunucu yanıt vermiyor olabilir.`,
            status: "error",
          };
    toast.promise(createCustomerPromise, {
      success: successToast,
      error: failToast,
      loading: pendingToast,
    });
  };

  const createCustomer = async () => {
    try {
      const newCustomer = {
        name,
        phone,
        email,
        gender,
        registrationDate,
      };
      const response =
        mode === "create"
          ? await client.post("customers", newCustomer)
          : await client.put(`customers/${data.id}`, newCustomer);
      mode === "create"
        ? addCustomer(response.data)
        : updateCustomer(data.id, response.data);
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
          {mode === "create" ? "Yeni Müşteri" : "Müşteri Güncelle"}
        </ModalHeader>
        <ModalCloseButton onClick={close} />
        <ModalBody>
          <form>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <IoPersonCircleSharp />
                  </InputLeftElement>
                  <Input
                    value={name}
                    variant="outline"
                    placeholder="Müşteri İsmi"
                    onInput={(event) => setName(event.currentTarget.value)}
                  />
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <InputGroup>
                  <InputLeftAddon>+90</InputLeftAddon>
                  <Input
                    value={phone}
                    type="tel"
                    variant="outline"
                    placeholder="Müşteri Telefon Numarası"
                    onInput={(event) => setPhone(event.currentTarget.value)}
                  />
                  <InputRightElement pointerEvents="none">
                    <FaPhone />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl>
              <Box paddingBottom={4}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdEmail />
                  </InputLeftElement>
                  <Input
                    value={email}
                    variant="outline"
                    type="mail"
                    placeholder="Müşteri Eposta Adresi"
                    onInput={(event) => setEmail(event.currentTarget.value)}
                  />
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <Select
                  value={gender}
                  icon={<FaTransgender />}
                  placeholder="Müşteri Cinsiyeti"
                  onChange={(event) => setGender(event.currentTarget.value)}
                >
                  <option selected={gender === "K"} value="K">
                    Kadın
                  </option>
                  <option selected={gender === "E"} value="E">
                    Erkek
                  </option>
                </Select>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box>
                <SingleDatepicker
                  configs={{ dateFormat: "dd/MM/yyyy" }}
                  propsConfigs={{
                    triggerBtnProps: {
                      w: "100%",
                    },
                  }}
                  name="date-input"
                  date={registrationDate}
                  onDateChange={setRegistrationDate}
                />
              </Box>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={close}>
            İptal
          </Button>
          <Button colorScheme="red" onClick={submitCustomer}>
            {mode === "create" ? "Ekle" : "Güncelle"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddorUpdateCustomerModal;
