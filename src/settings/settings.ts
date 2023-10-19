// JSON workaround for React
interface ISettings { 
    element: { 
        lobby: string,
        primary: string,
        rollcall: string,
        chat: string,
        username: string
    },
    needle: {
        tip: string,
        streamer: string
    },
    prefix: { 
        user: string,
        primary: string
    },
    css: {
        at: string
    },
    links: {
        privateContent: string,
        displayName: string
    }
}

const settings : ISettings = {
    element: {
        lobby: "channelSelector",
        primary: "videoContainer",
        rollcall: "RollCall",
        chat: "eventLog",
        username: "userNameInput"
    },
    needle: {
        tip: "Tipped $",
        streamer: "PosterName"
    },
    prefix: {
        user: "user::",
        primary: "site::"
    },
    css: {
        at: 'at-highlight'
    },
    links: {
        privateContent: "https://sample.site/privatemedia",
        displayName: "https://sample.site/accountsettings"
    }
}

export default settings
export { ISettings }