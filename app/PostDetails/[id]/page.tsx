import { getJobPosting } from "@/app/services/jobsService";
import PostDetails from "./PostDetails";

export const dynamic = "force-dynamic";

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
    const jobPosting = await getJobPosting(params.id);

    if (!jobPosting) return null;

    return (
        <div>
            <PostDetails {...jobPosting} />
        </div>
    );
}