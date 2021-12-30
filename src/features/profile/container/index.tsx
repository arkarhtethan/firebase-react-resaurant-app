import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Header from '../../../shared/Header'
import Sidebar from '../components/SideBar'
import AccountDelete from './AccountDelete'
import EditRestaurant from './restaurant/EditRestaurant'
import Menu from './restaurant/Menu'

const ProfileIndex = () => {
    const { currentUser } = useAuth();

    const { pathname } = useLocation();

    if (!currentUser) {
        return <Navigate to="/auth/login" state={{ redirectUrl: pathname }} />
    }

    return (
        <div className="lg:p-5 lg:m-10 my-4 h-auto">
            <div className="flex flex-col lg:flex-row lg:space-x-5">
                <Header title="Profile" description={"Profile details about yourself."} />
                <div className="lg:w-1/5 w-full lg:mb-0 mb-4">
                    <Sidebar />
                </div>
                <div className="lg:w-4/5 w-full shadow-lg bg-white h-auto">
                    <Routes>
                        <Route path="/" element={<EditRestaurant />} />
                        <Route path="edit-restaurant" element={<EditRestaurant />} />
                        <Route path="account" element={<AccountDelete />} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ProfileIndex
