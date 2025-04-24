import { getServerSession } from 'next-auth';
import PostCard from '../components/PostCard/PostCard'
import { fetchJobs, JobPosting } from '../lib/services/jobPostingsService'
import { redirect } from 'next/navigation';
import { authOptions } from "@/lib/auth"; 

export default async function Home() {

  const session = await getServerSession(authOptions);

  console.log("session###", session);

  if (!session) {
    redirect('/login');
  }
  
  const jobPostings: JobPosting[] = await fetchJobs();

  console.log("jobPostings****", jobPostings);

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
        {jobPostings.map((jobPosting: JobPosting) => (
          <PostCard key={jobPosting.id} jobPosting={jobPosting}/>
        ))}
      </div>
    </div>
  )
}
