import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../../context/AuthContext"


export default function UserInfo () {
    const { userInfo } = useAuth();

    return (
        <div className='flex-col bg-gray-50 justify-center text-center text-gray-500 pb-3'>
            <div className=" mx-auto text-center pt-4 rounded-full mb-2">
                <FontAwesomeIcon className="lg:text-3xl text-xl" icon={faUser} />
            </div>
            <p className="font-bold lg:text-sm text-xl mb-2">
                {/* {user?.name} */}
                {userInfo && userInfo.email}
            </p>
            <p className="lg:text-sm text-xs font-bold">
                {/* @{user.username} */}
                {userInfo && userInfo.name}
            </p>
        </div>

    )
}
