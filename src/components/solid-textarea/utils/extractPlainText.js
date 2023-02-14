export const extractPlainText = (editor) => {
    const currentContent = editor?.editorState?.getCurrentContent?.();
    const plainText = currentContent?.getPlainText?.("") || "";
    return {...editor, plainText};
};