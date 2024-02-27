import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const BackButton = ({ destination = '/' }) => {
  return (
    <Link to={destination}>
      <FontAwesomeIcon icon={faLeftLong} />
    </Link>
  )
}

export default BackButton;