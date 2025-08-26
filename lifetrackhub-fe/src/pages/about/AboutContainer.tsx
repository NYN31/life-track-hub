import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import MarkdownRenderer from '../../components/blog/MarkdownRenderer';
import { aboutData } from '../../constants/about-json';
import myPhoto from '../../assets/site-owner.jpeg';

const AboutContainer = () => {
  return (
    <div className="common-box flex flex-col items-center justify-center">
      <h1>{aboutData.name}</h1>
      <div className="uppercase tracking-wide text-sm text-purple-400 font-semibold text-center">
        {aboutData.designation}
      </div>
      <div className="my-3 flex space-x-8 justify-center items-center lg:justify-start">
        <a
          href={aboutData.contactLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
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

      <img
        className="object-cover w-48 md:w-64 h-48 md:h-64 rounded-full"
        src={myPhoto}
        alt="Nayon"
        md:flex-row
        items-center
        loading="lazy"
      />

      <div className="mt-4 lg:mt-8">
        <MarkdownRenderer content={aboutData.aboutContent} />
      </div>
    </div>
  );
};

export default AboutContainer;
