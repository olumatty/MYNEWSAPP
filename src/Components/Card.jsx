import React from 'react'

const Card = () => {
  return (
    <div>
      <div className="max-w-[280px] mx-4 px-2 py-2 inline-block border ">
        <Image src={PIXEL} alt="image" className="h-[200px] w-[250px] rounded-lg mx-auto" />
        <div className="mt-2">
          <h2 className="font-bold text-xl ">News Title</h2>
          <p className="text-sm mt-2 text-justify ">Lorem ipusendsfsdb bdfdbfdbfbdf  ddbf  dbfbdbfbd b djbfdbfb  agsahsasjahdjdghj jbdfjbdjbfdf jbdbfdjf djbhj</p>
          <Link href="#"><button className="h-10 w-24 float-right  rounded-lg bg-blue-500 text-white font-semibold mt-3">ReadMore </button></Link>
        </div>
      </div>
    </div>
  )
}

export default Card
