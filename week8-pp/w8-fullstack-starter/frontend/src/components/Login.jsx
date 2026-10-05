import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const user = await res.json();

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
            </label>
            <button className="login-button" onClick={handleLogin}>Log In</button>
        </div>
    );

};


export default Login;
