

function ContactInformation() {
    return (
        <div data-theme="halloween">
        <div className="contact-info flex flex-col min-h-screen justify-center items-center bg-gray-100 py-8">
            <h2 className="text-3xl font-bold mb-3 bg-gray-800 text-white">Contact Information</h2>
            <ul className="text-lg">
                <li className="mb-2">
                    <strong>Name:</strong> John Doe
                </li>
                <li className="mb-2">
                    <strong>Email:</strong> johndoe@example.com
                </li>
                <li className="mb-2">
                    <strong>Phone:</strong> +1234567890
                </li>
                <li className="mb-2">
                    <strong>Address:</strong> 123 Main Street, City, Country
                </li>
            </ul>
        </div>
        </div>
    );
}


export default ContactInformation;
