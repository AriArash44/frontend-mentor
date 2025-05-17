const titleColorMap: Record<string, string> = {
    "work" : "orange-300",
    "play" : "blue-300",
    "study" : "pink-400",
    "exercise" : "green-400",
    "social" : "purple-700",
    "self care" : "yellow-300",
}

export const titleColorMapper = (title: string) => {
    return titleColorMap[title.toLowerCase()];
};