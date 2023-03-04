import React, { ReactNode } from 'react';

interface IProps {
    title: string;
    isOpen?: boolean;
    children: ReactNode;
}

export function Expandable({
    title,
    isOpen = true,
    children,
}: IProps) {
    return (
        <details className='expandable-details' open={isOpen}>
            <summary className='expandable-details-summary'>{title}</summary>
            <div className='expandable-details-content'>{children}</div>
        </details>
    )
}