const Button = {
  baseStyle: {
    padding: '5px',
    backgroundColor: 'primary',
    color: 'white',
    borderRadius: '2.5px'
  },
  variants: {
    text: {
      padding: '0px !important',
      backgroundColor: 'transparent',
    },
    transparent: {
      backgroundColor: 'transparent',
      border: '1px solid primary'
    },
  }
}

export default Button;