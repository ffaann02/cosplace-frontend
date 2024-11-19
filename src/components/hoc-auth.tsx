import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status==="authenticated") {
        router.push("/login");
      }
    }, [status, router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
