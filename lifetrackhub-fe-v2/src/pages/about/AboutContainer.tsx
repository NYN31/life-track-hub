import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import MarkdownRenderer from '../../components/blog/MarkdownRenderer';
import { aboutData } from '../../constants/about-json';
import myPhoto from '../../assets/site-owner.jpeg';

const AboutContainer = () => {
  return (
    <div className="common-box flex flex-col lg:flex-row gap-6">
      <div className="p-2 md:p-6 order-2 lg:order-1 w-full lg:w-2/3">
        <h2 className="text-4xl text-center lg:text-start">{aboutData.name}</h2>
        <div className="uppercase tracking-wide text-sm text-purple-400 font-semibold text-center lg:text-start">
          {aboutData.designation}
        </div>
        <div className="mt-6 flex space-x-4 justify-center items-center lg:justify-start">
          <a
            href={aboutData.contactLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-900"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={aboutData.contactLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={aboutData.contactLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href={aboutData.contactLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTwitter size={24} />
          </a>
        </div>
        <div className="mt-4 lg:mt-8">
          <MarkdownRenderer content={aboutData.aboutContent} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row order-1 lg:order-2 w-auto lg:w-1/3 justify-center items-center lg:items-start">
        <img
          className="object-cover w-64"
          src={myPhoto}
          alt="Nayon"
          md:flex-row
          items-center
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AboutContainer;
