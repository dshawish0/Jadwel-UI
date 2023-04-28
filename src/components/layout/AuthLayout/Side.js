import React, { cloneElement } from 'react'
import { Avatar } from 'components/ui'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'

const Side = ({ children, content, ...rest }) => {
    const { logoWidth } = rest; // Extracting logoWidth from rest props

    return (
        
        <div className="grid lg:grid-cols-3 h-full">
            <div
                 
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
                }}
            >
                <Logo mode="dark" logoWidth={logoWidth} /> {/* Update logoWidth prop */}
                
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <Avatar
                            className="border-2 border-white"
                            shape="circle"
                            src="/img/avatars/thumb-10.jpg"
                        />
                        <div className="text-white">
                            <div className="font-semibold text-base">
                                Mohammad Kanaan
                            </div>
                            <span className="opacity-80">Team member</span>
                        </div>
                    </div>
                    <p className="text-lg text-white opacity-80">
                        "Jadwel aims to leverage the power of artificial intelligence (AI) 
                        to streamline and optimize the registration process, Jadwel seeks to 
                        simplify and enhance the user experience, making the registration 
                        process easy to use and efficient. By automating repetitive tasks."
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>

            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
             


                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
        </div>
    )
}

export default Side