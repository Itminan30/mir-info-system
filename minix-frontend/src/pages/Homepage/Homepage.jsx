import { Outlet } from "react-router";
import Navigation from "../../Components/Shared/Navigation";
import Footer from "../../Components/Shared/Footer";

const Homepage = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Homepage;