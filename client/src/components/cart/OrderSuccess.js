import MetaData from "../layouts/MetaData";

export default function OrderSuccess() {
    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <MetaData title={"Order Success"}/>
            <img 
                className="my-5 img-fluid d-block mx-auto" 
                src="/images/success.png" 
                alt="Order Success" 
                style={{ width: '100px', height: '100px' }} 
            />

                <h2>Your Order has been placed successfully.</h2>

                <a href="/">Go to Home</a>
            </div>

        </div>
    )
}