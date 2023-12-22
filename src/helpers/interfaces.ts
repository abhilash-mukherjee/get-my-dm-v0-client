export interface InputState<T>{
    input: T,
    isValid: boolean,
    errorMessage: string,
    isFreshInput?: boolean
}

export const defaultStringInputState : InputState<string> = {
    input: '',
    isValid: false,
    errorMessage: '',
    isFreshInput: true,
}

export interface ChatInterface{
    conversationId: string,
    followerName: string,
    lastMessageSenderId: string
    followerId: string,
    influencerId: string,
    latestMessageContent: string,
    updatedAt: Date,
    latestMessageTimestamp: Date,
    latestMessageStatus: string
}
export const defaultChat : ChatInterface= {
    conversationId: '', 
      followerName: '', 
      lastMessageSenderId: '', 
      followerId: '', 
      influencerId: '',
      latestMessageContent: '', 
      updatedAt: new Date(), 
      latestMessageTimestamp: new Date(), 
      latestMessageStatus: '' 
  }

  export interface MessageInterface {
    content: string,
    timestamp: Date,
    messageStatus: string,
    senderId: string
}

