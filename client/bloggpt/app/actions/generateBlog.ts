"use server"


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
