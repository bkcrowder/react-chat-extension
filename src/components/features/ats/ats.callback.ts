import { AppDispatch } from "store/store";
import settings from "../../../settings/settings";
import './ats.scss'

/**
 * Attempt to parse
 * @param node  Node that may contain a reference of one user at-ing another user
 * @returns     Object containing the source user who used @ and the target user it was directed to or null
 */
function parseNodeForAt(node: Node, username: string) {
    const text = node?.textContent
    if (!text || text.indexOf('@') < 0 || !username) {
        return null
    }

    const parts = text.split('@')

    if (parts && parts.length > 1) {
        const target = parts[1].split(' ')[0];
        if (target.toLowerCase() == username.toLowerCase())
        {
            return node;    
        }
    }

    return null
}

/**
 * Pulls nodes containing @ to determine if the user is being directly referenced
 * Applies highlight class if the @ target matches current username
 * @param node      HTML Node
 * @param username  Username of the current user
 * @param dispatch  Discarded dispatch that's currently unused
 */
function ObserveAts(node: Node, username: string, dispatch: AppDispatch): void {
    const atNode = parseNodeForAt(node, username)
    if (atNode !== null)
    {
        const target = atNode as HTMLElement
        target.classList.add(settings.css.at) 
    }
}

export default ObserveAts