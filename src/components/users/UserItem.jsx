import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserItem({ user: { login, avatar_url } }) {
	return (
		<div className='card shadow-md compact bg-primary text-primary-content'>
			<div className='flex-row items-center space-x-4 card-body'>
				<div className='avatar'>
					<div className='rounded-full shadow w-14 h-14'>
						<img src={avatar_url} alt='profile' />
					</div>
				</div>
				<div>
					<h2 className='card-title'>{login}</h2>
					<Link
						className='text-base-content text-opacity-80'
						to={`/user/${login}`}
					>
						Visit profile
					</Link>
				</div>
			</div>
		</div>
	);
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserItem;
