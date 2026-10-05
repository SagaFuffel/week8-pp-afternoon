import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await fetch("/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                phoneNumber,
                name,
                role,
            }),
        });

        const user = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <div>
            <h2>Signup</h2>

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

            <label>
                Phonenumber:
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="phonenumber"
                />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </label>

            <label>
                Role:
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="user"
                />
            </label>

            <button onClick={handleSignup}>Sign up</button>
        </div>
    );
};

export default Signup;
