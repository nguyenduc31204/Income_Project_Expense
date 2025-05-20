import React, { use, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/help'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    if(!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    setError("");
      console.log("route", API_PATHS.AUTH.LOGIN)

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Có lỗi xảy ra", error)
      }
    }

  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Chào Mừng Bạn</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Vui lòng nhập vào thông tin đăng nhập của bạn</p>
        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@example.com"
            label="Email"
            type="text"  
          />

          <Input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tối thiểu 8 ký tự"
            label="Password"
            type="password"  
          />

          {error && (
            <p className='text-red-500 text-xs pb-2.5'>{error}</p>
          )}
          <button type='submit' className='btn-primary'>
            Đăng nhập
          </button>
          <p className='text-slate-800 mt-3'>Bạn chưa có tài khoản?
            <Link to='/signup' className='text-primary underline'> Đăng Ký</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
