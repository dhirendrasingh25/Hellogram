import { userProps } from "@/types";

export async function fetchUser(setUser: { (user: any): void; (arg0: any): void; }) {
    const response = await fetch(`/user`, {
      method: "GET",
      credentials: "include", 
    });
    console.log(response);
    const user = await response.json();
    setUser(user[0]);
}

export async function fetchUsers(mySelf:userProps, setUsers: any) {
    const data = await fetch("/users");
    const myUsers = await data.json();
    setUsers(myUsers.filter((user:any)=>user.email !== mySelf?.email))
}