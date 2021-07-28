import { CurrentUserAvatar } from "components/shared/Avatar/CurrentUserAvatar";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/solid";
import { useAuth } from "providers/AuthProvider";
export interface AvatarMenuProps {}

export const AvatarMenu: React.FC<AvatarMenuProps> = () => {
  const { signOut } = useAuth();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className={"flex"}>
        <Menu.Button
          className={
            "rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 focus-visible:ring-white"
          }
        >
          <CurrentUserAvatar />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter={"transition ease-out duration-100"}
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <button
                className={
                  "flex items-center w-full p-2 text-sm text-gray-700 hover:bg-smoke-lightest uppercase font-semibold"
                }
                onClick={() => signOut()}
              >
                <LogoutIcon width={20} className={"text-gray-500 mr-2"} />
                Sign Out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
