import Image from "next/image";

export default function Login() {
  return (
    <div className='flex flex-col min-h-screen bg-primary justify-center items-center'>
      <Image src='/white-logo.svg' alt='Simple Social logo' width={200} height={200}/>
    </div>
  )
}