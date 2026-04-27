declare module 'react-quill-new' {
  import React from 'react';

  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    onChange?: (content: string, delta: any, source: string, editor: any) => void;
    onChangeSelection?: (range: any, source: string, editor: any) => void;
    onFocus?: (range: any, source: string, editor: any) => void;
    onBlur?: (previousRange: any, source: string, editor: any) => void;
    onKeyPress?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onKeyUp?: (event: any) => void;
    modules?: any;
    formats?: string[];
    children?: React.ReactNode;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    scrollingContainer?: string | HTMLElement;
    tabIndex?: number;
    bounds?: string | HTMLElement;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}

