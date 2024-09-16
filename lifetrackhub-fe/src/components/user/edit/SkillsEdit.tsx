import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import GenericBox from '../../common/GenericBox';
import { IUserDetails } from '../../../types/user';
import CustomInput from '../../form/CustomInput';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { ICON_SIZE_18 } from '../../../constants/common-constants';
import OnclickButton from '../../common/button/OnclickButton';
import { updateUserObject } from '../../../features/user/userSlice';
import useCustomToast from '../../../helper/hook/CustomToast';
import {
  FAILED_TITLE,
  OPERATION_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../../constants/texts/title-and-message';
import { useUpdateUserMutation } from '../../../features/user/userApi';

const SkillsEdit = () => {
  const dispatch = useDispatch();
  const { successToast, errorToast } = useCustomToast();

  const { userObject } = useSelector((state: any) => state.user);
  const { skills } =
    (userObject && (userObject.userDetails as IUserDetails)) || [];
  const [newSkill, setNewSkill] = useState('');
  const [loading, isLoading] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const skillDeleteHandler = (id: number) => {
    const userUpdateRequest = {
      ...userObject,
      userDetails: {
        ...userObject.userDetails,
        skills: skills?.filter((skill: any, index: number) => {
          if (index !== id) {
            return skill;
          }
        }),
      },
    };

    dispatch(updateUserObject(userUpdateRequest));
  };

  const skillAddHandler = () => {
    if (
      skills?.some(
        (skill: any) =>
          skill &&
          skill.name &&
          skill.name.toLowerCase() === newSkill.toLowerCase()
      )
    ) {
      errorToast(FAILED_TITLE, 'Same skill have already added!');
      return;
    }

    const userUpdateRequest = {
      ...userObject,
      userDetails: {
        ...userObject.userDetails,
        skills: [...(skills || []), { name: newSkill, description: '' }],
      },
    };

    dispatch(updateUserObject(userUpdateRequest));
    setNewSkill('');
  };

  const skillUpdateHandler = async () => {
    isLoading(true);
    const newUserObject = {
      ...userObject,
      userDetails: { ...userObject.userDetails },
    };

    await updateUser(newUserObject)
      .unwrap()
      .then(() => {
        dispatch(updateUserObject(newUserObject));
        successToast(SUCCESS_TITLE, OPERATION_SUCCESS_MESSAGE);
      })
      .catch(err => {
        errorToast(FAILED_TITLE, err.data.message);
      })
      .finally(() => isLoading(false));
  };

  return (
    <GenericBox>
      <SimpleGrid
        minChildWidth={['100px', '100px', '100px', '120px']}
        spacing="20px"
        mt={4}
      >
        {skills?.map((skill: any, index: number) => {
          return (
            <Flex
              key={index}
              height="40px"
              bg="icon"
              align="center"
              justifyContent="space-between"
              color="#FFFF"
              px={2}
              fontSize={['sm', 'sm', 'md', 'md']}
              borderRadius={4}
            >
              <Text noOfLines={1}>{skill.name}</Text>
              <Box
                color="pink"
                cursor="pointer"
                onClick={() => skillDeleteHandler(index)}
              >
                <MdDelete size={ICON_SIZE_18} />
              </Box>
            </Flex>
          );
        })}
      </SimpleGrid>
      <Flex mt={4} direction="row">
        <CustomInput
          value={newSkill}
          setValue={setNewSkill}
          isRequired={false}
          label="New skill"
          type="text"
          placeholder="Add Skill"
          errorMessage=""
        />
        <Box mt="29px">
          <OnclickButton
            color="btn.bg"
            text="Add"
            width="auto"
            cursor={true ? 'pointer' : 'not-allowed'}
            isDisable={false}
            isLoading={false}
            action={() => {
              skillAddHandler();
            }}
          />
        </Box>
      </Flex>
      <OnclickButton
        color="btn.bg"
        text="Update"
        width="full"
        cursor={true ? 'pointer' : 'not-allowed'}
        isDisable={false}
        isLoading={loading}
        action={() => {
          skillUpdateHandler();
        }}
      />
    </GenericBox>
  );
};

export default SkillsEdit;
