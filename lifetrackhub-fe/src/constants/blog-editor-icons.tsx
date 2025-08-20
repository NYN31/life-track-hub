import { RiH1 } from 'react-icons/ri';
import { RiH2 } from 'react-icons/ri';
import { RiH3 } from 'react-icons/ri';
import { AiOutlineBold } from 'react-icons/ai';
import { AiOutlineItalic } from 'react-icons/ai';
import { AiOutlineUnderline } from 'react-icons/ai';
import { FaCode } from 'react-icons/fa';
import { RiCodeBlock } from 'react-icons/ri';
import { FaLink } from 'react-icons/fa6';
import { FaRegImage } from 'react-icons/fa';
import { FaListOl } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';

const ICON_SIZE = 20;

export const customItemsForMarkdown = [
  {
    title: 'heading 1',
    fieldName: '',
    prefix: '# ',
    suffix: '',
    icon: <RiH1 size={ICON_SIZE} />,
  },
  {
    title: 'heading 2',
    fieldName: '',
    prefix: '## ',
    suffix: '',
    icon: <RiH2 size={ICON_SIZE} />,
  },
  {
    title: 'heading 3',
    fieldName: '',
    prefix: '### ',
    suffix: '',
    icon: <RiH3 size={ICON_SIZE} />,
  },
  {
    title: 'bold',
    fieldName: '',
    prefix: '**',
    suffix: '**',
    icon: <AiOutlineBold size={ICON_SIZE} />,
  },
  {
    title: 'italic',
    fieldName: '',
    prefix: '*',
    suffix: '*',
    icon: <AiOutlineItalic size={ICON_SIZE} />,
  },
  {
    title: 'underline',
    fieldName: '',
    prefix: '__',
    suffix: '__',
    icon: <AiOutlineUnderline size={ICON_SIZE} />,
  },
  {
    title: 'inline code',
    fieldName: '',
    prefix: '`',
    suffix: '`',
    icon: <FaCode size={ICON_SIZE} />,
  },
  {
    title: 'code block',
    fieldName: '',
    prefix: '```\n',
    suffix: '\n```',
    icon: <RiCodeBlock size={ICON_SIZE} />,
  },
  {
    title: 'link',
    fieldName: '',
    prefix: '[text](url)',
    suffix: '',
    icon: <FaLink size={ICON_SIZE} />,
  },
  {
    title: 'image',
    fieldName: '',
    prefix: '![alt](url)',
    suffix: '',
    icon: <FaRegImage size={ICON_SIZE} />,
  },
  {
    title: 'order list',
    fieldName: '',
    prefix: '1. ',
    suffix: '',
    icon: <FaListOl size={ICON_SIZE} />,
  },
  {
    title: 'unorder list',
    fieldName: '',
    prefix: '- ',
    suffix: '',
    icon: <FaList size={ICON_SIZE} />,
  },
];
