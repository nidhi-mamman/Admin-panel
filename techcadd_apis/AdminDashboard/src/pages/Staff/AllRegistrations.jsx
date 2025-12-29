import { useEffect,useContext } from "react"
import {context} from '../../context/Authprovider'
const AllRegistrations = () => {
    const { token } = useContext(context);
    useEffect(async () => {
        const response = await fetch("http://localhost:8000/api/staff/branch/registrations/", {
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

export default AllRegistrations