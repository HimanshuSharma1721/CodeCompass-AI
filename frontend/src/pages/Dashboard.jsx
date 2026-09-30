import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadCard from "../components/UploadCard";
import ChatWindow from "../components/ChatWindow";

function Dashboard() {

    const [repositoryUploaded, setRepositoryUploaded] = useState(false);

    return (

        <div className="flex h-screen bg-white">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Topbar />

                <main className="flex-1 overflow-hidden">

                    {repositoryUploaded ? (

                        <ChatWindow />

                    ) : (

                        <UploadCard
                            onUploadSuccess={() =>
                                setRepositoryUploaded(true)
                            }
                        />

                    )}

                </main>

            </div>

        </div>

    );

}

export default Dashboard;