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
        <Menu.Button className="p-3 text-gray-400 hover:text-black hover:bg-gray-100 rounded-2xl transition-all shadow-sm active:scale-95">
          <MoreHorizontal size={24} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-50 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 focus:outline-none z-50">
            <div className="px-2 py-2">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={editUrl}
                    className={`${
                      active ? "bg-gray-50 text-black" : "text-gray-500"
                    } group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors`}
                  >
                    <Edit2 size={18} className={`${active ? "text-secondary" : "text-gray-400"}`} />
                    Edit Details
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={`${
                      active ? "bg-red-50 text-red-600" : "text-gray-500"
                    } group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors`}
                  >
                    <Trash2 size={18} className={`${active ? "text-red-500" : "text-gray-400"}`} />
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
