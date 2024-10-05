import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-screen bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center md:items-start space-y-8 md:space-y-0">
        <div className="w-full md:w-1/4 px-4">
          <h3 className="text-lg font-bold mb-3">About</h3>
          <p className="text-sm">
            This blog is developed with passion and dedication to provide
            insightful articles on various topics. Stay tuned for more updates!
          </p>
        </div>

        <div className="w-full md:w-1/4 px-4">
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/mukunda.parajuli.1232"
              className="text-white text-2xl hover:scale-125"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/m76760052"
              className="text-white text-2xl hover:scale-125"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/in/mukundaparajuli"
              className="text-white text-2xl hover:scale-125"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/mukundaparajuli"
              className="text-white text-2xl hover:scale-125"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        &copy; 2024 Mukunda Parajuli. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
