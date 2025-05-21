
interface Props {
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}

export default function DifficultyDropdown(props: Props) {
    const difficulties: string[] = ["Easy", "Medium", "Hard"];

    return (
        <div>
            <select onChange={(e) => props.setDifficulty(e.target.value)}>
                <option value={""}>Select a Difficulty</option>
                {difficulties.map((currentDifficulty, index) => (
                     <option key={index} value={currentDifficulty}>{currentDifficulty}</option>
                ))}
            </select>
        </div>
    );
}