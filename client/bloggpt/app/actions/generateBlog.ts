// "use server"


// export async function generateBlog(topic: string) {
//     // This is a mock API call. Replace with your actual FastAPI endpoint.
//     const response = await fetch('http://127.0.0.1:8000/generate-blog/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ topic }),
//     })

//     if (!response.ok) {
//         throw new Error('Failed to generate blog')
//     }

//     const data = await response.json()
//     console.log(data.blog)
//     // Assuming the API returns markdown, convert it to HTML
//     // return marked(data.blog)
// }


// interface GenerateBlogResponse {
//     blog: string;
//     raw: string
// }

export const generateBlog = async (topic: string): Promise<any> => {
    try {
        const response = await fetch("http://127.0.0.1:8002/generate-blog/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate blog");
        }
        const result = await response.json()
        console.log(result)
        return (result);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
