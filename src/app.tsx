import { ThemeProvider } from "@/features/theme-provider/components";
import Login from "@/pages/login";
import WorkoutDayPage from "@/pages/workout-day";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkoutDayPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
