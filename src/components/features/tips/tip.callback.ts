
import { add } from './tip.slice'
import settings from '../../../settings/settings'
import { AppDispatch } from '../../../store/store'

/**
 * Attempts to parse the supplied node for tip amount and username issuing the tip
 * @param node  Node that may contain the username and tip amount
 * @returns     Object containing username and amount or null on failure
 */
function parseNodeForTip(node: Node) {
    const text = node?.textContent
    if (!text || text.indexOf('$') < 0) {
        return;
    }

    const parts = text.split(':')
    if (parts && parts.length > 1 && parts[1].trim().indexOf(settings.needle.tip) >= 0) {
        const username = parts[0].trim().toLowerCase()
        const amount = parseInt(parts[1].split('$')[1].trim())
        
        return { username, amount }
    }
    
    return null
}

/**
 * Parse chat log for tip
 * @param node      Node to examine
 * @param username  Username of the current logged in user (currently unused)
 */
function ObserveTip(node: Node, username: string, dispatch: AppDispatch) {
    const tip = parseNodeForTip(node)
    if (tip) {
        dispatch(add(tip))
    }
}

export default ObserveTip