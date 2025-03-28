// import {
//     // SignJWT,
//     jwtVerify
// } from "jose";
// import { cookies } from "next/headers";
// import { SessionUserType } from "./types";
// // import { SessionUserType } from "./types";
// // import { NextRequest, NextResponse } from "next/server";
// // import { SessionUserType } from "./types";

// const secretKey: string = process.env.JWT_SECRET as string;
// const key = new TextEncoder().encode(secretKey);

// export async function decrypt(input: string): Promise<object> {
//     const { payload } = await jwtVerify(input, key, {
//         algorithms: ["HS256"],
//     });
//     return payload;
// }

// export async function logout() {
//     // Destroy the session
//     (await
//         // Destroy the session
//         cookies()).set("session", "", { expires: new Date(0) });
// }

// export async function decryptSession() {
//     try {
//         const session = (await cookies()).get("session")?.value as string;
//         if (!session)
//             return null;
//         const result: { payload: SessionUserType } = await jwtVerify(session, key, {
//             algorithms: ["HS256"],
//         });
//         return {
//             jwt: session,
//             user: result.payload
//         };
//     } catch (error) {
//         console.log("Error in authentication :: decryptSession() :: ", error);
//         return null
//     }
// }

// export async function getSession() {
//     return await decryptSession();
// }