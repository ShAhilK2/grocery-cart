import React, { useState } from 'react'
import AddAddressModal from './AddressModal';
import { addressProps } from './CheckoutPageComponent';
import DeleteAddressButton from './DeleteAddressButton';

interface DeliveryAddressProps {
  addresses: addressProps[];
  selectedAddress: addressProps | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<addressProps | null>>;
}

const DeliveryAddress = ({addresses, selectedAddress, setSelectedAddress} : DeliveryAddressProps) => {
      const [showAddress, setShowAddress] = useState(false);
     const [showAddressModal, setShowAddressModal] = useState(false);

  return (
         <div>
            <AddAddressModal
  isOpen={showAddressModal}
  onClose={() => setShowAddressModal(false)}
/>
          <p className="text-sm font-medium uppercase text-text">
            Delivery Address
          </p>

          <div className="relative mt-2 flex items-start justify-between gap-3">
    

    {selectedAddress ? (
         <p>
  {selectedAddress.street} {selectedAddress.city} {" "}
                  {selectedAddress.state} 
                  </p>
    ) : (<p>
      No address found
    </p>)}
            <button
              type="button"
              onClick={() => setShowAddress((prev) => !prev)}
              className="cursor-pointer text-sm font-medium text-primary hover:underline"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute right-0 top-8 z-20 w-full overflow-hidden rounded-lg border border-border bg-white shadow-lg">
              {addresses.length > 0 ?
            ( addresses.map((address)=>(
         <div key={address.id} className="flex items-center justify-between gap-3 border border-border">
                 <button
                  type="button"
                  key={address.id}
                  onClick={() => 
                    {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }
                  }
                  className="block w-full cursor-pointer p-3 text-left text-sm text-muted transition hover:bg-background"
                >
                  <p>
  {address.street} {address.city} {" "}
                  {address.state} 
                  </p>

                  {address.id === selectedAddress?.id && (
                    <span className="mt-1 block text-xs font-medium text-primary">Selected</span>
                  )}
                  

                </button>
                <DeleteAddressButton addressId={address.id} />
         </div>
              ))
             ): (
                   <p className="text-sm text-muted p-4 text-center">
              No address found
            </p>
                ) }

                <button
                  type="button"
                   onClick={() => setShowAddressModal(true)}
                  className="block w-full cursor-pointer border-t border-border p-3 text-center text-sm font-medium text-primary transition hover:bg-primary-light"
                >
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        </div>
  )
}

export default DeliveryAddress