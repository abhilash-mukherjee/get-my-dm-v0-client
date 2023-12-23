import { useRecoilValue } from 'recoil';
import { influencerPublicDetailsState } from '../../store/atoms/influencerPublicDetailsAtom';
import './follower-styles/chats.css'
export function FollowerChat() {
    const {defaultMessage} = useRecoilValue(influencerPublicDetailsState);
    return (
        <div className='follower-chat'>
            {
                
            }
        </div>
    )
}