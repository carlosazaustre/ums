import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import CardComponent from "../components/CardComponent";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  // Fetch all users

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create a new user
  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  // update user
  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });

      const updatedUsers = users.map((user) => {
        if (user.id === parseInt(updateUser.id)) {
          return { ...user, name: updateUser.name, email: updateUser.email };
        }
        return user;
      });

      setUsers(updatedUsers);
      setUpdateUser({ id: "", name: "", email: "" });
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  // delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <Card className="m-4 max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Management</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Create user form */}
        <div className="flex justify-between mb-4 ">
          <form onSubmit={createUser} className="flex space-x-2">
            <Input
              placeholder="name"
              className=""
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="email"
              className="max-w-sm"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </form>
        </div>

        {/* Update user form */}
        <div className="flex justify-between mb-4 p-2 bg-blue-300">
          <form onSubmit={handleUpdateUser} className="flex space-x-2">
            <Input
              placeholder="id"
              className="bg-white"
              value={updateUser.id}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, id: e.target.value })
              }
            />
            <Input
              placeholder="name"
              className="bg-white"
              value={updateUser.name}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, name: e.target.value })
              }
            />
            <Input
              placeholder="email"
              className="bg-white"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Update
            </Button>
          </form>
        </div>

        {/* List users */}
        <div className="space-y-4">
          {users?.map((user) => (
            <CardComponent
              key={user.id}
              card={user}
              onDelete={() => handleDeleteUser(user.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
