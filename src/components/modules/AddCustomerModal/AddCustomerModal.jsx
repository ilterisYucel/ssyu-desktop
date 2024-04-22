import React, { useState, useContext } from "react"
import { Modal, ModalCloseButton, 
  ModalContent, ModalHeader, 
  ModalOverlay, ModalFooter, 
  Button, ModalBody, 
  Input, InputLeftAddon, 
  InputGroup, InputLeftElement, 
  InputRightElement, Box, Flex,
  Icon, Select } from "@chakra-ui/react"
  import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FaPhone } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";




import { CustomerContext } from "../../../context";
import { dateFormat } from "../../../utils/valueUtils";

const AddCustomerModal = ({isOpen, onOpen, onClose}) => {
  const {addCustomer} = useContext(CustomerContext); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [registrationDate, setRegistrationDate] = useState(new Date());
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Yeni Müşteri</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box paddingBottom={4}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <IoPersonCircleSharp />
                </InputLeftElement>
                <Input variant='outline' placeholder='Müşteri İsmi' onInput={setName}/>
              </InputGroup>
            </Box>
            <Box paddingBottom={4}>
              <InputGroup>
                <InputLeftAddon>+90</InputLeftAddon>
                <Input type='tel' variant="outline" placeholder='Müşteri Telefon Numarası' onInput={setPhone} />
                <InputRightElement pointerEvents='none'>
                  <FaPhone />
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box paddingBottom={4}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <MdEmail />
                </InputLeftElement>
                <Input variant='outline' type="mail" placeholder='Müşteri Eposta Adresi' onInput={setEmail}/>
              </InputGroup>
            </Box>
            <Box paddingBottom={4}>
              <Select icon={<FaTransgender />} placeholder='Müşteri Cinsiyeti' onInput={setGender}>
                <option value='K'>Kadın</option>
                <option value='E'>Erkek</option>
              </Select>
            </Box>
            <Box>
              <SingleDatepicker
                configs={{dateFormat: 'dd/MM/yyyy'}}
                propsConfigs={{
                triggerBtnProps: {
                w: "100%",
                }}}
                name="date-input"
                date={registrationDate}
                onDateChange={setRegistrationDate}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
              İptal
            </Button>
            <Button variant='ghost'>Ekle</Button>
          </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddCustomerModal;