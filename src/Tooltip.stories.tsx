import React, { useRef, useState } from 'react';

import { Tooltip, ToolTipPosition } from './Tooltip';

export default {
    component: Tooltip,
    title: 'Tooltip',
    argTypes: {
        position: {
            type: 'radio',
            options: Object.keys(ToolTipPosition),
            mapping: Object.keys(ToolTipPosition).reduce((acc, val) => {
                acc[val] = ToolTipPosition[val];

                return acc;
            }, {}),
        },
    },
};

const useTooltip = (defaultValue = false) => {
    const anchorRef = useRef(null);
    const [isTooltipOpen, toggleTooltip] = useState(defaultValue);

    return { anchorRef, isTooltipOpen, toggleTooltip };
};

// Story 1
export const Default = () => (
    <div>
        <div>
            There is no tooltip here, it&#39;s just here to add a <i>small</i> bug around the tooltip positionning at
            the loading page... = )
        </div>
        <div>
            Also, on the &#34;Default Tooltip&#34; Story make sure to use Top, Botto, Left, Right values instead of 1,
            2, 3, 4.
        </div>
    </div>
);

// Story 2

const Template = ({ position, text }: { position: ToolTipPosition; text: string }) => {
    const { anchorRef, isTooltipOpen, toggleTooltip } = useTooltip(true);

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            {isTooltipOpen && (
                <Tooltip position={position} anchorRef={anchorRef}>
                    <div>{text}</div>
                </Tooltip>
            )}
            <span ref={anchorRef} onClick={() => toggleTooltip(true)}>
                Unkle
            </span>
        </div>
    );
};

export const DefaultTooltip = Template.bind({});

DefaultTooltip.args = {
    position: ToolTipPosition.Left,
    text: 'Louer plus vite et plus simplement',
};

// Story 3
export const TooltipOnInput = () => {
    const { anchorRef: anchorRefOne, isTooltipOpen: isTooltipOpenOne, toggleTooltip: toggleTooltipOne } = useTooltip(
        true,
    );
    const { anchorRef: anchorRefTwo, isTooltipOpen: isTooltipOpenTwo, toggleTooltip: toggleTooltipTwo } = useTooltip(
        true,
    );
    const {
        anchorRef: anchorRefThree,
        isTooltipOpen: isTooltipOpenThree,
        toggleTooltip: toggleTooltipThree,
    } = useTooltip(true);
    const { anchorRef: anchorRefFour, isTooltipOpen: isTooltipOpenFour, toggleTooltip: toggleTooltipFour } = useTooltip(
        true,
    );

    return (
        <div>
            {isTooltipOpenOne && (
                <Tooltip position={ToolTipPosition.Top} anchorRef={anchorRefOne}>
                    <div>
                        This is a tooltip on the <b>top</b> of the element.
                    </div>
                </Tooltip>
            )}

            {isTooltipOpenTwo && (
                <Tooltip
                    position={ToolTipPosition.Bottom}
                    anchorRef={anchorRefTwo}
                    onClickOutside={() => toggleTooltipTwo(false)}
                >
                    <div>
                        This is a tooltip at the <b>bottom</b> of the element.
                    </div>
                </Tooltip>
            )}

            {isTooltipOpenThree && (
                <Tooltip
                    position={ToolTipPosition.Left}
                    anchorRef={anchorRefThree}
                    onClickOutside={() => toggleTooltipThree(false)}
                >
                    <div>
                        This is a tooltip on the <b>left</b> of the element.
                    </div>
                </Tooltip>
            )}

            {isTooltipOpenFour && (
                <Tooltip position={ToolTipPosition.Right} anchorRef={anchorRefFour}>
                    <div>
                        This is a tooltip on the <b>right</b> of the element.
                    </div>
                </Tooltip>
            )}

            <input
                type="password"
                ref={anchorRefOne}
                onClick={() => toggleTooltipOne(!isTooltipOpenOne)}
                style={{ position: 'absolute', top: '20%', left: '50%' }}
            />

            <input
                type="password"
                ref={anchorRefTwo}
                onClick={() => toggleTooltipTwo(!isTooltipOpenTwo)}
                style={{ position: 'absolute', top: '40%', left: '50%' }}
            />

            <input
                type="password"
                ref={anchorRefThree}
                onClick={() => toggleTooltipThree(!isTooltipOpenThree)}
                style={{ position: 'absolute', top: '60%', left: '50%' }}
            />

            <input
                type="password"
                ref={anchorRefFour}
                onClick={() => toggleTooltipFour(!isTooltipOpenFour)}
                style={{ position: 'absolute', top: '80%', left: '50%' }}
            />
        </div>
    );
};

// Story 4
export const TooltipOnASpan = () => {
    const { anchorRef, isTooltipOpen, toggleTooltip } = useTooltip();

    return (
        <div>
            {isTooltipOpen && (
                <Tooltip position={ToolTipPosition.Bottom} anchorRef={anchorRef}>
                    <div>
                        <p>
                            <i>I have</i>
                        </p>
                        <p>
                            no idea <b>x)</b>
                        </p>
                    </div>
                </Tooltip>
            )}

            <p>
                <span
                    ref={anchorRef}
                    onMouseEnter={() => toggleTooltip(true)}
                    onMouseLeave={() => toggleTooltip(false)}
                >
                    <u>What is Lorem Ipsum?</u>
                </span>
            </p>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a
                long established fact that a reader will be distracted by the readable content of a page when looking at
                its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                as opposed to using &#39;Content here, content here&#39;, making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions
                have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
        </div>
    );
};
