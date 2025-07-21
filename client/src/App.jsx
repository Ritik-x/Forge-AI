// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard";
import Writearticle from "./pages/Writearticle.jsx";
import Home from "./pages/Home.jsx";
import BlogTitle from "./pages/BlogTitle";
import Genrateimages from "./pages/Genrateimages.jsx";
import RemoveBackground from "./pages/RemoveBackground.jsx";
import RemoveObjects from "./pages/RemoveObjects.jsx";
import ReviewResume from "./pages/ReviewResume.jsx";
import Community from "./pages/Community.jsx";
// import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import FOF from "./pages/FOF.jsx";
const App = () => {
  // const { user, getToken } = useAuth();
  //
  // useEffect(() => {
  // if (user) {
  // getToken().then((token) => {
  // console.log("Clerk Token:", token);
  // });
  // }
  // }, [user]); // Only run when user changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1f1f1f] text-white">
      <Toaster />
      <Routes>
        <Route path="/*" element={<FOF />} />
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<Writearticle />} />
          <Route path="blogtitle" element={<BlogTitle />} />
          <Route path="generateimages" element={<Genrateimages />} />
          <Route path="removebackground" element={<RemoveBackground />} />
          <Route path="removeobject" element={<RemoveObjects />} />
          <Route path="reviewresume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
