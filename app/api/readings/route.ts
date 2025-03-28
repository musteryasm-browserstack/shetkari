export async function GET(request: Request) {
    console.log(request);
    try {
        return Response.json({ status: "success", message: "Select sensor buddy!", data: [] });
    } catch (error) {
        console.log(error);
        return Response.json({ status: "error", message: "Error fetching", data: null });
    }
}