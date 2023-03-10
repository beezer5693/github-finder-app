import { useContext } from 'react';
import { FaSpinner } from 'react-icons/fa';
import GithubContext from '../../context/github/GithubContext';
import UserItem from './UserItem';

function UserResults() {
	const { users, loading } = useContext(GithubContext);

	if (!loading) {
		return (
			<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
				{users.map(user => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	} else {
		return <FaSpinner className='text-center mx-auto' style={{ fontSize: '3rem' }} />;
	}
}

export default UserResults;
