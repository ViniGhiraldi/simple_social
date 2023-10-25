import Image from "next/image";

export default function Login() {
  return (
    <div className='flex h-screen max-h-screen'>
      <div className="w-1/2 bg-primary"></div>
      <div className="w-1/2">
        <Image src='/logo.svg' alt='Simple Social logo' width={200} height={200} />
      </div>
    </div>
  )
}