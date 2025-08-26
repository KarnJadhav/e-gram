import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

// Types
type User = {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  email?: string;
  profilePhoto?: string;
};

type Complaint = {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  status: "Pending" | "In Progress" | "Resolved";
};

type CertificateApp = {
  id: string;
  type: "Birth" | "Death";
  refNo: string;
  status: "Submitted" | "Approved" | "Rejected";
};

type Pickup = {
  nextDate: string;
  route: string;
  status: "Requested" | "Scheduled" | "Completed";
};

type Notification = {
  id: string;
  title: string;
  text: string;
  time: string;
  unread: boolean;
  icon?: string;
};

// Subcomponents
const QuickActionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}> = ({ title, icon, color, onClick }) => (
  <button
    className={`rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-2 transition hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-br ${color} focus:outline-none focus:ring-2 focus:ring-blue-400`}
    aria-label={title}
    onClick={onClick}
    type="button"
  >
    <span className="text-4xl">{icon}</span>
    <span className="font-semibold text-lg">{title}</span>
  </button>
);

const StatusBadge: React.FC<{ status: Complaint["status"] }> = ({ status }) => {
  const color =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "In Progress"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
};

const ProgressBar: React.FC<{ status: Complaint["status"] }> = ({ status }) => {
  const percent =
    status === "Pending" ? 0 : status === "In Progress" ? 50 : 100;
  const color =
    status === "Pending"
      ? "bg-yellow-400"
      : status === "In Progress"
      ? "bg-blue-500"
      : "bg-green-500";
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
      <div
        className={`h-2 rounded-full transition-all ${color}`}
        style={{ width: `${percent}%` }}
        aria-valuenow={percent}
        aria-valuemax={100}
        aria-valuemin={0}
      />
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 mb-6">
    <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
      {title}
    </h2>
    {children}
  </section>
);

const EmptyState: React.FC<{ emoji: string; text: string; cta?: string }> = ({
  emoji,
  text,
  cta,
}) => (
  <div className="flex flex-col items-center justify-center py-8 gap-2">
    <span className="text-5xl">{emoji}</span>
    <span className="text-gray-500 dark:text-gray-400">{text}</span>
    {cta && (
      <button className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-blue-400">
        {cta}
      </button>
    )}
  </div>
);

const SkeletonRow: React.FC = () => (
  <div className="animate-pulse flex gap-4 items-center py-2">
    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

// Main Component
const CitizenDashboard: React.FC<{
  user?: User;
  complaints?: Complaint[];
  applications?: CertificateApp[];
  pickup?: Pickup;
  notifications?: Notification[];
}> = (props) => {
  const navigate = useNavigate();
  // Load user from localStorage for persistence
  const [userState, setUserState] = useState<User | undefined>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : undefined;
  });
  const [complaintsState, setComplaintsState] = useState<Complaint[]>([]);
  const [applicationsState, setApplicationsState] = useState<CertificateApp[]>([]);
  const [pickupState, setPickupState] = useState<Pickup | undefined>(undefined);
  const [notificationsState, setNotificationsState] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/api/auth/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          navigate("/login");
          return;
        }
        setUserState(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setComplaintsState(data.complaints || []);
        setApplicationsState(data.applications || []);
        setPickupState(data.pickup);
        setNotificationsState(data.notifications || []);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("complaintUpdated", (updatedComplaint: Complaint) => {
      setComplaintsState((prev = []) =>
        prev.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))
      );
    });
    socket.on("newNotification", (notif: Notification) => {
      setNotificationsState((prev = []) => [notif, ...prev]);
    });
    socket.on("garbageScheduleUpdated", (newPickup: Pickup) => {
      setPickupState(newPickup);
    });
    socket.on("profileUpdated", (payload: { userId: string; user: User }) => {
      if (payload.userId === userState?.id) {
        setUserState((prev) => ({ ...prev, ...payload.user }));
        setPhotoPreview(payload.user.profilePhoto || "/default-avatar.png");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [userState?.id]);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
  userState?.profilePhoto || "/default-avatar.png"
  );
  const [email, setEmail] = useState(userState?.email || "");
  const [photoPreview, setPhotoPreview] = useState(
  userState?.profilePhoto || "/default-avatar.png"
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoadingProfile(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    const formData = new FormData();
    formData.append("email", email);
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("profilePhoto", fileInput.files[0]);
    }
    await fetch("http://localhost:5000/api/auth/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserState((prev) => (prev ? { ...prev, email, avatarUrl: data.user.profilePhoto } : prev));
        setPhotoPreview(data.user.profilePhoto || "/default-avatar.png");
        setLoadingProfile(false);
      })
      .catch(() => {
        setLoadingProfile(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // TODO: Replace with navigation hooks/API calls
  const handleRegisterComplaint = () => {};
  const handleApplyCertificate = () => {};
  const handleRequestPickup = () => {};
  const handleViewEducationDocs = () => {};

  // Format date
  const formatDate = (date: string) =>
    dayjs(date).format("DD MMM YYYY, h:mm A");

  const timeAgo = (date: string) => {
    const now = dayjs();
    const diff = now.diff(dayjs(date), "minute");
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Floating Profile Button (top-right) */}
      <div className="fixed top-6 right-8 z-50">
        <button
          onClick={() => setShowProfileMenu((v) => !v)}
          className="flex items-center gap-2 focus:outline-none bg-white dark:bg-gray-900 shadow-lg rounded-full px-4 py-2 border border-blue-200 dark:border-gray-700 hover:shadow-xl transition"
        >
          <img
            src={photoPreview || "/default-avatar.png"}
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 border-blue-700 dark:border-blue-300 object-cover"
          />
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            {userState?.name}
          </span>
          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full ml-2">
            {userState?.role}
          </span>
        </button>
        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 z-50 border border-blue-100 dark:border-gray-700">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img
                  src={photoPreview || "/default-avatar.png"}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full border-4 border-blue-400 dark:border-blue-600 object-cover shadow-lg"
                />
                <label
                  className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer group-hover:bg-blue-800 transition border-2 border-white dark:border-gray-900"
                  title="Change photo"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <span className="material-icons">photo_camera</span>
                </label>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-4 py-2 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email address"
                autoComplete="email"
              />
              <button
                onClick={handleSave}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                disabled={loadingProfile}
              >
                {loadingProfile ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-blue-400 rounded-full inline-block"></span>
                ) : (
                  <span>Save</span>
                )}
              </button>
              {/* Success/Error feedback */}
              {/* You can add a state for feedback and show here if needed */}
              <button
                onClick={logout}
                className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20 text-blue-700 dark:text-blue-300">
            Loading dashboard...
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">
              Welcome, {userState?.name}!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Complaints */}
              <motion.section
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6"
              >
                <h2 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">
                  Complaints
                </h2>
                {complaintsState.length === 0 ? (
                  <span className="text-gray-500">No complaints found.</span>
                ) : (
                  <ul>
                    {complaintsState.map((c) => (
                      <li key={c.id} className="mb-2 text-white">
                        {c.title} <StatusBadge status={c.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
              {/* Certificates */}
              <motion.section
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6"
              >
                <h2 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">
                  Certificates
                </h2>
                {applicationsState.length === 0 ? (
                  <span className="text-gray-500">No certificate applications.</span>
                ) : (
                  <ul>
                    {applicationsState.map((app) => (
                      <li key={app.id} className="mb-2 text-white">
                        {app.type}{" "}
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-600">
                          {app.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
              {/* Garbage Pickup */}
              <motion.section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6"
              >
                <h2 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">
                  Garbage Pickup
                </h2>
                {pickupState ? (
                  <div className="text-white">Next: {pickupState.nextDate}</div>
                ) : (
                  <span className="text-gray-500">No pickup scheduled.</span>
                )}
                <div className="text-white">
                  Status:{" "}
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-600">
                    {pickupState?.status}
                  </span>
                </div>
              </motion.section>
              {/* Notifications */}
              <motion.section
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6"
              >
                <h2 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">
                  Notifications
                </h2>
                {notificationsState && notificationsState.length > 0 ? (
                  <ul>
                    {notificationsState.map((n) => (
                      <li key={n.id} className="mb-2 text-white">
                        {n.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No notifications.</span>
                )}
              </motion.section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
// TODO: If you see 'Cannot find module dayjs', run: npm install dayjs
