/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from 'react'
import styled from './ReposItem.module.scss'
import { to3DigitsThousand } from 'utils/numberUtil'
import useElementOnScreen from "hooks/useElementOnScreen"

type RepoItemProps = {
    name?: string,
    desc?: string,
    topics?: string[],
    star?: number,
    lang?: string,
    license?: string,
    issue?: number,
    url?: string
    last?: boolean
    fetchMore?: () => void
} & ReactProps.Component

const RepoItem = React.memo(({
    name,
    desc,
    topics = [],
    star,
    lang,
    license,
    issue,
    url,
    last,
    fetchMore,
    ...props
}: RepoItemProps) => {
    const { containerRef, isIntersecting } = useElementOnScreen({ threshold: 1 })

    useEffect(() => {
        if (last && isIntersecting && fetchMore) fetchMore()
    }, [last, isIntersecting, fetchMore])

    if (!name || !url) return null

    return (
        <div className={styled.container} style={props.style} ref={last ? (containerRef as unknown as React.RefObject<HTMLDivElement>) : null}>
            <a className={styled.author} href={url} target="_blank" rel="noopener noreferrer" aria-label="author" />
            <div className={styled.name}>{name}</div>
            <div className={styled.desc}>{desc}</div>
            <div className={styled.topics}>
                {topics.map((topic, i) => (
                    <a
                        key={i}
                        href={`https://github.com/topics/${topic}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {topic}
                    </a>
                ))}
            </div>
            <div className={styled.detail}>
                {!!star && <span>★ {to3DigitsThousand(star)}</span>}
                {lang && <span>{lang}</span>}
                {license && <span>{license}</span>}
                {!!issue && (<span>{to3DigitsThousand(issue)} issue{issue > 1 ? 's' : ''}</span>)}
            </div>
        </div>
    )
})

export default RepoItem