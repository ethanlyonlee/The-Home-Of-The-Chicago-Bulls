import {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import './Login.css'

function Login({setUser, setIsAuthenticated, isAuthenticated, user}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    const [error, setError] = useState(null)

    function submitHandler(e){
        e.preventDefault();

        const user = {
            username,
            password 
        }
        
        fetch("/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then(user => {
                    setUser(user)
                    setIsAuthenticated(true)
                    history.push("/")
                    e.target.reset()
                })
            } else {
                res.json()
                .then(json => {setError(json.error)})
            }
        })        
    }

    return(
        <div id="login-box">
            <h1 id="login_h1">Welcome back! Please Log In.</h1>
                <form onSubmit={(e) => submitHandler(e)}>
                    <div>
                        <p id="login2">Username</p>
                        <input type="text" id="login_placeholder" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required></input>
                        <p id="login2">Password</p>
                        <input type="password" id="login_placeholder"placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required></input>
                        <br></br>
                        <input type="submit" id="submit-login" value="Log In"></input>
                        <br/>
                        {error ? <p>{error}</p> : null}
                        {user ? <p>Login successful! Welcome, {user.first_name}</p> : null}
                        <Link to='/Signup' id='login-to-signup-link'>New user? Sign up here.</Link>
                    </div>
                </form>
        </div>
    )
}
export default Login;