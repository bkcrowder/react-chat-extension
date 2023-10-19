import { useAppSelector } from '../../../store/store';

/**
 * Pulls nodes containing @ to determine if the user is being directly referenced
 * Applies highlight class if the @ target matches current username
 * @param node      HTML Node
 * @param username  Username of the current user
 */
/*const ObserveBlock: IObserveChatCallback = (node: Node, username: string) =>
{
    const blocked = useAppSelector(state => state.block)
    if (blocked.users.has(username))
    {
        const hide = node as HTMLElement
        hide.classList.add('blocked')

        const censored = document.createElement('div')
        censored.className = 'text-muted'
        censored.innerHTML = `<i>${username}'s message has been blocked</i>`

        hide.parentNode?.insertBefore(censored, hide.nextSibling)
    }
}

export default ObserveBlock*/