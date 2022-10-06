import React from 'react';
import PropTypes from 'prop-types';
import './button3.css';

/**
 * Primary UI component for user interaction
 */
export const Button3 = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button3--primary' : 'storybook-button3--secondary';
  return (
    <button
      type="button"
      className={['storybook-button3', `storybook-button3--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button3.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button3.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
