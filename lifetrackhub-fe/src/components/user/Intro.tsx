import GenericBox from '../common/GenericBox';
import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import PageHeading from '../common/PageHeading';
import { Link } from 'react-router-dom';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa6';
import profile_avatar from '../../assets/profile_avatar.png';
import { PROFILE_INTRO_HEADING } from '../../constants/texts/page-headings';
import { FaStackOverflow } from 'react-icons/fa';
import { ICON_SIZE_20 } from '../../constants/common-constants';
import { useSelector } from 'react-redux';
import { IUserDetails } from '../../types/user';

const Intro = () => {
  const { userObject } = useSelector((state: any) => state.user);
  const { firstname, lastname } = userObject;
  const { objective, socialLinks } = userObject.userDetails as IUserDetails;
  const facebook = socialLinks && socialLinks[0];
  const linkedIn = socialLinks && socialLinks[1];
  const github = socialLinks && socialLinks[2];
  const stackOverflow = socialLinks && socialLinks[3];

  const socialLinksDetails = [
    {
      mediaName: facebook?.name || '',
      link: facebook?.link || '#',
      icon: <FaSquareFacebook size={ICON_SIZE_20} />,
    },

    {
      mediaName: linkedIn?.name || '',
      link: linkedIn?.link || '#',
      icon: <FaLinkedin size={ICON_SIZE_20} />,
    },

    {
      mediaName: github?.name || '',
      link: github?.link || '#',
      icon: <FaGithub size={ICON_SIZE_20} />,
    },

    {
      mediaName: stackOverflow?.name || '',
      link: stackOverflow?.link || '#',
      icon: <FaStackOverflow size={ICON_SIZE_20} />,
    },
  ];

  const getLinksItem = (item: any, index: number) => {
    return (
      <Tooltip
        key={index}
        label={item?.mediaName || ''}
        placement="top"
        hasArrow
        bg="icon"
      >
        <Link to={item?.link || '#'} target="_blank">
          {item.icon}
        </Link>
      </Tooltip>
    );
  };

  return (
    <GenericBox>
      <Flex align="center" justifyContent="center">
        <PageHeading heading={PROFILE_INTRO_HEADING} />
      </Flex>
      <Flex
        mt={2}
        direction={['column', 'column', 'column', 'row']}
        gap={4}
        align="center"
        justifyContent="center"
      >
        <Flex
          direction="column"
          gap={2}
          order={{ lg: 0, md: 1, sm: 1, base: 1 }}
          align={{ lg: 'start', base: 'center' }}
        >
          <Text fontSize={{ lg: '2xl', base: 'lg' }}>
            {firstname + ' ' + lastname || 'Unknown'}
          </Text>
          <Flex color="icon" gap={4}>
            {socialLinksDetails.map((item, index) => {
              return getLinksItem(item, index);
            })}
          </Flex>
          <Text mt={4}>{objective}</Text>
        </Flex>

        <Image src={profile_avatar} w="150px" h="150px" />
      </Flex>
    </GenericBox>
  );
};

export default Intro;
