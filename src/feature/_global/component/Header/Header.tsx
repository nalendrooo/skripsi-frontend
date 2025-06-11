import React, { Fragment } from 'react'

interface IProps {
    title: string
    subtitle: string
    rightButton?: React.ReactNode[]
}

const Header = ({
    title,
    subtitle,
    rightButton
}: IProps) => {
    return (
        <div className='mb-2 flex text-start flex-wrap items-center justify-between gap-x-4 space-y-2'>
            <div>
                <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
                <p className='text-muted-foreground'>
                    {subtitle}
                </p>
            </div>
            <div className='flex gap-2'>
                {rightButton?.map((item, index) => <Fragment key={index}>{item}</Fragment>)}
            </div>
        </div>
    )
}

export default Header