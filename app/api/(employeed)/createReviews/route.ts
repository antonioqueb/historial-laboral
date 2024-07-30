// // app\api\(employeed)\createReviews\route.ts
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//     const session = await getServerSession({ req, ...authOptions });
//     if (!session || !session.user) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const {
//         employeeId,
//         companyId,
//         title, // Sigue recibiendo el título pero será opcional
//         description,
//         rating,
//         positive,
//         documentation,
//         userId
//     } = await req.json();

//     if (!userId) {
//         return NextResponse.json({ error: "Failed to fetch user ID" }, { status: 500 });
//     }

//     const userCompany = await prisma.company.findFirst({
//         where: {
//             id: companyId,
//             userId: userId
//         }
//     });

//     if (!userCompany) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const review = await prisma.review.create({
//         data: {
//             employeeId,
//             companyId,
//             title, // El título se puede omitir si es null
//             description,
//             rating,
//             positive,
//             documentation
//         },
//     });

//     return NextResponse.json({ review }, { status: 201 });
// }
