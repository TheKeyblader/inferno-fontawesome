import { icon, SizeProp, RotateProp, FlipProp, PullProp, Transform, IconLookup, FaSymbol, IconProp, Styles, AbstractElement } from "@fortawesome/fontawesome-svg-core";
import { Props, VNode, createVNode, Refs, Ref } from "inferno"
import { VNodeFlags, ChildFlags } from "inferno-vnode-flags";
export interface FontAwesomeIconProps {
    icon: IconProp;
    size?: SizeProp;
    fixedWidth?: boolean;
    inverse?: boolean;
    listItem?: boolean
    rotation?: RotateProp;
    flip?: FlipProp;
    spin?: boolean;
    pulse?: boolean;
    pull?: PullProp;
    transform?: Transform;
    title?: string;
    mask?: IconProp;
    symbol?: FaSymbol;
    attributes?: { [key: string]: string }
    styles?: Styles;
}

function normlalizeIcon(params: IconProp): IconLookup {
    if (params === null) {
        return null
    }

    if (typeof params === 'object' && !Array.isArray(params) && params.prefix && params.iconName) {
        return params
    }

    if (Array.isArray(params) && params.length === 2) {
        return { prefix: params[0], iconName: params[1] }
    }

    if (typeof params === 'string') {
        return { prefix: 'fas', iconName: params }
    }
}

function render(abstract: AbstractElement, className?: string, key?: string | number, ref?: Refs<FontAwesomeIconProps> | Ref): VNode {
    let children = void 0;
    if (abstract.children) {
        children = abstract.children.map(c => render(c))
    }
    return createVNode(VNodeFlags.SvgElement,
        abstract.tag,
        className,
        children,
        children ? ChildFlags.HasNonKeyedChildren : void 0,
        abstract.attributes,
        key,
        ref
    )
}

export function FontAwesomeIcon(props: Props<FontAwesomeIconProps> & FontAwesomeIconProps) {
    let classes = [];
    if (props.size) classes.push("fa-size-${props.size}");
    if (props.fixedWidth) classes.push("fa-fw");
    if (props.inverse) classes.push("fa-inverse ");
    if (props.listItem) classes.push("fa-li");
    if (props.rotation) classes.push("fa-rotate-${props.rotation}");
    if (props.flip) {
        if (props.flip == "both") classes.push("fa-flip-horizontal", "fa-flip-vertical");
        if (props.flip == "horizontal") classes.push("fa-flip-horizontal");
        if (props.flip == "vertical") classes.push("fa-flip-vertical");
    }
    if (props.spin) classes.push("fa-spin");
    if (props.pulse) classes.push("fa-pulse");
    if (props.pull) classes.push("fa-pull-${props.pull}");

    const iconToRender = icon(normlalizeIcon(props.icon), {
        classes: classes,
        mask: normlalizeIcon(props.mask),
        attributes: props.attributes,
        styles: props.styles,
        symbol: props.symbol,
        title: props.title,
        transform: props.transform
    });

    if (!iconToRender) {
        console.error("Cant render icon :" + props.icon);
        return null;
    }
    return render(iconToRender.abstract[0], props.className, props.key, props.ref);
}