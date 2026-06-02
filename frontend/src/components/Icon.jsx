import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Ri from 'react-icons/ri';
import * as Si from 'react-icons/si';
import * as Io from 'react-icons/io';
import * as Tb from 'react-icons/tb';
import * as Di from 'react-icons/di';
import * as Bi from 'react-icons/bi';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';

const Icon = ({ name, className = "" }) => {
  // Combine all icon libraries
  const allIcons = {
    ...Fa,
    ...Ri,
    ...Si,
    ...Io,
    ...Tb,
    ...Di,
    ...Bi,
    ...Md,
    ...Bs
  };

  const SelectedIcon = allIcons[name];

  if (!SelectedIcon) {
    // Return a default icon if not found
    return <Fa.FaCode className={className} />;
  }

  return <SelectedIcon className={className} />;
};

export default Icon;
