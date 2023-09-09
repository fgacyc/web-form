import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../lib/openapi";
import { useEffect } from "react";

const Register = () => {
  const { user } = useAuth0();

  const api = useAPI();

  useEffect(() => {
    if (!user?.sub) return;
    api
      .GET("/users/{id}", {
        params: {
          path: {
            id: user?.sub,
          },
        },
      })
      .then((v) => console.log(v.data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.sub]);

  console.log(user);
  return (
    <section className="retreat-bg-2 full flex flex-col justify-center align-center">
      <div className="popup">s</div>
    </section>
  );
};
export default Register;
