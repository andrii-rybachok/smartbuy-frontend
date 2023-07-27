'use client'
import { useRef, useState } from "react";
import styles from "./popupOverlay.module.css"

export function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function PopupOverlay({children,trigger,setTrigger ,animation}:{children:any,trigger:boolean,setTrigger:any,animation:Function}){

    const overlay=useRef<HTMLDivElement>(null);
    async function handleClick(){

        animation(children);
        await timeout(350);
        overlay.current?.classList.replace(styles.fadeIn,styles.fadeOut);
        await timeout(400);
        setTrigger(false);
    }
    return(
        (trigger&&
        <div className={styles.popupOverlay +" "+styles.fadeIn} onClick={handleClick} ref={overlay}>
            <div className={styles.popupContainer}>
                {children}
            </div>
        </div>   
        )
    )
}
