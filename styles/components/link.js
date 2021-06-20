const Link = {
    baseStyle: {
			_hover: {
				textDecoration: 'none'
			},
			_focus: {
				boxShadow: 'none'
			}
    },
    variants: {
        navLink: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					p:"0 20px",
					h:"100%",
					_hover: {
						backgroundColor: '#EBEDF7'
					},
        }
    }
  }
  
  export default Link;