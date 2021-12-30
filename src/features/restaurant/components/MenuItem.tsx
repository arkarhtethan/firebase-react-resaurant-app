import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IMenu } from "../../../services/menu"

interface IMenuItemProps {
    menu: IMenu;
    showAction?: boolean;
    deleteHandler?: () => void;
    updateHandler?: () => void;
}

const MenuItem = ({ menu, showAction = false, deleteHandler, updateHandler }: IMenuItemProps) => {

    return (
        <div className="px-2 py-2">
            <div className="flex shadow-xl bg-white space-x-4 rounded-lg overflow-hidden h-28">
                <img src={menu.image} className="lg:w-2/5 w-1/2 h-26" alt={menu.name} />
                <div className="flex flex-col space-y-2 justify-center w-full py-2">
                    {showAction && <div className="text-sm flex space-x-2 justify-end pt-2 pr-2 items-center w-full">
                        <FontAwesomeIcon className="cursor-pointer" icon={faTrash} size="sm" onClick={deleteHandler} />
                        <FontAwesomeIcon className="cursor-pointer" icon={faPencilAlt} size="sm" onClick={updateHandler} />
                    </div>}
                    <p className="text-gray-500 font-bold  text-sm">{menu.name}</p>
                    <p className="text-gray-600 text-sm">$ {menu.price}</p>
                </div>
            </div>
        </div>
    )
}

export default MenuItem
