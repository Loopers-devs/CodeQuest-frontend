import { profileAction } from "@/actions/user.action";
import ProfileForm from "./profile-form";

export default async function ProfilePage() {
  const user = await profileAction();

  if (!user) {
    return (
      <div className="text-center text-red-500">
        Failed to load user profile.
      </div>
    );
  }

  return <ProfileForm user={user} />;
}
