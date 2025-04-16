"use client"
import PostCard from './component/post-card/PostCard'
import {useEffect, useState} from "react";

export default function Home() {

  const [jobs, setJobs] = useState([]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(`Selected sort option: ${selectedValue}`);
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/jobs.json'); // Notice the leading slash
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const jobs = data.job_postings;


        console.log('Fetched jobs:', data);
        setJobs(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

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
        {jobs.map((job: any, index: number) => (
          <PostCard key={index} jobPost={job} />
        ))}
      </div>
    </div>
  )
}
