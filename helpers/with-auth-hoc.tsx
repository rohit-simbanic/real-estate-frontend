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
        <div className="container mx-auto min-h-svh">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="skeleton h-10 w-3/4 mx-auto mb-4"></div>
            <div className="skeleton h-10 w-3/4 mx-auto mb-4"></div>
            <div className="skeleton h-10 w-3/4 mx-auto mb-4"></div>
            <div className="skeleton h-10 w-3/4 mx-auto mb-4"></div>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
