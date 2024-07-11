import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import req from '../lib/req';
import { toast } from '../components/Toaster';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [avatarDemoURL, setAvatarDemoURL] = useState('https://www.w3schools.com/howto/img_avatar.png');
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data) => {
        if (data.password !== data.retypedPassword) return toast('Passwords do not match', 'error');
        try {
            setLoading(true);
            const [avatar] = data.avatar;
            if (avatar) {
                const formData = new FormData();
                formData.append('file', avatar);
                const { data: { _id } } = await req({ method: 'POST', uri: '/file', data: formData });
                data.avatar_file_id = _id;
            }
            delete data.avatar;
            await req({ method: 'POST', uri: '/user/register', data })
        }
        catch (e) {
            toast('Something went wrong!', 'error');
        }
        finally {
            setLoading(false);
        }
    };
    const onUpload = (e) => {
        const [file] = e.target.files;
        if (!file) return;
        setAvatarDemoURL(URL.createObjectURL(file));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ height: '100px', width: '100px', border: '1px solid', borderRadius: '100%', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <label htmlFor='updateProfile' style={{ top: '40%', bottom: '50%' }}>
                            <img
                                src={avatarDemoURL} alt="Users avatar"
                                style={{ height: '100px', width: '100px', borderRadius: '100%' }}
                            />
                        </label>
                    </div>
                    <input
                        name='avatar'
                        id="updateProfile"
                        type="file"
                        accept='image/*'
                        hidden
                        {...register('avatar', {
                            onChange: onUpload
                        })}
                    />
                </div>
                <input type='text' placeholder='Your fullname' required {...register('full_name')} />
                <input type='email' placeholder='Your email' required {...register('email')} />
                <input type='password' placeholder='Your desired password' required {...register('password')} minLength={5} maxLength={50} />
                <input type='password' placeholder='Re-type password' required {...register('retypedPassword')} minLength={5} maxLength={50} />
                <button type='submit' disabled={loading}>Register</button>
            </form>
        </div>
    );
}

export default Register;
