interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

export default function WelcomeCard({
  firstName,
  lastName,
  email,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 p-8 text-white shadow-xl">
      <p className="text-blue-100">
        Welcome Back 👋
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {firstName} {lastName}
      </h1>

      <p className="mt-3 text-blue-100">
        {email}
      </p>
    </div>
  );
}