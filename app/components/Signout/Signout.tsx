import { signOut } from "~/api";

export const Signout = () => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOut();
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
