import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Briefcase,
  User,
  Loader2,
  Save,
  Image as ImageIcon,
  Plus,
  X,
  GraduationCap,
} from "lucide-react";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { userData, updateProfile } = useContext(UserContext);

  // --- 1. States ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    location: "",
    about: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);

  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Pre-fill Data ---
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        headline: userData.headline || "",
        location: userData.location || "",
        about: userData.about || "",
      });
      setSkills(userData.skills || []);
      setExperiences(userData.experience || []);
      setEducations(userData.education || []);
      setProfilePreview(userData.profilePicture || null);
      setCoverPreview(userData.coverPicture || null);
    }
  }, [userData]);

  // --- 3. Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "profile") {
        setProfilePicture(file);
        setProfilePreview(URL.createObjectURL(file));
      } else {
        setCoverPicture(file);
        setCoverPreview(URL.createObjectURL(file));
      }
    }
  };

  // --- 4. Skills Logic ---
  const addSkill = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (skillInput.trim() && !skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // --- 5. Dynamic Lists Logic (Add/Remove) ---
  const addItem = (type, newItem) => {
    if (type === "exp") setExperiences([...experiences, newItem]);
    if (type === "edu") setEducations([...educations, newItem]);
  };

  const removeItem = (type, index) => {
    if (type === "exp")
      setExperiences(experiences.filter((_, i) => i !== index));
    if (type === "edu") setEducations(educations.filter((_, i) => i !== index));
  };

  // --- 6. Final Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      return toast.error("First and Last name are required");
    }

    setIsLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) =>
        submitData.append(key, formData[key]),
      );

      // Stringify Arrays for Backend
      submitData.append("skills", JSON.stringify(skills));
      submitData.append("experience", JSON.stringify(experiences));
      submitData.append("education", JSON.stringify(educations));

      if (profilePicture) submitData.append("profilePicture", profilePicture);
      if (coverPicture) submitData.append("coverPicture", coverPicture);

      await updateProfile(submitData);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 pb-20 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter">
                EDIT PROFILE
              </h1>
              <p className="text-zinc-500 text-sm">
                Refine your professional identity on the MERN stack.
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Save Changes
            </button>
          </div>

          {/* Pictures Section */}
          <div className="relative group">
            <label className="block w-full h-52 bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer border border-zinc-800">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                  <ImageIcon />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                <Camera className="text-white" />
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "cover")}
              />
            </label>

            <label className="absolute -bottom-10 left-10 w-32 h-32 bg-zinc-800 rounded-full border-4 border-black overflow-hidden cursor-pointer group/profile">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <User size={40} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/profile:opacity-100 flex items-center justify-center transition-all">
                <Camera className="text-white w-6 h-6" />
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "profile")}
              />
            </label>
          </div>

          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info Inputs */}
            <div className="space-y-4 md:col-span-2 grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 block ml-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
                  placeholder="Abubakar"
                />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 block ml-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
                  placeholder="Afzal"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 block ml-2">
                Headline
              </label>
              <input
                name="headline"
                value={formData.headline}
                onChange={handleInputChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
                placeholder="Full Stack Developer | UI/UX Designer"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 block ml-2">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
                placeholder="Multan, Pakistan"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 block ml-2">
                About
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all resize-none"
                placeholder="Tell your story..."
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
              Skills
            </label>
            <div className="flex gap-2 mb-4">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
                placeholder="Add a skill (e.g. React)"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-zinc-800 hover:bg-zinc-700 px-4 rounded-xl transition-colors cursor-pointer"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-600/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-white"
                    onClick={() => removeSkill(skill)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Experience & Education (List View) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DynamicList
              title="Experience"
              icon={<Briefcase size={16} />}
              items={experiences}
              onAdd={(item) => addItem("exp", item)}
              onRemove={(index) => removeItem("exp", index)}
              fields={[
                { name: "title", label: "Job Title" },
                { name: "company", label: "Company" },
                { name: "location", label: "Location" },
              ]}
            />
            <DynamicList
              title="Education"
              icon={<GraduationCap size={16} />}
              items={educations}
              onAdd={(item) => addItem("edu", item)}
              onRemove={(index) => removeItem("edu", index)}
              fields={[
                { name: "school", label: "University" },
                { name: "degree", label: "Degree" },
                { name: "fieldOfStudy", label: "Field" },
              ]}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Helper Component for Experience/Education Lists
const DynamicList = ({ title, icon, items, onAdd, onRemove, fields }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempItem, setTempItem] = useState({});

  const handleAdd = () => {
    if (Object.values(tempItem).length >= fields.length) {
      onAdd(tempItem);
      setTempItem({});
      setIsOpen(false);
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
          {icon} {title}
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-500 hover:bg-blue-500/10 p-1 rounded-lg transition-all cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl space-y-3"
          >
            {fields.map((f) => (
              <input
                key={f.name}
                placeholder={f.label}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                onChange={(e) =>
                  setTempItem({ ...tempItem, [f.name]: e.target.value })
                }
              />
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-blue-600 text-xs font-bold py-2 rounded-xl cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 bg-zinc-800 text-xs font-bold py-2 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl flex justify-between items-start group"
          >
            <div>
              <p className="font-bold text-white text-sm">
                {item.title || item.school}
              </p>
              <p className="text-zinc-500 text-xs">
                {item.company || item.degree} •{" "}
                {item.location || item.fieldOfStudy}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-zinc-700 hover:text-red-500 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateProfile;
