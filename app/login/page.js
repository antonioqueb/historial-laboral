

import Login from '@/components/Login';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen p-24">
      
        <Login />
    
    </main>
  );
}
  



















// // app\login\page.js
// import { loginUser } from "@/utils/login";
// import { revalidatePath } from "next/cache";
// import { redirect } from 'next/navigation';

// export default function LoginPage() {
//   async function handleSignIn(data) {
//     "use server";

//     const email = data.get('email');
//     const password = data.get('password');
       
//     let user;
//     try {
//       user = await loginUser(email, password);
//       if (!user) {
//         throw new Error("Error de inicio de sesión");
//       }
//       console.log("User logged in successfully:", user);
//     } catch (error) {
//       console.error("Error logging in user:", error);
//       return;
//     }

//     // Asegúrate de que la redirección se ejecute solo si el usuario se ha autenticado correctamente
//     redirect('/iniciar-proyecto');
   
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
//         <form action={handleSignIn} className="space-y-6" >
//           <div>
//             <label htmlFor="email" className="block text-lg font-medium text-zinc-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-lg font-medium text-zinc-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
