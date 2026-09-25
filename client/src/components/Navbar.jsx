import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 border-b border-muted/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to={user ? "/home" : "/"} className="text-lg font-bold tracking-tight">
          Campus<span className="text-secondary">X</span>
        </Link>

        <nav className="flex items-center gap-1.5">
          <Link
            to={user ? "/home" : "/"}
            className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-surface"
          >
            Home
          </Link>

          {user?.role === "Admin" && (
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-surface"
            >
              Admin
            </Link>
          )}

          {user ? (
            <Link
              to="/profile"
              className="ml-1.5 rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-primary"
            >
              {user.fullName}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="ml-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
