import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";
function ProfilePage() {
  return <UserProfile />;
}

//Using Server Side Auth To check if User is Authenticated or not And than allow to use restricted pages..
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
