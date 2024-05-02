import Header from "../components/header";

function ContactInformation() {
  return (
    <div>
      <Header />
      <div data-theme="halloween">
        <div className="contact-info flex flex-col min-h-screen justify-center items-center bg-gray-100 py-8">
          <h2 className="text-3xl font-bold mb-3 bg-gray-800 text-white">
            Contact Information
          </h2>
          <ul className="text-lg">
            <li className="mb-2">
              <strong>Name:</strong> Abhishek Kumar
            </li>
            <li className="mb-2">
              <strong>Email:</strong> kua77663@gmail.com
            </li>
            <li className="mb-2">
              <strong>Phone:</strong> +91-7369071679
            </li>
            <li className="mb-2">
              <strong>Address:</strong> Mardapur Siwan Bihar 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;
