import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loading from "../home/shared/loading";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";

const isAdmin = (Component: any) => {
  return function IsAdmin(props: any) {
    const { data: currentUser, isLoading } = useLoggedInUserQuery();
    const admin = currentUser?.payload?.role === "admin";

    useEffect(() => {
      if (!isLoading && (!currentUser || !admin)) {
        redirect("/");
      }
    }, [admin, currentUser, isLoading]);

    if (isLoading) {
      return <Loading />;
    }

    if (!currentUser || !admin) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default isAdmin;
