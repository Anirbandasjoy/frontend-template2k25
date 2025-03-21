"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../home/shared/loading";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useLoggedInUserQuery();
  console.log({ data });
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.email) {
      router.push("/");
    }
  }, [userInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{!userInfo?.email ? children : null}</>;
};

export default PublicRoute;
