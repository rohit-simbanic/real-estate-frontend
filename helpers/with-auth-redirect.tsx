import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

const withAuthRedirect = (WrappedComponent: React.FC, redirectTo: string) => {
  const Wrapper: React.FC = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.push(redirectTo);
      }
    }, [isAuthenticated, router, redirectTo]);

    if (isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuthRedirect;
