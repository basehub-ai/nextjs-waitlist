'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

const options = ['dark', 'system', 'light'] as const

export function ThemeSwitcher({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()

    return (
        <div className={clsx(className, 'flex gap-1')}>
            {options.map((option, i) => (
                <React.Fragment key={option}>
                    <button
                        className={clsx(
                            'text-xs text-slate-10 flex items-center justify-center gap-1 max-w-max',
                            theme === option && '!text-slate-12 font-medium'
                        )}
                        style={{
                            fontFeatureSettings: '"ss01"',
                            fontVariationSettings: '"wght" 500',
                        }}
                        onClick={() => setTheme(option)}
                    >
                        <span className="first-letter:uppercase">{option}</span>
                    </button>
                    {i < options.length - 1 && (
                        <span className="text-xs text-slate-8">/</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}
