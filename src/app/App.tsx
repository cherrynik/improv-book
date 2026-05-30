import { BrowserRouter } from "react-router-dom";
import { LocaleProvider } from "@/shared/i18n";
import { AppRoutes } from "./routes/AppRoutes";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter basename={basename}>
        <AppRoutes />
      </BrowserRouter>
    </LocaleProvider>
  );
}
