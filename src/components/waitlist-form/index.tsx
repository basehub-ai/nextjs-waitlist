'use client';
import clsx from 'clsx';
import { useState } from 'react';

type InputForm = {
  formAction?: (data: FormData) => Promise<void>;
} & React.HTMLAttributes<HTMLInputElement>;

type State = 'idle' | 'loading' | 'success' | 'error';

const STATES: Record<State, State> = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export function InputForm({ formAction, ...props }: InputForm) {
  const [state, setState] = useState<State>(STATES.idle);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formAction && typeof formAction === 'function') {
      try {
        setState(STATES.loading);
        await formAction(new FormData(e.currentTarget));
        setState(STATES.success);
      } catch (error) {
        setState(STATES.error);
        setError('There was an error while submitting the form');
        console.error(error);
      }
    }
  };
  const inputDisabled = state === 'loading';
  const buttonDisabled = state === 'loading' || value.length === 0;
  const submitted = state === 'success';
  return (
    <form className="flex flex-col gap-2 w-full relative" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3 relative">
        <input
          {...props}
          value={value}
          className={clsx(
            'flex-1 text-sm pl-4 pr-28 py-2 h-11 bg-gray-2 cursor-text rounded-full text-gray-12 placeholder:text-gray-9 border border-gray-4'
          )}
          disabled={inputDisabled}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          disabled={buttonDisabled}
          className={clsx(
            'absolute h-8 px-3.5 bg-gray-12 text-gray-1 text-sm top-1/2 transform -translate-y-1/2 right-1.5 rounded-full font-medium',
            {
              'bg-gray-12 text-gray-2': state === 'loading',
              'bg-black text-white': state === 'success',
            },
            inputDisabled && 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
          )}
        >
          {state === 'loading' ? (
            <>
              Subscribing...
              <Loading />
            </>
          ) : submitted ? (
            'Thanks for joining!'
          ) : (
            'Join Waitlist'
          )}
        </button>
      </div>
      <div className="w-full h-1" />
      {error && (
        <p className="absolute text-xs text-[#ff0000] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">{error}</p>
      )}
    </form>
  );
}

const Loading = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full border border-[currentColor] border-t-transparent animate-spin" />
  </div>
);
