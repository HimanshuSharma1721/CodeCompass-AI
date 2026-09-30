import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <ChatBox />
    </div>
  );
}

export default Home;