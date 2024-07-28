import { css } from 'lit';

export const style = css`
    :host {
        display: flex;
        flex-direction: row;
    }
    
    h1 {
        margin: var(--header-margin-mod, 0);
        font-size: var(--header-fontsize-mod, 1.5em);
        color: var(--header-color-mod, #000000);
    }
    
    p {
        margin: var(--paragraph-margin-mod, 1em);
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        padding: var(--list-padding-mod, 1em);
        border-bottom: var(--li-border-bottom, 1px solid #ccc);
    }
`;