import React, { useMemo, useState } from "react";
import PostingPets from "./PostingPets";
import AdoptingRequests from "./AdoptingRequests";
import AdoptedHistory from "./AdoptedHistory";
import ApprovedRequests from "./ApprovedRequests";
import AdminGivePetList from "./AdminGivePetList";
import AdminEmergencyList from "./AdminEmergencyList";
import AdminUsersList from "./AdminUsersList";
import AdminOverview from "./AdminOverview";

const AdminScreen = () => {
  const [screen, setScreen] = useState("overview");

  const navItems = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "postingPet", label: "Post Pet Requests" },
      { id: "approvedRequests", label: "Approved Pets" },
      { id: "adoptingPet", label: "Adoption Requests" },
      { id: "users", label: "Registered Users" },
      { id: "givePet", label: "Give a Pet Requests" },
      { id: "emergency", label: "Emergency Reports" },
      { id: "adoptedHistory", label: "Adopted History" },
    ],
    []
  );

  return (
    <div className="admin-screen-container">
      <aside className="admin-screen-left">
        <div className="admin-menu">
          <h3>Admin sections</h3>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-menu-item${screen === item.id ? " active" : ""}`}
              onClick={() => setScreen(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      <div className="admin-screen-right">
        {screen === "overview" && <AdminOverview onOpenSection={setScreen} />}
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'users' && <AdminUsersList />}
        {screen === 'givePet' && <AdminGivePetList />}
        {screen === 'emergency' && <AdminEmergencyList />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
      </div>
    </div>
  );
};

export default AdminScreen;
