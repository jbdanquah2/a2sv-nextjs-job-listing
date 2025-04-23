const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

console.log("API_URL", API_URL);

export interface JobPosting {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: string;
    startDate: string;
    endDate: string;
    deadline: string;
    datePosted: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    createdBy: string;
    orgID: string;
    status: string;
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: any;
    perksAndBenefits: any;
    createdAt: string;
    updatedAt: string;
    orgPrimaryPhone: string;
    orgEmail: string;
    isPaid: boolean;
    average_rating: number;
    total_reviews: number;
    engagementType: string;
    paymentOption: any;
  }

export const fetchJobs = async (): Promise<JobPosting[]> => {
  if (!API_URL) {
    throw new Error('API URL is not configured. Please check your environment variables.');
  }

  try {
    const response = await fetch(`${API_URL}/opportunities/search`);

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const result = await response.json();

    return result.data;

  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getJobPosting = async (id: string): Promise<JobPosting> => {
  if (!API_URL) {
    throw new Error('API URL is not configured. Please check your environment variables.');
  }

  try {
    const response = await fetch(`${API_URL}/opportunities/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }

    const result = await response.json();

    return result.data;

  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
}; 