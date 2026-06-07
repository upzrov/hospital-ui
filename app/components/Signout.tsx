import { useNavigate } from 'react-router';
import { signOut } from '~/api';

export const Signout = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOut();
    navigate('/signin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field field-center">
        <p className="control">
          <button className="button is-success" type="submit">
            Вийти
          </button>
        </p>
      </div>
    </form>
  );
};
