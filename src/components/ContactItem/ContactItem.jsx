import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const Contact = ({ id, name, number, onDeleteContact }) => {
  return (
    <li>
      <div className={css.contact__item}>
        {name}: {number}
        <button
          className={css.btn__delete}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
