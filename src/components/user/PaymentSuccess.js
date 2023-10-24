import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckBadgeIcon  from '@heroicons/react/24/solid/CheckBadgeIcon'
AOS.init();

function PaymentSuccess() {
      
    return(
        <div className="hero h-4/5">
            <div className="hero-content text-success text-center">
                <div className="max-w-md">
                <CheckBadgeIcon className="h-48 w-48 inline-block"/>
                <h1 className="text-5xl mt-2 font-bold">Payment Success</h1>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess;
