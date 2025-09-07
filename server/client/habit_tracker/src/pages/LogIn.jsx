import './LogInRegister.css';
import Fitness from "../assets/Oral care-bro.svg"; // took this img from https://storyset.com/
import Logo from "../assets/logo.png"; // made this logo from https://www.namecheap.com/logo-maker/
import AuthForm from "../components/AuthForm";

const LogIn = () => {
    return (
        <div className="container">
            <div className="logo"><img src={Logo} alt="logo" /></div>

            <div className="login-wrapper">
                <div className="login-illustration">
                    <img src={Fitness} alt="Fitness Illustration" />
                </div>

                <AuthForm isLogin={true} />
            </div>
        </div>
    );
};

export default LogIn;
