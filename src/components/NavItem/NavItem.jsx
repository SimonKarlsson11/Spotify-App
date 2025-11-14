import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavItem.css';

const NavItem = ({ name, Icon, target }) => {
	return (
		<NavLink
			className={({ isActive }) => `NavLink${isActive ? ' active' : ''}`}
			to={target}
			style={{ textDecoration: 'none' }}
		>
			<Box
				px={3}
				py={1}
				sx={{
					display: 'flex',
					alignItems: 'center',
					fontWeight: 'Bold',
					cursor: 'pointer',
					'&:hover': { color: 'white' },
					transition: 'color 0.2s ease-in-out',
					fontSize: 14
				}}
			>
				{Icon && <Icon sx={{ fontSize: 28, marginRight: 1 }} />}
				{name}
			</Box>
		</NavLink>
	);
};

export default NavItem;
