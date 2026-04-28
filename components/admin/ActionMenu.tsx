"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

interface ActionMenuProps {
  editUrl: string;
  onDelete: () => void;
}

export default function ActionMenu({ editUrl, onDelete }: ActionMenuProps) {
  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <Menu.Button className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all active:scale-90 flex items-center justify-center">
          <MoreHorizontal size={20} strokeWidth={2.5} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95 translate-y-[-10px]"
          enterTo="transform opacity-100 scale-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100 scale-100 translate-y-0"
          leaveTo="transform opacity-0 scale-95 translate-y-[-10px]"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-50 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 focus:outline-none z-[100] overflow-hidden">
            <div className="p-1.5">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={editUrl}
                    className={`${
                      active ? "bg-gray-50 text-black" : "text-gray-600"
                    } group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all`}
                  >
                    <Edit2 size={18} className={`${active ? "text-secondary" : "text-gray-400"} transition-colors`} />
                    Edit Details
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="p-1.5">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={`${
                      active ? "bg-red-50 text-red-600" : "text-gray-600"
                    } group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all`}
                  >
                    <Trash2 size={18} className={`${active ? "text-red-500" : "text-gray-400"} transition-colors`} />
                    Delete Item
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
