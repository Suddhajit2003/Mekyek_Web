import React, { useState } from 'react';
import styles from './Css/Learncomponents.module.css';
import jobPopupStyles from '../Landing_Page/Css/Jobpopup.module.css';
import { FaHeart } from 'react-icons/fa';

const Learncomponents: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState('');
  const [openCourse, setOpenCourse] = useState<number | null>(null);
  const [likedCourses, setLikedCourses] = useState<{ [id: number]: boolean }>({});

  const featuredCourses = [
    {
      id: 1,
      category: 'AI & Machine Learning',
      duration: '4-6 months • Professional Certificate',
      title: 'Google AI for Everyone',
      description: 'Master AI fundamentals and machine learning techniques to advance your career in the fastest-growing field.',
      instructor: 'Andrew Ng, DeepLearning.AI',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      students: '2.1M+',
      level: 'Beginner',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning'],
      price: 'Free 7-day trial',
      university: 'Stanford University'
    },
    {
      id: 2,
      category: 'Data Science',
      duration: '6-8 months • Professional Certificate',
      title: 'IBM Data Science Professional Certificate',
      description: 'Learn in-demand skills like Python, SQL, and data visualization to become job-ready in data science.',
      instructor: 'IBM Skills Network Team',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.6,
      students: '890K+',
      level: 'Intermediate',
      skills: ['Python', 'SQL', 'Data Analysis', 'Machine Learning'],
      price: 'Included in Coursera Plus',
      university: 'IBM'
    },
    {
      id: 3,
      category: 'Business',
      duration: '3-4 months • Specialization',
      title: 'Google Project Management Professional Certificate',
      description: 'Gain essential project management skills to lead teams and deliver results in any industry.',
      instructor: 'Google Career Certificates',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      students: '1.5M+',
      level: 'Beginner',
      skills: ['Project Management', 'Agile', 'Leadership', 'Communication'],
      price: '$59/month',
      university: 'Google'
    }
  ];

  const stats = {
    courses: '10,000+',
    universities: '350+',
    certificates: '500+',
    learners: '100M+'
  };

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleEnrollClick = (courseId: number) => {
    setOpenCourse(courseId);
  };

  const handleLikeToggle = (courseId: number) => {
    setLikedCourses(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const handleClosePopup = () => {
    setOpenCourse(null);
  };

  const handleViewAll = () => {
    showToastMessage('🚀 Exploring all 10,000+ courses available...');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToastMessage(`✅ Welcome to Coursera Plus! Check your inbox at ${email}`);
      setEmail('');
    } else {
      showToastMessage('⚠️ Please enter a valid email address');
    }
  };

  return (
    <div className={styles.componentsContainer}>
      {/* Toast Messages */}
      {showToast && (
        <div className={styles.toast}>
          {showToast}
        </div>
      )}

      {/* Featured Courses */}
      <h2 className={styles.featuredCoursesTitle}>Featured Courses</h2>
      <button className={styles.viewAllButton} onClick={handleViewAll}>
        view all
      </button>

      {/* course 1 */}
      <div className={styles.course1}>
        <div className={styles.courseImageContainer}>
          <div 
            className={styles.courseImage}
            style={{
              backgroundImage: `url(${featuredCourses[0].image})`
            }}
          ></div>
        </div>
        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <div className={styles.categoryBadge}>
              {featuredCourses[0].category}
            </div>
            <div className={styles.courseDuration}>
              {featuredCourses[0].duration}
            </div>
          </div>
          <div className={styles.courseInfo}>
            <div className={styles.courseDetails}>
              <h3 className={styles.courseTitle}>{featuredCourses[0].title}</h3>
              <p className={styles.courseDescription}>{featuredCourses[0].description}</p>
            </div>
          </div>
          <div className={styles.courseFooter}>
            <span className={styles.instructorName}>By {featuredCourses[0].instructor}</span>
            <button 
              className={styles.enrollButton}
              onClick={() => handleEnrollClick(featuredCourses[0].id)}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* course 2 */}
      <div className={styles.course2}>
        <div className={styles.courseImageContainer}>
          <div 
            className={styles.courseImage}
            style={{
              backgroundImage: `url(${featuredCourses[1].image})`
            }}
          ></div>
        </div>
        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <div className={styles.categoryBadge}>
              {featuredCourses[1].category}
            </div>
            <div className={styles.courseDuration}>
              {featuredCourses[1].duration}
            </div>
          </div>
          <div className={styles.courseInfo}>
            <div className={styles.courseDetails}>
              <h3 className={styles.courseTitle}>{featuredCourses[1].title}</h3>
              <p className={styles.courseDescription}>{featuredCourses[1].description}</p>
            </div>
          </div>
          <div className={styles.courseFooter}>
            <span className={styles.instructorName}>By {featuredCourses[1].instructor}</span>
            <button 
              className={styles.enrollButton}
              onClick={() => handleEnrollClick(featuredCourses[1].id)}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* course 3 */}
      <div className={styles.course3}>
        <div className={styles.courseImageContainer}>
          <div 
            className={styles.courseImage}
            style={{
              backgroundImage: `url(${featuredCourses[2].image})`
            }}
          ></div>
        </div>
        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <div className={styles.categoryBadge}>
              {featuredCourses[2].category}
            </div>
            <div className={styles.courseDuration}>
              {featuredCourses[2].duration}
            </div>
          </div>
          <div className={styles.courseInfo}>
            <div className={styles.courseDetails}>
              <h3 className={styles.courseTitle}>{featuredCourses[2].title}</h3>
              <p className={styles.courseDescription}>{featuredCourses[2].description}</p>
            </div>
          </div>
          <div className={styles.courseFooter}>
            <span className={styles.instructorName}>By {featuredCourses[2].instructor}</span>
            <button 
              className={styles.enrollButton}
              onClick={() => handleEnrollClick(featuredCourses[2].id)}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Course Details Popup */}
      {openCourse !== null && (
        <div className={jobPopupStyles.overlay} onClick={handleClosePopup}>
          <div
            className={jobPopupStyles.popup}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 600,
              minWidth: 320,
              padding: 32,
              background: '#fff',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button className={jobPopupStyles.closeBtn} onClick={handleClosePopup} aria-label="Close">&times;</button>
            {(() => {
              const course = featuredCourses.find(c => c.id === openCourse);
              if (!course) return null;
              return (
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
                  <div style={{width: '100%', height: 180, borderRadius: 12, background: `url(${course.image}) center/cover`, marginBottom: 16}}></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12, width: '100%', justifyContent: 'space-between'}}>
                    <h2 style={{margin: 0, fontSize: 24, color: '#003F88'}}>{course.title}</h2>
                    <button onClick={() => handleLikeToggle(course.id)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                      <FaHeart color={likedCourses[course.id] ? '#e31b23' : '#bbb'} size={28} />
                    </button>
                  </div>
                  <div style={{width: '100%', color: '#003F88', fontWeight: 600, marginBottom: 8}}>{course.category} • {course.duration}</div>
                  <div style={{width: '100%', color: '#222', fontSize: 16, margin: '8px 0'}}>{course.description}</div>
                  <div style={{width: '100%', color: '#666', fontSize: 15, marginBottom: 8}}>By {course.instructor} | {course.university}</div>
                  <div style={{width: '100%', margin: '8px 0', display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                    {course.skills.map((skill, i) => (
                      <span key={i} style={{background: '#e7f3ff', color: '#003F88', borderRadius: 8, padding: '4px 10px', fontSize: 13}}>{skill}</span>
                    ))}
                  </div>
                  <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                    <span style={{fontWeight: 600, color: '#003F88'}}>Level: {course.level}</span>
                    <span style={{fontWeight: 600, color: '#003F88'}}>Rating: {course.rating} ⭐</span>
                    <span style={{fontWeight: 600, color: '#003F88'}}>Students: {course.students}</span>
                  </div>
                  <div style={{width: '100%', marginTop: 16, display: 'flex', justifyContent: 'flex-end'}}>
                    <button className={styles.enrollButton} style={{fontSize: 18, padding: '10px 32px'}}>Enroll Now</button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Join 100M+ learners worldwide</h2>
          <p className={styles.newsletterDescription}>
            Start your 7-day free trial and get unlimited access to 10,000+ courses from top universities and companies like Google, IBM, and Stanford.
          </p>
        </div>
        <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
          <div className={styles.emailInput}>
            <input
              type="email"
              placeholder="Enter your email to get started"
              value={email}
              onChange={handleEmailChange}
              className={styles.emailField}
              required
            />
          </div>
          <button type="submit" className={styles.continueButton}>
            Start Free Trial
          </button>
        </form>
      </div>
    </div>
  );
};

export default Learncomponents;
