import React, { useState, useEffect } from "react";
import styles from "./Css/JobDitles.module.css";

interface JobDitlesProps {
  jobId: number;
  onClose: () => void;
  onApply: (jobId: number) => void;
  onSave: (jobId: number, event?: React.MouseEvent) => void;
  savedJobs: Set<number>;
  appliedJobs: Set<number>;
}

interface ApplicationData {
  coverLetter: string;
  resume: File | null;
  portfolio: string;
}

interface JobData {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  industry: string;
  datePosted: string;
  isRemote: boolean;
  companySize: string;
  companyType: string;
  description: string;
  fullDescription: string;
  requirements: string[];
  preferredSkills: string[];
  benefits: string[];
  companyInfo: {
    name: string;
    logo: string;
    website: string;
    founded: string;
    employees: string;
    industry: string;
    description: string;
  };
}

interface SuggestedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  match: string;
  logo: string;
}

const JobDitles: React.FC<JobDitlesProps> = ({
  jobId,
  onClose,
  onApply,
  onSave,
  savedJobs,
  appliedJobs,
}) => {
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [showApplicationForm, setShowApplicationForm] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    coverLetter: "",
    resume: null,
    portfolio: "",
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formProgress, setFormProgress] = useState<number>(0);

  // Sample job data - in real app, this would come from props or API
  const jobData: JobData = {
    id: jobId,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior Level",
    salary: "$120,000 - $150,000",
    industry: "Technology",
    datePosted: "2024-01-15",
    isRemote: true,
    companySize: "500-1000 employees",
    companyType: "Private",
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building cutting-edge user interfaces, implementing new features, and ensuring optimal performance of our web applications. This role offers the opportunity to work with the latest technologies and collaborate with talented professionals in a fast-paced environment.",
    fullDescription: `
      <h3>About the Role</h3>
      <p>As a Senior Frontend Developer at TechCorp Solutions, you'll be at the forefront of creating exceptional user experiences. You'll work closely with our design and backend teams to deliver high-quality, scalable web applications that serve millions of users worldwide.</p>
      
      <h3>Key Responsibilities</h3>
      <ul>
        <li>Develop and maintain responsive web applications using React and TypeScript</li>
        <li>Collaborate with UX/UI designers to implement pixel-perfect designs</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Write clean, maintainable, and well-documented code</li>
        <li>Participate in code reviews and mentor junior developers</li>
        <li>Stay up-to-date with emerging technologies and industry trends</li>
      </ul>
      
      <h3>What We Offer</h3>
      <ul>
        <li>Competitive salary and equity package</li>
        <li>Comprehensive health, dental, and vision insurance</li>
        <li>Flexible work arrangements and remote-first culture</li>
        <li>Professional development budget and conference attendance</li>
        <li>State-of-the-art equipment and tools</li>
        <li>Collaborative and inclusive work environment</li>
      </ul>
    `,
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React, TypeScript, and modern JavaScript",
      "Strong understanding of HTML5, CSS3, and responsive design",
      "Experience with state management (Redux, Context API)",
      "Proficiency in version control (Git)",
      "Knowledge of testing frameworks (Jest, React Testing Library)",
      "Experience with build tools (Webpack, Vite)",
      "Understanding of accessibility best practices",
    ],
    preferredSkills: [
      "Experience with Next.js or similar frameworks",
      "Knowledge of backend technologies (Node.js, Python)",
      "Familiarity with cloud platforms (AWS, Azure)",
      "Experience with CI/CD pipelines",
      "Understanding of performance optimization techniques",
    ],
    benefits: [
      "Health, Dental & Vision Insurance",
      "401(k) with company matching",
      "Flexible PTO policy",
      "Remote work options",
      "Professional development budget",
      "Stock options",
      "Gym membership reimbursement",
      "Catered meals and snacks",
    ],
    companyInfo: {
      name: "TechCorp Solutions",
      logo: "https://via.placeholder.com/60x60",
      website: "https://techcorp.com",
      founded: "2015",
      employees: "500-1000",
      industry: "Technology",
      description:
        "TechCorp Solutions is a leading technology company focused on creating innovative software solutions for businesses worldwide. We pride ourselves on fostering a collaborative environment where creativity and technical excellence thrive.",
    },
  };

  const suggestedJobs: SuggestedJob[] = [
    {
      id: 101,
      title: "React Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$90,000 - $120,000",
      type: "Full-time",
      match: "95% Match",
      logo: "https://via.placeholder.com/40x40",
    },
    {
      id: 102,
      title: "Frontend Engineer",
      company: "WebTech Inc",
      location: "New York, NY",
      salary: "$100,000 - $130,000",
      type: "Full-time",
      match: "92% Match",
      logo: "https://via.placeholder.com/40x40",
    },
    {
      id: 103,
      title: "UI Developer",
      company: "DesignCorp",
      location: "Austin, TX",
      salary: "$85,000 - $110,000",
      type: "Full-time",
      match: "88% Match",
      logo: "https://via.placeholder.com/40x40",
    },
    {
      id: 104,
      title: "JavaScript Developer",
      company: "CodeFactory",
      location: "Seattle, WA",
      salary: "$95,000 - $125,000",
      type: "Full-time",
      match: "90% Match",
      logo: "https://via.placeholder.com/40x40",
    },
    {
      id: 105,
      title: "Frontend Architect",
      company: "TechGiant",
      location: "San Francisco, CA",
      salary: "$140,000 - $180,000",
      type: "Full-time",
      match: "85% Match",
      logo: "https://via.placeholder.com/40x40",
    },
  ];

  const handleApply = async () => {
    if (appliedJobs?.has(jobId)) return;

    setIsApplying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsApplying(false);
    onApply && onApply(jobId);
  };

  const handleQuickApply = () => {
    setShowApplicationForm(true);
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!applicationData.coverLetter.trim()) {
      errors.coverLetter = "Cover letter is required";
    } else if (applicationData.coverLetter.length < 50) {
      errors.coverLetter = "Cover letter should be at least 50 characters";
    } else if (applicationData.coverLetter.length > 2000) {
      errors.coverLetter = "Cover letter should not exceed 2000 characters";
    }

    if (applicationData.portfolio && applicationData.portfolio.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(applicationData.portfolio)) {
        errors.portfolio = "Please enter a valid URL";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateProgress = (): number => {
    let progress = 0;
    if (applicationData.coverLetter.trim()) progress += 70;
    if (applicationData.resume) progress += 20;
    if (applicationData.portfolio.trim()) progress += 10;
    return Math.min(progress, 100);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsApplying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsApplying(false);
    setShowApplicationForm(false);
    onApply && onApply(jobId);
  };

  // Update progress when form data changes
  React.useEffect(() => {
    setFormProgress(calculateProgress());
  }, [applicationData]);

  const handleSaveJob = () => {
    onSave && onSave(jobId);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Posted yesterday";
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Posted ${Math.ceil(diffDays / 30)} months ago`;
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            <span className={styles.backIcon}>←</span>
            <span>Back to Jobs</span>
          </button>
          <div className={styles.headerActions}>
            <button
              className={`${styles.saveButton} ${
                savedJobs?.has(jobId) ? styles.saved : ""
              }`}
              onClick={handleSaveJob}
            >
              <span className={styles.saveIcon}>♡</span>
              <span>{savedJobs?.has(jobId) ? "Saved" : "Save Job"}</span>
            </button>
            <button className={styles.shareButton}>
              <span className={styles.shareIcon}>↗</span>
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {/* Left Side - Job Details */}
          <div className={styles.leftColumn}>
            <div className={styles.jobHeader}>
              <div className={styles.companyLogo}>
                <img src={jobData.companyInfo.logo} alt={jobData.company} />
              </div>
              <div className={styles.jobInfo}>
                <h1 className={styles.jobTitle}>{jobData.title}</h1>
                <div className={styles.companyName}>
                  <span>{jobData.company}</span>
                  <span className={styles.companySize}>
                    • {jobData.companySize}
                  </span>
                </div>
                <div className={styles.jobMeta}>
                  <span className={styles.location}>{jobData.location}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.type}>{jobData.type}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.level}>{jobData.level}</span>
                  {jobData.isRemote && (
                    <span className={styles.remoteBadge}>Remote</span>
                  )}
                </div>
                <div className={styles.salaryAndDate}>
                  <span className={styles.salary}>{jobData.salary}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.datePosted}>
                    {formatDate(jobData.datePosted)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Apply Section */}
            <div className={styles.quickApplySection}>
              <div className={styles.applyButtons}>
                <button
                  className={`${styles.applyButton} ${
                    appliedJobs?.has(jobId) ? styles.applied : ""
                  }`}
                  onClick={handleApply}
                  disabled={isApplying || appliedJobs?.has(jobId)}
                >
                  {isApplying
                    ? "Applying..."
                    : appliedJobs?.has(jobId)
                    ? "Applied"
                    : "Easy Apply"}
                </button>
                <button
                  className={styles.detailedApplyButton}
                  onClick={handleQuickApply}
                  disabled={appliedJobs?.has(jobId)}
                >
                  Apply with Cover Letter
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className={styles.jobDescription}>
              <h2>About this job</h2>
              <div className={styles.descriptionContent}>
                <p>{jobData.description}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: jobData.fullDescription }}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className={styles.requirements}>
              <h3>Required Skills & Experience</h3>
              <ul className={styles.requirementsList}>
                {jobData.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Preferred Skills */}
            <div className={styles.preferredSkills}>
              <h3>Preferred Qualifications</h3>
              <ul className={styles.preferredList}>
                {jobData.preferredSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className={styles.benefits}>
              <h3>Benefits & Perks</h3>
              <div className={styles.benefitsList}>
                {jobData.benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Information */}
            <div className={styles.companySection}>
              <h3>About {jobData.company}</h3>
              <div className={styles.companyDetails}>
                <div className={styles.companyHeader}>
                  <img
                    src={jobData.companyInfo.logo}
                    alt={jobData.company}
                    className={styles.companyLogo}
                  />
                  <div>
                    <h4>{jobData.companyInfo.name}</h4>
                    <p className={styles.companyStats}>
                      {jobData.companyInfo.industry} •{" "}
                      {jobData.companyInfo.employees} • Founded{" "}
                      {jobData.companyInfo.founded}
                    </p>
                  </div>
                </div>
                <p className={styles.companyDescription}>
                  {jobData.companyInfo.description}
                </p>
                <a
                  href={jobData.companyInfo.website}
                  className={styles.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Company Website →
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Suggested Jobs */}
          <div className={styles.rightColumn}>
            <div className={styles.suggestedJobs}>
              <h3>Jobs you might like</h3>
              <div className={styles.suggestedJobsList}>
                {suggestedJobs.map((job) => (
                  <div key={job.id} className={styles.suggestedJobCard}>
                    <div className={styles.suggestedJobHeader}>
                      <img
                        src={job.logo}
                        alt={job.company}
                        className={styles.suggestedJobLogo}
                      />
                      <div className={styles.suggestedJobInfo}>
                        <h4 className={styles.suggestedJobTitle}>
                          {job.title}
                        </h4>
                        <p className={styles.suggestedJobCompany}>
                          {job.company}
                        </p>
                        <p className={styles.suggestedJobLocation}>
                          {job.location}
                        </p>
                      </div>
                      <div className={styles.matchBadge}>
                        <span>{job.match}</span>
                      </div>
                    </div>
                    <div className={styles.suggestedJobDetails}>
                      <p className={styles.suggestedJobSalary}>{job.salary}</p>
                      <p className={styles.suggestedJobType}>{job.type}</p>
                    </div>
                    <div className={styles.suggestedJobActions}>
                      <button className={styles.viewSuggestedJob}>
                        View Job
                      </button>
                      <button className={styles.saveSuggestedJob}>Save</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Resources */}
              <div className={styles.additionalResources}>
                <h4>Career Resources</h4>
                <div className={styles.resourcesList}>
                  <a href="#" className={styles.resourceItem}>
                    <span className={styles.resourceIcon}>📝</span>
                    <div>
                      <h5>Interview Tips</h5>
                      <p>Prepare for your next interview</p>
                    </div>
                  </a>
                  <a href="#" className={styles.resourceItem}>
                    <span className={styles.resourceIcon}>💼</span>
                    <div>
                      <h5>Resume Builder</h5>
                      <p>Create a professional resume</p>
                    </div>
                  </a>
                  <a href="#" className={styles.resourceItem}>
                    <span className={styles.resourceIcon}>💰</span>
                    <div>
                      <h5>Salary Insights</h5>
                      <p>Research market rates</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className={styles.applicationModal}>
            <div className={styles.applicationForm}>
              <div className={styles.applicationHeader}>
                <h3>Apply to {jobData.title}</h3>
                <button
                  className={styles.closeModal}
                  onClick={() => setShowApplicationForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleApplicationSubmit}>
                {/* Progress Indicator */}
                <div className={styles.progressIndicator}>
                  <h4>Application Progress ({formProgress}% Complete)</h4>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${formProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Application Tips */}
                <div className={styles.applicationTips}>
                  <h4>Application Tips</h4>
                  <ul>
                    <li>Highlight your relevant skills and experience</li>
                    <li>Show enthusiasm for the role and company</li>
                    <li>Keep your cover letter concise but compelling</li>
                    <li>Proofread for grammar and spelling errors</li>
                  </ul>
                </div>

                <div className={`${styles.formGroup} ${formErrors.coverLetter ? styles.error : applicationData.coverLetter.length > 50 ? styles.success : ''}`}>
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        coverLetter: e.target.value,
                      })
                    }
                    placeholder="Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Developer position at TechCorp Solutions. With my extensive experience in React, TypeScript, and modern web development, I am confident I would be a valuable addition to your team.

In my previous role, I successfully led the development of several large-scale applications, resulting in improved user engagement and performance. I am particularly excited about this opportunity because...

Thank you for considering my application. I look forward to discussing how my skills can contribute to your team's success."
                    rows={8}
                    required
                  />
                  <div className={`${styles.characterCounter} ${
                    applicationData.coverLetter.length > 1800 ? styles.warning : 
                    applicationData.coverLetter.length > 2000 ? styles.error : ''
                  }`}>
                    {applicationData.coverLetter.length}/2000 characters
                  </div>
                  {formErrors.coverLetter && (
                    <div className={`${styles.helperText} ${styles.error}`}>
                      {formErrors.coverLetter}
                    </div>
                  )}
                  {!formErrors.coverLetter && applicationData.coverLetter.length > 50 && (
                    <div className={styles.helperText}>
                      Great! Your cover letter looks good.
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resume">Resume</label>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        resume: e.target.files?.[0] || null,
                      })
                    }
                  />
                  <div className={styles.helperText}>
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
                  </div>
                  {applicationData.resume && (
                    <div className={styles.fileUploadInfo}>
                      <span className={styles.fileIcon}>📄</span>
                      <span>Selected: {applicationData.resume.name}</span>
                    </div>
                  )}
                </div>

                <div className={`${styles.formGroup} ${formErrors.portfolio ? styles.error : applicationData.portfolio.trim() && !formErrors.portfolio ? styles.success : ''}`}>
                  <label htmlFor="portfolio">Portfolio URL (Optional)</label>
                  <input
                    type="url"
                    id="portfolio"
                    value={applicationData.portfolio}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        portfolio: e.target.value,
                      })
                    }
                    placeholder="https://yourportfolio.com"
                  />
                  {formErrors.portfolio && (
                    <div className={`${styles.helperText} ${styles.error}`}>
                      {formErrors.portfolio}
                    </div>
                  )}
                  {!formErrors.portfolio && applicationData.portfolio.trim() && (
                    <div className={styles.helperText}>
                      Portfolio URL looks valid!
                    </div>
                  )}
                  {!applicationData.portfolio.trim() && (
                    <div className={styles.helperText}>
                      Add your portfolio to showcase your work (optional but recommended)
                    </div>
                  )}
                </div>
                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setShowApplicationForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.submitButton} ${isApplying ? styles.loading : ''}`}
                    disabled={isApplying || formProgress < 70}
                  >
                    {isApplying ? (
                      <>
                        <span>Submitting Application</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        {formProgress < 70 && <span> (Complete required fields)</span>}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDitles; 