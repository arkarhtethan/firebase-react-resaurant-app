import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type jsxType = JSX.IntrinsicElements[keyof JSX.IntrinsicElements]

interface IModalProps {
    show: boolean;
    icon: any;
    title: string;
    description: string;
    actions: jsxType,
}

export default function CustomModal ({ show, icon, title, description, actions }: IModalProps) {
    console.log(show)
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? "block" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex self-center items-center justify-center h-24 w-24 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                <FontAwesomeIcon icon={icon} />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"> */}
                    {actions}
                    {/* */}

                </div>
            </div>
        </div>
    )
}
