import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

 

const Footer = () => {
    return (
        <div className=" bg-black ">
        <footer className="footer p-10 bg-black text-base  text-white">
          <aside>
            
            <p>
            <a className="btn btn-ghost font-satis md:text-2xl  text-xl">MicroMint</a>
              <br />
              Work with talented people at the most affordable
 price to get the most out of your time and cost.
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Feature</h6>
            <a className="link link-hover">How it&apos;s work</a>
            <a className="link link-hover">Top Worker</a>
            <a className="link link-hover">Review</a>
            <a className="link link-hover">Watch Demo</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          
        </footer>
        <hr />
        <div className="text-white px-10 flex justify-between items-center py-4">
            <p>© 2024 MicroMint. All Rights Reserved.</p>
            <div className="flex gap-3 flex-wrap">
            <FaFacebook className="text-white text-3xl"/>
            <FaInstagram  className="text-white text-3xl" />
            <FaSquareXTwitter  className="text-white text-3xl"/>
            <FaLinkedin  className="text-white text-3xl"/>
            </div>
          </div>
      </div>
    );
};

export default Footer;