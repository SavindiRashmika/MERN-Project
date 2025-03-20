import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div class="mt-8 mx-20 shadow-lg rounded-lg overflow-hidden bg-white px-12">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className='py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-3'>Sr.</th>
                        <th className='py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-3'>Name</th>
                        <th className='py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-3'>Email</th>
                        <th className='py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-3'>Role</th>
                        <th className='py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-3'>Created Date</th>
                        <th className='py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-3'>Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        allUser.map((el,index) => {
                            return(
                                <tr key={el.id} className=" transition duration-300 even:bg-gray-50">
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3'>{index+1}</td>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3'>{el?.name}</td>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3'>{el?.email}</td>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3'>{el?.role}</td>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3'>{moment(el?.createdAt).format('LL')}</td>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-3'>
                                        <button className='p-2 rounded-full cursor-pointer hover:bg-green-400 text-xl hover:text-white' 
                                        onClick={()=>{
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)

                                        }}
                                        >
                                            <MdModeEdit/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole 
                        onClose={()=>setOpenUpdateRole(false)} 
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )      
            }
      </div>
    </div>
  )
}

export default AllUsers