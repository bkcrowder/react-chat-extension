// JSON workaround for React
interface IMessage {
    event: string,
    from: string,
    payload: any
}

const owner = {
    popup: 'popup',
    content: 'content'
}

const events = {
    ats: {
        atMe: "User::At::Me"
    },
    user: {
        join: "User::Joined",
        leave: "User::Left"
    },
    tip: {
        issue: "Tip::Issue",
        complete: "Tip::Complete",
        undo: "Tip::Undo"
    },
    theme: 'Theme::Update',
    system: {
        loaded: "SYS::Loaded",
        unloaded: "SYS::Unloaded",
        attached: "SYS::Attached",
        detached: "SYS::Detached"
    }
}

export { owner, IMessage }
export default events