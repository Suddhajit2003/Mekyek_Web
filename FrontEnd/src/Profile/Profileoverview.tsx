import React from 'react';
import styles from './Css/Profileoverview.module.css';

const ProfileOverview: React.FC = () => {
  return (
    <div className={`${styles.profile} ${styles.section}`}>
      {/* Background Image Container */}
      <div className={styles.bgImageContainer}>
        <div className={styles.bgImage}></div>
      </div>

      {/* Profile Picture */}
      <div className={styles.pfp}></div>

      {/* Name */}
      <div className={styles.name}>Alex Morgan</div>

      {/* Job Title */}
      <div className={styles.jobTitle}>Senior UX Designer at TechGrowth Inc.</div>

      {/* Location */}
      <div className={styles.locationContainer}>
        <div className={styles.locationIcon}>📍</div>
        <div className={styles.locationText}>San Francisco, CA</div>
      </div>

      {/* Connections and Followers */}
      <div className={styles.connectionsFollowers}>
        <div className={styles.connections}>723 connections</div>
        <div className={styles.followers}>1258 followers</div>
      </div>

      {/* Edit Profile Button */}
      <button className={styles.editProfileBtn}>
        <div className={styles.editProfileIcon}>✏️</div>
        <div className={styles.editProfileText}>Edit Profile</div>
      </button>

      {/* Profile Completion */}
      <div className={styles.profileCompletion}>
        <div className={styles.progressBar}>
          <div className={styles.progressBg}></div>
          <div className={styles.progressCircle}></div>
          <div className={styles.progressText}>97%</div>
        </div>
        <div className={styles.completionText}>Profile Completion</div>
      </div>

      {/* About Section */}
      <div className={`${styles.aboutSection} ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>About Me</div>
          <div className={styles.editIcon}>✏️</div>
        </div>
        <div className={styles.sectionContent}>
          <div>
            Passionate UX Designer with 8+ years of experience creating user-centered digital 
            experiences for leading tech companies. Specialized in product design, user research, 
            and design systems. Committed to crafting intuitive interfaces that solve real user 
            problems while achieving business goals.
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className={`${styles.languagesSection} ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Languages</div>
          <div className={styles.editIcon}>✏️</div>
        </div>
        <div className={styles.sectionContent}>
          <div>
            English (Native)<br />
            Spanish (Professional)<br />
            French (Basic)
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className={`${styles.educationSection} ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Education</div>
          <button className={styles.addBtn}>+ Add Education</button>
        </div>
        
        <div className={styles.educationItem}>
          <div className={styles.itemHeader}>
            <div className={styles.itemInfo}>
              <div className={styles.itemLogo} style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_University_seal_2003.svg)'}}></div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTitle}>Stanford University</div>
                <div className={styles.itemSubtitle}>Master of Fine Arts, Design</div>
                <div className={styles.itemDate}>2015 - 2017</div>
              </div>
            </div>
            <div className={styles.menuIcon}>⋮</div>
          </div>
          <div className={styles.itemDescription}>
            <div>
              Specialized in Human-Computer Interaction and User Experience Design. 
              Thesis on adaptive interfaces for diverse user needs.
            </div>
          </div>
        </div>

        <div className={styles.educationItem}>
          <div className={styles.itemHeader}>
            <div className={styles.itemInfo}>
              <div className={styles.itemLogo} style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg)'}}></div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTitle}>University of California, Berkeley</div>
                <div className={styles.itemSubtitle}>Bachelor of Arts, Graphic Design</div>
                <div className={styles.itemDate}>2011 - 2015</div>
              </div>
            </div>
            <div className={styles.menuIcon}>⋮</div>
          </div>
          <div className={styles.itemDescription}>
            <div>
              Graduated with honors. Coursework in visual communication, typography, 
              and digital media design.
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className={`${styles.experienceSection} ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Experience</div>
          <button className={styles.addBtn}>+ Add Experience</button>
        </div>
        
        <div className={styles.experienceItem}>
          <div className={styles.itemHeader}>
            <div className={styles.itemInfo}>
              <div className={styles.itemLogo} style={{backgroundImage: 'url(https://via.placeholder.com/89x89/003F88/FFFFFF?text=TG)'}}></div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTitle}>Senior UX Designer</div>
                <div className={styles.itemSubtitle}>TechGrowth Inc.</div>
                <div className={styles.itemDate}>Jan 2022 - Present • San Francisco, CA</div>
              </div>
            </div>
            <div className={styles.menuIcon}>⋮</div>
          </div>
          <div className={styles.itemDescription}>
            <div>
              Leading UX design for enterprise SaaS products. Established design system 
              that improved design consistency by 40% and reduced development time by 25%. 
              Conducted user research and usability testing to optimize product experience.
            </div>
          </div>
        </div>

        <div className={styles.experienceItem}>
          <div className={styles.itemHeader}>
            <div className={styles.itemInfo}>
              <div className={styles.itemLogo} style={{backgroundImage: 'url(https://via.placeholder.com/89x89/0066CC/FFFFFF?text=IT)'}}></div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTitle}>UX Designer</div>
                <div className={styles.itemSubtitle}>InnovateTech</div>
                <div className={styles.itemDate}>Mar 2019 - Dec 2021 • New York, NY</div>
              </div>
            </div>
            <div className={styles.menuIcon}>⋮</div>
          </div>
          <div className={styles.itemDescription}>
            <div>
              Designed user interfaces for mobile and web applications. Collaborated with 
              product managers and engineers to define product requirements and implement 
              design solutions. Created wireframes, prototypes, and high-fidelity mockups.
            </div>
          </div>
        </div>

        <div className={styles.experienceItem}>
          <div className={styles.itemHeader}>
            <div className={styles.itemInfo}>
              <div className={styles.itemLogo} style={{backgroundImage: 'url(https://via.placeholder.com/89x89/FF6600/FFFFFF?text=DH)'}}></div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTitle}>UX Designer</div>
                <div className={styles.itemSubtitle}>DesignHub Agency</div>
                <div className={styles.itemDate}>Jun 2017 - Feb 2019 • Chicago, IL</div>
              </div>
            </div>
            <div className={styles.menuIcon}>⋮</div>
          </div>
          <div className={styles.itemDescription}>
            <div>
              Created digital experiences for various clients across industries. Developed 
              brand guidelines and visual design systems. Conducted competitive analysis 
              and user research to inform design decisions.
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className={`${styles.contactSection} ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Contact Information</div>
          <div className={styles.editIcon}>✏️</div>
        </div>
        <div className={styles.sectionContent}>
          <div>
            alex.morgan@example.com<br />
            www.alexmorgan.design<br />
            linkedin.com/in/alexmorgan
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className={`${styles.skillsSection} ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Skills</div>
        </div>
        <div className={styles.skillsContainer}>
          <div className={styles.skillTag}>Adobe XD</div>
          <div className={styles.skillTag}>Sketch</div>
          <div className={styles.skillTag}>Prototyping</div>
          <div className={styles.skillTag}>User Research</div>
          <div className={styles.skillTag}>Wireframing</div>
          <div className={styles.skillTag}>Design Thinking</div>
          <div className={styles.skillTag}>Usability Testing</div>
          <div className={styles.addSkillTag}>+ add skill</div>
        </div>
      </div>

      {/* People You May Know Section */}
      <div className={styles.peopleSection}>
        <div className={styles.peopleContent}>
          <div className={styles.sectionTitle}>People you may know</div>
          <div className={styles.peopleList}>
            <div className={styles.personItem}>
              <div className={styles.personInfo}>
                <div className={styles.personPfp} style={{backgroundImage: 'url(https://images.unsplash.com/photo-1494790108755-2616b332c1dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)'}}></div>
                <div className={styles.personDetails}>
                  <div className={styles.personName}>Emily Rodriguez</div>
                  <div className={styles.personTitle}>Marketing Director at TechCorp</div>
                </div>
              </div>
              <button className={styles.followBtn}>Follow</button>
            </div>
            
            <div className={styles.personItem}>
              <div className={styles.personInfo}>
                <div className={styles.personPfp} style={{backgroundImage: 'url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)'}}></div>
                <div className={styles.personDetails}>
                  <div className={styles.personName}>David Kim</div>
                  <div className={styles.personTitle}>Product Manager at StartupX</div>
                </div>
              </div>
              <button className={styles.followBtn}>Follow</button>
            </div>
            
            <div className={styles.personItem}>
              <div className={styles.personInfo}>
                <div className={styles.personPfp} style={{backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)'}}></div>
                <div className={styles.personDetails}>
                  <div className={styles.personName}>Lisa Chen</div>
                  <div className={styles.personTitle}>Data Scientist at AnalyticsPro</div>
                </div>
              </div>
              <button className={styles.followBtn}>Follow</button>
            </div>
          </div>
        </div>
        <div className={styles.viewMore}>View more</div>
      </div>
    </div>
  );
};

export default ProfileOverview; 