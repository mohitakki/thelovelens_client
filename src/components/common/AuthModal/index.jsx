import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog';
import { Button } from '../Button';
import { Input } from '../Input';
import { useAuthQuery } from '../../../hooks/useAuthQuery';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = React.useState('login'); // 'login' or 'register'
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login, register: registerUser, isLoggingIn, isRegistering, loginError, registerError } = useAuthQuery();

  const onSubmit = async (data) => {
    if (mode === 'login') {
      await login(data);
    } else {
      await registerUser(data);
    }
    reset();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Sign In' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {(loginError || registerError) && (
            <p className="text-sm text-red-500">
              {mode === 'login' ? loginError?.message : registerError?.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoggingIn || isRegistering}
          >
            {isLoggingIn || isRegistering ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 