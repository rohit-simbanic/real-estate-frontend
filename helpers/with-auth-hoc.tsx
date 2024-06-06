import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/admin/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
