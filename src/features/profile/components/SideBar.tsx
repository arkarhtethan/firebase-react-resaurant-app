import {
    faCaretUp,
    faCaretDown,
    faReply,
    faUserEdit,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../../context/AuthContext";
import SidebarNavItem from "./sidebarNavItem";
import UserInfo from "./UserInfo";

export default function Sidebar () {
    const [showNav, setShowNav] = useState(true);
    const { logoutUser } = useAuth();


    const isDesktop = useMediaQuery({
        query: "(min-width: 1024px)",
    });


    useEffect(() => {
        if (!isDesktop && showNav) {
            setShowNav(false);
        } else if (isDesktop) {
            setShowNav(true);
        }
    }, [isDesktop]);

    const logoutHandler = () => {
        if (logoutUser) {
            logoutUser();
        }
    };

    return (
        <>
            <div className="bg-white shadow-lg mb-5 lg:shadow-none">
                <UserInfo />
            </div>
            <div
                onClick={() => setShowNav(!showNav)}
                className="bg-white py-3 px-3 shadow-lg text-gray-500 font-bold items-center justify-between cursor-pointer flex lg:hidden"
            >
                <p>Navigations</p>
                <FontAwesomeIcon icon={showNav ? faCaretUp : faCaretDown} />
            </div>
            <div
                className={`${showNav ? "block" : "hidden"
                    } flex-col lg:space-y-2 shadow-md`}
            >
                <div className="bg-gray-100 lg:mt-2 shadow-lg">
                    <SidebarNavItem
                        url="/profile/edit-restaurant"
                        icon={faUserEdit}
                        title={"Edit Restaurant"}
                    />
                    <SidebarNavItem
                        url="/profile/menu"
                        icon={faUtensils}
                        title={"Menu"}
                    />
                    {/* <SidebarNavItem
                        url="/profile/account"
                        icon={faUserCog}
                        title={"Account"}
                    /> */}
                </div>
                <div className="bg-gray-100 lg:mt-2 shadow-lg" onClick={logoutHandler}>
                    <SidebarNavItem url="/" icon={faReply} title={"Log Out"} />
                </div>
            </div>
        </>
    );
}
