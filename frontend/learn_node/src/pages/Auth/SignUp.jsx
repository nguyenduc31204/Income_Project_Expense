import React, { use, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/help'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'


const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')

  const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = "";

    if(!fullName) {
      setError('Vui lòng nhập họ và tên');
      return;
    }

    if(!validateEmail(email)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    if(!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    // if(password !== confirmPassword) {
    //   setError('Mật khẩu không khớp');
    //   return;
    // }

    setError("");
  }


  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Tạo Tài Khoản</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Điền vào Form Đăng ký bên dưới để tham gia với chúng tôi ngay hôm nay </p>
        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Họ và tên"
              label="Họ và tên"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@example.com"
              label="Email"
              type="text"
            />
            <div className='col-span-2'>
              <Input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự"
                label="Mật khẩu"
                type="password"
              />
            </div>
          </div>
          {error && (
                      <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                    )}
                    <button type='submit' className='btn-primary'>
                      Đăng Ký
                    </button>
                    <p className='text-slate-800 mt-3'>Bạn đã có tài khoản?
                      <Link to='/logins' className='text-primary underline'> Đăng Nhập</Link>
                    </p>
        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp
