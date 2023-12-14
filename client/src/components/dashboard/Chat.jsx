import { useEffect, useState } from 'react'
import { AiOutlineMessage, AiOutlinePlus} from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { add_friend, send_message } from '../../store/reducers/chatReducer'
// Socket io imports
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Chat = () => {

  const dispatch = useDispatch()
  const { sellerId } = useParams()

  const [text, setText] = useState('')
  const { userInfo } = useSelector( state => state.auth )
  const { fd_messages, currentFd, my_friends } = useSelector( state => state.chat )

  console.log(`friends id is ${fd_messages}`)

//   useEffect(() => {
//     socket.emit('add_user', userInfo.id, userInfo)
//   }, [userInfo])

//   useEffect(() => {
//     dispatch(add_friend({
//         sellerId: sellerId || "",
//         userId: userInfo.id
//     }))
//   }, [sellerId, dispatch, userInfo])


    /* Emit socket event and dispatch the add_friend action */
    useEffect(() => {
        socket.emit('add_user', userInfo.id, userInfo)
            dispatch(add_friend({
                sellerId: sellerId || "",
                userId: userInfo.id
            }));
    }, [dispatch, sellerId, userInfo])


    const send = () => {
        if (text) {
            dispatch(send_message({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name
            }))

            setText("")
        }
    }
  

  return (
    <div className='bg-white p-3 rounded-md'>
        <div className="w-full flex">
            <div className="w-[230px]">

                <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
                    <span><AiOutlineMessage /></span>
                    <span>Message</span>
                </div>

                <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
                    {
                        my_friends 
                        ? 
                            my_friends .map((f, i) => 
                                <Link key={i} to={`/dashboard/chat/${f.fdId}`} className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}>
                                    <div className="w-[30px] h-[30px] rounded-full relative">
                                        <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                        <img src={`../../images/user/admin_avatar.png`} alt="vendor" />
                                    </div>
                                    <span>{f.name}</span>
                                </Link>)

                        : <div>Loading ...</div>
                    }
                </div>

            </div>

            <div className='w-[calc(100%-230px)]'>
                {
                    currentFd
                    ? <div className="w-full h-full">

                        <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">

                            <div className="w-[30px] h-[30px] rounded-full relative">
                                <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute -right-1 bottom-0'></div>
                                <img src={`../../images/user/admin_avatar.png`} alt="muneeb" />
                            </div>
                            <span>{currentFd.name}</span>

                        </div>

                    <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                        <div className="w-full h-full overflow-y-auto flex flex-col gap-3">

                            {
                                fd_messages.map((m, i) => {
                                    if (currentFd?.fdId !== m.receiverId ) {
                                        return (
                                            <div key={currentFd.fdId} className="w-full flex gap-2 justify-start items-center text-[14px]">
                                                <img className='w-[30px] h-[30px]' src={`../../images/user/admin_avatar.png`} alt="muneeb" />
                                                <div className="p-2 bg-purple-500 text-white rounded-md"><span>{m.message}</span></div>
                                            </div>
                                        )
                                    } else {
                                        <div key={i} className="w-full flex gap-2 justify-end items-center text-[14px]">
                                            <img className='w-[30px] h-[30px]' src={`../../images/user/admin_avatar.png`} alt="muneeb" />
                                            <div className="p-2 bg-cyan-500 text-white rounded-md"><span>{m.status}</span></div>
                                        </div>
                                    }
                                })
                            }

                        </div>
                    </div>

                    <div className="flex p-2 justify-between items-center w-full">

                        <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                            <label className='cursor-pointer' htmlFor=""><AiOutlinePlus /></label>
                            <input type="file" className='hidden' />
                        </div>

                        <div className="border h-[40px] p-0 ml-2 w-[calc(100% - 90px)] w-full rounded-full relative ">
                            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Send Message' className='w-full rounded-full h-full outline-none p-3' />
                            <div className="text-2xl right-2 top-2 absolute cursor-auto">
                                <span><GrEmoji /></span>
                            </div>
                        </div>

                        <div className='w-[40px] p-2 justify-center items-center rounded-full'>
                            <div onClick={send} className='text-2xl cursor-pointer'>
                                <IoSend />
                            </div>
                        </div>

                    </div>

                </div> : <div className='w-full h-full flex justify-center items-center text-lg font-bold text-slate-600'>
                    <span>Select Seller</span>
                </div>
                }

            </div>
        </div>
    </div>
  )
}

export default Chat