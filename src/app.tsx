import { ThemeProvider } from "@/features/theme-provider/components";
import Page from "@/pages/workout-day";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Page />
    </ThemeProvider>
  );
}

export default App;
