interface Props {
    password: string;
}

export const PasswordChangeEmail: React.FC<Readonly<Props>> = ({password}) => {

    return (
        <div>
            <header>Hi there!</header>
            <p>This email has been sent to you in regards to changing your CodingThoguhts account password.</p>
            <p>You can find your new account password below. Use this password to log in into your account.</p>
            <p>{password}</p>
            <hr />
            <p>If you did not request this email, please ignore it.</p>
        </div>
    );
}