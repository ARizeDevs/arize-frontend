export const titleValidator = (title : string) => {
    const error : any = {
        title : ''
    }
    if(!title) error.title = 'Enter a title'
    return error
}

export const tagsValidator = (tags : string[]) => {
    const error : any = {
        tags : ''
    }
    if(!tags || tags.length === 0) error.tags = 'Enter 1 tag at least'
    return error
}

export const imageSrcValidator = (imageSrc : string) => {
    const error : any = {
        imageSrc : ''
    }
    if(!imageSrc) error.imageSrc = 'Choose a thumbnail image'
    return error
}

export const contentFileValidator = (contentFile : any) => {
    const error : any = {
        contentFile : ''
    }
    if(!contentFile) error.contentFile = 'Choose a valid glb/gltf file'
    return error
}

export const validatePostDetail = (title : string, tags : string[], imageSrc : string, contentFile : any) => {
    return {
        ...titleValidator(title),
        ...tagsValidator(tags),
        ...imageSrcValidator(imageSrc),
        ...contentFileValidator(contentFile)
    }
}

export const actionButtonLinkValidator = (actionButtonLink : string) => {
    const error : any = {
        actionButtonLink : ''
    }
    if(!actionButtonLink) error.actionButtonLink = 'Enter a actionButtonLink'
    return error
}


export const actionButtonTextValidator = (actionButtonText : string) => {
    const error : any = {
        actionButtonText : ''
    }
    if(!actionButtonText) error.actionButtonText = 'Enter a actionButtonText'
    return error
}

export const actionBUttonTextColorValidator = (actionBUttonTextColor : string) => {
    const error : any = {
        actionBUttonTextColor : ''
    }
    if(!actionBUttonTextColor) error.actionBUttonTextColor = 'Enter a actionButtonTextColor'
    return error
}


export const actionButtonColorValidator = (actionButtonColor : string) => {
    const error : any = {
        actionButtonColor : ''
    }
    if(!actionButtonColor) error.actionButtonColor = 'Enter a actionButtonColor'
    return error
}



export const actionButtonInfoTextValidator = (actionButtonInfoText : string) => {
    const error : any = {
        actionButtonInfoText : ''
    }
    if(!actionButtonInfoText) error.actionButtonInfoText = 'Enter a actionButtonInfoText'
    return error
}

export const actionInfoBackgroundColorValidator = (actionInfoBackgroundColor : string) => {
    const error : any = {
        actionInfoBackgroundColor : ''
    }
    if(!actionInfoBackgroundColor) error.actionInfoBackgroundColor = 'Enter a actionInfoBackgroundColor'
    return error
}

export const postBackgroundImageBase64Validator = (postBackgroundImageBase64 : string) => {
    const error : any = {
        postBackgroundImageBase64 : ''
    }
    if(!postBackgroundImageBase64) error.postBackgroundImageBase64 = 'Choose a postBackgroundImage'
    return error
}

export const validateCustomizationDetail = (
    hasSkyBox : boolean,
    postBackgroundImageBase64 : string
) => {
    let error : any = {}

    if(hasSkyBox) {
        error = {
            ...error,
            ...postBackgroundImageBase64Validator(postBackgroundImageBase64)
        }
    }

    return error
}
