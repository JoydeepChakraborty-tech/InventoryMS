import React, {useContext, useState} from 'react';
import CustomerDetailsForm from './CustomerDetailsForm';
import CustomerDataComponent from './CustomerDataComponent';
import {AuthenticatedUserContext} from './componentStates/LoggedInUserState';
import {Alert, AlertDescription, AlertIcon, CloseButton} from "@chakra-ui/core";

export default function ContentArea(props) {

    const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);
    const [isCustomerEditAction, setIsCustomerEditAction] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContentDetails, setAlertContentDetails] = useState({success: false, message: ''});
    const [reloadCustomerTable, setReloadCustomerTable] = useState(false);

    const {loggedInUserDetails} = useContext(AuthenticatedUserContext);

    const showAlert = (success, message) => {
        setAlertVisible(true);
        setAlertContentDetails({success, message});
    };
    /**
     * Initiate Edit Action. This set of statements should be executed before mounting CustomerFormDetails section
     */
    const initiateEditAction = () => {
        setIsCustomerEditAction(true);
        setShowCustomerDetailsModal(true);
    };

    const dismissAlert = () => setAlertVisible(false);
    return (
        <div className="w-2/3 justify-center">
            <div>
                <h1 className="text-2xl font-medium text-blue-600">Welcome {loggedInUserDetails.userName}</h1>
                {alertVisible &&
                <Alert status={`${alertContentDetails.success ? "success" : "error"}`}>
                    <AlertIcon/>
                    <AlertDescription mr={2}>{alertContentDetails.message}</AlertDescription>
                    <CloseButton position="absolute" color={"red.400"}/>
                </Alert>
                }
            </div>

            {showCustomerDetailsModal &&
            <div><CustomerDetailsForm showSaveAlert={showAlert}
                                      reloadCustomerTable={() => setReloadCustomerTable(!reloadCustomerTable)}
                                      isEditAction={[isCustomerEditAction, setIsCustomerEditAction]}
                                      setShowCustomerDetailsModal={setShowCustomerDetailsModal}/>
            </div>}

            <div className="flex justify-end shrink-0">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => setShowCustomerDetailsModal(true)}>Add Customer
                </button>
            </div>
            <CustomerDataComponent displayAlert={showAlert} initiateEditAction={initiateEditAction}
                                   shouldReload={reloadCustomerTable}/>
        </div>
    )
}

