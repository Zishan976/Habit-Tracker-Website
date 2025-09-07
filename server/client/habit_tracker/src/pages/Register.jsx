import './LogInRegister.css';
import Healthyness from "../assets/Boost your immune system-bro.svg"; // took this img from https://storyset.com/
import Logo from "../assets/logo.png"; // made this logo from https://www.namecheap.com/logo-maker/
import AuthForm from "../components/AuthForm";

const Register = () => {
    return (
        <div className="container">
            <div className="logo"><img src={Logo} alt="logo" /></div>

            <div className="login-wrapper">
                <AuthForm isLogin={false} />

                <div className="login-illustration">
                    <img src={Healthyness} alt="Fitness Illustration" />
                </div>
            </div>
        </div>
    );
};

export default Register;
