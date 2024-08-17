
interface CommandIconProps{
    src : string;
    w? : number;
    h? : number;
    alt?: string;
}

export function CommandIcon({src, w =82, h=82, alt } : CommandIconProps) {
    return (
        <img src={src} width={w} height={h} alt={alt}/>
    )
}