function getColor(hue: number, saturation: number, lightness: number, alpha: number) {
    return `hsla(${hue}deg, ${saturation}%, ${lightness}%, ${alpha})`
}

export default { getColor };
