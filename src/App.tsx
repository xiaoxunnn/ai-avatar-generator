import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import Home from "@/pages/Home";
import UploadPage from "@/pages/UploadPage";
import StyleSelectPage from "@/pages/StyleSelectPage";
import GenerationPage from "@/pages/GenerationPage";
import ResultsPage from "@/pages/ResultsPage";

function AppContent() {
  const { currentPage, setCurrentPage } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "upload":
        return <UploadPage />;
      case "styles":
        return <StyleSelectPage />;
      case "generating":
        return <GenerationPage />;
      case "results":
        return <ResultsPage />;
      default:
        return <Home />;
    }
  };

  // Modify Home to include navigation
  if (currentPage === "home") {
    return (
      <div>
        <Home />
        {/* Navigation Overlay */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-around py-4">
              <button
                onClick={() => setCurrentPage("home")}
                className="flex flex-col items-center gap-1 text-white"
              >
                <span className="text-2xl">🏠</span>
                <span className="text-xs">首页</span>
              </button>
              <button
                onClick={() => setCurrentPage("upload")}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-2xl">✨</span>
                <span className="text-xs">创建</span>
              </button>
              <button
                onClick={() => setCurrentPage("upload")}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-2xl">📷</span>
                <span className="text-xs">编辑</span>
              </button>
              <button
                onClick={() => setCurrentPage("upload")}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-2xl">👤</span>
                <span className="text-xs">我的</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return renderPage();
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
      </Routes>
    </Router>
  );
}
