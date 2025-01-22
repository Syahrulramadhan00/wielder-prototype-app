import { About } from "../pages/About";
import { Home } from "../pages/Home";

export const routes = [
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/about',
        element: <About/>
    },
]