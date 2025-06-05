interface Props {
  username: string;
  verifyUrl: string;
}

export const VerifyEmail: React.FC<Readonly<Props>> = ({username, verifyUrl}) => (
    <div>
        <header>{`Hello ${username}!`}</header>
        <p>Please confirm your email address by clicking the link below:</p>
        <a href={verifyUrl}>{verifyUrl}</a>
        <hr />
        <p>If you did not request this change please ignore this email</p>
    </div>
);