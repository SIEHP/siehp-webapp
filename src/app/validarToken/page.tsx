import MakeTokenValidationPage from "@/modules/user/infra/factories/pages/MakeTokenValidationPage";
import MakeTokenValidationPageLayout from "@/shared/infra/factories/layouts/MakeAuthenticationPageLayout";

export default function AuthenticationPage() {
  return(
    <>
    <MakeTokenValidationPageLayout>
     <MakeTokenValidationPage/>
    </MakeTokenValidationPageLayout>
    </>
  ) 
  
  
}
