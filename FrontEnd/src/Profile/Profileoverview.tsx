import React, { useState, useEffect } from 'react';
import styles from './Css/Profileoverview.module.css';
import { useProfile, useAuth } from '../hooks/useApi';
import { User, Education, WorkExperience, Skills } from '../api';

const ProfileOverview: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile, refetch } = useProfile(user?._id);

  // Local state for editing and UI
  const [showEditModal, setShowEditModal] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);
  const [aboutInput, setAboutInput] = useState('');
  const [eduEditIdx, setEduEditIdx] = useState<number | null>(null);
  const [addingEdu, setAddingEdu] = useState(false);
  const [eduInputs, setEduInputs] = useState<Education>({ name: '', stream: '', endDate: '' });
  const [workEditIdx, setWorkEditIdx] = useState<number | null>(null);
  const [addingWork, setAddingWork] = useState(false);
  const [workInputs, setWorkInputs] = useState<WorkExperience>({ title: '', company: '', startDate: '', endDate: '', description: '', jobType: '' });
  const [skillInput, setSkillInput] = useState('');
  const [addingSkill, setAddingSkill] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-profile.jpg');
  const [backgroundImage, setBackgroundImage] = useState('/default-bg.jpg');
  const [localProfile, setLocalProfile] = useState<User | null>(null);

  // Mocked fields for UI only (not in backend)
  const connections = 723; // TODO: Add to backend if needed
  const followers = 1258; // TODO: Add to backend if needed
  const location = profile?.workExperience?.[0]?.company || 'No location specified'; // Example fallback

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
      setProfileImage(profile.profilePhoto || '/default-profile.jpg');
      // Optionally set backgroundImage if you add it to backend
    }
  }, [profile]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!localProfile) return <div>No profile found.</div>;

  // --- About Handlers ---
  const startEditAbout = () => {
    setAboutInput(localProfile.about || '');
    setAboutEdit(true);
  };
  const saveAbout = () => {
    setLocalProfile({ ...localProfile, about: aboutInput });
    setAboutEdit(false);
  };
  const cancelAbout = () => setAboutEdit(false);

  // --- Education Handlers ---
  const startAddEdu = () => { setAddingEdu(true); setEduInputs({ name: '', stream: '', endDate: '' }); };
  const saveAddEdu = () => {
    setLocalProfile({
      ...localProfile,
      education: [...(localProfile.education || []), eduInputs]
    });
    setAddingEdu(false);
  };
  const startEditEdu = (idx: number) => { setEduEditIdx(idx); setEduInputs(localProfile.education?.[idx] || { name: '', stream: '', endDate: '' }); };
  const saveEdu = () => {
    if (eduEditIdx === null) return;
    const newEducation = [...(localProfile.education || [])];
    newEducation[eduEditIdx] = eduInputs;
    setLocalProfile({ ...localProfile, education: newEducation });
    setEduEditIdx(null);
  };
  const cancelEdu = () => setEduEditIdx(null);
  const removeEdu = (idx: number) => {
    setLocalProfile({ ...localProfile, education: (localProfile.education || []).filter((_, i) => i !== idx) });
    setEduEditIdx(null);
  };

  // --- Work Experience Handlers ---
  const startAddWork = () => { setAddingWork(true); setWorkInputs({ title: '', company: '', startDate: '', endDate: '', description: '', jobType: '' }); };
  const saveAddWork = () => {
    setLocalProfile({
      ...localProfile,
      workExperience: [...(localProfile.workExperience || []), workInputs]
    });
    setAddingWork(false);
  };
  const startEditWork = (idx: number) => { setWorkEditIdx(idx); setWorkInputs(localProfile.workExperience?.[idx] || { title: '', company: '', startDate: '', endDate: '', description: '', jobType: '' }); };
  const saveWork = () => {
    if (workEditIdx === null) return;
    const newWork = [...(localProfile.workExperience || [])];
    newWork[workEditIdx] = workInputs;
    setLocalProfile({ ...localProfile, workExperience: newWork });
    setWorkEditIdx(null);
  };
  const cancelWork = () => setWorkEditIdx(null);
  const removeWork = (idx: number) => {
    setLocalProfile({ ...localProfile, workExperience: (localProfile.workExperience || []).filter((_, i) => i !== idx) });
    setWorkEditIdx(null);
  };

  // --- Skills Handlers ---
  // For now, just show technicalKnowledge.language as a flat list
  const saveAddSkill = () => {
    if (!skillInput.trim()) return;
    setLocalProfile({
      ...localProfile,
      skills: {
        ...localProfile.skills,
        technicalKnowledge: {
          language: [...(localProfile.skills?.technicalKnowledge.language || []), skillInput.trim()],
          framework: [...(localProfile.skills?.technicalKnowledge.framework || [])], // always provide framework
        },
        coreKnowledge: localProfile.skills?.coreKnowledge || [],
        languages: localProfile.skills?.languages || []
      }
    });
    setAddingSkill(false);
    setSkillInput('');
  };
  const removeSkill = (skill: string) => {
    setLocalProfile({
      ...localProfile,
      skills: {
        ...localProfile.skills,
        technicalKnowledge: {
          language: (localProfile.skills?.technicalKnowledge.language || []).filter(s => s !== skill),
          framework: [...(localProfile.skills?.technicalKnowledge.framework || [])], // always provide framework
        },
        coreKnowledge: localProfile.skills?.coreKnowledge || [],
        languages: localProfile.skills?.languages || []
      }
    });
  };

  // --- Save All Changes to Backend ---
  const saveProfileChanges = async () => {
    if (!localProfile) return;
    const formData = new FormData();
    formData.append('_id', localProfile._id);
    formData.append('about', localProfile.about || '');
    formData.append('education', JSON.stringify(localProfile.education || []));
    formData.append('workExperience', JSON.stringify(localProfile.workExperience || []));
    formData.append('skills', JSON.stringify(localProfile.skills || {}));
    formData.append('firstName', localProfile.firstName || '');
    formData.append('lastName', localProfile.lastName || '');
    // Do NOT send email (immutable)
    // formData.append('email', localProfile.email || '');
    // Add more fields as needed
    await updateProfile(formData);
    setShowEditModal(false);
    refetch();
  };

  // --- UI ---
  return (
    <div className={styles.profileGrid}>
      {/* Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.headerBg} style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div className={styles.pfp} style={{ backgroundImage: `url(${profileImage})` }} />
            <div>
              <div className={styles.name}>{localProfile.firstName} {localProfile.lastName}</div>
              <div className={styles.jobTitle}>{localProfile.workExperience?.[0]?.title || 'No position specified'}</div>
              <div className={styles.locationRow}>
                <span className={styles.locationIcon}>📍</span>
                <span className={styles.locationText}>{location}</span>
              </div>
              <div className={styles.connectionsFollowers}>
                <span className={styles.connections}>{connections} connections</span>
                <span className={styles.followers}>{followers} followers</span>
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.editProfileBtn} onClick={() => setShowEditModal(true)}>
              <span className={styles.editProfileIcon}>✏️</span>
              <span className={styles.editProfileText}>Edit Profile</span>
            </button>
            <div className={styles.profileCompletionWrap}>
              <div className={styles.profileCompletionCircle}>
                <span className={styles.profileCompletionText}>97%</span>
              </div>
              <div className={styles.completionText}>Profile Completion</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Column */}
      <div className={styles.mainCol}>
        {/* About Me */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>About Me</span>
            {!aboutEdit && (
              <span className={styles.editIcon} onClick={startEditAbout}>✏️</span>
            )}
          </div>
          <div className={styles.sectionContent}>
            {aboutEdit ? (
              <>
                <textarea
                  className={styles.modalTextarea}
                  value={aboutInput}
                  onChange={e => setAboutInput(e.target.value)}
                  rows={5}
                />
                <div style={{ marginTop: 8 }}>
                  <button className={styles.modalSave} onClick={saveAbout}>Save</button>
                  <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelAbout}>Cancel</button>
                </div>
              </>
            ) : (
              localProfile.about
            )}
          </div>
        </div>
        {/* Education */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Education</span>
            {!addingEdu && eduEditIdx === null && (
              <button className={styles.addBtn} onClick={startAddEdu}>+ Add Education</button>
            )}
          </div>
          <div className={styles.eduExpList}>
            {(localProfile.education || []).map((edu, i) => (
              <div className={styles.eduExpItem} key={i}>
                {/* If you want to display a logo, add a logo field to your backend and DB */}
                <div className={styles.itemBody}>
                  <div className={styles.itemHeaderRow}>
                    {eduEditIdx === i ? (
                      <>
                        <input
                          className={styles.modalInput}
                          value={eduInputs.name}
                          onChange={e => setEduInputs({ ...eduInputs, name: e.target.value })}
                          placeholder="School"
                        />
                        <span className={styles.menuIcon} onClick={cancelEdu}>×</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.itemTitle}>{edu.name}</span>
                        <span className={styles.menuIcon} onClick={() => startEditEdu(i)}>⋮</span>
                      </>
                    )}
                  </div>
                  {eduEditIdx === i ? (
                    <>
                      <input
                        className={styles.modalInput}
                        value={eduInputs.stream}
                        onChange={e => setEduInputs({ ...eduInputs, stream: e.target.value })}
                        placeholder="Stream"
                      />
                      <input
                        className={styles.modalInput}
                        value={eduInputs.endDate}
                        onChange={e => setEduInputs({ ...eduInputs, endDate: e.target.value })}
                        placeholder="End Date"
                      />
                      <div style={{ marginTop: 8 }}>
                        <button className={styles.modalSave} onClick={saveEdu}>Save</button>
                        <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelEdu}>Cancel</button>
                        <button className={styles.removeSkill} style={{ marginLeft: 8 }} onClick={() => removeEdu(i)}>Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.itemSubtitle}>{edu.stream}</div>
                      <div className={styles.itemDate}>{edu.endDate}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {addingEdu && (
              <div className={styles.eduExpItem}>
                <div className={styles.itemBody}>
                  <input
                    className={styles.modalInput}
                    value={eduInputs.name}
                    onChange={e => setEduInputs({ ...eduInputs, name: e.target.value })}
                    placeholder="School"
                  />
                  <input
                    className={styles.modalInput}
                    value={eduInputs.stream}
                    onChange={e => setEduInputs({ ...eduInputs, stream: e.target.value })}
                    placeholder="Stream"
                  />
                  <input
                    className={styles.modalInput}
                    value={eduInputs.endDate}
                    onChange={e => setEduInputs({ ...eduInputs, endDate: e.target.value })}
                    placeholder="End Date"
                  />
                  <div style={{ marginTop: 8 }}>
                    <button className={styles.modalSave} onClick={saveAddEdu}>Add</button>
                    <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={() => setAddingEdu(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Work Experience */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Work Experience</span>
            {!addingWork && workEditIdx === null && (
              <button className={styles.addBtn} onClick={startAddWork}>+ Add Experience</button>
            )}
          </div>
          <div className={styles.eduExpList}>
            {(localProfile.workExperience || []).map((exp, i) => (
              <div className={styles.eduExpItem} key={i}>
                {/* If you want to display a logo, add a logo field to your backend and DB */}
                <div className={styles.itemBody}>
                  <div className={styles.itemHeaderRow}>
                    {workEditIdx === i ? (
                      <>
                        <input
                          className={styles.modalInput}
                          value={workInputs.title}
                          onChange={e => setWorkInputs({ ...workInputs, title: e.target.value })}
                          placeholder="Title"
                        />
                        <span className={styles.menuIcon} onClick={cancelWork}>×</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.itemTitle}>{exp.title}</span>
                        <span className={styles.menuIcon} onClick={() => startEditWork(i)}>⋮</span>
                      </>
                    )}
                  </div>
                  {workEditIdx === i ? (
                    <>
                      <input
                        className={styles.modalInput}
                        value={workInputs.company}
                        onChange={e => setWorkInputs({ ...workInputs, company: e.target.value })}
                        placeholder="Company"
                      />
                      <input
                        className={styles.modalInput}
                        value={workInputs.startDate}
                        onChange={e => setWorkInputs({ ...workInputs, startDate: e.target.value })}
                        placeholder="Start Date"
                      />
                      <input
                        className={styles.modalInput}
                        value={workInputs.endDate}
                        onChange={e => setWorkInputs({ ...workInputs, endDate: e.target.value })}
                        placeholder="End Date"
                      />
                      <textarea
                        className={styles.modalTextarea}
                        value={workInputs.description}
                        onChange={e => setWorkInputs({ ...workInputs, description: e.target.value })}
                        placeholder="Description"
                        rows={3}
                      />
                      <div style={{ marginTop: 8 }}>
                        <button className={styles.modalSave} onClick={saveWork}>Save</button>
                        <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelWork}>Cancel</button>
                        <button className={styles.removeSkill} style={{ marginLeft: 8 }} onClick={() => removeWork(i)}>Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.itemSubtitle}>{exp.company}</div>
                      <div className={styles.itemDate}>{exp.startDate} - {exp.endDate}</div>
                      <div className={styles.itemDescription}>{exp.description}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {addingWork && (
              <div className={styles.eduExpItem}>
                <div className={styles.itemBody}>
                  <input
                    className={styles.modalInput}
                    value={workInputs.title}
                    onChange={e => setWorkInputs({ ...workInputs, title: e.target.value })}
                    placeholder="Title"
                  />
                  <input
                    className={styles.modalInput}
                    value={workInputs.company}
                    onChange={e => setWorkInputs({ ...workInputs, company: e.target.value })}
                    placeholder="Company"
                  />
                  <input
                    className={styles.modalInput}
                    value={workInputs.startDate}
                    onChange={e => setWorkInputs({ ...workInputs, startDate: e.target.value })}
                    placeholder="Start Date"
                  />
                  <input
                    className={styles.modalInput}
                    value={workInputs.endDate}
                    onChange={e => setWorkInputs({ ...workInputs, endDate: e.target.value })}
                    placeholder="End Date"
                  />
                  <textarea
                    className={styles.modalTextarea}
                    value={workInputs.description}
                    onChange={e => setWorkInputs({ ...workInputs, description: e.target.value })}
                    placeholder="Description"
                    rows={3}
                  />
                  <div style={{ marginTop: 8 }}>
                    <button className={styles.modalSave} onClick={saveAddWork}>Add</button>
                    <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={() => setAddingWork(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Skills */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Skills</span>
          </div>
          <div className={styles.skillsContainer}>
            {(localProfile.skills?.technicalKnowledge.language || []).map((skill, i) => (
              <div className={styles.skillTag} key={i}>
                {skill}
                <span className={styles.removeSkill} onClick={() => removeSkill(skill)}>×</span>
              </div>
            ))}
            {addingSkill ? (
              <>
                <input
                  className={styles.modalInput}
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  placeholder="Skill name"
                  autoFocus
                />
                <button className={styles.modalSave} onClick={saveAddSkill}>Add</button>
                <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={() => setAddingSkill(false)}>Cancel</button>
              </>
            ) : (
              <div className={styles.addSkillTag} onClick={() => setAddingSkill(true)}>+ add skill</div>
            )}
          </div>
        </div>
      </div>
      {/* Sidebar Column (optional, add more sections as needed) */}
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div className={styles.editModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Edit Profile</h2>
              <button className={styles.modalClose} onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className={styles.modalContent}>
              {/* Add more editable fields as needed */}
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  value={localProfile.firstName}
                  onChange={e => setLocalProfile({ ...localProfile, firstName: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  value={localProfile.lastName}
                  onChange={e => setLocalProfile({ ...localProfile, lastName: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  value={localProfile.email}
                  onChange={e => setLocalProfile({ ...localProfile, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>About</label>
                <textarea
                  value={localProfile.about}
                  onChange={e => setLocalProfile({ ...localProfile, about: e.target.value })}
                />
              </div>
              {/* Add more fields as needed */}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancel} onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className={styles.modalSave} onClick={saveProfileChanges}>Save All Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;