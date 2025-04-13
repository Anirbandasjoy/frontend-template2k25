"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AtSign,
  CircleArrowOutDownRight,
  Ellipsis,
  Trash2,
  User,
} from "lucide-react";
import { PaginationGlobal } from "./pagination";
import { useGetAllUserQuery } from "@/redux/features/users/userApi";
import Heading from "../shared/Heading";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

const UserTable = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { data, refetch } = useGetAllUserQuery({
    page: 1,
    limit: 10,
    search: searchText,
  });
  const users = data?.payload?.users || [];
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const allSelected = selectedUsers.length === users.length;
  const searchRef = useRef<HTMLInputElement>(null);
  console.log({ selectedUsers });
  const handleSelectAll = () => {
    setSelectedUsers(allSelected ? [] : users.map((user: User) => user._id));
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleDeleteUser = () => {
    toast.success("User deleted successfully");
  };

  const handleSearch = () => {
    const trimmedValue = searchRef.current?.value.trim() || "";

    toast.success(`Searching for "${searchText == "" ? "all" : searchText}"`);
    setSearchText(trimmedValue);
    refetch();
  };

  useEffect(() => {
    if (searchText === "") {
      refetch();
    }
  }, [searchText]);

  return (
    <div>
      <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
        <Heading
          title="Manage User"
          subTitle="Manage Your all users. you are delete user banned user .you need delete all users"
        />
        <div className="flex items-center gap-10">
          <div className="flex gap-2">
            <Input
              ref={searchRef}
              className="rounded-xs"
              placeholder="Enter query"
            />
            <Button
              onClick={handleSearch}
              className="rounded-xs cursor-pointer"
            >
              Search
            </Button>
          </div>
          <Button
            onClick={handleDeleteUser}
            className="cursor-pointer flex items-center gap-1 rounded-sm bg-transparent border text-gray-700 hover:bg-gray-100"
          >
            <Trash2 className="" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
      <Table className="max-h-[calc(100vh-15rem)] max-h border-r border-t border-l border-b border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px] ">
              <Checkbox
                className="mb-2"
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user._id} className="hover:bg-gray-100 py-20">
              <TableCell className="font-medium">
                <Checkbox
                  checked={selectedUsers.includes(user?._id)}
                  onCheckedChange={() => handleSelectUser(user._id)}
                />
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-emerald-600" />
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-2">
                  <AtSign size={16} className="text-blue-500" />
                  <span>{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CircleArrowOutDownRight
                    className={
                      user?.role === "admin"
                        ? "text-amber-400"
                        : "text-purple-500"
                    }
                    size={16}
                  />
                  <span>
                    {user?.role === "admin" ? (
                      <p className="bg-amber-400 px-2 py-1 text-white cursor-pointer rounded-sm">
                        {user.role}
                      </p>
                    ) : (
                      user?.role
                    )}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Ellipsis className="text-right ml-auto cursor-pointer text-red-900" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-3 flex sm:items-center items-center gap-4 sm:gap-0 flex-col sm:flex-row sm:justify-between ">
        <div className="flex-1 text-sm text-muted-foreground text-nowrap">
          {selectedUsers.length} of {users.length} users selected
        </div>

        <PaginationGlobal className="sm:justify-end justify-center" />
      </div>
    </div>
  );
};

export default UserTable;
