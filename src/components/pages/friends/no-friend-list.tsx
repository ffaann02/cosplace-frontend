import React from 'react'
import { LuMailSearch, LuMailPlus } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";


const NoFriendList = ({
    category,
}: {
    category: string;
}) => {

    const headerString = () => {
        if (category === "request") {
            return "ยังไม่มีคำขอเป็นเพื่อนส่งมาหาคุณ อดใจรอหน่อยนะ :)"
        } else if (category === "suggest") {
            return "ไม่มีเพื่อนที่คุณอาจจะรู้จัก"
        } else if (category === "waiting") {
            return "คุณยังไม่ได้ส่งคำขอเพิ่มเพื่อนให้ใครเลย ส่งคำขอให้กับคนที่คุณอยากรู้จักสิ !"
        } else if (category === "friend") {
            return "คุณยังไม่ได้เป็นเพื่อนกับใครเลย ลองส่งคำขอไปหา cosplayer หรือร้านค้าที่คุณชื่นชอบดูสิ !"
        }
    }

    const icon = () => {
        if (category === "request") {
            return <LuMailSearch className='m-auto text-4xl' />
        } else if (category === "suggest") {
            return <LuMailSearch className='m-auto text-4xl' />
        } else if (category === "waiting") {
            return <LuMailPlus className='m-auto text-4xl' />
        } else if (category === "friend") {
            return <LiaUserFriendsSolid className='m-auto text-4xl' />
        }
    }

    return (
        <div className='bg-primary-50 w-full h-24 border-primary-400 border-[1.5px] rounded-lg'>
            <div className='w-full h-full flex justify-center'>
                <div className='m-auto text-primary-600'>
                    {icon()}
                    <h1 className='text-lg text-center'>{headerString()}</h1>
                </div>
            </div>
        </div>
    )
}

export default NoFriendList