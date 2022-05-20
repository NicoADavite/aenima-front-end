import React from 'react';

import headerLogo from '../assets/images/logo.jpg';

function Logo() {
  return (
    <figure className="header-logo-figure">
      < img src={headerLogo} className="header-logo" alt="header-logo"  />
    </figure>
  );
}

export default Logo;