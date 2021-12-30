import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SolidButton } from "../../../shared/button";
import Header from "../../../shared/Header";
import Modal from "../../../shared/Modal";

export default function AccountDelete () {

    const confirmDelete = () => {
        setShowModal(true);
    }

    const deleteAccount = () => {
        setShowModal(false);
    }

    const [showModal, setShowModal] = useState(false);

    return (
        <div id="accountPanel" className="lg:px-10 px-4 py-5 text-gray-900">
            <Header title="Account" description="Your account details." />
            <h3 className="lg:text-2xl text-lg mb-4 font-bold">Account Settings</h3>
            <hr className="border-black" />
            <div className="lg:mt-8 mt-3">
                <h5 className="lg:mb-3 mb-2 lg:text-xl text-lg">
                    Delete your account
                </h5>
                <p className="mb-3 text-sm">Once you delete your account, there is no going back.</p>
                <SolidButton text="Delete" onClick={confirmDelete} classes="px-10 focus:outline-none" />
            </div>
            <Modal
                onCancel={() => setShowModal(false)}
                show={showModal}
                onClick={deleteAccount}
                icon={faExclamationTriangle}
                title={"Delete account"}
                description={"Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."} />
        </div>

    )
}
