import {HeaderEmployedProfile} from '@/components/component/header-employed-profile'
import Header from '@/components/Header'
import ScoreGraphEmployed from '@/components/component/score-graph-employed'
import { EmployeeReviewsContainer } from '@/components/component/employee-reviews-container'
import { ExternalFooter } from '@/components/component/external-footer';


const page = () => {
  return (
    <>
    <Header />
    <HeaderEmployedProfile />
    <ScoreGraphEmployed />
    <EmployeeReviewsContainer />
    <ExternalFooter />
    </>
  )
}

export default page 