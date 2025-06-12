interface Props {
    verifyUrl: string;
}

export const PasswordChangeEmail: React.FC<Readonly<Props>> = ({verifyUrl}) => {

    return (
        <div>
            <header>Hi there!</header>
            <p>This email has been sent to you in regards to changing your CodingThoguhts account password.</p>
            <p>In order to verify the password change. Please click on the link below</p>
            <p>{verifyUrl}</p>
            <hr />
            <p>If you did not request this email, please ignore it.</p>
        </div>
    );
}