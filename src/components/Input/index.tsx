import styled from './Input.module.scss'

type InputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ ...props }: InputProps) => {
    return (
        <div className={styled.wrapper}>
            <input type="text" onChange={props.onChange} />
        </div>
    )
}

export default Input