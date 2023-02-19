import React, { ReactNode } from 'react';

interface IProps {
    title: string;
    children: ReactNode;
}

export function Expandable({
    title,
    children,
}: IProps) {
    return (
        <details>
            <summary>{title}</summary>
            {children}
        </details>
    )
}