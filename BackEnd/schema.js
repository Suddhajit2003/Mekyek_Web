const joi = require('joi');
const { use } = require('./Routes/CompanyRouter');

const userSchema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    dob: joi.date().optional(),
    email: joi.string().email(),
    phoneNumber: joi.string().pattern(/^\d+$/).optional(), // Ensures numeric input as a string
    password: joi.string().min(6),
    profilePhoto: joi.string().optional(),
    country: joi.string().optional(),
    gender: joi.string().valid("Male", "Female", "Other").optional(),
    profileBanner: joi.object({
        location: joi.string().optional(),
        description: joi.string().optional(),
    }).optional(),
    about: joi.string().optional(),
    workExperience: joi.array().items(joi.object({
        title: joi.string(),
        company: joi.string(),
        location: joi.string(),
        startDate: joi.date(),
        endDate: joi.date().optional(),
        description: joi.string().optional(),
    })).optional(),
    skills: joi.array().items(joi.object({
        technicalKnowledge: joi.object({
            language: joi.array().items(joi.string()),
            framework: joi.array().items(joi.string()),
        }),
        coreKnowledge: joi.array().items(joi.string()),
        language: joi.array().items(joi.object({
            name: joi.string(),
            level: joi.string(),
        })),
    })).optional(),
    education: joi.array().items(joi.object({
        name: joi.string(),
        steam: joi.string(),
        endDate: joi.date(),
    })).optional(),
    certificate: joi.array().items(joi.object({
        name: joi.string(),
        issuedBy: joi.string(),
        courseType: joi.string(),
        duration: joi.string(),
    })).optional(),
});

const newsSchema = joi.object({
    content: joi.string().messages({
        "string.empty": "Content is required."
    }),
    date: joi.date().default(() => new Date()), // Ensures a default date
    newsPhoto: joi.string().optional(),
    author: joi.object({
        firstName: joi.string(),
        lastName: joi.string(),
        profilePhoto: joi.string().optional(),
        _id: joi.string(),
    }),
    likes: joi.number().default(0),
    likeBy: joi.array().items(joi.string()),
    comments: joi.array().items(joi.object({
        comment: joi.string().required(),
        commenter: joi.string().required(),
        createdAt: joi.date().default(() => new Date()),
        userName: joi.string().optional(),
    })),
});

const eventSchema = joi.object({
    eventType: joi.string().valid("local", "seminar", "cultural").messages({
        "any.only": "Event type must be 'local', 'seminar', or 'cultural'.",
        "string.empty": "Event type is required."
    }),
    eventName: joi.string().messages({
        "string.empty": "Event name is required."
    }),
    eventImage: joi.string().optional(),
    location: joi.string().messages({
        "string.empty": "Location is required."
    }),
    date: joi.date().messages({
        "date.base": "Invalid date format.",
        "any.required": "Date is required."
    }),
    time: joi.string().messages({
        "string.empty": "Time is required."
    }),
    author: joi.object({
        firstName: joi.string(),
        lastName: joi.string(),
        profilePhoto: joi.string().optional(),
        _id: joi.string(),
    }),
});

const jobSchema = joi.object({
    qualifications: joi.string().messages({
        "string.empty": "Qualifications are required."
    }),
    location: joi.string().messages({
        "string.empty": "Location is required."
    }),
    jobBenefits: joi.string().optional(),
    jobDescription: joi.string().messages({
        "string.empty": "Job description is required."
    }),
    role: joi.string().messages({
        "string.empty": "Role is required."
    }),
    industryType: joi.string().messages({
        "string.empty": "Industry type is required."
    }),
    department: joi.string().messages({
        "string.empty": "Department is required."
    }),
    employmentType: joi.string().valid("Full-time", "Part-time", "Remote").messages({
        "any.only": "Employment type must be 'Full-time', 'Part-time', or 'Remote'.",
        "string.empty": "Employment type is required."
    }),
    roleCategory: joi.string().messages({
        "string.empty": "Role category is required."
    }),
    salary: joi.string().messages({
        "string.empty": "Salary is required."
    }),
    experience: joi.string().messages({
        "string.empty": "Experience is required."
    }),
    jobType: joi.string().valid("Permanent", "Project", "Internship").messages({
        "any.only": "Job type must be 'Permanent', 'Project', or 'Internship'.",
        "string.empty": "Job type is required."
    }),
    postedOn: joi.date().default(() => new Date()).messages({
        "date.base": "Invalid date format."
    }),
    company : joi.object({
        companyName: joi.string(),
        companyEmail: joi.string().email(),
        companyLogo: joi.string().optional(),
        companyId: joi.string(),
    }),
});

const companyRegistrationSchema = joi.object({
    companyName: joi.string().messages({
        "string.empty": "Company name is required."
    }),
    address: joi.string().messages({
        "string.empty": "Address is required."
    }),
    email: joi.string().email().messages({
        "string.empty": "Email is required.",
        "string.email": "Invalid email format."
    }),
    motto: joi.string().optional(),
    website: joi.string().uri().optional().messages({
        "string.uri": "Invalid website URL."
    }),
    domain: joi.string().optional(),
    gstNumber: joi.string().optional(), // Verification is optional
    corporateId: joi.string().optional(), // Verification is optional
    companyLogo: joi.string().optional(), // Image URL for logo
    userId: joi.string(),
});

const jobApplySchema = joi.object({
    jobID: joi.string().messages({
        "string.empty": "Job ID is required."
    }),
    userId: joi.string().messages({
        "string.empty": "User ID is required."
    }),
    companyId: joi.string().messages({
        "string.empty": "Company ID is required."
    }),
    firstName: joi.string().messages({
        "string.empty": "First name is required."
    }),
    lastName: joi.string().messages({
        "string.empty": "Last name is required."
    }),
    email: joi.string().email().messages({
        "string.empty": "Email is required.",
        "string.email": "Invalid email format."
    }),
    phoneNumber: joi.string().pattern(/^\d+$/).messages({
        "string.empty": "Phone number is required.",
        "string.pattern.base": "Phone number must be numeric."
    }),
    resume: joi.string().optional(),
    area: joi.string().messages({
        "string.empty": "Area is required."
    }),
    cityStateCountry: joi.string().messages({
        "string.empty": "City, state, and country are required."
    }),
    getEmailUpdates: joi.boolean().default(false)
});

module.exports = { userSchema, newsSchema, eventSchema, jobSchema, companyRegistrationSchema, jobApplySchema };

