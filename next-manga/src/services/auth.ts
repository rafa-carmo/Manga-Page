import axios from 'axios';

const strapiUrl = process.env.NEXT_PUBLIC_API_URL;

type SignInProps = {
    email: string
    password: string
}

export async function signIn({ email, password }: SignInProps) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}