import React, { useState } from 'react';
import styles from './Css/Profileoverview.module.css';
import { useProfile, useAuth } from '../hooks/useApi';
import { apiService } from '../api';

const initialProfile = {
  about: `Passionate UX Designer with 8+ years of experience creating user-centered digital experiences for leading tech companies. Specialized in product design, user research, and design systems. Committed to crafting intuitive interfaces that solve real user problems while achieving business goals.`,
  education: [
    {
      school: 'Stanford University',
      degree: 'Master of Fine Arts, Design',
      date: '2015 - 2017',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_University_seal_2003.svg',
      desc: 'Specialized in Human-Computer Interaction and User Experience Design. Thesis on adaptive interfaces for diverse user needs.'
    },
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Arts, Graphic Design',
      date: '2011 - 2015',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg',
      desc: 'Graduated with honors. Coursework in visual communication, typography, and digital media design.'
    }
  ],
  experience: [
    {
      title: 'Senior UX Designer',
      company: 'TechGrowth Inc.',
      date: 'Jan 2022 - Present • San Francisco, CA',
      logo: 'https://via.placeholder.com/89x89/003F88/FFFFFF?text=TG',
      desc: 'Leading UX design for enterprise SaaS products. Established design system that improved design consistency by 40% and reduced development time by 25%. Conducted user research and usability testing to optimize product experience.'
    },
    {
      title: 'UX Designer',
      company: 'InnovateTech',
      date: 'Mar 2019 - Dec 2021 • New York, NY',
      logo: 'https://via.placeholder.com/89x89/0066CC/FFFFFF?text=IT',
      desc: 'Designed user interfaces for mobile and web applications. Collaborated with product managers and engineers to define product requirements and implement design solutions. Created wireframes, prototypes, and high-fidelity mockups.'
    },
    {
      title: 'UX Designer',
      company: 'DesignHub Agency',
      date: 'Jun 2017 - Feb 2019 • Chicago, IL',
      logo: 'https://via.placeholder.com/89x89/FF6600/FFFFFF?text=DH',
      desc: 'Created digital experiences for various clients across industries. Developed brand guidelines and visual design systems. Conducted competitive analysis and user research to inform design decisions.'
    }
  ],
  languages: ['English (Native)', 'Spanish (Professional)', 'French (Basic)'],
  contact: [
    'alex.morgan@example.com',
    'www.alexmorgan.design',
    'linkedin.com/in/alexmorgan'
  ],
  skills: [
    'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Design Thinking', 'Usability Testing'
  ],
  people: [
    {
      name: 'Emily Rodriguez',
      title: 'Marketing Director at TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      following: false
    },
    {
      name: 'David Kim',
      title: 'Product Manager at StartupX',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      following: false
    },
    {
      name: 'Lisa Chen',
      title: 'Data Scientist at AnalyticsPro',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      following: false
    }
  ]
};

const ProfileOverview: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80');
  const [editForm, setEditForm] = useState({
    name: 'Alex Morgan',
    jobTitle: 'Senior UX Designer at TechGrowth Inc.',
    location: 'San Francisco, CA',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    website: 'www.alexmorgan.design',
    linkedin: 'linkedin.com/in/alexmorgan'
  });

  // Inline editing states
  const [editingField, setEditingField] = useState(null);
  const [editValues, setEditValues] = useState({
    name: '',
    jobTitle: '',
    location: '',
    email: ''
  });

  // About
  const [aboutEdit, setAboutEdit] = useState(false);
  const [aboutInput, setAboutInput] = useState(profile.about);

  // Education
  const [eduEditIdx, setEduEditIdx] = useState(null);
  const [eduInputs, setEduInputs] = useState({ school: '', degree: '', date: '', logo: '', desc: '' });
  const [addingEdu, setAddingEdu] = useState(false);

  // Experience
  const [expEditIdx, setExpEditIdx] = useState(null);
  const [expInputs, setExpInputs] = useState({ title: '', company: '', date: '', logo: '', desc: '' });
  const [addingExp, setAddingExp] = useState(false);

  // Languages
  const [langEditIdx, setLangEditIdx] = useState(null);
  const [langInput, setLangInput] = useState('');
  const [addingLang, setAddingLang] = useState(false);

  // Contact
  const [contactEditIdx, setContactEditIdx] = useState(null);
  const [contactInput, setContactInput] = useState('');
  const [addingContact, setAddingContact] = useState(false);

  // Skills
  const [addingSkill, setAddingSkill] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  // About Inline Edit
  const startEditAbout = () => {
    setAboutInput(profile.about);
    setAboutEdit(true);
  };
  const saveAbout = () => {
    setProfile({ ...profile, about: aboutInput });
    setAboutEdit(false);
  };
  const cancelAbout = () => {
    setAboutInput(profile.about);
    setAboutEdit(false);
  };

  // Education Inline Edit
  const startEditEdu = (idx) => {
    setEduEditIdx(idx);
    setEduInputs({ ...profile.education[idx] });
  };
  const saveEdu = () => {
    setProfile({
      ...profile,
      education: profile.education.map((e, i) =>
        i === eduEditIdx ? { ...eduInputs } : e
      )
    });
    setEduEditIdx(null);
  };
  const cancelEdu = () => {
    setEduEditIdx(null);
  };
  const removeEdu = (idx) => {
    setProfile({ ...profile, education: profile.education.filter((_, i) => i !== idx) });
    setEduEditIdx(null);
  };
  // Add Education
  const startAddEdu = () => {
    setAddingEdu(true);
    setEduInputs({ school: '', degree: '', date: '', logo: '', desc: '' });
  };
  const saveAddEdu = () => {
    setProfile({ ...profile, education: [...profile.education, { ...eduInputs }] });
    setAddingEdu(false);
  };
  const cancelAddEdu = () => {
    setAddingEdu(false);
  };

  // Experience Inline Edit
  const startEditExp = (idx) => {
    setExpEditIdx(idx);
    setExpInputs({ ...profile.experience[idx] });
  };
  const saveExp = () => {
    setProfile({
      ...profile,
      experience: profile.experience.map((e, i) =>
        i === expEditIdx ? { ...expInputs } : e
      )
    });
    setExpEditIdx(null);
  };
  const cancelExp = () => {
    setExpEditIdx(null);
  };
  const removeExp = (idx) => {
    setProfile({ ...profile, experience: profile.experience.filter((_, i) => i !== idx) });
    setExpEditIdx(null);
  };
  // Add Experience
  const startAddExp = () => {
    setAddingExp(true);
    setExpInputs({ title: '', company: '', date: '', logo: '', desc: '' });
  };
  const saveAddExp = () => {
    setProfile({ ...profile, experience: [...profile.experience, { ...expInputs }] });
    setAddingExp(false);
  };
  const cancelAddExp = () => {
    setAddingExp(false);
  };

  // Languages Inline Edit
  const startEditLang = (idx) => {
    setLangEditIdx(idx);
    setLangInput(profile.languages[idx]);
  };
  const saveLang = () => {
    setProfile({
      ...profile,
      languages: profile.languages.map((l, i) =>
        i === langEditIdx ? langInput : l
      )
    });
    setLangEditIdx(null);
  };
  const cancelLang = () => {
    setLangEditIdx(null);
  };
  const removeLang = (idx) => {
    setProfile({ ...profile, languages: profile.languages.filter((_, i) => i !== idx) });
    setLangEditIdx(null);
  };
  // Add Language
  const startAddLang = () => {
    setAddingLang(true);
    setLangInput('');
  };
  const saveAddLang = () => {
    if (langInput.trim()) {
      setProfile({ ...profile, languages: [...profile.languages, langInput.trim()] });
    }
    setAddingLang(false);
    setLangInput('');
  };
  const cancelAddLang = () => {
    setAddingLang(false);
    setLangInput('');
  };

  // Contact Inline Edit
  const startEditContact = (idx) => {
    setContactEditIdx(idx);
    setContactInput(profile.contact[idx]);
  };
  const saveContact = () => {
    setProfile({
      ...profile,
      contact: profile.contact.map((c, i) =>
        i === contactEditIdx ? contactInput : c
      )
    });
    setContactEditIdx(null);
  };
  const cancelContact = () => {
    setContactEditIdx(null);
  };
  const removeContact = (idx) => {
    setProfile({ ...profile, contact: profile.contact.filter((_, i) => i !== idx) });
    setContactEditIdx(null);
  };
  // Add Contact
  const startAddContact = () => {
    setAddingContact(true);
    setContactInput('');
  };
  const saveAddContact = () => {
    if (contactInput.trim()) {
      setProfile({ ...profile, contact: [...profile.contact, contactInput.trim()] });
    }
    setAddingContact(false);
    setContactInput('');
  };
  const cancelAddContact = () => {
    setAddingContact(false);
    setContactInput('');
  };

  // Skills Inline Add/Remove
  const startAddSkill = () => {
    setAddingSkill(true);
    setSkillInput('');
  };
  const saveAddSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] });
    }
    setAddingSkill(false);
    setSkillInput('');
  };
  const cancelAddSkill = () => {
    setAddingSkill(false);
    setSkillInput('');
  };
  const removeSkill = (skill) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  // Inline editing functions
  const startInlineEdit = (field) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: editForm[field] });
  };

  const saveInlineEdit = (field) => {
    setEditForm({ ...editForm, [field]: editValues[field] });
    setEditingField(null);
  };

  const cancelInlineEdit = () => {
    setEditingField(null);
  };

  const handleInlineChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const saveAllChanges = () => {
    // Save all changes and close modal
    console.log('All profile changes saved:', { profileImage, backgroundImage, editForm });
    setShowEditModal(false);
  };

  // Edit Profile Modal Functions
  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const saveProfileChanges = () => {
    // Here you would typically save to backend
    console.log('Profile changes saved:', { profileImage, backgroundImage, editForm });
    setShowEditModal(false);
  };

  return (
    <div className={styles.profileGrid}>
      {/* Header Card (spans both columns) */}
      <div className={styles.headerCard}>
        <div className={styles.headerBg} style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div className={styles.pfp} style={{ backgroundImage: `url(${profileImage})` }} />
            <div>
              <div className={styles.name}>{editForm.name}</div>
              <div className={styles.jobTitle}>{editForm.jobTitle}</div>
              <div className={styles.locationRow}>
                <span className={styles.locationIcon}>📍</span>
                <span className={styles.locationText}>{editForm.location}</span>
              </div>
              <div className={styles.connectionsFollowers}>
                <span className={styles.connections}>723 connections</span>
                <span className={styles.followers}>1258 followers</span>
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.editProfileBtn} onClick={openEditModal}>
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
              profile.about
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
            {profile.education.map((edu, i) => (
              <div className={styles.eduExpItem} key={i}>
                <div className={styles.itemLogo} style={{ backgroundImage: `url(${edu.logo})` }} />
                <div className={styles.itemBody}>
                  <div className={styles.itemHeaderRow}>
                    {eduEditIdx === i ? (
                      <>
                        <input
                          className={styles.modalInput}
                          value={eduInputs.school}
                          onChange={e => setEduInputs({ ...eduInputs, school: e.target.value })}
                          placeholder="School"
                        />
                        <span className={styles.menuIcon} onClick={cancelEdu}>×</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.itemTitle}>{edu.school}</span>
                        <span className={styles.menuIcon} onClick={() => startEditEdu(i)}>⋮</span>
                      </>
                    )}
                  </div>
                  {eduEditIdx === i ? (
                    <>
                      <input
                        className={styles.modalInput}
                        value={eduInputs.degree}
                        onChange={e => setEduInputs({ ...eduInputs, degree: e.target.value })}
                        placeholder="Degree"
                      />
                      <input
                        className={styles.modalInput}
                        value={eduInputs.date}
                        onChange={e => setEduInputs({ ...eduInputs, date: e.target.value })}
                        placeholder="Date"
                      />
                      <input
                        className={styles.modalInput}
                        value={eduInputs.logo}
                        onChange={e => setEduInputs({ ...eduInputs, logo: e.target.value })}
                        placeholder="Logo URL"
                      />
                      <textarea
                        className={styles.modalTextarea}
                        value={eduInputs.desc}
                        onChange={e => setEduInputs({ ...eduInputs, desc: e.target.value })}
                        placeholder="Description"
                        rows={3}
                      />
                      <div style={{ marginTop: 8 }}>
                        <button className={styles.modalSave} onClick={saveEdu}>Save</button>
                        <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelEdu}>Cancel</button>
                        <button className={styles.removeSkill} style={{ marginLeft: 8 }} onClick={() => removeEdu(i)}>Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.itemSubtitle}>{edu.degree}</div>
                      <div className={styles.itemDate}>{edu.date}</div>
                      <div className={styles.itemDescription}>{edu.desc}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {addingEdu && (
              <div className={styles.eduExpItem}>
                <div className={styles.itemLogo} style={{ backgroundImage: `url(${eduInputs.logo})` }} />
                <div className={styles.itemBody}>
                  <input
                    className={styles.modalInput}
                    value={eduInputs.school}
                    onChange={e => setEduInputs({ ...eduInputs, school: e.target.value })}
                    placeholder="School"
                  />
                  <input
                    className={styles.modalInput}
                    value={eduInputs.degree}
                    onChange={e => setEduInputs({ ...eduInputs, degree: e.target.value })}
                    placeholder="Degree"
                  />
                  <input
                    className={styles.modalInput}
                    value={eduInputs.date}
                    onChange={e => setEduInputs({ ...eduInputs, date: e.target.value })}
                    placeholder="Date"
                  />
                  <input
                    className={styles.modalInput}
                    value={eduInputs.logo}
                    onChange={e => setEduInputs({ ...eduInputs, logo: e.target.value })}
                    placeholder="Logo URL"
                  />
                  <textarea
                    className={styles.modalTextarea}
                    value={eduInputs.desc}
                    onChange={e => setEduInputs({ ...eduInputs, desc: e.target.value })}
                    placeholder="Description"
                    rows={3}
                  />
                  <div style={{ marginTop: 8 }}>
                    <button className={styles.modalSave} onClick={saveAddEdu}>Add</button>
                    <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelAddEdu}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Experience */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Experience</span>
            {!addingExp && expEditIdx === null && (
              <button className={styles.addBtn} onClick={startAddExp}>+ Add Experience</button>
            )}
          </div>
          <div className={styles.eduExpList}>
            {profile.experience.map((exp, i) => (
              <div className={styles.eduExpItem} key={i}>
                <div className={styles.itemLogo} style={{ backgroundImage: `url(${exp.logo})` }} />
                <div className={styles.itemBody}>
                  <div className={styles.itemHeaderRow}>
                    {expEditIdx === i ? (
                      <>
                        <input
                          className={styles.modalInput}
                          value={expInputs.title}
                          onChange={e => setExpInputs({ ...expInputs, title: e.target.value })}
                          placeholder="Title"
                        />
                        <span className={styles.menuIcon} onClick={cancelExp}>×</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.itemTitle}>{exp.title}</span>
                        <span className={styles.menuIcon} onClick={() => startEditExp(i)}>⋮</span>
                      </>
                    )}
                  </div>
                  {expEditIdx === i ? (
                    <>
                      <input
                        className={styles.modalInput}
                        value={expInputs.company}
                        onChange={e => setExpInputs({ ...expInputs, company: e.target.value })}
                        placeholder="Company"
                      />
                      <input
                        className={styles.modalInput}
                        value={expInputs.date}
                        onChange={e => setExpInputs({ ...expInputs, date: e.target.value })}
                        placeholder="Date"
                      />
                      <input
                        className={styles.modalInput}
                        value={expInputs.logo}
                        onChange={e => setExpInputs({ ...expInputs, logo: e.target.value })}
                        placeholder="Logo URL"
                      />
                      <textarea
                        className={styles.modalTextarea}
                        value={expInputs.desc}
                        onChange={e => setExpInputs({ ...expInputs, desc: e.target.value })}
                        placeholder="Description"
                        rows={3}
                      />
                      <div style={{ marginTop: 8 }}>
                        <button className={styles.modalSave} onClick={saveExp}>Save</button>
                        <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelExp}>Cancel</button>
                        <button className={styles.removeSkill} style={{ marginLeft: 8 }} onClick={() => removeExp(i)}>Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.itemSubtitle}>{exp.company}</div>
                      <div className={styles.itemDate}>{exp.date}</div>
                      <div className={styles.itemDescription}>{exp.desc}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {addingExp && (
              <div className={styles.eduExpItem}>
                <div className={styles.itemLogo} style={{ backgroundImage: `url(${expInputs.logo})` }} />
                <div className={styles.itemBody}>
                  <input
                    className={styles.modalInput}
                    value={expInputs.title}
                    onChange={e => setExpInputs({ ...expInputs, title: e.target.value })}
                    placeholder="Title"
                  />
                  <input
                    className={styles.modalInput}
                    value={expInputs.company}
                    onChange={e => setExpInputs({ ...expInputs, company: e.target.value })}
                    placeholder="Company"
                  />
                  <input
                    className={styles.modalInput}
                    value={expInputs.date}
                    onChange={e => setExpInputs({ ...expInputs, date: e.target.value })}
                    placeholder="Date"
                  />
                  <input
                    className={styles.modalInput}
                    value={expInputs.logo}
                    onChange={e => setExpInputs({ ...expInputs, logo: e.target.value })}
                    placeholder="Logo URL"
                  />
                  <textarea
                    className={styles.modalTextarea}
                    value={expInputs.desc}
                    onChange={e => setExpInputs({ ...expInputs, desc: e.target.value })}
                    placeholder="Description"
                    rows={3}
                  />
                  <div style={{ marginTop: 8 }}>
                    <button className={styles.modalSave} onClick={saveAddExp}>Add</button>
                    <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelAddExp}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Column */}
      <div className={styles.sidebarCol}>
        {/* Languages */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Languages</span>
            {!addingLang && langEditIdx === null && (
              <button className={styles.addBtn} onClick={startAddLang}>+ Add Language</button>
            )}
          </div>
          <div className={styles.sectionContent}>
            {profile.languages.map((lang, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {langEditIdx === i ? (
                  <>
                    <input
                      className={styles.modalInput}
                      value={langInput}
                      onChange={e => setLangInput(e.target.value)}
                      placeholder="Language"
                    />
                    <button className={styles.modalSave} onClick={saveLang}>Save</button>
                    <button className={styles.addBtn} style={{ marginLeft: 4 }} onClick={cancelLang}>Cancel</button>
                    <button className={styles.removeSkill} style={{ marginLeft: 4 }} onClick={() => removeLang(i)}>Delete</button>
                  </>
                ) : (
                  <>
                    <span>{lang}</span>
                    <span className={styles.menuIcon} style={{ cursor: 'pointer' }} onClick={() => startEditLang(i)}>⋮</span>
                  </>
                )}
              </div>
            ))}
            {addingLang && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <input
                  className={styles.modalInput}
                  value={langInput}
                  onChange={e => setLangInput(e.target.value)}
                  placeholder="Language"
                />
                <button className={styles.modalSave} onClick={saveAddLang}>Add</button>
                <button className={styles.addBtn} style={{ marginLeft: 4 }} onClick={cancelAddLang}>Cancel</button>
              </div>
            )}
          </div>
        </div>
        {/* Contact Info */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Contact Information</span>
            {!addingContact && contactEditIdx === null && (
              <button className={styles.addBtn} onClick={startAddContact}>+ Add Contact</button>
            )}
          </div>
          <div className={styles.sectionContent}>
            {profile.contact.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {contactEditIdx === i ? (
                  <>
                    <input
                      className={styles.modalInput}
                      value={contactInput}
                      onChange={e => setContactInput(e.target.value)}
                      placeholder="Contact Info"
                    />
                    <button className={styles.modalSave} onClick={saveContact}>Save</button>
                    <button className={styles.addBtn} style={{ marginLeft: 4 }} onClick={cancelContact}>Cancel</button>
                    <button className={styles.removeSkill} style={{ marginLeft: 4 }} onClick={() => removeContact(i)}>Delete</button>
                  </>
                ) : (
                  <>
                    <span>{c}</span>
                    <span className={styles.menuIcon} style={{ cursor: 'pointer' }} onClick={() => startEditContact(i)}>⋮</span>
                  </>
                )}
              </div>
            ))}
            {addingContact && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <input
                  className={styles.modalInput}
                  value={contactInput}
                  onChange={e => setContactInput(e.target.value)}
                  placeholder="Contact Info"
                />
                <button className={styles.modalSave} onClick={saveAddContact}>Add</button>
                <button className={styles.addBtn} style={{ marginLeft: 4 }} onClick={cancelAddContact}>Cancel</button>
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
            {profile.skills.map((skill, i) => (
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
                <button className={styles.addBtn} style={{ marginLeft: 8 }} onClick={cancelAddSkill}>Cancel</button>
              </>
            ) : (
              <div className={styles.addSkillTag} onClick={startAddSkill}>+ add skill</div>
            )}
          </div>
        </div>
        {/* People You May Know */}
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>People you may know</span>
          </div>
          <div className={styles.peopleList}>
            {profile.people.map((person, i) => (
              <div className={styles.personItem} key={i}>
                <div className={styles.personInfo}>
                  <div className={styles.personPfp} style={{backgroundImage: `url(${person.avatar})`}} />
                  <div className={styles.personDetails}>
                    <div className={styles.personName}>{person.name}</div>
                    <div className={styles.personTitle}>{person.title}</div>
                  </div>
                </div>
                <button className={styles.followBtn} onClick={() => setProfile(p => ({
                  ...p,
                  people: p.people.map((pp, idx) => idx === i ? { ...pp, following: !pp.following } : pp)
                }))}>
                  {person.following ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.viewMore}>View more</div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay} onClick={closeEditModal}>
          <div className={styles.editModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Edit Profile</h2>
              <button className={styles.modalClose} onClick={closeEditModal}>×</button>
            </div>
            
            <div className={styles.modalContent}>
              {/* Profile Information Section - Moved to top for better UX */}
              <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Profile Information</h3>
                
                {/* Name Field */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <div className={styles.fieldHeader}>
                      <label className={styles.formLabel}>Full Name</label>
                      {editingField !== 'name' && (
                        <button 
                          className={styles.inlineEditBtn}
                          onClick={() => startInlineEdit('name')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    {editingField === 'name' ? (
                      <div className={styles.inlineEditContainer}>
                        <input
                          type="text"
                          value={editValues.name}
                          onChange={(e) => handleInlineChange('name', e.target.value)}
                          className={styles.formInput}
                          autoFocus
                        />
                        <div className={styles.inlineEditActions}>
                          <button 
                            className={styles.inlineSaveBtn}
                            onClick={() => saveInlineEdit('name')}
                          >
                            Save
                          </button>
                          <button 
                            className={styles.inlineCancelBtn}
                            onClick={cancelInlineEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.displayValue}>{editForm.name}</div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.fieldHeader}>
                      <label className={styles.formLabel}>Job Title</label>
                      {editingField !== 'jobTitle' && (
                        <button 
                          className={styles.inlineEditBtn}
                          onClick={() => startInlineEdit('jobTitle')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    {editingField === 'jobTitle' ? (
                      <div className={styles.inlineEditContainer}>
                        <input
                          type="text"
                          value={editValues.jobTitle}
                          onChange={(e) => handleInlineChange('jobTitle', e.target.value)}
                          className={styles.formInput}
                          autoFocus
                        />
                        <div className={styles.inlineEditActions}>
                          <button 
                            className={styles.inlineSaveBtn}
                            onClick={() => saveInlineEdit('jobTitle')}
                          >
                            Save
                          </button>
                          <button 
                            className={styles.inlineCancelBtn}
                            onClick={cancelInlineEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.displayValue}>{editForm.jobTitle}</div>
                    )}
                  </div>
                </div>

                {/* Location and Email Fields */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <div className={styles.fieldHeader}>
                      <label className={styles.formLabel}>Location</label>
                      {editingField !== 'location' && (
                        <button 
                          className={styles.inlineEditBtn}
                          onClick={() => startInlineEdit('location')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    {editingField === 'location' ? (
                      <div className={styles.inlineEditContainer}>
                        <input
                          type="text"
                          value={editValues.location}
                          onChange={(e) => handleInlineChange('location', e.target.value)}
                          className={styles.formInput}
                          autoFocus
                        />
                        <div className={styles.inlineEditActions}>
                          <button 
                            className={styles.inlineSaveBtn}
                            onClick={() => saveInlineEdit('location')}
                          >
                            Save
                          </button>
                          <button 
                            className={styles.inlineCancelBtn}
                            onClick={cancelInlineEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.displayValue}>{editForm.location}</div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.fieldHeader}>
                      <label className={styles.formLabel}>Email</label>
                      {editingField !== 'email' && (
                        <button 
                          className={styles.inlineEditBtn}
                          onClick={() => startInlineEdit('email')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    {editingField === 'email' ? (
                      <div className={styles.inlineEditContainer}>
                        <input
                          type="email"
                          value={editValues.email}
                          onChange={(e) => handleInlineChange('email', e.target.value)}
                          className={styles.formInput}
                          autoFocus
                        />
                        <div className={styles.inlineEditActions}>
                          <button 
                            className={styles.inlineSaveBtn}
                            onClick={() => saveInlineEdit('email')}
                          >
                            Save
                          </button>
                          <button 
                            className={styles.inlineCancelBtn}
                            onClick={cancelInlineEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.displayValue}>{editForm.email}</div>
                    )}
                  </div>
                </div>

                {/* Phone and Website Fields (Regular inputs) */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Website</label>
                    <input
                      type="url"
                      value={editForm.website}
                      onChange={(e) => handleFormChange('website', e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>LinkedIn</label>
                  <input
                    type="url"
                    value={editForm.linkedin}
                    onChange={(e) => handleFormChange('linkedin', e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Profile Images Section */}
              <div className={styles.imageSection}>
                <h3 className={styles.sectionTitle}>Profile Images</h3>
                
                {/* Background Image */}
                <div className={styles.imageUploadGroup}>
                  <label className={styles.imageLabel}>Background Image</label>
                  <div className={styles.imagePreview} style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                      className={styles.imageInput}
                      id="background-image"
                    />
                    <label htmlFor="background-image" className={styles.imageUploadBtn}>
                      Upload Background Image
                    </label>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className={styles.imageUploadGroup}>
                  <label className={styles.imageLabel}>Profile Picture</label>
                  <div className={styles.profileImagePreview}>
                    <div className={styles.profileImage} style={{ backgroundImage: `url(${profileImage})` }} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className={styles.imageInput}
                      id="profile-image"
                    />
                    <label htmlFor="profile-image" className={styles.imageUploadBtn}>
                      Upload Profile Photo
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.modalCancel} onClick={closeEditModal}>
                Cancel
              </button>
              <button className={styles.modalSave} onClick={saveAllChanges}>
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview; 