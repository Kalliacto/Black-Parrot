import React, { useState } from 'react';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import '../forms.css';
import { passwordValidationCheck } from '../../../utils/utils';

const PasswordInput = ({ register, errors }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className='input__wrap_pass'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { ...passwordValidationCheck })}
                    placeholder='Пароль'
                    className={errors?.password ? 'form__input warning' : 'form__input'}
                />
                <span
                    className='input__eye_show'
                    onClick={() => setShowPassword((state) => !state)}
                >
                    {showPassword ? <EyeFill /> : <EyeSlashFill />}
                </span>
            </div>
        </>
    );
};

export default PasswordInput;
