import { Component, JSX, splitProps } from 'solid-js';
import './Button.css';
import 'virtual:tokens.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: () => void;
  [key: string]: any;
}

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['variant', 'size', 'disabled', 'children']);

  const variant = local.variant || 'primary';
  const size = local.size || 'medium';
  const disabled = local.disabled || false;

  const classes = [
    'swc-button',
    `swc-button--variant-${variant}`,
    `swc-button--size-${size}`,
  ].join(' ');

  return (
    <button
      {...rest}
      class={classes}
      disabled={disabled}
    >
      {local.children}
    </button>
  );
};

export default Button;