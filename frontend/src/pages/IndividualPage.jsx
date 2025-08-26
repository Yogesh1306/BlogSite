import IndividualPost from "../components/individualPost/IndividualPost"
import Sidebar from "../components/sidebar/Sidebar"

const IndividualPage = () => {
  return (
    <div className="flex">
        <IndividualPost/>
        <Sidebar/>
    </div>
  )
}

export default IndividualPage
