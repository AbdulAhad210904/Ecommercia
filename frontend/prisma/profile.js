import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getUserProfile = async (id)=>{
     const user =await prisma.users.findUnique({
        where: {
            id: id
        }
    });
    console.log(user);
    return user;
}


// export default updateUserProfile = async (id, data)=>{
//     const user = await prisma.user.update({
//         where: {
//             id: id
//         },
//         data: data
//     });
//     return user;
// }