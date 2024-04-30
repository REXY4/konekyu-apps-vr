import { G, Path, Svg } from "react-native-svg"

interface Props {
    size:number,
    color :string
}

export const TabBarIconHome = ({size, color}:Props) =>{
    return(
        <Svg  width={size} height={size} 
        viewBox="0 0 512 512">
            <Path fill={color} 
            d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"/>
            <Path fill={color} d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97"/>
        </Svg>
    )
}

export const TabBarWifi = ({size, color}:Props)=>{
    return(
        <Svg width={size} height={size} viewBox="0 0 18 13" fill="none" >
        <Path d="M17.8568 3.456C12.8739 -1.15284 5.12407 -1.15116 0.143132 3.456C-0.0441802 3.62925 -0.0478364 3.92259 0.133289 4.10231L1.09629 5.05772C1.26898 5.22928 1.54685 5.23294 1.72629 5.06841C5.83029 1.30866 12.1691 1.30781 16.2739 5.06841C16.4534 5.23294 16.7313 5.229 16.9039 5.05772L17.8669 4.10231C18.0478 3.92259 18.0441 3.62925 17.8568 3.456ZM8.99998 9C8.00576 9 7.19998 9.80578 7.19998 10.8C7.19998 11.7942 8.00576 12.6 8.99998 12.6C9.99419 12.6 10.8 11.7942 10.8 10.8C10.8 9.80578 9.99419 9 8.99998 9ZM14.7001 6.64903C11.4584 3.78225 6.53791 3.78534 3.29988 6.64903C3.10582 6.82059 3.09963 7.11844 3.28385 7.30012L4.25248 8.25609C4.42123 8.42259 4.69291 8.43384 4.87263 8.27859C7.23373 6.23756 10.7716 6.24206 13.127 8.27859C13.3068 8.43384 13.5784 8.42287 13.7472 8.25609L14.7158 7.30012C14.9003 7.11844 14.8939 6.82031 14.7001 6.64903Z"
              fill={color}/>
    </Svg>
    )
}


export const TabBarLocation = ({size, color}:Props) =>{
    const colors = color == "#FFFFFF" ? "#0074E0" : "#FFFFFF";
    return(
        <Svg width={size} height={size} viewBox="0 0 67 91" fill="none">
        <Path d="M33.5 0C24.6185 0.0111526 16.1037 3.77149 9.82353 10.4561C3.54333 17.1408 0.0105191 26.2039 4.12947e-05 35.6574C-0.0105961 43.3828 2.36021 50.8986 6.74876 57.0519C6.74876 57.0519 7.6624 58.3323 7.81162 58.517L33.5 90.7643L59.2006 58.5008C59.3346 58.329 60.2513 57.0519 60.2513 57.0519L60.2543 57.0421C64.6407 50.8916 67.0104 43.3793 67 35.6574C66.9895 26.2039 63.4567 17.1408 57.1765 10.4561C50.8963 3.77149 42.3815 0.0111526 33.5 0Z"
              fill={color}/>
        <Path d="M37.8717 49.75L28.648 37.6342V49.75H21.9648V22.3135H28.648V34.3512L37.7935 22.3135H45.6493L35.0186 35.7582L46.0401 49.75H37.8717Z"
              fill={colors} />
    </Svg>
    

    )
}

export const TabBarIconVoucher = ({size, color} :Props)=>{
    return (
        <Svg width={size} height={size} viewBox="0 0 20 15" fill="none">
    <Path d="M0.400391 2.99999C0.400391 2.36347 0.653247 1.75302 1.10333 1.30293C1.55342 0.852847 2.16387 0.599991 2.80039 0.599991H17.2004C17.8369 0.599991 18.4474 0.852847 18.8974 1.30293C19.3475 1.75302 19.6004 2.36347 19.6004 2.99999V5.39999C18.9639 5.39999 18.3534 5.65285 17.9033 6.10294C17.4532 6.55302 17.2004 7.16347 17.2004 7.79999C17.2004 8.43651 17.4532 9.04696 17.9033 9.49705C18.3534 9.94713 18.9639 10.2 19.6004 10.2V12.6C19.6004 13.2365 19.3475 13.847 18.8974 14.297C18.4474 14.7471 17.8369 15 17.2004 15H2.80039C2.16387 15 1.55342 14.7471 1.10333 14.297C0.653247 13.847 0.400391 13.2365 0.400391 12.6V10.2C1.03691 10.2 1.64736 9.94713 2.09745 9.49705C2.54753 9.04696 2.80039 8.43651 2.80039 7.79999C2.80039 7.16347 2.54753 6.55302 2.09745 6.10294C1.64736 5.65285 1.03691 5.39999 0.400391 5.39999V2.99999Z"
          fill={color}/>
</Svg>

    )
}



export const TabBarIconProfile = ({size, color} :Props)=>{
    return (
        <Svg  width={size} height={size} 
        viewBox="0 0 24 24">
            <Path fill={color} 
            fill-rule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z" clip-rule="evenodd"/></Svg>
    )
}
