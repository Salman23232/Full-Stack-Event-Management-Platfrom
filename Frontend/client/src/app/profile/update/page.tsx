import Profile from "@/components/custom/Profile";
import SavedEvents from "@/components/custom/SavedEvent";


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Profile />
      <SavedEvents />
    </div>
  );
}
