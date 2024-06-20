import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ResponseSearch from "@/components/ResponseSearch";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <>

      <div className="bg-[#f3f4f6] dark:bg-zinc-900 p-4">
        <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg">
          <Link href="#">
            <div className="flex flex-col sm:flex-row items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Employee Avatar" src="/employee.jpg" />
                <AvatarFallback>EE</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2 mt-4 sm:mt-0">
                <div className="font-bold dark:text-white text-xl">John Doe</div>
                <div className="text-zinc-500 dark:text-zinc-400">Senior Software Engineer</div>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Badge variant="secondary">4.5</Badge>
                <Badge variant="secondary">
                  <Link href="#">100 Reviews</Link>
                </Badge>
              </div>
            </div>
          </Link>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-800 mt-4 p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage alt="Employee Avatar" src="/employee1.jpg" />
                  <AvatarFallback>EE</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1 ">
                  <div className="font-bold dark:text-white cursor-pointer">Sarah Johnson</div>
                  <div className="text-zinc-500 dark:text-zinc-400">Product Manager</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage alt="Employee Avatar" src="/employee2.jpg" />
                  <AvatarFallback>EE</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="font-bold dark:text-white cursor-pointer">Michael Brown</div>
                  <div className="text-zinc-500 dark:text-zinc-400">UI/UX Designer</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage alt="Employee Avatar" src="/employee3.jpg" />
                  <AvatarFallback>EE</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="font-bold dark:text-white cursor-pointer">Emily Davis</div>
                  <div className="text-zinc-500 dark:text-zinc-400">Quality Assurance</div>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-4 sm:col-span-2">
              <div className="space-y-2">
                <div className="font-bold dark:text-white">About the Project</div>
                <div className="text-zinc-500 dark:text-zinc-400">
                  This project aims to create a new e-commerce platform for our client, providing a seamless shopping
                  experience for their customers.
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-bold dark:text-white">Key Features</div>
                <div className="text-zinc-500 dark:text-zinc-400">- Responsive design for all devices</div>
                <div className="text-zinc-500 dark:text-zinc-400">- Secure payment integration</div>
                <div className="text-zinc-500 dark:text-zinc-400">- Advanced search functionality</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold dark:text-white">Technologies Used</div>
                <div className="text-zinc-500 dark:text-zinc-400">- React.js for the front-end</div>
                <div className="text-zinc-500 dark:text-zinc-400">- Node.js for the back-end</div>
                <div className="text-zinc-500 dark:text-zinc-400">- MongoDB for the database</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold dark:text-white">Project Timeline</div>
                <div className="text-zinc-500 dark:text-zinc-400">- Start Date: January 1, 2023</div>
                <div className="text-zinc-500 dark:text-zinc-400">- Expected Completion: June 30, 2023</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold dark:text-white">Companies Worked With</div>
                <div className="text-zinc-500 dark:text-zinc-400 cursor-pointer">- Acme Inc.</div>
                <div className="text-zinc-500 dark:text-zinc-400 cursor-pointer">- Globex Corporation</div>
                <div className="text-zinc-500 dark:text-zinc-400 cursor-pointer">- Stark Industries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
