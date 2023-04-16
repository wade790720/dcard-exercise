import styled from './SearchInput.module.scss'

type SearchInputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ ...props }: SearchInputProps) => {
    return (
        <div className={styled.wrapper}>
            <input type="text" onChange={props.onChange} />
        </div>
    )
}

export default SearchInput