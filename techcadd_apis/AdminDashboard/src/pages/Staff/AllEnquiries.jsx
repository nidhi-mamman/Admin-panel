import { useEffect,useContext } from "react"
import {context} from '../../context/Authprovider'
const AllEnquiries = () => {
    const { token } = useContext(context);
    useEffect(async () => {
        const response = await fetch("http://localhost:8000/api/staff/branch/enquiries/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response",response)
    })
    return (
        <></>
    )
}

export default AllEnquiries