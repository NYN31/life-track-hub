import { Flex, Text } from '@chakra-ui/react';
import CustomInput from '../../form/CustomInput';
import { useState } from 'react';
import CustomTextarea from '../../form/CustomTextarea';
import { useDispatch, useSelector } from 'react-redux';
import OnclickButton from '../../common/button/OnclickButton';
import { ISocialLink } from '../../../types/user';
import { updateUserObject } from '../../../features/user/userSlice';
import { useUpdateUserMutation } from '../../../features/user/userApi';
import useCustomToast from '../../../helper/hook/CustomToast';
import {
  FAILED_TITLE,
  OPERATION_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../../constants/texts/title-and-message';
import GenericBox from '../../common/GenericBox';

const IntroEdit = () => {
  const dispatch = useDispatch();
  const { successToast, errorToast } = useCustomToast();

  const { userObject } = useSelector((state: any) => state.user);
  const socialLinks: ISocialLink[] = userObject?.userDetails?.socialLinks;

  const [firstname, setFirstname] = useState(userObject?.firstname);
  const [lastname, setLastname] = useState(userObject?.lastname);
  const [objective, setObjective] = useState(
    userObject?.userDetails?.objective || ''
  );
  const [facebook, setFacebook] = useState(
    (socialLinks && socialLinks[0]?.link) || ''
  );
  const [linkedIn, setLinkedIn] = useState(
    (socialLinks && socialLinks[1]?.link) || ''
  );
  const [github, setGithub] = useState(
    (socialLinks && socialLinks[2]?.link) || ''
  );
  const [stackOverflow, setStackOverflow] = useState(
    (socialLinks && socialLinks[3]?.link) || ''
  );
  const [loading, isLoading] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const introUpdateHandler = async () => {
    const newSocialLinksObject = [
      { name: 'Facebook', link: facebook },
      { name: 'LinkedIn', link: linkedIn },
      { name: 'Github', link: github },
      { name: 'StackOverflow', link: stackOverflow },
    ];

    const userUpdateRequest = {
      ...userObject,
      firstname,
      lastname,
      userDetails: {
        ...userObject.userDetails,
        objective,
        socialLinks: newSocialLinksObject,
      },
    };

    isLoading(true);
    await updateUser(userUpdateRequest)
      .then(res => {
        const { data } = res;
        dispatch(updateUserObject(data));
        localStorage.setItem('name', data.firstname + ' ' + data.lastname);
        successToast(SUCCESS_TITLE, OPERATION_SUCCESS_MESSAGE);
      })
      .catch(err => {
        errorToast(FAILED_TITLE, err.data.message);
      })
      .finally(() => isLoading(false));
  };

  return (
    <GenericBox>
      <Flex direction="column">
        <Flex
          direction={['column', 'column', 'column', 'row']}
          gap={[0, 0, 0, 4]}
        >
          <CustomInput
            value={firstname}
            setValue={setFirstname}
            isRequired={false}
            label="First name"
            type="text"
            placeholder="Enter Firstname"
            errorMessage=""
          />
          <CustomInput
            value={lastname}
            setValue={setLastname}
            isRequired={false}
            label="Last name"
            type="text"
            placeholder="Enter Lastname"
            errorMessage=""
          />
        </Flex>
        <Flex gap={[0, 0, 0, 4]}>
          <CustomTextarea
            value={objective}
            setValue={setObjective}
            isRequired={false}
            label="Objective"
            placeholder="Enter Objective"
            errorMessage=""
          />
        </Flex>

        <Text color="icon" fontSize="2xl" py={4}>
          Social Links
        </Text>
        <Flex
          direction={['column', 'column', 'column', 'row']}
          gap={[1, 1, 1, 4]}
        >
          <CustomInput
            value={facebook}
            setValue={setFacebook}
            isRequired={false}
            label="Facebook"
            type="text"
            placeholder="Link"
            errorMessage=""
          />
          <CustomInput
            value={linkedIn}
            setValue={setLinkedIn}
            isRequired={false}
            label="LinkedIn"
            type="text"
            placeholder="Link"
            errorMessage=""
          />
        </Flex>
        <Flex
          direction={['column', 'column', 'column', 'row']}
          gap={[1, 1, 1, 4]}
        >
          <CustomInput
            value={github}
            setValue={setGithub}
            isRequired={false}
            label="Github"
            type="text"
            placeholder="Link"
            errorMessage=""
          />
          <CustomInput
            value={stackOverflow}
            setValue={setStackOverflow}
            isRequired={false}
            label="StackOverflow"
            type="text"
            placeholder="Link"
            errorMessage=""
          />
        </Flex>
        <OnclickButton
          color="btn.bg"
          text="Update"
          width="auto"
          cursor={true ? 'pointer' : 'not-allowed'}
          isDisable={false}
          isLoading={loading}
          action={() => {
            introUpdateHandler();
          }}
        />
      </Flex>
    </GenericBox>
  );
};

export default IntroEdit;
