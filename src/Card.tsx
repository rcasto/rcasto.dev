import React, { PropsWithChildren } from "react";

type IProps = PropsWithChildren<{
    header: string;
}>

export function Card({
    header,
    children,
}: IProps) {
    return (
        <div className='expandable-details'>
            <div className='expandable-details-summary'>{header}</div>
            <div className='expandable-details-content'>{children}</div>
        </div>
    )
}