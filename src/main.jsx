import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Users from "./components/Users.jsx";
import Update from "./components/Update.jsx";

// Loader function to fetch users data
const usersLoader = async () => {
  const response = await fetch("http://localhost:5000/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

// Loader function to fetch single user data
const userLoader = async ({ params }) => {
  const response = await fetch(`http://localhost:5000/users/${params.id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <Users />,
    loader: usersLoader,
  },
  {
    path: "/update/:id",
    element: <Update />,
    loader: userLoader,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
