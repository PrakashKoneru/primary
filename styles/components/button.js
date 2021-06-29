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
    loanCard: {
      borderRadius: '5px',
      textAlign: 'center',
      padding: '5px 15px',
      cursor: 'pointer',
      border: `1px solid rgba(224,210,210, 0.6)`
    }
  }
}

export default Button;