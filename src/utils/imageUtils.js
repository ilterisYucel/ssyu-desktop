import AvatarMan1 from '../assets/images/man-avatar-1.png';
import AvatarMan2 from '../assets/images/man-avatar-2.png';
import AvatarMan3 from '../assets/images/man-avatar-3.png';
import AvatarMan4 from '../assets/images/man-avatar-4.png';
import AvatarMan5 from '../assets/images/man-avatar-5.png';
import AvatarWoman1 from '../assets/images/woman-avatar-1.png';
import AvatarWoman2 from '../assets/images/woman-avatar-2.png';
import AvatarWoman3 from '../assets/images/woman-avatar-3.png';
import AvatarWoman4 from '../assets/images/woman-avatar-4.png';

import { randomInt } from './mathUtils.js';

const selectAvatar = (gender) => {
  
  const manAvatarArray = [
    AvatarMan1,
    AvatarMan2,
    AvatarMan3,
    AvatarMan4,
    AvatarMan5
  ];
  const womanAvatarArray = [
    AvatarWoman1,
    AvatarWoman2,
    AvatarWoman3,
    AvatarWoman4,
  ]

  return gender.toLowerCase() === 'e' ? 
    manAvatarArray[randomInt(0, manAvatarArray.length - 1)] :
    womanAvatarArray[randomInt(0, womanAvatarArray.length - 1)]
}

export {
  selectAvatar,
}