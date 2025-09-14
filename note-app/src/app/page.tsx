import SpotlightCard from "@/components/SpotlightCard";
// import { GetServerSessionHere } from "./api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

const DashboardPage = () => {

  return (
    <div className="mainContainer pt-36 md:px-20 px-5 min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">

        {/* Page Title */}
      <h1 className="text-white text-2xl font-bold text-center">Your Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">

        {/* Spotlight Card */}
        <SpotlightCard
          className="custom-spotlight-card flex flex-row"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="flex flex-col">

            {/* Card Title and Delete Button */}
            <div className="action h-10 flex justify-between items-center">
              <h1 className="text-white text-2xl font-bold line-clamp-1">Card Title</h1>
              <Button
                variant="outline"
                className="md:w-10 md:h-10 cursor-pointer hover:text-red-700 font-bold"
              >
                <FaTrash className="text-red-500" />
              </Button>
            </div>

            {/* Card Content */}
            <div className="mt-5">
                <div className="max-h-[190px] md:h-auto overflow-hidden">
                    <p className="text-white md:text-sm mt-2 md:max-w-lg line-clamp-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempore, molestias voluptates nam necessitatibus iste veritatis dolores maiores commodi exercitationem blanditiis nulla quis recusandae voluptate voluptatibus. Rem, vitae. Reprehenderit, perferendis?
                    </p>
                </div>
              <h1 className="text-white md:text-xs mt-5 text-end">
                Created: 15/09/2025
              </h1>
            </div>

          </div>

        </SpotlightCard>

      </div>

    </div>
  );
};

export default DashboardPage;
