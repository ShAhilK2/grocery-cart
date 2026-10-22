import CheckoutPageComponent from "@/components/checkout/CheckoutPageComponent";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import { getAddresses } from "@/server-actions/user/getAddresses";


export const dynamic = "force-dynamic"

export default async function CheckoutPage() {

  const result = await getAddresses()

  const addresses = result.success ?  result.addresses : []
  return (
   <FrontendLayout>
    <CheckoutPageComponent addresses={addresses}/>
   </FrontendLayout>
  )
}
