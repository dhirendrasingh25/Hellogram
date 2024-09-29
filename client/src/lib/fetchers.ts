import { userProps } from "@/types";

export async function fetchUser(setUser: { (user: any): void; (arg0: any): void; }) {
    const response = await fetch(`/api/v1/user`, {
      method: "GET",
      credentials: "include", 
    });
    // console.log(response);
    const user = await response.json();
    // console.log(user.user);
    setUser(user.user);
}

export async function fetchUsers(mySelf:userProps, setUsers: any) {
    const data = await fetch("/api/v1/users");
    const myUsers = await data.json();
    setUsers(myUsers.users.filter((user:any)=>user.email !== mySelf?.email))
}