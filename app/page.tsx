import PostCard from './component/PostCard/PostCard'

interface JobPosting {
  title: string;
  description: string;
  company: string;
  image: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[]; 
  }
}
export default async function Home() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let jobPostings: JobPosting[] = [];

  const response = await fetch(`${baseUrl}/jobs.json`);

  const data = await response.json();
  jobPostings = data.job_postings;


  console.log('Fetched jobs:', data);

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1 className="title">Opportunities</h1>
          <p className="results">Showing 73 results</p>
        </div>
        <div className="sort-by">
          <span className="sort-by-title">Sort by:</span>
          <select 
            className="sort-by-select"
            name="sort-by-select" 
            id="sort-by-select" 
            defaultValue="most-relevant"
          >
            <option value="all">All</option>
            <option value="most-recent">Most recent</option>
            <option value="most-popular">Most popular</option>
            <option value="most-relevant">Most relevant</option>
          </select>
        </div>
      </div>
      <div className="mt-6 px-5">
        {jobPostings.map((jobPosting: JobPosting, index: number) => (
          <PostCard key={index} jobPosting={jobPosting}/>
        ))}
      </div>
    </div>
  )
}
